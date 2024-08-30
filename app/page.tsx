"use client";
import React, { useEffect, useState } from 'react';
import ListaView from './Components/ListaView';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

import { FaPlus } from "react-icons/fa";
import { useRouter } from 'next/router';

export default function Home() {
  let [listes, setListes] = useState([{}])

  useEffect(()=>{
    var fetchListes = async () => {
      var curr : any  = await fetch('http://localhost:3000/api/getAllListes')
      var data = await curr.json()
       setListes(data)
    }

    fetchListes()
  },[])

  return (
    <>
    
      <Card className='m-auto lg:w-[50%] mt-12 w-[90%]'>
        <CardHeader className='bg-slate-200 h-36'>
          <CardTitle  className='m-auto font-bold text-5xl flex flex-col justify-center items-center '  >Your to do lists</CardTitle>
        </CardHeader>

        

        <CardContent className='grid xl:grid-cols-3 grid-cols-2 gap-4 p-4 mt-5 mb-5'>
          {
          listes.map((liste:any, index:any) => (
            
            <Link href = {`/lista/${liste.id_liste}`}><ListaView key={index} esm={liste.nom_liste} index={index + 1} /></Link>
            
          ))}
        </CardContent>

          <CardFooter className='' >
          <Button className='w-full h-24 m-0 text-2xl font-bold border-2 rounded-md gap-5' onClick={async()=>{
            
              const lista : any = await fetch('http://localhost:3000/api/newListe')
              alert ("New Lista added !")
              window.location.reload();
          }}> <FaPlus/> Add a list </Button>
        </CardFooter> 
      </Card>
    </>
    
  );
}
