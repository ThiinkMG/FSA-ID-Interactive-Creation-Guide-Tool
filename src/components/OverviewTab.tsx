import { useState } from 'react';
import { PlayCircle, ChevronDown, Maximize2, Minimize2, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function OverviewTab() {
  const [isVideoExpanded, setIsVideoExpanded] = useState(true); // Start expanded
  const [isVideoFullSize, setIsVideoFullSize] = useState(false);

  const videoUrl = "https://www.youtube.com/embed/CqdXRmpOAkU";
  const videoDirectLink = "https://www.youtube.com/watch?v=CqdXRmpOAkU";

  return (
    <div className="space-y-6">
      {/* Video Tutorial Section - Collapsible */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 border-2 border-blue-200 dark:border-blue-700 rounded-xl overflow-hidden shadow-2xl">
        {/* Video Header - Always Visible */}
        <button
          onClick={() => setIsVideoExpanded(!isVideoExpanded)}
          className="w-full p-6 flex items-center justify-between hover:bg-blue-50/80 dark:hover:bg-gray-800/80 transition-all duration-200 group"
          aria-expanded={isVideoExpanded}
          aria-controls="video-player-section"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-full group-hover:bg-blue-200 dark:group-hover:bg-blue-900 transition-colors">
              <PlayCircle className="w-8 h-8 text-brand-blue dark:text-blue-400 flex-shrink-0" />
            </div>
            <div className="text-left">
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-blue dark:text-blue-400">
                📺 Step-by-Step Video Tutorial
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 font-medium">
                {isVideoExpanded ? "Click to collapse video" : "Click to watch the complete FSA ID creation guide"}
              </p>
            </div>
          </div>
          <motion.div
            animate={{ rotate: isVideoExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="flex-shrink-0"
          >
            <ChevronDown className="w-7 h-7 text-brand-blue dark:text-blue-400" />
          </motion.div>
        </button>

        {/* Collapsible Video Content */}
        <AnimatePresence>
          {isVideoExpanded && (
            <motion.div
              id="video-player-section"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-8 pt-2">
                {/* Description */}
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-brand-blue dark:border-blue-500 rounded-r-lg p-4 mb-6">
                  <p className="text-gray-800 dark:text-gray-100 text-sm leading-relaxed">
                    🎬 Watch this <strong className="text-brand-blue dark:text-blue-400">comprehensive tutorial</strong> to learn how to create your FSA ID step-by-step.
                    This video covers everything you need to know!
                  </p>
                </div>

                {/* Video Size Controls */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Video Size:</span>
                  <button
                    onClick={() => setIsVideoFullSize(false)}
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                      !isVideoFullSize
                        ? "bg-brand-blue dark:bg-blue-600 text-white shadow-md scale-105"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 hover:shadow"
                    }`}
                  >
                    <Minimize2 className="w-4 h-4" />
                    Compact View
                  </button>
                  <button
                    onClick={() => setIsVideoFullSize(true)}
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                      isVideoFullSize
                        ? "bg-brand-blue dark:bg-blue-600 text-white shadow-md scale-105"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 hover:shadow"
                    }`}
                  >
                    <Maximize2 className="w-4 h-4" />
                    Full Screen
                  </button>
                </div>

                {/* Video Player */}
                <div className={`relative ${isVideoFullSize ? 'w-full aspect-video' : 'w-full h-[350px] sm:h-[450px] md:h-[550px]'} rounded-xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-900 to-gray-800 border-4 border-gray-200 dark:border-gray-700`}>
                  <iframe
                    src={videoUrl}
                    title="FSA ID Creation Tutorial"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                {/* Watch on YouTube Link */}
                <div className="mt-4 flex justify-center">
                  <a
                    href={videoDirectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm text-brand-blue dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Watch on YouTube
                  </a>
                </div>

                {/* Tip */}
                <div className="mt-4 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 rounded-lg p-3">
                  <p className="text-sm text-gray-700 dark:text-gray-300 text-center">
                    <span className="text-yellow-600 dark:text-yellow-400 font-bold">💡 Pro Tip:</span> Watch this video before starting your FSA ID creation for the smoothest experience!
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* What is FSA ID */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:border-brand-blue/30">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-brand-blue dark:text-blue-400">
          🎯 What is an FSA ID?
        </h2>
        <p className="mb-4 text-gray-900 dark:text-gray-100">
          An FSA ID is a username and password that gives you access to Federal Student Aid's online systems.
          It's your digital signature for federal student aid and is required to:
        </p>
        <ul className="space-y-2 ml-6 list-disc text-gray-700 dark:text-gray-300">
          <li>Complete the FAFSA form</li>
          <li>Sign your Master Promissory Note (MPN)</li>
          <li>Access your federal student aid information</li>
          <li>Complete entrance counseling</li>
          <li>Apply for federal student loans</li>
        </ul>
      </div>

      {/* Who Needs FSA ID */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:border-brand-blue/30">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-brand-blue dark:text-blue-400">
          👥 Who Needs an FSA ID?
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:border-brand-blue/50">
            <h3 className="text-lg font-semibold mb-2 text-brand-blue dark:text-blue-400">Students</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              All students applying for federal financial aid must have their own FSA ID.
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:border-brand-blue/50">
            <h3 className="text-lg font-semibold mb-2 text-brand-blue dark:text-blue-400">Parents</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Parents of dependent students need their own FSA ID to sign the FAFSA.
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:border-brand-blue/50">
            <h3 className="text-lg font-semibold mb-2 text-brand-blue dark:text-blue-400">Spouses</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Married students may need their spouse's FSA ID for certain applications.
            </p>
          </div>
        </div>
      </div>

      {/* Common Errors */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:border-red-300 dark:hover:border-red-700">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-brand-blue dark:text-blue-400">
          ⚠️ Common FSA ID Creation Errors
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border-l-4 border-red-600 dark:border-red-500 transition-all duration-300 hover:shadow-md hover:bg-red-100 dark:hover:bg-red-900/30">
            <h4 className="font-semibold text-red-700 dark:text-red-300 mb-2">❌ Using Nicknames</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Use your legal name exactly as it appears on your Social Security card.
            </p>
          </div>
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border-l-4 border-red-600 dark:border-red-500 transition-all duration-300 hover:shadow-md hover:bg-red-100 dark:hover:bg-red-900/30">
            <h4 className="font-semibold text-red-700 dark:text-red-300 mb-2">❌ Wrong SSN Format</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Enter SSN without dashes or spaces (123456789, not 123-45-6789).
            </p>
          </div>
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border-l-4 border-red-600 dark:border-red-500 transition-all duration-300 hover:shadow-md hover:bg-red-100 dark:hover:bg-red-900/30">
            <h4 className="font-semibold text-red-700 dark:text-red-300 mb-2">❌ Weak Passwords</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Use a strong password with at least 8 characters, including numbers and symbols.
            </p>
          </div>
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border-l-4 border-red-600 dark:border-red-500 transition-all duration-300 hover:shadow-md hover:bg-red-100 dark:hover:bg-red-900/30">
            <h4 className="font-semibold text-red-700 dark:text-red-300 mb-2">❌ Duplicate Email</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Each FSA ID must have a unique email address.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
