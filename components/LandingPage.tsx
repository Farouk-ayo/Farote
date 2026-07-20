import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/components/Button";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="max-w-4xl mx-auto animate-rise">
      {/* Hero Section */}
      <div className="text-center mb-14">
        <p className="mb-4 inline-block rounded-full border border-line bg-card px-4 py-1 text-xs font-semibold uppercase tracking-widest text-secondary">
          Notes, the warm way
        </p>
        <h1 className="mb-6 font-display text-4xl font-semibold text-ink sm:text-6xl">
          Your thoughts deserve a{" "}
          <span className="italic text-secondary">cozy home</span>.
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-xl text-ink-soft">
          Capture your thoughts, organize your ideas, and access them anywhere.
          Simple, secure, and always available.
        </p>

        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            onClick={() => router.push("/register")}
            className="w-full sm:w-auto rounded-full bg-primary px-7 text-white hover:bg-primary/90 focus:ring-primary/30"
          >
            Get Started Free
          </Button>
          <Button
            onClick={() => router.push("/login")}
            className="w-full sm:w-auto rounded-full border border-line bg-card px-7 !text-primary hover:bg-tertiary/15 focus:ring-tertiary/30"
          >
            Sign In
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div className="mb-14 grid gap-5 md:grid-cols-3">
        <FeatureCard
          icon={
            <svg
              className="w-6 h-6 text-secondary"
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
          bgColor="bg-secondary/10"
        />

        <FeatureCard
          icon={
            <svg
              className="w-6 h-6 text-primary"
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
          bgColor="bg-primary/10"
        />

        <FeatureCard
          icon={
            <svg
              className="w-6 h-6 text-tertiary"
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
          bgColor="bg-tertiary/15"
        />
      </div>

      {/* Call to Action */}
      <div className="overflow-hidden rounded-2xl border border-line bg-card text-center shadow-(--shadow-card)">
        <div className="h-1 w-full bg-gradient-to-r from-tertiary via-secondary to-tertiary" />
        <div className="p-8">
          <h2 className="mb-3 font-display text-2xl font-semibold text-ink">
            Ready to get started?
          </h2>
          <p className="mb-6 text-ink-soft">
            Join thousands of users who trust us with their notes
          </p>
          <Link
            href="/register"
            className="inline-block rounded-full bg-secondary px-6 py-3 text-white transition-colors hover:bg-secondary/85 focus:outline-none focus:ring-2 focus:ring-secondary/30"
          >
            Create Your Account
          </Link>
        </div>
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
    <div className="rounded-2xl border border-line bg-card p-6 text-center shadow-(--shadow-card) transition-all duration-300 hover:-translate-y-1 hover:shadow-(--shadow-card-hover)">
      <div
        className={`w-12 h-12 ${bgColor} mx-auto mb-4 flex items-center justify-center rounded-xl`}
      >
        {icon}
      </div>
      <h3 className="mb-2 font-display text-lg font-semibold text-ink">
        {title}
      </h3>
      <p className="text-ink-soft">{description}</p>
    </div>
  );
}
