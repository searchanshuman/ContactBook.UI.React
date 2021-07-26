import React, {useState} from 'react';
import axios from 'axios';
import { Button, Card, CardHeader, CardFooter, Col, Row, Container, Form, FormGroup, Input, InputGroup, Label, CardBody } from 'reactstrap';

function AddContact(props) {
    const [contact, setContact] = useState({ firstName: '', lastName: '', email:'', phone: '', status: true });
    const [checked, setChecked] = useState(contact.status);

    const apiAddContactUrl = "http://localhost:56037/api/Contacts/AddUpdateContact";
    
    //Method to call api to create new contact
    const contactAdd = (e) => {
        e.preventDefault();
        const data = {firstName: contact.firstName, lastName: contact.lastName, email: contact.email, phone: contact.phone, status: checked};
        
        axios.post(apiAddContactUrl, data)
            .then((result) => {
                alert("Contact " + data.firstName + " " + data.lastName + " Added Successfully !");
                console.log(result);
                props.history.push('/ListContact');
            })
            .catch(error => {
                alert("Failed to Add Contact " + data.firstName + " " + data.lastName);
                console.log(error);
            });
    };

    const onChange = (e) => {
        e.persist();
        setContact({...contact, [e.target.name]: e.target.value});
    }

    const onCheckboxChange = (e) => {
        e.persist();
        setChecked(!checked);
    }

    return(
        <div className="app flex-row align-items-center">
            <Container>
                <Row className="justify-content-center">
                    <Col md="12" lg="10" xl="8">
                        <Card className="mx-4">
                        <CardHeader>  
                            <i className="fa fa-align-justify"></i> <b>Add Contact</b>  
                        </CardHeader>  
                            <CardBody className="p-4">
                                <Form onSubmit={contactAdd}>
                                     
                                    <InputGroup className="mb-3">
                                        <Label for="firstName" sm={2}>First Name</Label>
                                        <Input type="text" name="firstName" id="firstName" placeholder="First Name" value={contact.firstName} onChange={onChange} />
                                    </InputGroup>

                                    <InputGroup className="mb-3">
                                        <Label for="lastName" sm={2}>Last Name</Label>
                                        <Input type="text" name="lastName" id="lastName" placeholder="Last Name" value={contact.lastName} onChange={onChange} />
                                    </InputGroup>

                                    <InputGroup className="mb-3">
                                        <Label for="email" sm={2}>Email</Label>
                                        <Input type="text" name="email" id="email" placeholder="Email" value={contact.email} onChange={onChange} />
                                    </InputGroup>

                                    <InputGroup className="mb-3">
                                        <Label for="phone" sm={2}>Phone</Label>
                                        <Input type="text" name="phone" id="phone" placeholder="Phone" value={contact.phone} onChange={onChange} />
                                    </InputGroup>

                                    <InputGroup className="mb-3">
                                        <Label for="status" sm={2}>Active</Label>
                                        <Input type="checkbox" name="status" id="status" checked={checked} value={contact.status} onChange={onCheckboxChange}/>  
                                    </InputGroup>

                                    <CardFooter className="p-4">
                                        <Row>
                                            <Col>  
                                                <FormGroup row>  
                                                    <Col sm={8}>  
                                                    </Col>  
                                                    
                                                    <Col sm={1}>  
                                                        <Button type="submit" color="success" block>Submit</Button>  
                                                    </Col>  
                                                    
                                                    <Col sm={3}>  
                                                        <Button color="danger" block>Cancel</Button>  
                                                    </Col>  
                                                    
                                                    <Col sm={5}>  
                                                    </Col>  
                                                </FormGroup>  
                                            </Col>                                                          
                                        </Row>
                                    </CardFooter>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row> 
            </Container>
        </div>
    )
}
export default AddContact