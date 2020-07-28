import React from 'react';
import AddLinkModal from './AddLinkModal';
import { Card, List } from 'semantic-ui-react';

const ContactCard = ({ contact, contacts, setContacts }) => {
  return (
    <Card fluid>
      <Card.Content>
        <h3>{contact.name}</h3>
      </Card.Content>
      <Card.Content>
        <List divided relaxed>
          {contact.contacts.map((c) => (
            <List.Item key={c + c.id}>
              <List.Icon name={c.site.toLowerCase()}></List.Icon>
              <List.Content>
                <List.Header as="a">{c.url}</List.Header>
                <List.Description as="a">{c.site}</List.Description>
              </List.Content>
            </List.Item>
          ))}
        </List>
        <AddLinkModal
          id={contact.id}
          contacts={contacts}
          setContacts={setContacts}
        />
      </Card.Content>
    </Card>
  );
};

export default ContactCard;
