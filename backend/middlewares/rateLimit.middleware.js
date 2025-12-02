import { ApiError } from '../handlers/ApiError.js';

const buckets = new Map();
export default async function rateLimiter({ capacity, refillRate }) {
  return function (req, res, next) {
    const key = req.ip;

    const now = Date.now();

    if (!buckets.has(key)) {
      buckets.set(key, { tokens: capacity, lastRefill: now });
    }

    const bucket = buckets.get(key);

    const elapsed = (now - bucket.lastRefill) / 1000;
    bucket.tokens = Math.min(capacity, bucket.tokens + elapsed * refillRate);
    bucket.lastRefill = now;

    if (bucket.tokens < 1) {
      return res.status(429).json(new ApiError(429, 'Rate Limit Reached'));
    }

    bucket.tokens -= 1;
    next();
  };
}
