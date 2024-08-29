'use client';
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useParams } from "next/navigation";
import React, { use, useEffect, useState } from "react"
import Link from "next/link";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink } from "@radix-ui/react-navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

import { FaDeleteLeft } from "react-icons/fa6";
 import { FaTrash, FaCheck ,FaPencilAlt,FaSave } from "react-icons/fa";
import { SortDesc } from "lucide-react";



export default function page() {
    const [currentTask,setCurrentTask] = useState('')
    const [taskowet, setTaskowet] = useState([]);
    const [title, setTitle] = useState('');
    const [newTitle, setNewTitle] = useState('');
    const [changeTitle, setChangeTitle] = useState(false);
    const [modifyTask, setModifyTask] = useState(-1);
    const params = useParams();
    
    useEffect(() => {
        const fetchTasks = async () => {
            const response = await fetch('http://localhost:3000/api/lista/' + params.id);
            const data = await response.json();
            setTaskowet(data);
        };
        const fetchTitle = async () => {
            const response = await fetch(`http://localhost:3000/api/getListaProps/${params.id}` );
            const data = await response.json();
            setTitle(data.nom_liste);
        }
        fetchTitle();
        fetchTasks();
    }, []);
    useEffect(() => {
        const sortedTasks = [...taskowet].sort((a:any, b:any) => b.id - a.id);
        // Assuming you need to set the sorted tasks back to state or use it somehow
        setTaskowet(sortedTasks);
    }, []);
    
    return (
        <>  
          <Card className="xl:w-[50%]  w-[90%] m-auto mt-12 mb-32">    
            {/* <div className='flex items-center flex-col justify-between gap-8 mt-7 '> */}
            <CardHeader className="w-full h-40 bg-slate-200 relative flex items-center justify-center flex-col">
                {   !changeTitle && <CardTitle className='capitalize text-5xl self-center text-gray-900'> {title} </CardTitle>}
                { !changeTitle &&
                    <Button className='h-12 w-32 md:absolute right-6 text-lg' onClick={()=>setChangeTitle(true)}><FaPencilAlt/></Button>
                }
                {
                    changeTitle && 
                    <form className="reltaive p-0 m-0 w-full h-32 bg-slate-200 relative flex items-center justify-center flex-col">
                        <Input className="h-[90%] w-[60%] bg-slate-100 text-3xl font-bold" onChange={(event)=>{
                        setNewTitle(event.target.value)
                    }}></Input> 
                    <Button className='h-16 w-32 md:absolute right-6 text-xl' onClick={()=>{
                        fetch(`http://localhost:3000/api/changeTitle/${params.id}/${newTitle}`,{method: 'PATCH'})
                        setChangeTitle(false)
                        setNewTitle('')
                        window.location.reload();
                    }}><FaSave/></Button>
                    </form>
                }
            </CardHeader>
                

            <CardContent className="m-0 p-0">
                <Table ><TableBody className='w-full h-full bg-slate-50'> 
                {
                    taskowet.map((task:any, index) => (
                            <TableRow className='h-full'>
                                <TableCell className=""><Checkbox className="w-12 h-12"  checked={task.etat}onClick={async (event) => {
                                    var isChecked = task.etat
                                    var response = await fetch(`http://localhost:3000/api/changeEtatTask/${params.id}/${task.id_tache}/${isChecked ? "false" : "true"}`, {
                                        method: 'PATCH'
                                    });
                                    window.location.reload();
                                }}></Checkbox></TableCell>

                                {
                                    !(modifyTask==index) && <TableCell className="h-24  items-center flex text-3xl">
                                    {task.description}
                                </TableCell>

                                
                                }

                                {
                                    !(modifyTask== index) && <TableCell className="w-36"><Button className='h-16 w-full rounded-xl bg-blue-600 hover:bg-blue-500 text-white flex flex-col items-center justify-center m-auto text-xl ' onClick={()=>{
                                        setModifyTask(index)
                                    }
                                    }><FaPencilAlt/></Button></TableCell>
                                }
                                {
                                    modifyTask==index &&
                                    
                                    <>
                                    
                                    <TableCell className="h-24  items-center flex text-3xl" > 
                                    <Input className="h-full  text-3xl bg-slate-200" defaultValue={task.description} onChange={(event)=>{
                                        fetch(`http://localhost:3000/api/changeDescriptionTask/${params.id}/${task.id_tache}?description=${event.target.value}`,{method: 'PATCH'})
                                    }}></Input></TableCell>
                                    <TableCell>

                                        <Button className='h-16 w-full rounded-xl bg-slate-600 hover:bg-slate-500 text-white flex flex-col items-center justify-center m-auto text-xl ' onClick={()=>{
                                        setModifyTask(-1)
                                        window.location.reload();
                                    }}><FaSave/></Button>
                                    </TableCell>

                                    </>
                                
                                }
                                



                                <TableCell className="w-36"><Button className='h-16 w-full rounded-xl bg-orange-600 hover:bg-orange-500 text-white flex flex-col items-center justify-center m-auto text-xl ' onClick={async()=>{
                                    const response = await fetch('http://localhost:3000/api/deletetask/' + params.id + '/' + task.id_tache,{
                                        method: 'DELETE'
                                    });
                                    window.location.reload();
                                    
                                }}><FaTrash/> </Button></TableCell>
                                
                            </TableRow>

                    ))
                }

            </TableBody></Table>
                <form className="flex w-full h-full p-5 gap-5"><Input className="h-20 w-[85%] m-0 text-3xl" placeholder="add a task ..." onChange={
                                (value)=>{
                                    setCurrentTask(value.target.value)     
                                }
                            }></Input>
                            <Button className=' bg-green-600 text-green-100 flex flex-col items-center justify-center m-auto hover:bg-green-500  h-20 right-0 w-[140px] rounded-full text-2xl' onClick={async()=>{
                                
                                const response = await fetch('http://localhost:3000/api/newtask/' + params.id + '/' + currentTask,{
                                    method: 'POST'
                                });
                                setCurrentTask('')
                                window.location.reload();
                            }}><FaCheck/></Button>
                        </form>
                    
            </CardContent>

                <CardFooter className="mt-5">
                    <Button variant = "destructive" size ="lg" className='h-24 w-full text-3xl gap-4' onClick={async()=>{
                        await fetch (`http://localhost:3000/api/deleteListe/${params.id}`,{
                            method: 'DELETE'
                        })
                        alert('Your list "'+ title + '" was deleted !')
                        window.location.href = '/'
                    }}>Delete list <FaDeleteLeft /></Button>
                </CardFooter>

            </Card>
            
        </>
    ) 
}
