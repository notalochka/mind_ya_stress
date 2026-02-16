import React, { useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import QuizFooter from '@/components/QuizFooter/QuizFooter';
import styles from './stories.module.css';

const Stories: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Встановлюємо світлу тему для хедера
    document.documentElement.style.setProperty('--theme-header-bg', '#fff');
    document.documentElement.style.setProperty('--logo-color', 'var(--color-primary)');
    document.body.style.backgroundColor = '#fff';
    document.body.className = '';

    return () => {
      document.body.className = '';
      document.body.style.backgroundColor = '';
      document.documentElement.style.setProperty('--logo-color', '');
      document.documentElement.style.setProperty('--theme-header-bg', '');
    };
  }, []);

  const handleTryClick = () => {
    router.push('/quiz/plan-ready');
  };

  return (
    <>
      <Head>
        <title>Історії - Mind Я</title>
      </Head>
      <Header />
      <main className={styles.storiesPage}>
        <div className={styles.container}>
          <h1 className={styles.title}>
          Вони починали точно так, як ти зараз
          </h1>

          <div className={styles.storiesList}>
            <div className={styles.storyCard}>
              <div className={styles.stars}>⭐⭐⭐⭐⭐</div>
              <p className={styles.storyAuthor}>Юлія, 26, Київ</p>
              <p className={styles.storyText}>
                Засинала о 3 ночі, бо голова не вимикалась. Вставала розбита, на роботі як зомбі. Почала робити практику перед сном — на 3-й день вперше заснула до 12. Зараз це моя щовечірня рутина, як зуби почистити.
              </p>
            </div>

            <div className={styles.storyCard}>
              <div className={styles.stars}>⭐⭐⭐⭐⭐</div>
              <p className={styles.storyAuthor}>Олена, 33, Львів</p>
              <p className={styles.storyText}>
                Двоє дітей, чоловік на фронті. Я кричала на дітей за кожну дрібницю, а потім плакала від сорому. Через тиждень практик донька сказала: мамо, ти стала добріша. Це було найкраще, що я чула за рік.
              </p>
            </div>

            <div className={styles.storyCard}>
              <div className={styles.stars}>⭐⭐⭐⭐⭐</div>
              <p className={styles.storyAuthor}>Марина, 29, Дніпро</p>
              <p className={styles.storyText}>
                Від кожної сирени серце вискакувало. Руки тряслись, не могла дихати. Зараз, коли відчуваю що накриває — роблю техніку 60 секунд. Працює як перезавантаження. Навіть на роботі в туалеті, ніхто не знає.
              </p>
            </div>

            <div className={styles.storyCard}>
              <div className={styles.stars}>⭐⭐⭐⭐⭐</div>
              <p className={styles.storyAuthor}>Ірина, 41, Одеса</p>
              <p className={styles.storyText}>
                Снодійні, мелатонін, вино на ніч — нічого не давало нормального сну. Тут інший підхід, через тіло. На 4-й день вперше прокинулась відпочилою. Забула вже, як це — висипатись.
              </p>
            </div>

            <div className={styles.storyCard}>
              <div className={styles.stars}>⭐⭐⭐⭐⭐</div>
              <p className={styles.storyAuthor}>Наталя, 47, Харків</p>
              <p className={styles.storyText}>
                Живу в напрузі з 2022. Думала — це тепер назавжди, треба просто терпіти. За 2 тижні навчилась ловити момент, коли починає накривати, і зупиняти це. Раніше не вміла, навіть не знала що так можна.
              </p>
            </div>
          </div>

          <div className={styles.statImageContainer}>
            <Image
              src="/stat1.jpg"
              alt="Statistics"
              width={800}
              height={400}
              className={styles.statImage}
              unoptimized
            />
          </div>

          <button className={styles.tryButton} onClick={handleTryClick}>
            <span>Хочу спробувати</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </main>
      <QuizFooter />
    </>
  );
};

export default Stories;

