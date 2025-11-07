import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { CheckCircle2, PartyPopper } from "lucide-react";
import { staggerContainer, staggerItem, scaleIn } from "../lib/animations";

interface ChecklistItem {
  id: number;
  title: string;
  description: string;
}

const checklistData: ChecklistItem[] = [
  {
    id: 1,
    title: "Gather Required Information",
    description: "Collect your Social Security Number, full legal name, date of birth, and a valid email address."
  },
  {
    id: 2,
    title: "Choose a Strong Username",
    description: "Select a username that's easy to remember but unique. It will be your login for all federal student aid systems."
  },
  {
    id: 3,
    title: "Create a Secure Password",
    description: "Use at least 8 characters with a mix of letters, numbers, and symbols. Avoid personal information."
  },
  {
    id: 4,
    title: "Verify Email Address",
    description: "Use an email address you check regularly. You'll receive important notifications here."
  },
  {
    id: 5,
    title: "Set Up Challenge Questions",
    description: "Choose questions and answers that only you would know. These help recover your account if needed."
  },
  {
    id: 6,
    title: "Review Personal Information",
    description: "Double-check that your name matches your Social Security card exactly."
  },
  {
    id: 7,
    title: "Submit and Verify",
    description: "Submit your application and check your email for verification instructions."
  },
  {
    id: 8,
    title: "Test Your FSA ID",
    description: "Log in to fafsa.gov to ensure everything works correctly before using it for applications."
  }
];

export function ChecklistTab() {
  const [completed, setCompleted] = useState<number[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("mcf-fsa-checklist");
    if (saved) {
      setCompleted(JSON.parse(saved));
    }
  }, []);

  const toggleItem = (id: number) => {
    const isChecking = !completed.includes(id);
    const newCompleted = completed.includes(id)
      ? completed.filter(i => i !== id)
      : [...completed, id];

    setCompleted(newCompleted);
    localStorage.setItem("mcf-fsa-checklist", JSON.stringify(newCompleted));

    // Show toast for completed items
    if (isChecking) {
      const item = checklistData.find(i => i.id === id);
      toast.success(`Completed: ${item?.title}`, {
        icon: <CheckCircle2 className="w-4 h-4 text-brand-green" />
      });

      // Celebration for completing all items
      if (newCompleted.length === checklistData.length) {
        setTimeout(() => {
          toast.success("🎉 Congratulations! You've completed all steps!", {
            duration: 5000,
            description: "You're ready to create your FSA ID with confidence!"
          });
        }, 300);
      }
    }
  };

  const progress = Math.round((completed.length / checklistData.length) * 100);

  return (
    <div className="space-y-6">
      <motion.div
        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6"
        variants={scaleIn}
        initial="initial"
        animate="animate"
      >
        <h2 className="text-2xl font-bold text-brand-blue dark:text-brand-blue mb-4 flex items-center gap-2">
          <CheckCircle2 className="w-7 h-7" />
          FSA ID Creation Checklist
        </h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          Follow this step-by-step checklist to create your FSA ID successfully. Check off each item as you complete it.
        </p>

        {/* Progress Bar with Animation */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-gray-900 dark:text-gray-100">Progress</span>
            <motion.span
              className="text-gray-600 dark:text-gray-400"
              key={completed.length}
              initial={{ scale: 1.2, color: "#26e011" }}
              animate={{ scale: 1, color: undefined }}
              transition={{ duration: 0.3 }}
            >
              {completed.length} of {checklistData.length} completed
            </motion.span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
            <motion.div
              className="bg-brand-green h-3 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
          {progress === 100 && (
            <motion.div
              className="mt-3 p-3 bg-brand-green/10 border border-brand-green rounded-lg flex items-center gap-2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <PartyPopper className="w-5 h-5 text-brand-green" />
              <span className="text-sm font-semibold text-brand-green">
                All steps completed! You're ready to create your FSA ID!
              </span>
            </motion.div>
          )}
        </motion.div>

        {/* Checklist Items with Stagger Animation */}
        <motion.ul
          className="space-y-3"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {checklistData.map((item) => (
            <motion.li
              key={item.id}
              variants={staggerItem}
              className={`flex items-start gap-4 p-4 rounded-lg border transition-all duration-200 ${
                completed.includes(item.id)
                  ? "bg-green-50 dark:bg-green-900/20 border-brand-green"
                  : "bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:border-brand-blue hover:shadow-md"
              }`}
              whileHover={{ scale: 1.01, x: 4 }}
            >
              {/* Increased touch target: 44x44px minimum for WCAG compliance */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => toggleItem(item.id)}
                aria-label={`Mark "${item.title}" as ${completed.includes(item.id) ? 'incomplete' : 'complete'}`}
                className="flex items-center justify-center min-w-[44px] min-h-[44px] cursor-pointer
                           focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2
                           rounded transition-all"
              >
                <span className={`text-xl font-bold select-none ${
                  completed.includes(item.id) ? "text-brand-green" : "text-gray-400 dark:text-gray-500"
                }`}>
                  {completed.includes(item.id) ? "[✓]" : "[ ]"}
                </span>
              </motion.button>
              <div className="flex-1">
                <div className={`font-semibold mb-1 transition-all ${
                  completed.includes(item.id) ? "text-brand-green" : "text-gray-900 dark:text-gray-100"
                }`}>
                  {item.title}
                  {completed.includes(item.id) && (
                    <motion.span
                      className="ml-2 text-brand-green"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 15 }}
                    >
                      ✓
                    </motion.span>
                  )}
                </div>
                <div className="text-sm text-gray-700 dark:text-gray-300">{item.description}</div>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </div>
  );
}
