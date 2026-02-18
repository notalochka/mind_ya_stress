import { ComponentType } from 'react';
import InfoPageStep5 from './InfoPageStep5';
import InfoPageStep8 from './InfoPageStep8';
import InfoPageStep9 from './InfoPageStep9';
import InfoPageStep14 from './InfoPageStep14';
import InfoPageStep20 from './InfoPageStep20';
import InfoPageStep23 from './InfoPageStep23';
import InfoPageStep27 from './InfoPageStep27';
import InfoPagePlanGeneration from './InfoPagePlanGeneration';

// Реєстр компонентів інформаційних сторінок
export const infoPageComponents: Record<string, ComponentType<any>> = {
  'info-step-5': InfoPageStep5,
  'info-step-8': InfoPageStep8,
  'info-step-9': InfoPageStep9,
  'info-step-14': InfoPageStep14,
  'info-step-20': InfoPageStep20,
  'info-step-23': InfoPageStep23,
  'info-step-27': InfoPageStep27,
  'info-plan-generation': InfoPagePlanGeneration,
  // Додавайте нові компоненти тут
};

export type InfoPageKey = keyof typeof infoPageComponents;







