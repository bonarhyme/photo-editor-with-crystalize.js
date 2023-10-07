import React, { useEffect, useMemo } from 'react';
import { useEditImage } from '../crystalizer/state';

export const Canvas = (props) => {
  const { imageUrl, imageStyle } = useEditImage();

  return (
    <div className='canvas-wrapper'>
      {imageUrl ? (
        <div className='image-container'>
          <img src={imageUrl} style={{ ...imageStyle.style }} />
        </div>
      ) : (
        <div className='no-image'>
          <span>No Image Selected</span>
        </div>
      )}
    </div>
  );
};

// Shards return the total items you have added in the particular order.. if you have added objects it will each objects in an array and you can use the take method to select the last added shards with N

// Crystal returns the total value of all the shards added

// base return the remaining values that were not included in the .take method. So, if you have 7 shards added using a .width, and then call a take(3), the take three will return the 3 last added shards. Then the base will return a summary of all the shards that were ingnored

// Note the take accepts a number of shard you are concerned about... It is like the states you are concerned about.

// You can also remove last states using .leave

// You can remove a particular state using the without state

//  You can combine leave and take to do undo and redo

// // undo
// crystalizer = crystalizer.leave((l) => l + 1);

// // redo
// crystalizer = crystalizer.leave((l) => l - 1);
