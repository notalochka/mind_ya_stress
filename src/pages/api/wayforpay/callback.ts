import type { NextApiRequest, NextApiResponse } from 'next';
import {
  verifyCallbackSignature,
  generateCallbackResponseSignature,
} from '@/lib/wayforpay';

interface WayForPayCallbackBody {
  merchantAccount: string;
  orderReference: string;
  merchantSignature: string;
  amount: number;
  currency: string;
  authCode: string;
  cardPan: string;
  transactionStatus: string;
  reasonCode: number;
  reason?: string;
  email?: string;
  phone?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Діагностичне логування
  console.log('=== WayForPay Callback ===');
  console.log('Method:', req.method);
  console.log('Headers:', req.headers);
  console.log('Body type:', typeof req.body);
  console.log('Body:', req.body);
  console.log('========================');
  
  if (req.method !== 'POST') {
    console.error('WayForPay callback: wrong method', req.method);
    return res.status(405).json({ orderReference: '', status: 'error', time: 0, signature: '' });
  }

  try {
    // WayForPay надсилає дані як application/x-www-form-urlencoded
    // Але весь JSON може бути одним ключем об'єкта
    let parsedBody: any;
    
    if (typeof req.body === 'string') {
      // Якщо body - це рядок, спробуємо розпарсити як JSON
      try {
        parsedBody = JSON.parse(req.body);
      } catch {
        // Якщо не JSON, можливо це form data
        parsedBody = req.body;
      }
    } else if (req.body && typeof req.body === 'object') {
      // Якщо body - це об'єкт, перевіряємо чи JSON є ключем
      const keys = Object.keys(req.body);
      if (keys.length === 1 && typeof keys[0] === 'string' && keys[0].startsWith('{')) {
        // Весь JSON є ключем об'єкта
        try {
          parsedBody = JSON.parse(keys[0]);
        } catch {
          parsedBody = req.body;
        }
      } else {
        // Звичайний об'єкт
        parsedBody = req.body;
      }
    } else {
      parsedBody = req.body;
    }
    
    console.log('Parsed body:', parsedBody);
    
    const {
      orderReference,
      merchantSignature,
      amount: amountRaw,
      currency,
      authCode,
      cardPan,
      transactionStatus,
      reasonCode,
    } = parsedBody as WayForPayCallbackBody;
    
    // Конвертуємо amount в число (може бути рядком або числом)
    const amount = typeof amountRaw === 'string' ? parseFloat(amountRaw) : (amountRaw || 0);
    
    // Перевірка наявності обов'язкових полів
    if (!orderReference || amount === undefined || isNaN(amount) || !currency || !transactionStatus) {
      console.error('WayForPay callback: missing required fields', {
        orderReference,
        amount,
        amountRaw,
        currency,
        transactionStatus,
      });
      const time = Math.floor(Date.now() / 1000);
      const signature = generateCallbackResponseSignature(orderReference || '', 'accept', time);
      return res.status(400).json({
        orderReference: orderReference || '',
        status: 'accept',
        time,
        signature,
      });
    }

    const isValid = verifyCallbackSignature(
      orderReference,
      amount,
      currency,
      authCode || '',
      cardPan || '',
      transactionStatus,
      reasonCode || 0,
      merchantSignature
    );

    if (!isValid) {
      console.error('WayForPay callback: invalid signature', { orderReference });
      const time = Math.floor(Date.now() / 1000);
      const signature = generateCallbackResponseSignature(orderReference, 'accept', time);
      return res.status(400).json({
        orderReference,
        status: 'accept',
        time,
        signature,
      });
    }

    console.log('WayForPay callback: Transaction status:', transactionStatus);
    
    if (transactionStatus === 'Approved') {
      // TODO: Зберегти інформацію про успішну оплату (наприклад, в БД або відправити в бот)
      console.log('✅ WayForPay: Payment APPROVED', {
        orderReference,
        amount,
        currency,
        email: parsedBody.email,
        phone: parsedBody.phone,
        authCode,
        cardPan: cardPan ? `${cardPan.slice(0, 4)}****${cardPan.slice(-4)}` : 'N/A',
      });
    } else {
      console.log('❌ WayForPay: Payment NOT approved', {
        orderReference,
        transactionStatus,
        reasonCode,
        reason: parsedBody.reason,
      });
    }

    const time = Math.floor(Date.now() / 1000);
    const signature = generateCallbackResponseSignature(orderReference, 'accept', time);

    return res.status(200).json({
      orderReference,
      status: 'accept',
      time,
      signature,
    });
  } catch (error) {
    console.error('WayForPay callback error:', error);
    return res.status(500).json({
      orderReference: '',
      status: 'accept',
      time: Math.floor(Date.now() / 1000),
      signature: '',
    });
  }
}

