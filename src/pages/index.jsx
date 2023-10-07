import React from 'react';
import { Canvas } from '../components/canvas';
import { Editor } from '../components/editor';
import { Sidebar } from '../components/sidebar';
import { EditImageContextProvider } from '../crystalizer/state';

const Home = (props) => {
  return (
    <EditImageContextProvider>
      <div className='app-wrapper'>
        <Sidebar />
        <section className='canvas-editor-wrapper'>
          <Canvas />
          <Editor />
        </section>
      </div>
    </EditImageContextProvider>
  );
};

export default Home;
