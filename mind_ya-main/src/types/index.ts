// Базові типи для квіз-сайту

export interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  questions: Question[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Question {
  id: string;
  text: string;
  type: 'single' | 'multiple' | 'text' | 'rating';
  options?: Option[];
  required: boolean;
}

export interface Option {
  id: string;
  text: string;
  value: string | number;
}

export interface QuizResult {
  quizId: string;
  answers: Answer[];
  completedAt: Date;
}

export interface Answer {
  questionId: string;
  value: string | number | string[] | number[];
}













