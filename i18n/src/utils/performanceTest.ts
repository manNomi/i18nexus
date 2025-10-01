/**
 * 번역 함수 성능 테스트 유틸리티
 */

export interface PerformanceTestResult {
  functionName: string;
  totalTime: number;
  averageTime: number;
  callsPerSecond: number;
  memoryUsage?: number;
}

export class TranslationPerformanceTester {
  private results: PerformanceTestResult[] = [];

  /**
   * 번역 함수 성능 테스트
   */
  testTranslationFunction(
    translateFn: (key: string) => string,
    testKeys: string[],
    iterations: number = 10000
  ): PerformanceTestResult {
    const startTime = performance.now();
    const startMemory = this.getMemoryUsage();

    // 테스트 실행
    for (let i = 0; i < iterations; i++) {
      const key = testKeys[i % testKeys.length];
      translateFn(key);
    }

    const endTime = performance.now();
    const endMemory = this.getMemoryUsage();

    const totalTime = endTime - startTime;
    const averageTime = totalTime / iterations;
    const callsPerSecond = 1000 / averageTime;

    const result: PerformanceTestResult = {
      functionName: translateFn.name || "anonymous",
      totalTime,
      averageTime,
      callsPerSecond,
      memoryUsage: endMemory - startMemory,
    };

    this.results.push(result);
    return result;
  }

  /**
   * 두 번역 함수 비교
   */
  compareTranslationFunctions(
    fn1: (key: string) => string,
    fn2: (key: string) => string,
    testKeys: string[],
    iterations: number = 10000
  ) {
    const result1 = this.testTranslationFunction(fn1, testKeys, iterations);
    const result2 = this.testTranslationFunction(fn2, testKeys, iterations);

    return {
      function1: result1,
      function2: result2,
      improvement: {
        timeImprovement:
          ((result1.averageTime - result2.averageTime) / result1.averageTime) *
          100,
        speedImprovement:
          ((result2.callsPerSecond - result1.callsPerSecond) /
            result1.callsPerSecond) *
          100,
      },
    };
  }

  /**
   * 메모리 사용량 측정
   */
  private getMemoryUsage(): number {
    if ("memory" in performance) {
      return (performance as any).memory.usedJSHeapSize;
    }
    return 0;
  }

  /**
   * 모든 결과 가져오기
   */
  getResults(): PerformanceTestResult[] {
    return [...this.results];
  }

  /**
   * 결과 초기화
   */
  clearResults(): void {
    this.results = [];
  }

  /**
   * 결과를 콘솔에 출력
   */
  logResults(): void {
    console.group("🚀 Translation Performance Test Results");

    this.results.forEach((result, index) => {
      console.log(`\n📊 Test ${index + 1}: ${result.functionName}`);
      console.log(`⏱️  Total Time: ${result.totalTime.toFixed(2)}ms`);
      console.log(
        `⚡ Average Time: ${result.averageTime.toFixed(4)}ms per call`
      );
      console.log(
        `🔥 Calls Per Second: ${Math.round(result.callsPerSecond).toLocaleString()}`
      );
      if (result.memoryUsage) {
        console.log(
          `💾 Memory Usage: ${(result.memoryUsage / 1024).toFixed(2)}KB`
        );
      }
    });

    console.groupEnd();
  }
}

/**
 * 간단한 성능 테스트 헬퍼
 */
export const quickPerformanceTest = (
  translateFn: (key: string) => string,
  testKeys: string[] = ["welcome", "hello", "goodbye", "thank you", "please"],
  iterations: number = 10000
) => {
  const tester = new TranslationPerformanceTester();
  const result = tester.testTranslationFunction(
    translateFn,
    testKeys,
    iterations
  );

  console.log("🚀 Quick Performance Test Result:");
  console.log(
    `⚡ ${Math.round(result.callsPerSecond).toLocaleString()} calls/second`
  );
  console.log(`⏱️  ${result.averageTime.toFixed(4)}ms per call`);

  return result;
};

