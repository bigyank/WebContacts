import React from 'react';
import ContactCard from './ContactCard';

const ContactsDisplay = ({ contacts, setContacts }) => {
  return (
    <div style={{ marginTop: '20px' }}>
      {contacts.map((contact) => (
        <ContactCard
          contact={contact}
          contacts={contacts}
          setContacts={setContacts}
          key={contact.id}
        />
      ))}
    </div>
  );
};

export default ContactsDisplay;
