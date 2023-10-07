import React from 'react';
import { useEditImage } from '../crystalizer/state';
import { DownloadButton } from './download-button';
import { RangeInputField } from './range-input-field';
import { RedoButton } from './redo-button';
import { SelectField } from './select-field';
import { TextField } from './text-field';
import { UndoButton } from './undo-button';

export const Editor = (props) => {
  const { modifier, imageUrl } = useEditImage();

  return (
    <div className='editor-wrapper'>
      <div className='buttons'>
        <DownloadButton />
        <div className='action-buttons'>
          <UndoButton />
          <RedoButton />
        </div>
      </div>

      {imageUrl && (
        <div className='editor-items'>
          <h2 className='editor-items-header'>Edit image</h2>
          {['height', 'width', 'blur'].includes(modifier) && <TextField modifierName={modifier} type='number' />}
          {['hue-rotate'].includes(modifier) && <TextField modifierName={modifier} type='number' />}

          {['brightness', 'contrast', 'grayscale', 'invert', 'sepia', 'opacity'].includes(modifier) && (
            <RangeInputField modifierName={modifier} max={100} min={0} step={1} />
          )}
          {['scale'].includes(modifier) && <RangeInputField modifierName={modifier} max={5} min={1} step={0.1} />}

          {['object-fit'].includes(modifier) && <SelectField modifierName={modifier} />}
        </div>
      )}
    </div>
  );
};
