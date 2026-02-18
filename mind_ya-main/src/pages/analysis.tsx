import React, { useState, useEffect, useLayoutEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '@/components/Header/Header';
import styles from './analysis.module.css';
import Footer from '@/components/Footer/Footer';

interface Review {
  stars: number;
  author: string;
  title: string;
  text: string;
}

const reviews: Review[] = [
  {
    stars: 5,
    author: 'Віка_Львів',
    title: 'Зникла тривога перед сном',
    text: 'Раніше лежала годинами і не могла заснути від думок. Тепер 10 хвилин ввечері — і засинаю як немовля.'
  },
  {
    stars: 5,
    author: 'Юля_Одеса',
    title: 'Повернула себе',
    text: 'Після року постійної тривоги думала що це назавжди. Mind Я показала що можна жити інакше. Дякую.'
  },
  {
    stars: 5,
    author: 'Катерина_Дніпро',
    title: 'Навіть чоловік помітив',
    text: 'На 5-й день чоловік запитав — що з тобою сталось, ти інша людина. Найкращий комплімент.'
  },
  {
    stars: 5,
    author: 'Аня_Запоріжжя',
    title: 'Працює без світла і інтернету',
    text: 'Живу в місті де постійні відключення. Роблю вправи при свічках. Це моя щоденна терапія.'
  }
];

const progressItems = [
  { label: 'Рівень стресу', index: 0 },
  { label: 'Емоційний стан', index: 1 },
  { label: 'Спосіб життя', index: 2 },
  { label: 'Створення плану', index: 3 }
];

const Analysis: NextPage = () => {
  const router = useRouter();
  const [progressValues, setProgressValues] = useState([0, 0, 0, 0]);
  const [currentReview, setCurrentReview] = useState<Review>(reviews[0]);
  const [allProgressComplete, setAllProgressComplete] = useState(false);
  const [showFinalScreen, setShowFinalScreen] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [showCheckmark, setShowCheckmark] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useLayoutEffect(() => {
    document.body.offsetHeight;

    const progressDuration = 4000; // 4 секунди (у 2 рази швидше ніж було 8)
    let startTime: number | null = null;
    let animationFrameId: number | null = null;

    const easeInOut = (t: number): number => {
      return t < 0.5
        ? 2 * t * t
        : 1 - Math.pow(-2 * t + 2, 2) / 2;
    };

    const animate = () => {
      if (!startTime) startTime = Date.now();
      const elapsed = Date.now() - startTime;

      const newValues = progressItems.map((_, index) => {
        const rawProgress = Math.min(elapsed / progressDuration, 1);
        const easedProgress = easeInOut(rawProgress);
        return easedProgress * 100;
      });

      setProgressValues(newValues);

      if (elapsed >= progressDuration) {
        setAllProgressComplete(true);
        if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
        return;
      }

      const reviewIndex = Math.min(Math.floor((elapsed / progressDuration) * reviews.length), reviews.length - 1);
      setCurrentReview(reviews[reviewIndex]);

      animationFrameId = requestAnimationFrame(animate);
    };

    const startDelay = setTimeout(() => {
      setCurrentReview(reviews[0]);
      animationFrameId = requestAnimationFrame(animate);
    }, 50);

    return () => {
      clearTimeout(startDelay);
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Затримка 3 секунди після завершення всіх прогрес-барів
  useEffect(() => {
    if (allProgressComplete) {
      const timer = setTimeout(() => {
        setShowFinalScreen(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [allProgressComplete]);

  // Анімація друку тексту
  useEffect(() => {
    if (!showFinalScreen) return;

    const part1 = 'Ваш персональний план Mind Я ';
    const part2 = 'готовий!';
    
    let typeInterval1: NodeJS.Timeout | null = null;
    let typeInterval2: NodeJS.Timeout | null = null;
    let timeout1: NodeJS.Timeout | null = null;
    let timeout2: NodeJS.Timeout | null = null;
    let timeout3: NodeJS.Timeout | null = null;
    
    // Крок 1: друкуємо першу частину (0-2 сек)
    let charIndex = 0;
    typeInterval1 = setInterval(() => {
      if (charIndex < part1.length) {
        setTypedText(part1.substring(0, charIndex + 1));
        charIndex++;
      } else {
        if (typeInterval1) clearInterval(typeInterval1);
        
        // Затримка перед другою частиною
        timeout1 = setTimeout(() => {
          // Крок 2: друкуємо другу частину (2-3 сек)
          let charIndex2 = 0;
          typeInterval2 = setInterval(() => {
            if (charIndex2 < part2.length) {
              setTypedText(part1 + part2.substring(0, charIndex2 + 1));
              charIndex2++;
            } else {
              if (typeInterval2) clearInterval(typeInterval2);
              // Завершуємо друк, показуємо галочку та кнопку
              timeout2 = setTimeout(() => {
                setShowCheckmark(true);
                timeout3 = setTimeout(() => {
                  setShowButton(true);
                }, 300);
              }, 500);
            }
          }, 50); // Швидкість друку (~50ms на символ)
        }, 2000);
      }
    }, 50); // Швидкість друку (~50ms на символ)

    return () => {
      if (typeInterval1) clearInterval(typeInterval1);
      if (typeInterval2) clearInterval(typeInterval2);
      if (timeout1) clearTimeout(timeout1);
      if (timeout2) clearTimeout(timeout2);
      if (timeout3) clearTimeout(timeout3);
    };
  }, [showFinalScreen]);

  const handleGetPlan = () => {
    router.push('/welcome');
  };

  return (
    <>
      <Head>
        <title>Аналізуємо ваші відповіді - Mind Я</title>
      </Head>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          {!showFinalScreen ? (
            <>
              <h1 className={styles.title}>Аналізуємо ваші відповіді...</h1>

              <div className={styles.progressSection}>
                {progressItems.map((item, index) => (
                  <div key={index} className={styles.progressRow}>
                    <div className={styles.progressLabelContainer}>
                      <span className={styles.progressLabel}>{item.label}</span>
                      <span className={styles.progressPercent}>
                        {Math.round(progressValues[index])}%
                      </span>
                    </div>
                    <div className={styles.progressBarContainer}>
                      <div className={styles.progressBar}>
                        <div
                          className={styles.progressBarFilled}
                          style={{ width: `${progressValues[index]}%` }}
                        />
                      </div>
                      {progressValues[index] < 100 && (
                        <div className={styles.spinner}>
                          <div className={styles.spinnerCircle}></div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.reviewCard}>
                <div className={styles.reviewHeader}>
                  <div className={styles.stars}>
                    {Array.from({ length: currentReview.stars }, (_, i) => (
                      <span key={i} className={styles.star}>⭐</span>
                    ))}
                  </div>
                  <span className={styles.reviewAuthor}>{currentReview.author}</span>
                </div>
                <h3 className={styles.reviewTitle}>{currentReview.title}</h3>
                <p className={styles.reviewText}>{currentReview.text}</p>
              </div>
            </>
          ) : (
            <div className={styles.finalScreen}>
              {showCheckmark && (
                <div className={styles.checkmarkContainer}>
                  <div className={styles.checkmarkCircle}>
                    <svg
                      className={styles.checkmarkIcon}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 12L10 17L19 6"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              )}
              <h2 className={styles.finalTitle}>
                {typedText}
                {!showCheckmark && <span className={styles.cursor}>|</span>}
              </h2>
              {showButton && (
                <button className={styles.getPlanButton} onClick={handleGetPlan}>
                  Отримати план →
                </button>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Analysis;

