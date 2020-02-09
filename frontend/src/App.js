import React, { useState } from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';

const Example = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <div>
      <Button outline color="primary">Toggle</Button>{' '} 

      <Button color="primary" onClick={toggle} style={{ marginBottom: '1rem' }}>More</Button>
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
}
export default Example;