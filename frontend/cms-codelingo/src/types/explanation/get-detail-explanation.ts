type Answer = {
  id: string;
  question_id: string;
  answer_text: string;
  is_correct: number;
  created_at: string;
  updated_at: string;
};

type Question = {
  id: string;
  quiz_id: string;
  question_text: string;
  question_image: string | null;
  explanation_text: string;
  explanation_image: string;
  created_at: string;
  updated_at: string;
  answers: Answer[];
};

type GetQuestionsResponse = {
  statusCode: number;
  message: string;
  data: Question[];
};
