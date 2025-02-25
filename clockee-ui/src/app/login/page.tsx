'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Login } from '../components/Login/Login';

export default function LoginPage() {
  return (
    <>
      <div className='bg-[#FFDA3E] '>
        <div className='p-[120px] flex item-center justify-center'>
          <img src="/body.png"/>
          <Login />
        </div>
      </div>
    </>
   
  );
}
