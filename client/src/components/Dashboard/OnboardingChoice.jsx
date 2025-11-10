import { motion } from 'framer-motion';
import { useState } from 'react';

export default function OnboardingChoice({ onStartFresh, onUploadResume }) {
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploading(true);
      // Pass the file to parent component
      onUploadResume(file);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-bold text-gray-900 mb-4">How would you like to start?</h1>
        <p className="text-xl text-gray-600">Choose the option that works best for you</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl w-full">
        {/* Start Fresh Option */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onClick={onStartFresh}
          className="group cursor-pointer"
        >
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-10 hover:border-gray-900 hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gray-900 transition-colors duration-300">
              <svg className="w-8 h-8 text-gray-900 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Start Fresh</h3>
            <p className="text-gray-600 mb-6 leading-relaxed flex-1">
              Build your profile from scratch. Add your experience, education, skills, and achievements step by step.
            </p>
            
            <div className="flex items-center text-gray-900 font-semibold group-hover:gap-3 gap-2 transition-all">
              <span>Get started</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Upload Resume Option */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="group cursor-pointer"
        >
          <label htmlFor="resume-upload" className="block h-full">
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-10 hover:border-gray-900 hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gray-900 transition-colors duration-300">
                {uploading ? (
                  <div className="w-6 h-6 border-2 border-gray-400 border-t-gray-900 rounded-full animate-spin"></div>
                ) : (
                  <svg className="w-8 h-8 text-gray-900 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                )}
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Upload Resume</h3>
              <p className="text-gray-600 mb-6 leading-relaxed flex-1">
                Already have a resume? Upload your PDF and we'll parse it automatically to create your profile.
              </p>
              
              <div className="flex items-center text-gray-900 font-semibold group-hover:gap-3 gap-2 transition-all">
                <span>{uploading ? 'Uploading...' : 'Upload PDF'}</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </label>
          <input
            id="resume-upload"
            type="file"
            accept=".pdf"
            onChange={handleFileUpload}
            className="hidden"
          />
        </motion.div>
      </div>

      {/* Helper Text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-12 text-sm text-gray-500 text-center"
      >
        Don't worry, you can always edit and update your information later
      </motion.p>
    </div>
  );
}
