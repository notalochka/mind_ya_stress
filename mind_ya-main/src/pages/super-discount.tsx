import React, { useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from './super-discount.module.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

const SuperDiscount: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Встановлюємо темну тему для хедера
    document.documentElement.style.setProperty('--theme-header-bg', '#5671A6');
    document.body.classList.add('quiz-theme-primary');

    return () => {
      // Очищаємо при розмонтуванні
      document.documentElement.style.removeProperty('--theme-header-bg');
      document.body.classList.remove('quiz-theme-primary');
    };
  }, []);

  const handleGetDiscount = () => {
    router.push('/plan-ready-2');
  };

  return (
    <>
      <Head>
        <title>Отримайте план з СУПЕР-знижкою! - Mind Я</title>
      </Head>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.imageContainer}>
            <Image
              src="/procent-2.png"
              alt="СУПЕР-знижка"
              width={600}
              height={600}
              className={styles.discountImage}
              priority
            />
          </div>

          <h1 className={styles.title}>Отримайте план з СУПЕР-знижкою!</h1>

          <div className={styles.textContainer}>
            <p className={styles.text}>
              Ми впевнені, що програма Mind Я допоможе вам знизити тривогу та повернути спокій. Це підтверджують тисячі позитивних відгуків.
            </p>
            <p className={styles.text}>
              Ми хочемо, щоб ви досягли своєї мети. Тому даємо вам додаткову знижку — почніть турбуватися про себе за найкращою ціною.
            </p>
          </div>

          <button className={styles.discountButton} onClick={handleGetDiscount}>
            Отримати знижку
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default SuperDiscount;

