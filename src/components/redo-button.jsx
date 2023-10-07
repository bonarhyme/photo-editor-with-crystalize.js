import React from 'react';
import { FaRedo } from 'react-icons/fa';
import { useEditImage } from '../crystalizer/state';

export const RedoButton = () => {
  const { handleRedo } = useEditImage();
  return (
    <div>
      <button type='button' className='redo-button' onClick={handleRedo}>
        <span>
          <FaRedo />
        </span>
        <span>Redo</span>
      </button>
    </div>
  );
};
