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
    <div className="max-w-4xl mx-auto">wsss
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome back, {capitalizeName(userName)}!
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          {notesCount === 0
            ? "Ready to create your first note?"
            : `You have ${notesCount} note${
                notesCount !== 1 ? "s" : ""
              } waiting for you.`}
        </p>

        <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          {notesCount > 0 ? (
            <>
              <Button
                onClick={scrollToDashboard}
                className="bg-primary hover:bg-primary/90 text-white focus:ring-primary/30"
              >
                View My Notes ({notesCount})
              </Button>
              <Button
                onClick={scrollToCreateNote}
                className="bg-tertiary hover:bg-tertiary/90 text-gray-700 focus:ring-tertiary/30"
              >
                Create New Note
              </Button>
            </>
          ) : (
            <Button
              onClick={scrollToDashboard}
              className="bg-primary hover:bg-primary/90 text-white focus:ring-primary/30 text-lg px-8 py-3"
            >
              Get Started - Create Your First Note
            </Button>
          )}
        </div>
      </div>

      {/* Stats section */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 text-center mb-8">
        <div className="flex justify-center items-center space-x-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{notesCount}</div>
            <div className="text-sm text-gray-600">Total Notes</div>
          </div>
          <div className="w-px h-8 bg-gray-300"></div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {notesCount > 0 ? Math.ceil(notesCount / 7) : 0}
            </div>
            <div className="text-sm text-gray-600">Notes per Week</div>
          </div>
        </div>
        <p className="text-gray-600 mt-4 text-sm">
          {notesCount === 0
            ? "Start organizing your thoughts and ideas today!"
            : "Keep up the great work organizing your thoughts!"}
        </p>
      </div>
    </div>
  );
}
