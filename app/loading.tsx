export default function Loading() {
  return (
    <div className="bg-[#084D4B] h-screen w-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-white text-lg">Loading celebration...</p>
      </div>
    </div>
  );
}
