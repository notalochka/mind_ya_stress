import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * API route для обробки перенаправлення від WayForPay
 * WayForPay може перенаправляти через POST (form data), тому цей route обробляє POST
 * і перенаправляє на сторінку payment-result з GET параметрами
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Обробляємо POST від WayForPay (якщо WayForPay перенаправляє через POST)
  if (req.method === 'POST') {
    try {
      // WayForPay надсилає form data, читаємо з req.body
      let transactionStatus = '';
      let orderReference = '';
      
      // Спробуємо прочитати з query параметрів (якщо WayForPay передає через URL)
      if (req.query.transactionStatus) {
        transactionStatus = String(req.query.transactionStatus);
      }
      if (req.query.orderReference) {
        orderReference = String(req.query.orderReference);
      }
      
      // Якщо не знайдено в query, спробуємо прочитати з body
      if (!transactionStatus && req.body) {
        if (typeof req.body === 'string') {
          // Якщо body - це рядок, спробуємо розпарсити
          try {
            const parsed = JSON.parse(req.body);
            transactionStatus = parsed.transactionStatus || parsed.status || '';
            orderReference = parsed.orderReference || parsed.orderRef || '';
          } catch {
            // Якщо не JSON, можливо це form data
            const params = new URLSearchParams(req.body);
            transactionStatus = params.get('transactionStatus') || params.get('status') || '';
            orderReference = params.get('orderReference') || params.get('orderRef') || '';
          }
        } else if (typeof req.body === 'object') {
          // Якщо body - це об'єкт
          const keys = Object.keys(req.body);
          if (keys.length === 1 && typeof keys[0] === 'string' && keys[0].startsWith('{')) {
            // Весь JSON є ключем об'єкта
            try {
              const parsed = JSON.parse(keys[0]);
              transactionStatus = parsed.transactionStatus || parsed.status || '';
              orderReference = parsed.orderReference || parsed.orderRef || '';
            } catch {
              transactionStatus = req.body.transactionStatus || req.body.status || '';
              orderReference = req.body.orderReference || req.body.orderRef || '';
            }
          } else {
            transactionStatus = req.body.transactionStatus || req.body.status || '';
            orderReference = req.body.orderReference || req.body.orderRef || '';
          }
        }
      }
      
      // Формуємо query параметри
      const queryParams = new URLSearchParams();
      if (transactionStatus) {
        queryParams.set('transactionStatus', String(transactionStatus));
      }
      if (orderReference) {
        queryParams.set('orderReference', String(orderReference));
      }
      
      // Перенаправляємо на сторінку з GET параметрами
      const redirectUrl = `/payment-result${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      return res.redirect(302, redirectUrl);
    } catch (error) {
      console.error('Payment result API error:', error);
      // У разі помилки перенаправляємо на сторінку без параметрів
      return res.redirect(302, '/payment-result');
    }
  }
  
  // Якщо GET - перенаправляємо на сторінку з параметрами
  if (req.method === 'GET') {
    const queryParams = new URLSearchParams();
    if (req.query.transactionStatus) {
      queryParams.set('transactionStatus', String(req.query.transactionStatus));
    }
    if (req.query.orderReference) {
      queryParams.set('orderReference', String(req.query.orderReference));
    }
    
    const redirectUrl = `/payment-result${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return res.redirect(302, redirectUrl);
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}

