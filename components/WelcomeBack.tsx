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

        <div className="flex flex-row items-center justify-center gap-3">
          {notesCount > 0 ? (
            <>
              <button
                onClick={scrollToDashboard}
                className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/30 sm:px-7 sm:py-3 sm:text-base"
              >
                View My Notes ({notesCount})
              </button>
              <button
                onClick={scrollToCreateNote}
                className="rounded-full border border-line bg-card px-5 py-2.5 text-sm font-semibold text-ink transition-all hover:-translate-y-0.5 hover:border-ink-faint focus:outline-none focus:ring-2 focus:ring-tertiary/30 sm:px-7 sm:py-3 sm:text-base"
              >
                + New Note
              </button>
            </>
          ) : (
            <button
              onClick={scrollToDashboard}
              className="rounded-full bg-primary px-8 py-3 text-base font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/30 sm:text-lg"
            >
              Create Your First Note
            </button>
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
