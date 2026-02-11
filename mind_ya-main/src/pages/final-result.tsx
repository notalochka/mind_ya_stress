import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Header from '@/components/Header/Header';
import styles from './final-result.module.css';
import Footer from '@/components/Footer/Footer';

const FinalResult: NextPage = () => {
  const router = useRouter();
  const [userAge, setUserAge] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Завантажуємо збережений вік з sessionStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedAge = sessionStorage.getItem('mind_ya_user_age');
        if (savedAge) {
          setUserAge(savedAge);
        }
      } catch (error) {
        console.error('Помилка при завантаженні віку користувача:', error);
      }
    }
  }, []);

  // Валідація email
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(email));
  }, [email]);

  const handleContinue = () => {
    setIsModalOpen(true);
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
    router.push('/plan-ready');
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  // Форматуємо вік для відображення
  const getAgeText = () => {
    if (!userAge) return 'вашої вікової групи';
    // Якщо вік містить "+", додаємо "років" після, інакше додаємо "років" після діапазону
    return userAge.includes('+') ? `${userAge} років` : `${userAge} років`;
  };

  return (
    <>
      <Head>
        <title>Фінальний результат - Mind Я</title>
      </Head>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.infoPage}>
            <h1 className={styles.title}>Фінальний результат</h1>
            <h2 className={styles.subtitle}>
              Ви можете <span>знизити рівень тривоги</span> та <span>повернути відчуття контролю</span>
            </h2>

            <div className={styles.chartContainer}>
              <Image
                src="/step-27.jpg"
                alt="Progress chart"
                width={800}
                height={500}
                className={styles.chart}
              />
            </div>
            <p className={styles.chartDisclaimer}>*лише для ілюстрації</p>

            <div className={styles.compatibilitySection}>
              <h3 className={styles.compatibilityTitle}>
                Індекс сумісності: <span className={styles.compatibilityHigh}>Високий</span>
              </h3>

              <div className={styles.scoreContainer}>
                <Image
                  src="/score.jpg"
                  alt="Спідометр сумісності"
                  width={400}
                  height={300}
                  className={styles.scoreImage}
                />
                <div className={styles.scorePercentage}>87.1%</div>
              </div>

              <p className={styles.compatibilityText}>
                <strong>87.1% жінок</strong> вашої вікової групи <strong>({getAgeText()})</strong> відзначають помітні покращення після проходження програми Mind Я
              </p>
              <p className={styles.disclaimer}>*статистика на основі внутрішнього опитування</p>
            </div>

            <button className={styles.continueButton} onClick={handleContinue}>
              Продовжити
            </button>
          </div>
        </div>
      </main>

      {/* Модальне вікно з введенням email */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2 className={styles.modalTitle}>
              Введіть email, щоб отримати ваш персональний план від Mind Я
            </h2>
            
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
              Ваші дані в безпеці. Ми використовуємо email для надсилання плану та оновлень.
            </p>

            <button
              className={`${styles.modalButton} ${isEmailValid && !isSubmitting ? styles.modalButtonActive : styles.modalButtonDisabled}`}
              onClick={handleEmailSubmit}
              disabled={!isEmailValid || isSubmitting}
            >
              {isSubmitting ? 'Відправка...' : 'Продовжити'}
            </button>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default FinalResult;

