import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';
import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export default function ProfileDashboard() {
    const { currentUser } = useAuth();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeSection, setActiveSection] = useState('overview');

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const response = await axios.get(`${API_URL}/profile/${currentUser.uid}`);
            if (response.data.success) {
                setProfile(response.data.profile);
            }
        } catch (error) {
            console.error('Error loading profile:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="text-center">
                    <div className="w-8 h-8 border-2 border-[#d4c5a9] border-t-[#2d2a26] rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-[#6b5d4f]">Loading your profile...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f5f1e8]">
            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Sidebar - Navigation */}
                    <div className="lg:col-span-1">
                        <div className="bg-[#e8dcc4]/50 rounded-2xl p-6 shadow-sm border border-[#d4c5a9] sticky top-6">
                            <h3 className="font-semibold text-[#2d2a26] mb-4">Profile Sections</h3>
                            <nav className="space-y-2">
                                {[
                                    { id: 'overview', label: 'Overview' },
                                    { id: 'summary', label: 'Summary' },
                                    { id: 'skills', label: 'Skills' },
                                    { id: 'education', label: 'Education' },
                                    { id: 'experience', label: 'Experience' },
                                ].map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveSection(item.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${activeSection === item.id
                                            ? 'bg-[#2d2a26] text-[#f5f1e8]'
                                            : 'text-[#6b5d4f] hover:bg-[#d4c5a9]/50'
                                            }`}
                                    >
                                        <span className="text-xs font-medium">{item.icon}</span>
                                        <span className="font-medium">{item.label}</span>
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>

                    {/* Right Content */}
                    <div className="lg:col-span-2">
                        <motion.div
                            key={activeSection}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {activeSection === 'overview' && <OverviewSection profile={profile} />}
                            {activeSection === 'summary' && <SummarySection profile={profile} onUpdate={loadProfile} />}
                            {activeSection === 'skills' && <SkillsSection profile={profile} onUpdate={loadProfile} />}
                            {activeSection === 'education' && <EducationSection profile={profile} onUpdate={loadProfile} />}
                            {activeSection === 'experience' && <ExperienceSection profile={profile} onUpdate={loadProfile} />}
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function OverviewSection({ profile }) {
    return (
        <div className="bg-[#e8dcc4]/50 rounded-2xl p-8 shadow-sm border border-[#d4c5a9]">
            <h2 className="text-2xl font-bold text-[#2d2a26] mb-6">Profile Overview</h2>

            <div className="space-y-6">
                <div>
                    <h3 className="font-semibold text-[#2d2a26] mb-3">Professional Summary</h3>
                    <p className="text-[#6b5d4f] leading-relaxed">
                        {profile?.summary || "No summary added yet. Add a professional summary to help AI generate better resumes."}
                    </p>
                </div>

                <div>
                    <h3 className="font-semibold text-[#2d2a26] mb-3">Top Skills</h3>
                    <div className="flex flex-wrap gap-2">
                        {profile?.skills?.slice(0, 8).map((skill, idx) => (
                            <span key={idx} className="px-3 py-1 bg-[#d4c5a9]/50 text-[#2d2a26] rounded-full text-sm">
                                {skill.skill_name}
                            </span>
                        )) || <span className="text-[#6b5d4f]">No skills added yet</span>}
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold text-[#2d2a26] mb-3">Recent Experience</h3>
                    {profile?.experiences?.length > 0 ? (
                        <div className="space-y-3">
                            {profile.experiences.slice(0, 2).map((exp, idx) => (
                                <div key={idx} className="border-l-4 border-[#a89270] pl-4">
                                    <h4 className="font-medium text-[#2d2a26]">{exp.title}</h4>
                                    <p className="text-[#6b5d4f]">{exp.company} • {exp.duration}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-[#6b5d4f]">No experience added yet</p>
                    )}
                </div>

                <div className="bg-[#d4c5a9]/50 border border-[#c9b89a] rounded-xl p-6">
                    <h3 className="font-semibold text-[#2d2a26] mb-2">Ready to Generate Resumes?</h3>
                    <p className="text-[#6b5d4f] mb-4">
                        Your profile looks good! You can now generate tailored resumes for specific job descriptions.
                    </p>
                    <button
                        onClick={() => window.location.hash = '#generate'}
                        className="px-6 py-3 bg-[#2d2a26] text-[#f5f1e8] rounded-lg font-medium hover:bg-[#3d3933] transition-colors"
                    >
                        Generate Resume
                    </button>
                </div>
            </div>
        </div>
    );
}

function SummarySection({ profile, onUpdate }) {
    const { currentUser } = useAuth();
    const cacheKey = `summary_draft_${currentUser?.uid}`;
    
    // Initialize from cache or profile
    const [summary, setSummary] = useState(() => {
        const cached = localStorage.getItem(cacheKey);
        return cached || profile?.summary || '';
    });
    const [saving, setSaving] = useState(false);

    // Auto-save to cache on change
    const handleSummaryChange = (e) => {
        const newValue = e.target.value;
        setSummary(newValue);
        localStorage.setItem(cacheKey, newValue);
    };

    const saveSummary = async () => {
        setSaving(true);
        try {
            await axios.put(`${API_URL}/profile/update`, {
                profileId: profile.id,
                summary
            });
            // Clear cache after successful save
            localStorage.removeItem(cacheKey);
            onUpdate();
        } catch (error) {
            console.error('Error saving summary:', error);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="bg-[#e8dcc4]/50 rounded-2xl p-8 shadow-sm border border-[#d4c5a9]">
            <h2 className="text-2xl font-bold text-[#2d2a26] mb-6">Professional Summary</h2>

            <div className="space-y-4">
                <textarea
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    placeholder="Write 3-4 sentences about your professional background, key achievements, and career goals..."
                    rows={6}
                    className="w-full px-4 py-3 border border-[#d4c5a9] bg-[#f5f1e8] rounded-xl text-[#2d2a26] placeholder-[#a89270] focus:outline-none focus:ring-2 focus:ring-[#8b7355] focus:border-transparent resize-none"
                />

                <div className="flex justify-end">
                    <button
                        onClick={saveSummary}
                        disabled={saving}
                        className="px-6 py-3 bg-[#2d2a26] text-[#f5f1e8] rounded-lg font-medium hover:bg-[#3d3933] disabled:opacity-50 transition-colors"
                    >
                        {saving ? 'Saving...' : 'Save Summary'}
                    </button>
                </div>
            </div>
        </div>
    );
}

function SkillsSection({ profile, onUpdate }) {
    return (
        <div className="bg-[#e8dcc4]/50 rounded-2xl p-8 shadow-sm border border-[#d4c5a9]">
            <h2 className="text-2xl font-bold text-[#2d2a26] mb-6">Skills</h2>

            <div className="flex flex-wrap gap-3">
                {profile?.skills?.map((skill, idx) => (
                    <span key={idx} className="px-4 py-2 bg-[#d4c5a9]/50 text-[#2d2a26] rounded-full font-medium">
                        {skill.skill_name}
                    </span>
                )) || <span className="text-[#6b5d4f]">No skills added yet</span>}
            </div>

            <div className="mt-6 p-4 bg-[#d4c5a9]/30 rounded-xl">
                <p className="text-sm text-[#6b5d4f]">
                    <strong>Tip:</strong> Skills were added during your onboarding. You can add more skills by going through the step-by-step flow again or contact support.
                </p>
            </div>
        </div>
    );
}

function EducationSection({ profile, onUpdate }) {
    return (
        <div className="bg-[#e8dcc4]/50 rounded-2xl p-8 shadow-sm border border-[#d4c5a9]">
            <h2 className="text-2xl font-bold text-[#2d2a26] mb-6">Education</h2>

            <div className="space-y-4">
                {profile?.education?.map((edu, idx) => (
                    <div key={idx} className="border border-[#d4c5a9] rounded-xl p-6 bg-[#f5f1e8]">
                        <h3 className="font-semibold text-[#2d2a26] mb-2">{edu.degree}</h3>
                        <p className="text-[#6b5d4f] mb-2">{edu.school}</p>
                        <p className="text-sm text-[#6b5d4f]">{edu.start_date} - {edu.end_date}</p>
                        {edu.gpa && <p className="text-sm text-[#6b5d4f] mt-1">GPA: {edu.gpa}</p>}
                    </div>
                )) || <p className="text-[#6b5d4f]">No education entries added yet</p>}
            </div>
        </div>
    );
}

function ExperienceSection({ profile, onUpdate }) {
    return (
        <div className="bg-[#e8dcc4]/50 rounded-2xl p-8 shadow-sm border border-[#d4c5a9]">
            <h2 className="text-2xl font-bold text-[#2d2a26] mb-6">Experience</h2>

            <div className="space-y-6">
                {profile?.experiences?.map((exp, idx) => (
                    <div key={idx} className="border border-[#d4c5a9] rounded-xl p-6 bg-[#f5f1e8]">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <span className="px-3 py-1 bg-[#d4c5a9]/50 text-[#2d2a26] text-xs font-medium rounded-full uppercase mb-2 inline-block">
                                    {exp.type}
                                </span>
                                <h3 className="font-semibold text-[#2d2a26] text-lg">{exp.title}</h3>
                                <p className="text-[#6b5d4f]">{exp.company} {exp.location && `• ${exp.location}`}</p>
                                <p className="text-sm text-[#6b5d4f]">{exp.start_date} - {exp.end_date} • {exp.duration}</p>
                            </div>
                        </div>

                        {exp.description && (
                            <p className="text-[#6b5d4f] mb-4">{exp.description}</p>
                        )}

                        {exp.achievements && exp.achievements.length > 0 && (
                            <div className="mb-4">
                                <h4 className="font-medium text-[#2d2a26] mb-2">Key Achievements:</h4>
                                <ul className="space-y-1">
                                    {exp.achievements.map((achievement, aidx) => (
                                        <li key={aidx} className="flex items-start gap-2 text-[#6b5d4f]">
                                            <span className="text-[#a89270] mt-1">•</span>
                                            <span>{achievement}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {exp.skills_used && exp.skills_used.length > 0 && (
                            <div>
                                <h4 className="font-medium text-[#2d2a26] mb-2">Technologies Used:</h4>
                                <div className="flex flex-wrap gap-2">
                                    {exp.skills_used.map((skill, sidx) => (
                                        <span key={sidx} className="px-2 py-1 bg-[#d4c5a9]/50 text-[#2d2a26] text-xs rounded">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )) || <p className="text-[#6b5d4f]">No experience entries added yet</p>}
            </div>
        </div>
    );
}