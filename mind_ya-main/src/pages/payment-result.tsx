import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';

const BOT_URL = 'https://t.me/MindYa_ua_bot';

const PaymentResult: NextPage = () => {
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'failure'>('loading');

  useEffect(() => {
    if (!router.isReady) return;

    const { transactionStatus } = router.query;
    const statusStr = String(transactionStatus || '').toLowerCase();

    if (statusStr === 'approved' || statusStr === 'inprocessing') {
      setStatus('success');
      window.location.href = BOT_URL;
    } else {
      setStatus('failure');
    }
  }, [router.isReady, router.query]);

  if (status === 'loading') {
    return (
      <>
        <Head>
          <title>Обробка оплати - Mind Я</title>
        </Head>
        <main
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '1rem',
            padding: '2rem',
          }}
        >
          <p>Обробка результатів оплати...</p>
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Оплата не пройшла - Mind Я</title>
      </Head>
      <main
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '1.5rem',
          padding: '2rem',
          maxWidth: '400px',
          margin: '0 auto',
        }}
      >
        <h1 style={{ color: '#5671A6', fontSize: '1.5rem', textAlign: 'center' }}>
          Оплата не пройшла
        </h1>
        <p style={{ textAlign: 'center', lineHeight: 1.6 }}>
          На жаль, вашу оплату не вдалося завершити. Спробуйте ще раз або зверніться до підтримки.
        </p>
        <Link
          href="/plan-ready-2"
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            backgroundColor: '#5671A6',
            color: 'white',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 600,
          }}
        >
          Спробувати знову
        </Link>
      </main>
    </>
  );
};

export default PaymentResult;
