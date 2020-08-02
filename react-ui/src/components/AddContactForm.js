import React, { useState } from "react";
import contactService from "../services/contacts";
import { Form, Button, Icon } from "semantic-ui-react";

const AddContactForm = ({ setContacts, options, notify }) => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [site, setSite] = useState("");

  const addNewContact = async (e) => {
    e.preventDefault();

    const contactObject = {
      name,
      contacts: {
        url: url.startsWith("https://") ? url : "https://".concat(url),
        site,
      },
    };

    try {
      const returnedObject = await contactService.addNew(contactObject);
      setContacts((prevState) => prevState.concat(returnedObject));

      notify(`New contact '${returnedObject.name}' added!`, "green");

      setName("");
      setUrl("");
      setSite("");
    } catch (error) {
      console.error(error.response.data.message);
      notify(`${error.response.data.message}`, "red");
    }
  };

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
        <Form.Select
          required
          value={site}
          options={options}
          label="Choose site name"
          selection
          search
          placeholder="Select a site"
          onChange={(e, data) => setSite(data.value)}
        />
        <Form.Input
          required
          placeholder="www.facebook.com"
          type="text"
          label="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </Form.Group>
      <Button
        animated="vertical"
        color="teal"
        icon
        labelPosition="left"
        type="submit"
      >
        <Icon name="add user" />
        Add new contact
      </Button>
    </Form>
  );
};

export default AddContactForm;
