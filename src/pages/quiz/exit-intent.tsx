import React, { useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '@/components/Header/Header';
import QuizFooter from '@/components/QuizFooter/QuizFooter';
import styles from './exit-intent.module.css';

const ExitIntent: NextPage = () => {
  const router = useRouter();

  // Прокручуємо сторінку вгору при завантаженні
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleTry = () => {
    // Встановлюємо прапорець для зниженої ціни
    sessionStorage.setItem('discountPrice', '99');
    sessionStorage.setItem('discountPercent', '80');
    // Перехід на сторінку оплати зі знижкою
    window.scrollTo({ top: 0, behavior: 'smooth' });
    router.push('/quiz/plan-ready?discount=true#pricing-section');
  };

  const handleClose = () => {
    // Перенаправляємо на головну сторінку
    window.scrollTo({ top: 0, behavior: 'smooth' });
    router.push('/');
  };

  return (
    <div className={styles.pageWrapper}>
      <Head>
        <title>Зачекай - Mind Я</title>
      </Head>

      <Header />

      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.content}>
            <h1 className={styles.title}>Зачекай 💛</h1>
            
            <p className={styles.text}>
              Я бачу, що ти ще не готова — і це нормально.
            </p>
            
            <p className={styles.text}>
              Але твої відповіді показали високий рівень стресу.
            </p>
            
            <p className={styles.text}>
              Це не зникне само.
            </p>
            
            <p className={styles.subtitle}>Подумай:</p>
            
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <svg className={styles.arrowIcon} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 10H15M15 10L11 6M15 10L11 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>149 грн — це одна кава з десертом</span>
              </li>
              <li className={styles.listItem}>
                <svg className={styles.arrowIcon} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 10H15M15 10L11 6M15 10L11 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>3 дні — це ~20 хвилин твого часу</span>
              </li>
              <li className={styles.listItem}>
                <svg className={styles.arrowIcon} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 10H15M15 10L11 6M15 10L11 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Не сподобається — повернемо гроші</span>
              </li>
            </ul>
            
            <p className={styles.question}>Що ти втратиш, якщо спробуєш?</p>
            
            <p className={styles.warning}>
              А якщо не спробуєш — ще тиждень, місяць, рік того самого виснаження.
            </p>
            
            <div className={styles.buttons}>
              <button className={styles.primaryButton} onClick={handleTry}>
                Добре, спробую за 99 грн
              </button>
              <button className={styles.secondaryButton} onClick={handleClose}>
                Ні, дякую — закрити
              </button>
            </div>
          </div>
        </div>
      </main>

      <QuizFooter />
    </div>
  );
};

export default ExitIntent;

