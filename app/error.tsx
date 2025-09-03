'use client';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="bg-[#084D4B] h-screen w-screen flex items-center justify-center">
      <div className="text-center text-white max-w-md px-4">
        <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
        <p className="mb-6 text-white/80">
          We apologize for the inconvenience. The celebration encountered an error.
        </p>
        <button
          onClick={reset}
          className="doodle-btn"
          aria-label="Try celebrating again"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
