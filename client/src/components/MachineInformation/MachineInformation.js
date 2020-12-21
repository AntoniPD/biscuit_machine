import React from 'react';
import ReactLoading from 'react-loading';
import './MachineInformation.css';
import { ovenStates, machineStateMessages } from '../../utils/constants';

const renderSwitch = (param) => {
  switch (param) {
    case ovenStates.Preparing:
      return machineStateMessages.Preparing;
    case ovenStates.Ready:
      return machineStateMessages.Ready;
    case ovenStates.Paused:
      return machineStateMessages.Paused;
    case ovenStates.Stopped:
      return machineStateMessages.Stopped;
    default:
      return machineStateMessages.Default;
  }
}

export const MachineInformation = ({ comingStatus }) => (
  <div className='textContainer'>
    {(
      <div>
        <div className='message'>
          <h2>{renderSwitch(comingStatus)}</h2>
        </div>
        <div className='loading'>
          {comingStatus === ovenStates.Preparing ? <ReactLoading type={"bubbles"} color="black" /> : null}
        </div>
      </div>
    )}
  </div>
);