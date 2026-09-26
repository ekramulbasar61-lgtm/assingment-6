"use client";
import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
export default function Toast(){
 const [msg,setMsg]=useState("");
 useEffect(()=>{const handler=(e:Event)=>setMsg((e as CustomEvent<string>).detail);window.addEventListener("fitlog-toast",handler);return()=>window.removeEventListener("fitlog-toast",handler)},[]);
 if(!msg)return null;
 return <div className="fixed bottom-6 right-6 z-[100] flex items-center gap-3 border border-[#ccff00]/30 bg-[#151515] px-4 py-3 text-sm font-bold shadow-2xl"><CheckCircle2 size={18} className="text-[#ccff00]"/>{msg}</div>
}
