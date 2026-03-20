import { useState } from 'react';
import { 
  Map, ChevronRight, BookOpen, Award, Briefcase, 
  GraduationCap, Code, Stethoscope, Calculator, PenTool, 
  Globe, Shield, Database, Smartphone, Server, Cpu, 
  Layout, Terminal, Cloud, Lock, Anchor, Users, 
  TrendingUp, Building2, Gavel, FileText, Camera,
  Search, Brain, Monitor, Gamepad2, HardDrive, Wifi, 
  CheckSquare, Headset, Settings
} from 'lucide-react';
import { motion } from 'framer-motion';

interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  icon: any;
  duration?: string;
  skills?: string[];
  exams?: string[];
}

type CareerCategory = 
  | 'STEM & Technology' 
  | 'Medical & Healthcare' 
  | 'Business & Finance' 
  | 'Arts & Humanities' 
  | 'Creative & Design' 
  | 'Sports & Physical' 
  | 'Government & Civil Services' 
  | 'Vocational & Skilled' 
  | 'Green & Sustainability' 
  | 'Emerging & Specialized';

interface CareerPath {
  id: string;
  title: string;
  group: CareerCategory;
  icon: any;
  color: string;
  description: string;
  salary: string;
  growth: string;
  steps: RoadmapStep[];
}

