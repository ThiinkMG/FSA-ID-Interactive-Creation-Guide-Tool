import { useState } from "react";
import { RotateCcw } from "lucide-react";

interface FlowchartStep {
  id: string;
  title: string;
  description: string;
  type: "decision" | "solution";
  options?: { text: string; next: string }[];
  solutions?: string[];
}

const flowchartData: Record<string, FlowchartStep> = {
  start: {
    id: "start",
    title: "FSA ID Problem",
    description: "What issue are you experiencing with your FSA ID?",
    type: "decision",
    options: [
      { text: "Cannot create account", next: "creation-issues" },
      { text: "Cannot log in", next: "login-issues" },
      { text: "Forgot username/password", next: "recovery-issues" },
      { text: "Account locked", next: "lockout-issues" }
    ]
  },
  "creation-issues": {
    id: "creation-issues",
    title: "Account Creation Issues",
    description: "Common problems when creating an FSA ID:",
    type: "solution",
    solutions: [
      "Ensure your name matches your Social Security card exactly",
      "Use a unique email address (not already used for another FSA ID)",
      "Enter SSN without dashes or spaces (123456789)",
      "Choose a strong password with at least 8 characters",
      "Wait 24 hours if you recently created an account"
    ]
  },
  "login-issues": {
    id: "login-issues",
    title: "Login Problems",
    description: "Troubleshooting login issues:",
    type: "solution",
    solutions: [
      "Check that Caps Lock is off",
      "Clear your browser cache and cookies",
      "Try a different browser or incognito mode",
      "Ensure you're using the correct username (not email)",
      "Wait 15 minutes if you've made multiple failed attempts"
    ]
  },
  "recovery-issues": {
    id: "recovery-issues",
    title: "Account Recovery",
    description: "To recover your FSA ID:",
    type: "solution",
    solutions: [
      'Use the "Forgot Username" link on the login page',
      'Use the "Forgot Password" link if you know your username',
      "Answer your challenge questions correctly",
      "Check your email for recovery instructions",
      "Contact Federal Student Aid if challenge questions don't work"
    ]
  },
  "lockout-issues": {
    id: "lockout-issues",
    title: "Account Locked",
    description: "If your account is locked:",
    type: "solution",
    solutions: [
      "Wait 15 minutes before trying again",
      "Use the account recovery process",
      "Contact Federal Student Aid support",
      "Verify your identity with required documents",
      "Consider creating a new FSA ID if recovery fails"
    ]
  }
};

export function TroubleshootingTab() {
  const [currentStep, setCurrentStep] = useState("start");

  const step = flowchartData[currentStep];

  return (
    <div className="space-y-6">
      {/* Flowchart */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-brand-blue dark:text-blue-400 mb-4">🔧 FSA ID Troubleshooting Flowchart</h2>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Having trouble with your FSA ID? Use this interactive flowchart to find solutions to common problems.
        </p>

        <div
          className={`p-6 rounded-lg border-2 ${
            step.type === "decision"
              ? "bg-brand-amber/10 border-brand-amber"
              : "bg-brand-green/10 border-brand-green"
          }`}
        >
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">{step.title}</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">{step.description}</p>

          {step.options && (
            <div className="flex flex-wrap gap-3">
              {step.options.map((option) => (
                <button
                  key={option.next}
                  onClick={() => setCurrentStep(option.next)}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium
                           hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2
                           focus:ring-primary focus:ring-offset-2"
                >
                  {option.text}
                </button>
              ))}
            </div>
          )}

          {step.solutions && (
            <>
              <div className="mt-4 space-y-2">
                <h4 className="font-semibold text-brand-green mb-3">💡 Solutions:</h4>
                <ul className="space-y-2">
                  {step.solutions.map((solution, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="text-brand-green font-bold">•</span>
                      <span className="text-sm text-gray-900 dark:text-gray-100">{solution}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => setCurrentStep("start")}
                className="mt-6 flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground
                         rounded-lg font-medium hover:bg-secondary/80 transition-colors focus:outline-none
                         focus:ring-2 focus:ring-secondary focus:ring-offset-2"
              >
                <RotateCcw className="w-4 h-4" />
                Start Over
              </button>
            </>
          )}
        </div>
      </div>

      {/* Resources */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-brand-blue dark:text-blue-400 mb-4">📚 FAFSA Troubleshooting Resources</h2>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Comprehensive guides and articles to help you resolve FAFSA-related issues.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <a
            href="https://studentaid.gov/articles/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-brand-blue transition-colors"
          >
            <strong className="text-brand-blue dark:text-blue-400 block mb-1">🏛️ Federal Student Aid Articles</strong>
            <small className="text-gray-600 dark:text-gray-400">Official troubleshooting guides from the U.S. Department of Education</small>
          </a>

          <a
            href="https://www.edvisors.com/student-loans/fafsa/all-articles/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-brand-blue transition-colors"
          >
            <strong className="text-brand-blue dark:text-blue-400 block mb-1">🔍 Edvisors FAFSA Articles</strong>
            <small className="text-gray-600 dark:text-gray-400">Comprehensive articles on dependency status, eligibility, and tips</small>
          </a>
        </div>

        {/* Help Section */}
        <div className="mt-6 bg-gradient-to-r from-brand-blue/5 to-brand-green/5 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-brand-blue dark:text-blue-400 mb-4">🆘 Still Need Help?</h3>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="text-center">
              <div className="text-3xl mb-2">📞</div>
              <strong className="block mb-1 text-gray-900 dark:text-gray-100">Federal Student Aid</strong>
              <small className="text-gray-600 dark:text-gray-400">1-800-4-FED-AID</small>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">💬</div>
              <strong className="block mb-1 text-gray-900 dark:text-gray-100">Live Chat Support</strong>
              <small className="text-gray-600 dark:text-gray-400">Available on studentaid.gov</small>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🏫</div>
              <strong className="block mb-1 text-gray-900 dark:text-gray-100">Financial Aid Office</strong>
              <small className="text-gray-600 dark:text-gray-400">Contact your school</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
