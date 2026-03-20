import { useState, useRef } from 'react';
import { 
  User, Mail, Phone, MapPin, Globe, Plus, Trash2, 
  FileText, Briefcase, GraduationCap, Code, 
  Layout, Printer,
  Palette, LayoutTemplate, Sparkles, Award, CheckCircle2, ChevronLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Interfaces ---
interface Education { id: string; school: string; degree: string; year: string; grade: string; }
interface Experience { id: string; company: string; role: string; duration: string; description: string; }
interface Project { id: string; title: string; description: string; link: string; }
interface Certification { id: string; name: string; issuer: string; year: string; }
interface Achievement { id: string; description: string; }

interface ResumeData {
  personal: { fullName: string; email: string; phone: string; location: string; website: string; summary: string; title: string; };
  education: Education[];
  experience: Experience[];
  skills: string[];
  projects: Project[];
  certifications: Certification[];
  achievements: Achievement[];
}

interface ThemeConfig {
  color: string;
  font: string;
  size: 'sm' | 'base' | 'lg';
}

// --- Main Component ---
export default function ResumeBuilder() {
  const [editorTab, setEditorTab] = useState<'content' | 'templates' | 'design'>('content');
  
  // Design State
  const [selectedTemplate, setSelectedTemplate] = useState('minimal');
  const [theme, setTheme] = useState<ThemeConfig>({
    color: '#4f46e5', // Indigo-600
    font: 'font-serif', // Serif looks better on Minimal
    size: 'base'
  });

  // Mock User Profile for Smart Recommendations
  const userProfile = { type: 'Student', course: 'BCA' };

  const [resumeData, setResumeData] = useState<ResumeData>({
    personal: {
      fullName: 'John Doe',
      title: 'Software Engineering Student',
      email: 'john.doe@example.com',
      phone: '+91 98765 43210',
      location: 'Pune, India',
      website: 'linkedin.com/in/johndoe',
      summary: 'Passionate software engineering student with a strong foundation in building scalable web applications. Quick learner, eager to contribute to innovative tech teams and solve complex real-world problems.'
    },
    education: [
      { id: '1', school: 'Pune Institute of Computer Technology', degree: 'Bachelor of Computer Applications (BCA)', year: '2022 - 2025', grade: '8.5 CGPA' }
    ],
    experience: [
      { id: '1', company: 'Tech Solutions Inc.', role: 'Frontend Developer Intern', duration: 'Jan 2024 - Jun 2024', description: '• Developed responsive user interfaces using React and Tailwind CSS.\n• Collaborated with the backend team to integrate REST APIs.\n• Improved overall page load speed by 20% through code optimization.' }
    ],
    skills: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Git', 'SQL', 'Python'],
    projects: [
      { id: '1', title: 'EduAdvisory Platform', description: 'Built a full-stack educational platform with scholarship filters and real-time resume building tools using React and Firebase.', link: 'github.com/johndoe/eduadvisory' }
    ],
    certifications: [
      { id: '1', name: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services', year: '2023' }
    ],
    achievements: [
      { id: '1', description: 'Winner of the 2024 State Level Hackathon for EdTech Innovation.' }
    ]
  });

  const previewRef = useRef<HTMLDivElement>(null);

  // Print Handler
  const handlePrint = () => {
    const printContent = previewRef.current;
    if (printContent) {
      const originalContents = document.body.innerHTML;
      
      const printStyles = `
        <style>
          @media print {
            body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
            @page { margin: 0; size: A4; }
          }
        </style>
      `;
      
      document.body.innerHTML = printStyles + printContent.innerHTML;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload(); 
    }
  };

  // Generic Update Handlers
  const updatePersonal = (field: keyof ResumeData['personal'], value: string) => {
    setResumeData(prev => ({ ...prev, personal: { ...prev.personal, [field]: value } }));
  };

  const updateArrayItem = <K extends keyof Omit<ResumeData, 'personal' | 'skills'>>(
    collection: K, id: string, field: string, value: string
  ) => {
    setResumeData(prev => ({
      ...prev,
      [collection]: (prev[collection] as any[]).map(item => item.id === id ? { ...item, [field]: value } : item)
    }));
  };

  const removeArrayItem = <K extends keyof Omit<ResumeData, 'personal' | 'skills'>>(collection: K, id: string) => {
    setResumeData(prev => ({
      ...prev,
      [collection]: (prev[collection] as any[]).filter(item => item.id !== id)
    }));
  };

  const addItem = (type: 'education' | 'experience' | 'projects' | 'certifications' | 'achievements') => {
    const newId = Date.now().toString();
    const items = {
      education: { id: newId, school: '', degree: '', year: '', grade: '' },
      experience: { id: newId, company: '', role: '', duration: '', description: '' },
      projects: { id: newId, title: '', description: '', link: '' },
      certifications: { id: newId, name: '', issuer: '', year: '' },
      achievements: { id: newId, description: '' }
    };
    setResumeData(prev => ({ ...prev, [type]: [...prev[type] as any, items[type]] }));
  };

  const updateSkills = (value: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: value.split(',').map(s => s.trim())
    }));
  };

  // --- Templates Data ---
  const templates = [
    { id: 'minimal', name: 'Minimal ATS', type: 'B&W Text Focus', isRecommended: true, preview: 'bg-white border-slate-200' },
    { id: 'modern', name: 'Modern', type: 'Two Column (Sidebar)', isRecommended: false, preview: 'bg-indigo-50 border-indigo-200' },
    { id: 'student', name: 'Student Focus', type: 'Single Column', isRecommended: true, preview: 'bg-teal-50 border-teal-200' },
    { id: 'fresher', name: 'Fresher Starter', type: 'Single Column', isRecommended: true, preview: 'bg-blue-50 border-blue-200' },
    { id: 'professional', name: 'Professional', type: 'Single Column Classic', isRecommended: false, preview: 'bg-slate-100 border-slate-300' }
  ];

  // --- Theme Classes (Increased sizes for better A4 fill) ---
  const fontClassMap = {
    'font-sans': 'font-sans',
    'font-serif': 'font-serif',
    'font-mono': 'font-mono'
  };
  
  const sizeClassMap = {
    'sm': 'text-[12px] leading-relaxed',
    'base': 'text-[14px] leading-relaxed',
    'lg': 'text-[16px] leading-relaxed'
  };

  // =========================================================================
  // TEMPLATE RENDERERS (With Improved Whitespace Management)
  // =========================================================================

  const TemplateMinimal = () => (
    <div className={`p-12 flex flex-col h-full ${fontClassMap[theme.font as keyof typeof fontClassMap]} ${sizeClassMap[theme.size]}`}>
      
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold uppercase tracking-widest mb-2 text-black">{resumeData.personal.fullName}</h1>
        <p className="text-lg font-medium text-gray-700 mb-3">{resumeData.personal.title}</p>
        <p className="text-sm text-gray-500">
          {resumeData.personal.email} | {resumeData.personal.phone} | {resumeData.personal.location}
          {resumeData.personal.website && ` | ${resumeData.personal.website}`}
        </p>
      </div>
      
      {/* Summary */}
      {resumeData.personal.summary && (
        <div className="mb-8">
          <p className="text-justify text-gray-800">{resumeData.personal.summary}</p>
        </div>
      )}

      {/* Experience */}
      {resumeData.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold uppercase border-b-2 border-black pb-2 mb-4 tracking-wider">Professional Experience</h2>
          <div className="space-y-6">
            {resumeData.experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <span className="font-bold text-[16px] text-black">{exp.role}</span>
                  <span className="text-sm font-semibold text-gray-600">{exp.duration}</span>
                </div>
                <div className="italic text-gray-700 mb-2 font-medium">{exp.company}</div>
                <p className="whitespace-pre-wrap text-gray-800">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {resumeData.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold uppercase border-b-2 border-black pb-2 mb-4 tracking-wider">Education</h2>
          <div className="space-y-4">
            {resumeData.education.map(edu => (
              <div key={edu.id} className="flex justify-between items-start">
                <div>
                  <div className="font-bold text-[16px] text-black mb-1">{edu.degree}</div>
                  <div className="text-gray-700">{edu.school} {edu.grade && <span className="font-semibold text-black">— Grade: {edu.grade}</span>}</div>
                </div>
                <div className="text-right whitespace-nowrap text-sm font-semibold text-gray-600">{edu.year}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {resumeData.projects.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold uppercase border-b-2 border-black pb-2 mb-4 tracking-wider">Projects</h2>
          <div className="space-y-5">
            {resumeData.projects.map(proj => (
              <div key={proj.id}>
                <div className="font-bold text-[16px] text-black mb-1">
                  {proj.title} {proj.link && <span className="font-normal italic text-sm text-gray-500 ml-2">({proj.link})</span>}
                </div>
                <p className="text-gray-800">{proj.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {resumeData.skills.length > 0 && resumeData.skills[0] !== "" && (
        <div className="mb-8">
          <h2 className="text-lg font-bold uppercase border-b-2 border-black pb-2 mb-4 tracking-wider">Technical Skills</h2>
          <p className="text-gray-800 font-medium leading-relaxed">{resumeData.skills.join(', ')}</p>
        </div>
      )}
    </div>
  );

  const TemplateModern = () => (
    <div className={`flex min-h-full ${fontClassMap[theme.font as keyof typeof fontClassMap]} ${sizeClassMap[theme.size]}`}>
      {/* Left Sidebar */}
      <div className="w-[35%] text-white p-10 shrink-0 print:m-0" style={{ backgroundColor: theme.color }}>
        <div className="mb-10">
          <h1 className="text-4xl font-black uppercase tracking-wider mb-3 leading-tight">{resumeData.personal.fullName}</h1>
          <p className="text-white/90 font-medium tracking-widest uppercase text-sm">{resumeData.personal.title}</p>
        </div>

        <div className="space-y-10">
          <div>
            <h2 className="text-lg font-bold uppercase tracking-widest border-b-2 border-white/20 pb-2 mb-4">Contact</h2>
            <div className="space-y-4 text-white/90 text-sm">
              <p>{resumeData.personal.phone}</p>
              <p className="break-all">{resumeData.personal.email}</p>
              <p>{resumeData.personal.location}</p>
              <p className="break-all">{resumeData.personal.website}</p>
            </div>
          </div>

          {resumeData.skills.length > 0 && resumeData.skills[0] !== "" && (
            <div>
              <h2 className="text-lg font-bold uppercase tracking-widest border-b-2 border-white/20 pb-2 mb-4">Skills</h2>
              <ul className="list-disc list-outside ml-4 text-white/90 text-sm space-y-2">
                {resumeData.skills.map((s, i) => <li key={i}>{s.trim()}</li>)}
              </ul>
            </div>
          )}

          {resumeData.certifications.length > 0 && (
            <div>
              <h2 className="text-lg font-bold uppercase tracking-widest border-b-2 border-white/20 pb-2 mb-4">Certificates</h2>
              <div className="space-y-4 text-white/90 text-sm">
                {resumeData.certifications.map(c => (
                  <div key={c.id}>
                    <p className="font-bold">{c.name}</p>
                    <p className="text-white/70 mt-1">{c.issuer} • {c.year}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Main Content */}
      <div className="w-[65%] p-10 bg-white">
        {resumeData.personal.summary && (
          <div className="mb-10">
            <h2 className="text-xl font-black uppercase tracking-widest mb-4" style={{ color: theme.color }}>Profile</h2>
            <p className="text-gray-700 leading-relaxed text-justify">{resumeData.personal.summary}</p>
          </div>
        )}

        {resumeData.experience.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-black uppercase tracking-widest mb-5" style={{ color: theme.color }}>Experience</h2>
            <div className="space-y-8">
              {resumeData.experience.map(exp => (
                <div key={exp.id}>
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{exp.role}</h3>
                  <div className="flex justify-between text-sm font-semibold text-gray-500 mb-3">
                    <span style={{ color: theme.color }}>{exp.company}</span>
                    <span>{exp.duration}</span>
                  </div>
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {resumeData.education.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-black uppercase tracking-widest mb-5" style={{ color: theme.color }}>Education</h2>
            <div className="space-y-6">
              {resumeData.education.map(edu => (
                <div key={edu.id}>
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{edu.degree}</h3>
                  <div className="flex justify-between text-sm text-gray-600 font-medium">
                    <span>{edu.school}</span>
                    <span>{edu.year}</span>
                  </div>
                  {edu.grade && <p className="text-sm text-gray-800 mt-2 font-bold">Score: {edu.grade}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {resumeData.projects.length > 0 && (
          <div>
            <h2 className="text-xl font-black uppercase tracking-widest mb-5" style={{ color: theme.color }}>Projects</h2>
            <div className="space-y-6">
              {resumeData.projects.map(proj => (
                <div key={proj.id}>
                  <div className="flex items-baseline gap-2 mb-2">
                    <h3 className="font-bold text-gray-900 text-lg">{proj.title}</h3>
                    {proj.link && <span className="text-sm text-gray-400">| {proj.link}</span>}
                  </div>
                  <p className="text-gray-700 leading-relaxed">{proj.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const TemplateStudent = () => (
    <div className={`p-12 ${fontClassMap[theme.font as keyof typeof fontClassMap]} ${sizeClassMap[theme.size]} bg-white h-full`}>
      <div className="border-b-4 pb-8 mb-8" style={{ borderColor: theme.color }}>
        <h1 className="text-5xl font-black text-gray-900 tracking-tight mb-3" style={{ color: theme.color }}>{resumeData.personal.fullName}</h1>
        <p className="text-xl text-gray-700 font-medium mb-4">{resumeData.personal.title}</p>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-500 font-semibold">
          {resumeData.personal.email && <span>{resumeData.personal.email}</span>}
          {resumeData.personal.phone && <span>• {resumeData.personal.phone}</span>}
          {resumeData.personal.location && <span>• {resumeData.personal.location}</span>}
          {resumeData.personal.website && <span>• {resumeData.personal.website}</span>}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-10">
        {/* Left Col: Education & Skills */}
        <div className="col-span-1 space-y-10">
          {resumeData.education.length > 0 && (
            <div>
              <h2 className="text-lg font-black uppercase tracking-wider mb-5" style={{ color: theme.color }}>Education</h2>
              <div className="space-y-6">
                {resumeData.education.map(edu => (
                  <div key={edu.id}>
                    <div className="font-bold text-gray-900 leading-tight mb-1">{edu.degree}</div>
                    <div className="text-sm text-gray-600 mb-2 leading-tight">{edu.school}</div>
                    <div className="text-xs font-bold px-2.5 py-1 bg-gray-100 rounded inline-block text-gray-600 mb-1">{edu.year}</div>
                    {edu.grade && <div className="text-sm font-bold text-gray-800 mt-1">Score: {edu.grade}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {resumeData.skills.length > 0 && resumeData.skills[0] !== "" && (
            <div>
              <h2 className="text-lg font-black uppercase tracking-wider mb-5" style={{ color: theme.color }}>Technical Skills</h2>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill, index) => (
                  <span key={index} className="px-3 py-1.5 bg-slate-100 text-slate-800 rounded-md text-sm font-bold">
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {resumeData.certifications.length > 0 && (
            <div>
              <h2 className="text-lg font-black uppercase tracking-wider mb-5" style={{ color: theme.color }}>Certifications</h2>
              <div className="space-y-4">
                {resumeData.certifications.map(c => (
                  <div key={c.id}>
                    <p className="font-bold text-gray-900 text-sm leading-tight mb-1">{c.name}</p>
                    <p className="text-xs font-medium text-gray-500">{c.issuer} ({c.year})</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Col: Summary, Projects, Experience */}
        <div className="col-span-2 space-y-10">
          {resumeData.personal.summary && (
            <div>
              <h2 className="text-lg font-black uppercase tracking-wider mb-4" style={{ color: theme.color }}>Profile</h2>
              <p className="text-gray-700 leading-relaxed text-justify">{resumeData.personal.summary}</p>
            </div>
          )}

          {resumeData.projects.length > 0 && (
            <div>
              <h2 className="text-lg font-black uppercase tracking-wider mb-5" style={{ color: theme.color }}>Academic Projects</h2>
              <div className="space-y-6">
                {resumeData.projects.map(proj => (
                  <div key={proj.id} className="relative pl-5 border-l-4" style={{ borderColor: theme.color }}>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold text-gray-900 text-lg">{proj.title}</h3>
                      {proj.link && <span className="text-xs text-gray-400 font-mono">[{proj.link}]</span>}
                    </div>
                    <p className="text-gray-700 leading-relaxed">{proj.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {resumeData.experience.length > 0 && (
            <div>
              <h2 className="text-lg font-black uppercase tracking-wider mb-5" style={{ color: theme.color }}>Internships & Experience</h2>
              <div className="space-y-6">
                {resumeData.experience.map(exp => (
                  <div key={exp.id}>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">{exp.role} <span className="text-gray-500 font-medium">at {exp.company}</span></h3>
                    <div className="text-sm text-gray-500 font-bold mb-3 uppercase tracking-wider">{exp.duration}</div>
                    <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {resumeData.achievements.length > 0 && (
            <div>
              <h2 className="text-lg font-black uppercase tracking-wider mb-4" style={{ color: theme.color }}>Achievements</h2>
              <ul className="list-disc list-outside ml-5 text-gray-700 space-y-2">
                {resumeData.achievements.map(ach => (
                  <li key={ach.id} className="leading-relaxed">{ach.description}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const TemplateProfessional = () => (
    <div className={`p-12 ${fontClassMap[theme.font as keyof typeof fontClassMap]} ${sizeClassMap[theme.size]} bg-white h-full`}>
      <div className="text-center border-b-2 pb-6 mb-8" style={{ borderColor: theme.color }}>
        <h1 className="text-4xl font-black uppercase tracking-widest text-slate-900 mb-2">{resumeData.personal.fullName}</h1>
        <h2 className="text-lg font-bold uppercase tracking-widest mb-4" style={{ color: theme.color }}>{resumeData.personal.title}</h2>
        <div className="flex justify-center flex-wrap gap-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
          {resumeData.personal.email && <span>{resumeData.personal.email}</span>}
          {resumeData.personal.phone && <span>| {resumeData.personal.phone}</span>}
          {resumeData.personal.location && <span>| {resumeData.personal.location}</span>}
          {resumeData.personal.website && <span>| {resumeData.personal.website}</span>}
        </div>
      </div>

      {resumeData.personal.summary && (
        <div className="mb-8 text-center max-w-4xl mx-auto">
          <p className="text-slate-700 italic text-justify leading-relaxed">"{resumeData.personal.summary}"</p>
        </div>
      )}

      {resumeData.experience.length > 0 && (
        <div className="mb-10">
          <h3 className="text-lg font-black uppercase tracking-widest border-b-2 pb-2 mb-5" style={{ color: theme.color, borderColor: theme.color }}>Professional Experience</h3>
          <div className="space-y-8">
            {resumeData.experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-end mb-1">
                  <h4 className="font-bold text-slate-900 text-lg">{exp.role}</h4>
                  <span className="text-sm font-bold text-slate-500">{exp.duration}</span>
                </div>
                <div className="text-sm font-bold text-slate-700 mb-3 uppercase tracking-wide">{exp.company}</div>
                <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-10">
        <div>
          {resumeData.education.length > 0 && (
            <div className="mb-10">
              <h3 className="text-lg font-black uppercase tracking-widest border-b-2 pb-2 mb-5" style={{ color: theme.color, borderColor: theme.color }}>Education</h3>
              <div className="space-y-6">
                {resumeData.education.map(edu => (
                  <div key={edu.id}>
                    <h4 className="font-bold text-slate-900 text-[16px] mb-1">{edu.degree}</h4>
                    <div className="text-sm text-slate-700 mb-2">{edu.school}</div>
                    <div className="flex justify-between mt-1 text-sm font-bold text-slate-500">
                      <span>{edu.year}</span>
                      <span className="text-slate-800">{edu.grade}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {resumeData.certifications.length > 0 && (
            <div>
              <h3 className="text-lg font-black uppercase tracking-widest border-b-2 pb-2 mb-5" style={{ color: theme.color, borderColor: theme.color }}>Certifications</h3>
              <div className="space-y-4">
                {resumeData.certifications.map(c => (
                  <div key={c.id}>
                    <p className="font-bold text-slate-800 text-[15px]">{c.name}</p>
                    <p className="text-sm font-medium text-slate-500 mt-1">{c.issuer} • {c.year}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          {resumeData.skills.length > 0 && resumeData.skills[0] !== "" && (
            <div className="mb-10">
              <h3 className="text-lg font-black uppercase tracking-widest border-b-2 pb-2 mb-5" style={{ color: theme.color, borderColor: theme.color }}>Core Competencies</h3>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-3">
                {resumeData.skills.map((skill, index) => (
                  <li key={index} className="text-slate-800 font-medium flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.color }}></span>
                    {skill.trim()}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {resumeData.projects.length > 0 && (
            <div>
              <h3 className="text-lg font-black uppercase tracking-widest border-b-2 pb-2 mb-5" style={{ color: theme.color, borderColor: theme.color }}>Key Projects</h3>
              <div className="space-y-6">
                {resumeData.projects.map(proj => (
                  <div key={proj.id}>
                    <h4 className="font-bold text-slate-900 text-[16px] mb-1">{proj.title}</h4>
                    <p className="text-slate-700 leading-relaxed">{proj.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const TemplateFresher = () => (
    <div className={`p-12 ${fontClassMap[theme.font as keyof typeof fontClassMap]} ${sizeClassMap[theme.size]} bg-white border-t-[16px] h-full`} style={{ borderColor: theme.color }}>
      <div className="mb-10">
        <h1 className="text-5xl font-black text-slate-900 tracking-tight mb-3">{resumeData.personal.fullName}</h1>
        <p className="text-xl font-bold mb-4 text-slate-600">{resumeData.personal.title}</p>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-slate-500 mt-4">
          {resumeData.personal.email && <span className="flex items-center gap-2"><Mail size={16} style={{ color: theme.color }}/> {resumeData.personal.email}</span>}
          {resumeData.personal.phone && <span className="flex items-center gap-2"><Phone size={16} style={{ color: theme.color }}/> {resumeData.personal.phone}</span>}
          {resumeData.personal.location && <span className="flex items-center gap-2"><MapPin size={16} style={{ color: theme.color }}/> {resumeData.personal.location}</span>}
          {resumeData.personal.website && <span className="flex items-center gap-2"><Globe size={16} style={{ color: theme.color }}/> {resumeData.personal.website}</span>}
        </div>
      </div>

      {resumeData.personal.summary && (
        <div className="mb-10 bg-slate-50 p-6 rounded-2xl border border-slate-100">
          <p className="text-slate-800 leading-relaxed font-medium text-justify">{resumeData.personal.summary}</p>
        </div>
      )}

      {/* Fresher Layout prioritizes Education & Skills over Experience */}
      <div className="grid grid-cols-2 gap-10 mb-10">
        <div>
          <h2 className="text-lg font-black uppercase tracking-widest border-b-2 pb-3 mb-6" style={{ borderColor: theme.color, color: theme.color }}>Education</h2>
          <div className="space-y-6">
            {resumeData.education.map(edu => (
              <div key={edu.id} className="relative pl-5 border-l-2 border-slate-200">
                <div className="absolute w-3 h-3 rounded-full -left-[7px] top-1.5" style={{ backgroundColor: theme.color }}></div>
                <h3 className="font-bold text-slate-900 text-[16px] leading-snug mb-1">{edu.degree}</h3>
                <div className="text-slate-600 font-medium mb-2">{edu.school}</div>
                <div className="flex gap-4 text-sm font-bold text-slate-400 uppercase">
                  <span>{edu.year}</span>
                  {edu.grade && <span style={{ color: theme.color }}>Score: {edu.grade}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-black uppercase tracking-widest border-b-2 pb-3 mb-6" style={{ borderColor: theme.color, color: theme.color }}>Technical Skills</h2>
          <div className="flex flex-wrap gap-2.5">
            {resumeData.skills.map((skill, index) => (
              skill.trim() && (
                <span key={index} className="px-4 py-2 bg-slate-100 text-slate-800 rounded-xl text-[14px] font-bold border border-slate-200">
                  {skill.trim()}
                </span>
              )
            ))}
          </div>
        </div>
      </div>

      {resumeData.projects.length > 0 && (
        <div className="mb-10">
          <h2 className="text-lg font-black uppercase tracking-widest border-b-2 pb-3 mb-6" style={{ borderColor: theme.color, color: theme.color }}>Key Projects</h2>
          <div className="grid grid-cols-1 gap-5">
            {resumeData.projects.map(proj => (
              <div key={proj.id} className="p-6 border border-slate-200 rounded-2xl hover:shadow-md transition-shadow bg-white">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-slate-900 text-lg">{proj.title}</h3>
                  {proj.link && <span className="text-sm font-mono font-bold text-slate-400">{proj.link}</span>}
                </div>
                <p className="text-slate-700 leading-relaxed">{proj.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {resumeData.experience.length > 0 && (
        <div>
          <h2 className="text-lg font-black uppercase tracking-widest border-b-2 pb-3 mb-6" style={{ borderColor: theme.color, color: theme.color }}>Internships & Experience</h2>
          <div className="space-y-6">
            {resumeData.experience.map(exp => (
              <div key={exp.id} className="relative pl-5 border-l-2 border-slate-200">
                <div className="absolute w-3 h-3 rounded-full -left-[7px] top-1.5 bg-slate-300"></div>
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="font-bold text-slate-900 text-[16px]">{exp.role} <span className="font-normal text-slate-500">at {exp.company}</span></h3>
                  <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">{exp.duration}</span>
                </div>
                <p className="text-slate-700 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderTemplate = () => {
    switch(selectedTemplate) {
      case 'minimal': return <TemplateMinimal />;
      case 'modern': return <TemplateModern />;
      case 'student': return <TemplateStudent />;
      case 'professional': return <TemplateProfessional />;
      case 'fresher': return <TemplateFresher />;
      default: return <TemplateMinimal />;
    }
  };


  // =========================================================================
  // MAIN RENDER
  // =========================================================================

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">

      {/* MAIN CONTENT AREA - NO SIDEBAR */}
      <main className="flex-1 p-4 lg:p-8 h-screen flex flex-col overflow-hidden max-w-[1800px] mx-auto w-full">
        
        {/* HEADER BAR */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 shrink-0">
          <div className="flex items-center gap-4">
             <div className="bg-indigo-600 p-2.5 rounded-xl text-white hidden md:block">
               <FileText size={24}/>
             </div>
             <div>
               <h1 className="text-3xl font-extrabold text-slate-900">Resume Builder</h1>
               <p className="text-slate-500 text-sm mt-1">Create, customize, and download a professional ATS-friendly resume.</p>
             </div>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-full text-sm font-bold hover:bg-slate-50 transition-all shadow-sm">
              <ChevronLeft size={18} /> Back to Dashboard
            </button>
            <button 
              onClick={handlePrint}
              className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-full text-sm font-bold hover:bg-indigo-700 transition-all shadow-md"
            >
              <Printer size={18} /> Download PDF
            </button>
          </div>
        </div>

        {/* RESUME BUILDER SPLIT VIEW */}
        <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
          
          {/* LEFT PANEL - CONFIGURATION */}
          <div className="w-full lg:w-[45%] bg-white rounded-[2rem] shadow-sm border border-slate-200 flex flex-col overflow-hidden shrink-0">
            
            {/* Editor Tabs */}
            <div className="flex border-b border-slate-100 shrink-0">
              <button onClick={() => setEditorTab('content')} className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${editorTab === 'content' ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/30' : 'text-slate-500 hover:bg-slate-50'}`}>
                <FileText size={16} /> Content
              </button>
              <button onClick={() => setEditorTab('templates')} className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${editorTab === 'templates' ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/30' : 'text-slate-500 hover:bg-slate-50'}`}>
                <LayoutTemplate size={16} /> Templates
              </button>
              <button onClick={() => setEditorTab('design')} className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${editorTab === 'design' ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/30' : 'text-slate-500 hover:bg-slate-50'}`}>
                <Palette size={16} /> Design
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
              
              {/* ======================= TAB: CONTENT ======================= */}
              {editorTab === 'content' && (
                <div className="space-y-8 pb-10">
                  {/* Personal Details */}
                  <div className="space-y-4">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2 uppercase tracking-wider text-xs">
                      <User size={16} className="text-indigo-500"/> Personal Information
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" placeholder="Full Name" value={resumeData.personal.fullName} onChange={(e) => updatePersonal('fullName', e.target.value)} className="p-3 border border-slate-200 bg-slate-50 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-medium" />
                      <input type="text" placeholder="Job Title / Course" value={resumeData.personal.title} onChange={(e) => updatePersonal('title', e.target.value)} className="p-3 border border-slate-200 bg-slate-50 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-medium" />
                      <input type="email" placeholder="Email" value={resumeData.personal.email} onChange={(e) => updatePersonal('email', e.target.value)} className="p-3 border border-slate-200 bg-slate-50 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-medium" />
                      <input type="text" placeholder="Phone" value={resumeData.personal.phone} onChange={(e) => updatePersonal('phone', e.target.value)} className="p-3 border border-slate-200 bg-slate-50 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-medium" />
                      <input type="text" placeholder="Location" value={resumeData.personal.location} onChange={(e) => updatePersonal('location', e.target.value)} className="p-3 border border-slate-200 bg-slate-50 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-medium" />
                      <input type="text" placeholder="Website / LinkedIn" value={resumeData.personal.website} onChange={(e) => updatePersonal('website', e.target.value)} className="p-3 border border-slate-200 bg-slate-50 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-medium" />
                      <textarea placeholder="Professional Summary" value={resumeData.personal.summary} onChange={(e) => updatePersonal('summary', e.target.value)} className="col-span-2 p-3 border border-slate-200 bg-slate-50 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none h-24 resize-none text-sm font-medium leading-relaxed" />
                    </div>
                  </div>

                  <hr className="border-slate-100" />

                  {/* Education */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-slate-800 flex items-center gap-2 uppercase tracking-wider text-xs">
                        <GraduationCap size={16} className="text-indigo-500"/> Education
                      </h3>
                      <button onClick={() => addItem('education')} className="text-indigo-600 hover:bg-indigo-50 p-1.5 rounded-full transition-colors"><Plus size={18} /></button>
                    </div>
                    <AnimatePresence>
                      {resumeData.education.map((edu) => (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, height: 0 }} key={edu.id} className="p-5 bg-slate-50 border border-slate-100 rounded-2xl space-y-3 relative group">
                          <button onClick={() => removeArrayItem('education', edu.id)} className="absolute top-3 right-3 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16} /></button>
                          <div className="grid grid-cols-2 gap-3">
                            <input type="text" placeholder="School / College" value={edu.school} onChange={(e) => updateArrayItem('education', edu.id, 'school', e.target.value)} className="col-span-2 p-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-400" />
                            <input type="text" placeholder="Degree / Course" value={edu.degree} onChange={(e) => updateArrayItem('education', edu.id, 'degree', e.target.value)} className="col-span-2 p-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-400" />
                            <input type="text" placeholder="Year (e.g. 2022-2025)" value={edu.year} onChange={(e) => updateArrayItem('education', edu.id, 'year', e.target.value)} className="p-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-400" />
                            <input type="text" placeholder="Grade / CGPA" value={edu.grade} onChange={(e) => updateArrayItem('education', edu.id, 'grade', e.target.value)} className="p-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-400" />
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  <hr className="border-slate-100" />

                  {/* Skills */}
                  <div className="space-y-4">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2 uppercase tracking-wider text-xs">
                      <Code size={16} className="text-indigo-500"/> Skills
                    </h3>
                    <textarea placeholder="Enter skills separated by commas (e.g. React, Node.js, Python)" value={resumeData.skills.join(', ')} onChange={(e) => updateSkills(e.target.value)} className="w-full p-3 border border-slate-200 bg-slate-50 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none h-24 resize-none text-sm font-medium" />
                  </div>

                  <hr className="border-slate-100" />

                  {/* Experience */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-slate-800 flex items-center gap-2 uppercase tracking-wider text-xs">
                        <Briefcase size={16} className="text-indigo-500"/> Experience / Internships
                      </h3>
                      <button onClick={() => addItem('experience')} className="text-indigo-600 hover:bg-indigo-50 p-1.5 rounded-full transition-colors"><Plus size={18} /></button>
                    </div>
                    <AnimatePresence>
                      {resumeData.experience.map((exp) => (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, height: 0 }} key={exp.id} className="p-5 bg-slate-50 border border-slate-100 rounded-2xl space-y-3 relative group">
                          <button onClick={() => removeArrayItem('experience', exp.id)} className="absolute top-3 right-3 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16} /></button>
                          <div className="grid grid-cols-2 gap-3">
                            <input type="text" placeholder="Company / Organization" value={exp.company} onChange={(e) => updateArrayItem('experience', exp.id, 'company', e.target.value)} className="p-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-400" />
                            <input type="text" placeholder="Role / Position" value={exp.role} onChange={(e) => updateArrayItem('experience', exp.id, 'role', e.target.value)} className="p-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-400" />
                            <input type="text" placeholder="Duration (e.g. Jan 2024 - Present)" value={exp.duration} onChange={(e) => updateArrayItem('experience', exp.id, 'duration', e.target.value)} className="col-span-2 p-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-400" />
                            <textarea placeholder="Description & Achievements" value={exp.description} onChange={(e) => updateArrayItem('experience', exp.id, 'description', e.target.value)} className="col-span-2 p-2.5 border border-slate-200 rounded-lg text-sm h-24 resize-none outline-none focus:border-indigo-400" />
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  <hr className="border-slate-100" />

                  {/* Projects */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-slate-800 flex items-center gap-2 uppercase tracking-wider text-xs">
                        <Layout size={16} className="text-indigo-500"/> Projects
                      </h3>
                      <button onClick={() => addItem('projects')} className="text-indigo-600 hover:bg-indigo-50 p-1.5 rounded-full transition-colors"><Plus size={18} /></button>
                    </div>
                    <AnimatePresence>
                      {resumeData.projects.map((proj) => (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, height: 0 }} key={proj.id} className="p-5 bg-slate-50 border border-slate-100 rounded-2xl space-y-3 relative group">
                          <button onClick={() => removeArrayItem('projects', proj.id)} className="absolute top-3 right-3 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16} /></button>
                          <div className="grid grid-cols-2 gap-3">
                            <input type="text" placeholder="Project Title" value={proj.title} onChange={(e) => updateArrayItem('projects', proj.id, 'title', e.target.value)} className="p-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-400" />
                            <input type="text" placeholder="Link / URL" value={proj.link} onChange={(e) => updateArrayItem('projects', proj.id, 'link', e.target.value)} className="p-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-400" />
                            <textarea placeholder="Project Description" value={proj.description} onChange={(e) => updateArrayItem('projects', proj.id, 'description', e.target.value)} className="col-span-2 p-2.5 border border-slate-200 rounded-lg text-sm h-24 resize-none outline-none focus:border-indigo-400" />
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                  
                  <hr className="border-slate-100" />

                  {/* Certifications */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-slate-800 flex items-center gap-2 uppercase tracking-wider text-xs">
                        <Award size={16} className="text-indigo-500"/> Certifications
                      </h3>
                      <button onClick={() => addItem('certifications')} className="text-indigo-600 hover:bg-indigo-50 p-1.5 rounded-full transition-colors"><Plus size={18} /></button>
                    </div>
                    <AnimatePresence>
                      {resumeData.certifications.map((cert) => (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, height: 0 }} key={cert.id} className="p-5 bg-slate-50 border border-slate-100 rounded-2xl space-y-3 relative group">
                          <button onClick={() => removeArrayItem('certifications', cert.id)} className="absolute top-3 right-3 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16} /></button>
                          <div className="grid grid-cols-3 gap-3">
                            <input type="text" placeholder="Certificate Name" value={cert.name} onChange={(e) => updateArrayItem('certifications', cert.id, 'name', e.target.value)} className="col-span-3 p-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-400" />
                            <input type="text" placeholder="Issuer" value={cert.issuer} onChange={(e) => updateArrayItem('certifications', cert.id, 'issuer', e.target.value)} className="col-span-2 p-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-400" />
                            <input type="text" placeholder="Year" value={cert.year} onChange={(e) => updateArrayItem('certifications', cert.id, 'year', e.target.value)} className="p-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-400" />
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                  
                  <hr className="border-slate-100" />

                  {/* Achievements */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-slate-800 flex items-center gap-2 uppercase tracking-wider text-xs">
                        <Sparkles size={16} className="text-indigo-500"/> Key Achievements
                      </h3>
                      <button onClick={() => addItem('achievements')} className="text-indigo-600 hover:bg-indigo-50 p-1.5 rounded-full transition-colors"><Plus size={18} /></button>
                    </div>
                    <AnimatePresence>
                      {resumeData.achievements.map((ach) => (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, height: 0 }} key={ach.id} className="relative group">
                          <input type="text" placeholder="e.g., Won 1st place in National Hackathon 2024" value={ach.description} onChange={(e) => updateArrayItem('achievements', ach.id, 'description', e.target.value)} className="w-full p-3 pr-10 border border-slate-200 bg-slate-50 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-medium" />
                          <button onClick={() => removeArrayItem('achievements', ach.id)} className="absolute top-1/2 -translate-y-1/2 right-3 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16} /></button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              )}

              {/* ======================= TAB: TEMPLATES ======================= */}
              {editorTab === 'templates' && (
                <div className="space-y-6 pb-10">
                  
                  {/* Smart Recommendation Banner */}
                  <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5 mb-8">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles size={18} className="text-indigo-600" />
                      <h3 className="font-bold text-indigo-900">Recommended for You</h3>
                    </div>
                    <p className="text-sm text-indigo-700 mb-4">Based on your profile ({userProfile.course} {userProfile.type}), we suggest these ATS-friendly templates that highlight education and projects.</p>
                    <div className="flex gap-3">
                      {templates.filter(t => t.isRecommended).map(t => (
                         <button key={`rec-${t.id}`} onClick={() => setSelectedTemplate(t.id)} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm border ${selectedTemplate === t.id ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-indigo-700 border-indigo-200 hover:bg-indigo-100'}`}>
                           Try {t.name}
                         </button>
                      ))}
                    </div>
                  </div>

                  <h3 className="font-black text-slate-800 uppercase tracking-wider text-xs mb-4">Template Gallery</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {templates.map(template => (
                      <div 
                        key={template.id}
                        onClick={() => setSelectedTemplate(template.id)}
                        className={`cursor-pointer rounded-2xl border-2 transition-all p-1 ${selectedTemplate === template.id ? 'border-indigo-600 shadow-md' : 'border-transparent hover:border-slate-200'}`}
                      >
                        <div className={`h-32 rounded-xl ${template.preview} mb-3 flex flex-col p-2 relative overflow-hidden`}>
                           {selectedTemplate === template.id && (
                             <div className="absolute top-2 right-2 bg-indigo-600 text-white rounded-full p-0.5"><CheckCircle2 size={16}/></div>
                           )}
                           <div className="w-1/2 h-2 bg-black/10 rounded mb-2"></div>
                           <div className="w-1/3 h-1.5 bg-black/10 rounded mb-4"></div>
                           <div className="w-full h-1.5 bg-black/5 rounded mb-1"></div>
                           <div className="w-full h-1.5 bg-black/5 rounded mb-1"></div>
                           <div className="w-4/5 h-1.5 bg-black/5 rounded"></div>
                        </div>
                        <h4 className="font-bold text-slate-800 text-sm px-1">{template.name}</h4>
                        <p className="text-[10px] text-slate-500 font-medium px-1 mb-1">{template.type}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ======================= TAB: DESIGN ======================= */}
              {editorTab === 'design' && (
                <div className="space-y-8 pb-10">
                  
                  <div>
                    <h3 className="font-bold text-slate-800 flex items-center gap-2 uppercase tracking-wider text-xs mb-4">
                      <Palette size={16} className="text-indigo-500"/> Theme Color
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {['#4f46e5', '#2563eb', '#0ea5e9', '#0d9488', '#059669', '#16a34a', '#ca8a04', '#ea580c', '#dc2626', '#e11d48', '#db2777', '#9333ea', '#000000', '#334155'].map(color => (
                        <button
                          key={color}
                          onClick={() => setTheme(prev => ({ ...prev, color }))}
                          className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${theme.color === color ? 'border-white ring-2 ring-indigo-500 scale-110 shadow-md' : 'border-transparent'}`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>

                  <hr className="border-slate-100" />

                  <div>
                    <h3 className="font-bold text-slate-800 flex items-center gap-2 uppercase tracking-wider text-xs mb-4">
                      <FileText size={16} className="text-indigo-500"/> Font Family
                    </h3>
                    <div className="grid grid-cols-1 gap-3">
                      {[
                        { id: 'font-sans', label: 'Modern Sans (Inter)' },
                        { id: 'font-serif', label: 'Classic Serif (Merriweather)' },
                        { id: 'font-mono', label: 'Technical Mono (Fira Code)' }
                      ].map(font => (
                        <button
                          key={font.id}
                          onClick={() => setTheme(prev => ({ ...prev, font: font.id }))}
                          className={`p-4 rounded-xl border text-left flex justify-between items-center transition-all ${theme.font === font.id ? 'border-indigo-600 bg-indigo-50/50 shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300'}`}
                        >
                          <span className={`text-sm font-semibold ${font.id}`}>{font.label}</span>
                          {theme.font === font.id && <CheckCircle2 size={18} className="text-indigo-600" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  <hr className="border-slate-100" />

                  <div>
                    <h3 className="font-bold text-slate-800 flex items-center gap-2 uppercase tracking-wider text-xs mb-4">
                      <Layout size={16} className="text-indigo-500"/> Text Size
                    </h3>
                    <div className="flex bg-slate-100 p-1.5 rounded-xl">
                      {[
                        { id: 'sm', label: 'Compact' },
                        { id: 'base', label: 'Standard' },
                        { id: 'lg', label: 'Spacious' }
                      ].map(size => (
                        <button
                          key={size.id}
                          onClick={() => setTheme(prev => ({ ...prev, size: size.id as any }))}
                          className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${theme.size === size.id ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                        >
                          {size.label}
                        </button>
                      ))}
                    </div>
                  </div>

                </div>
              )}

            </div>
          </div>

          {/* RIGHT PANEL - LIVE PREVIEW WITH SCALER */}
          <div className="w-full lg:w-[55%] bg-slate-200/50 rounded-[2rem] py-8 overflow-y-auto shadow-inner custom-scrollbar flex justify-center border border-slate-200 relative">
            
            {/* Zoom / Scale Container to fit A4 ratio inside the screen without massive horizontal scrolling */}
            <div className="transform origin-top scale-[0.6] md:scale-[0.7] xl:scale-[0.8] 2xl:scale-[0.9] transition-transform flex justify-center w-full pb-32">
              <div 
                ref={previewRef}
                className="bg-white w-[210mm] h-[297mm] overflow-hidden shadow-2xl relative text-black print:shadow-none box-border shrink-0"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {renderTemplate()}
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}