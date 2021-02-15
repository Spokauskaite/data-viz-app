import './App.css';
import { useState, useEffect } from 'react';
import useAuth from './useAuth';
import * as d3 from "d3";


function App() {
  let [ loading, penguins, error ] = useAuth()

  return (
    <>
      <h2>Get User Data</h2>
      <div className="user">
        { loading && <div>Loading...</div> }
        { error && <div className="error">ERROR OH NO</div> }
        {penguins && <>
          User ID: {penguins} <br />
        </>}
      </div>
    </>
  )
}

export default App;
