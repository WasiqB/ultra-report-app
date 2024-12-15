import { Redis } from '@upstash/redis';
import 'server-only';

export const redis = Redis.fromEnv();
