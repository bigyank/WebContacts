import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import AddContactForm from './components/AddContactForm';
import ContactsDisplay from './components/ContactsDisplay';
import contactService from './services/contacts';
import { Container } from 'semantic-ui-react';

const App = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    contactService.getAll().then((contacts) => {
      setContacts(contacts);
    });
  }, []);

  return (
    <Container>
      <NavBar />
      <AddContactForm setContacts={setContacts} />
      <ContactsDisplay contacts={contacts} setContacts={setContacts} />
    </Container>
  );
};

export default App;
