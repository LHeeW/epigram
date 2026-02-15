import { useEffect, useRef } from "react";

interface UseIntersectionObserverProps {
  onIntersect: () => void; // 교차 시 실행할 함수
  enabled?: boolean; // 활성화 여부
  threshold: number; // 얼마나 보였을 때 실행할지
  rootMargin: string; // 타겟 탐지 범위를 확장
}

export const useIntersectionObserver = ({
  onIntersect,
  enabled = true,
  threshold = 1.0,
  rootMargin = "10px",
}: UseIntersectionObserverProps) => {
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled || !targetRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onIntersect();
          }
        });
      },
      { threshold, rootMargin },
    );

    const el = targetRef.current;
    observer.observe(el);

    return () => observer.unobserve(el);
  }, [enabled, onIntersect, threshold, rootMargin]);

  return { targetRef };
};
