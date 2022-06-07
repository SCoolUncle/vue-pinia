import { onLoad, getLastEvent } from '/@/utils/tool/utils';

export function timing() {
  let FMP: any = null; // 首次元素绘制时间
  let LCP: any = null; // 页面最大元素绘制时间
  // 对页面有意义的元素进行性能观察
  new PerformanceObserver((entryList, observe) => {
    const perfEntries = entryList.getEntries();
    FMP = perfEntries[0];
    observe.disconnect();
  }).observe({ entryTypes: ['element'] });

  new PerformanceObserver((entryList, observe) => {
    const perfEntries = entryList.getEntries();
    const lastEntry = perfEntries[perfEntries.length - 1];
    LCP = lastEntry;
    observe.disconnect();
  }).observe({ entryTypes: ['largest-contentful-paint'] });

  onLoad(() => {
    setTimeout(() => {
      const {
        fetchStart,
        connectStart,
        connectEnd,
        requestStart,
        responseStart,
        responseEnd,
        domLoading,
        domInteractive,
        domContentLoadedEventStart,
        domContentLoadedEventEnd,
        loadEventStart,
      } = window.performance.timing;
      // 时间指标
      const performanceData = {
        kind: 'experience',
        type: 'timing',
        connectTime: connectEnd - connectStart, // TCP链接耗时
        ttfbTime: responseStart - requestStart, // 首字节到达时间
        responseTime: responseEnd - responseStart, // response响应耗时
        parseDOMTime: loadEventStart - domLoading, // dom 解析时间
        domContentLoadedTime: domContentLoadedEventEnd - domContentLoadedEventStart, // DOMContentLoaded时间回调耗时
        timeToInteractive: domInteractive - fetchStart, // 首次可交互时间
        loadTime: loadEventStart - fetchStart, // 完整加载时间
      };
      console.log(performanceData);
      // 性能指标
      const FP = performance.getEntriesByName('first-paint')[0];
      const FCP = performance.getEntriesByName('first-contentful-paint')[0];

      // 接口上报
      // api
    }, 3000);
  });
}

export function pv() {
  const startTime = Date.now();
  window.addEventListener(
    'unload',
    () => {
      const stayTime = Date.now() - startTime;
      console.log('页面停留时长：', stayTime);
    },
    false,
  );
}

export function openPerformance() {
  pv();
  timing();
}
