import crypto from 'crypto';

const MERCHANT_ACCOUNT = process.env.MERCHANT_LOGIN || '';
const MERCHANT_SECRET_KEY = process.env.MERCHANT_SECRET_KEY || '';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://mind-ya.vercel.app';

function getMerchantDomain(): string {
  try {
    const url = new URL(APP_URL);
    return url.hostname;
  } catch {
    return APP_URL.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
  }
}

const MERCHANT_DOMAIN = getMerchantDomain();
const WAYFORPAY_URL = 'https://secure.wayforpay.com/pay';
const SUCCESS_REDIRECT_URL = 'https://t.me/MindYa_ua_bot';

export function getPaymentReturnUrl(): string {
  const base = APP_URL.replace(/\/$/, '');
  return `${base}/payment-result`;
}

export interface WayForPayProduct {
  name: string;
  price: number;
  count: number;
}

export interface WayForPayPaymentParams {
  orderReference: string;
  orderDate: number;
  amount: number;
  currency?: string;
  productName: string[];
  productPrice: number[];
  productCount: number[];
  returnUrl?: string;
  serviceUrl?: string;
  language?: string;
}

/**
 * Generates HMAC-MD5 signature for WayForPay request
 * String format: merchantAccount;merchantDomainName;orderReference;orderDate;amount;currency;productName[0];...;productName[n];productCount[0];...;productCount[n];productPrice[0];...;productPrice[n]
 */
export function generateMerchantSignature(params: WayForPayPaymentParams): string {
  const parts = [
    MERCHANT_ACCOUNT,
    MERCHANT_DOMAIN,
    params.orderReference,
    params.orderDate.toString(),
    params.amount.toFixed(2),
    params.currency || 'UAH',
    ...params.productName,
    ...params.productCount.map(String),
    ...params.productPrice.map((p) => p.toFixed(2)),
  ];
  const dataString = parts.join(';');

  // ДОДАЙТЕ ЦЕ ДЛЯ ДІАГНОСТИКИ
  console.log('=== Signature Generation Debug ===');
  console.log('MERCHANT_ACCOUNT:', MERCHANT_ACCOUNT);
  console.log('MERCHANT_DOMAIN:', MERCHANT_DOMAIN);
  console.log('MERCHANT_SECRET_KEY length:', MERCHANT_SECRET_KEY?.length || 0);
  console.log('Data string for signature:', dataString);
  console.log('==================================');
  
  return crypto.createHmac('md5', MERCHANT_SECRET_KEY).update(dataString, 'utf8').digest('hex');
}

/**
 * Verifies callback signature from WayForPay
 * String format: merchantAccount;orderReference;amount;currency;authCode;cardPan;transactionStatus;reasonCode
 */
export function verifyCallbackSignature(
  orderReference: string,
  amount: number,
  currency: string,
  authCode: string,
  cardPan: string,
  transactionStatus: string,
  reasonCode: number,
  receivedSignature: string
): boolean {
  const parts = [
    MERCHANT_ACCOUNT,
    orderReference,
    amount.toFixed(2),
    currency,
    authCode,
    cardPan,
    transactionStatus,
    reasonCode.toString(),
  ];
  const dataString = parts.join(';');
  const expectedSignature = crypto
    .createHmac('md5', MERCHANT_SECRET_KEY)
    .update(dataString, 'utf8')
    .digest('hex');
  return expectedSignature === receivedSignature;
}

/**
 * Generates response signature for serviceUrl callback
 * String format: orderReference;status;time
 */
export function generateCallbackResponseSignature(
  orderReference: string,
  status: string,
  time: number
): string {
  const dataString = `${orderReference};${status};${time}`;
  return crypto.createHmac('md5', MERCHANT_SECRET_KEY).update(dataString, 'utf8').digest('hex');
}

export function getPaymentFormData(products: WayForPayProduct[]) {
  const orderReference = `MIND_YA_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
  const orderDate = Math.floor(Date.now() / 1000);
  const amount = products.reduce((sum, p) => sum + p.price * p.count, 0);
  const productName = products.map((p) => p.name);
  const productPrice = products.map((p) => p.price);
  const productCount = products.map((p) => p.count);

  const params: WayForPayPaymentParams = {
    orderReference,
    orderDate,
    amount,
    currency: 'UAH',
    productName,
    productPrice,
    productCount,
    returnUrl: getPaymentReturnUrl(),
    serviceUrl: `${APP_URL.replace(/\/$/, '')}/api/wayforpay/callback`,
    language: 'UA',
  };

  const merchantSignature = generateMerchantSignature(params);

  return {
    url: WAYFORPAY_URL,
    formData: {
      merchantAccount: MERCHANT_ACCOUNT,
      merchantDomainName: MERCHANT_DOMAIN,
      merchantSignature,
      merchantAuthType: 'SimpleSignature',
      orderReference,
      orderDate: orderDate.toString(),
      amount: amount.toFixed(2),
      currency: 'UAH',
      productName,
      productPrice: productPrice.map((p) => p.toFixed(2)),
      productCount: productCount.map(String),
      returnUrl: getPaymentReturnUrl(),
      serviceUrl: params.serviceUrl,
      language: 'UA',
      orderTimeout: '86400',
    },
  };
}

export { WAYFORPAY_URL, SUCCESS_REDIRECT_URL };

