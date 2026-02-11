import React, { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { PRODUCT_DESCRIPTION } from '@/data/productDescription';

const Test: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePay = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/wayforpay/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ price: 149 }),
      });
      const data = await res.json();
      if (!data.success || !data.url || !data.formData) {
        throw new Error(data.error || 'Помилка створення платежу');
      }
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = data.url;
      form.style.display = 'none';
      for (const [key, value] of Object.entries(data.formData)) {
        const values = Array.isArray(value) ? value : [value];
        const fieldName = Array.isArray(value) ? `${key}[]` : key;
        for (const v of values) {
          const input = document.createElement('input');
          input.name = fieldName;
          input.value = String(v);
          input.type = 'hidden';
          form.appendChild(input);
        }
      }
      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      console.error('Payment error:', err);
      setIsLoading(false);
      alert('Не вдалося перейти до оплати. Спробуйте пізніше.');
    }
  };

  return (
    <>
      <Head>
        <title>Тест оплати - Mind Я</title>
      </Head>
      <Header />
      <main
        style={{
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '1.5rem',
          padding: '2rem',
          maxWidth: '600px',
          margin: '0 auto',
        }}
      >
        <h1 style={{ color: '#5671A6' }}>Тест оплати WayForPay</h1>
        <div
          style={{
            textAlign: 'left',
            backgroundColor: '#f1f3f9',
            padding: '20px',
            borderRadius: '12px',
            width: '100%',
          }}
        >
          <h3 style={{ color: '#5671A6', marginTop: 0 }}>🎁 {PRODUCT_DESCRIPTION.title}</h3>
          <ul style={{ paddingLeft: '20px', margin: '12px 0' }}>
            {PRODUCT_DESCRIPTION.days.map((item) => (
              <li key={item.day} style={{ marginBottom: '8px' }}>
                День {item.day}: {item.text}
              </li>
            ))}
          </ul>
          <ul style={{ paddingLeft: '20px', margin: '12px 0' }}>
            {PRODUCT_DESCRIPTION.benefits.map((item) => (
              <li key={item}>✓ {item}</li>
            ))}
          </ul>
          <p style={{ margin: '8px 0', fontSize: '14px' }}>∙ {PRODUCT_DESCRIPTION.vip}</p>
          <p style={{ margin: '8px 0' }}>⭐ {PRODUCT_DESCRIPTION.trust}</p>
          <p style={{ margin: '8px 0' }}>💫 {PRODUCT_DESCRIPTION.cta}</p>
          <p style={{ margin: '12px 0 0', fontWeight: 600, color: '#5671A6' }}>{PRODUCT_DESCRIPTION.footer}</p>
        </div>
        <button
          onClick={handlePay}
          disabled={isLoading}
          style={{
            padding: '14px 32px',
            fontSize: '1rem',
            backgroundColor: '#5671A6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            opacity: isLoading ? 0.7 : 1,
          }}
        >
          {isLoading ? 'Завантаження...' : 'Оплатити'}
        </button>
      </main>
      <Footer />
    </>
  );
};

export default Test;
