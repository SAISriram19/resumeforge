import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';
import axios from 'axios';
import jsPDF from 'jspdf';

const API_URL = 'http://localhost:3001/api';

export default function ResumeGenerator() {
  const { currentUser } = useAuth();
  const [jdText, setJdText] = useState('');
  const [loading, setLoading] = useState(false);
  const [parsedJd, setParsedJd] = useState(null);
  const [generatedResume, setGeneratedResume] = useState(null);
  const [resumes, setResumes] = useState([]);
  const [profileId, setProfileId] = useState(null);

  useEffect(() => {
    loadProfileAndResumes();
  }, []);

  const loadProfileAndResumes = async () => {
    try {
      const profileRes = await axios.get(`${API_URL}/profile/${currentUser.uid}`);
      if (profileRes.data.success) {
        setProfileId(profileRes.data.profile.id);
      }

      const resumesRes = await axios.get(`${API_URL}/gemini/resumes/${currentUser.uid}`);
      if (resumesRes.data.success) {
        setResumes(resumesRes.data.resumes);
      }
    } catch (error) {
      console.error('Error loading data', error);
    }
  };

  const parseJD = async () => {
    if (!jdText.trim()) {
      alert('Please enter a job description');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/gemini/parse-jd`, { jdText });
      if (response.data.success) {
        setParsedJd(response.data.parsed);
      }
    } catch (error) {
      alert('Error parsing job description');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const generateResume = async () => {
    if (!parsedJd) {
      alert('Please parse the job description first');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/gemini/generate-resume`, {
        profileId,
        jdText,
        parsedJd
      });
      
      if (response.data.success) {
        setGeneratedResume(response.data.resume);
        loadProfileAndResumes();
        alert('Resume generated successfully!');
      }
    } catch (error) {
      alert('Error generating resume');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <Section title="Upload Job Description">
        <textarea
          value={jdText}
          onChange={(e) => setJdText(e.target.value)}
          placeholder="Paste the job description here..."
          rows={8}
          className="w-full px-4 py-3 bg-primary border border-secondary rounded focus:outline-none focus:border-white"
        />
        <button
          onClick={parseJD}
          disabled={loading}
          className="mt-4 px-6 py-2 bg-white text-black rounded font-semibold hover:bg-gray-200 disabled:opacity-50"
        >
          {loading ? 'Parsing...' : 'Parse Job Description'}
        </button>
      </Section>

      {parsedJd && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Section title="Parsed Requirements">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Required Skills:</h3>
                <div className="flex flex-wrap gap-2">
                  {parsedJd.req_skills.map((skill, idx) => (
                    <span key={idx} className="px-3 py-1 bg-secondary border border-white/20 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Must-Haves:</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-300">
                  {parsedJd.must_haves.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Preferred:</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-300">
                  {parsedJd.preferred.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <button
              onClick={generateResume}
              disabled={loading}
              className="mt-6 px-6 py-2 bg-white text-black rounded font-semibold hover:bg-gray-200 disabled:opacity-50"
            >
              {loading ? 'Generating...' : 'Generate Tailored Resume'}
            </button>
          </Section>
        </motion.div>
      )}

      {generatedResume && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Section title="Generated Resume">
            <ResumePreview resume={generatedResume.generated_content} />
          </Section>
        </motion.div>
      )}

      {resumes.length > 0 && (
        <Section title="Previous Resumes">
          <div className="space-y-4">
            {resumes.map((resume) => (
              <div
                key={resume.id}
                className="bg-primary border border-secondary p-4 rounded cursor-pointer hover:border-white/40"
                onClick={() => setGeneratedResume(resume)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="text-sm text-gray-400">
                      Generated: {new Date(resume.created_at).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                      {resume.jd_content.substring(0, 150)}...
                    </p>
                  </div>
                  <button className="px-4 py-2 bg-secondary border border-white/20 rounded text-sm hover:bg-white/10">
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="bg-accent/50 backdrop-blur-sm p-6 rounded-lg border border-secondary">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      {children}
    </div>
  );
}

function ResumePreview({ resume }) {
  const exportToPDF = () => {
    const doc = new jsPDF();
    let y = 20;

    doc.setFontSize(16);
    doc.text('Professional Summary', 20, y);
    y += 10;
    doc.setFontSize(11);
    const summaryLines = doc.splitTextToSize(resume.summary, 170);
    doc.text(summaryLines, 20, y);
    y += summaryLines.length * 7 + 10;

    doc.setFontSize(14);
    doc.text('Skills', 20, y);
    y += 8;
    doc.setFontSize(10);
    const skillsText = resume.skills?.join(', ') || '';
    const skillsLines = doc.splitTextToSize(skillsText, 170);
    doc.text(skillsLines, 20, y);
    y += skillsLines.length * 6 + 10;

    if (resume.education && resume.education.length > 0) {
      doc.setFontSize(14);
      doc.text('Education', 20, y);
      y += 8;
      resume.education.forEach(edu => {
        doc.setFontSize(11);
        doc.text(edu.degree, 20, y);
        y += 6;
        doc.setFontSize(10);
        doc.text(edu.school, 20, y);
        y += 5;
        doc.text(edu.dates, 20, y);
        y += 10;
      });
    }

    if (resume.experience && resume.experience.length > 0) {
      doc.setFontSize(14);
      doc.text('Experience', 20, y);
      y += 8;
      resume.experience.forEach(exp => {
        if (y > 270) {
          doc.addPage();
          y = 20;
        }
        doc.setFontSize(11);
        doc.text(exp.title, 20, y);
        y += 6;
        doc.setFontSize(10);
        doc.text(exp.company, 20, y);
        y += 5;
        doc.text(exp.dates, 20, y);
        y += 6;
        if (exp.bullets) {
          exp.bullets.forEach(bullet => {
            const bulletLines = doc.splitTextToSize(`• ${bullet}`, 165);
            doc.text(bulletLines, 25, y);
            y += bulletLines.length * 5;
          });
        }
        y += 5;
      });
    }

    doc.save('resume.pdf');
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          onClick={exportToPDF}
          className="px-6 py-2 bg-white text-black rounded font-semibold hover:bg-gray-200"
        >
          Export as PDF
        </button>
      </div>
      <div className="bg-white text-black p-8 rounded">
        <div className="mb-6">
          <h3 className="text-2xl font-bold mb-2">Professional Summary</h3>
          <p className="text-gray-700">{resume.summary}</p>
        </div>

      <div className="mb-6">
        <h3 className="text-xl font-bold mb-2">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {resume.skills?.map((skill, idx) => (
            <span key={idx} className="px-3 py-1 bg-gray-200 rounded text-sm">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {resume.education && resume.education.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-2">Education</h3>
          {resume.education.map((edu, idx) => (
            <div key={idx} className="mb-3">
              <p className="font-semibold">{edu.degree}</p>
              <p className="text-gray-700">{edu.school}</p>
              <p className="text-sm text-gray-600">{edu.dates}</p>
            </div>
          ))}
        </div>
      )}

      {resume.experience && resume.experience.length > 0 && (
        <div>
          <h3 className="text-xl font-bold mb-2">Experience</h3>
          {resume.experience.map((exp, idx) => (
            <div key={idx} className="mb-4">
              <p className="font-semibold">{exp.title}</p>
              <p className="text-gray-700">{exp.company}</p>
              <p className="text-sm text-gray-600 mb-2">{exp.dates}</p>
              {exp.bullets && (
                <ul className="list-disc list-inside space-y-1">
                  {exp.bullets.map((bullet, bidx) => (
                    <li key={bidx} className="text-sm text-gray-700">{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
}
