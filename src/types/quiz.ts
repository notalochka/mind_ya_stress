import { ComponentType } from 'react';

export type StepType = 'question' | 'multiple' | 'info';

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
  feedback?: string | Record<number, string>;
}

export interface MultipleStep extends QuizStep {
  type: 'multiple';
  question: string;
  options: {
    id: number;
    title: string;
    subtitle?: string;
  }[];
  feedback?: string;
}

export interface InfoStep extends QuizStep {
  type: 'info';
  componentKey: string;
  props?: Record<string, any>;
  theme?: 'default' | 'primary' | 'dark' | 'warm' | 'blue' | 'green';
}

export type Step = QuestionStep | MultipleStep | InfoStep;

export interface QuizData {
  id: string;
  title: string;
  steps: Step[];
}

