import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import QuizFooter from '@/components/QuizFooter/QuizFooter';
import styles from './result.module.css';

const USER_AGE_KEY = 'mind_ya_user_age';

const Result: NextPage = () => {
  const router = useRouter();
  const [userAge, setUserAge] = useState<string>('');

  useEffect(() => {
    // Встановлюємо світлу тему для хедера
    document.documentElement.style.setProperty('--theme-header-bg', '#fff');
    document.documentElement.style.setProperty('--logo-color', 'var(--color-primary)');
    document.body.style.backgroundColor = '#fff';
    document.body.className = '';

    // Завантажуємо дані з sessionStorage
    if (typeof window !== 'undefined') {
      // Отримуємо вік
      const age = sessionStorage.getItem(USER_AGE_KEY) || '';
      setUserAge(age);

    }

    return () => {
      document.body.className = '';
      document.body.style.backgroundColor = '';
      document.documentElement.style.setProperty('--logo-color', '');
      document.documentElement.style.setProperty('--theme-header-bg', '');
    };
  }, []);

  return (
    <>
      <Head>
        <title>Твій результат - Mind Я</title>
      </Head>
      <Header />
      <main className={styles.resultPage}>
        <div className={styles.container}>
          <h1 className={styles.title}>
            📋 Твій результат готовий
          </h1>

          <div className={styles.stressLevel}>
            <span className={styles.stressLevelLabel}>🔴 Рівень стресу:</span>
            <span className={styles.stressLevelValue}>ВИСОКИЙ</span>
          </div>

          <p className={styles.description}>
            Твоя нервова система працює на межі. Це не характер — це виснаження.
          </p>

          <div className={styles.insightsSection}>
            <h2 className={styles.insightsTitle}>На основі твоїх відповідей:</h2>
            <div className={styles.insightsList}>
              <p className={styles.insightItem}>
                😔 Ти відчуваєш постійну тривогу — і це забирає сили щодня
              </p>
              <p className={styles.insightItem}>
                😔 Потрібно заспокоїти нервову систему
              </p>
              <p className={styles.insightItem}>
                😔 Те, що пробувала раніше — не працює, бо не прибирає причину
              </p>
            </div>
          </div>

          <div className={styles.goodNewsSection}>
            <div className={styles.goodNewsBadge}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                <path d="M2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
              <span>ХОРОША НОВИНА</span>
            </div>

            <p className={styles.goodNewsText}>
              Це можна змінити — і швидше, ніж здається.
            </p>
            <p className={styles.goodNewsText}>
              Ми підготували для тебе персональний старт: 2 дні практик, щоб ти <strong>ВІДЧУЛА</strong> різницю в тілі.
            </p>
            <p className={styles.goodNewsText}>
              Не "повірила", а саме відчула.
            </p>
          </div>

          <div className={styles.statsSection}>
            <p className={styles.statsText}>
              78% жінок твого віку ({userAge}) відчули полегшення вже на 2-й день
            </p>
            <p className={styles.statsSource}>
              За даними опитування 1,200+ користувачок Mind Я
            </p>
            <div className={styles.chartContainer}>
              <Image
                src="/chart1.jpg"
                alt="Statistics chart"
                width={800}
                height={400}
                className={styles.chart}
                unoptimized
              />
            </div>
            <button 
              className={styles.understandButton}
              onClick={() => router.push('/quiz/stories')}
            >
              <span>Зрозуміло</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
      </main>
      <QuizFooter />
    </>
  );
};

export default Result;

