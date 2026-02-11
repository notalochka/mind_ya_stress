import { ComponentType } from 'react';

export type StepType = 'question' | 'rating' | 'info';

export interface QuizStep {
  id: string;
  type: StepType;
  order: number;
}

export interface QuestionStep extends QuizStep {
  type: 'question';
  question: string;
  options: {
    id: number;
    title: string;
    subtitle?: string;
  }[];
}

export interface RatingStep extends QuizStep {
  type: 'rating';
  question: string;
  minLabel?: string;
  maxLabel?: string;
  minValue: number;
  maxValue: number;
}

export interface InfoStep extends QuizStep {
  type: 'info';
  componentKey: string;
  props?: Record<string, any>;
  theme?: 'default' | 'primary' | 'dark' | 'blue' | 'green';
}

export type Step = QuestionStep | RatingStep | InfoStep;

export interface QuizData {
  id: string;
  title: string;
  steps: Step[];
}







