import React, { Component, Fragment } from 'react';
import {Route, Switch,withRouter} from 'react-router-dom';

import Spinner from './Components/UI/Spinners/Spinner';
import Button from './Components/UI/Button/Button';
import Navigation from './Components/UI/Navigation/Navigation';
import Card from './Components/UI/Card/Card';

import './App.scss';

function App() {
  return (
    <React.Fragment>
    <Navigation /> 
    <Card>
      <Button>Button Example</Button>
      <Spinner></Spinner>
    </Card>
    </React.Fragment>
  );
}

export default App;
