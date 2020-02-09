import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const Login = (props) => {
  return (
    <Form>
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Label for="exampleName" className="mr-sm-2">Name: </Label>
        <Input type="name" name="name" id="exampleName" placeholder="First, Last" />
      </FormGroup>
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Label for="exampleEmail" className="mr-sm-2">Email:</Label>
        <Input type="email" name="email" id="exampleEmail" placeholder="example@gmail.com" />
      </FormGroup>
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Label for="examplePassword" className="mr-sm-2">Password:</Label>
        <Input type="password" name="password" id="examplePassword" placeholder="password" />
      </FormGroup>
      <Button>Submit</Button>
    </Form>
  );
}

export default Login;
