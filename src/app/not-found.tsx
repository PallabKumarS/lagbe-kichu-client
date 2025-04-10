import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 py-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <Image
          src="/404-illustration.svg"
          alt="Page Not Found"
          width={300}
          height={300}
          className="mx-auto"
        />
        <h1 className="text-4xl font-bold text-gray-800">
          Oops! Page Not Found
        </h1>
        <p className="text-gray-600 text-lg">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            href="/"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            Go to Home
          </Link>
          <Link
            href="/listings"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            Browse Listings
          </Link>
        </div>
      </div>
    </div>
  );
}
