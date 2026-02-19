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

    // WayForPay може передавати параметри різними способами
    const { transactionStatus, status, orderStatus, orderReference } = router.query;
    const statusStr = String(transactionStatus || status || orderStatus || '').toLowerCase();

    // Діагностичне логування
    console.log('=== Payment Result Page ===');
    console.log('Router query:', router.query);
    console.log('URL:', window.location.href);
    console.log('Transaction status:', transactionStatus);
    console.log('Status:', status);
    console.log('Order reference:', orderReference);
    console.log('==========================');

    // Перевіряємо чи був перехід на оплату
    const paymentAttempted = sessionStorage.getItem('paymentAttempted');
    
    // Додаткова перевірка через URL параметри (якщо WayForPay передає в URL)
    const urlParams = new URLSearchParams(window.location.search);
    const urlStatus = urlParams.get('transactionStatus') || urlParams.get('status') || '';
    const finalStatus = statusStr || urlStatus.toLowerCase();
    
    console.log('Final status:', finalStatus);
    
    if (finalStatus === 'approved' || finalStatus === 'inprocessing' || finalStatus === 'ok') {
      setStatus('success');
      // Очищаємо маркер спроби оплати
      sessionStorage.removeItem('paymentAttempted');
      // Невелика затримка перед перенаправленням
      setTimeout(() => {
        window.location.href = BOT_URL;
      }, 500);
    } else {
      setStatus('failure');
      // Якщо була спроба оплати, але оплата не пройшла - перенаправляємо на exit-intent
      if (paymentAttempted === 'true') {
        sessionStorage.removeItem('paymentAttempted');
        // Невелика затримка для показу повідомлення
        setTimeout(() => {
          router.push('/quiz/exit-intent');
        }, 2000);
      }
    }
  }, [router.isReady, router.query, router]);

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
          href="/quiz/plan-ready"
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

