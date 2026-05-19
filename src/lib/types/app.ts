export type Role = 'admin' | 'teacher' | 'student';

export interface User {
  id: string;
  email: string;
  role: Role;
  name: string;
  avatar_url?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  teacher_id: string;
  teacher_name: string;
  thumbnail_url?: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  created_at: string;
}

export interface Enrollment {
  id: string;
  user_id: string;
  course_id: string;
  progress: number;
  enrolled_at: string;
}
