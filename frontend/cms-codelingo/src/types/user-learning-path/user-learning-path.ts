import { Learning } from "../learning/learning";

export interface UserLearningPath {
  learning_details: LearningDetail;
  learning_items: (Material | Quiz)[];
}

export interface LearningDetail {
  id: number;
  user_id: number;
  title: string;
  learning_path_id: string;
  progress_status: number;
  created_at: Date;
  updated_at: Date;
}

export interface Material {
  id: string;
  type: "material";
  title: string;
  is_completed: boolean;
  is_unlocked: boolean;
  created_at: Date;
  updated_at: Date;
  material_image: string;
  material_text: string;
}

export interface Quiz {
  id: string;
  type: "quiz";
  title: string;
  is_completed: boolean;
  is_unlocked: boolean;
  created_at: Date;
  updated_at: Date;
  quiz_description: string;
}

export interface AllUserLearningPath {
  id: number;
  user_id: number;
  learning_path_id: string;
  progress_status: number;
  learning_path: Learning;
  user_materials: Material[];
  user_quizzes: Quiz[];
}
