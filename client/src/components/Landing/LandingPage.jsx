import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f5f1e8] relative overflow-hidden">
      {/* Subtle dotted background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, #d4c5a9 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Header */}
      <header className="relative z-50 border-b border-[#d4c5a9]/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => window.location.href = '/'}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <img src="/img.png" alt="ResumeForge" className="w-10 h-10 object-contain" />
              <div className="text-2xl font-bold text-[#2d2a26]">ResumeForge</div>
              <span className="px-2 py-0.5 text-xs bg-[#d4c5a9]/30 text-[#6b5d4f] rounded-md">beta</span>
            </motion.button>

            <nav className="flex items-center gap-6">
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-3 text-sm"
              >
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#e8dcc4] text-[#6b5d4f] rounded-lg border border-[#d4c5a9]">
                  <span className="w-2 h-2 bg-[#a89270] rounded-full"></span>
                  cross-format
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#d4c5a9]/30 text-[#6b5d4f] rounded-lg border border-[#d4c5a9]">
                  <span className="w-2 h-2 bg-[#8b7355] rounded-full"></span>
                  organisation
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#c9b89a]/30 text-[#6b5d4f] rounded-lg border border-[#d4c5a9]">
                  <span className="w-2 h-2 bg-[#9d8564] rounded-full"></span>
                  ai-chat
                </span>
              </motion.span>
              
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                onClick={() => navigate('/login')}
                className="px-6 py-2 bg-[#2d2a26] text-[#f5f1e8] rounded-xl font-medium hover:bg-[#3d3933] transition-colors"
              >
                try it now
              </motion.button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight text-[#2d2a26]">
            ResumeForge
            <br />
            <span className="text-[#2d2a26]">
              brings profile, AI tailoring
              <br />
              and export into one
              <br />
              connected workspace
            </span>
          </h1>

          {/* Visual arrow */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex justify-center mb-12"
          >
            <svg width="60" height="60" viewBox="0 0 60 60" className="text-white/40">
              <path d="M30 10 L30 45 M30 45 L20 35 M30 45 L40 35" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    fill="none" 
                    strokeLinecap="round"/>
            </svg>
          </motion.div>

          {/* Tab-style navigation */}
          <div className="flex justify-center gap-4 mb-16 flex-wrap">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="px-6 py-3 bg-[#e8dcc4] backdrop-blur-sm border border-[#d4c5a9] rounded-2xl"
            >
              <span className="text-[#6b5d4f] font-medium">notes</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="px-6 py-3 bg-[#d4c5a9]/50 backdrop-blur-sm border border-[#c9b89a] rounded-2xl"
            >
              <span className="text-[#6b5d4f] font-medium">canvases</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="px-6 py-3 bg-[#c9b89a]/50 backdrop-blur-sm border border-[#b8a587] rounded-2xl"
            >
              <span className="text-[#6b5d4f] font-medium">ai-chats</span>
            </motion.div>
          </div>

          {/* Visual representation - Resume preview cards */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="relative h-[400px] flex items-center justify-center mb-20"
          >
            {/* Left card - Profile */}
            <div className="absolute left-0 lg:left-20 w-72 h-80 bg-[#e8dcc4]/80 backdrop-blur-md border border-[#d4c5a9] rounded-3xl p-8 transform -rotate-6 shadow-xl">
              <div className="space-y-4">
                <div className="w-20 h-20 bg-[#c9b89a]/50 rounded-full"></div>
                <div className="h-3 bg-[#a89270]/30 rounded w-3/4"></div>
                <div className="h-2 bg-[#a89270]/20 rounded w-1/2"></div>
                <div className="mt-6 space-y-2">
                  <div className="h-2 bg-[#a89270]/20 rounded"></div>
                  <div className="h-2 bg-[#a89270]/20 rounded w-5/6"></div>
                  <div className="h-2 bg-[#a89270]/20 rounded w-4/5"></div>
                </div>
              </div>
            </div>

            {/* Center card - AI Processing */}
            <div className="relative z-20 w-80 h-96 bg-[#d4c5a9]/80 backdrop-blur-md border border-[#c9b89a] rounded-3xl p-8 shadow-2xl">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#8b7355] rounded-full animate-pulse"></div>
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

            {/* Right card - Export */}
            <div className="absolute right-0 lg:right-20 w-72 h-80 bg-[#e8dcc4]/80 backdrop-blur-md border border-[#d4c5a9] rounded-3xl p-8 transform rotate-6 shadow-xl">
              <div className="space-y-4">
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

          {/* Illustration/Mascot area */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mb-12"
          >
            <div className="inline-flex flex-col items-center gap-4 p-8 bg-[#e8dcc4]/50 backdrop-blur-sm border border-[#d4c5a9] rounded-3xl">
              <div className="w-32 h-32 bg-[#d4c5a9]/50 rounded-2xl flex items-center justify-center">
                <svg width="64" height="64" viewBox="0 0 64 64" className="text-[#6b5d4f]">
                  <path d="M32 8 L48 20 L48 44 L32 56 L16 44 L16 20 Z" 
                        fill="currentColor" 
                        opacity="0.3"/>
                  <circle cx="32" cy="28" r="6" fill="currentColor"/>
                  <path d="M24 40 Q32 36 40 40" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        fill="none" 
                        strokeLinecap="round"/>
                </svg>
              </div>
              <p className="text-lg text-[#6b5d4f] max-w-md text-center">
                create tailored resumes,<br />
                match job descriptions,<br />
                and export faster
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 text-[#2d2a26]">
              Three <span className="font-bold">powerful</span> steps
              <br />
              One resume <span className="font-bold">brain</span>
              <br />
              Zero friction
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <FeatureCard
              title="Build Your Profile"
              description="One comprehensive profile with all your experience, skills, and achievements"
            />
            <FeatureCard
              title="AI Tailoring"
              description="Paste any job description and watch AI perfectly match your profile to it"
            />
            <FeatureCard
              title="Export & Share"
              description="Download professional PDF resumes ready to send to employers"
            />
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/signup')}
              className="px-10 py-5 bg-[#2d2a26] text-[#f5f1e8] rounded-2xl font-bold text-xl hover:bg-[#3d3933] transition-colors shadow-2xl"
            >
              Try it now
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#d4c5a9]/30 mt-32 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center text-[#6b5d4f]/60 text-sm">
          <p>ResumeForge © 2025 - Build better resumes with AI</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ title, description }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="p-8 bg-[#e8dcc4]/50 backdrop-blur-sm border border-[#d4c5a9] rounded-3xl"
    >
      <h3 className="text-2xl font-bold mb-3 text-[#2d2a26]">{title}</h3>
      <p className="text-[#6b5d4f] leading-relaxed">{description}</p>
    </motion.div>
  );
}
