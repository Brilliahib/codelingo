import { Learning } from "../learning/learning";
import { Material, Quiz } from "../user-learning-path/user-learning-path";

export interface AchievementsUser {
  id: number;
  user_id: number;
  learning_path_id: string;
  learning_path: Learning;
  user_materials: Material[];
  user_quizzes: Quiz[];
}
