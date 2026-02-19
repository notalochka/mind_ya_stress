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
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    console.log('Parsed body:', body);
    const {
      orderReference,
      merchantSignature,
      amount,
      currency,
      authCode,
      cardPan,
      transactionStatus,
      reasonCode,
    } = body as WayForPayCallbackBody;

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
        email: body.email,
        phone: body.phone,
        authCode,
        cardPan: cardPan ? `${cardPan.slice(0, 4)}****${cardPan.slice(-4)}` : 'N/A',
      });
    } else {
      console.log('❌ WayForPay: Payment NOT approved', {
        orderReference,
        transactionStatus,
        reasonCode,
        reason: body.reason,
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

