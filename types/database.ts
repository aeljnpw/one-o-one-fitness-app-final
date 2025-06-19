export interface Equipment {
  id: string;
  name: string;
  description: string;
  category: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Exercise {
  id: string;
  name: string;
  muscle_group: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  type?: string;
  equipment?: string;
  thumbnail_url?: string;
  video_url?: string;
  proper_form?: string;
  common_mistakes?: string;
  tips?: string;
  title?: string;
  instructions?: string[];
  duration?: string;
  primary_muscles?: string[];
  secondary_muscles?: string[];
  created_at: string;
  equipment_id?: string;
}

export interface DailyActivity {
  id: string;
  user_id: string;
  date: string;
  calories_burned: number;
  exercise_minutes: number;
  stand_hours: number;
  calorie_goal: number;
  exercise_goal: number;
  stand_goal: number;
  steps: number;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  user_id?: string;
  bio?: string;
  created_at: string;
  name?: string;
  avatar_url?: string;
  level?: string;
  workouts_completed?: number;
  total_calories?: number;
  current_streak?: number;
  longest_streak?: number;
  email?: string;
  updated_at: string;
}

export interface User {
  id: string;
  email: string;
  username?: string;
  created_at: string;
  updated_at: string;
}

export interface Workout {
  id: string;
  name: string;
  duration: number;
  completed_at?: string;
  user_id?: string;
}

export interface WorkoutExercise {
  id: string;
  workout_id?: string;
  exercise_id?: string;
  sets?: number;
  reps?: number;
  duration?: number;
}

export interface Member {
  id: string;
  name?: string;
  email?: string;
  plan?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
  paymentStatus?: string;
  createdAt: string;
  memberUserId?: string;
  notes?: string;
}

export interface Membership {
  id: string;
  plan_name: string;
  price: number;
  duration_months: number;
  description?: string;
  created_at: string;
}