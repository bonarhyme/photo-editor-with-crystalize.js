import React, { useCallback } from 'react';
import { useEditImage } from '../crystalizer/state';

export const ToolListItem = ({ item }) => {
  const { setModifier, imageUrl } = useEditImage();

  const handleClick = useCallback((value) => {
    setModifier(value);
  }, []);

  return (
    <button className='tool-list-item' onClick={() => handleClick(item)} disabled={!imageUrl}>
      <span>{item}</span>
    </button>
  );
};
