
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import React from 'react'

function ListaView({esm , index}:any) {
  return (
    <>
    
      <Button className='w-full h-32 shadow text-xl bg-slate-50' variant="outline">{esm}</Button>
      
    </>
  )
}

export default ListaView