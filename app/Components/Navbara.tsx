"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { FaHome } from "react-icons/fa";

export default function Navbara() {
  const [color, setColor] = useState('bg-slate-700');

  return (
    <div>
      <Link 
        href="/" 
        className={cn("h-16 flex flex-col justify-center items-center font-bold text-white text-3xl relative", color)} 
        onMouseOver={() => setColor('bg-slate-600')}
        onMouseOut={() => setColor('bg-slate-700')}
      >
        <div className='gap-3 flex items-center justify-center '><FaHome className=''/> Home</div>
        <div className="flex gap-2 items-center justify-center absolute left-5">
          <Image alt="" src="/favicon.ico" width={30} height={30} className="w-10 h-10" />
          <h1>To Do Lista</h1>
        </div>
      </Link>
    </div>
  );
}