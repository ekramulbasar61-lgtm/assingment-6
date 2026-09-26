export type Workout = { id:number; name:string; image:string; muscleGroups:string[]; equipment:string; difficulty:string; duration:number; caloriesBurned:number; sets:number; reps:string; rating:number; description:string; instructions:string[] };

export const API_URL = "https://api.api-store.workers.dev/api/fitlog";

export async function getWorkouts(): Promise<Workout[]> {
  const response = await fetch(API_URL, {cache: "no-store"});
  if (!response.ok) {
    throw new Error(`Failed to fetch workouts: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

export async function getWorkout(id:string): Promise<Workout|undefined> {
  const response = await fetch(`${API_URL}/${encodeURIComponent(id)}`, {cache: "no-store"});
  if (response.status === 404) return undefined;
  if (!response.ok) {
    throw new Error(`Failed to fetch workout ${id}: ${response.status} ${response.statusText}`);
  }
  return response.json();
}
