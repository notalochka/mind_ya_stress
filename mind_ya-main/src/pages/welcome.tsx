import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Header from '@/components/Header/Header';
import styles from './welcome.module.css';
import Footer from '@/components/Footer/Footer';

const Welcome: NextPage = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleContinue = () => {
    router.push('/improvements');
  };

  return (
    <>
      <Head>
        <title>Вітаємо! - Mind Я</title>
      </Head>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>
            Вітаємо, Ви приєднуєтесь до тисяч жінок, які обрали турботу про себе
          </h1>

          <div className={styles.collageContainer}>
            <Image
              src="/women_collage.jpg"
              alt="Колаж жінок"
              width={500}
              height={500}
              className={styles.collage}
              priority
            />
          </div>

          <div className={styles.statisticsContainer}>
            <Image
              src="/statistics.jpg"
              alt="Статистика"
              width={500}
              height={100}
              className={styles.statistics}
              priority
            />
          </div>

          <div className={styles.buttonsContainer}>
            <button className={styles.backButton} onClick={handleBack}>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M8.53463 6.05071C8.92515 5.66018 9.55832 5.66018 9.94884 6.05071C10.3394 6.44123 10.3394 7.07439 9.94884 7.46492L7.41331 10.0005H16.9844C17.5367 10.0005 17.9844 10.4482 17.9844 11.0005C17.9844 11.5527 17.5367 12.0005 16.9844 12.0005H7.41331L9.94884 14.536C10.3394 14.9265 10.3394 15.5597 9.94884 15.9502C9.55832 16.3407 8.92515 16.3407 8.53463 15.9502L4.29199 11.7076C3.90146 11.317 3.90146 10.6839 4.29199 10.2933L8.53463 6.05071Z" fill="#4A4A4B" />
              </svg>
              Назад
            </button>
            <button className={styles.continueButton} onClick={handleContinue}>
              Продовжити
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

export default Welcome;

