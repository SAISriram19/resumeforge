import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import { getSkillSuggestions } from '../../utils/skillsDatabase';

const API_URL = 'http://localhost:3001/api';

export default function StepByStep({ onComplete }) {
  const { currentUser } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [profileId, setProfileId] = useState(null);
  const [formData, setFormData] = useState({
    summary: '',
    skills: [],
    education: [],
    experiences: []
  });
  const [tempSkill, setTempSkill] = useState('');
  const [saving, setSaving] = useState(false);

  const handleNext = async () => {
    if (currentStep === 1 && formData.summary.trim()) {
      try {
        setSaving(true);
        const response = await axios.post(`${API_URL}/profile/create`, {
          userId: currentUser.uid,
          summary: formData.summary
        });
        if (response.data.success) {
          setProfileId(response.data.profile.id);
        }
        setSaving(false);
        setCurrentStep(2);
      } catch (error) {
        console.error('Error saving summary:', error);
        setSaving(false);
      }
    } else if (currentStep === 2) {
      if (formData.skills.length > 0 && profileId) {
        try {
          setSaving(true);
          await Promise.all(
            formData.skills.map(skill =>
              axios.post(`${API_URL}/profile/skills/add`, {
                profileId,
                skillName: skill
              })
            )
          );
          setSaving(false);
        } catch (error) {
          console.error('Error saving skills:', error);
          setSaving(false);
        }
      }
      setCurrentStep(3);
    } else if (currentStep === 3) {
      setCurrentStep(4);
    } else if (currentStep === 4) {
      onComplete();
    }
  };

  const handleSkip = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const addSkill = () => {
    if (tempSkill.trim()) {
      setFormData({
        ...formData,
        skills: [...formData.skills, tempSkill.trim()]
      });
      setTempSkill('');
    }
  };

  const removeSkill = (index) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-6 py-12 relative overflow-hidden bg-gradient-to-br from-amber-50 via-teal-50 to-purple-50">
      {/* Animated Background Sketches */}
      <BackgroundSketch delay={0} position="top-10 left-10" />
      <BackgroundSketch delay={2} position="top-20 right-20" />
      <BackgroundSketch delay={4} position="bottom-20 left-20" />
      <BackgroundSketch delay={1} position="bottom-10 right-10" />

      <div className="max-w-2xl w-full relative z-10">
        {/* Progress Indicator with Character */}
        <div className="mb-12">
          <div className="flex flex-col items-center">
            {/* Animated Character - Head and Shoulders */}
            <div className="mb-6">
              <svg width="100" height="80" viewBox="0 0 100 80" fill="none" className="relative">
                {/* Shoulders */}
                <path
                  d="M 20 70 Q 50 75 80 70"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  className="text-gray-900"
                />
                
                {/* Neck */}
                <line x1="50" y1="52" x2="50" y2="65" stroke="currentColor" strokeWidth="2" className="text-gray-900" />
                
                {/* Head */}
                <circle
                  cx="50"
                  cy="30"
                  r="22"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="white"
                  className="text-gray-900"
                />
                
                {/* Eyes - animated to look at steps */}
                <motion.g
                  animate={{
                    x: (currentStep - 2.5) * 3,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <circle cx="42" cy="28" r="2.5" fill="currentColor" className="text-gray-900" />
                  <circle cx="58" cy="28" r="2.5" fill="currentColor" className="text-gray-900" />
                </motion.g>
                
                {/* Glasses */}
                <g className="text-gray-900">
                  <circle cx="42" cy="28" r="6" stroke="currentColor" strokeWidth="2" fill="none" />
                  <circle cx="58" cy="28" r="6" stroke="currentColor" strokeWidth="2" fill="none" />
                  <line x1="48" y1="28" x2="52" y2="28" stroke="currentColor" strokeWidth="2" />
                  <line x1="36" y1="28" x2="32" y2="26" stroke="currentColor" strokeWidth="2" />
                  <line x1="64" y1="28" x2="68" y2="26" stroke="currentColor" strokeWidth="2" />
                </g>
                
                {/* Smile */}
                <motion.path
                  d="M 40 38 Q 50 42 60 38"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  className="text-gray-900"
                  animate={{
                    d: currentStep === 4 ? "M 40 38 Q 50 46 60 38" : "M 40 38 Q 50 42 60 38"
                  }}
                />
              </svg>
            </div>

            {/* Progress Dots */}
            <div className="flex items-center gap-6">
              {[1, 2, 3, 4].map((step) => (
                <motion.div
                  key={step}
                  className="relative"
                  initial={false}
                  animate={{
                    scale: currentStep === step ? 1.3 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentStep >= step
                        ? 'bg-gray-900'
                        : 'bg-gray-300'
                    }`}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <Step1
              key="step1"
              summary={formData.summary}
              setSummary={(value) => setFormData({ ...formData, summary: value })}
              onNext={handleNext}
              onSkip={handleSkip}
              saving={saving}
            />
          )}

          {currentStep === 2 && (
            <Step2
              key="step2"
              skills={formData.skills}
              tempSkill={tempSkill}
              setTempSkill={setTempSkill}
              addSkill={addSkill}
              removeSkill={removeSkill}
              onNext={handleNext}
              onSkip={handleSkip}
            />
          )}

          {currentStep === 3 && (
            <Step3
              key="step3"
              profileId={profileId}
              onNext={handleNext}
              onSkip={handleSkip}
              saving={saving}
            />
          )}

          {currentStep === 4 && (
            <Step4
              key="step4"
              profileId={profileId}
              onNext={handleNext}
              onSkip={handleSkip}
              saving={saving}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Step 1: Professional Summary
function Step1({ summary, setSummary, onNext, onSkip, saving }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-3xl p-10 shadow-xl"
    >
      <h2 className="text-4xl font-bold text-gray-900 mb-4">Tell us about yourself</h2>
      <p className="text-lg text-gray-600 mb-8">
        Write a brief professional summary (3-4 sentences about your background and goals)
      </p>

      <textarea
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        placeholder="e.g., Experienced software engineer with 5+ years in full-stack development. Passionate about building scalable web applications and leading high-performing teams. Seeking opportunities to leverage my expertise in React and Node.js..."
        rows={8}
        className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 transition-colors resize-none text-lg"
      />

      <div className="mt-8">
        <button
          onClick={onNext}
          disabled={!summary.trim() || saving}
          className="w-full px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          {saving ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Saving...
            </>
          ) : (
            <>
              Continue
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </>
          )}
        </button>
        <div className="text-center mt-4">
          <button
            onClick={onSkip}
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            Skip for now
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// Step 2: Skills with Autocomplete
function Step2({ skills, tempSkill, setTempSkill, addSkill, removeSkill, onNext, onSkip }) {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  useEffect(() => {
    if (tempSkill.trim().length > 0) {
      const newSuggestions = getSkillSuggestions(tempSkill, 8);
      setSuggestions(newSuggestions);
      setShowSuggestions(newSuggestions.length > 0);
      setSelectedIndex(-1);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [tempSkill]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target) &&
          inputRef.current && !inputRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) {
      if (e.key === 'Enter') {
        e.preventDefault();
        addSkill();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          selectSuggestion(suggestions[selectedIndex]);
        } else {
          addSkill();
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const selectSuggestion = (skill) => {
    setTempSkill(skill);
    setShowSuggestions(false);
    setSelectedIndex(-1);
    setTimeout(() => addSkill(), 100);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-3xl p-10 shadow-xl"
    >
      <h2 className="text-4xl font-bold text-gray-900 mb-4">What are your skills?</h2>
      <p className="text-lg text-gray-600 mb-8">
        Add your technical and professional skills. Start typing to see suggestions!
      </p>

      <div className="mb-6">
        <div className="flex gap-3 mb-4 relative">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={tempSkill}
              onChange={(e) => setTempSkill(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => tempSkill.trim() && suggestions.length > 0 && setShowSuggestions(true)}
              placeholder="e.g., React, Python, Project Management..."
              className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 transition-colors text-lg"
            />
            
            {/* Autocomplete Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <motion.div
                ref={suggestionsRef}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute z-50 w-full mt-2 bg-white border-2 border-gray-200 rounded-2xl shadow-2xl max-h-80 overflow-y-auto"
              >
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    onClick={() => selectSuggestion(suggestion)}
                    className={`px-5 py-3 cursor-pointer transition-colors ${
                      index === selectedIndex
                        ? 'bg-gray-900 text-white'
                        : 'hover:bg-gray-100 text-gray-900'
                    } ${index === 0 ? 'rounded-t-2xl' : ''} ${
                      index === suggestions.length - 1 ? 'rounded-b-2xl' : ''
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-medium">{suggestion}</span>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
          <button
            onClick={addSkill}
            className="px-8 py-4 bg-gray-900 text-white rounded-2xl font-semibold hover:bg-gray-800 transition-colors"
          >
            Add
          </button>
        </div>

        <div className="flex flex-wrap gap-3 min-h-[100px]">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="px-4 py-2 bg-gray-100 rounded-full flex items-center gap-2 text-gray-900 font-medium"
            >
              {skill}
              <button
                onClick={() => removeSkill(index)}
                className="hover:text-red-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={onNext}
          className="w-full px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
        >
          Continue
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
        <div className="text-center mt-4">
          <button
            onClick={onSkip}
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            Skip for now
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// Step 3: Education
function Step3({ profileId, onNext, onSkip, saving }) {
  const [eduData, setEduData] = useState({
    degree: '',
    school: '',
    startDate: '',
    endDate: '',
    gpa: ''
  });

  const handleSaveAndNext = async () => {
    if (eduData.degree.trim() && eduData.school.trim() && profileId) {
      try {
        await axios.post(`${API_URL}/profile/education/add`, {
          profileId,
          degree: eduData.degree,
          school: eduData.school,
          startDate: eduData.startDate,
          endDate: eduData.endDate,
          gpa: eduData.gpa
        });
        onNext();
      } catch (error) {
        console.error('Error saving education:', error);
        onNext();
      }
    } else {
      onNext();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-3xl p-10 shadow-xl"
    >
      <h2 className="text-4xl font-bold text-gray-900 mb-4">Add your education</h2>
      <p className="text-lg text-gray-600 mb-8">
        Tell us about your educational background
      </p>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Degree <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={eduData.degree}
            onChange={(e) => setEduData({ ...eduData, degree: e.target.value })}
            placeholder="e.g., Bachelor of Science in Computer Science"
            className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 transition-colors text-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            School / University <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={eduData.school}
            onChange={(e) => setEduData({ ...eduData, school: e.target.value })}
            placeholder="e.g., Stanford University"
            className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 transition-colors text-lg"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Start Date</label>
            <input
              type="text"
              value={eduData.startDate}
              onChange={(e) => setEduData({ ...eduData, startDate: e.target.value })}
              placeholder="MM/YYYY"
              className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 transition-colors text-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">End Date</label>
            <input
              type="text"
              value={eduData.endDate}
              onChange={(e) => setEduData({ ...eduData, endDate: e.target.value })}
              placeholder="MM/YYYY"
              className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 transition-colors text-lg"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">GPA (Optional)</label>
          <input
            type="text"
            value={eduData.gpa}
            onChange={(e) => setEduData({ ...eduData, gpa: e.target.value })}
            placeholder="e.g., 3.8"
            className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 transition-colors text-lg"
          />
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={handleSaveAndNext}
          disabled={saving}
          className="w-full px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          {saving ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Saving...
            </>
          ) : (
            <>
              Continue
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </>
          )}
        </button>
        <div className="text-center mt-4">
          <button
            onClick={onSkip}
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            Skip for now
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// Step 4: Experience
function Step4({ profileId, onNext, onSkip, saving: parentSaving }) {
  const [expData, setExpData] = useState({
    type: 'job',
    title: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    description: '',
    achievements: '',
    skillsUsed: ''
  });
  const [saving, setSaving] = useState(false);

  const calculateDuration = (start, end) => {
    if (!start || !end) return '';
    const [startMonth, startYear] = start.split('/');
    const [endMonth, endYear] = end.split('/');
    const months = (parseInt(endYear) - parseInt(startYear)) * 12 + (parseInt(endMonth) - parseInt(startMonth));
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    return years > 0 ? `${years}y ${remainingMonths}m` : `${remainingMonths}m`;
  };

  const handleSaveAndNext = async () => {
    if (expData.title.trim() && expData.company.trim() && profileId) {
      try {
        setSaving(true);
        const duration = calculateDuration(expData.startDate, expData.endDate);
        await axios.post(`${API_URL}/profile/experience/add`, {
          profileId,
          type: expData.type,
          title: expData.title,
          company: expData.company,
          location: expData.location,
          startDate: expData.startDate,
          endDate: expData.endDate,
          duration,
          description: expData.description,
          achievements: expData.achievements.split('\n').filter(a => a.trim()),
          skillsUsed: expData.skillsUsed.split(',').map(s => s.trim()).filter(s => s)
        });
        setSaving(false);
        onNext();
      } catch (error) {
        console.error('Error saving experience:', error);
        setSaving(false);
        onNext();
      }
    } else {
      onNext();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-3xl p-10 shadow-xl max-h-[85vh] overflow-y-auto"
    >
      <h2 className="text-4xl font-bold text-gray-900 mb-4">Add your experience</h2>
      <p className="text-lg text-gray-600 mb-8">
        Tell us about your work experience, internships, or projects
      </p>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Type</label>
          <select
            value={expData.type}
            onChange={(e) => setExpData({ ...expData, type: e.target.value })}
            className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:border-gray-900 transition-colors text-lg"
          >
            <option value="job">Job</option>
            <option value="internship">Internship</option>
            <option value="volunteer">Volunteer</option>
            <option value="hackathon">Hackathon</option>
            <option value="project">Project</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Title / Role <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={expData.title}
            onChange={(e) => setExpData({ ...expData, title: e.target.value })}
            placeholder="e.g., Software Engineer"
            className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 transition-colors text-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Company / Organization <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={expData.company}
            onChange={(e) => setExpData({ ...expData, company: e.target.value })}
            placeholder="e.g., Google"
            className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 transition-colors text-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Location (Optional)</label>
          <input
            type="text"
            value={expData.location}
            onChange={(e) => setExpData({ ...expData, location: e.target.value })}
            placeholder="e.g., San Francisco, CA"
            className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 transition-colors text-lg"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Start Date</label>
            <input
              type="text"
              value={expData.startDate}
              onChange={(e) => setExpData({ ...expData, startDate: e.target.value })}
              placeholder="MM/YYYY"
              className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 transition-colors text-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">End Date</label>
            <input
              type="text"
              value={expData.endDate}
              onChange={(e) => setExpData({ ...expData, endDate: e.target.value })}
              placeholder="MM/YYYY"
              className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 transition-colors text-lg"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Description (Optional)</label>
          <textarea
            value={expData.description}
            onChange={(e) => setExpData({ ...expData, description: e.target.value })}
            placeholder="Brief description of your role..."
            rows={3}
            className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 transition-colors text-lg resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Achievements (Optional)</label>
          <textarea
            value={expData.achievements}
            onChange={(e) => setExpData({ ...expData, achievements: e.target.value })}
            placeholder="One achievement per line&#10;e.g., Increased performance by 40%&#10;Led a team of 5 developers"
            rows={4}
            className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 transition-colors text-lg resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Skills Used (Optional)</label>
          <input
            type="text"
            value={expData.skillsUsed}
            onChange={(e) => setExpData({ ...expData, skillsUsed: e.target.value })}
            placeholder="React, Node.js, AWS (comma-separated)"
            className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 transition-colors text-lg"
          />
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={handleSaveAndNext}
          disabled={saving}
          className="w-full px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          {saving ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Saving...
            </>
          ) : (
            <>
              Go to Profile
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </>
          )}
        </button>
        <div className="text-center mt-4">
          <button
            onClick={onSkip}
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            Skip for now
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// Animated Background Sketch Component
function BackgroundSketch({ delay, position }) {
  const sketches = [
    // Organic shapes sketch (like your first image)
    <svg className="w-64 h-64" viewBox="0 0 200 200" fill="none" stroke="currentColor">
      <motion.circle
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.3 }}
        transition={{ duration: 2, delay }}
        cx="60" cy="60" r="20" strokeWidth="2"
      />
      <motion.ellipse
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.3 }}
        transition={{ duration: 2, delay: delay + 0.3 }}
        cx="100" cy="120" rx="40" ry="50" strokeWidth="2"
      />
      <motion.circle
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.3 }}
        transition={{ duration: 2, delay: delay + 0.6 }}
        cx="140" cy="90" r="30" strokeWidth="2"
      />
      <motion.path
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.3 }}
        transition={{ duration: 2, delay: delay + 0.9 }}
        d="M 80 40 Q 90 30 100 40 T 120 40" strokeWidth="3" strokeLinecap="round"
      />
    </svg>,
    // Paper stack sketch (like your second image)
    <svg className="w-64 h-64" viewBox="0 0 200 200" fill="none">
      <motion.rect
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 0.2 }}
        transition={{ duration: 2, delay }}
        x="50" y="60" width="80" height="100" fill="white" stroke="currentColor" strokeWidth="2"
      />
      <motion.rect
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 0.2 }}
        transition={{ duration: 2, delay: delay + 0.3 }}
        x="60" y="50" width="80" height="100" fill="white" stroke="currentColor" strokeWidth="2"
      />
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: delay + 0.6 }}
        d="M 80 70 Q 90 60 100 70" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.3"
      />
    </svg>,
    // Staircase sketch (like your third image)
    <svg className="w-64 h-64" viewBox="0 0 200 200" fill="none">
      <motion.rect
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.2 }}
        transition={{ duration: 2, delay }}
        x="80" y="120" width="40" height="20" fill="white" stroke="currentColor" strokeWidth="2"
      />
      <motion.rect
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.2 }}
        transition={{ duration: 2, delay: delay + 0.3 }}
        x="80" y="100" width="60" height="20" fill="white" stroke="currentColor" strokeWidth="2"
      />
      <motion.rect
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.2 }}
        transition={{ duration: 2, delay: delay + 0.6 }}
        x="80" y="80" width="80" height="20" fill="white" stroke="currentColor" strokeWidth="2"
      />
    </svg>
  ];

  const randomSketch = sketches[Math.floor(Math.random() * sketches.length)];

  return (
    <motion.div
      animate={{
        y: [0, -20, 0],
        rotate: [0, 5, 0, -5, 0],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`absolute ${position} text-gray-400 opacity-40`}
    >
      {randomSketch}
    </motion.div>
  );
}
