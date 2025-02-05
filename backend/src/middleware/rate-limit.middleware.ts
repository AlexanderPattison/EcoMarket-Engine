// backend/src/middleware/rate-limit.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import rateLimit from 'express-rate-limit';

// Create the limiter instance once, outside of the middleware function
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests, please try again later.',
});

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
    use(req: any, res: any, next: () => void) {
        limiter(req, res, next);
    }
}