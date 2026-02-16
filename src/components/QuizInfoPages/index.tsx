import { ComponentType } from 'react';
import InfoPageChronicStress from './InfoPageChronicStress';
import InfoPageSolution from './InfoPageSolution';
import InfoPageStep2Feedback from './InfoPageStep2Feedback';
import InfoPagePractice from './InfoPagePractice';

// Базовий компонент для інформаційних сторінок
const DefaultInfoPage: ComponentType<any> = ({ title, text }) => {
  return (
    <div>
      {title && <h2>{title}</h2>}
      {text && <p>{text}</p>}
    </div>
  );
};

// Реєстр компонентів інформаційних сторінок
export const infoPageComponents: Record<string, ComponentType<any>> = {
  // Додавайте нові компоненти тут
  'default-info': DefaultInfoPage,
  'info-step2-feedback': InfoPageStep2Feedback,
  'info-chronic-stress': InfoPagePractice,
  'info-solution': InfoPageSolution,
};

export type InfoPageKey = keyof typeof infoPageComponents;


