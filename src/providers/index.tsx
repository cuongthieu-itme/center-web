import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../components/shared/error-fallback";
import LoadingSpinner from "../components/shared/loading-spinner";
import AuthProvider from "../context/auth-provider";
import SocketProvider from "../context/socket-provider";

interface ProvidersProps {
  children: React.ReactNode;
}

/**
 * A component that provides the necessary context providers for the app,
 * including error boundary, suspense for loading, and socket provider.
 *
 * */
export default function Providers({ children }: ProvidersProps) {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ErrorBoundary fallback={<ErrorFallback />}>
        <AuthProvider>
          <SocketProvider>{children}</SocketProvider>
        </AuthProvider>
      </ErrorBoundary>
    </Suspense>
  );
}
