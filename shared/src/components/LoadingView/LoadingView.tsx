import { LoadingSpinner } from '@shared/components/LoadingSpinner/LoadingSpinner';

export function LoadingView() {
  return (
    <div className="flex flex-col items-center justify-center min-h-main-content-sp sm:min-h-main-content-pc">
      <LoadingSpinner size="lg" />
    </div>
  );
}
