import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '@/components/Header/Header';
import styles from './improvements.module.css';
import Footer from '@/components/Footer/Footer';

interface ImprovementItem {
  icon: React.ReactNode;
  text: string;
}

const improvements: ImprovementItem[] = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="#5671A6"/>
        <path d="M12 6C11.45 6 11 6.45 11 7V12C11 12.55 11.45 13 12 13C12.55 13 13 12.55 13 12V7C13 6.45 12.55 6 12 6Z" fill="#5671A6"/>
        <circle cx="12" cy="16" r="1" fill="#5671A6"/>
        <circle cx="6" cy="8" r="0.8" fill="#5671A6"/>
        <circle cx="18" cy="8" r="0.8" fill="#5671A6"/>
        <circle cx="8" cy="6" r="0.6" fill="#5671A6"/>
        <circle cx="16" cy="6" r="0.6" fill="#5671A6"/>
      </svg>
    ),
    text: 'Якість сну'
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="#5671A6"/>
        <path d="M12 4C11.45 4 11 4.45 11 5V7C11 7.55 11.45 8 12 8C12.55 8 13 7.55 13 7V5C13 4.45 12.55 4 12 4Z" fill="#5671A6"/>
        <path d="M8 10C7.45 10 7 10.45 7 11C7 11.55 7.45 12 8 12C8.55 12 9 11.55 9 11C9 10.45 8.55 10 8 10Z" fill="#5671A6"/>
        <path d="M16 10C15.45 10 15 10.45 15 11C15 11.55 15.45 12 16 12C16.55 12 17 11.55 17 11C17 10.45 16.55 10 16 10Z" fill="#5671A6"/>
        <path d="M12 14C10.9 14 10 14.9 10 16C10 17.1 10.9 18 12 18C13.1 18 14 17.1 14 16C14 14.9 13.1 14 12 14Z" fill="#5671A6"/>
      </svg>
    ),
    text: 'Рівень спокою та контроль тривоги'
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 2L3 14H12V22L22 10H13V2Z" fill="#5671A6"/>
      </svg>
    ),
    text: 'Енергію та сили на себе'
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#5671A6"/>
        <path d="M2 17L12 22L22 17" stroke="#5671A6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 12L12 17L22 12" stroke="#5671A6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    text: 'Стійкість до стресу та новин'
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#5671A6"/>
      </svg>
    ),
    text: 'Впевненість у собі'
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" fill="#5671A6"/>
      </svg>
    ),
    text: 'Терпіння та стосунки з близькими'
  }
];

const Improvements: NextPage = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleGotIt = () => {
    router.push('/time-required');
  };

  return (
    <>
      <Head>
        <title>Ваш план Mind Я - Mind Я</title>
      </Head>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>
            Ваш план Mind Я допоможе покращити:
          </h1>

          <ul className={styles.improvementsList}>
            {improvements.map((item, index) => (
              <li key={index} className={styles.improvementItem}>
                <div className={styles.iconContainer}>
                  {item.icon}
                </div>
                <div className={styles.textAndArrow}>
                  <span className={styles.improvementText}>{item.text}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className={styles.arrow}
                  >
                    <path
                      d="M7.5 3L15 12.5976H0L7.5 3Z"
                      fill={`url(#paint0_linear_${index})`}
                    />
                    <defs>
                      <linearGradient
                        id={`paint0_linear_${index}`}
                        x1="7.5"
                        y1="3"
                        x2="7.5"
                        y2="12.5976"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0.395833" stopColor="#53CC58" />
                        <stop offset="1" stopColor="#429746" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </li>
            ))}
          </ul>

          <div className={styles.buttonsContainer}>
            <button className={styles.backButton} onClick={handleBack}>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M8.53463 6.05071C8.92515 5.66018 9.55832 5.66018 9.94884 6.05071C10.3394 6.44123 10.3394 7.07439 9.94884 7.46492L7.41331 10.0005H16.9844C17.5367 10.0005 17.9844 10.4482 17.9844 11.0005C17.9844 11.5527 17.5367 12.0005 16.9844 12.0005H7.41331L9.94884 14.536C10.3394 14.9265 10.3394 15.5597 9.94884 15.9502C9.55832 16.3407 8.92515 16.3407 8.53463 15.9502L4.29199 11.7076C3.90146 11.317 3.90146 10.6839 4.29199 10.2933L8.53463 6.05071Z" fill="#4A4A4B" />
              </svg>
              Назад
            </button>
            <button className={styles.continueButton} onClick={handleGotIt}>
              Зрозуміло
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M13.4654 6.05071C13.0748 5.66018 12.4417 5.66018 12.0512 6.05071C11.6606 6.44123 11.6606 7.07439 12.0512 7.46492L14.5867 10.0005H5.01562C4.46334 10.0005 4.01562 10.4482 4.01562 11.0005C4.01562 11.5527 4.46334 12.0005 5.01562 12.0005H14.5867L12.0512 14.536C11.6606 14.9265 11.6606 15.5597 12.0512 15.9502C12.4417 16.3407 13.0748 16.3407 13.4654 15.9502L17.708 11.7076C18.0985 11.317 18.0985 10.6839 17.708 10.2933L13.4654 6.05071Z" fill="white" />
              </svg>
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Improvements;

