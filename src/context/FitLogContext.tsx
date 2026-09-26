"use client";
import { createContext,useContext,useEffect,useMemo,useState } from "react";
import type { Workout } from "@/lib/api";
type SavedItem=Workout; type PlanItem=Workout & {done?:boolean};
type Ctx={plan:PlanItem[];saved:SavedItem[];addToPlan:(w:Workout)=>boolean;saveWorkout:(w:Workout)=>void;removePlan:(id:number)=>void;removeSaved:(id:number)=>void;markDone:(id:number)=>void;toast:(message:string)=>void};
const C=createContext<Ctx|null>(null);
export function FitLogProvider({children}:{children:React.ReactNode}){
 const [plan,setPlan]=useState<PlanItem[]>([]),[saved,setSaved]=useState<SavedItem[]>([]),[toastMessage,setToastMessage]=useState("");
 useEffect(()=>{try{setPlan(JSON.parse(localStorage.getItem("fitlog-plan")||"[]"));setSaved(JSON.parse(localStorage.getItem("fitlog-saved")||"[]"));}catch{}} ,[]);
 useEffect(()=>{localStorage.setItem("fitlog-plan",JSON.stringify(plan));},[plan]); useEffect(()=>{localStorage.setItem("fitlog-saved",JSON.stringify(saved));},[saved]);
 const toast=(message:string)=>{setToastMessage(message);window.dispatchEvent(new CustomEvent("fitlog-toast",{detail:message}));window.setTimeout(()=>setToastMessage(""),2200)};
 const value=useMemo(()=>({plan,saved,addToPlan:(w:Workout)=>{if(plan.length>=5){toast("Today's plan is full (5 lifts)");return false} if(plan.some(x=>x.id===w.id)){toast("Already in today's plan");return false} setPlan(p=>[...p,{...w,done:false}]);toast("Added to today's plan");return true},saveWorkout:(w:Workout)=>{if(saved.some(x=>x.id===w.id)){toast("Already saved");return}setSaved(s=>[...s,w]);toast("Saved for later")},removePlan:(id:number)=>{setPlan(p=>p.filter(x=>x.id!==id));toast("Removed from today's plan")},removeSaved:(id:number)=>{setSaved(s=>s.filter(x=>x.id!==id));toast("Removed from saved")},markDone:(id:number)=>{setPlan(p=>p.map(x=>x.id===id?{...x,done:true}:x));toast("Workout marked as done")},toast}),[plan,saved]);
 return <C.Provider value={value}>{children}{toastMessage&&<div className="hidden" aria-hidden>{toastMessage}</div>}</C.Provider>;
}
export function useFitLog(){const c=useContext(C);if(!c)throw new Error("useFitLog must be used inside FitLogProvider");return c;}
