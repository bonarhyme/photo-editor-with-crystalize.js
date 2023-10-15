import React from 'react';
import { useEditImage } from '../crystalizer/state';

export const DownloadButton = (props) => {
  const { downloadImage } = useEditImage();

  return (
    <div className='download-button-wrapper'>
      <button type='button' className='download-button' onClick={downloadImage}>
        Download image
      </button>
    </div>
  );
};
