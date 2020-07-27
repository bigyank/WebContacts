import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';

const AddLinkForm = () => {
  const [link, setLink] = useState('');

  const handleLinkSubmit = (e) => {
    e.preventDefault();
    console.log('submitted');
  };

  return (
    <Form onSubmit={handleLinkSubmit}>
      <Form.Group widths="equal">
        <Form.Input
          placeholder="Enter profile link.."
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <Button color="teal" content="Submit" />
      </Form.Group>
    </Form>
  );
};

export default AddLinkForm;
