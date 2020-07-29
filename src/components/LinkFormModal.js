import React, { useState } from 'react';
import contactService from '../services/contacts';
import { Modal, Header, Form, Button } from 'semantic-ui-react';

const LinkFormModal = ({ id, urlId, contacts, setContacts, type }) => {
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

    if (type === 'add') {
      const updatedContact = {
        ...targetContact,
        contacts: targetContact.contacts.concat(linkObject),
      };

      try {
        await contactService.addLink(id, linkObject);
        setContacts(contacts.map((c) => (c.id !== id ? c : updatedContact)));
        handleClose();
      } catch (error) {
        console.error(error);
      }
    }

    if (type === 'edit') {
      const updatedContactsKey = targetContact.contacts.map((t) =>
        t.id !== urlId ? t : { ...linkObject, id: urlId }
      );
      const updatedContact = {
        ...targetContact,
        contacts: updatedContactsKey,
      };

      try {
        await contactService.editLink(id, urlId, { ...linkObject, id: urlId });
        setContacts(contacts.map((c) => (c.id !== id ? c : updatedContact)));
        handleClose();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const options = [
    { key: 'fb', text: 'Facebook', value: 'Facebook', icon: 'facebook' },
    { key: 'ig', text: 'Instagram', value: 'Instagram', icon: 'instagram' },
    { key: 'tw', text: 'Twitter', value: 'Twitter', icon: 'twitter' },
    { key: 'gh', text: 'Github', value: 'Github', icon: 'github' },
    { key: 'yt', text: 'Youtube', value: 'Youtube', icon: 'youtube' },
  ];

  const isTypeEdit = type === 'edit';

  return (
    <Modal
      trigger={
        <Button
          color={isTypeEdit ? 'blue' : 'green'}
          size="small"
          onClick={handleOpen}
          floated={isTypeEdit ? 'right' : 'left'}
          icon={isTypeEdit ? 'edit' : 'add'}
          content={isTypeEdit ? undefined : 'Add'}
        />
      }
      open={modalOpen}
      onClose={handleClose}
      closeIcon
      style={{ padding: '10px' }}
    >
      <Header
        content={isTypeEdit ? 'Edit the link' : 'Add new link to contact'}
      />
      <Modal.Content>
        <Form onSubmit={addNewLink}>
          <Form.Input
            required
            placeholder="For example, www.facebook.com"
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
            {isTypeEdit ? 'Edit' : 'Add'}
          </Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default LinkFormModal;
