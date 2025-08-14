// Rate limiting utility for sensitive operations
export class RateLimiter {
  private static attempts: Map<string, { count: number; lastAttempt: number }> = new Map();

  static checkRateLimit(key: string, maxAttempts: number = 5, windowMs: number = 15 * 60 * 1000): boolean {
    const now = Date.now();
    const attempt = this.attempts.get(key);

    if (!attempt) {
      this.attempts.set(key, { count: 1, lastAttempt: now });
      return true;
    }

    // Reset if window has passed
    if (now - attempt.lastAttempt > windowMs) {
      this.attempts.set(key, { count: 1, lastAttempt: now });
      return true;
    }

    // Check if limit exceeded
    if (attempt.count >= maxAttempts) {
      return false;
    }

    // Increment attempt count
    attempt.count++;
    attempt.lastAttempt = now;
    return true;
  }

  static getRemainingTime(key: string, windowMs: number = 15 * 60 * 1000): number {
    const attempt = this.attempts.get(key);
    if (!attempt) return 0;

    const remaining = windowMs - (Date.now() - attempt.lastAttempt);
    return Math.max(0, Math.ceil(remaining / 1000 / 60)); // Return minutes
  }
}