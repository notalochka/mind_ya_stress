import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  success: boolean;
  message?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Перевірка методу запиту
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { email } = req.body;

  // Валідація даних
  if (!email) {
    return res.status(400).json({ success: false, error: 'Email is required' });
  }

  // Валідація формату email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, error: 'Invalid email format' });
  }

  try {
    // URL вашого Google Apps Script (замініть на ваш)
    const scriptUrl = process.env.GOOGLE_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycbwYPFUJ-7Yxu4S9-MLx8GF8geoyqzMFGpvb8Zwim8jOxNkCdVK4z9vGKBWaCLb303li/exec';
    
    // Секретний токен (краще використовувати змінну середовища)
    const secretToken = process.env.GOOGLE_SCRIPT_TOKEN || 'mind_ya_2026_secret_xyz123';

    // Відправляємо запит до Google Apps Script
    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        token: secretToken,
      }),
    });

    // Google Apps Script повертає текст, потрібно його розпарсити
    const text = await response.text();
    let result;
    
    try {
      result = JSON.parse(text);
    } catch (parseError) {
      // Якщо не JSON, можливо це HTML або інший формат
      console.error('Failed to parse response:', text);
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to process response from Google Script' 
      });
    }

    if (result.success) {
      return res.status(200).json({ 
        success: true, 
        message: 'Email saved successfully' 
      });
    } else {
      return res.status(400).json({ 
        success: false, 
        error: result.error || 'Failed to save email' 
      });
    }
  } catch (error) {
    console.error('Error saving email:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
}

