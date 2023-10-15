import { createContext, useRef, useCallback, useContext, useState, useMemo } from 'react';
import Crystalizer from 'crystalize.js';
import { toPng } from 'html-to-image';
import download from 'downloadjs';

const EditImageContext = createContext(null);

export const initialData = {
  style: {
    width: 400, // px
    height: 400, // px
    blur: 0, // px
    brightness: 100, // %
    contrast: 100, // %
    grayscale: 0, // %
    'hue-rotate': 0, // accepts angle / 360deg
    invert: 0, // %
    opacity: 100, // %
    sepia: 0, // %
    scale: 1, // number
    'object-fit': 'none', // fill, containe, cover, none, scale-down
  },
  id: 1,
};

let crystalizerInitializer = new Crystalizer({
  initial: initialData,
  reduce: (crystal, shard) => {
    console.log({ crystal, shard });
    return { id: shard.id + crystal.id, style: shard.style };
  },
});

// main context provider
export const EditImageContextProvider = ({ children }) => {
  const imageRef = useRef();

  const [imageUrl, setImageUrl] = useState('');
  const [crystalizer, setCrystalizer] = useState(crystalizerInitializer);
  const [modifier, setModifier] = useState('width');
  const [pointer, setPointer] = useState(0);

  const [crystal, shards, base] = crystalizer.leave(pointer).take(1);

  const onImageUpload = useCallback((image) => {
    const _image = URL.createObjectURL(image);
    setImageUrl(_image);
  }, []);

  const handleUndo = useCallback(() => {
    setPointer((l) => l + 1);
  }, []);

  const handleRedo = useCallback(() => {
    setPointer((l) => l - 1);
  }, []);

  const downloadImage = useCallback(() => {
    toPng(imageRef.current)
      .then((dataURL) => {
        download(dataURL, 'custom-image.png');
      })
      .catch((e) => {
        console.log({ e });
      });
  }, []);

  const imageStyle = useMemo(() => {
    let width, height, objectFit, opacity, blur, brightness, contrast, grayscale, invert, sepia, scale, hueRotate;

    if (shards.length === 0) {
      width = crystal?.style?.width;
      height = crystal?.style?.height;
      objectFit = crystal?.style['object-fit'];
      opacity = crystal?.style['opacity'];
      blur = crystal?.style['blur'];
      brightness = crystal?.style['brightness'];
      contrast = crystal?.style['contrast'];
      grayscale = crystal?.style['grayscale'];
      invert = crystal?.style['invert'];
      sepia = crystal?.style['sepia'];
      scale = crystal?.style['scale'];
      hueRotate = crystal?.style['hue-rotate'];
    } else {
      width = shards[0]?.style.width;
      height = shards[0]?.style.height;
      objectFit = shards[0]?.style['object-fit'];
      opacity = shards[0]?.style['opacity'];
      blur = shards[0]?.style['blur'];
      brightness = shards[0]?.style['brightness'];
      contrast = shards[0]?.style['contrast'];
      grayscale = shards[0]?.style['grayscale'];
      invert = shards[0]?.style['invert'];
      sepia = shards[0]?.style['sepia'];
      scale = shards[0]?.style['scale'];
      hueRotate = shards[0]?.style['hue-rotate'];
    }

    return {
      style: {
        width: `${width}px`,
        height: `${height}px`,
        objectFit,
        filter: `opacity(${opacity}%) blur(${blur}px) brightness(${brightness}%) brightness(${brightness}%) contrast(${contrast}%) grayscale(${grayscale}%) invert(${invert}%) sepia(${sepia}%) hue-rotate(${hueRotate}deg)`,
        transform: `scale(${scale})`,
      },
      plain: {
        width,
        height,
        objectFit,
        opacity,
        blur,
        brightness,
        contrast,
        grayscale,
        invert,
        sepia,
        scale,
        hueRotate,
      },
    };
  }, [crystal]);

  return (
    <EditImageContext.Provider
      value={{
        crystalizer,
        setCrystalizer,
        imageUrl,
        onImageUpload,
        modifier,
        setModifier,
        imageStyle,
        shard: shards[0] ?? base,
        handleUndo,
        handleRedo,
        setPointer,
        pointer,
        imageRef,
        downloadImage,
      }}
    >
      {children}
    </EditImageContext.Provider>
  );
};

export const useEditImage = () => {
  const context = useContext(EditImageContext);

  if (!context) {
    throw new Error('Use edit image context is missing');
  }

  return context;
};
