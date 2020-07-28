import React, { useState } from 'react';
import contactService from '../services/contacts';
import { Form, Button, Icon } from 'semantic-ui-react';

const AddContactForm = ({ setContacts }) => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [site, setSite] = useState('');

  const addNewContact = async (e) => {
    e.preventDefault();

    const contactObject = {
      name,
      contacts: {
        url,
        site,
      },
    };

    try {
      const response = await contactService.addNew(contactObject);
      setContacts((prevState) => prevState.concat(response));
    } catch (error) {
      console.error(error);
    }
  };

  const options = [
    { key: 'fb', text: 'Facebook', value: 'Facebook', icon: 'facebook' },
    { key: 'ig', text: 'Instagram', value: 'Instagram', icon: 'instagram' },
    { key: 'tw', text: 'Twitter', value: 'Twitter', icon: 'twitter' },
    { key: 'gh', text: 'Github', value: 'Github', icon: 'github' },
    { key: 'yt', text: 'Youtube', value: 'Youtube', icon: 'youtube' },
  ];

  return (
    <Form onSubmit={addNewContact}>
      <Form.Group widths="equal">
        <Form.Input
          required
          placeholder="Enter name"
          label="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Form.Input
          required
          placeholder="Enter site URL"
          type="text"
          label="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Form.Select
          required
          value={site}
          label="Site Name"
          options={options}
          placeholder="Select a site"
          onChange={(e, data) => setSite(data.value)}
        />
      </Form.Group>
      <Button color="teal" icon labelPosition="left" type="submit">
        <Icon name="add user" />
        Add new contact
      </Button>
    </Form>
  );
};

export default AddContactForm;
