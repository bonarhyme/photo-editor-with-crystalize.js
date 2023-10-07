import React from 'react';
import { EditToolList } from './edit-tool-list';
import { ImageUploader } from './image-uploader';

export const Sidebar = (props) => {
  return (
    <aside className='sidebar-wrapper'>
      <ImageUploader />
      <EditToolList />
    </aside>
  );
};
