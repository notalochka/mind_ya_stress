import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <p className={styles.footerText}>
            Застереження: Результати можуть відрізнятися залежно від індивідуальних особливостей. Програма не замінює професійну медичну чи психологічну допомогу.
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
