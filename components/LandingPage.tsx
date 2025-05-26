import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/components/Button";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
          Your Personal Note-Taking App
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Capture your thoughts, organize your ideas, and access them anywhere.
          Simple, secure, and always available.
        </p>

        <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          <Button
            onClick={() => router.push("/register")}
            className="bg-primary hover:bg-primary/90 text-white focus:ring-primary/30"
          >
            Get Started Free
          </Button>
          <Button
            onClick={() => router.push("/login")}
            className=" bg-tertiary hover:bg-tertiary/90 text-gray-700 focus:ring-tertiary/30"
          >
            Sign In
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <FeatureCard
          icon={
            <svg
              className="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          }
          title="Easy to Use"
          description="Simple and intuitive interface for quick note-taking"
          bgColor="bg-blue-100"
        />

        <FeatureCard
          icon={
            <svg
              className="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          }
          title="Secure"
          description="Your notes are encrypted and safely stored"
          bgColor="bg-green-100"
        />

        <FeatureCard
          icon={
            <svg
              className="w-6 h-6 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          }
          title="Anywhere Access"
          description="Access your notes from any device, anytime"
          bgColor="bg-purple-100"
        />
      </div>

      {/* Call to Action */}
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
        <p className="text-gray-600 mb-6">
          Join thousands of users who trust us with their notes
        </p>
        <Link
          href="/register"
          className="inline-block bg-tertiary text-white px-6 py-3 rounded-lg  transition-colors hover:bg-tertiary/80 focus:ring-2 focus:ring-tertiary/30 focus:outline-none"
        >
          Create Your Account
        </Link>
      </div>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  bgColor: string;
}

function FeatureCard({ icon, title, description, bgColor }: FeatureCardProps) {
  return (
    <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200">
      <div
        className={`w-12 h-12 ${bgColor} rounded-lg flex items-center justify-center mx-auto mb-4`}
      >
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
