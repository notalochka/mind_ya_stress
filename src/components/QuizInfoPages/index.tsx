import { ComponentType } from 'react';
import InfoPageChronicStress from './InfoPageChronicStress';
import InfoPageSolution from './InfoPageSolution';

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
  'info-chronic-stress': InfoPageChronicStress,
  'info-solution': InfoPageSolution,
};

export type InfoPageKey = keyof typeof infoPageComponents;


