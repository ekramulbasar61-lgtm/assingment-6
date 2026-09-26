import {notFound} from "next/navigation"; import {getWorkout} from "@/lib/api"; import WorkoutDetails from "@/components/WorkoutDetails";
export default async function WorkoutPage({params}:{params:Promise<{id:string}>}){const {id}=await params;const workout=await getWorkout(id);if(!workout)notFound();return <WorkoutDetails workout={workout}/>}
