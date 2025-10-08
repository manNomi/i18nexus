"use client";

import { useI18nContext } from "../components/I18nProvider";
import { useMemo, useCallback, useRef, useEffect } from "react";

// 성능 통계를 위한 인터페이스
interface PerformanceStats {
  totalCalls: number;
  cacheHits: number;
  cacheMisses: number;
  averageTime: number;
  lastCallTime: number;
}

// 번역 캐시 클래스
class TranslationCache {
  private cache = new Map<string, string>();
  private maxSize = 1000;
  private accessOrder = new Map<string, number>();
  private accessCounter = 0;

  get(key: string, language: string): string | undefined {
    const cacheKey = `${language}:${key}`;
    const result = this.cache.get(cacheKey);

    if (result) {
      // LRU 업데이트
      this.accessOrder.set(cacheKey, ++this.accessCounter);
    }

    return result;
  }

  set(key: string, language: string, value: string): void {
    const cacheKey = `${language}:${key}`;

    // 캐시 크기 제한 (LRU 방식)
    if (this.cache.size >= this.maxSize) {
      this.evictLRU();
    }

    this.cache.set(cacheKey, value);
    this.accessOrder.set(cacheKey, ++this.accessCounter);
  }

  private evictLRU(): void {
    let oldestKey = "";
    let oldestTime = Infinity;

    for (const [key, time] of this.accessOrder) {
      if (time < oldestTime) {
        oldestTime = time;
        oldestKey = key;
      }
    }

    this.cache.delete(oldestKey);
    this.accessOrder.delete(oldestKey);
  }

  clear(): void {
    this.cache.clear();
    this.accessOrder.clear();
    this.accessCounter = 0;
  }

  getStats() {
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      hitRate:
        this.cache.size > 0
          ? (this.cache.size / (this.cache.size + this.accessCounter)) * 100
          : 0,
    };
  }
}

// 전역 캐시 인스턴스
const globalCache = new TranslationCache();

// 성능 측정을 위한 통계
const performanceStats: PerformanceStats = {
  totalCalls: 0,
  cacheHits: 0,
  cacheMisses: 0,
  averageTime: 0,
  lastCallTime: 0,
};

/**
 * 성능 최적화된 번역 훅
 */
export const useTranslationOptimized = () => {
  const { currentLanguage, isLoading, translations } = useI18nContext();

  // 현재 언어의 번역 데이터를 메모이제이션
  const currentTranslations = useMemo(() => {
    return translations[currentLanguage] || {};
  }, [translations, currentLanguage]);

  // 성능 통계를 위한 ref
  const statsRef = useRef(performanceStats);

  // 최적화된 번역 함수
  const translate = useCallback(
    (key: string) => {
      const startTime = performance.now();
      statsRef.current.totalCalls++;

      // 캐시에서 먼저 확인
      const cached = globalCache.get(key, currentLanguage);
      if (cached) {
        statsRef.current.cacheHits++;
        const endTime = performance.now();
        statsRef.current.averageTime =
          (statsRef.current.averageTime + (endTime - startTime)) / 2;
        statsRef.current.lastCallTime = endTime - startTime;
        return cached;
      }

      // 캐시 미스 - 번역 데이터에서 찾기
      statsRef.current.cacheMisses++;
      const translation = currentTranslations[key] || key;

      // 결과를 캐시에 저장
      globalCache.set(key, currentLanguage, translation);

      const endTime = performance.now();
      statsRef.current.averageTime =
        (statsRef.current.averageTime + (endTime - startTime)) / 2;
      statsRef.current.lastCallTime = endTime - startTime;

      return translation;
    },
    [currentTranslations, currentLanguage],
  );

  // 성능 통계 반환
  const getPerformanceStats = useCallback(() => {
    const cacheStats = globalCache.getStats();
    return {
      ...statsRef.current,
      cacheHitRate:
        statsRef.current.totalCalls > 0
          ? (statsRef.current.cacheHits / statsRef.current.totalCalls) * 100
          : 0,
      cacheStats,
    };
  }, []);

  // 캐시 초기화
  const clearCache = useCallback(() => {
    globalCache.clear();
    statsRef.current.totalCalls = 0;
    statsRef.current.cacheHits = 0;
    statsRef.current.cacheMisses = 0;
    statsRef.current.averageTime = 0;
    statsRef.current.lastCallTime = 0;
  }, []);

  // 언어 변경 시 캐시 정리 (선택적)
  useEffect(() => {
    // 언어가 변경되면 해당 언어의 캐시만 유지하고 나머지 정리
    // 실제로는 언어별 캐시를 분리하는 것이 더 좋을 수 있음
  }, [currentLanguage]);

  return {
    t: translate,
    currentLanguage,
    isReady: !isLoading,
    getPerformanceStats,
    clearCache,
  };
};

/**
 * 배치 번역 함수 (여러 키를 한 번에 번역)
 */
export const useBatchTranslation = () => {
  const { currentLanguage, translations } = useI18nContext();

  const currentTranslations = useMemo(() => {
    return translations[currentLanguage] || {};
  }, [translations, currentLanguage]);

  const translateBatch = useCallback(
    (keys: string[]) => {
      return keys.map((key) => currentTranslations[key] || key);
    },
    [currentTranslations],
  );

  return {
    translateBatch,
    currentLanguage,
  };
};

/**
 * 지연 로딩을 위한 번역 함수
 */
export const useLazyTranslation = () => {
  const { currentLanguage, translations } = useI18nContext();

  const translateLazy = useCallback(
    async (key: string) => {
      // 실제로는 동적 import나 네트워크 요청을 시뮬레이션
      await new Promise((resolve) => setTimeout(resolve, 0));

      const currentTranslations = translations[currentLanguage] || {};
      return currentTranslations[key] || key;
    },
    [currentLanguage, translations],
  );

  return {
    translateLazy,
    currentLanguage,
  };
};

/**
 * 메모리 사용량을 모니터링하는 번역 훅
 */
export const useTranslationWithMonitoring = () => {
  const { currentLanguage, isLoading, translations } = useI18nContext();

  const currentTranslations = useMemo(() => {
    return translations[currentLanguage] || {};
  }, [translations, currentLanguage]);

  const translate = useCallback(
    (key: string) => {
      const startTime = performance.now();
      const result = currentTranslations[key] || key;
      const endTime = performance.now();

      // 메모리 사용량 체크 (브라우저에서만)
      if (typeof window !== "undefined" && "memory" in performance) {
        const memory = (performance as any).memory;
        if (memory.usedJSHeapSize > 50 * 1024 * 1024) {
          // 50MB 초과 시
          console.warn("High memory usage detected:", {
            used: Math.round(memory.usedJSHeapSize / 1024 / 1024) + "MB",
            total: Math.round(memory.totalJSHeapSize / 1024 / 1024) + "MB",
          });
        }
      }

      return result;
    },
    [currentTranslations],
  );

  return {
    t: translate,
    currentLanguage,
    isReady: !isLoading,
  };
};
