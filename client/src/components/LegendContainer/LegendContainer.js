import React from 'react';
import './LegendContainer.css';

import runningStatusIcon from '../../icons/32px/runningStatusIcon.png';
import stoppedStatusIcon from '../../icons/32px/stoppedStatusIcon.png';
import pausedStatusIcon from '../../icons/32px/pausedStatusIcon.png';

export const LegendContainer = () => (
  <div className='legendContainer'>
    {(
      <div>
        <h1>Oven is: </h1>
        <div className='activeContainer'>
          <h2>
            <div className='activeItem'>
              running
              <img alt='Running Icon' src={runningStatusIcon} />
            </div>
          </h2>
          <h2>
            <div className='activeItem'>
              paused
              <img alt='Paused Icon' src={pausedStatusIcon} />
            </div>
          </h2>
          <h2>
            <div className='activeItem'>
              stopped
              <img alt='Stopped Icon' src={stoppedStatusIcon} />
            </div>
          </h2>
        </div>
      </div>
    )}
  </div>
);
