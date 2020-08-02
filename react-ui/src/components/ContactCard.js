import React from "react";
import contactService from "../services/contacts";
import LinkFormModal from "./LinkFormModal";
import { Card, List, Button, Icon } from "semantic-ui-react";

const ContactCard = ({ contact, contacts, setContacts, options, notify }) => {
  const handleContactDelete = async (id) => {
    if (window.confirm(`Delete contact "${contact.name}"?`)) {
      try {
        await contactService.deleteContact(id);
        setContacts(contacts.filter((c) => c.id !== id));
        notify(`Contact '${contact.name}' deleted!`, "green");
      } catch (error) {
        console.error(error.message);
        notify(`${error.message}`, "red");
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
        notify(`${urlName} link '${urlLink}' deleted!`, "green");
      } catch (error) {
        console.error(error.message);
        notify(`${error.message}`, "red");
      }
    }
  };

  return (
    <Card fluid>
      <Card.Content style={{ justifyContent: "center" }}>
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
        <List divided relaxed animated>
          {contact.contacts.map((c) => (
            <List.Item key={c + c.id}>
              <List.Icon name={c.site} color="black" />
              <List.Content>
                <List.Header>
                  <a target="_blank" rel="noopener noreferrer" href={c.url}>
                    {c.site.charAt(0).toUpperCase() + c.site.slice(1)}
                  </a>
                  <LinkFormModal
                    id={contact.id}
                    urlId={c.id}
                    contacts={contacts}
                    setContacts={setContacts}
                    options={options}
                    urlToEdit={c.url}
                    siteToEdit={c.site}
                    type="edit"
                    notify={notify}
                  />
                  <Button
                    color="google plus"
                    onClick={() =>
                      handleLinkDelete(contact.id, c.id, c.url, c.site)
                    }
                    floated="right"
                    size="tiny"
                    icon="delete"
                    className="delete-btn"
                  />
                </List.Header>
                <List.Description as="a">{c.url}</List.Description>
              </List.Content>
            </List.Item>
          ))}
        </List>
        <LinkFormModal
          id={contact.id}
          contacts={contacts}
          setContacts={setContacts}
          options={options}
          type="add"
          notify={notify}
        />
      </Card.Content>
    </Card>
  );
};

export default ContactCard;
