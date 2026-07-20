import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col justify-center animate-rise">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="mb-5 font-display text-4xl font-semibold text-ink sm:text-6xl">
          Your thoughts deserve a{" "}
          <span className="italic text-secondary">cozy home</span>.
        </h1>
        <p className="mx-auto mb-8 max-w-md text-base text-ink-soft sm:text-lg">
          Capture your thoughts, organize your ideas, and access them anywhere.
        </p>

        <div className="mb-12 flex flex-row items-center justify-center gap-3">
          <button
            onClick={() => router.push("/register")}
            className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/30 sm:px-8 sm:py-3 sm:text-base"
          >
            Get Started Free
          </button>
          <button
            onClick={() => router.push("/login")}
            className="rounded-full border border-line bg-card px-6 py-2.5 text-sm font-semibold text-ink transition-all hover:-translate-y-0.5 hover:border-ink-faint focus:outline-none focus:ring-2 focus:ring-tertiary/30 sm:px-8 sm:py-3 sm:text-base"
          >
            Sign In
          </button>
        </div>
      </div>

      {/* Features Section — compact, three across on every screen */}
      <div className="mx-auto grid w-full max-w-2xl grid-cols-3 gap-2 sm:gap-4">
        <FeatureItem
          icon={
            <svg
              className="h-5 w-5 text-secondary"
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
          description="Quick, intuitive note-taking"
        />
        <FeatureItem
          icon={
            <svg
              className="h-5 w-5 text-secondary"
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
          description="Safely stored, always private"
        />
        <FeatureItem
          icon={
            <svg
              className="h-5 w-5 text-secondary"
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
          title="Any Device"
          description="Your notes, anywhere"
        />
      </div>
    </div>
  );
}

interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureItem({ icon, title, description }: FeatureItemProps) {
  return (
    <div className="rounded-2xl border border-line bg-card p-3 text-center sm:p-5">
      <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-secondary/10 sm:h-11 sm:w-11">
        {icon}
      </div>
      <h3 className="text-xs font-bold text-ink sm:text-base">{title}</h3>
      <p className="mt-1 hidden text-sm text-ink-soft sm:block">
        {description}
      </p>
    </div>
  );
}
