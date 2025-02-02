import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export interface LoadMoreProps {
  onLoadMore: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

export default function LoadMore({
  onLoadMore,
  hasNextPage,
  isFetchingNextPage,
}: LoadMoreProps) {
  const { ref, inView } = useInView({
    triggerOnce: false,
  });

  useEffect(() => {
    // Trigger next page fetch if it's already in view on initial load
    if (inView && hasNextPage && !isFetchingNextPage) {
      onLoadMore();
    }
  }, [inView, hasNextPage, isFetchingNextPage, onLoadMore]);

  if (!hasNextPage) {
    return null;
  }

  return <div ref={ref} className="h-8" />;
}
