import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './InfoPagePractice.module.css';

interface InfoPagePracticeProps {
  onContinue?: () => void;
}

const InfoPagePractice: React.FC<InfoPagePracticeProps> = ({ onContinue }) => {
  const router = useRouter();
  const { step } = router.query;
  const currentStepNumber = step ? parseInt(step as string, 10) : 1;

  const [isStarted, setIsStarted] = useState(false);
  const [step1Timer, setStep1Timer] = useState<number | null>(null);
  const [step2Timer, setStep2Timer] = useState<number | null>(null);
  const [step3Timer, setStep3Timer] = useState<number | null>(null);
  const [step2Status, setStep2Status] = useState<'waiting' | 'active' | 'completed'>('waiting');
  const [step3Status, setStep3Status] = useState<'waiting' | 'active' | 'completed'>('waiting');

  const handleContinue = () => {
    if (onContinue) {
      onContinue();
    } else {
      router.push(`/quiz?step=${currentStepNumber + 1}`, undefined, { shallow: true });
    }
  };

  // Таймер для кроку 1
  useEffect(() => {
    if (isStarted && step1Timer !== null && step1Timer > 0) {
      const timeout = setTimeout(() => {
        setStep1Timer(step1Timer - 1);
      }, 1000);
      return () => clearTimeout(timeout);
    } else if (isStarted && step1Timer === 0) {
      // Запускаємо таймер для кроку 2
      setStep2Status('active');
      setStep2Timer(3);
    }
  }, [isStarted, step1Timer]);

  // Таймер для кроку 2
  useEffect(() => {
    if (step2Timer !== null && step2Timer > 0) {
      const timeout = setTimeout(() => {
        setStep2Timer(step2Timer - 1);
      }, 1000);
      return () => clearTimeout(timeout);
    } else if (step2Timer === 0) {
      // Запускаємо таймер для кроку 3
      setStep2Status('completed');
      setStep3Status('active');
      setStep3Timer(5);
    }
  }, [step2Timer]);

  // Таймер для кроку 3
  useEffect(() => {
    if (step3Timer !== null && step3Timer > 0) {
      const timeout = setTimeout(() => {
        setStep3Timer(step3Timer - 1);
      }, 1000);
      return () => clearTimeout(timeout);
    } else if (step3Timer === 0) {
      setStep3Status('completed');
    }
  }, [step3Timer]);

  const startPractice = () => {
    setIsStarted(true);
    setStep1Timer(5);
    setStep2Timer(null);
    setStep3Timer(null);
    setStep2Status('waiting');
    setStep3Status('waiting');
  };

  return (
    <div className={styles.infoPage}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          Хочеш відчути це на собі? Прямо зараз
        </h1>
        <p className={styles.instruction}>
          Поклади руки на коліна або на стіл.
        </p>
        <div className={styles.stepsContainer}>
          {/* Крок 1 */}
          <div className={`${styles.step} ${isStarted && step1Timer !== null && step1Timer > 0 ? styles.stepActive : ''} ${step1Timer !== null && step1Timer === 0 ? styles.stepCompletedContainer : ''}`}>
            <div className={styles.stepNumber}>Крок 1:</div>
            <p className={styles.stepText}>
              Стисни кулаки. Сильно.<br />
              Уяви, що ти стискаєш в них увесь свій день.<br />
              Усю втому. Усі розмови. Усі тривоги.<br />
              Тримай...
            </p>
            {step1Timer !== null && step1Timer > 0 && (
              <div className={styles.timer}>
                {step1Timer}
              </div>
            )}
            {step1Timer === 0 && (
              <div className={styles.stepCompletedIcon}>✓</div>
            )}
          </div>

          {/* Крок 2 */}
          <div className={`${styles.step} ${step2Status === 'active' ? styles.stepActive : ''} ${step2Status === 'completed' ? styles.stepCompletedContainer : ''}`}>
            <div className={styles.stepNumber}>Крок 2:</div>
            <p className={styles.stepText}>
              Різко розтисни.<br />
              Розведи пальці якомога ширше. І видихни.
            </p>
            {step2Timer !== null && step2Timer > 0 && (
              <div className={styles.timer}>
                {step2Timer}
              </div>
            )}
            {step2Timer === 0 && (
              <div className={styles.stepCompletedIcon}>✓</div>
            )}
          </div>

          {/* Крок 3 */}
          <div className={`${styles.step} ${step3Status === 'active' ? styles.stepActive : ''} ${step3Status === 'completed' ? styles.stepCompletedContainer : ''}`}>
            <div className={styles.stepNumber}>Крок 3:</div>
            <p className={styles.stepText}>
              Тепер просто відчуй долоні.<br />
              Нічого не роби. Просто поміть, що відбувається.
            </p>
            {step3Timer !== null && step3Timer > 0 && (
              <div className={styles.timer}>
                {step3Timer}
              </div>
            )}
            {step3Timer === 0 && (
              <div className={styles.stepCompletedIcon}>✓</div>
            )}
          </div>
        </div>

        {!isStarted ? (
          <button className={styles.startButton} onClick={startPractice}>
            Почати практику
          </button>
        ) : step3Status === 'completed' && (
          <button className={styles.startButton} onClick={startPractice}>
            Повторити практику
          </button>
        )}

        <div className={styles.finalSection}>
          <h2 className={styles.finalTitle}>Тепло? Поколювання? Пульсація?</h2>
          <p className={styles.explanation}>
            Це кортизол знизився. За 15 секунд.<br />
            Не тому що ти "заспокоїлась".<br />
            А тому що тіло отримало фізичний сигнал:<br />
            "можна відпустити".
          </p>
          <p className={styles.explanation}>
            Саме так працює Mind Я — через тіло, не через голову.<br />
            Тільки замість 15 секунд — глибокі аудіопрактики<br />
            по 7-10 хвилин, які проведуть тебе через весь процес.
          </p>
          <p className={styles.resultText}>
            Але спочатку — давай розберемось<br />
            у твоїй ситуації до кінця.
          </p>
          <button className={styles.continueButton} onClick={handleContinue}>
            <span>Продовжити діагностику</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoPagePractice;
