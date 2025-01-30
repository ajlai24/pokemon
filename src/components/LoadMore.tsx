import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

interface LoadMoreProps {
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
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        onLoadMore();
      }
    },
  });

  useEffect(() => {
    // Trigger next page fetch if it's already in view on initial load
    if (inView && hasNextPage && !isFetchingNextPage) {
      onLoadMore();
    }
  }, [inView, hasNextPage, isFetchingNextPage, onLoadMore]);

  return <div ref={ref} className="h-16" />;
}
