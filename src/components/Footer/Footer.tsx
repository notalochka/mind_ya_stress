import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <p className={styles.footerText}>
              Підхід Mind Я сформований з урахуванням результатів рецензованих наукових досліджень у сфері психології та ментального здоров'я, опублікованих у провідних міжнародних і українських наукових виданнях.
            </p>
            <p className={styles.footerText}>
              Квіз має інформаційний та освітній характер і не є медичною консультацією. <br />Результати не є діагнозом та не замінюють звернення до кваліфікованого фахівця.
            </p>
            <p className={styles.footerText}>
              Усі згадані дослідження доступні у відкритих публічних наукових базах даних.
            </p>
            
            <div className={styles.footerCopyright}>
              <p className={styles.copyrightText}>Mind Я © 2026</p>
              <div className={styles.footerLinks}>
                <Link href="/oferta" className={styles.footerLink}>
                  Публічна оферта
                </Link>
                <span className={styles.footerSeparator}>|</span>
                <Link href="/refund" className={styles.footerLink}>
                  Політика повернення
                </Link>
                <span className={styles.footerSeparator}>|</span>
                <Link href="/privacy" className={styles.footerLink}>
                  Політика конфіденційності
                </Link>
                <span className={styles.footerSeparator}>|</span>
                <Link href="/contact" className={styles.footerLink}>
                  Контакти
                </Link>
              </div>
            </div>
          </div>
        </footer>
  );
};

export default Footer;


