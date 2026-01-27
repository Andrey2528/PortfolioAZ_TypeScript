/**
 * Універсальний менеджер кешування для Firebase даних
 * Використовує localStorage для зберігання даних з TTL (Time To Live)
 */

interface CacheItem<T> {
    data: T;
    timestamp: number;
    version: string;
}

interface CacheConfig {
    ttl?: number; // Time to live в мілісекундах
    version?: string; // Версія кешу для інвалідації при оновленнях
}

const DEFAULT_TTL = 30 * 60 * 1000; // 30 хвилин за замовчуванням
const CACHE_VERSION = '1.0.0';

class CacheManager {
    private prefix = 'firebase_cache_';

    /**
     * Отримати дані з кешу
     */
    get<T>(key: string, config?: CacheConfig): T | null {
        try {
            const cacheKey = this.getCacheKey(key);
            const cached = localStorage.getItem(cacheKey);

            if (!cached) {
                return null;
            }

            const cacheItem: CacheItem<T> = JSON.parse(cached);
            const ttl = config?.ttl || DEFAULT_TTL;
            const version = config?.version || CACHE_VERSION;

            // Перевірка версії
            if (cacheItem.version !== version) {
                this.remove(key);
                return null;
            }

            // Перевірка TTL
            const isExpired = Date.now() - cacheItem.timestamp > ttl;
            if (isExpired) {
                this.remove(key);
                return null;
            }

            return cacheItem.data;
        } catch (error) {
            console.error(`Error reading cache for key "${key}":`, error);
            return null;
        }
    }

    /**
     * Зберегти дані в кеш
     */
    set<T>(key: string, data: T, config?: CacheConfig): void {
        try {
            const cacheKey = this.getCacheKey(key);
            const version = config?.version || CACHE_VERSION;

            const cacheItem: CacheItem<T> = {
                data,
                timestamp: Date.now(),
                version,
            };

            localStorage.setItem(cacheKey, JSON.stringify(cacheItem));
        } catch (error) {
            console.error(`Error writing cache for key "${key}":`, error);
            // Якщо localStorage заповнений, очищаємо старі дані
            if (
                error instanceof DOMException &&
                error.name === 'QuotaExceededError'
            ) {
                this.clearOldCache();
                // Спробуємо ще раз
                try {
                    const cacheKey = this.getCacheKey(key);
                    const version = config?.version || CACHE_VERSION;
                    const cacheItem: CacheItem<T> = {
                        data,
                        timestamp: Date.now(),
                        version,
                    };
                    localStorage.setItem(cacheKey, JSON.stringify(cacheItem));
                } catch (retryError) {
                    console.error(
                        'Failed to cache data after cleanup:',
                        retryError,
                    );
                }
            }
        }
    }

    /**
     * Видалити дані з кешу
     */
    remove(key: string): void {
        try {
            const cacheKey = this.getCacheKey(key);
            localStorage.removeItem(cacheKey);
        } catch (error) {
            console.error(`Error removing cache for key "${key}":`, error);
        }
    }

    /**
     * Очистити весь кеш
     */
    clearAll(): void {
        try {
            const keys = Object.keys(localStorage);
            keys.forEach((key) => {
                if (key.startsWith(this.prefix)) {
                    localStorage.removeItem(key);
                }
            });
        } catch (error) {
            console.error('Error clearing all cache:', error);
        }
    }

    /**
     * Очистити застарілі дані з кешу
     */
    clearOldCache(): void {
        try {
            const keys = Object.keys(localStorage);
            const now = Date.now();

            keys.forEach((key) => {
                if (!key.startsWith(this.prefix)) return;

                try {
                    const cached = localStorage.getItem(key);
                    if (!cached) return;

                    const cacheItem: CacheItem<any> = JSON.parse(cached);
                    const age = now - cacheItem.timestamp;

                    // Видаляємо дані старіші за 24 години
                    if (age > 24 * 60 * 60 * 1000) {
                        localStorage.removeItem(key);
                    }
                } catch (error) {
                    // Якщо не вдається прочитати, видаляємо
                    localStorage.removeItem(key);
                }
            });
        } catch (error) {
            console.error('Error clearing old cache:', error);
        }
    }

    /**
     * Обгорнути Firebase запит кешуванням
     */
    async wrap<T>(
        key: string,
        fetchFn: () => Promise<T>,
        config?: CacheConfig,
    ): Promise<T> {
        // Спробувати отримати з кешу
        const cached = this.get<T>(key, config);
        if (cached !== null) {
            return cached;
        }

        // Якщо в кеші немає, виконати запит
        const data = await fetchFn();

        // Зберегти в кеш
        this.set(key, data, config);

        return data;
    }

    /**
     * Отримати повний ключ кешу з префіксом
     */
    private getCacheKey(key: string): string {
        return `${this.prefix}${key}`;
    }

    /**
     * Отримати статистику кешу
     */
    getStats(): {
        totalItems: number;
        totalSize: number;
        items: Array<{ key: string; size: number; age: number }>;
    } {
        const keys = Object.keys(localStorage);
        const cacheKeys = keys.filter((key) => key.startsWith(this.prefix));
        const now = Date.now();

        const items = cacheKeys.map((key) => {
            const value = localStorage.getItem(key) || '';
            const size = new Blob([value]).size;

            let age = 0;
            try {
                const cacheItem: CacheItem<any> = JSON.parse(value);
                age = now - cacheItem.timestamp;
            } catch (error) {
                // ignore
            }

            return {
                key: key.replace(this.prefix, ''),
                size,
                age,
            };
        });

        const totalSize = items.reduce((sum, item) => sum + item.size, 0);

        return {
            totalItems: items.length,
            totalSize,
            items,
        };
    }
}

// Експортуємо singleton instance
export const cacheManager = new CacheManager();

// Експортуємо константи для налаштування TTL
export const CACHE_TTL = {
    SHORT: 5 * 60 * 1000, // 5 хвилин
    MEDIUM: 30 * 60 * 1000, // 30 хвилин
    LONG: 2 * 60 * 60 * 1000, // 2 години
    DAY: 24 * 60 * 60 * 1000, // 24 години
};
