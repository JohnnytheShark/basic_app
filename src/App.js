import React from "react";
import Spinner from './Components/UI/Spinners/Spinner';
import Button from './Components/UI/Button/Button';
import Navigation from './Components/UI/Navigation/Navigation';

function App() {
  return (
    <React.Fragment>
    <Navigation /> 
      <Button>Button Example</Button>
      <Spinner></Spinner>
    </React.Fragment>
  );
}

export default App;
