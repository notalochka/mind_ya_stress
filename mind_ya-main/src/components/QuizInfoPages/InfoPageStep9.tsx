import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './InfoPageStep9.module.css';

interface InfoPageStep9Props {
  badgeText?: string;
  text?: string;
  imagePath?: string;
  rating?: number;
  userName?: string;
  testimonialTitle?: string;
  testimonialText?: string;
  onAnimationComplete?: () => void;
}

const InfoPageStep9: React.FC<InfoPageStep9Props> = ({
  badgeText = 'ОПИТУВАННЯ КОРИСТУВАЧІВ',
  text = '8 з 10 жінок відчули покращення вже після першого тижня програми.',
  imagePath = '/step-9.jpg',
  rating = 5,
  userName = 'Марина_Харків',
  testimonialTitle = 'Це моя точка опори',
  testimonialText = 'Коли по 3 дні без світла, коли на роботі скорочення, коли постійно тривоги — здавалось, що я просто розвалюсь. Почала робити вправи щовечора при свічках. За два тижні нарешті перестала зриватись на дітей і почала нормально спати.',
  onAnimationComplete,
}) => {
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Скидаємо прогрес при монтуванні
    setProgress(0);

    // Очищаємо попередній таймер, якщо він існує
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    const duration = 7000; // 7 секунд
    const interval = 50; // Оновлення кожні 50мс
    const steps = duration / interval;
    const increment = 100 / steps;

    let currentProgress = 0;
    timerRef.current = setInterval(() => {
      currentProgress += increment;
      if (currentProgress >= 100) {
        setProgress(100);
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
        if (onAnimationComplete) {
          onAnimationComplete();
        }
      } else {
        setProgress(currentProgress);
      }
    }, interval);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Запускаємо при кожному монтуванні компонента

  return (
    <div className={styles.infoPage}>
      <div className={styles.badge}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M2.75 14.125C2.75 11.2255 5.10051 8.875 8 8.875C10.8995 8.875 13.25 11.2255 13.25 14.125V15H2.75V14.125Z" fill="white"></path>
          <rect x="4.5" y="1" width="7" height="7" rx="3.5" fill="white"></rect>
        </svg>
        <span>{badgeText}</span>
      </div>
      <p className={styles.text}><span>8 з 10 жінок</span> відчули покращення вже після першого тижня програми.</p>
      <div className={styles.imageContainer}>
        <Image
          src={imagePath}
          alt="Step 9 illustration"
          width={600}
          height={400}
          className={styles.image}
        />
      </div>
      <div className={styles.testimonial}>
        <div className={styles.testimonialHeader}>
          <div className={styles.stars}>
            {Array.from({ length: rating }, (_, index) => (
              <span key={index} className={styles.star}>⭐</span>
            ))}
          </div>
          <span className={styles.userName}>{userName}</span>
        </div>
        <h3 className={styles.testimonialTitle}>{testimonialTitle}</h3>
        <p className={styles.testimonialText}>{testimonialText}</p>
      </div>
      <div className={styles.progressSection}>
        <div className={styles.progressBarContainer}>
          <div className={styles.progressBar}>
            <div
              className={styles.progressBarFilled}
              style={{ width: `${progress}%` }}
            >
              {progress > 0 && (
                <span className={styles.progressText}>{Math.round(progress)}%</span>
              )}
            </div>
          </div>
        </div>
        <p className={styles.progressLabel}>Підключення до бази даних</p>
      </div>
    </div>
  );
};

export default InfoPageStep9;

