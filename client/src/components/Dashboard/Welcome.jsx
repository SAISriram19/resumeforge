import { motion } from 'framer-motion';

export default function Welcome({ onGetStarted }) {
  return (
    <div className="relative overflow-hidden bg-[#f5f1e8] min-h-[85vh]">
      {/* Subtle dotted background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, #d4c5a9 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative flex flex-col items-center justify-center px-6 py-20 min-h-[85vh]">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-5xl mx-auto mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight text-[#2d2a26]">
            Welcome to
            <br />
            <span className="text-[#2d2a26]">
              your resume workspace
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-[#6b5d4f] mb-12 leading-relaxed max-w-3xl mx-auto">
            Build your profile once, then let AI tailor it to any job description. Export professional resumes in seconds.
          </p>

          {/* Tab-style badges */}
          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            <div className="px-5 py-2.5 bg-[#e8dcc4] backdrop-blur-sm border border-[#d4c5a9] rounded-xl">
              <span className="text-[#6b5d4f] font-medium flex items-center gap-2">
                <span className="w-2 h-2 bg-[#a89270] rounded-full"></span>
                profile builder
              </span>
            </div>
            <div className="px-5 py-2.5 bg-[#d4c5a9]/50 backdrop-blur-sm border border-[#c9b89a] rounded-xl">
              <span className="text-[#6b5d4f] font-medium flex items-center gap-2">
                <span className="w-2 h-2 bg-[#8b7355] rounded-full"></span>
                AI tailoring
              </span>
            </div>
            <div className="px-5 py-2.5 bg-[#c9b89a]/50 backdrop-blur-sm border border-[#b8a587] rounded-xl">
              <span className="text-[#6b5d4f] font-medium flex items-center gap-2">
                <span className="w-2 h-2 bg-[#9d8564] rounded-full"></span>
                PDF export
              </span>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onGetStarted}
            className="px-10 py-4 bg-[#2d2a26] text-[#f5f1e8] rounded-2xl font-bold text-lg hover:bg-[#3d3933] transition-colors inline-flex items-center gap-3 shadow-2xl"
          >
            Get Started
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </motion.button>
        </motion.div>

        {/* Resume Preview Cards with Integrity style */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="relative w-full max-w-5xl mx-auto mb-24 h-[400px] flex items-center justify-center"
        >
          {/* Left Card - Profile */}
          <div className="absolute left-0 lg:left-10 w-64 h-80 bg-[#e8dcc4]/80 backdrop-blur-md border border-[#d4c5a9] rounded-3xl p-6 transform -rotate-6 shadow-xl">
            <div className="space-y-3">
              <div className="w-16 h-16 bg-[#c9b89a]/50 rounded-full"></div>
              <div className="h-3 bg-[#a89270]/30 rounded w-2/3"></div>
              <div className="h-2 bg-[#a89270]/20 rounded w-1/2"></div>
              <div className="mt-6 space-y-2">
                <div className="h-2 bg-[#a89270]/20 rounded"></div>
                <div className="h-2 bg-[#a89270]/20 rounded w-5/6"></div>
                <div className="h-2 bg-[#a89270]/20 rounded w-4/5"></div>
              </div>
            </div>
          </div>

          {/* Center Card - AI Processing */}
          <div className="relative z-20 w-72 h-96 bg-[#d4c5a9]/80 backdrop-blur-md border border-[#c9b89a] rounded-3xl p-8 shadow-2xl">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-[#8b7355] rounded-full animate-pulse"></div>
                <span className="text-sm text-[#6b5d4f]">AI Tailoring</span>
              </div>
              <div className="h-4 bg-[#a89270]/30 rounded w-3/4"></div>
              <div className="mt-6 space-y-3">
                <div className="h-2 bg-[#a89270]/20 rounded"></div>
                <div className="h-2 bg-[#a89270]/20 rounded w-11/12"></div>
                <div className="h-2 bg-[#a89270]/20 rounded w-5/6"></div>
              </div>
              <div className="mt-6 space-y-3">
                <div className="h-2 bg-[#a89270]/20 rounded w-4/5"></div>
                <div className="h-2 bg-[#a89270]/20 rounded"></div>
                <div className="h-2 bg-[#a89270]/20 rounded w-11/12"></div>
              </div>
            </div>
          </div>

          {/* Right Card - Export */}
          <div className="absolute right-0 lg:right-10 w-64 h-80 bg-[#e8dcc4]/80 backdrop-blur-md border border-[#d4c5a9] rounded-3xl p-6 transform rotate-6 shadow-xl">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="h-3 bg-[#a89270]/30 rounded w-1/2"></div>
                <div className="px-2 py-1 bg-[#c9b89a] rounded text-xs text-[#6b5d4f]">PDF</div>
              </div>
              <div className="h-2 bg-[#a89270]/20 rounded w-2/3"></div>
              <div className="mt-6 space-y-2">
                <div className="h-2 bg-[#a89270]/20 rounded"></div>
                <div className="h-2 bg-[#a89270]/20 rounded w-5/6"></div>
                <div className="h-2 bg-[#a89270]/20 rounded w-4/5"></div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          <FeatureCard
            title="Build Your Profile"
            description="Add your work experience, education, skills, and achievements in one comprehensive profile."
          />
          <FeatureCard
            title="AI Tailoring"
            description="Upload a job description and let AI create a perfectly tailored resume instantly."
          />
          <FeatureCard
            title="Export & Share"
            description="Download your resume as a professional PDF ready to send to employers."
          />
        </motion.div>
      </div>
    </div>
  );
}

function FeatureCard({ title, description }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="p-8 bg-[#e8dcc4]/50 backdrop-blur-sm border border-[#d4c5a9] rounded-3xl text-left"
    >
      <h3 className="text-2xl font-bold mb-3 text-[#2d2a26]">{title}</h3>
      <p className="text-[#6b5d4f] leading-relaxed">{description}</p>
    </motion.div>
  );
}
