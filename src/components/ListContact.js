import React from 'react'  
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';  
import axios from 'axios';  
import { useState, useEffect } from 'react'  

function ListContact(props) {  

  const [data, setData] = useState([]);  

  useEffect(() => {  
    const GetData = async () => { 

    //Should be passed through login screen
    const username = "amit.kumar";
    const password = "@mitkumar123" ; 

    axios.post("http://localhost:56037/api/Authentication/Authenticate", {
      "username": username,
      "password": password
    })
    .then((response) => {
      if (response.data.token) {
        console.log(response.data.token);
        const result = axios.get('http://localhost:56037/api/Contacts/GetAllContacts', {
          headers: {
            'Authorization': `bearer ${response.data.token}`
          }})
          .then((res) => {
            console.log(res.data);
            
            let sortedContacts = [...res.data];
            sortedContacts.sort((a, b) => {
              if (a.firstName < b.firstName) {
                return -1;
              }
              if (a.firstName > b.firstName) {
                return 1;
              }
              return 0;
            });

            setData(sortedContacts);
          })
          .catch((error) => {
            alert("Cannot fetch the Contacts at the moment !");
            console.error(error)
          }); 
      }
    })
    .catch(error => {
      alert("Authorization Error !");
      console.log(error);
    });
    };  
    GetData();  
  }, []);  

  const deleteContact = (id) => {  
    axios.delete('http://localhost:56037/api/Contacts/DeleteContact?id=' + id)  
      .then((result) => { 
        alert("Contact deleted successfully !");
        //props.history.push('/ListContact');  
        window.location.reload();
      })
      .catch((error) => {
        alert("Cannot delete the Contact !");
        console.error(error)
      });   
  };  

  const editContact = (id) => {  
    props.history.push({  
      pathname: '/EditContact/' + id  
    });  
  };  

return (  
    <div className="animated fadeIn">  
      <Row>  
        <Col>  
          <Card>  
            <CardHeader>  
              <i className="fa fa-align-justify"></i> <b>Contact List</b>  
              </CardHeader>  
            <CardBody>  
              <Table hover bordered striped responsive size="sm">  
                <thead>  
                  <tr>  
                    <th>Name</th>  
                    <th>Email</th>  
                    <th>Phone</th> 
                    <th>Status</th> 
                    <th>Action</th>
                  </tr>  
                </thead>  
                <tbody>  
                  {  
                    data == null? <tr><td colSpan="5">'No Contacts to Display'</td></tr>:
                    data.map(item => {  
                      return <tr key={item.id}>   
                        <td>{item.firstName + ' ' + item.lastName}</td>  
                        <td><a href= {"mailto:" + item.email}>{item.email}</a></td>  
                        <td>{item.phone}</td>  
                        <td>{item.status ? 'Active' :  'InActive'}</td>
                        <td>  
                            <div class="btn-group">
                                <button className="btn btn-outline-success btn-sm" onClick={() => { editContact(item.id) }}>Edit</button> 
                            </div>
                        
                            <div class="btn-group">
                                <button className="btn btn-outline-danger btn-sm" onClick={() => { deleteContact(item.id) }} >Delete</button>  
                            </div>
                        </td>
                      </tr>  
                    })}  
                </tbody>  
              </Table>  
            </CardBody>  
          </Card>  
        </Col>  
      </Row>  
    </div>  
  )  
}  
export default ListContact