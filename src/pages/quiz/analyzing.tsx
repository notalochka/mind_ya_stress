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
  const [check4Status, setCheck4Status] = useState<CheckStatus>('loading');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Валідація email
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(email));
  }, [email]);

  // Встановлюємо темну тему для хедера
  useEffect(() => {
    // Прокручуємо сторінку вгору при завантаженні
    window.scrollTo({ top: 0, behavior: 'smooth' });

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
      const duration = 10000; // 10 секунд
      const targetProgress = 100;

      const updateProgress = () => {
        const elapsed = Date.now() - startTime;
        const newProgress = Math.min((elapsed / duration) * targetProgress, targetProgress);
        setProgress(Math.round(newProgress * 10) / 10); // Округлюємо до 1 знака після коми

        if (newProgress < targetProgress) {
          animationFrameRef.current = requestAnimationFrame(updateProgress);
        } else {
          setProgress(targetProgress);
          // Показуємо модальне вікно з формою email через 3 секунди після заповнення
          setTimeout(() => {
            setIsModalOpen(true);
          }, 3000);
        }
      };

      animationFrameRef.current = requestAnimationFrame(updateProgress);
    }, 50); // Невелика затримка для коректного рендерингу

    // Пункт 1: Замінюємо спінер на галочку через 3 секунди
    const check1CompleteTimer = setTimeout(() => {
      setCheck1Status('completed');
    }, 2500);

    // Пункт 2: Замінюємо спінер на галочку через 6 секунд
    const check2CompleteTimer = setTimeout(() => {
      setCheck2Status('completed');
    }, 5000);

    // Пункт 3: Замінюємо спінер на галочку через 9 секунд
    const check3CompleteTimer = setTimeout(() => {
      setCheck3Status('completed');
    }, 7500);

    const check4CompleteTimer = setTimeout(() => {
      setCheck4Status('completed');
    }, 10000);

    return () => {
      clearTimeout(initDelay);
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      clearTimeout(check1CompleteTimer);
      clearTimeout(check2CompleteTimer);
      clearTimeout(check3CompleteTimer);
      clearTimeout(check4CompleteTimer);
    };
  }, [router]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleEmailSubmit = async () => {
    if (!isEmailValid || isSubmitting) return;
  
    setIsSubmitting(true);
    
    // Відправляємо запит в фоні, не чекаючи на відповідь
    fetch('/api/save-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    }).catch((error) => {
      // Логуємо помилку, але не блокуємо перехід
      console.error('Помилка збереження email:', error);
    });
  
    // Одразу переходимо на наступну сторінку (оптимістичний UI)
    window.scrollTo({ top: 0, behavior: 'smooth' });
    router.push('/quiz/result');
  };

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
                    Визначаємо ступінь виснаження<span className={styles.dots}>
                      <span className={styles.dot}>.</span>
                      <span className={styles.dot}>.</span>
                      <span className={styles.dot}>.</span>
                    </span>
                  </span>
                )}
                {check1Status === 'completed' && <span className={styles.checkStatus}>Визначено ступінь виснаження</span>}
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
                    Оцінюємо наслідки<span className={styles.dots}>
                      <span className={styles.dot}>.</span>
                      <span className={styles.dot}>.</span>
                      <span className={styles.dot}>.</span>
                    </span>
                  </span>
                )}
                {check2Status === 'completed' && <span className={styles.checkStatus}>Проаналізовано наслідки</span>}
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
                <span className={styles.checkLabel}>💊 Що не спрацювало</span>
                {check3Status === 'loading' && (
                  <span className={styles.checkStatus}>
                    Підбираємо інший підхід<span className={styles.dots}>
                      <span className={styles.dot}>.</span>
                      <span className={styles.dot}>.</span>
                      <span className={styles.dot}>.</span>
                    </span>
                  </span>
                )}
                {check3Status === 'completed' && <span className={styles.checkStatus}>Підібрано інший підхід</span>}
              </div>
            </div>

            {/* Пункт 4: Персональні рекомендації */}
            <div className={styles.checkItem}>
              <div className={styles.checkIcon}>
                {check4Status === 'loading' && (
                  <svg className={styles.spinner} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle className={styles.spinnerCircle} cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
                  </svg>
                )}
                {check4Status === 'completed' && (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <div className={styles.checkContent}>
                <span className={styles.checkLabel}>🎯 Персональні рекомендації</span>
                {check4Status === 'loading' && (
                  <span className={styles.checkStatus}>
                    Формуємо план<span className={styles.dots}>
                      <span className={styles.dot}>.</span>
                      <span className={styles.dot}>.</span>
                      <span className={styles.dot}>.</span>
                    </span>
                  </span>
                )}
                {check4Status === 'completed' && <span className={styles.checkStatus}>Сформовано план</span>}
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

      {/* Модальне вікно з введенням email */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2 className={styles.modalTitle}>
            📊 Твої відповіді проаналізовано
            </h2>
            <p className={styles.modalText}>
              Ми підготували персональний звіт про твій рівень стресу та план відновлення.
            </p>
            <p className={styles.modalTextTitle}>
              Куди надіслати результати?
            </p>
            <div className={styles.emailInputContainer}>
              <input
                type="email"
                placeholder="Введіть ваш email"
                value={email}
                onChange={handleEmailChange}
                className={styles.emailInput}
                autoFocus
              />
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={styles.lockIcon}
              >
                <path
                  d="M15.8333 9.16667H15V6.66667C15 3.825 12.675 1.5 9.83333 1.5C6.99167 1.5 4.66667 3.825 4.66667 6.66667V9.16667H3.83333C3.375 9.16667 3 9.54167 3 10V16.6667C3 17.125 3.375 17.5 3.83333 17.5H15.8333C16.2917 17.5 16.6667 17.125 16.6667 16.6667V10C16.6667 9.54167 16.2917 9.16667 15.8333 9.16667ZM10.8333 13.7917V15.2083C10.8333 15.4583 10.625 15.6667 10.375 15.6667H9.625C9.375 15.6667 9.16667 15.4583 9.16667 15.2083V13.7917C8.875 13.625 8.66667 13.3333 8.66667 13C8.66667 12.5417 9.04167 12.1667 9.5 12.1667H10.5C10.9583 12.1667 11.3333 12.5417 11.3333 13C11.3333 13.3333 11.125 13.625 10.8333 13.7917ZM12.8333 9.16667H6.16667V6.66667C6.16667 4.50833 7.675 2.83333 9.83333 2.83333C11.9917 2.83333 13.5 4.50833 13.5 6.66667V9.16667H12.8333Z"
                  fill="#999"
                />
              </svg>
            </div>

            <p className={styles.modalDisclaimer}>
            🔒 Без спаму. Тільки твій звіт + 1 корисна техніка.
            </p>

            <button
              className={`${styles.modalButton} ${isEmailValid && !isSubmitting ? styles.modalButtonActive : styles.modalButtonDisabled}`}
              onClick={handleEmailSubmit}
              disabled={!isEmailValid || isSubmitting}
            >
              <span>{isSubmitting ? 'Відправка...' : 'Отримати мій звіт'}</span>
              {!isSubmitting && (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Analyzing;

