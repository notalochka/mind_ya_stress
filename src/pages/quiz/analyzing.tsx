import React, { useState, useEffect, useRef } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '@/components/Header/Header';
import QuizFooter from '@/components/QuizFooter/QuizFooter';
import styles from './analyzing.module.css';

type CheckStatus = 'hidden' | 'loading' | 'completed';

const Analyzing: NextPage = () => {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [check1Status, setCheck1Status] = useState<CheckStatus>('loading');
  const [check2Status, setCheck2Status] = useState<CheckStatus>('loading');
  const [check3Status, setCheck3Status] = useState<CheckStatus>('loading');

  // Встановлюємо темну тему для хедера
  useEffect(() => {
    // Встановлюємо темну тему: темний фон (#1a1a1a) та білий логотип
    document.documentElement.style.setProperty('--theme-header-bg', '#1a1a1a');
    document.documentElement.style.setProperty('--logo-color', '#ffffff');
    document.body.style.backgroundColor = '#1a1a1a';
    document.body.className = 'quiz-theme-dark';

    return () => {
      // Cleanup при розмонтуванні
      document.body.className = '';
      document.body.style.backgroundColor = '';
      document.documentElement.style.setProperty('--logo-color', '');
      document.documentElement.style.setProperty('--theme-header-bg', '');
    };
  }, []);

  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // Невелика затримка для коректного рендерингу перед початком анімації
    const initDelay = setTimeout(() => {
      // Анімація прогрес-бару протягом 9 секунд (0% -> 100%)
      const startTime = Date.now();
      const duration = 9000; // 9 секунд
      const targetProgress = 100;

      const updateProgress = () => {
        const elapsed = Date.now() - startTime;
        const newProgress = Math.min((elapsed / duration) * targetProgress, targetProgress);
        setProgress(Math.round(newProgress * 10) / 10); // Округлюємо до 1 знака після коми

        if (newProgress < targetProgress) {
          animationFrameRef.current = requestAnimationFrame(updateProgress);
        } else {
          setProgress(targetProgress);
          // Автоматичний перехід на сторінку результатів через 3 секунди після заповнення
          setTimeout(() => {
            router.push('/quiz/result');
          }, 3000);
        }
      };

      animationFrameRef.current = requestAnimationFrame(updateProgress);
    }, 50); // Невелика затримка для коректного рендерингу

    // Пункт 1: Замінюємо спінер на галочку через 3 секунди
    const check1CompleteTimer = setTimeout(() => {
      setCheck1Status('completed');
    }, 3050);

    // Пункт 2: Замінюємо спінер на галочку через 6 секунд
    const check2CompleteTimer = setTimeout(() => {
      setCheck2Status('completed');
    }, 6050);

    // Пункт 3: Замінюємо спінер на галочку через 9 секунд
    const check3CompleteTimer = setTimeout(() => {
      setCheck3Status('completed');
    }, 9050);

    return () => {
      clearTimeout(initDelay);
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      clearTimeout(check1CompleteTimer);
      clearTimeout(check2CompleteTimer);
      clearTimeout(check3CompleteTimer);
    };
  }, [router]);

  return (
    <>
      <Head>
        <title>Аналізуємо результати - Mind Я</title>
      </Head>
      <Header />
      <main className={styles.analyzingPage}>
        <div className={styles.container}>
          <h1 className={styles.title}>
            Аналізуємо твої відповіді
            {progress < 100 && (
              <span className={styles.dots}>
                <span className={styles.dot}>.</span>
                <span className={styles.dot}>.</span>
                <span className={styles.dot}>.</span>
              </span>
            )}
          </h1>

          {/* Прогрес-бар */}
          <div className={styles.progressSection}>
            <div className={styles.progressBarContainer}>
              <div 
                className={styles.progressBarFill}
                style={{ width: `${progress}%`, minWidth: progress > 0 ? '2px' : '0' }}
              />
            </div>
            <div className={styles.progressText}>{Math.round(progress)}%</div>
          </div>

          {/* Список перевірок */}
          <div className={styles.checksList}>
            {/* Пункт 1: Рівень стресу */}
            <div className={styles.checkItem}>
              <div className={styles.checkIcon}>
                {check1Status === 'loading' && (
                  <svg className={styles.spinner} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle className={styles.spinnerCircle} cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
                  </svg>
                )}
                {check1Status === 'completed' && (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <div className={styles.checkContent}>
                <span className={styles.checkLabel}>📊 Рівень стресу</span>
                {check1Status === 'loading' && (
                  <span className={styles.checkStatus}>
                    Визначаємо<span className={styles.dots}>
                      <span className={styles.dot}>.</span>
                      <span className={styles.dot}>.</span>
                      <span className={styles.dot}>.</span>
                    </span>
                  </span>
                )}
                {check1Status === 'completed' && <span className={styles.checkStatus}>Визначено</span>}
              </div>
            </div>

            {/* Пункт 2: Вплив на життя */}
            <div className={styles.checkItem}>
              <div className={styles.checkIcon}>
                {check2Status === 'loading' && (
                  <svg className={styles.spinner} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle className={styles.spinnerCircle} cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
                  </svg>
                )}
                {check2Status === 'completed' && (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <div className={styles.checkContent}>
                <span className={styles.checkLabel}>📈 Вплив на життя</span>
                {check2Status === 'loading' && (
                  <span className={styles.checkStatus}>
                    Аналізуємо<span className={styles.dots}>
                      <span className={styles.dot}>.</span>
                      <span className={styles.dot}>.</span>
                      <span className={styles.dot}>.</span>
                    </span>
                  </span>
                )}
                {check2Status === 'completed' && <span className={styles.checkStatus}>Проаналізовано</span>}
              </div>
            </div>

            {/* Пункт 3: Персональні рекомендації */}
            <div className={styles.checkItem}>
              <div className={styles.checkIcon}>
                {check3Status === 'loading' && (
                  <svg className={styles.spinner} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle className={styles.spinnerCircle} cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
                  </svg>
                )}
                {check3Status === 'completed' && (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <div className={styles.checkContent}>
                <span className={styles.checkLabel}>🎯 Персональні рекомендації</span>
                {check3Status === 'loading' && (
                  <span className={styles.checkStatus}>
                    Формуємо<span className={styles.dots}>
                      <span className={styles.dot}>.</span>
                      <span className={styles.dot}>.</span>
                      <span className={styles.dot}>.</span>
                    </span>
                  </span>
                )}
                {check3Status === 'completed' && <span className={styles.checkStatus}>Сформовано</span>}
              </div>
            </div>
          </div>

          {/* Роздільник */}
          <div className={styles.divider}></div>

          {/* Відгук */}
          <div className={styles.testimonial}>
              <div className={styles.stars}>⭐⭐⭐⭐⭐</div>
              <p className={styles.testimonialText}>
                Точно описали мою ситуацію — наче читали думки
              </p>
              <p className={styles.testimonialAuthor}>Наталя, 36</p>
            </div>
        </div>
      </main>
      <QuizFooter />
    </>
  );
};

export default Analyzing;

