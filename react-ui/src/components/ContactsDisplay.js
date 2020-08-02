import React from "react";
import ContactCard from "./ContactCard";

const ContactsDisplay = ({ contacts, setContacts, options, notify }) => {
  return (
    <div style={{ marginTop: "20px" }}>
      {contacts.map((contact) => (
        <ContactCard
          contact={contact}
          contacts={contacts}
          setContacts={setContacts}
          options={options}
          key={contact.id}
          notify={notify}
        />
      ))}
    </div>
  );
};

export default ContactsDisplay;
