import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import { ProgressIndicator } from '@/components/ProgressIndicator/ProgressIndicator';
import { infoPageComponents } from '@/components/QuizInfoPages';
import { quizData } from '@/data/quizData';
import { Step, InfoStep, QuestionStep, MultipleStep } from '@/types/quiz';
import styles from './index.module.css';
import QuizFooter from '@/components/QuizFooter/QuizFooter';

const QUIZ_STORAGE_KEY = 'mind_ya_quiz_answers';
const COMPLETED_STEPS_KEY = 'mind_ya_completed_steps';

const Quiz: NextPage = () => {
  const router = useRouter();
  const { step } = router.query;
  
  const currentStepNumber = step ? parseInt(step as string, 10) : 1;
  const currentStep = quizData.steps.find((s: Step) => s.order === currentStepNumber);
  const totalSteps = quizData.steps.length;

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [selectedMultipleOptions, setSelectedMultipleOptions] = useState<number[]>([]);
  
  // Завантажуємо збережені відповіді з sessionStorage при ініціалізації
  const [answers, setAnswers] = useState<Record<number, number | number[]>>(() => {
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
      } else if (theme === 'dark') {
        // Для темної теми: темний фон (#1a1a1a) та білий логотип
        document.documentElement.style.setProperty('--theme-header-bg', '#1a1a1a');
        document.documentElement.style.setProperty('--logo-color', '#ffffff');
        document.body.style.backgroundColor = '#1a1a1a';
      } else if (theme === 'warm') {
        // Для теми warm: теплий білий фон (#fff8f0) та primary колір логотипу
        document.documentElement.style.setProperty('--theme-header-bg', '#fff8f0');
        document.documentElement.style.setProperty('--logo-color', 'var(--color-primary)');
        document.body.style.backgroundColor = '#fff8f0';
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
    if (currentStep?.type === 'question' && answers[currentStepNumber]) {
      const answer = answers[currentStepNumber];
      setSelectedOption(Array.isArray(answer) ? answer[0] : answer as number);
      setSelectedMultipleOptions([]);
    } else if (currentStep?.type === 'multiple' && answers[currentStepNumber]) {
      const answer = answers[currentStepNumber];
      setSelectedMultipleOptions(Array.isArray(answer) ? answer : [answer as number]);
      setSelectedOption(null);
    } else {
      setSelectedOption(null);
      setSelectedMultipleOptions([]);
    }
  }, [currentStepNumber, currentStep, answers]);

  // Контролюємо видимість кнопок навігації для інформаційних сторінок
  useEffect(() => {
    if (currentStep?.type === 'info') {
      const infoStep = currentStep as InfoStep;
      // Можна додати логіку для приховування кнопок на певних кроках
      setShowNavigationButtons(true);
    } else {
      setShowNavigationButtons(true);
    }
  }, [currentStep]);


  const handleNext = () => {
    if (currentStep?.type === 'question' && selectedOption !== null) {
      // Зберігаємо відповідь для одиночного вибору
      setAnswers(prev => ({ ...prev, [currentStepNumber]: selectedOption }));
      
      // Додаємо крок до завершених
      if (!completedSteps.includes(currentStepNumber)) {
        setCompletedSteps(prev => [...prev, currentStepNumber]);
      }
    } else if (currentStep?.type === 'multiple' && selectedMultipleOptions.length > 0) {
      // Зберігаємо відповіді для множинного вибору
      setAnswers(prev => ({ ...prev, [currentStepNumber]: selectedMultipleOptions }));
      
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
      // Завершення тесту - перехід на сторінку аналізу
      router.push('/quiz/analyzing');
    }
  };

  const handleMultipleToggle = (optionId: number) => {
    setSelectedMultipleOptions(prev => {
      if (prev.includes(optionId)) {
        return prev.filter(id => id !== optionId);
      } else {
        return [...prev, optionId];
      }
    });
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

    // Передаємо props компоненту та callback для переходу
    const props = {
      ...(infoStep.props || {}),
      onContinue: () => {
        if (currentStepNumber < totalSteps) {
          router.push(`/quiz?step=${currentStepNumber + 1}`, undefined, { shallow: true });
        }
      },
    };

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
        {currentStep?.type === 'info' ? (
          renderInfoStep(currentStep as InfoStep)
        ) : (
          <div className={styles.quizContainer}>
            <ProgressIndicator
              currentStep={currentStepNumber}
              totalSteps={totalSteps}
              completedSteps={completedSteps}
            />

            {currentStep && currentStep.type === 'question' ? (
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
              {selectedOption !== null && (currentStep as QuestionStep).feedback && (() => {
                const feedback = (currentStep as QuestionStep).feedback;
                let feedbackText = '';
                if (typeof feedback === 'string') {
                  feedbackText = feedback;
                } else if (feedback && typeof feedback === 'object') {
                  feedbackText = feedback[selectedOption] || '';
                }
                return feedbackText ? (
                  <div className={styles.feedback}>
                    {feedbackText}
                  </div>
                ) : null;
              })()}
            </>
          ) : currentStep && currentStep.type === 'multiple' ? (
            <>
              <h1 className={styles.question}>{currentStep.question}</h1>
              <div className={styles.optionsContainer}>
                {(currentStep as MultipleStep).options.map((option) => (
                  <button
                    key={option.id}
                    className={`${styles.optionCard} ${
                      selectedMultipleOptions.includes(option.id) ? styles.optionCardSelected : ''
                    }`}
                    onClick={() => handleMultipleToggle(option.id)}
                  >
                    <div className={styles.optionContent}>
                      <div className={styles.optionText}>
                        <p className={styles.optionTitle}>{option.title}</p>
                        {option.subtitle && (
                          <p className={styles.optionSubtitle}>{option.subtitle}</p>
                        )}
                      </div>
                      <div className={styles.optionIndicator}>
                        {selectedMultipleOptions.includes(option.id) ? (
                          <svg
                            width="25"
                            height="25"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect x="2" y="2" width="16" height="16" rx="3" stroke="white" strokeWidth="2" fill="white" />
                            <path
                              d="M6 10L9 13L14 7"
                              stroke="#1a1a1a"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        ) : (
                          <div className={styles.optionCheckbox} />
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              {selectedMultipleOptions.length > 0 && (currentStep as MultipleStep).feedback && (
                <div className={styles.feedback}>
                  {(currentStep as MultipleStep).feedback}
                </div>
              )}
            </>
            ) : currentStep ? (
              renderInfoStep(currentStep)
            ) : null}

            {showNavigationButtons && currentStep && (
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
                    (currentStep.type === 'question' && selectedOption === null) ||
                    (currentStep.type === 'multiple' && selectedMultipleOptions.length === 0)
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
        )}
      </main>
      <QuizFooter />
    </>
  );
};

export default Quiz;

