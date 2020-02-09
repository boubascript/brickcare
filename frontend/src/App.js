import React, { useState } from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import {
  Stitch,
  AnonymousCredential,
  RemoteMongoClient
} from "mongodb-stitch-browser-sdk";
import './App.css';

export default function App (props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <div>
      <Button outline color="primary">Toggle</Button>{' '} 

      <Button color="primary" onClick={toggle}>More</Button>
      <Collapse isOpen={isOpen}>
        <Card>
          <CardBody>
            <Button >Login</Button>{' '}
            <Button >Community</Button>{' '}
            <Button >Events</Button>
          </CardBody>
        </Card>
      </Collapse>
    </div>
  );
};
