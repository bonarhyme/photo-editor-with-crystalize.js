import React, { useEffect, useState } from 'react';
import { useEditImage } from '../crystalizer/state';

export const RangeInputField = ({ modifierName, min, max, step }) => {
  const { imageStyle, setCrystalizer, crystalizer, shard, setPointer, pointer } = useEditImage();
  const [value, setValue] = useState(0);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const saveValue = () => {
    setCrystalizer(
      crystalizer.leave(0).with({ id: new Date().getTime(), style: { ...shard.style, [modifierName]: Number(value) } })
    );
    setPointer(0);
  };

  useEffect(() => {
    setValue(shard?.style[modifierName]);
  }, [modifierName]);

  return (
    <div key={modifierName} className='editor-field'>
      <label htmlFor={modifierName}>
        {' '}
        {modifierName}: {imageStyle.plain[modifierName]}
        {['brightness', 'contrast', 'grayscale', 'invert', 'sepia', 'opacity', 'scale'].includes(modifierName) && '%'}
      </label>
      <input
        type='range'
        id={modifierName}
        name={modifierName}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
      ></input>
      <button type='button' onClick={saveValue}>
        Save
      </button>
    </div>
  );
};
