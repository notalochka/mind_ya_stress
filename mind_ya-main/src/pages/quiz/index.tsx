import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '@/components/Header/Header';
import { ProgressIndicator } from '@/components/ProgressIndicator/ProgressIndicator';
import { infoPageComponents } from '@/components/QuizInfoPages';
import { quizData } from '@/data/quizData';
import { Step, InfoStep, QuestionStep, RatingStep } from '@/types/quiz';
import styles from './index.module.css';
import Footer from '@/components/Footer/Footer';

const QUIZ_STORAGE_KEY = 'mind_ya_quiz_answers';
const COMPLETED_STEPS_KEY = 'mind_ya_completed_steps';

const Quiz: NextPage = () => {
  const router = useRouter();
  const { step } = router.query;
  
  const currentStepNumber = step ? parseInt(step as string, 10) : 1;
  const currentStep = quizData.steps.find((s: Step) => s.order === currentStepNumber);
  const totalSteps = quizData.steps.length;

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  
  // Завантажуємо збережені відповіді з sessionStorage при ініціалізації
  const [answers, setAnswers] = useState<Record<number, number>>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = sessionStorage.getItem(QUIZ_STORAGE_KEY);
        return saved ? JSON.parse(saved) : {};
      } catch (error) {
        console.error('Помилка при завантаженні відповідей:', error);
        return {};
      }
    }
    return {};
  });
  
  // Завантажуємо збережені завершені кроки з sessionStorage при ініціалізації
  const [completedSteps, setCompletedSteps] = useState<number[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = sessionStorage.getItem(COMPLETED_STEPS_KEY);
        return saved ? JSON.parse(saved) : [];
      } catch (error) {
        console.error('Помилка при завантаженні завершених кроків:', error);
        return [];
      }
    }
    return [];
  });
  
  const [showNavigationButtons, setShowNavigationButtons] = useState(true);

  // Зберігаємо відповіді в sessionStorage при кожній зміні
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(answers));
      } catch (error) {
        console.error('Помилка при збереженні відповідей:', error);
      }
    }
  }, [answers]);

  // Зберігаємо завершені кроки в sessionStorage при кожній зміні
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem(COMPLETED_STEPS_KEY, JSON.stringify(completedSteps));
      } catch (error) {
        console.error('Помилка при збереженні завершених кроків:', error);
      }
    }
  }, [completedSteps]);

  // Встановлюємо тему для хедера та інших глобальних елементів
  useEffect(() => {
    if (currentStep?.type === 'info') {
      const infoStep = currentStep as InfoStep;
      const theme = infoStep.theme || 'default';
      
      // Встановлюємо CSS змінні на рівні document для глобального доступу
      if (theme === 'primary') {
        // Для теми primary: синій фон (#5671A6) та білий логотип
        document.documentElement.style.setProperty('--theme-header-bg', '#5671A6');
        document.documentElement.style.setProperty('--logo-color', '#ffffff');
        document.body.style.backgroundColor = '#5671A6';
      } else {
        // Для дефолтної теми: білий фон та primary колір логотипу
        document.documentElement.style.setProperty('--theme-header-bg', '#fff');
        document.documentElement.style.setProperty('--logo-color', 'var(--color-primary)');
        document.body.style.backgroundColor = '#fff';
      }
      
      // Додаємо клас до body для теми
      document.body.className = `quiz-theme-${theme}`;
    } else {
      // Повертаємо до дефолтної теми для питань
      document.documentElement.style.setProperty('--theme-header-bg', '#fff');
      document.documentElement.style.setProperty('--logo-color', 'var(--color-primary)');
      document.body.style.backgroundColor = '#fff';
      document.body.className = '';
    }
    
    return () => {
      // Cleanup
      document.body.className = '';
      document.body.style.backgroundColor = '';
      document.documentElement.style.setProperty('--logo-color', '');
    };
  }, [currentStep]);

  // Завантажуємо відповідь, якщо вона вже була дана
  useEffect(() => {
    if ((currentStep?.type === 'question' || currentStep?.type === 'rating') && answers[currentStepNumber]) {
      setSelectedOption(answers[currentStepNumber]);
    } else {
      setSelectedOption(null);
    }
  }, [currentStepNumber, currentStep, answers]);

  // Контролюємо видимість кнопок навігації для кроку 9 та step-30
  useEffect(() => {
    if (currentStep?.id === 'step-9' || currentStep?.id === 'step-30') {
      setShowNavigationButtons(false);
    } else {
      setShowNavigationButtons(true);
    }
  }, [currentStep]);

  const handleNext = () => {
    if ((currentStep?.type === 'question' || currentStep?.type === 'rating') && selectedOption !== null) {
      // Зберігаємо відповідь
      setAnswers(prev => ({ ...prev, [currentStepNumber]: selectedOption }));
      
      // Додаємо крок до завершених
      if (!completedSteps.includes(currentStepNumber)) {
        setCompletedSteps(prev => [...prev, currentStepNumber]);
      }
    } else if (currentStep?.type === 'info') {
      // Для інформаційних сторінок просто відмічаємо як завершену
      if (!completedSteps.includes(currentStepNumber)) {
        setCompletedSteps(prev => [...prev, currentStepNumber]);
      }
    }

    // Переходимо на наступний крок
    if (currentStepNumber < totalSteps) {
      router.push(`/quiz?step=${currentStepNumber + 1}`, undefined, { shallow: true });
    } else {
      // Завершення тесту - можна додати сторінку результатів
      // router.push('/quiz/result');
    }
  };

  const handleBack = () => {
    if (currentStepNumber > 1) {
      router.push(`/quiz?step=${currentStepNumber - 1}`, undefined, { shallow: true });
    } else {
      // Якщо це перший крок, повертаємося на головну
      router.push('/');
    }
  };

  if (!currentStep) {
    return (
      <>
        <Header />
        <main className={styles.quizPage}>
          <div className={styles.quizContainer}>
            <p>Крок не знайдено</p>
          </div>
        </main>
      </>
    );
  }

  // Рендеринг інформаційної сторінки
  const renderInfoStep = (infoStep: InfoStep) => {
    const InfoComponent = infoPageComponents[infoStep.componentKey];
    
    if (!InfoComponent) {
      console.error(`Компонент з ключем "${infoStep.componentKey}" не знайдено`);
      return (
        <div className={styles.infoStep}>
          <p>Помилка: компонент не знайдено</p>
        </div>
      );
    }

    // Для кроку 9 передаємо callback для показу кнопок після завершення анімації
    const props = infoStep.id === 'step-9' 
      ? { ...(infoStep.props || {}), onAnimationComplete: () => setShowNavigationButtons(true) }
      : (infoStep.props || {});

    return <InfoComponent {...props} />;
  };

  return (
    <>
      <Head>
        <title>Тест - Крок {currentStepNumber}</title>
      </Head>
      <Header />
      <main className={`${styles.quizPage} ${
        currentStep?.type === 'info' 
          ? styles[`theme-${(currentStep as InfoStep).theme || 'default'}`] 
          : ''
      }`}>
        <div className={styles.quizContainer}>
          {currentStep?.id !== 'step-14' && currentStep?.id !== 'step-30' && (
          <ProgressIndicator
            currentStep={currentStepNumber}
            totalSteps={totalSteps}
            completedSteps={completedSteps}
          />
          )}

          {currentStep.type === 'question' ? (
            <>
              <h1 className={styles.question}>{currentStep.question}</h1>
              <div className={styles.optionsContainer}>
                {(currentStep as QuestionStep).options.map((option) => (
                  <button
                    key={option.id}
                    className={`${styles.optionCard} ${
                      selectedOption === option.id ? styles.optionCardSelected : ''
                    }`}
                    onClick={() => setSelectedOption(option.id)}
                  >
                    <div className={styles.optionContent}>
                      <div className={styles.optionText}>
                        <p className={styles.optionTitle}>{option.title}</p>
                        {option.subtitle && (
                          <p className={styles.optionSubtitle}>{option.subtitle}</p>
                        )}
                      </div>
                      <div className={styles.optionIndicator}>
                        {selectedOption === option.id ? (
                          <svg
                            width="25"
                            height="25"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle cx="10" cy="10" r="9" stroke="white" strokeWidth="2" />
                            <path
                              d="M6 10L9 13L14 7"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        ) : (
                          <div className={styles.optionRadio} />
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </>
          ) : currentStep.type === 'rating' ? (
            <>
              <h1 className={styles.ratingQuestion}>{(currentStep as RatingStep).question}</h1>
              <p className={styles.ratingPrompt}>Оцініть від 1 до 5</p>
              <div className={styles.ratingContainer}>
                <div className={styles.ratingButtons}>
                  {Array.from({ length: 5 }, (_, index) => {
                    const ratingValue = index + 1;
                    const isSelected = selectedOption === ratingValue;
                    return (
                      <button
                        key={ratingValue}
                        className={`${styles.ratingButton} ${
                          isSelected ? styles.ratingButtonSelected : ''
                        }`}
                        onClick={() => setSelectedOption(ratingValue)}
                      >
                        {ratingValue}
                      </button>
                    );
                  })}
                </div>
                <div className={styles.ratingLabels}>
                  <span className={styles.ratingLabel}>
                    {(currentStep as RatingStep).minLabel || 'Not hard'}
                  </span>
                  <span className={styles.ratingLabel}>
                    {(currentStep as RatingStep).maxLabel || 'Very hard'}
                  </span>
                </div>
              </div>
            </>
          ) : (
            renderInfoStep(currentStep)
          )}

          {showNavigationButtons && (
          <div className={styles.navigationButtons}>
            <button
              className={styles.backButton}
              onClick={handleBack}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 15L7 10L12 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Назад</span>
            </button>
            <button
              className={styles.nextButton}
              onClick={handleNext}
              disabled={
                  (currentStep.type === 'question' || currentStep.type === 'rating') && selectedOption === null
              }
            >
              <span>Далі</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 5L13 10L8 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          )}
        </div>
      </main>
      {currentStep?.id !== 'step-30' && <Footer />}
    </>
  );
};

export default Quiz;
