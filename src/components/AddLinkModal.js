import React, { useState } from 'react';
import contactService from '../services/contacts';
import { Modal, Header, Form, Button, Icon } from 'semantic-ui-react';

const AddLinkModal = ({ id, contacts, setContacts }) => {
  const [url, setUrl] = useState('');
  const [site, setSite] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const addNewLink = async (e) => {
    e.preventDefault();

    const linkObject = {
      url,
      site,
    };

    const targetContact = contacts.find((c) => c.id === id);

    const updatedContact = {
      ...targetContact,
      contacts: targetContact.contacts.concat({ url, site }),
    };

    try {
      await contactService.addLink(id, linkObject);
      setContacts(contacts.map((c) => (c.id !== id ? c : updatedContact)));
      handleClose();
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
    <Modal
      trigger={
        <Button size="mini" onClick={handleOpen}>
          <Icon name="plus" />
          Add
        </Button>
      }
      open={modalOpen}
      onClose={handleClose}
      closeIcon
      style={{ padding: '10px' }}
    >
      <Header content="Add new link to contact" />
      <Modal.Content>
        <Form onSubmit={addNewLink}>
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
          <Button type="submit" color="green" floated="right">
            Add
          </Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default AddLinkModal;
