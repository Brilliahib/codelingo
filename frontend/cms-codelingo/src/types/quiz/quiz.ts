import { Learning } from "../learning/learning";

export interface Quiz {
  id: string;
  learning_path_id: number;
  title: string;
  description: string;
  type: string;
  learning_path: Learning;
}

export interface Question {
  id: number;
  quiz_id: string;
  question_text: string;
  question_image: string;
  explanation_text: string;
  explanation_image: string;
  user_learning_path_id: number;
  created_at: Date;
  updated_at: Date;
  answers: Answer[];
}

export interface Answer {
  id: number;
  question_id: number;
  answer_text: string;
  is_correct: boolean;
}

export interface SubmitQuestionResult {
  is_correct: boolean;
  earned_exp: number;
  correct_answer: Answer;
}
