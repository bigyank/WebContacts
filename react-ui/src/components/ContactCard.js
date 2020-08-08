import React, { useState } from "react";
import contactService from "../services/contacts";
import LinkFormModal from "./LinkFormModal";
import { Card, List, Button, Confirm, Icon } from "semantic-ui-react";

const ContactCard = ({ contact, contacts, setContacts, options, notify }) => {
  const [urlDeleteConfirm, setUrlDeleteConfirm] = useState(false);
  const [urlToDelete, setUrlToDelete] = useState(null);
  const [contactDeleteConfirm, setContactDeleteConfirm] = useState(false);

  const handleContactDelete = async (id) => {
    setContactDeleteConfirm(false);
    try {
      await contactService.deleteContact(id);
      setContacts(contacts.filter((c) => c.id !== id));
      notify(`Contact '${contact.name}' deleted!`, "green");
    } catch (error) {
      notify(`${error.response.data.message}`, "red");
    }
  };

  const handleLinkDelete = async () => {
    setUrlDeleteConfirm(false);

    const { id, urlId, urlLink, urlName } = urlToDelete;

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
              setContactDeleteConfirm(true);
            }}
            color="red"
            floated="right"
          >
            <Icon name="user delete" />
            Delete
          </Button>
        </h2>
        <Confirm
          open={contactDeleteConfirm}
          onCancel={() => {
            setContactDeleteConfirm(false);
          }}
          onConfirm={() => handleContactDelete(contact.id)}
        />
      </Card.Content>
      <Card.Content>
        <List divided relaxed animated>
          {contact.contacts.map((c) => (
            <List.Item key={c.id}>
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
                  <>
                    <Button
                      color="google plus"
                      onClick={() => {
                        setUrlToDelete({
                          id: contact.id,
                          urlId: c.id,
                          urlLink: c.url,
                          urlName: c.site,
                        });
                        setUrlDeleteConfirm(true);
                      }}
                      floated="right"
                      size="tiny"
                      icon="delete"
                      className="delete-btn"
                    />
                    <Confirm
                      open={urlDeleteConfirm}
                      onCancel={() => {
                        setUrlToDelete(null);
                        setUrlDeleteConfirm(false);
                      }}
                      onConfirm={() => handleLinkDelete()}
                    />
                  </>
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
