type CacheEntry<T> = {
    data: T;
    expiry: number; // timestamp in milliseconds
  };
  
  export class SimpleCache<T> {
    private cache = new Map<string, CacheEntry<T>>();
    constructor(private ttlMs: number) {}
  
    get(key: string): T | null {
      const entry = this.cache.get(key);
      if (!entry) return null;
      if (Date.now() > entry.expiry) {
        this.cache.delete(key);
        return null;
      }
      return entry.data;
    }
  
    set(key: string, data: T) {
      const expiry = Date.now() + this.ttlMs;
      this.cache.set(key, { data, expiry });
    }
  
    clear() {
      this.cache.clear();
    }
  }