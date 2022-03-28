import './index.css';
import Dropzone from './dropzone.js'
import Header from './header';
import React from 'react';

function App() {
  return (
    <div className="App">
      <Header />
      <div className='app--content'>
        <Dropzone />
      </div>
    </div>
  );
}

export default App;
