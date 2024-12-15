import { Ratelimit } from '@upstash/ratelimit';
import 'server-only';
import { redis } from './index';

export const ratelimit = new Ratelimit({
  limiter: Ratelimit.slidingWindow(5, '10s'),
  redis,
  analytics: true,
  timeout: 10000,
});
