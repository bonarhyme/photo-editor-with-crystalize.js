import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { useEditImage } from '../crystalizer/state';

export const ImageUploader = (props) => {
  const { onImageUpload } = useEditImage();

  return (
    <div className='image-uploader-wrapper'>
      <label htmlFor='image-selector' className='image-uploader-label'>
        <span>Upload image</span>
        <FaPlus size={16} />
        <input type='file' accept='image/*' id='image-selector' onChange={(e) => onImageUpload(e.target.files[0])} />
      </label>
    </div>
  );
};
