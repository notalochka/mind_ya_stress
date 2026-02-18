import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from './InfoPagePlanGeneration.module.css';

interface InfoPagePlanGenerationProps {
  title?: string;
  consentText?: string;
  privacyPolicyText?: string;
  continueButtonText?: string;
  onContinue?: () => void;
}

const InfoPagePlanGeneration: React.FC<InfoPagePlanGenerationProps> = ({
  title = 'Створюємо ваш персональний план Mind Я...',
  consentText = 'Я даю згоду на обробку моїх даних для створення персонального плану Mind Я.',
  privacyPolicyText = 'Політика конфіденційності',
  continueButtonText = 'Продовжити →',
  onContinue,
}) => {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [isConsentChecked, setIsConsentChecked] = useState(false);

  useEffect(() => {
    // Крок 1: показуємо спінер 3 секунди
    const timer = setTimeout(() => {
      setStep(2);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleContinue = () => {
    if (!isConsentChecked) return;
    
    if (onContinue) {
      onContinue();
    } else {
      // Переходимо на сторінку аналізу відповідей
      router.push('/analysis');
    }
  };

  return (
    <div className={styles.container}>
      {step === 1 ? (
        <div className={styles.loadingStep}>
          <h1 className={styles.title}>
            {title.split('Mind Я').map((part, index) => 
              index === 0 ? (
                <React.Fragment key={index}>
                  {part}
                  <span className={styles.noWrap}>Mind Я</span>
                </React.Fragment>
              ) : (
                <React.Fragment key={index}>{part}</React.Fragment>
              )
            )}
          </h1>
          <div className={styles.spinner}>
            <div className={styles.spinnerCircle}></div>
          </div>
        </div>
      ) : (
        <>
          <div className={styles.overlay}></div>
          <div className={styles.popup}>
            <div className={styles.checkboxContainer}>
              <input
                type="checkbox"
                id="consent-checkbox"
                className={styles.checkbox}
                checked={isConsentChecked}
                onChange={(e) => setIsConsentChecked(e.target.checked)}
              />
              <label htmlFor="consent-checkbox" className={styles.label}>
                <span className={styles.consentText}>
                  {consentText.split('Mind Я').map((part, index) => 
                    index === 0 ? (
                      <React.Fragment key={index}>
                        {part}
                        <span className={styles.noWrap}>Mind Я</span>
                      </React.Fragment>
                    ) : (
                      <React.Fragment key={index}>{part}</React.Fragment>
                    )
                  )}
                </span>
                <Link 
                  href="/privacy"
                  className={styles.privacyLink}
                  onClick={(e) => e.stopPropagation()}
                >
                  {privacyPolicyText}
                </Link>
              </label>
            </div>
            <button
              className={`${styles.continueButton} ${
                isConsentChecked ? styles.continueButtonActive : ''
              }`}
              onClick={handleContinue}
              disabled={!isConsentChecked}
            >
              <span>{continueButtonText}</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default InfoPagePlanGeneration;

