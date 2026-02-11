import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Header from '@/components/Header/Header';
import styles from './time-required.module.css';
import Footer from '@/components/Footer/Footer';

const TimeRequired: NextPage = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleGotIt = () => {
    router.push('/final-result');
  };

  return (
    <>
      <Head>
        <title>Хороша новина - Mind Я</title>
      </Head>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>
            Хороша новина: потрібно лише 10 хвилин на день
          </h1>

          <div className={styles.clockContainer}>
            <Image
              src="/clock.jpg"
              alt="Годинник"
              width={400}
              height={400}
              className={styles.clock}
              priority
            />
          </div>

          <div className={styles.equipmentSection}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className={styles.equipmentIcon}
            >
              <path
                d="M12.0821 16.6411C12.5841 17.1437 12.581 17.9523 12.0821 18.4512L10.9532 19.5801C10.4585 20.0761 9.64528 20.0824 9.14303 19.5801L4.41974 14.8568C3.92089 14.3577 3.92089 13.5456 4.41974 13.0467L5.54865 11.9178C6.04753 11.4189 6.85617 11.4158 7.3588 11.9178L12.0821 16.6411ZM4.61004 16.087C4.49455 15.9715 4.30256 15.9927 4.21342 16.1296C3.85929 16.6731 3.9685 17.3283 4.3743 17.7342L6.26573 19.6256C6.66802 20.0279 7.32277 20.1436 7.87013 19.7867C8.00702 19.6974 8.02849 19.5055 7.91295 19.3899L4.61004 16.087ZM12.8584 9.39855C12.6584 9.19888 12.3342 9.19888 12.1342 9.39855L9.39838 12.1344C9.19839 12.3344 9.19839 12.6586 9.39838 12.8585L11.1413 14.6015C11.3407 14.8008 11.6648 14.8015 11.8655 14.6015L14.6013 11.8656C14.8013 11.6656 14.8013 11.3415 14.6013 11.1415L12.8584 9.39855ZM19.3903 7.91248C19.5059 8.02806 19.6979 8.00653 19.7871 7.86957C20.1438 7.32208 20.0266 6.66717 19.6254 6.26591L17.734 4.37448C17.3292 3.96996 16.6743 3.85847 16.1301 4.21292C15.9932 4.30207 15.9719 4.49409 16.0874 4.60961L19.3903 7.91248ZM14.8567 4.41992C14.3575 3.92106 13.5454 3.92074 13.0465 4.41992L11.9176 5.54882C11.4187 6.04768 11.4156 6.85631 11.9176 7.35897L16.6409 12.0823C17.144 12.5847 17.9527 12.5806 18.4511 12.0823L19.58 10.9534C20.0788 10.4545 20.0788 9.64238 19.58 9.14321L14.8567 4.41992Z"
                fill="#111113"
              />
            </svg>
            <span className={styles.equipmentText}>
              Обладнання: <strong>не потрібно</strong>
            </span>
          </div>

          <div className={styles.noteSection}>
            <div className={styles.noteLine}></div>
            <div className={styles.noteContent}>
              <p className={styles.noteText}>
                <strong>Примітка:</strong> Для вправ потрібні лише ви та 10 хвилин. Працює без світла, без інтернету, без обладнання.
              </p>
            </div>
          </div>

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

export default TimeRequired;

