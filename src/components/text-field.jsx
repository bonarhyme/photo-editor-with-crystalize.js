import React, { useEffect, useState } from 'react';
import { useEditImage } from '../crystalizer/state';

export const TextField = ({ modifierName, type = 'text' }) => {
  const { imageStyle, setCrystalizer, crystalizer, shard, setPointer, pointer } = useEditImage();
  const [value, setValue] = useState(0);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const saveValue = () => {
    console.log({ value });
    setCrystalizer(
      crystalizer
        .leave(pointer)
        .with({ id: new Date().getTime(), style: { ...shard.style, [modifierName]: Number(value) } })
    );

    setPointer(0);
  };

  useEffect(() => {
    setValue(shard?.style[modifierName]);
  }, [modifierName]);

  return (
    <div key={modifierName} className='editor-field'>
      <label htmlFor={modifierName}>
        {modifierName}: {imageStyle.style[modifierName === 'hue-rotate' ? 'hueRotate' : modifierName] ?? 0}
        {['blur'].includes(modifierName) && 'px'}
        {['hue-rotate'].includes(modifierName) && 'deg'}
      </label>
      <input
        type={type}
        placeholder={'Enter ' + modifierName}
        value={value}
        onChange={handleChange}
        key={modifierName}
      />
      <button type='button' onClick={saveValue}>
        Save
      </button>
    </div>
  );
};
