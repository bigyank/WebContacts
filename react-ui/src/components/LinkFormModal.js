import React, { useState } from "react";
import contactService from "../services/contacts";
import { Modal, Header, Form, Button } from "semantic-ui-react";

const LinkFormModal = ({
  id,
  urlId,
  contacts,
  setContacts,
  type,
  options,
  urlToEdit,
  siteToEdit,
  notify,
}) => {
  const [url, setUrl] = useState("");
  const [site, setSite] = useState("");
  const [editUrl, setEditUrl] = useState(urlToEdit);
  const [editSite, setEditSite] = useState(siteToEdit);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const addNewLink = async (e) => {
    e.preventDefault();

    const newObject = {
      url: url.startsWith("https://") ? url : "https://".concat(url),
      site,
    };

    try {
      const returnedObject = await contactService.addLink(id, newObject);
      setContacts(contacts.map((c) => (c.id !== id ? c : returnedObject)));

      notify(`New ${newObject.site} link '${newObject.url}' added`, "green");

      setUrl("");
      setSite("");
      handleClose();
    } catch (error) {
      notify(`${error.response.data.message}`, "red");
    }
  };

  const editLink = async (e) => {
    e.preventDefault();

    const newObject = {
      url: editUrl.startsWith("https://")
        ? editUrl
        : "https://".concat(editUrl),
      site: editSite,
    };

    const targetContact = contacts.find((c) => c.id === id);

    try {
      const returnedObject = await contactService.editLink(
        id,
        urlId,
        newObject
      );

      const updatedContactsKey = targetContact.contacts.map((t) =>
        t.id !== urlId ? t : returnedObject
      );

      const updatedContact = {
        ...targetContact,
        contacts: updatedContactsKey,
      };

      setContacts(contacts.map((c) => (c.id !== id ? c : updatedContact)));
      notify(`${newObject.site} link edited to '${newObject.url}'`, "green");
      handleClose();
    } catch (error) {
      notify(`${error.response.data.message}`, "red");
    }
  };

  const isTypeEdit = type === "edit";

  return (
    <Modal
      trigger={
        <Button
          color={isTypeEdit ? "twitter" : "green"}
          size={isTypeEdit ? "tiny" : "small"}
          onClick={handleOpen}
          floated={isTypeEdit ? "right" : "left"}
          icon={isTypeEdit ? "edit" : "add"}
          content={isTypeEdit ? undefined : "Add"}
          className={isTypeEdit ? "edit-btn" : "add-btn"}
        />
      }
      open={modalOpen}
      onClose={handleClose}
      closeIcon
      style={{ padding: "10px" }}
    >
      <Header
        content={isTypeEdit ? "Edit the link" : "Add new link to contact"}
      />
      <Modal.Content>
        <Form onSubmit={isTypeEdit ? editLink : addNewLink}>
          <Form.Input
            required
            placeholder="For example, www.facebook.com"
            type="text"
            label="URL"
            value={isTypeEdit ? editUrl : url}
            onChange={(e) =>
              isTypeEdit ? setEditUrl(e.target.value) : setUrl(e.target.value)
            }
          />
          <Form.Select
            required
            value={isTypeEdit ? editSite : site}
            options={options}
            label="Choose site name"
            selection
            search
            placeholder="Select a site"
            onChange={(e, data) =>
              isTypeEdit ? setEditSite(data.value) : setSite(data.value)
            }
          />
          <Button type="submit" color="green" floated="right">
            {isTypeEdit ? "Edit" : "Add"}
          </Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default LinkFormModal;