/**
 * SSR vs Client 번역 성능 비교
 */
export const compareSSRClientPerformance = async (
  ssrTranslator: (key: string) => string,
  clientTranslator: (key: string) => string,
  testKeys: string[] = ["welcome", "hello", "goodbye", "thank you", "please"],
  iterations: number = 10000
) => {
  console.log("🔄 Comparing SSR vs Client Performance...");

  const tester = new TranslationPerformanceTester();

  // SSR 성능 테스트
  const ssrResult = tester.testTranslationFunction(
    ssrTranslator,
    testKeys,
    iterations
  );

  // Client 성능 테스트
  const clientResult = tester.testTranslationFunction(
    clientTranslator,
    testKeys,
    iterations
  );

  const comparison = {
    ssr: ssrResult,
    client: clientResult,
    improvement: {
      timeImprovement:
        ((ssrResult.averageTime - clientResult.averageTime) /
          ssrResult.averageTime) *
        100,
      speedImprovement:
        ((clientResult.callsPerSecond - ssrResult.callsPerSecond) /
          ssrResult.callsPerSecond) *
        100,
    },
  };

  console.log("📊 SSR vs Client Performance Comparison:");
  console.log(
    `SSR: ${Math.round(ssrResult.callsPerSecond).toLocaleString()} calls/sec`
  );
  console.log(
    `Client: ${Math.round(clientResult.callsPerSecond).toLocaleString()} calls/sec`
  );
  console.log(
    `Improvement: ${comparison.improvement.speedImprovement.toFixed(1)}%`
  );

  return comparison;
};

/**
 * 메모리 사용량 테스트
 */
export const memoryUsageTest = (
  translateFn: (key: string) => string,
  testKeys: string[],
  iterations: number = 10000
) => {
  if (typeof window === "undefined" || !("memory" in performance)) {
    console.warn("Memory usage test only available in browser environment");
    return null;
  }

  const memory = (performance as any).memory;
  const startMemory = memory.usedJSHeapSize;

  // 번역 함수 실행
  for (let i = 0; i < iterations; i++) {
    const key = testKeys[i % testKeys.length];
    translateFn(key);
  }

  const endMemory = memory.usedJSHeapSize;
  const memoryUsed = endMemory - startMemory;

  console.log("💾 Memory Usage Test:");
  console.log(`Start: ${Math.round(startMemory / 1024)}KB`);
  console.log(`End: ${Math.round(endMemory / 1024)}KB`);
  console.log(`Used: ${Math.round(memoryUsed / 1024)}KB`);

  return {
    startMemory,
    endMemory,
    memoryUsed,
    memoryUsedKB: Math.round(memoryUsed / 1024),
  };
};

/**
 * 캐시 효율성 테스트
 */
export const cacheEfficiencyTest = (
  translateFn: (key: string) => string,
  testKeys: string[],
  iterations: number = 10000
) => {
  const startTime = performance.now();

  // 첫 번째 실행 (캐시 미스)
  for (let i = 0; i < iterations; i++) {
    const key = testKeys[i % testKeys.length];
    translateFn(key);
  }

  const firstRunTime = performance.now() - startTime;

  // 두 번째 실행 (캐시 히트)
  const secondStartTime = performance.now();
  for (let i = 0; i < iterations; i++) {
    const key = testKeys[i % testKeys.length];
    translateFn(key);
  }

  const secondRunTime = performance.now() - secondStartTime;

  const cacheEfficiency = ((firstRunTime - secondRunTime) / firstRunTime) * 100;

  console.log("🎯 Cache Efficiency Test:");
  console.log(`First run: ${firstRunTime.toFixed(2)}ms`);
  console.log(`Second run: ${secondRunTime.toFixed(2)}ms`);
  console.log(`Cache efficiency: ${cacheEfficiency.toFixed(1)}%`);

  return {
    firstRunTime,
    secondRunTime,
    cacheEfficiency,
  };
};
