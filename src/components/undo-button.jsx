import React from 'react';
import { FaUndo } from 'react-icons/fa';
import { useEditImage } from '../crystalizer/state';

export const UndoButton = () => {
  const { handleUndo } = useEditImage();

  return (
    <div>
      <button type='button' className='undo-button' onClick={handleUndo}>
        <span>
          <FaUndo />
        </span>
        <span>Undo</span>
      </button>
    </div>
  );
};
