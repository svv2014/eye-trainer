import { hot } from 'react-hot-loader';
import React from 'react';
import './Exercise1.css';

const Exercise1 = () => (
  <div className="container">
      <div className={"eye eyeLeft"}/>
      <div className={"eye eyeRight"}/>
  </div>
);

export default hot(module)(Exercise1);
