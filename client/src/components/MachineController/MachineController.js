import React from 'react';
import './MachineController.css';

import runningStatusIcon from '../../icons/64px/runningStatusIcon.png';
import pausedStatusIcon from '../../icons/64px/pausedStatusIcon.png';
import stoppedStatusIcon from '../../icons/64px/stoppedStatusIcon.png';

import stopIcon from '../../icons/64px/stopIcon.png';
import startIcon from '../../icons/64px/startIcon.png'
import pauseIcon from '../../icons/64px/pauseIcon.png'

const renderSwitch = (param) => {
  switch (param) {
    case "start":
      return runningStatusIcon;
    case "pause":
      return pausedStatusIcon;
    default:
      return stoppedStatusIcon;
  }
}

export const MachineController = ({ ovenTemp, sendMachineStatus, comingStatus, bakedCookies, bakingCookies }) => (

  <div className="infoBar">
    <div className="leftInnerContainer">
      <img className="statusIcon" src={renderSwitch(comingStatus)} alt="online icon" />
      <h3>{(ovenTemp === '' ? 0 : ovenTemp) + "°C"}</h3>
    </div>
    <div className="cookiesInfo">
      <h3>{"Cookies on conveyor: " + bakingCookies}</h3>
      <h3>{"Cookies ready for consuming: " + (bakedCookies === undefined ? 0 : bakedCookies)}</h3>
    </div>
    <div className="rightInnerContainer">
      {/* <img className="onlineIcon" src={onlineIcon} alt="online icon" /> */}
      {/* <img className="onlineIcon" src={onlineIcon} alt="online icon" /> */}
      {/* <button onClick={(e) => sendMachineStatus(e)}><img src={stopIcon} alt="close icon" /></button> */}
      <button className="actionButton"><img src={startIcon} alt="start icon icon" onClick={(e) => {
        if (comingStatus !== "start") {
          sendMachineStatus("start");
        }
      }} /></button>
      <button className="actionButton"><img src={pauseIcon} alt="pause icon" onClick={(e) => {
        if (comingStatus !== "pause") {
          sendMachineStatus("pause");
        }
      }} /></button>
      <button className="actionButton"><img src={stopIcon} alt="close icon" onClick={(e) => {
        if (comingStatus !== "stop") {
          sendMachineStatus("stop")
        }
      }} /></button>
    </div>
  </div>
);

