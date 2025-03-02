import React from 'react';
import Header_home from './components/header/header_home';

export default function Home() {

  return (
    <>
      <div className='w-full min-h-screen flex flex-col items-center bg-white border-b-2 boder-dashed pb-1 '>
        <div className='border-b-2 boder-dashed pb-1 w-full flex justify-center items-center '>
          <Header_home/>
        </div>
      </div>
      <div>

      </div>
    </>
  );
}