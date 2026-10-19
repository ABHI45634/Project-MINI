import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json({ limit: '10mb' }));

// Helper to get Gemini client
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({ apiKey });
}

// 1. Health check route
app.get('/api/status', (req, res) => {
  const hasKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY');
  res.json({
    status: 'ok',
    service: 'MailMuse Backend',
    geminiConfigured: hasKey,
    timestamp: new Date().toISOString(),
  });
});

// 2. Parse Resume with Gemini
app.post('/api/gemini/parse-resume', async (req, res) => {
  const { resumeText } = req.body;
  if (!resumeText) {
    return res.status(400).json({ error: 'resumeText is required' });
  }

  const ai = getGeminiClient();
  if (!ai) {
    return res.json({ fallback: true, message: 'Gemini API key not configured, using local parser' });
  }

  try {
    const prompt = `You are a precision resume parser for MailMuse, an internship copilot for B.Tech students.
Parse the following resume text into a strict JSON object.
CRITICAL RULE: NEVER invent, hallucinate, or assume any information not explicitly present in the text. If a field is not found, leave it as an empty string or empty array.

Return ONLY a valid JSON object matching this schema:
{
  "fullName": string,
  "email": string,
  "phone": string,
  "college": string,
  "degree": string,
  "branch": string,
  "graduationYear": string,
  "cgpa": string,
  "skills": string[],
  "programmingLanguages": string[],
  "toolsAndFrameworks": string[],
  "projects": [
    {
      "id": string,
      "title": string,
      "techStack": string[],
      "description": string,
      "highlights": string,
      "githubUrl": string
    }
  ],
  "certifications": string[],
  "achievements": string[],
  "experience": [
    {
      "id": string,
      "role": string,
      "company": string,
      "duration": string,
      "description": string
    }
  ],
  "interests": string[],
  "portfolioUrl": string,
  "githubUrl": string,
  "linkedinUrl": string
}

Resume Text:
${resumeText}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ success: true, data: parsed });
  } catch (error: any) {
    console.error('Gemini parse resume error:', error);
    return res.status(500).json({ fallback: true, error: error.message });
  }
});

// 3. Generate Personalized Application Materials with Gemini
app.post('/api/gemini/generate-application', async (req, res) => {
  const { profile, internship } = req.body;
  if (!profile || !internship) {
    return res.status(400).json({ error: 'profile and internship are required' });
  }

  const ai = getGeminiClient();
  if (!ai) {
    return res.json({ fallback: true, message: 'Gemini API key not configured, using local generator' });
  }

  try {
    const prompt = `You are the MailMuse AI Application Writer for B.Tech students.
Create personalized, high-craft application materials for the following internship role using ONLY the verified facts from the student's profile.
STRICT RULES:
1. NEVER invent projects, achievements, past companies, CGPA, or skills that are not in the profile.
2. Tone must be professional, articulate, enthusiastic, and grounded in concrete evidence.
3. Highlight the candidate's actual projects that directly intersect with the role's required skills.

Target Internship:
Company: ${internship.company}
Role: ${internship.role}
Required Skills: ${internship.requiredSkills.join(', ')}
Description: ${internship.description}

Student Profile:
Name: ${profile.fullName}
Degree: ${profile.degree} in ${profile.branch} at ${profile.college} (Graduating ${profile.graduationYear})
CGPA: ${profile.cgpa}
Skills: ${profile.skills.join(', ')}
Projects: ${JSON.stringify(profile.projects)}
Experience: ${JSON.stringify(profile.experience)}
Achievements: ${profile.achievements.join('; ')}

Return ONLY a valid JSON object with keys:
{
  "coverLetter": string,
  "recruiterEmail": string,
  "shortPitch": string
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ success: true, data: parsed });
  } catch (error: any) {
    console.error('Gemini generate application error:', error);
    return res.status(500).json({ fallback: true, error: error.message });
  }
});

// 4. Parse Recruiter Email with Gemini
app.post('/api/gemini/parse-email', async (req, res) => {
  const { emailText } = req.body;
  if (!emailText) {
    return res.status(400).json({ error: 'emailText is required' });
  }

  const ai = getGeminiClient();
  if (!ai) {
    return res.json({ fallback: true, message: 'Gemini API key not configured, using local parser' });
  }

  try {
    const prompt = `You are MailMuse's Email Intelligence analyzer for internship emails.
Analyze this email and extract structured action items.
Classify the detectedStatus into one of: 'Applied', 'Assessment', 'Interview', 'Awaiting Response', 'Offer', 'Rejected', 'Shortlisted'.
Set priority to 'HIGH', 'MEDIUM', or 'LOW'.
Format deadlines or interview dates clearly (e.g., 'Oct 4, 2026' or 'Not specified').

Return ONLY a valid JSON object with schema:
{
  "company": string,
  "role": string,
  "detectedStatus": string,
  "actionRequired": string,
  "deadline": string,
  "interviewDate": string,
  "priority": "HIGH" | "MEDIUM" | "LOW",
  "nextStep": string
}

Email Text:
${emailText}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ success: true, data: parsed });
  } catch (error: any) {
    console.error('Gemini parse email error:', error);
    return res.status(500).json({ fallback: true, error: error.message });
  }
});

// 5. Mount Vite middleware in development
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
    app.get('*', (req, res) => {
      res.sendFile('dist/index.html', { root: '.' });
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`MailMuse server running on http://0.0.0.0:${port}`);
  });
}

startServer();
