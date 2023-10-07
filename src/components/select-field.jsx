import React, { useEffect, useMemo, useState } from 'react';
import { useEditImage } from '../crystalizer/state';

export const SelectField = ({ modifierName }) => {
  const { imageStyle, setCrystalizer, crystalizer, shard, setPointer, pointer } = useEditImage();
  const [value, setValue] = useState('');

  const options = useMemo(() => {
    if (modifierName === 'object-fit') {
      return ['fill', 'contain', 'cover', 'none', 'scale-down'];
    }
  }, [modifierName]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const saveValue = () => {
    setCrystalizer(
      crystalizer.leave(pointer).with({ id: new Date().getTime(), style: { ...shard.style, [modifierName]: value } })
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
        {modifierName}: {imageStyle.style[modifierName === 'object-fit' ? 'objectFit' : modifierName]}
      </label>
      <select
        name={modifierName}
        id={modifierName}
        placeholder={'Enter ' + modifierName}
        value={value}
        onChange={handleChange}
      >
        {options?.map((option) => {
          return (
            <option value={option} key={option}>
              {option}
            </option>
          );
        })}
      </select>
      <button type='button' onClick={saveValue}>
        Save
      </button>
    </div>
  );
};
