import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import AddContactForm from "./components/AddContactForm";
import ContactsDisplay from "./components/ContactsDisplay";
import Notification from "./components/Notification";
import About from "./components/About";
import contactService from "./services/contacts";
import { Container } from "semantic-ui-react";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [page, setPage] = useState("Home");
  const [notification, setNotification] = useState(null);

  const options = [
    { key: "fb", text: "Facebook", value: "facebook", icon: "facebook" },
    { key: "ig", text: "Instagram", value: "instagram", icon: "instagram" },
    { key: "tw", text: "Twitter", value: "twitter", icon: "twitter" },
    { key: "gh", text: "Github", value: "github", icon: "github" },
    { key: "yt", text: "Youtube", value: "youtube", icon: "youtube" },
  ];

  useEffect(() => {
    contactService.getAll().then((contacts) => {
      setContacts(contacts);
    });
  }, []);

  let timeoutId = null;

  const notify = (message, color) => {
    clearTimeout(timeoutId);
    setNotification({ message, color });
    timeoutId = setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  return (
    <Container>
      <NavBar page={page} setPage={setPage} />
      {page === "Home" ? (
        <>
          <Notification notification={notification} />
          <AddContactForm
            setContacts={setContacts}
            options={options}
            notify={notify}
          />
          <ContactsDisplay
            contacts={contacts}
            setContacts={setContacts}
            options={options}
            notify={notify}
          />
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
