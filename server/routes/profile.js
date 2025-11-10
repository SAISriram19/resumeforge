const express = require('express');
const router = express.Router();
const { supabase } = require('../config/supabase');

router.post('/create', async (req, res) => {
  try {
    const { userId, summary } = req.body;
    console.log('Creating profile for userId:', userId);
    
    if (!supabase) {
      throw new Error('Supabase client not initialized');
    }
    
    // First check if profile already exists
    console.log('Checking for existing profile...');
    const { data: existingProfile, error: checkError } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Error checking existing profile:', checkError);
      throw checkError;
    }

    if (existingProfile) {
      console.log('Profile already exists, returning existing profile');
      return res.json({ success: true, profile: existingProfile });
    }

    // Create new profile
    console.log('Creating new profile...');
    const { data, error } = await supabase
      .from('profiles')
      .insert({ user_id: userId, summary })
      .select()
      .single();

    if (error) {
      console.error('Error creating profile:', error);
      throw error;
    }
    
    console.log('Profile created successfully:', data);
    res.json({ success: true, profile: data });
  } catch (error) {
    console.error('Profile creation error:', error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (profileError) throw profileError;

    const { data: skills } = await supabase
      .from('skills')
      .select('*')
      .eq('profile_id', profile.id);

    const { data: education } = await supabase
      .from('education')
      .select('*')
      .eq('profile_id', profile.id);

    const { data: experiences } = await supabase
      .from('experiences')
      .select('*')
      .eq('profile_id', profile.id);

    res.json({ 
      success: true, 
      profile: { ...profile, skills, education, experiences } 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/update', async (req, res) => {
  try {
    const { profileId, summary } = req.body;
    
    const { data, error } = await supabase
      .from('profiles')
      .update({ summary, updated_at: new Date() })
      .eq('id', profileId)
      .select()
      .single();

    if (error) throw error;
    res.json({ success: true, profile: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/skills/add', async (req, res) => {
  try {
    const { profileId, skillName } = req.body;
    
    const { data, error } = await supabase
      .from('skills')
      .insert({ profile_id: profileId, skill_name: skillName })
      .select()
      .single();

    if (error) throw error;
    res.json({ success: true, skill: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/skills/:skillId', async (req, res) => {
  try {
    const { skillId } = req.params;
    
    const { error } = await supabase
      .from('skills')
      .delete()
      .eq('id', skillId);

    if (error) throw error;
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/education/add', async (req, res) => {
  try {
    const { profileId, degree, school, startDate, endDate, gpa, relevantCourses } = req.body;
    
    const { data, error } = await supabase
      .from('education')
      .insert({ 
        profile_id: profileId, 
        degree, 
        school, 
        start_date: startDate, 
        end_date: endDate, 
        gpa,
        relevant_courses: relevantCourses 
      })
      .select()
      .single();

    if (error) throw error;
    res.json({ success: true, education: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/education/:educationId', async (req, res) => {
  try {
    const { educationId } = req.params;
    const { degree, school, startDate, endDate, gpa, relevantCourses } = req.body;
    
    const { data, error } = await supabase
      .from('education')
      .update({ 
        degree, 
        school, 
        start_date: startDate, 
        end_date: endDate, 
        gpa,
        relevant_courses: relevantCourses,
        updated_at: new Date()
      })
      .eq('id', educationId)
      .select()
      .single();

    if (error) throw error;
    res.json({ success: true, education: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/education/:educationId', async (req, res) => {
  try {
    const { educationId } = req.params;
    
    const { error } = await supabase
      .from('education')
      .delete()
      .eq('id', educationId);

    if (error) throw error;
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/experience/add', async (req, res) => {
  try {
    const { 
      profileId, type, title, company, location, 
      startDate, endDate, duration, description, 
      achievements, skillsUsed 
    } = req.body;
    
    const { data, error } = await supabase
      .from('experiences')
      .insert({ 
        profile_id: profileId,
        type,
        title,
        company,
        location,
        start_date: startDate,
        end_date: endDate,
        duration,
        description,
        achievements,
        skills_used: skillsUsed
      })
      .select()
      .single();

    if (error) throw error;
    res.json({ success: true, experience: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/experience/:experienceId', async (req, res) => {
  try {
    const { experienceId } = req.params;
    const { 
      type, title, company, location, 
      startDate, endDate, duration, description, 
      achievements, skillsUsed 
    } = req.body;
    
    const { data, error } = await supabase
      .from('experiences')
      .update({ 
        type,
        title,
        company,
        location,
        start_date: startDate,
        end_date: endDate,
        duration,
        description,
        achievements,
        skills_used: skillsUsed,
        updated_at: new Date()
      })
      .eq('id', experienceId)
      .select()
      .single();

    if (error) throw error;
    res.json({ success: true, experience: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/experience/:experienceId', async (req, res) => {
  try {
    const { experienceId } = req.params;
    
    const { error } = await supabase
      .from('experiences')
      .delete()
      .eq('id', experienceId);

    if (error) throw error;
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
