import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import AddContactForm from "./components/AddContactForm";
import ContactsDisplay from "./components/ContactsDisplay";
import Notification from "./components/Notification";
import About from "./components/About";
import Login from "./components/Login";
import Signup from "./components/Signup";
import contactService from "./services/contacts";
import { Container } from "semantic-ui-react";

const App = () => {
  const [user, setUser] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [page, setPage] = useState("Login");
  const [notification, setNotification] = useState(null);

  const options = [
    { key: "fb", text: "Facebook", value: "facebook", icon: "facebook" },
    { key: "ig", text: "Instagram", value: "instagram", icon: "instagram" },
    { key: "tw", text: "Twitter", value: "twitter", icon: "twitter" },
    { key: "gh", text: "Github", value: "github", icon: "github" },
    { key: "yt", text: "Youtube", value: "youtube", icon: "youtube" },
  ];

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem("loggedUser");
    if (loggedUserJson) {
      setUser(JSON.parse(loggedUserJson));
      setPage("Home");
    }
  }, []);

  useEffect(() => {
    const getAllContacts = async () => {
      const contacts = await contactService.getAll();
      setContacts(contacts);
    };
    if (user) {
      getAllContacts();
      setPage("Home");
    }
  }, [user]);

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
      <NavBar
        page={page}
        setPage={setPage}
        user={user}
        setUser={setUser}
        setContacts={setContacts}
      />
      {page === "Home" && (
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
      )}
      {page === "About" && <About />}
      {page === "Login" && <Login setUser={setUser} />}
      {page === "Signup" && <Signup setUser={setUser} />}
    </Container>
  );
};

export default App;