export default function CareerRoadmap() {
  const [selectedPath, setSelectedPath] = useState<CareerPath | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeGroup, setActiveGroup] = useState<CareerCategory | 'All'>('All');

  // Helper to generate generic steps
  const getGenericSteps = (title: string): RoadmapStep[] => [
    {
      id: 'step1',
      title: 'Foundations & Education',
      description: `Complete relevant degrees and learn the core concepts of ${title}.`,
      icon: BookOpen,
      duration: '3-4 Years'
    },
    {
      id: 'step2',
      title: 'Specialized Skills',
      description: 'Master advanced topics, tools, and industry standards.',
      icon: Code,
      duration: '6-12 Months'
    },
    {
      id: 'step3',
      title: 'Practical Experience',
      description: 'Build real-world projects, internships, or articleships.',
      icon: Briefcase,
      duration: '6-12 Months'
    },
    {
      id: 'step4',
      title: 'Professional Career',
      description: 'Enter the industry as a certified/qualified professional.',
      icon: Award
    }
  ];

  const careerPaths: CareerPath[] = [
    // ==========================================
    // 1. STEM & TECHNOLOGY
    // ==========================================
    { id: 'cs-it', title: 'Computer Science & IT', group: 'STEM & Technology', icon: Server, color: 'bg-blue-600', description: 'Core computer science, networking, and IT systems.', salary: '₹4L - ₹20L', growth: 'High', steps: getGenericSteps('Computer Science & IT') },
    { id: 'ai-ml', title: 'Artificial Intelligence / ML', group: 'STEM & Technology', icon: Brain, color: 'bg-purple-600', description: 'Build predictive models and intelligent algorithms.', salary: '₹10L - ₹40L', growth: 'Explosive', steps: getGenericSteps('Artificial Intelligence') },
    { id: 'data-science', title: 'Data Science & Analytics', group: 'STEM & Technology', icon: Database, color: 'bg-teal-600', description: 'Analyze big data to drive business decisions.', salary: '₹8L - ₹35L', growth: 'Very High', steps: getGenericSteps('Data Science') },
    { id: 'cybersecurity', title: 'Cybersecurity / Ethical Hacking', group: 'STEM & Technology', icon: Shield, color: 'bg-red-600', description: 'Protect networks and digital assets from threats.', salary: '₹7L - ₹30L', growth: 'Very High', steps: getGenericSteps('Cybersecurity') },
    { id: 'software-dev', title: 'Software Development', group: 'STEM & Technology', icon: Code, color: 'bg-blue-500', description: 'Design and build software applications.', salary: '₹6L - ₹25L', growth: 'High', steps: getGenericSteps('Software Development') },
    { id: 'web-dev', title: 'Web Development', group: 'STEM & Technology', icon: Layout, color: 'bg-indigo-500', description: 'Create dynamic websites and web applications.', salary: '₹4L - ₹20L', growth: 'High', steps: getGenericSteps('Web Development') },
    { id: 'mobile-dev', title: 'Mobile App Development', group: 'STEM & Technology', icon: Smartphone, color: 'bg-green-500', description: 'Build native and cross-platform mobile apps.', salary: '₹5L - ₹22L', growth: 'High', steps: getGenericSteps('Mobile Development') },
    { id: 'robotics', title: 'Robotics & Automation', group: 'STEM & Technology', icon: Cpu, color: 'bg-zinc-600', description: 'Design and maintain robotic systems.', salary: '₹6L - ₹20L', growth: 'High', steps: getGenericSteps('Robotics') },
    { id: 'ec-eng', title: 'Electronics & Communication', group: 'STEM & Technology', icon: Cpu, color: 'bg-orange-500', description: 'Hardware, circuits, and communication networks.', salary: '₹4L - ₹15L', growth: 'Moderate', steps: getGenericSteps('Electronics & Communication') },
    { id: 'mech-eng', title: 'Mechanical Engineering', group: 'STEM & Technology', icon: Building2, color: 'bg-slate-600', description: 'Design, analyze, and manufacture machinery.', salary: '₹4L - ₹15L', growth: 'Moderate', steps: getGenericSteps('Mechanical Engineering') },
    { id: 'civil-eng', title: 'Civil Engineering', group: 'STEM & Technology', icon: Building2, color: 'bg-amber-600', description: 'Plan and build infrastructure and construction projects.', salary: '₹3L - ₹12L', growth: 'Stable', steps: getGenericSteps('Civil Engineering') },
    { id: 'elec-eng', title: 'Electrical Engineering', group: 'STEM & Technology', icon: Terminal, color: 'bg-yellow-600', description: 'Work with electrical systems and power generation.', salary: '₹4L - ₹14L', growth: 'Stable', steps: getGenericSteps('Electrical Engineering') },
    { id: 'aerospace', title: 'Aerospace / Aviation', group: 'STEM & Technology', icon: Globe, color: 'bg-sky-600', description: 'Design aircraft, spacecraft, and missiles.', salary: '₹8L - ₹25L', growth: 'High', steps: getGenericSteps('Aerospace Engineering') },
    { id: 'biotech', title: 'Biotechnology / Bioinformatics', group: 'STEM & Technology', icon: Stethoscope, color: 'bg-emerald-500', description: 'Merge biology with technology for healthcare and agriculture.', salary: '₹4L - ₹15L', growth: 'High', steps: getGenericSteps('Biotechnology') },
    { id: 'nanotech', title: 'Nanotechnology', group: 'STEM & Technology', icon: Database, color: 'bg-gray-700', description: 'Manipulate matter on an atomic and molecular scale.', salary: '₹6L - ₹20L', growth: 'High', steps: getGenericSteps('Nanotechnology') },
    { id: 'space-science', title: 'Space Science & Astronomy', group: 'STEM & Technology', icon: Globe, color: 'bg-indigo-700', description: 'Explore the universe, stars, and planetary systems.', salary: '₹7L - ₹25L', growth: 'Moderate', steps: getGenericSteps('Space Science') },
    { id: 'gaming', title: 'Gaming & Game Development', group: 'STEM & Technology', icon: Layout, color: 'bg-purple-500', description: 'Create interactive video games and virtual worlds.', salary: '₹5L - ₹20L', growth: 'Very High', steps: getGenericSteps('Game Development') },

    // ==========================================
    // 2. MEDICAL & HEALTHCARE
    // ==========================================
    { id: 'doctor', title: 'Doctor / Medical Specialist', group: 'Medical & Healthcare', icon: Stethoscope, color: 'bg-red-500', description: 'Diagnose and treat medical conditions (MBBS/MD).', salary: '₹8L - ₹30L+', growth: 'High', steps: getGenericSteps('Medical Practice') },
    { id: 'nursing', title: 'Nursing', group: 'Medical & Healthcare', icon: Users, color: 'bg-pink-500', description: 'Provide critical patient care in hospitals.', salary: '₹3L - ₹10L', growth: 'Stable', steps: getGenericSteps('Nursing') },
    { id: 'dentistry', title: 'Dentistry', group: 'Medical & Healthcare', icon: Stethoscope, color: 'bg-rose-400', description: 'Diagnose and treat dental and oral health issues.', salary: '₹4L - ₹15L', growth: 'Stable', steps: getGenericSteps('Dentistry') },
    { id: 'pharmacy', title: 'Pharmacy', group: 'Medical & Healthcare', icon: Stethoscope, color: 'bg-teal-500', description: 'Expertise in medicine formulation and dispensing.', salary: '₹3L - ₹12L', growth: 'Stable', steps: getGenericSteps('Pharmacy') },
    { id: 'physio', title: 'Physiotherapy', group: 'Medical & Healthcare', icon: Users, color: 'bg-orange-500', description: 'Physical rehabilitation and pain management.', salary: '₹4L - ₹15L', growth: 'High', steps: getGenericSteps('Physiotherapy') },
    { id: 'veterinary', title: 'Veterinary Science', group: 'Medical & Healthcare', icon: Stethoscope, color: 'bg-emerald-600', description: 'Medical care and treatment for animals.', salary: '₹4L - ₹12L', growth: 'Moderate', steps: getGenericSteps('Veterinary Science') },
    { id: 'public-health', title: 'Public Health Specialist', group: 'Medical & Healthcare', icon: Globe, color: 'bg-blue-400', description: 'Manage community health and disease prevention.', salary: '₹5L - ₹18L', growth: 'High', steps: getGenericSteps('Public Health') },
    { id: 'medical-research', title: 'Medical Researcher', group: 'Medical & Healthcare', icon: Database, color: 'bg-purple-500', description: 'Conduct research to understand diseases and treatments.', salary: '₹6L - ₹20L', growth: 'High', steps: getGenericSteps('Medical Research') },
    { id: 'health-tech', title: 'Healthcare Tech Specialist', group: 'Medical & Healthcare', icon: Cpu, color: 'bg-indigo-500', description: 'Manage hospital IT systems and health devices.', salary: '₹5L - ₹18L', growth: 'High', steps: getGenericSteps('Healthcare Technology') },
    { id: 'nutritionist', title: 'Nutritionist / Dietician', group: 'Medical & Healthcare', icon: Map, color: 'bg-lime-500', description: 'Advise patients on diet, health, and wellness.', salary: '₹3L - ₹12L', growth: 'High', steps: getGenericSteps('Nutrition') },
    { id: 'mental-health', title: 'Mental Health Counselor', group: 'Medical & Healthcare', icon: Brain, color: 'bg-fuchsia-500', description: 'Provide therapy and emotional support to patients.', salary: '₹4L - ₹15L', growth: 'Very High', steps: getGenericSteps('Mental Health Counseling') },

    // ==========================================
    // 3. BUSINESS, MANAGEMENT & FINANCE
    // ==========================================
    { id: 'business-admin', title: 'Business Administration', group: 'Business & Finance', icon: Briefcase, color: 'bg-amber-600', description: 'Manage corporate operations and strategies.', salary: '₹6L - ₹35L+', growth: 'High', steps: getGenericSteps('Business Administration') },
    { id: 'finance-acc', title: 'Finance & Accounting', group: 'Business & Finance', icon: Calculator, color: 'bg-green-600', description: 'Manage corporate budgets, financial planning, and audits.', salary: '₹5L - ₹20L', growth: 'Stable', steps: getGenericSteps('Finance & Accounting') },
    { id: 'ca', title: 'Chartered Accountant', group: 'Business & Finance', icon: FileText, color: 'bg-emerald-700', description: 'Certified expert in auditing, taxation, and accounting.', salary: '₹8L - ₹25L', growth: 'High', steps: getGenericSteps('Chartered Accountancy') },
    { id: 'cs', title: 'Company Secretary', group: 'Business & Finance', icon: Gavel, color: 'bg-teal-700', description: 'Ensure corporate compliance and legal governance.', salary: '₹6L - ₹18L', growth: 'Stable', steps: getGenericSteps('Company Secretary') },
    { id: 'economics', title: 'Economics / Data Economics', group: 'Business & Finance', icon: TrendingUp, color: 'bg-blue-600', description: 'Analyze market trends and financial policies.', salary: '₹7L - ₹22L', growth: 'High', steps: getGenericSteps('Economics') },
    { id: 'entrepreneur', title: 'Entrepreneurship / Startups', group: 'Business & Finance', icon: TrendingUp, color: 'bg-orange-500', description: 'Build businesses and solve real-world problems.', salary: 'Variable', growth: 'Explosive', steps: getGenericSteps('Entrepreneurship') },
    { id: 'marketing', title: 'Marketing & Sales', group: 'Business & Finance', icon: Users, color: 'bg-pink-500', description: 'Drive brand awareness and revenue generation.', salary: '₹4L - ₹20L', growth: 'High', steps: getGenericSteps('Marketing & Sales') },
    { id: 'hr', title: 'Human Resource Management', group: 'Business & Finance', icon: Users, color: 'bg-purple-500', description: 'Manage recruitment, talent, and employee relations.', salary: '₹4L - ₹18L', growth: 'Stable', steps: getGenericSteps('Human Resources') },
    { id: 'supply-chain', title: 'Supply Chain & Logistics', group: 'Business & Finance', icon: Anchor, color: 'bg-sky-600', description: 'Manage the global movement of goods and services.', salary: '₹5L - ₹20L', growth: 'High', steps: getGenericSteps('Supply Chain Management') },
    { id: 'intl-business', title: 'International Business', group: 'Business & Finance', icon: Globe, color: 'bg-indigo-600', description: 'Manage cross-border trade and global expansions.', salary: '₹7L - ₹25L', growth: 'High', steps: getGenericSteps('International Business') },
    { id: 'ecommerce', title: 'E-commerce / Digital Business', group: 'Business & Finance', icon: Smartphone, color: 'bg-blue-400', description: 'Run online retail platforms and digital sales.', salary: '₹5L - ₹22L', growth: 'Very High', steps: getGenericSteps('E-commerce') },

    // ==========================================
    // 4. ARTS, HUMANITIES & SOCIAL SCIENCES
    // ==========================================
    { id: 'psychology', title: 'Psychology / Counseling', group: 'Arts & Humanities', icon: Brain, color: 'bg-fuchsia-600', description: 'Study human behavior and provide clinical support.', salary: '₹4L - ₹18L', growth: 'Very High', steps: getGenericSteps('Psychology') },
    { id: 'sociology', title: 'Sociology / Social Work', group: 'Arts & Humanities', icon: Users, color: 'bg-orange-400', description: 'Study society and drive social welfare programs.', salary: '₹3L - ₹10L', growth: 'Stable', steps: getGenericSteps('Social Work') },
    { id: 'political-science', title: 'Political Science / Public Policy', group: 'Arts & Humanities', icon: Building2, color: 'bg-red-700', description: 'Analyze government systems and political behavior.', salary: '₹4L - ₹15L', growth: 'Moderate', steps: getGenericSteps('Political Science') },
    { id: 'history', title: 'History / Archaeology', group: 'Arts & Humanities', icon: Search, color: 'bg-amber-800', description: 'Study past civilizations and preserve artifacts.', salary: '₹3L - ₹12L', growth: 'Moderate', steps: getGenericSteps('History & Archaeology') },
    { id: 'philosophy', title: 'Philosophy', group: 'Arts & Humanities', icon: BookOpen, color: 'bg-slate-600', description: 'Study fundamental questions about existence and ethics.', salary: '₹3L - ₹10L', growth: 'Stable', steps: getGenericSteps('Philosophy') },
    { id: 'languages', title: 'Languages & Literature', group: 'Arts & Humanities', icon: PenTool, color: 'bg-teal-500', description: 'Expertise in linguistics, writing, and literature.', salary: '₹3L - ₹12L', growth: 'Moderate', steps: getGenericSteps('Languages & Literature') },
    { id: 'journalism', title: 'Journalism / Mass Communication', group: 'Arts & Humanities', icon: Camera, color: 'bg-blue-500', description: 'News reporting, media production, and broadcasting.', salary: '₹3L - ₹15L', growth: 'Moderate', steps: getGenericSteps('Journalism') },
    { id: 'law', title: 'Law / Legal Studies', group: 'Arts & Humanities', icon: Gavel, color: 'bg-stone-700', description: 'Practice law, corporate advisory, or judiciary.', salary: '₹5L - ₹30L+', growth: 'Moderate', steps: getGenericSteps('Law') },
    { id: 'criminology', title: 'Criminology / Forensic Science', group: 'Arts & Humanities', icon: Shield, color: 'bg-red-800', description: 'Analyze crime scenes and criminal behavior.', salary: '₹4L - ₹15L', growth: 'High', steps: getGenericSteps('Criminology') },
    { id: 'anthropology', title: 'Anthropology', group: 'Arts & Humanities', icon: Globe, color: 'bg-green-700', description: 'Study the development of human societies and cultures.', salary: '₹3L - ₹12L', growth: 'Moderate', steps: getGenericSteps('Anthropology') },
    { id: 'education', title: 'Education & Teaching', group: 'Arts & Humanities', icon: GraduationCap, color: 'bg-indigo-400', description: 'Shape the next generation as a teacher or professor.', salary: '₹3L - ₹15L', growth: 'Stable', steps: getGenericSteps('Education') },

    // ==========================================
    // 5. CREATIVE & DESIGN
    // ==========================================
    { id: 'graphic-design', title: 'Graphic Design', group: 'Creative & Design', icon: PenTool, color: 'bg-pink-500', description: 'Create visual content for branding and media.', salary: '₹3L - ₹12L', growth: 'High', steps: getGenericSteps('Graphic Design') },
    { id: 'ui-ux', title: 'UI / UX Design', group: 'Creative & Design', icon: Layout, color: 'bg-purple-600', description: 'Design user-friendly digital interfaces and experiences.', salary: '₹6L - ₹25L', growth: 'Very High', steps: getGenericSteps('UI/UX Design') },
    { id: 'fashion-design', title: 'Fashion Design', group: 'Creative & Design', icon: PenTool, color: 'bg-rose-500', description: 'Design clothing, apparel, and fashion accessories.', salary: '₹4L - ₹20L', growth: 'Moderate', steps: getGenericSteps('Fashion Design') },
    { id: 'interior-design', title: 'Interior Design', group: 'Creative & Design', icon: Map, color: 'bg-amber-500', description: 'Design functional and aesthetic indoor spaces.', salary: '₹4L - ₹18L', growth: 'High', steps: getGenericSteps('Interior Design') },
    { id: 'architecture', title: 'Architecture', group: 'Creative & Design', icon: Building2, color: 'bg-slate-700', description: 'Plan and design buildings and physical structures.', salary: '₹5L - ₹20L', growth: 'Stable', steps: getGenericSteps('Architecture') },
    { id: 'fine-arts', title: 'Fine Arts (Painting / Sculpture)', group: 'Creative & Design', icon: PenTool, color: 'bg-orange-400', description: 'Create original visual artwork.', salary: 'Variable', growth: 'Moderate', steps: getGenericSteps('Fine Arts') },
    { id: 'photography', title: 'Photography / Cinematography', group: 'Creative & Design', icon: Camera, color: 'bg-zinc-700', description: 'Capture still images and video for media and art.', salary: '₹3L - ₹15L', growth: 'High', steps: getGenericSteps('Photography') },
    { id: 'performing-arts', title: 'Performing Arts', group: 'Creative & Design', icon: Users, color: 'bg-red-400', description: 'Music, dance, theatre, and acting.', salary: 'Variable', growth: 'Moderate', steps: getGenericSteps('Performing Arts') },
    { id: 'film-production', title: 'Film & Media Production', group: 'Creative & Design', icon: Camera, color: 'bg-blue-600', description: 'Direct, produce, and edit film and television content.', salary: '₹4L - ₹25L', growth: 'High', steps: getGenericSteps('Film Production') },
    { id: 'content-writing', title: 'Content Writing / Blogging', group: 'Creative & Design', icon: FileText, color: 'bg-emerald-500', description: 'Write copy for websites, blogs, and marketing.', salary: '₹3L - ₹12L', growth: 'High', steps: getGenericSteps('Content Writing') },
    { id: 'animation-vfx', title: 'Animation & VFX', group: 'Creative & Design', icon: Layout, color: 'bg-indigo-500', description: 'Create 2D/3D animations and visual effects.', salary: '₹4L - ₹18L', growth: 'High', steps: getGenericSteps('Animation & VFX') },
    { id: 'advertising', title: 'Creative Advertising', group: 'Creative & Design', icon: TrendingUp, color: 'bg-yellow-500', description: 'Develop creative campaigns for brands and products.', salary: '₹4L - ₹18L', growth: 'High', steps: getGenericSteps('Advertising') },

    // ==========================================
    // 6. SPORTS & PHYSICAL CAREERS
    // ==========================================
    { id: 'pro-athlete', title: 'Professional Athlete', group: 'Sports & Physical', icon: Award, color: 'bg-yellow-600', description: 'Compete in professional sports at the highest level.', salary: 'Variable', growth: 'Moderate', steps: getGenericSteps('Professional Sports') },
    { id: 'fitness-trainer', title: 'Fitness Trainer / Gym Instructor', group: 'Sports & Physical', icon: Users, color: 'bg-orange-500', description: 'Guide clients in physical fitness and exercise routines.', salary: '₹3L - ₹10L', growth: 'High', steps: getGenericSteps('Fitness Training') },
    { id: 'sports-medicine', title: 'Sports Medicine Specialist', group: 'Sports & Physical', icon: Stethoscope, color: 'bg-red-500', description: 'Treat sports injuries and optimize athlete performance.', salary: '₹6L - ₹20L', growth: 'High', steps: getGenericSteps('Sports Medicine') },
    { id: 'pe-teacher', title: 'Physical Education Teacher', group: 'Sports & Physical', icon: GraduationCap, color: 'bg-blue-500', description: 'Teach sports and physical health in schools.', salary: '₹3L - ₹8L', growth: 'Stable', steps: getGenericSteps('Physical Education') },
    { id: 'sports-coach', title: 'Sports Coach', group: 'Sports & Physical', icon: Users, color: 'bg-indigo-600', description: 'Train and manage sports teams or individual athletes.', salary: '₹4L - ₹15L', growth: 'Moderate', steps: getGenericSteps('Sports Coaching') },
    { id: 'umpire', title: 'Umpire / Referee', group: 'Sports & Physical', icon: Gavel, color: 'bg-slate-700', description: 'Officiate sporting events and enforce rules.', salary: 'Variable', growth: 'Moderate', steps: getGenericSteps('Sports Officiating') },
    { id: 'yoga', title: 'Yoga Instructor', group: 'Sports & Physical', icon: Map, color: 'bg-teal-500', description: 'Teach yoga for physical and mental well-being.', salary: '₹3L - ₹12L', growth: 'High', steps: getGenericSteps('Yoga Instruction') },
    { id: 'adventure-guide', title: 'Adventure Sports Guide', group: 'Sports & Physical', icon: Map, color: 'bg-green-700', description: 'Lead outdoor activities like trekking, rafting, and climbing.', salary: '₹3L - ₹9L', growth: 'Moderate', steps: getGenericSteps('Adventure Sports') },
    { id: 'esports', title: 'Esports Player / Game Caster', group: 'Sports & Physical', icon: Layout, color: 'bg-purple-600', description: 'Compete in professional gaming or commentate matches.', salary: 'Variable', growth: 'Explosive', steps: getGenericSteps('Esports') },

    // ==========================================
    // 7. GOVERNMENT & CIVIL SERVICES
    // ==========================================
    { id: 'upsc', title: 'UPSC (IAS / IPS / IFS / IRS)', group: 'Government & Civil Services', icon: Building2, color: 'bg-amber-800', description: 'Top-tier civil services and administration.', salary: '₹56k - ₹2.5L/mo', growth: 'Prestige', steps: getGenericSteps('UPSC Civil Services') },
    { id: 'state-civil', title: 'State Civil Services', group: 'Government & Civil Services', icon: Building2, color: 'bg-orange-700', description: 'Administrative roles within state governments.', salary: '₹50k - ₹1.5L/mo', growth: 'Stable', steps: getGenericSteps('State Civil Services') },
    { id: 'defense', title: 'Defense Services (Army/Navy/AF)', group: 'Government & Civil Services', icon: Anchor, color: 'bg-emerald-700', description: 'Serve the nation as a commissioned officer.', salary: '₹7L - ₹15L', growth: 'Prestige', steps: getGenericSteps('Defense Services') },
    { id: 'police', title: 'Police Services', group: 'Government & Civil Services', icon: Shield, color: 'bg-blue-800', description: 'Maintain law, order, and public safety.', salary: '₹40k - ₹1L/mo', growth: 'Stable', steps: getGenericSteps('Police Services') },
    { id: 'railway', title: 'Railway Services', group: 'Government & Civil Services', icon: Map, color: 'bg-red-700', description: 'Engineering, management, and operations in Indian Railways.', salary: '₹40k - ₹1.2L/mo', growth: 'Stable', steps: getGenericSteps('Railway Services') },
    { id: 'psu-banks', title: 'Public Sector Jobs (PSU / Banks)', group: 'Government & Civil Services', icon: FileText, color: 'bg-indigo-700', description: 'Work in government-owned corporations and banks.', salary: '₹40k - ₹1L/mo', growth: 'Stable', steps: getGenericSteps('PSU & Banking') },
    { id: 'govt-teaching', title: 'Teaching (School / Professor)', group: 'Government & Civil Services', icon: GraduationCap, color: 'bg-cyan-700', description: 'Educator in government schools or state universities.', salary: '₹40k - ₹1.5L/mo', growth: 'Stable', steps: getGenericSteps('Government Teaching') },
    { id: 'judiciary', title: 'Judiciary (Judge / Legal Officer)', group: 'Government & Civil Services', icon: Gavel, color: 'bg-stone-800', description: 'Preside over court proceedings and uphold the law.', salary: '₹1L - ₹2.5L/mo', growth: 'Prestige', steps: getGenericSteps('Judicial Services') },

    // ==========================================
    // 8. VOCATIONAL & SKILLED
    // ==========================================
    { id: 'electrician', title: 'Electrician / Technician', group: 'Vocational & Skilled', icon: Terminal, color: 'bg-yellow-600', description: 'Install and repair electrical systems.', salary: '₹2L - ₹6L', growth: 'Stable', steps: getGenericSteps('Electrical Trade') },
    { id: 'plumbing', title: 'Plumbing & Carpentry', group: 'Vocational & Skilled', icon: Map, color: 'bg-amber-700', description: 'Skilled trades in building maintenance and construction.', salary: '₹2L - ₹6L', growth: 'Stable', steps: getGenericSteps('Building Trades') },
    { id: 'mechanic', title: 'Automotive Mechanic', group: 'Vocational & Skilled', icon: Cpu, color: 'bg-slate-600', description: 'Repair and maintain automobiles and engines.', salary: '₹2L - ₹7L', growth: 'Stable', steps: getGenericSteps('Automotive Repair') },
    { id: 'hospitality-voc', title: 'Hospitality & Tourism', group: 'Vocational & Skilled', icon: Globe, color: 'bg-cyan-600', description: 'Hotel operations, guest relations, and travel.', salary: '₹3L - ₹12L', growth: 'High', steps: getGenericSteps('Hospitality') },
    { id: 'culinary', title: 'Culinary Arts / Chef', group: 'Vocational & Skilled', icon: Map, color: 'bg-orange-500', description: 'Professional cooking and kitchen management.', salary: '₹3L - ₹15L', growth: 'High', steps: getGenericSteps('Culinary Arts') },
    { id: 'aviation-crew', title: 'Aviation Crew (Pilot / Cabin)', group: 'Vocational & Skilled', icon: Globe, color: 'bg-sky-500', description: 'Flight operations and passenger safety.', salary: '₹5L - ₹30L+', growth: 'High', steps: getGenericSteps('Aviation') },
    { id: 'fashion-textile', title: 'Fashion & Textile Work', group: 'Vocational & Skilled', icon: PenTool, color: 'bg-pink-500', description: 'Tailoring, fabric design, and garment manufacturing.', salary: '₹2L - ₹8L', growth: 'Moderate', steps: getGenericSteps('Textiles') },
    { id: 'event-mgmt', title: 'Event Management', group: 'Vocational & Skilled', icon: Users, color: 'bg-purple-500', description: 'Plan and execute corporate and social events.', salary: '₹3L - ₹15L', growth: 'High', steps: getGenericSteps('Event Planning') },
    { id: 'beauty', title: 'Beauty & Cosmetology', group: 'Vocational & Skilled', icon: Map, color: 'bg-rose-400', description: 'Skincare, makeup artistry, and salon services.', salary: '₹2L - ₹10L', growth: 'High', steps: getGenericSteps('Cosmetology') },

    // ==========================================
    // 9. GREEN & SUSTAINABILITY
    // ==========================================
    { id: 'renewable-energy', title: 'Renewable Energy Engineering', group: 'Green & Sustainability', icon: Cloud, color: 'bg-green-500', description: 'Develop solar, wind, and sustainable power systems.', salary: '₹6L - ₹22L', growth: 'Explosive', steps: getGenericSteps('Renewable Energy') },
    { id: 'env-science', title: 'Environmental Science', group: 'Green & Sustainability', icon: Globe, color: 'bg-teal-500', description: 'Study and protect the natural environment.', salary: '₹4L - ₹15L', growth: 'High', steps: getGenericSteps('Environmental Science') },
    { id: 'sustainable-dev', title: 'Sustainable Development', group: 'Green & Sustainability', icon: Map, color: 'bg-emerald-600', description: 'Create eco-friendly corporate and urban policies.', salary: '₹5L - ₹18L', growth: 'High', steps: getGenericSteps('Sustainable Policy') },
    { id: 'climate-change', title: 'Climate Change Specialist', group: 'Green & Sustainability', icon: Cloud, color: 'bg-sky-500', description: 'Research and mitigate the impacts of global warming.', salary: '₹6L - ₹20L', growth: 'Very High', steps: getGenericSteps('Climate Research') },
    { id: 'agritech', title: 'Agriculture Technology (AgriTech)', group: 'Green & Sustainability', icon: Database, color: 'bg-lime-600', description: 'Modernize farming using data, drones, and IoT.', salary: '₹5L - ₹18L', growth: 'Very High', steps: getGenericSteps('AgriTech') },
    { id: 'food-tech', title: 'Food Technology', group: 'Green & Sustainability', icon: Server, color: 'bg-orange-400', description: 'Ensure food safety, processing, and preservation.', salary: '₹4L - ₹15L', growth: 'High', steps: getGenericSteps('Food Tech') },
    { id: 'forestry', title: 'Forestry & Wildlife Conservation', group: 'Green & Sustainability', icon: Map, color: 'bg-green-800', description: 'Manage and protect forest ecosystems and wildlife.', salary: '₹3L - ₹12L', growth: 'Moderate', steps: getGenericSteps('Wildlife Conservation') },
    { id: 'oceanography', title: 'Oceanography / Marine Biology', group: 'Green & Sustainability', icon: Anchor, color: 'bg-blue-600', description: 'Study marine ecosystems and oceanic processes.', salary: '₹5L - ₹18L', growth: 'Moderate', steps: getGenericSteps('Marine Biology') },
    { id: 'urban-planning', title: 'Urban Planning', group: 'Green & Sustainability', icon: Building2, color: 'bg-slate-500', description: 'Design sustainable and efficient city layouts.', salary: '₹5L - ₹16L', growth: 'Stable', steps: getGenericSteps('Urban Planning') },

    // ==========================================
    // 10. EMERGING & SPECIALIZED
    // ==========================================
    { id: 'digital-marketing', title: 'Digital Marketing', group: 'Emerging & Specialized', icon: TrendingUp, color: 'bg-orange-500', description: 'SEO, social media strategy, and online branding.', salary: '₹4L - ₹18L', growth: 'Very High', steps: getGenericSteps('Digital Marketing') },
    { id: 'cyber-law', title: 'Cyber Law / Tech Policy', group: 'Emerging & Specialized', icon: Gavel, color: 'bg-stone-600', description: 'Legal expertise in digital rights and data privacy.', salary: '₹6L - ₹25L', growth: 'Explosive', steps: getGenericSteps('Cyber Law') },
    { id: 'blockchain', title: 'Blockchain Developer', group: 'Emerging & Specialized', icon: Lock, color: 'bg-indigo-500', description: 'Build decentralized apps and smart contracts.', salary: '₹10L - ₹35L', growth: 'High', steps: getGenericSteps('Blockchain') },
    { id: 'ethical-hacker', title: 'Ethical Hacker', group: 'Emerging & Specialized', icon: Shield, color: 'bg-red-600', description: 'Find and fix security vulnerabilities legally.', salary: '₹7L - ₹28L', growth: 'Very High', steps: getGenericSteps('Ethical Hacking') },
    { id: 'cloud-computing', title: 'Cloud Computing Specialist', group: 'Emerging & Specialized', icon: Cloud, color: 'bg-sky-500', description: 'Manage cloud infrastructure (AWS, Azure, GCP).', salary: '₹8L - ₹30L', growth: 'Very High', steps: getGenericSteps('Cloud Computing') },
    { id: 'translator', title: 'Foreign Languages / Translator', group: 'Emerging & Specialized', icon: Globe, color: 'bg-teal-500', description: 'Translation and localization for global businesses.', salary: '₹4L - ₹15L', growth: 'High', steps: getGenericSteps('Linguistics') },
    { id: 'ngo', title: 'NGO / Development Sector', group: 'Emerging & Specialized', icon: Users, color: 'bg-emerald-600', description: 'Work on social causes and non-profit initiatives.', salary: '₹3L - ₹12L', growth: 'Stable', steps: getGenericSteps('Social Sector') },
    { id: 'archaeology', title: 'Archaeology & Museum Studies', group: 'Emerging & Specialized', icon: Search, color: 'bg-amber-800', description: 'Excavate and curate historical artifacts.', salary: '₹3L - ₹10L', growth: 'Moderate', steps: getGenericSteps('Archaeology') },
    { id: 'astrology', title: 'Astrology / Vedic Studies', group: 'Emerging & Specialized', icon: Map, color: 'bg-purple-800', description: 'Study ancient texts and astrological charts.', salary: 'Variable', growth: 'Moderate', steps: getGenericSteps('Vedic Studies') },
    { id: 'tourism-planner', title: 'Tourism & Travel Planner', group: 'Emerging & Specialized', icon: Map, color: 'bg-cyan-500', description: 'Curate global travel and vacation experiences.', salary: '₹3L - ₹12L', growth: 'High', steps: getGenericSteps('Travel Planning') },
    { id: 'influencer', title: 'Influencer / Social Media Creator', group: 'Emerging & Specialized', icon: Camera, color: 'bg-pink-400', description: 'Create digital content and build online communities.', salary: 'Variable', growth: 'Explosive', steps: getGenericSteps('Content Creation') },

    // ==========================================
    // 1. WEB DEVELOPMENT - FRONTEND
    // ==========================================
    { id: 'html-dev', title: 'HTML Developer', group: 'STEM & Technology', icon: Layout, color: 'bg-blue-500', description: 'Structure and layout web pages using HTML5.', salary: '₹3L - ₹8L', growth: 'Stable', steps: getGenericSteps('HTML Development') },
    { id: 'css-dev', title: 'CSS Developer', group: 'STEM & Technology', icon: Layout, color: 'bg-blue-600', description: 'Style, animate, and design responsive web interfaces.', salary: '₹3L - ₹10L', growth: 'Stable', steps: getGenericSteps('CSS Development') },
    { id: 'js-dev', title: 'JavaScript Developer', group: 'STEM & Technology', icon: Code, color: 'bg-yellow-500', description: 'Build interactive and dynamic web applications.', salary: '₹5L - ₹15L', growth: 'High', steps: getGenericSteps('JavaScript Development') },
    { id: 'frontend-dev', title: 'Frontend Developer', group: 'STEM & Technology', icon: Layout, color: 'bg-indigo-500', description: 'Develop client-side web interfaces and user experiences.', salary: '₹5L - ₹18L', growth: 'High', steps: getGenericSteps('Frontend Development') },
    { id: 'react-dev', title: 'React Developer', group: 'STEM & Technology', icon: Code, color: 'bg-cyan-500', description: 'Build modern single-page applications using React.js.', salary: '₹6L - ₹22L', growth: 'Very High', steps: getGenericSteps('React Development') },
    { id: 'angular-dev', title: 'Angular Developer', group: 'STEM & Technology', icon: Code, color: 'bg-red-600', description: 'Develop enterprise-level applications using Angular.', salary: '₹6L - ₹20L', growth: 'High', steps: getGenericSteps('Angular Development') },
    { id: 'vue-dev', title: 'Vue.js Developer', group: 'STEM & Technology', icon: Code, color: 'bg-emerald-500', description: 'Create lightweight, performant UI components with Vue.', salary: '₹5L - ₹18L', growth: 'High', steps: getGenericSteps('Vue.js Development') },
    { id: 'ui-dev', title: 'UI Developer', group: 'Creative & Design', icon: PenTool, color: 'bg-pink-500', description: 'Bridge the gap between design and engineering.', salary: '₹4L - ₹16L', growth: 'High', steps: getGenericSteps('UI Development') },

    // ==========================================
    // 1. WEB DEVELOPMENT - BACKEND
    // ==========================================
    { id: 'backend-dev', title: 'Backend Developer', group: 'STEM & Technology', icon: Server, color: 'bg-gray-800', description: 'Handle server logic, databases, and APIs.', salary: '₹5L - ₹22L', growth: 'High', steps: getGenericSteps('Backend Development') },
    { id: 'node-dev', title: 'Node.js Developer', group: 'STEM & Technology', icon: Server, color: 'bg-green-600', description: 'Build scalable network applications using JavaScript.', salary: '₹6L - ₹24L', growth: 'Very High', steps: getGenericSteps('Node.js Development') },
    { id: 'php-dev', title: 'PHP Developer', group: 'STEM & Technology', icon: Server, color: 'bg-indigo-400', description: 'Develop server-side logic for web portals and CMS.', salary: '₹3L - ₹12L', growth: 'Stable', steps: getGenericSteps('PHP Development') },
    { id: 'python-dev', title: 'Python Developer', group: 'STEM & Technology', icon: Terminal, color: 'bg-blue-500', description: 'Write backend logic, automation scripts, and APIs.', salary: '₹6L - ₹25L', growth: 'High', steps: getGenericSteps('Python Development') },
    { id: 'java-backend', title: 'Java Backend Developer', group: 'STEM & Technology', icon: Server, color: 'bg-orange-600', description: 'Build robust, enterprise-grade backend systems.', salary: '₹6L - ₹25L', growth: 'Stable', steps: getGenericSteps('Java Development') },
    { id: 'dotnet-dev', title: '.NET Developer', group: 'STEM & Technology', icon: Code, color: 'bg-purple-600', description: 'Create web applications using the Microsoft stack.', salary: '₹5L - ₹20L', growth: 'Stable', steps: getGenericSteps('.NET Development') },
    { id: 'ruby-dev', title: 'Ruby Developer', group: 'STEM & Technology', icon: Code, color: 'bg-red-500', description: 'Build rapid web applications using Ruby on Rails.', salary: '₹6L - ₹22L', growth: 'Stable', steps: getGenericSteps('Ruby Development') },

    // ==========================================
    // 1. WEB DEVELOPMENT - FULL STACK
    // ==========================================
    { id: 'fullstack-dev', title: 'Full Stack Developer', group: 'STEM & Technology', icon: Monitor, color: 'bg-indigo-600', description: 'Handle both client-side and server-side software.', salary: '₹6L - ₹25L', growth: 'Very High', steps: getGenericSteps('Full Stack Development') },
    { id: 'mern-dev', title: 'MERN Stack Developer', group: 'STEM & Technology', icon: Code, color: 'bg-teal-500', description: 'MongoDB, Express, React, and Node.js specialist.', salary: '₹6L - ₹28L', growth: 'Explosive', steps: getGenericSteps('MERN Stack') },
    { id: 'mean-dev', title: 'MEAN Stack Developer', group: 'STEM & Technology', icon: Code, color: 'bg-red-500', description: 'MongoDB, Express, Angular, and Node.js specialist.', salary: '₹6L - ₹25L', growth: 'High', steps: getGenericSteps('MEAN Stack') },
    { id: 'django-dev', title: 'Django Full Stack Developer', group: 'STEM & Technology', icon: Terminal, color: 'bg-green-700', description: 'Build end-to-end applications using Python and Django.', salary: '₹6L - ₹24L', growth: 'High', steps: getGenericSteps('Django Development') },

    // ==========================================
    // 2. SOFTWARE DEVELOPMENT
    // ==========================================
    { id: 'software-eng', title: 'Software Engineer', group: 'STEM & Technology', icon: Monitor, color: 'bg-blue-700', description: 'Design, develop, and maintain software systems.', salary: '₹6L - ₹30L', growth: 'High', steps: getGenericSteps('Software Engineering') },
    { id: 'app-dev', title: 'Application Developer', group: 'STEM & Technology', icon: Layout, color: 'bg-indigo-500', description: 'Create applications for specific operating systems.', salary: '₹5L - ₹20L', growth: 'High', steps: getGenericSteps('App Development') },
    { id: 'sys-software', title: 'System Software Developer', group: 'STEM & Technology', icon: Cpu, color: 'bg-gray-700', description: 'Build operating systems and core system functionalities.', salary: '₹8L - ₹28L', growth: 'Stable', steps: getGenericSteps('System Software') },
    { id: 'desktop-dev', title: 'Desktop Application Developer', group: 'STEM & Technology', icon: Monitor, color: 'bg-slate-600', description: 'Build standalone software for Windows, Mac, or Linux.', salary: '₹4L - ₹18L', growth: 'Stable', steps: getGenericSteps('Desktop Development') },
    { id: 'embedded-dev', title: 'Embedded Software Developer', group: 'STEM & Technology', icon: Cpu, color: 'bg-zinc-600', description: 'Program microcontrollers and hardware logic.', salary: '₹5L - ₹22L', growth: 'High', steps: getGenericSteps('Embedded Systems') },
    { id: 'game-engine', title: 'Game Engine Developer', group: 'Creative & Design', icon: Gamepad2, color: 'bg-purple-600', description: 'Build the core architecture that powers video games.', salary: '₹8L - ₹35L', growth: 'High', steps: getGenericSteps('Game Engine Dev') },

    // ==========================================
    // 3. MOBILE APP DEVELOPMENT
    // ==========================================
    { id: 'android-dev', title: 'Android Developer', group: 'STEM & Technology', icon: Smartphone, color: 'bg-green-500', description: 'Develop applications for the Android ecosystem.', salary: '₹5L - ₹20L', growth: 'Stable', steps: getGenericSteps('Android Development') },
    { id: 'ios-dev', title: 'iOS Developer', group: 'STEM & Technology', icon: Smartphone, color: 'bg-gray-800', description: 'Create applications for iPhones and iPads.', salary: '₹6L - ₹25L', growth: 'High', steps: getGenericSteps('iOS Development') },
    { id: 'flutter-dev', title: 'Flutter Developer', group: 'STEM & Technology', icon: Smartphone, color: 'bg-cyan-500', description: 'Build cross-platform apps using Dart and Flutter.', salary: '₹6L - ₹22L', growth: 'Explosive', steps: getGenericSteps('Flutter Development') },
    { id: 'react-native', title: 'React Native Developer', group: 'STEM & Technology', icon: Smartphone, color: 'bg-blue-400', description: 'Build native mobile apps using React and JavaScript.', salary: '₹6L - ₹24L', growth: 'Very High', steps: getGenericSteps('React Native') },
    { id: 'kotlin-dev', title: 'Kotlin Developer', group: 'STEM & Technology', icon: Code, color: 'bg-orange-500', description: 'Modern Android and backend development using Kotlin.', salary: '₹6L - ₹22L', growth: 'High', steps: getGenericSteps('Kotlin Development') },
    { id: 'swift-dev', title: 'Swift Developer', group: 'STEM & Technology', icon: Code, color: 'bg-orange-600', description: 'Native Apple ecosystem programming using Swift.', salary: '₹6L - ₹25L', growth: 'High', steps: getGenericSteps('Swift Development') },
    { id: 'mobile-dev', title: 'Mobile App Developer', group: 'STEM & Technology', icon: Smartphone, color: 'bg-indigo-500', description: 'General mobile application creation and maintenance.', salary: '₹5L - ₹20L', growth: 'High', steps: getGenericSteps('Mobile Development') },

    // ==========================================
    // 4. ARTIFICIAL INTELLIGENCE & ML
    // ==========================================
    { id: 'ai-eng', title: 'AI Engineer', group: 'Emerging & Specialized', icon: Brain, color: 'bg-purple-600', description: 'Design and deploy artificial intelligence models.', salary: '₹10L - ₹40L', growth: 'Explosive', steps: getGenericSteps('AI Engineering') },
    { id: 'ml-eng', title: 'Machine Learning Engineer', group: 'Emerging & Specialized', icon: Cpu, color: 'bg-fuchsia-500', description: 'Create algorithms that learn from and make predictions on data.', salary: '₹8L - ₹35L', growth: 'Explosive', steps: getGenericSteps('Machine Learning') },
    { id: 'deep-learning', title: 'Deep Learning Engineer', group: 'Emerging & Specialized', icon: Brain, color: 'bg-indigo-600', description: 'Design complex neural networks for advanced AI tasks.', salary: '₹12L - ₹45L', growth: 'Explosive', steps: getGenericSteps('Deep Learning') },
    { id: 'nlp-eng', title: 'NLP Engineer', group: 'Emerging & Specialized', icon: Terminal, color: 'bg-teal-600', description: 'Teach machines to understand and process human language.', salary: '₹10L - ₹38L', growth: 'Explosive', steps: getGenericSteps('NLP Engineering') },
    { id: 'cv-eng', title: 'Computer Vision Engineer', group: 'Emerging & Specialized', icon: Camera, color: 'bg-blue-600', description: 'Develop algorithms that process and interpret visual data.', salary: '₹10L - ₹35L', growth: 'Very High', steps: getGenericSteps('Computer Vision') },
    { id: 'ai-research', title: 'AI Research Scientist', group: 'Emerging & Specialized', icon: BookOpen, color: 'bg-rose-600', description: 'Pioneer new algorithms and advance the field of AI.', salary: '₹15L - ₹50L+', growth: 'Explosive', steps: getGenericSteps('AI Research') },
    { id: 'prompt-eng', title: 'Prompt Engineer', group: 'Emerging & Specialized', icon: Code, color: 'bg-amber-500', description: 'Design optimal inputs to interact with Large Language Models.', salary: '₹6L - ₹20L', growth: 'Explosive', steps: getGenericSteps('Prompt Engineering') },

    // ==========================================
    // 5. DATA & ANALYTICS
    // ==========================================
    { id: 'data-analyst', title: 'Data Analyst', group: 'STEM & Technology', icon: TrendingUp, color: 'bg-blue-500', description: 'Interpret data and turn it into actionable insights.', salary: '₹4L - ₹15L', growth: 'High', steps: getGenericSteps('Data Analytics') },
    { id: 'data-scientist', title: 'Data Scientist', group: 'STEM & Technology', icon: Database, color: 'bg-teal-600', description: 'Extract meaning from data using statistics and ML.', salary: '₹8L - ₹35L', growth: 'Very High', steps: getGenericSteps('Data Science') },
    { id: 'data-eng', title: 'Data Engineer', group: 'STEM & Technology', icon: HardDrive, color: 'bg-cyan-700', description: 'Build systems that collect, manage, and convert raw data.', salary: '₹8L - ₹30L', growth: 'Very High', steps: getGenericSteps('Data Engineering') },
    { id: 'bi-dev', title: 'Business Intelligence Developer', group: 'Business & Finance', icon: TrendingUp, color: 'bg-emerald-600', description: 'Create tools and dashboards to help businesses make decisions.', salary: '₹6L - ₹20L', growth: 'High', steps: getGenericSteps('BI Development') },
    { id: 'big-data', title: 'Big Data Engineer', group: 'STEM & Technology', icon: Database, color: 'bg-indigo-700', description: 'Manage massive, complex data sets across distributed systems.', salary: '₹10L - ₹35L', growth: 'High', steps: getGenericSteps('Big Data') },
    { id: 'data-architect', title: 'Data Architect', group: 'STEM & Technology', icon: Building2, color: 'bg-slate-700', description: 'Design the blueprint for organizational data management.', salary: '₹15L - ₹40L', growth: 'High', steps: getGenericSteps('Data Architecture') },

    // ==========================================
    // 6. CYBERSECURITY
    // ==========================================
    { id: 'ethical-hacker', title: 'Ethical Hacker', group: 'Emerging & Specialized', icon: Lock, color: 'bg-red-600', description: 'Hack into systems legally to fix security vulnerabilities.', salary: '₹7L - ₹28L', growth: 'Very High', steps: getGenericSteps('Ethical Hacking') },
    { id: 'cyber-analyst', title: 'Cybersecurity Analyst', group: 'STEM & Technology', icon: Shield, color: 'bg-red-700', description: 'Monitor networks for security breaches and investigate attacks.', salary: '₹5L - ₹20L', growth: 'Very High', steps: getGenericSteps('Cybersecurity Analysis') },
    { id: 'pen-tester', title: 'Penetration Tester', group: 'Emerging & Specialized', icon: Terminal, color: 'bg-rose-700', description: 'Simulate cyber attacks to evaluate system security.', salary: '₹6L - ₹25L', growth: 'High', steps: getGenericSteps('Penetration Testing') },
    { id: 'sec-eng', title: 'Security Engineer', group: 'STEM & Technology', icon: Shield, color: 'bg-orange-600', description: 'Build and maintain IT security systems for organizations.', salary: '₹8L - ₹28L', growth: 'High', steps: getGenericSteps('Security Engineering') },
    { id: 'infosec', title: 'Information Security Analyst', group: 'STEM & Technology', icon: Lock, color: 'bg-amber-600', description: 'Protect organizational data and information systems.', salary: '₹6L - ₹22L', growth: 'High', steps: getGenericSteps('Information Security') },
    { id: 'malware', title: 'Malware Analyst', group: 'Emerging & Specialized', icon: Search, color: 'bg-red-800', description: 'Dissect and understand malicious software to neutralize threats.', salary: '₹8L - ₹25L', growth: 'High', steps: getGenericSteps('Malware Analysis') },
    { id: 'net-sec', title: 'Network Security Engineer', group: 'STEM & Technology', icon: Wifi, color: 'bg-slate-800', description: 'Secure LAN/WAN networks from internal and external threats.', salary: '₹7L - ₹24L', growth: 'High', steps: getGenericSteps('Network Security') },
    { id: 'sec-architect', title: 'Security Architect', group: 'STEM & Technology', icon: Building2, color: 'bg-gray-900', description: 'Design enterprise-level, complex security structures.', salary: '₹15L - ₹45L', growth: 'Stable', steps: getGenericSteps('Security Architecture') },

    // ==========================================
    // 7. CLOUD COMPUTING
    // ==========================================
    { id: 'cloud-eng', title: 'Cloud Engineer', group: 'Emerging & Specialized', icon: Cloud, color: 'bg-sky-500', description: 'Implement and manage cloud infrastructure.', salary: '₹8L - ₹25L', growth: 'Very High', steps: getGenericSteps('Cloud Engineering') },
    { id: 'cloud-architect', title: 'Cloud Architect', group: 'Emerging & Specialized', icon: Cloud, color: 'bg-blue-600', description: 'Design cloud adoption strategies and architecture.', salary: '₹12L - ₹40L', growth: 'High', steps: getGenericSteps('Cloud Architecture') },
    { id: 'aws-eng', title: 'AWS Engineer', group: 'Emerging & Specialized', icon: Cloud, color: 'bg-orange-500', description: 'Specialist in Amazon Web Services infrastructure.', salary: '₹8L - ₹30L', growth: 'High', steps: getGenericSteps('AWS Engineering') },
    { id: 'azure-eng', title: 'Azure Engineer', group: 'Emerging & Specialized', icon: Cloud, color: 'bg-blue-500', description: 'Specialist in Microsoft Azure cloud solutions.', salary: '₹8L - ₹28L', growth: 'High', steps: getGenericSteps('Azure Engineering') },
    { id: 'gcp-eng', title: 'Google Cloud Engineer', group: 'Emerging & Specialized', icon: Cloud, color: 'bg-red-500', description: 'Specialist in Google Cloud Platform architecture.', salary: '₹8L - ₹28L', growth: 'High', steps: getGenericSteps('GCP Engineering') },
    { id: 'cloud-sec', title: 'Cloud Security Engineer', group: 'Emerging & Specialized', icon: Shield, color: 'bg-indigo-600', description: 'Secure data and applications hosted in the cloud.', salary: '₹10L - ₹35L', growth: 'Very High', steps: getGenericSteps('Cloud Security') },

    // ==========================================
    // 8. DEVOPS & INFRASTRUCTURE
    // ==========================================
    { id: 'devops', title: 'DevOps Engineer', group: 'STEM & Technology', icon: Server, color: 'bg-orange-600', description: 'Bridge software development and IT operations.', salary: '₹8L - ₹30L', growth: 'Very High', steps: getGenericSteps('DevOps') },
    { id: 'sre', title: 'Site Reliability Engineer (SRE)', group: 'STEM & Technology', icon: Monitor, color: 'bg-blue-600', description: 'Ensure software systems are highly reliable and scalable.', salary: '₹10L - ₹35L', growth: 'High', steps: getGenericSteps('Site Reliability') },
    { id: 'build-eng', title: 'Build Engineer', group: 'STEM & Technology', icon: Terminal, color: 'bg-slate-600', description: 'Manage source code compiling and software builds.', salary: '₹6L - ₹20L', growth: 'Stable', steps: getGenericSteps('Build Engineering') },
    { id: 'release-eng', title: 'Release Engineer', group: 'STEM & Technology', icon: FileText, color: 'bg-teal-600', description: 'Manage the software release lifecycle and deployments.', salary: '₹7L - ₹22L', growth: 'Stable', steps: getGenericSteps('Release Engineering') },
    { id: 'infra-eng', title: 'Infrastructure Engineer', group: 'STEM & Technology', icon: Server, color: 'bg-gray-700', description: 'Design and maintain physical and virtual IT environments.', salary: '₹8L - ₹25L', growth: 'Stable', steps: getGenericSteps('Infrastructure') },
    { id: 'platform-eng', title: 'Platform Engineer', group: 'STEM & Technology', icon: Layout, color: 'bg-indigo-500', description: 'Build internal developer platforms and tools.', salary: '₹10L - ₹30L', growth: 'High', steps: getGenericSteps('Platform Engineering') },

    // ==========================================
    // 9. NETWORKING
    // ==========================================
    { id: 'network-eng', title: 'Network Engineer', group: 'STEM & Technology', icon: Wifi, color: 'bg-blue-600', description: 'Set up, configure, and maintain computer networks.', salary: '₹4L - ₹15L', growth: 'Stable', steps: getGenericSteps('Network Engineering') },
    { id: 'net-admin', title: 'Network Administrator', group: 'STEM & Technology', icon: Server, color: 'bg-slate-600', description: 'Oversee day-to-day operations of IT networks.', salary: '₹3L - ₹12L', growth: 'Stable', steps: getGenericSteps('Network Administration') },
    { id: 'net-architect', title: 'Network Architect', group: 'STEM & Technology', icon: Building2, color: 'bg-indigo-700', description: 'Design and plan data communication networks.', salary: '₹10L - ₹30L', growth: 'Stable', steps: getGenericSteps('Network Architecture') },
    { id: 'telecom-eng', title: 'Telecom Engineer', group: 'STEM & Technology', icon: Smartphone, color: 'bg-orange-500', description: 'Design and install telecommunications equipment.', salary: '₹4L - ₹16L', growth: 'Stable', steps: getGenericSteps('Telecom Engineering') },
    { id: 'wireless-eng', title: 'Wireless Network Engineer', group: 'STEM & Technology', icon: Wifi, color: 'bg-cyan-600', description: 'Design and optimize wireless LANs and networks.', salary: '₹5L - ₹18L', growth: 'Stable', steps: getGenericSteps('Wireless Networking') },

    // ==========================================
    // 10. DATABASE
    // ==========================================
    { id: 'dba', title: 'Database Administrator (DBA)', group: 'STEM & Technology', icon: Database, color: 'bg-teal-700', description: 'Maintain performance, integrity, and security of databases.', salary: '₹5L - ₹18L', growth: 'Stable', steps: getGenericSteps('Database Administration') },
    { id: 'db-dev', title: 'Database Developer', group: 'STEM & Technology', icon: HardDrive, color: 'bg-blue-600', description: 'Design and implement database structures and schemas.', salary: '₹6L - ₹20L', growth: 'Stable', steps: getGenericSteps('Database Development') },
    { id: 'sql-dev', title: 'SQL Developer', group: 'STEM & Technology', icon: Code, color: 'bg-indigo-500', description: 'Write optimized queries and scripts for SQL databases.', salary: '₹4L - ₹16L', growth: 'Stable', steps: getGenericSteps('SQL Development') },
    { id: 'nosql-eng', title: 'NoSQL Engineer', group: 'STEM & Technology', icon: Database, color: 'bg-purple-600', description: 'Manage non-relational databases like MongoDB or Cassandra.', salary: '₹6L - ₹22L', growth: 'High', steps: getGenericSteps('NoSQL Engineering') },
    { id: 'data-warehouse', title: 'Data Warehouse Engineer', group: 'STEM & Technology', icon: Server, color: 'bg-slate-700', description: 'Design systems to store massive amounts of historical data.', salary: '₹8L - ₹25L', growth: 'Stable', steps: getGenericSteps('Data Warehousing') },

    // ==========================================
    // 11. GAME DEVELOPMENT
    // ==========================================
    { id: 'game-dev', title: 'Game Developer', group: 'Creative & Design', icon: Gamepad2, color: 'bg-purple-500', description: 'Write code and logic for interactive video games.', salary: '₹4L - ₹20L', growth: 'High', steps: getGenericSteps('Game Development') },
    { id: 'unity-dev', title: 'Unity Developer', group: 'Creative & Design', icon: Gamepad2, color: 'bg-slate-800', description: 'Build 2D/3D games and simulations using Unity and C#.', salary: '₹4L - ₹18L', growth: 'High', steps: getGenericSteps('Unity Development') },
    { id: 'unreal-dev', title: 'Unreal Engine Developer', group: 'Creative & Design', icon: Gamepad2, color: 'bg-blue-600', description: 'Create high-fidelity games using Unreal Engine and C++.', salary: '₹6L - ₹25L', growth: 'High', steps: getGenericSteps('Unreal Engine') },
    { id: 'gameplay-prog', title: 'Gameplay Programmer', group: 'Creative & Design', icon: Code, color: 'bg-emerald-600', description: 'Code character movements, physics, and game mechanics.', salary: '₹5L - ₹22L', growth: 'Stable', steps: getGenericSteps('Gameplay Programming') },
    { id: 'game-designer', title: 'Game Designer', group: 'Creative & Design', icon: PenTool, color: 'bg-pink-500', description: 'Design levels, story, mechanics, and player experience.', salary: '₹4L - ₹18L', growth: 'Stable', steps: getGenericSteps('Game Design') },

    // ==========================================
    // 12. BLOCKCHAIN & WEB3
    // ==========================================
    { id: 'blockchain-dev', title: 'Blockchain Developer', group: 'Emerging & Specialized', icon: Lock, color: 'bg-indigo-600', description: 'Build decentralized ledger architectures and protocols.', salary: '₹10L - ₹35L', growth: 'High', steps: getGenericSteps('Blockchain Development') },
    { id: 'smart-contract', title: 'Smart Contract Developer', group: 'Emerging & Specialized', icon: Code, color: 'bg-teal-500', description: 'Write automated contracts on Ethereum or other chains.', salary: '₹8L - ₹30L', growth: 'High', steps: getGenericSteps('Smart Contracts') },
    { id: 'web3-dev', title: 'Web3 Developer', group: 'Emerging & Specialized', icon: Globe, color: 'bg-blue-500', description: 'Build decentralized apps (dApps) interacting with blockchains.', salary: '₹8L - ₹30L', growth: 'High', steps: getGenericSteps('Web3 Development') },
    { id: 'crypto-sec', title: 'Crypto Security Engineer', group: 'Emerging & Specialized', icon: Shield, color: 'bg-orange-600', description: 'Secure cryptographic systems and blockchain networks.', salary: '₹12L - ₹40L', growth: 'High', steps: getGenericSteps('Crypto Security') },

    // ==========================================
    // 13. ROBOTICS & AUTOMATION
    // ==========================================
    { id: 'robotics-eng', title: 'Robotics Engineer', group: 'STEM & Technology', icon: Cpu, color: 'bg-zinc-600', description: 'Design and build mechanical and robotic systems.', salary: '₹6L - ₹25L', growth: 'High', steps: getGenericSteps('Robotics') },
    { id: 'automation-eng', title: 'Automation Engineer', group: 'STEM & Technology', icon: Terminal, color: 'bg-blue-700', description: 'Automate manufacturing or software processes.', salary: '₹5L - ₹20L', growth: 'High', steps: getGenericSteps('Automation Engineering') },
    { id: 'embedded-sys', title: 'Embedded Systems Engineer', group: 'STEM & Technology', icon: Cpu, color: 'bg-emerald-700', description: 'Integrate hardware and software for specialized devices.', salary: '₹5L - ₹22L', growth: 'High', steps: getGenericSteps('Embedded Systems') },
    { id: 'control-sys', title: 'Control Systems Engineer', group: 'STEM & Technology', icon: Server, color: 'bg-orange-500', description: 'Design systems that govern dynamic behaviors in machines.', salary: '₹4L - ₹18L', growth: 'Stable', steps: getGenericSteps('Control Systems') },

    // ==========================================
    // 14. UI / UX & DESIGN (TECH SIDE)
    // ==========================================
    { id: 'ui-designer', title: 'UI Designer', group: 'Creative & Design', icon: Layout, color: 'bg-pink-500', description: 'Design visually appealing screens and digital interfaces.', salary: '₹4L - ₹15L', growth: 'High', steps: getGenericSteps('UI Design') },
    { id: 'ux-designer', title: 'UX Designer', group: 'Creative & Design', icon: Users, color: 'bg-purple-600', description: 'Optimize the user journey and experience of a product.', salary: '₹5L - ₹20L', growth: 'High', steps: getGenericSteps('UX Design') },
    { id: 'product-designer', title: 'Product Designer', group: 'Creative & Design', icon: PenTool, color: 'bg-rose-500', description: 'Oversee both UI and UX to build complete products.', salary: '₹6L - ₹25L', growth: 'Very High', steps: getGenericSteps('Product Design') },
    { id: 'interaction-designer', title: 'Interaction Designer', group: 'Creative & Design', icon: Layout, color: 'bg-teal-500', description: 'Design interactive moments and micro-animations.', salary: '₹5L - ₹18L', growth: 'Stable', steps: getGenericSteps('Interaction Design') },

    // ==========================================
    // 15. TESTING & QUALITY ASSURANCE
    // ==========================================
    { id: 'qa-eng', title: 'QA Engineer', group: 'STEM & Technology', icon: CheckSquare, color: 'bg-lime-600', description: 'Ensure software meets quality standards before release.', salary: '₹4L - ₹15L', growth: 'Stable', steps: getGenericSteps('Quality Assurance') },
    { id: 'software-tester', title: 'Software Tester', group: 'STEM & Technology', icon: CheckSquare, color: 'bg-green-600', description: 'Manually test software features to find bugs.', salary: '₹3L - ₹10L', growth: 'Stable', steps: getGenericSteps('Software Testing') },
    { id: 'automation-tester', title: 'Automation Tester', group: 'STEM & Technology', icon: Code, color: 'bg-emerald-600', description: 'Write scripts to automate software testing processes.', salary: '₹5L - ₹18L', growth: 'High', steps: getGenericSteps('Automation Testing') },
    { id: 'perf-tester', title: 'Performance Tester', group: 'STEM & Technology', icon: TrendingUp, color: 'bg-blue-500', description: 'Test system scalability, speed, and responsiveness.', salary: '₹6L - ₹20L', growth: 'Stable', steps: getGenericSteps('Performance Testing') },
    { id: 'test-eng', title: 'Test Engineer', group: 'STEM & Technology', icon: CheckSquare, color: 'bg-indigo-500', description: 'Design test plans and testing infrastructure.', salary: '₹5L - ₹16L', growth: 'Stable', steps: getGenericSteps('Test Engineering') },

    // ==========================================
    // 16. OTHER TECHNOLOGY ROLES
    // ==========================================
    { id: 'tech-support', title: 'Technical Support Engineer', group: 'STEM & Technology', icon: Headset, color: 'bg-cyan-600', description: 'Troubleshoot complex technical software/hardware issues.', salary: '₹3L - ₹12L', growth: 'Stable', steps: getGenericSteps('Technical Support') },
    { id: 'it-support', title: 'IT Support Specialist', group: 'STEM & Technology', icon: Headset, color: 'bg-blue-400', description: 'Assist internal employees with IT and hardware needs.', salary: '₹2L - ₹8L', growth: 'Stable', steps: getGenericSteps('IT Support') },
    { id: 'sys-admin', title: 'System Administrator', group: 'STEM & Technology', icon: Server, color: 'bg-slate-600', description: 'Configure and upkeep enterprise server environments.', salary: '₹4L - ₹15L', growth: 'Stable', steps: getGenericSteps('System Administration') },
    { id: 'it-consultant', title: 'IT Consultant', group: 'Business & Finance', icon: Briefcase, color: 'bg-teal-700', description: 'Advise organizations on how to best use IT to meet goals.', salary: '₹6L - ₹25L', growth: 'High', steps: getGenericSteps('IT Consulting') },
    { id: 'product-manager', title: 'Product Manager', group: 'Business & Finance', icon: Users, color: 'bg-amber-600', description: 'Define product vision and manage the roadmap.', salary: '₹12L - ₹35L', growth: 'High', steps: getGenericSteps('Product Management') },
    { id: 'tech-pm', title: 'Technical Project Manager', group: 'Business & Finance', icon: FileText, color: 'bg-orange-600', description: 'Manage timelines and resources for engineering projects.', salary: '₹10L - ₹30L', growth: 'High', steps: getGenericSteps('Project Management') },

    // ==========================================
    // NON-TECH / GOVT / ARTS / MEDICAL (TO KEEP IT "ONE-STOP")
    // ==========================================
    { id: 'doctor', title: 'Doctor (MBBS / Specialist)', group: 'Medical & Healthcare', icon: Stethoscope, color: 'bg-red-500', description: 'Diagnose and treat medical conditions.', salary: '₹8L - ₹30L+', growth: 'High', steps: getGenericSteps('Medical Practice') },
    { id: 'nursing', title: 'Nursing / Pharmacy', group: 'Medical & Healthcare', icon: Users, color: 'bg-pink-500', description: 'Nursing, Pharmacy, and Physiotherapy.', salary: '₹3L - ₹12L', growth: 'Stable', steps: getGenericSteps('Healthcare Support') },
    { id: 'ca-cs', title: 'CA / Company Secretary', group: 'Business & Finance', icon: Calculator, color: 'bg-emerald-600', description: 'Manage corporate finances, taxation, and compliance.', salary: '₹8L - ₹25L', growth: 'High', steps: getGenericSteps('Chartered Accountancy') },
    { id: 'lawyer', title: 'Lawyer / Legal Studies', group: 'Arts & Humanities', icon: Gavel, color: 'bg-stone-600', description: 'Practice law, corporate legal advisory, or judiciary.', salary: '₹5L - ₹30L+', growth: 'Moderate', steps: getGenericSteps('Legal Studies') },
    { id: 'upsc', title: 'UPSC (IAS / IPS / IFS / IRS)', group: 'Government & Civil Services', icon: Building2, color: 'bg-amber-800', description: 'Top-tier civil services and administration.', salary: '₹56k - ₹2.5L/mo', growth: 'Prestige', steps: getGenericSteps('UPSC Civil Services') },
    { id: 'defense', title: 'Defense (Army, Navy, AF)', group: 'Government & Civil Services', icon: Anchor, color: 'bg-emerald-700', description: 'Serve the nation as a commissioned officer.', salary: '₹7L - ₹15L', growth: 'Prestige', steps: getGenericSteps('Defense Services') }


  ];

  const groups: (CareerCategory | 'All')[] = [
    'All',
    'STEM & Technology',
    'Medical & Healthcare',
    'Business & Finance',
    'Arts & Humanities',
    'Creative & Design',
    'Sports & Physical',
    'Government & Civil Services',
    'Vocational & Skilled',
    'Green & Sustainability',
    'Emerging & Specialized'
  ];

  const filteredPaths = careerPaths.filter(path => 
    (activeGroup === 'All' || path.group === activeGroup) &&
    path.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Map className="text-indigo-600" size={32} />
            Career Roadmaps
          </h1>
          <p className="text-gray-500 mt-1">Step-by-step guides for your career journey.</p>
        </div>
        
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search roadmaps..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm"
          />
        </div>
      </div>

      {!selectedPath ? (
        /* Career Selection View */
        <div className="space-y-8">
          {/* Group Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide border-b border-gray-100">
            {groups.map(group => (
              <button
                key={group}
                onClick={() => setActiveGroup(group)}
                className={`px-5 py-2.5 rounded-t-xl text-sm font-bold whitespace-nowrap transition-all relative top-[1px] ${
                  activeGroup === group 
                    ? 'bg-white text-indigo-600 border-x border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                {group}
              </button>
            ))}
          </div>

          {/* Career Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredPaths.map((path) => (
              <motion.div
                key={path.id}
                whileHover={{ y: -2 }}
                onClick={() => setSelectedPath(path)}
                className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer group flex items-center gap-4"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white shrink-0 ${path.color} shadow-sm`}>
                  <path.icon size={20} />
                </div>
                <div className="overflow-hidden">
                  <h3 className="font-bold text-gray-900 truncate group-hover:text-indigo-600 transition-colors">{path.title}</h3>
                  <p className="text-xs text-gray-500 truncate">{path.group}</p>
                </div>
                <ChevronRight size={16} className="ml-auto text-gray-300 group-hover:text-indigo-500" />
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        /* Detailed Roadmap View */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100"
        >
          <button 
            onClick={() => setSelectedPath(null)}
            className="mb-6 text-gray-500 hover:text-indigo-600 font-medium flex items-center gap-2 transition-colors"
          >
            <ChevronRight size={20} className="rotate-180" />
            Back to All Roadmaps
          </button>

          <div className="flex items-start gap-6 mb-12">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white ${selectedPath.color} shadow-lg`}>
              <selectedPath.icon size={32} />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">{selectedPath.title}</h2>
              <p className="text-gray-500 mt-1 text-lg">{selectedPath.description}</p>
              <div className="flex gap-4 mt-4">
                 <span className="px-3 py-1 bg-gray-100 rounded-lg text-xs font-bold text-gray-600">
                   {selectedPath.salary}
                 </span>
                 <span className="px-3 py-1 bg-green-50 rounded-lg text-xs font-bold text-green-700">
                   Growth: {selectedPath.growth}
                 </span>
              </div>
            </div>
          </div>

          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-8 top-4 bottom-4 w-0.5 bg-gray-200"></div>

            <div className="space-y-12">
              {selectedPath.steps.map((step, index) => (
                <div key={step.id} className="relative flex gap-8 group">
                  {/* Step Number/Icon */}
                  <div className={`relative z-10 w-16 h-16 rounded-full bg-white border-4 border-gray-100 flex items-center justify-center shrink-0 group-hover:border-gray-300 transition-colors`}>
                    <div className={`w-10 h-10 rounded-full ${selectedPath.color} flex items-center justify-center text-white shadow-md`}>
                      <step.icon size={20} />
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className="flex-1 bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:bg-white hover:shadow-md transition-all">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                        <p className="text-gray-600 mt-1">{step.description}</p>
                      </div>
                      {step.duration && (
                        <span className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-500 whitespace-nowrap shadow-sm">
                          ⏱ {step.duration}
                        </span>
                      )}
                    </div>

                    {(step.exams || step.skills) && (
                      <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-gray-200/50">
                        {step.exams && (
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-gray-400 uppercase">Exams:</span>
                            <div className="flex gap-2">
                              {step.exams.map(exam => (
                                <span key={exam} className="px-2 py-0.5 bg-red-50 text-red-600 text-xs font-bold rounded-md border border-red-100">
                                  {exam}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {step.skills && (
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-gray-400 uppercase">Skills:</span>
                            <div className="flex gap-2">
                              {step.skills.map(skill => (
                                <span key={skill} className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs font-bold rounded-md border border-blue-100">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}