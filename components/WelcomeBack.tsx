import Button from "@/components/Button";
import { capitalizeName } from "@/utils/capitalize";

interface WelcomeBackProps {
  userName: string;
  notesCount: number;
}

export default function WelcomeBack({
  userName,
  notesCount,
}: WelcomeBackProps) {
  const scrollToDashboard = () => {
    const dashboardElement = document.querySelector("[data-dashboard]");
    if (dashboardElement) {
      dashboardElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToCreateNote = () => {
    // First scroll to dashboard, then trigger create note
    scrollToDashboard();
    setTimeout(() => {
      const createButton = document.querySelector(
        "[data-create-note-trigger]"
      ) as HTMLButtonElement;
      if (createButton) {
        createButton.click();
      }
    }, 500);
  };

  return (
    <div className="mx-auto max-w-4xl animate-rise">
      <div className="mb-10 text-center">
        <p className="mb-3 inline-block rounded-full border border-line bg-card px-4 py-1 text-xs font-semibold uppercase tracking-widest text-secondary">
          Welcome back
        </p>
        <h1 className="mb-4 font-display text-4xl font-semibold text-ink sm:text-5xl">
          Hello,{" "}
          <span className="italic text-secondary">
            {capitalizeName(userName)}
          </span>
          .
        </h1>
        <p className="mb-8 text-lg text-ink-soft">
          {notesCount === 0
            ? "Ready to create your first note?"
            : `You have ${notesCount} note${
                notesCount !== 1 ? "s" : ""
              } waiting for you.`}
        </p>

        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          {notesCount > 0 ? (
            <>
              <Button
                onClick={scrollToDashboard}
                className="w-full sm:w-auto rounded-full bg-primary px-6 text-white hover:bg-primary/90 focus:ring-primary/30"
              >
                View My Notes ({notesCount})
              </Button>
              <Button
                onClick={scrollToCreateNote}
                className="w-full sm:w-auto rounded-full border border-line bg-card px-6 !text-primary hover:bg-tertiary/15 focus:ring-tertiary/30"
              >
                + Create New Note
              </Button>
            </>
          ) : (
            <Button
              onClick={scrollToDashboard}
              className="w-full sm:w-auto rounded-full bg-primary px-8 py-3 text-lg text-white hover:bg-primary/90 focus:ring-primary/30"
            >
              Get Started - Create Your First Note.
            </Button>
          )}
        </div>
      </div>

      {/* Stats section */}
      <div className="mb-8 overflow-hidden rounded-2xl border border-line bg-card shadow-(--shadow-card)">
        <div className="grid grid-cols-2 divide-x divide-line">
          <div className="px-4 py-5 text-center">
            <div className="font-display text-3xl font-semibold text-primary">
              {notesCount}
            </div>
            <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-ink-faint">
              Total Notes
            </div>
          </div>
          <div className="px-4 py-5 text-center">
            <div className="font-display text-3xl font-semibold text-secondary">
              {notesCount > 0 ? Math.ceil(notesCount / 7) : 0}
            </div>
            <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-ink-faint">
              Notes per Week
            </div>
          </div>
        </div>
        <p className="border-t border-dashed border-line bg-paper/60 px-4 py-3 text-center text-sm text-ink-soft">
          {notesCount === 0
            ? "Start organizing your thoughts and ideas today!"
            : "Keep up the great work organizing your thoughts!"}
        </p>
      </div>
    </div>
  );
}
