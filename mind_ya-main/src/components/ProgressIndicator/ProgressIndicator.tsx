import React from 'react';
import styles from './ProgressIndicator.module.css';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  completedSteps: number[];
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  totalSteps,
  completedSteps,
}) => {
  // Фіксована кількість точок
  const FIXED_DOTS_COUNT = 4;
  
  // Розраховуємо прогрес у відсотках (0-100%)
  // На останньому кроці прогрес завжди 100%
  const progressPercent = totalSteps > 0 
    ? (currentStep >= totalSteps 
        ? 100 
        : totalSteps > 1 
          ? ((currentStep - 1) / (totalSteps - 1)) * 100 
          : 0)
    : 0;
  
  // Пороги для активації точок: 0%, 33%, 66%, 100%
  const thresholds = [0, 33, 66, 100];
  
  // Визначаємо, які точки мають бути активними
  const isDotActive = (dotIndex: number) => {
    return progressPercent >= thresholds[dotIndex];
  };
  
  // Визначаємо, які точки мають показувати галочку
  // Галочка показується на всіх досягнутих точках (крім першої)
  const showCheckmark = (dotIndex: number) => {
    // Перша точка (0%) - галочка не показується
    if (dotIndex === 0) {
      return false;
    }
    
    // Галочка показується на всіх досягнутих точках
    // Тобто якщо прогрес >= порогу цієї точки, показуємо галочку
    return progressPercent >= thresholds[dotIndex];
  };
  
  return (
    <div className={styles.progressContainer}>
      <div className={styles.progressLine}>
        <div
          className={styles.progressLineFilled}
          style={{
            width: `${Math.min(progressPercent, 100)}%`,
          }}
        />
      </div>
      {Array.from({ length: FIXED_DOTS_COUNT }, (_, index) => {
        const isActive = isDotActive(index);
        const shouldShowCheckmark = showCheckmark(index);

        return (
          <div
            key={index}
            className={`${styles.progressDot} ${
              isActive ? styles.progressDotActive : ''
            }`}
          >
            {shouldShowCheckmark && (
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 6L5 9L10 3"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
        );
      })}
    </div>
  );
};







