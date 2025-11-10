const express = require('express');
const router = express.Router();
const { getModel, getEmbeddingModel } = require('../config/gemini');
const { supabase } = require('../config/supabase');

function cosineSimilarity(vecA, vecB) {
  const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  return dotProduct / (magnitudeA * magnitudeB);
}

router.post('/parse-jd', async (req, res) => {
  try {
    const { jdText } = req.body;
    
    const model = getModel();
    const prompt = `Extract key elements from this job description and return as JSON:
{
  "req_skills": [list of required skills],
  "must_haves": [list of must-have requirements],
  "preferred": [list of preferred qualifications]
}

Job Description:
${jdText}

Return only valid JSON, no additional text.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const cleanJson = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const parsed = JSON.parse(cleanJson);
    
    res.json({ success: true, parsed });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/generate-resume', async (req, res) => {
  try {
    const { profileId, jdText, parsedJd } = req.body;
    
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', profileId)
      .single();

    const { data: skills } = await supabase
      .from('skills')
      .select('*')
      .eq('profile_id', profileId);

    const { data: education } = await supabase
      .from('education')
      .select('*')
      .eq('profile_id', profileId);

    const { data: experiences } = await supabase
      .from('experiences')
      .select('*')
      .eq('profile_id', profileId);

    const embeddingModel = getEmbeddingModel();
    
    const jdEmbedding = await embeddingModel.embedContent(jdText);
    const jdVector = jdEmbedding.embedding.values;
    
    const experienceTexts = experiences.map(exp => 
      `${exp.title} at ${exp.company}: ${exp.description || ''} ${(exp.achievements || []).join(' ')}`
    );
    
    const experienceEmbeddings = await Promise.all(
      experienceTexts.map(text => embeddingModel.embedContent(text))
    );
    
    const similarities = experienceEmbeddings.map((emb, idx) => ({
      experience: experiences[idx],
      similarity: cosineSimilarity(jdVector, emb.embedding.values)
    }));
    
    similarities.sort((a, b) => b.similarity - a.similarity);
    const topExperiences = similarities.slice(0, 5).map(s => s.experience);

    const model = getModel();
    const resumePrompt = `Generate an ATS-friendly resume based on the following:

Profile Summary: ${profile.summary || 'N/A'}

Skills: ${skills.map(s => s.skill_name).join(', ')}

Education:
${education.map(e => `${e.degree} from ${e.school} (${e.start_date} - ${e.end_date})`).join('\n')}

Top Relevant Experiences:
${topExperiences.map(exp => `
${exp.title} at ${exp.company} (${exp.start_date} - ${exp.end_date})
${exp.description || ''}
Achievements: ${(exp.achievements || []).join('; ')}
Skills: ${(exp.skills_used || []).join(', ')}
`).join('\n')}

Job Description Requirements:
Required Skills: ${parsedJd.req_skills.join(', ')}
Must-Haves: ${parsedJd.must_haves.join(', ')}
Preferred: ${parsedJd.preferred.join(', ')}

Generate a tailored resume that:
1. Matches bullets to required skills
2. Quantifies impacts where possible
3. Optimizes for ATS compatibility
4. Keeps it concise (1-page format)

Return as JSON:
{
  "summary": "tailored professional summary",
  "skills": ["skill1", "skill2"],
  "education": [...],
  "experience": [...]
}`;

    const result = await model.generateContent(resumePrompt);
    const text = result.response.text();
    const cleanJson = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const generatedResume = JSON.parse(cleanJson);
    
    const { data: savedResume } = await supabase
      .from('resumes')
      .insert({
        user_id: profile.user_id,
        profile_id: profileId,
        jd_content: jdText,
        generated_content: generatedResume
      })
      .select()
      .single();

    res.json({ success: true, resume: savedResume });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/resumes/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const { data, error } = await supabase
      .from('resumes')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json({ success: true, resumes: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
