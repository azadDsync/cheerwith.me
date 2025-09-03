import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="bg-[#084D4B] h-screen w-screen flex items-center justify-center">
      <div className="text-center text-white max-w-md px-4">
        <h2 className="text-4xl font-bold mb-4">404</h2>
        <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
        <p className="mb-6 text-white/80">
          The celebration you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link 
          href="/" 
          className="doodle-btn inline-block"
          aria-label="Return to Teachers Day celebration home"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
