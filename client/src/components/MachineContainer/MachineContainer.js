import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";
import './MachineContainer.css';

import { MachineController } from '../MachineController/MachineController';
import { MachineInformation } from '../MachineInformation/MachineInformation';
import { LegendContainer } from '../LegendContainer/LegendContainer'

let socket;

export const MachineContainer = ({ location }) => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [ovenTemp, setTemp] = useState('');
  const [ovenState, setOvenState] = useState('');
  const [bakingCookies, setBakingCookies] = useState('');
  const [bakedCookies, setBakedCookies] = useState('');
  const ENDPOINT = 'http://localhost:8080/';

  useEffect(() => {
    const { name } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setName(name)

    socket.emit('join', { name }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('ovenTemperature', message => {
      setTemp(message.temperature)
    });

    socket.on('machineStatus', message => {
      setStatus(message.status)
    });

    socket.on('bakingCookies', message => {
      setBakingCookies(message.bakingCookies)
    });

    socket.on('bakedCookies', message => {
      setBakedCookies(message.bakedCookies)
    });

    socket.on('ovenState', message => {
      setOvenState(message.ovenState)
    });
  }, []);

  const sendMachineStatus = (machineStatus) => {
    if (machineStatus) {
      socket.emit('machineStatus', { id: socket.id, status: machineStatus, name: name });
    }
  }

  return (
    <div className="container">
      <div className="outerContainer">
        <LegendContainer />
      </div>
      <div className="innerContainer">
        <h2>Machine status</h2>
        <MachineController ovenTemp={ovenTemp} sendMachineStatus={sendMachineStatus} comingStatus={status} bakedCookies={bakedCookies} bakingCookies={bakingCookies} />
        <MachineInformation comingStatus={ovenState} />
      </div>
    </div>
  );
}