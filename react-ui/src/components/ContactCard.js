import React, { useState } from "react";
import contactService from "../services/contacts";
import LinkFormModal from "./LinkFormModal";
import { Card, List, Button, Confirm, Icon } from "semantic-ui-react";

const ContactCard = ({ contact, contacts, setContacts, options, notify }) => {
  const [open, setOpen] = useState(false);

  const handleContactDelete = async (id) => {
    setOpen(false);
    try {
      await contactService.deleteContact(id);
      setContacts(contacts.filter((c) => c.id !== id));
      notify(`Contact '${contact.name}' deleted!`, "green");
    } catch (error) {
      notify(`${error.response.data.message}`, "red");
    }
  };

  const handleLinkDelete = async (id, urlId, urlLink, urlName) => {
    setOpen(false);
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
      notify(`${error.response.data.message}`, "red");
    }
  };

  return (
    <Card fluid>
      <Card.Content style={{ justifyContent: "center" }}>
        <h2>
          {contact.name}
          <Button
            onClick={() => {
              setOpen(true);
            }}
            color="red"
            floated="right"
          >
            <Icon name="user delete" />
            Delete
          </Button>
        </h2>
        <Confirm
          open={open}
          onCancel={() => {
            setOpen(false);
          }}
          onConfirm={() => handleContactDelete(contact.id)}
        />
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
                    onClick={() => {
                      setOpen(true);
                    }}
                    floated="right"
                    size="tiny"
                    icon="delete"
                    className="delete-btn"
                  />
                </List.Header>
                <List.Description as="a">{c.url}</List.Description>
                <Confirm
                  open={open}
                  onCancel={() => {
                    setOpen(false);
                  }}
                  onConfirm={() =>
                    handleLinkDelete(contact.id, c.id, c.url, c.site)
                  }
                />
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
