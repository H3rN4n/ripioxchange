import React, { Component } from 'react';

import 'basscss/css/basscss.min.css';
import 'basscss-align/css/align.css';
import 'basscss-layout/css/layout.css';
import 'basscss-btn/css/btn.css';
import 'basscss-btn-primary/css/btn-primary.css';
import 'basscss-forms/index.css';
import 'basscss-input-range/css/input-range.css';
import 'basscss-colors/css/colors.css';
import 'basscss-background-colors/css/background-colors.css';

import 'animate.css';

import './App.css';

import { XchangeForm } from './components/form/form';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p className="h1">Ripio Xchange</p>
        </header>
        <XchangeForm></XchangeForm>
      </div>
    );
  }
}

export default App;
