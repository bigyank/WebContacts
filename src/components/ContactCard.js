import React from 'react';
import contactService from '../services/contacts';
import LinkFormModal from './LinkFormModal';
import { Card, List, Button, Icon } from 'semantic-ui-react';

const ContactCard = ({ contact, contacts, setContacts }) => {
  const handleContactDelete = async (id) => {
    if (window.confirm(`Delete contact "${contact.name}"?`)) {
      try {
        await contactService.deleteContact(id);
        setContacts(contacts.filter((c) => c.id !== id));
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleLinkDelete = async (id, urlId, urlLink, urlName) => {
    if (window.confirm(`Delete ${urlName} link "${urlLink}"?`)) {
      const targetContact = contacts.find((c) => c.id === id);
      const updatedContactsKey = targetContact.contacts.filter(
        (t) => t.id !== urlId
      );
      const updatedContact = { ...targetContact, contacts: updatedContactsKey };

      try {
        await contactService.deleteLink(id, urlId);
        setContacts(contacts.map((c) => (c.id !== id ? c : updatedContact)));
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Card fluid>
      <Card.Content style={{ justifyContent: 'center' }}>
        <h2>
          {contact.name}
          <Button
            onClick={() => handleContactDelete(contact.id)}
            color="red"
            floated="right"
          >
            <Icon name="user delete" />
            Delete
          </Button>
        </h2>
      </Card.Content>
      <Card.Content>
        <List divided relaxed>
          {contact.contacts.map((c) => (
            <List.Item key={c + c.id}>
              <List.Icon name={c.site.toLowerCase()}></List.Icon>
              <List.Content>
                <List.Header as="a">
                  {c.url}
                  <LinkFormModal
                    id={contact.id}
                    urlId={c.id}
                    contacts={contacts}
                    setContacts={setContacts}
                    type="edit"
                  />
                  <Button
                    color="red"
                    onClick={() =>
                      handleLinkDelete(contact.id, c.id, c.url, c.site)
                    }
                    floated="right"
                    size="small"
                    icon="delete"
                  />
                </List.Header>
                <List.Description as="a">{c.site}</List.Description>
              </List.Content>
            </List.Item>
          ))}
        </List>
        <LinkFormModal
          id={contact.id}
          contacts={contacts}
          setContacts={setContacts}
          type="add"
        />
      </Card.Content>
    </Card>
  );
};

export default ContactCard;
