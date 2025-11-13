import { ref, onMounted, onBeforeUnmount } from "vue";

/**
 * 輕量級滾動進入動畫 composable
 * 使用 Intersection Observer API 實現 fade-in 效果
 *
 * @param {Object} options - 配置選項
 * @param {number} options.threshold - 觸發閾值 (0-1)，默認 0.1 (元素 10% 可見時觸發)
 * @param {number} options.rootMargin - 根邊距，默認 '0px' (可提前觸發，如 '-50px')
 * @param {boolean} options.once - 是否只觸發一次，默認 true
 * @returns {Object} { elementRef, isVisible }
 */
export function useScrollAnimation(options = {}) {
  const { threshold = 0.1, rootMargin = "0px", once = true } = options;

  const elementRef = ref(null);
  const isVisible = ref(false);

  let observer = null;

  onMounted(() => {
    if (!elementRef.value) return;

    // 檢查瀏覽器是否支持 Intersection Observer
    if (!("IntersectionObserver" in window)) {
      // 不支持時直接顯示
      isVisible.value = true;
      return;
    }

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisible.value = true;

            // 如果設置為只觸發一次，則停止觀察
            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            // 如果允許重複觸發，元素離開視口時重置
            isVisible.value = false;
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(elementRef.value);
  });

  onBeforeUnmount(() => {
    if (observer && elementRef.value) {
      observer.unobserve(elementRef.value);
      observer.disconnect();
    }
  });

  return {
    elementRef,
    isVisible,
  };
}
