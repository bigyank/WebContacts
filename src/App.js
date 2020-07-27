import React from 'react';
import NavBar from './components/NavBar';
import AddLinkForm from './components/AddLinkForm';
import { Container } from 'semantic-ui-react';

const App = () => {
  return (
    <Container>
      <NavBar />
      <AddLinkForm />
    </Container>
  );
};

export default App;
