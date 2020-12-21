import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './Join.css';

export const Join = () => {
  const [name, setName] = useState('');

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Enter adventure of making cookies</h1>
        <div>
          <input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} />
        </div>
        <Link onClick={e => (!name) ? e.preventDefault() : null} to={`/biscuits_maker?name=${name}`}>
          <button className={'button mt-20'} type="submit">Enter</button>
        </Link>
      </div>
    </div>
  );
}