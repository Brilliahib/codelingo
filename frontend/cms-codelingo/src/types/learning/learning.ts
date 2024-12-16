import { Material } from "../material/material";
import { Quiz } from "../quiz/quiz";

export interface Learning {
  id: string;
  title: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}

export interface LearningDetail {
  id: string;
  title: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  materials: Material[];
  quizzes: Quiz[];
}
