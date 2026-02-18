import type { NextApiRequest, NextApiResponse } from 'next';
import { getPaymentFormData, type WayForPayProduct } from '@/lib/wayforpay';
import { PRODUCT_NAME_SHORT } from '@/data/productDescription';

type ResponseData = {
  success: boolean;
  url?: string;
  formData?: Record<string, string | string[]>;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const price = typeof req.body?.price === 'number' ? req.body.price : 149;
    const product: WayForPayProduct = {
      name: PRODUCT_NAME_SHORT,
      price,
      count: 1,
    };
    const { url, formData } = getPaymentFormData([product]);

    const normalizedFormData: Record<string, string | string[]> = {};
    for (const [key, value] of Object.entries(formData)) {
      if (Array.isArray(value)) {
        normalizedFormData[key] = value.map(String);
      } else {
        normalizedFormData[key] = String(value);
      }
    }

    return res.status(200).json({
      success: true,
      url,
      formData: normalizedFormData,
    });
  } catch (error) {
    console.error('WayForPay create-payment error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to create payment',
    });
  }
}

