import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import styles from './privacy-policy.module.css';

const Contact: NextPage = () => {
  return (
    <>
      <Head>
        <title>Контакти - Mind Я</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <Link href="/" className={styles.backLink}>← Повернутися на головну</Link>
          <h1 className={styles.title}>Mind Я</h1>

          <h2 className={styles.heading}>КОНТАКТНА ІНФОРМАЦІЯ</h2>

          <hr className={styles.divider} />

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Реквізити продавця</h2>
            <p><strong>Повне найменування:</strong> Фізична особа-підприємець Антонюк Едуард Русланович</p>
            <p><strong>Реєстраційний номер (РНОКПП):</strong> 3702512530</p>
            <p><strong>Юридична адреса:</strong> Україна, без зазначення фактичної адреси відповідно до вимог законодавства про захист персональних даних</p>
          </section>

          <hr className={styles.divider} />

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Контакти для зв&apos;язку</h2>
            <p className={styles.contact}>📩 Електронна пошта: <a href="mailto:mindya.ua@gmail.com" className={styles.emailLink}>mindya.ua@gmail.com</a></p>
            <p className={styles.contact}>📱 Телефон: <a href="tel:+380935958786" className={styles.emailLink}>+380 93 595 87 86</a></p>
            <p className={styles.contact}>Telegram: @mindya_ua</p>
          </section>

          <hr className={styles.divider} />

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Графік роботи служби підтримки</h2>
            <ul className={styles.list}>
              <li><strong>Робочі дні:</strong> Понеділок – П&apos;ятниця</li>
              <li><strong>Робочий час:</strong> 09:00 – 18:00 (за київським часом)</li>
              <li><strong>Вихідні:</strong> Субота, Неділя (відповідаємо на email протягом 48 годин)</li>
            </ul>
          </section>

          <hr className={styles.divider} />

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Банківські реквізити</h2>
            <p><strong>Банк:</strong> ПУМБ (Перший Український Міжнародний Банк)</p>
            <p><strong>IBAN:</strong> UA073348510000000026004279143</p>
            <p><strong>Отримувач:</strong> ФОП Антонюк Едуард Русланович</p>
          </section>

          <hr className={styles.divider} />

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Юридичні документи</h2>
            <ul className={styles.list}>
              <li><Link href="/oferta" className={styles.emailLink}>Публічна оферта</Link></li>
              <li><Link href="/refund" className={styles.emailLink}>Політика повернення</Link></li>
              <li><Link href="/privacy" className={styles.emailLink}>Політика конфіденційності</Link></li>
            </ul>
          </section>

          <hr className={styles.divider} />

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Про проєкт Mind Я</h2>
            <p>
              Mind Я — це цифрова програма психологічної самодопомоги для зниження рівня тривожності та стресу, що надається через Telegram-бот.
            </p>
            <p>
              Програма є інформаційно-консультаційним продуктом і не є медичною послугою, психотерапією або заміною професійної психологічної допомоги.
            </p>
          </section>

          <hr className={styles.divider} />

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Способи зв&apos;язку для різних питань</h2>
            <ul className={styles.list}>
              <li><strong>Питання про оплату:</strong> <a href="mailto:mindya.ua@gmail.com" className={styles.emailLink}>mindya.ua@gmail.com</a></li>
              <li><strong>Технічна підтримка:</strong> @mindya_ua (Telegram)</li>
              <li><strong>Повернення коштів:</strong> <a href="mailto:mindya.ua@gmail.com" className={styles.emailLink}>mindya.ua@gmail.com</a></li>
              <li><strong>Скарги та претензії:</strong> <a href="mailto:mindya.ua@gmail.com" className={styles.emailLink}>mindya.ua@gmail.com</a></li>
              <li><strong>Персональні дані:</strong> <a href="mailto:mindya.ua@gmail.com" className={styles.emailLink}>mindya.ua@gmail.com</a></li>
            </ul>
          </section>

          <hr className={styles.divider} />

          <p className={styles.updateDate}>Дата останнього оновлення: 06 лютого 2026 року</p>

          <p className={styles.copyright}>© Mind Я, 2026</p>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Contact;
