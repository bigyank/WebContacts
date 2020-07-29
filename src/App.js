import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import AddContactForm from './components/AddContactForm';
import ContactsDisplay from './components/ContactsDisplay';
import About from './components/About';
import contactService from './services/contacts';
import { Container } from 'semantic-ui-react';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [page, setPage] = useState('Home');

  useEffect(() => {
    contactService.getAll().then((contacts) => {
      setContacts(contacts);
    });
  }, []);

  return (
    <Container>
      <NavBar page={page} setPage={setPage} />

      {page === 'Home' ? (
        <>
          <AddContactForm setContacts={setContacts} />
          <ContactsDisplay contacts={contacts} setContacts={setContacts} />
        </>
      ) : (
        <>
          <About />
        </>
      )}
    </Container>
  );
};

export default App;
