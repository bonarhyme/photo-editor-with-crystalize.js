import React from 'react';
import { initialData } from '../crystalizer/state';
import { ToolListItem } from './tool-list-item';

export const EditToolList = (props) => {
  return (
    <div>
      <h2 className='tool-list-header'>Select Modifier</h2>
      <div className='tool-list-wrapper'>
        {Object.keys(initialData.style).map((x) => {
          return <ToolListItem item={x} key={x} />;
        })}
      </div>
    </div>
  );
};
