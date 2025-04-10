import { Loader } from "lucide-react";

/**
 * A loading UI component that displays an loading spinner.
 */
export default function LoadingSpinner() {
  return (
    <section className="flex items-center justify-center min-h-screen">
      <Loader className="w-14 h-14 animate-spin text-purple-600" />
    </section>
  );
}
