interface SecurityTip {
  icon: string;
  title: string;
  description: string;
}

const securityTips: SecurityTip[] = [
  {
    icon: "🔐",
    title: "Strong Password",
    description: "Use a unique password with at least 8 characters, including uppercase, lowercase, numbers, and symbols."
  },
  {
    icon: "📧",
    title: "Secure Email",
    description: "Use a personal email address that only you can access. Avoid shared family email accounts."
  },
  {
    icon: "🔒",
    title: "Two-Factor Authentication",
    description: "Enable two-factor authentication if available to add an extra layer of security to your account."
  },
  {
    icon: "❓",
    title: "Challenge Questions",
    description: "Choose challenge questions with answers that are memorable to you but not easily guessable by others."
  },
  {
    icon: "🚫",
    title: "Never Share Credentials",
    description: "Never share your FSA ID username or password with anyone, including family members or financial aid staff."
  },
  {
    icon: "🔄",
    title: "Regular Updates",
    description: "Update your password regularly and keep your contact information current in your account settings."
  }
];

export function SecurityTab() {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-brand-blue dark:text-blue-400 mb-4">🔒 FSA ID Security Best Practices</h2>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Protect your FSA ID with these essential security practices.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {securityTips.map((tip, idx) => (
            <div
              key={idx}
              className="p-5 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-brand-blue transition-all
                       hover:shadow-lg hover:-translate-y-1 duration-200"
            >
              <div className="text-4xl mb-3">{tip.icon}</div>
              <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-gray-100">{tip.title}</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{tip.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Security Information */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-brand-blue dark:text-blue-400 mb-4">🛡️ Why Security Matters</h2>
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <p>
            Your FSA ID is your legal signature for federal student aid. It provides access to your personal
            information and allows you to sign legally binding documents electronically.
          </p>
          <p>
            If someone gains unauthorized access to your FSA ID, they could:
          </p>
          <ul className="list-disc ml-6 space-y-2">
            <li>View your personal and financial information</li>
            <li>Make changes to your FAFSA application</li>
            <li>Accept or decline financial aid on your behalf</li>
            <li>Sign loan documents in your name</li>
          </ul>
          <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-brand-amber p-4 rounded-r-lg mt-4">
            <p className="font-semibold text-amber-700 dark:text-amber-400 mb-2">⚠️ Important Reminder</p>
            <p className="text-sm text-gray-900 dark:text-gray-100">
              Federal Student Aid will never contact you asking for your FSA ID password. If someone
              requests this information, it's likely a scam. Report suspicious activity immediately.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
