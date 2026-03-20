import React, { useState, useMemo } from 'react';
import { 
  Calendar as CalIcon, BookOpen, GraduationCap, Search, Filter, 
  Bookmark, Link as LinkIcon, FileText, Upload, CheckCircle, 
  AlertCircle, ShieldCheck, ChevronRight, LayoutDashboard, Clock,
  X, ExternalLink, Award, Globe, Briefcase, Shield, MapPin, Layers,
  Banknote, FileCheck, SlidersHorizontal, Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types ---
interface Scholarship {
  id: string;
  name: string;
  category: string; 
  level: string[];
  amount: string;
  deadline: string;
  link: string;
  status: 'Open' | 'Closing Soon' | 'Closed';
  provider?: string;
  eligibilityDetails?: string;
  benefitsDetail?: string;
  documents?: string;
  // New Smart Filter Fields
  class_level?: string[];
  country?: string[];
  gender?: string[];
  religion?: string[];
  state?: string[];
  course?: string[];
}

interface Exam {
  id: string;
  name: string;
  category: string;
  stage: string;
  conductedBy: string;
  eligibility: string;
  pattern: string;
  duration: string;
  fee: string;
  frequency: string;
  website: string;
  description: string;
  career: string;
  examDate: string;
}

// --- Filter Options Constants ---
const FILTER_OPTIONS = {
  classes: ['Upto Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12', 'Graduation', 'Post Graduation', 'Post Graduation Diploma', 'PhD', 'ITI', 'Polytechnic/Diploma', 'Post Doctoral', 'Vocational Course', 'Coaching Classes'],
  countries: ['India', 'Study Abroad'],
  genders: ['Female', 'Male', 'Third/Transgender'],
  religions: ['Buddhism', 'Christian', 'Hindu', 'Jain', 'Parsi', 'Sikh', 'Muslim'],
  states: ['Andaman and Nicobar', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chandigarh', 'Chhattisgarh', 'Dadra and Nagar Haveli', 'Daman and Diu', 'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand', 'Karnataka', 'Kerala', 'Ladakh', 'Lakshadweep', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Puducherry', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Others'],
  courses: ['Engineering', 'Medical', 'Management', 'Fellowship', 'Talent', 'Sports']
};

const DEFAULT_GENDERS = ['Female', 'Male', 'Third/Transgender'];
const DEFAULT_RELIGIONS = ['Buddhism', 'Christian', 'Hindu', 'Jain', 'Parsi', 'Sikh', 'Muslim'];

// --- Comprehensive Scholarship Database ---
const scholarships: Scholarship[] = [
  // Previous Mocks (Updated with Smart Filter Fields)
  { 
    id: 's_1', name: 'NSP National Scholarship', category: 'Government', level: ['10th', '12th', 'UG'], amount: '₹50,000/year', deadline: '2026-03-30', link: 'https://scholarships.gov.in', status: 'Closing Soon', provider: 'Govt of India', eligibilityDetails: '• Indian Nationals.\n• Minimum 50% in previous exam.', benefitsDetail: '• Course fee coverage.\n• Maintenance allowance.', documents: '• Aadhar Card\n• Income Certificate',
    class_level: ['Class 10', 'Class 11', 'Class 12', 'Graduation'], country: ['India'], gender: DEFAULT_GENDERS, religion: DEFAULT_RELIGIONS, state: FILTER_OPTIONS.states, course: ['Engineering', 'Medical', 'Management', 'Talent'] 
  },
  { 
    id: 's_2', name: 'Reliance Foundation Scholarship', category: 'Private', level: ['UG', 'PG'], amount: '₹2,00,000', deadline: '2026-05-15', link: '#', status: 'Open', provider: 'Reliance Foundation',
    class_level: ['Graduation', 'Post Graduation'], country: ['India'], gender: DEFAULT_GENDERS, religion: DEFAULT_RELIGIONS, state: FILTER_OPTIONS.states, course: ['Engineering', 'Medical', 'Management'] 
  },
  { 
    id: 's_3', name: 'HDFC Parivartan', category: 'Merit-based', level: ['9th', '10th', '12th'], amount: '₹35,000', deadline: '2026-04-10', link: '#', status: 'Open', provider: 'HDFC Bank',
    class_level: ['Class 9', 'Class 10', 'Class 11', 'Class 12', 'Graduation'], country: ['India'], gender: DEFAULT_GENDERS, religion: DEFAULT_RELIGIONS, state: FILTER_OPTIONS.states, course: ['Engineering', 'Management', 'Talent'] 
  },
  { 
    id: 's_4', name: 'Fulbright-Nehru Fellowships', category: 'Abroad', level: ['PG'], amount: 'Fully Funded', deadline: '2026-06-01', link: 'https://usief.org.in', status: 'Open', provider: 'USIEF',
    class_level: ['Post Graduation', 'PhD', 'Post Doctoral'], country: ['Study Abroad'], gender: DEFAULT_GENDERS, religion: DEFAULT_RELIGIONS, state: FILTER_OPTIONS.states, course: ['Fellowship', 'Engineering', 'Medical', 'Management'] 
  },
  { 
    id: 's_5', name: 'Inspire Scholarship', category: 'Government', level: ['12th', 'UG'], amount: '₹80,000/year', deadline: '2026-04-25', link: 'https://online-inspire.gov.in', status: 'Open', provider: 'DST, Govt of India',
    class_level: ['Class 12', 'Graduation'], country: ['India'], gender: DEFAULT_GENDERS, religion: DEFAULT_RELIGIONS, state: FILTER_OPTIONS.states, course: ['Engineering', 'Medical', 'Fellowship', 'Talent'] 
  },

  // --- NEW MAHADBT & GOVT SCHOLARSHIPS ---
  { 
    id: 's_6', url: 'https://mahadbt.maharashtra.gov.in/login/login', name: 'Government of India Post-Matric Scholarship (SC)', category: 'Government', provider: 'Social Justice & Special Assistance Dept', deadline: '2026-03-31', status: 'Closing Soon', level: ['11th', '12th', 'UG', 'PG', 'Diploma'], amount: 'Up to ₹1200/mo + Fees', 
    benefitsDetail: '• Maintenance Allowance: Group I: ₹1200/₹550 (Hosteller/Day Scholar)\n• Group II: ₹820/₹530\n• Group III: ₹570/₹300\n• Group IV: ₹380/₹230\n• Additional allowances for disabilities.\n• Coverage of mandatory and compulsory fees.', 
    eligibilityDetails: '• Annual income ≤ ₹2,50,000.\n• SC or Neo-Buddhist (Navbouddha) category.\n• Domiciled in Maharashtra.\n• Passed SSC or equivalent.\n• Only 1 failure permitted; max 2 professional courses.', 
    documents: '• Income Certificate (Tahsildar)\n• Caste Certificate\n• Previous Marksheet\n• SSC/HSC Marksheet\n• Gap/Self Declaration\n• Hostel fee slips',
    link: 'https://mahadbt.maharashtra.gov.in',
    class_level: ['Class 11', 'Class 12', 'Graduation', 'Post Graduation', 'Polytechnic/Diploma'], country: ['India'], gender: DEFAULT_GENDERS, religion: ['Buddhism', 'Hindu', 'Others'], state: ['Maharashtra'], course: ['Engineering', 'Medical', 'Management']
  },
  { 
    id: 's_7', url: 'https://mahadbt.maharashtra.gov.in/login/login', name: 'Post-Matric Tuition Fee and Examination Fee (Freeship SC)', category: 'Government', provider: 'Social Justice & Special Assistance Dept', deadline: '2026-03-31', status: 'Closing Soon', level: ['11th', '12th', 'UG', 'PG'], amount: '100% Fee Coverage', 
    benefitsDetail: '• The scheme covers tuition and exam fees, including other mandatory institutional charges payable by the student.', 
    eligibilityDetails: '• Parent/guardian annual income > ₹2,50,000 (No upper limit).\n• SC or Neo-Buddhist category.\n• Maharashtra resident.\n• Admitted through CAP round for Professional Courses.', 
    documents: '• Income Certificate\n• Caste & Validity Certificate\n• CAP round allotment letter\n• Marksheets',
    link: 'https://mahadbt.maharashtra.gov.in',
    class_level: ['Class 11', 'Class 12', 'Graduation', 'Post Graduation'], country: ['India'], gender: DEFAULT_GENDERS, religion: ['Buddhism', 'Hindu', 'Others'], state: ['Maharashtra'], course: ['Engineering', 'Medical', 'Management']
  },
  { 
    id: 's_8', name: 'Post Matric Scholarship Scheme (ST)', category: 'Government', provider: 'Tribal Development Department', deadline: '2026-04-15', status: 'Open', level: ['11th', '12th', 'UG', 'PG'], amount: 'Up to ₹1200/mo', 
    benefitsDetail: '• Allowances Per Month for Hostellers/Day Scholars: Group 1: ₹1200/₹550 to Group 4: ₹380/₹230.\n• Additional Reader/Escort Allowance.', 
    eligibilityDetails: '• ST category only.\n• Family Income ≤ ₹2,50,000.\n• Minimum 10th Pass.\n• Gap of 2 years disqualifies candidate.', 
    documents: '• Caste Certificate\n• Income Certificate\n• Previous year marksheet\n• Caste Validity (if professional)',
    link: 'https://mahadbt.maharashtra.gov.in',
    class_level: ['Class 11', 'Class 12', 'Graduation', 'Post Graduation'], country: ['India'], gender: DEFAULT_GENDERS, religion: DEFAULT_RELIGIONS, state: ['Maharashtra'], course: ['Engineering', 'Medical', 'Management']
  },
  { 
    id: 's_9', name: 'Tuition Fee & Exam Fee for Tribal Students (Freeship ST)', category: 'Government', provider: 'Tribal Development Department', deadline: '2026-04-15', status: 'Open', level: ['UG', 'PG'], amount: '100% Fees', 
    benefitsDetail: '• Tuition fees and exam fees as per the approved college fee structure will be provided.', 
    eligibilityDetails: '• ST category only.\n• Family annual income > ₹2,50,000.', 
    documents: '• Caste Certificate\n• Previous year marksheet\n• Caste Validity',
    link: 'https://mahadbt.maharashtra.gov.in',
    class_level: ['Graduation', 'Post Graduation'], country: ['India'], gender: DEFAULT_GENDERS, religion: DEFAULT_RELIGIONS, state: ['Maharashtra'], course: ['Engineering', 'Medical', 'Management']
  },
  { 
    id: 's_10', name: 'Rajarshi Chhatrapati Shahu Maharaj Shikshan Shulkh Shishyavrutti', category: 'Government', provider: 'Directorate of Higher Education', deadline: '2026-02-28', status: 'Closed', level: ['UG', 'PG'], amount: '50-100% Fees', 
    benefitsDetail: '• 100% or 50% coverage for Tuition and Exam fees depending on income slab and course type.', 
    eligibilityDetails: '• Maharashtra Domicile.\n• Family income ≤ ₹8.00 lakh.\n• General category eligible.\n• First two children only.\n• No 2-year gap.', 
    documents: '• Domicile\n• Income certificate\n• CAP document\n• Family Declaration',
    link: 'https://mahadbt.maharashtra.gov.in',
    class_level: ['Graduation', 'Post Graduation'], country: ['India'], gender: DEFAULT_GENDERS, religion: DEFAULT_RELIGIONS, state: ['Maharashtra'], course: ['Engineering', 'Medical', 'Management']
  },
  { 
    id: 's_11', name: 'Post Matric Scholarship to VJNT Students', category: 'Government', provider: 'OBC, SEBC, VJNT & SBC Welfare Dept', deadline: '2026-03-20', status: 'Closing Soon', level: ['11th', '12th', 'UG', 'PG'], amount: 'Maint. + Fees', 
    benefitsDetail: '• Maintenance allowance (e.g. ₹425/month Hosteller).\n• Full coverage of tuition and exam fees.', 
    eligibilityDetails: '• Income ≤ ₹1.50 Lac.\n• VJNT category.\n• Maharashtra resident.\n• 75% attendance mandatory.\n• Max 2 male children eligible.', 
    documents: '• Caste & Income certs\n• Validity Certificate\n• Gap certificate\n• Ration Card',
    link: 'https://mahadbt.maharashtra.gov.in',
    class_level: ['Class 11', 'Class 12', 'Graduation', 'Post Graduation'], country: ['India'], gender: DEFAULT_GENDERS, religion: DEFAULT_RELIGIONS, state: ['Maharashtra'], course: ['Engineering', 'Medical', 'Management']
  },
  { 
    id: 's_12', name: 'Tuition & Exam Fees to VJNT Students', category: 'Government', provider: 'OBC, SEBC, VJNT & SBC Welfare', deadline: '2026-03-20', status: 'Closing Soon', level: ['UG', 'PG'], amount: 'Compulsory Fees', 
    benefitsDetail: '• Tuition fees and exam fees are reimbursed for applicants admitted to professional courses through CAP rounds.', 
    eligibilityDetails: '• Parent\'s income ≤ ₹8.00 Lacs.\n• VJNT category.\n• CAP round admission mandatory for professional courses.', 
    documents: '• Caste & Income certs\n• CAP Allotment Letter\n• Caste Validity',
    link: 'https://mahadbt.maharashtra.gov.in',
    class_level: ['Graduation', 'Post Graduation'], country: ['India'], gender: DEFAULT_GENDERS, religion: DEFAULT_RELIGIONS, state: ['Maharashtra'], course: ['Engineering', 'Medical', 'Management']
  },
  { 
    id: 's_13', name: 'Post Matric Scholarship to OBC Students', category: 'Government', provider: 'OBC, SEBC, VJNT & SBC Welfare', deadline: '2026-03-20', status: 'Closing Soon', level: ['11th', '12th', 'UG', 'PG'], amount: 'Fees + Maint.', 
    benefitsDetail: '• Maintenance allowance.\n• 50% Tuition/Exam Fees for unaided, 100% for aided institutions.', 
    eligibilityDetails: '• Income ≤ ₹1.50 Lac.\n• OBC category.\n• Maharashtra resident.\n• CAP round required for prof. courses.', 
    documents: '• Caste & Income certs\n• Marksheets\n• Ration Card',
    link: 'https://mahadbt.maharashtra.gov.in',
    class_level: ['Class 11', 'Class 12', 'Graduation', 'Post Graduation'], country: ['India'], gender: DEFAULT_GENDERS, religion: DEFAULT_RELIGIONS, state: ['Maharashtra'], course: ['Engineering', 'Medical', 'Management']
  },
  { 
    id: 's_14', name: 'Tuition Fees and Examination Fees to OBC Students', category: 'Government', provider: 'OBC, SEBC, VJNT & SBC Welfare', deadline: '2026-03-20', status: 'Closing Soon', level: ['UG', 'PG'], amount: 'Compulsory Fees', 
    benefitsDetail: '• All types of compulsory fees such as Tuition fees, Exam Fees are reimbursed.', 
    eligibilityDetails: '• Income ≤ ₹8.00 Lacs.\n• OBC category.\n• CAP round admission mandatory.', 
    documents: '• Caste, Income, CAP Letter, Validity Cert',
    link: 'https://mahadbt.maharashtra.gov.in',
    class_level: ['Graduation', 'Post Graduation'], country: ['India'], gender: DEFAULT_GENDERS, religion: DEFAULT_RELIGIONS, state: ['Maharashtra'], course: ['Engineering', 'Medical', 'Management']
  },
  { 
    id: 's_15', name: 'Post Matric Scholarship to SBC Students', category: 'Government', provider: 'OBC, SEBC, VJNT & SBC Welfare', deadline: '2026-03-20', status: 'Closing Soon', level: ['11th', '12th', 'UG', 'PG'], amount: 'Fees + Maint.', 
    benefitsDetail: '• Maintenance allowance and Freeship in institutions.', 
    eligibilityDetails: '• Income ≤ ₹1.50 Lac.\n• SBC category.\n• Maharashtra resident.', 
    documents: '• Caste & Income certs\n• Marksheets',
    link: 'https://mahadbt.maharashtra.gov.in',
    class_level: ['Class 11', 'Class 12', 'Graduation', 'Post Graduation'], country: ['India'], gender: DEFAULT_GENDERS, religion: DEFAULT_RELIGIONS, state: ['Maharashtra'], course: ['Engineering', 'Medical', 'Management']
  },
  { 
    id: 's_16', name: 'Vocational Training Fee Reimbursement (SC)', category: 'Government', provider: 'Social Justice Dept', deadline: '2026-04-30', status: 'Open', level: ['ITI', 'Diploma'], amount: '100% Course Fee', 
    benefitsDetail: '• Income ≤ ₹2.5L get GOI scholarship.\n• Income ₹2.5L - ₹8L get 100% course fee reimbursement.\n• SSC fail students eligible.', 
    eligibilityDetails: '• Admission through PPP scheme.\n• SC category.\n• Maharashtra Domicile.', 
    documents: '• Aadhaar\n• Marksheets\n• Caste & Income Certs',
    link: 'https://mahadbt.maharashtra.gov.in',
    class_level: ['ITI', 'Polytechnic/Diploma', 'Vocational Course'], country: ['India'], gender: DEFAULT_GENDERS, religion: DEFAULT_RELIGIONS, state: ['Maharashtra'], course: ['Engineering', 'Management']
  },
  { 
    id: 's_17', name: 'Maintenance Allowance for Professional Courses (SC)', category: 'Government', provider: 'Social Justice Dept', deadline: '2026-04-30', status: 'Open', level: ['UG', 'PG'], amount: '₹5k-₹10k / year', 
    benefitsDetail: '• Allowance for books, stationery, accommodation, and food. ₹5,000 to ₹10,000 per annum.', 
    eligibilityDetails: '• Enrolled in a professional course.\n• Recipient of GOI scholarship.\n• Income ≤ ₹2.5 lakh.\n• Residing in a hostel.', 
    documents: '• College Admission Receipt\n• Warden Letter\n• Income Cert',
    link: 'https://mahadbt.maharashtra.gov.in',
    class_level: ['Graduation', 'Post Graduation'], country: ['India'], gender: DEFAULT_GENDERS, religion: DEFAULT_RELIGIONS, state: ['Maharashtra'], course: ['Engineering', 'Medical', 'Management']
  },
  { 
    id: 's_18', name: 'Rajarshri Chhatrapati Shahu Maharaj Merit Scholarship (SC)', category: 'Merit-based', provider: 'Social Justice Dept', deadline: '2026-05-15', status: 'Open', level: ['11th', '12th'], amount: '₹300/month', 
    benefitsDetail: '• ₹300 per month for 10 months during Classes 11 and 12.', 
    eligibilityDetails: '• SC category.\n• No income limit.\n• Secured 75%+ in Class 10 (SSC).', 
    documents: '• Caste Cert\n• 10th Marksheet\n• 11th Admission Receipt',
    link: 'https://mahadbt.maharashtra.gov.in',
    class_level: ['Class 11', 'Class 12'], country: ['India'], gender: DEFAULT_GENDERS, religion: DEFAULT_RELIGIONS, state: ['Maharashtra'], course: ['Talent']
  },
  { 
    id: 's_19', name: 'Post-Matric Scholarship for Persons with Disability', category: 'Government', provider: 'Social Justice Dept', deadline: '2026-05-31', status: 'Open', level: ['11th', '12th', 'UG', 'PG'], amount: 'Maint. Allowance + Fees', 
    benefitsDetail: '• Allowance ₹230 to ₹1200/mo.\n• Extra allowance for blind students.\n• Mandatory fees covered.', 
    eligibilityDetails: '• 40%+ disability.\n• Maharashtra Domicile.', 
    documents: '• Disability Cert\n• Domicile\n• Marksheets',
    link: 'https://mahadbt.maharashtra.gov.in',
    class_level: ['Class 11', 'Class 12', 'Graduation', 'Post Graduation'], country: ['India'], gender: DEFAULT_GENDERS, religion: DEFAULT_RELIGIONS, state: ['Maharashtra'], course: ['Engineering', 'Medical', 'Management']
  },
  { 
    id: 's_20', name: 'Eklavya Scholarship', category: 'Merit-based', provider: 'Directorate of Higher Education', deadline: '2026-06-30', status: 'Open', level: ['PG'], amount: '₹5,000', 
    benefitsDetail: '• ₹5,000 for all selected students based on merit.', 
    eligibilityDetails: '• Graduated in Law/Commerce/Arts with ≥60%, or Science with ≥70%.\n• Income ≤ ₹75,000.\n• Cannot have part/full-time job.', 
    documents: '• Income Cert (Tahsildar)\n• Previous Marksheet\n• Domicile',
    link: 'https://mahadbt.maharashtra.gov.in',
    class_level: ['Post Graduation'], country: ['India'], gender: DEFAULT_GENDERS, religion: DEFAULT_RELIGIONS, state: ['Maharashtra'], course: ['Talent', 'Management']
  },
  { 
    id: 's_21', name: 'Scholarship for Minority Communities (DTE)', category: 'Government', provider: 'Minority Development Dept', deadline: '2026-08-31', status: 'Open', level: ['UG', 'PG', 'Diploma'], amount: 'Up to ₹50,000/yr', 
    benefitsDetail: '• Up to ₹50,000 per annum or actual fees, whichever is less.', 
    eligibilityDetails: '• Maharashtra domicile.\n• Recognised professional/technical course via CAP.\n• Income ≤ ₹8 lakh.\n• Minority status.', 
    documents: '• Minority Status Declaration\n• Income Cert\n• Domicile',
    link: 'https://mahadbt.maharashtra.gov.in',
    class_level: ['Graduation', 'Post Graduation', 'Polytechnic/Diploma'], country: ['India'], gender: DEFAULT_GENDERS, religion: ['Muslim', 'Christian', 'Sikh', 'Buddhism', 'Parsi', 'Jain'], state: ['Maharashtra'], course: ['Engineering', 'Medical', 'Management']
  },

  // --- PRIVATE & ABROAD SCHOLARSHIPS ---
  { 
    id: 'p_1', name: 'InspirAsian Scholarships', category: 'Private', provider: 'InspirAsian', deadline: '2026-12-31', status: 'Open', level: ['12th', 'UG'], amount: 'Varies', 
    benefitsDetail: '• Supports graduating high school seniors with college educational awards.', 
    eligibilityDetails: '• Graduating seniors residing in states with a participating InspirASIAN chapter.', 
    documents: '• Check official website for details.',
    link: 'https://www.inspirasian.us/scholarships/',
    class_level: ['Class 12', 'Graduation'], country: ['Study Abroad'], gender: DEFAULT_GENDERS, religion: DEFAULT_RELIGIONS, state: FILTER_OPTIONS.states, course: ['Engineering', 'Medical', 'Management']
  },
  { 
    id: 'p_2', name: 'TheDream.US Scholarship', category: 'Private', provider: 'TheDream.US', deadline: '2026-02-28', status: 'Closed', level: ['12th', 'UG'], amount: 'Full Tuition', 
    benefitsDetail: '• National Scholarship for recent high school grads.\n• Opportunity Scholarship for out-of-state tuition barriers.', 
    eligibilityDetails: '• Ambitious undocumented students who cannot afford college costs.', 
    documents: '• Check official website for details.',
    link: 'https://thedream.us/scholarships/',
    class_level: ['Class 12', 'Graduation'], country: ['Study Abroad'], gender: DEFAULT_GENDERS, religion: DEFAULT_RELIGIONS, state: FILTER_OPTIONS.states, course: ['Engineering', 'Medical', 'Management']
  },
  { 
    id: 'p_3', name: 'Minority Scholarship Opportunities', category: 'Private', provider: 'JLV College Counseling', deadline: '2026-12-31', status: 'Open', level: ['UG', 'PG'], amount: 'Varies', 
    benefitsDetail: '• Directory of scholarships for minority, first-gen, and international students.', 
    eligibilityDetails: '• Varies by specific opportunity.', 
    documents: '• Check official website for details.',
    link: 'https://jlvcollegecounseling.com/scholarships/',
    class_level: ['Graduation', 'Post Graduation'], country: ['Study Abroad'], gender: DEFAULT_GENDERS, religion: DEFAULT_RELIGIONS, state: FILTER_OPTIONS.states, course: ['Engineering', 'Medical', 'Management']
  },
  { 
    id: 'p_4', name: 'The Gates Scholarship', category: 'Private', provider: 'The Gates Scholarship', deadline: '2025-09-15', status: 'Closed', level: ['12th', 'UG'], amount: 'Full Ride', 
    benefitsDetail: '• Highly selective, full-ride scholarship for undergraduate studies.', 
    eligibilityDetails: '• Outstanding minority high school seniors from low-income households.', 
    documents: '• Check official website for details.',
    link: 'https://www.thegatesscholarship.org/scholarship',
    class_level: ['Class 12', 'Graduation'], country: ['Study Abroad'], gender: DEFAULT_GENDERS, religion: DEFAULT_RELIGIONS, state: FILTER_OPTIONS.states, course: ['Engineering', 'Medical', 'Management', 'Talent']
  },
  { 
    id: 'p_5', name: 'Posse Foundation Scholarship', category: 'Private', provider: 'Posse Foundation', deadline: '2025-12-01', status: 'Closed', level: ['12th', 'UG'], amount: 'Full Ride', 
    benefitsDetail: '• Full-ride scholarships to partner schools, leadership training, and career dev.', 
    eligibilityDetails: '• Nominated students from diverse backgrounds showing leadership.', 
    documents: '• Check official website for details.',
    link: 'https://www.possefoundation.org',
    class_level: ['Class 12', 'Graduation'], country: ['Study Abroad'], gender: DEFAULT_GENDERS, religion: DEFAULT_RELIGIONS, state: FILTER_OPTIONS.states, course: ['Engineering', 'Medical', 'Management', 'Talent']
  },
  { 
    id: 'p_6', name: 'QuestBridge National College Match', category: 'Private', provider: 'QuestBridge', deadline: '2025-09-26', status: 'Closed', level: ['12th', 'UG'], amount: 'Full Ride', 
    benefitsDetail: '• Full four-year scholarships to QuestBridge college partners.', 
    eligibilityDetails: '• High-achieving, low-income high school seniors.', 
    documents: '• Check official website for details.',
    link: 'https://www.questbridge.org',
    class_level: ['Class 12', 'Graduation'], country: ['Study Abroad'], gender: DEFAULT_GENDERS, religion: DEFAULT_RELIGIONS, state: FILTER_OPTIONS.states, course: ['Engineering', 'Medical', 'Management', 'Talent']
  },
  { 
    id: 'p_7', name: 'Dell Scholars Program', category: 'Private', provider: 'Dell Scholars Program', deadline: '2025-12-01', status: 'Closed', level: ['12th', 'UG'], amount: '$20,000 + Tech', 
    benefitsDetail: '• $20,000 scholarship, a laptop, and non-monetary textbook/mentoring support.', 
    eligibilityDetails: '• 500 low-income, highly motivated students selected annually.', 
    documents: '• Check official website for details.',
    link: 'https://www.dellscholars.org',
    class_level: ['Class 12', 'Graduation'], country: ['Study Abroad'], gender: DEFAULT_GENDERS, religion: DEFAULT_RELIGIONS, state: FILTER_OPTIONS.states, course: ['Engineering', 'Medical', 'Management', 'Talent']
  },
  { 
    id: 'p_8', name: 'Jack Kent Cooke Scholarship', category: 'Private', provider: 'Jack Kent Cooke Foundation', deadline: '2025-11-14', status: 'Closed', level: ['12th', 'UG'], amount: 'Up to $55k/yr', 
    benefitsDetail: '• Generous undergraduate scholarship program.', 
    eligibilityDetails: '• High-achieving high school seniors with financial need targeting top 4-year colleges.', 
    documents: '• Check official website for details.',
    link: 'https://www.jkcf.org',
    class_level: ['Class 12', 'Graduation'], country: ['Study Abroad'], gender: DEFAULT_GENDERS, religion: DEFAULT_RELIGIONS, state: FILTER_OPTIONS.states, course: ['Engineering', 'Medical', 'Management', 'Talent']
  },
  { 
    id: 'p_9', name: 'Coca-Cola Scholarship', category: 'Merit-based', provider: 'Coca-Cola Scholars Foundation', deadline: '2025-10-31', status: 'Closed', level: ['12th', 'UG'], amount: '$20,000', 
    benefitsDetail: '• Achievement-based scholarship of $20,000.', 
    eligibilityDetails: '• Graduating high school seniors recognized for capacity to lead and serve.', 
    documents: '• Check official website for details.',
    link: 'https://www.coca-colascholarsfoundation.org',
    class_level: ['Class 12', 'Graduation'], country: ['Study Abroad'], gender: DEFAULT_GENDERS, religion: DEFAULT_RELIGIONS, state: FILTER_OPTIONS.states, course: ['Engineering', 'Medical', 'Management', 'Talent']
  },
  { 
    id: 'p_10', name: 'The Jackie Robinson Foundation Scholarship', category: 'Private', provider: 'Jackie Robinson Foundation', deadline: '2026-01-11', status: 'Closed', level: ['12th', 'UG'], amount: 'Up to $35,000', 
    benefitsDetail: '• Multi-faceted experience addressing financial needs and guiding through college.', 
    eligibilityDetails: '• Graduating minority high school senior.\n• US Citizen.\n• Evidence of financial need.', 
    documents: '• Check official website for details.',
    link: 'https://jackierobinson.org',
    class_level: ['Class 12', 'Graduation'], country: ['Study Abroad'], gender: DEFAULT_GENDERS, religion: DEFAULT_RELIGIONS, state: FILTER_OPTIONS.states, course: ['Engineering', 'Medical', 'Management', 'Talent']
  },
  { 
    id: 'p_11', name: 'College JumpStart Scholarship', category: 'Private', provider: 'College JumpStart', deadline: '2026-04-15', status: 'Open', level: ['10th', '11th', '12th', 'UG'], amount: '$1,000', 
    benefitsDetail: '• First place prize is a $1,000 scholarship for educational expenses.', 
    eligibilityDetails: '• Open to 10th-12th graders, college students, and non-traditional students.', 
    documents: '• Check official website for details.',
    link: 'https://www.jumpstart-scholarship.net',
    class_level: ['Class 10', 'Class 11', 'Class 12', 'Graduation'], country: ['Study Abroad'], gender: DEFAULT_GENDERS, religion: DEFAULT_RELIGIONS, state: FILTER_OPTIONS.states, course: ['Engineering', 'Medical', 'Management']
  },
  { 
    id: 'p_12', name: 'Hispanic Scholarship Fund', category: 'Private', provider: 'HSF', deadline: '2026-02-15', status: 'Closed', level: ['12th', 'UG', 'PG'], amount: '$500 - $5,000', 
    benefitsDetail: '• Selects 10,000 scholars annually to receive varying monetary awards.', 
    eligibilityDetails: '• Hispanic heritage students demonstrating academic excellence.', 
    documents: '• Check official website for details.',
    link: 'https://www.hsf.net/scholarship',
    class_level: ['Class 12', 'Graduation', 'Post Graduation'], country: ['Study Abroad'], gender: DEFAULT_GENDERS, religion: DEFAULT_RELIGIONS, state: FILTER_OPTIONS.states, course: ['Engineering', 'Medical', 'Management', 'Talent']
  },
];

// --- Comprehensive Exam Database ---
// Keeping original mock exams exactly as provided...
const comprehensiveExams: Exam[] = [
  // 📘 EXAMS AFTER 9TH CLASS
  { 
    id: 'e9_1', 
    name: 'Pre-Secondary Scholarship (PSS) Exam', 
    category: 'Scholarship', 
    stage: 'After 9th', 
    conductedBy: 'MSCE, Pune', 
    eligibility: '• Class 8 regular student in Maharashtra.\n• Max age 14 yrs (up to 18 for physically disabled).\n• Parents must have resided in Maharashtra for 15+ years.\n• Annual family income < ₹2,00,000 for specific categories.', 
    pattern: '• Offline OMR mode.\n• Paper I: First Language & Maths (75 Qs, 150 Marks, 90 Mins).\n• Paper II: Third Language & Intelligence Test (75 Qs, 150 Marks, 90 Mins).\n• Passing Criteria: 40% marks in each paper.', 
    duration: '180 Minutes Total', 
    fee: '₹150', 
    frequency: 'Annually', 
    website: 'https://mscepuppss.in', 
    description: 'State-level competitive exam by MSCE Pune for Class 8. 2026 Exam is on Feb 22. Results expected in July 2026.', 
    career: '• Financial assistance of ₹100 to ₹500 per month.\n• Approximately ₹7,500 annually based on merit rank and category.', 
    examDate: '2026-02-22' 
  },
  { id: 'e9_2', name: 'Primary Scholarship Exam', category: 'Scholarship', stage: 'After 9th', conductedBy: 'State Board', eligibility: 'Class 5/8 students', pattern: 'MCQ', duration: '2 Hours', fee: '₹100', frequency: 'Annually', website: '#', description: 'Foundation scholarship for younger students.', career: 'Academic recognition and aid.', examDate: '2026-03-10' },
  { id: 'e9_3', name: 'Pre-Upper Primary Scholarship', category: 'Scholarship', stage: 'After 9th', conductedBy: 'State Board', eligibility: 'Class 5 Students', pattern: 'MCQ', duration: '2 Hours', fee: '₹100', frequency: 'Annually', website: '#', description: 'Identifies talent at the upper primary level.', career: 'Merit recognition.', examDate: '2026-02-20' },
  { id: 'e9_4', name: 'Higher Primary Scholarship Exam', category: 'Scholarship', stage: 'After 9th', conductedBy: 'State Board', eligibility: 'Class 8 Students', pattern: 'MCQ', duration: '2 Hours', fee: '₹150', frequency: 'Annually', website: '#', description: 'Scholarship program for higher primary students.', career: 'Merit-based financial aid.', examDate: '2026-02-25' },
  { id: 'e9_5', name: 'National Talent Search Examination (NTSE)', category: 'Talent Search', stage: 'After 9th', conductedBy: 'NCERT', eligibility: 'Class 10 students (Prep in 9th)', pattern: 'MAT & SAT (MCQ)', duration: '4 Hours', fee: 'Varies', frequency: 'Annually', website: 'https://ncert.nic.in', description: 'Prestigious national scholarship identifying top talent.', career: 'Monthly scholarship up to Ph.D. level.', examDate: '2026-11-15' },
  { id: 'e9_6', name: 'National Level Science Talent Search Examination (NSTSE)', category: 'Science', stage: 'After 9th', conductedBy: 'Unified Council', eligibility: 'Class 2-12', pattern: 'MCQ', duration: '1 Hour', fee: '₹300', frequency: 'Annually', website: '#', description: 'Assesses scientific aptitude and understanding.', career: 'National recognition and science foundation.', examDate: '2026-12-05' },
  { id: 'e9_7', name: 'SOF Olympiads', category: 'Olympiad', stage: 'After 9th', conductedBy: 'SOF', eligibility: 'Class 1-12', pattern: 'MCQ (Math, Science, Cyber, English)', duration: '1 Hour', fee: '₹150/Subject', frequency: 'Annually', website: 'https://sofworld.org', description: 'International Olympiads in multiple subjects.', career: 'Global ranking, awards, and analytical growth.', examDate: '2026-10-20' },
  { id: 'e9_8', name: 'Kishore Vaigyanik Protsahan Yojana (KVPY)', category: 'Science Fellowship', stage: 'After 9th', conductedBy: 'IISc', eligibility: 'Class 11 (Prep in 9th/10th)', pattern: 'Online MCQ', duration: '3 Hours', fee: '₹1000', frequency: 'Annually', website: '#', description: 'National fellowship program for research careers.', career: 'Direct admission to IISER/IISc, Research grants.', examDate: '2026-11-05' },
  { id: 'e9_9', name: 'Dr. Homi Bhabha Balvaidnyanik Competition', category: 'Science', stage: 'After 9th', conductedBy: 'MSTA', eligibility: 'Class 6 & 9', pattern: 'Theory + Practical + Interview', duration: '2 Hours', fee: '₹300', frequency: 'Annually', website: 'https://msta.in', description: 'Encourages pure science research at a young age.', career: 'Gold/Silver medals, research exposure.', examDate: '2026-10-15' },
  { id: 'e9_10', name: 'State Scholarship Exams', category: 'Scholarship', stage: 'After 9th', conductedBy: 'Respective States', eligibility: 'Class 9/10 Students', pattern: 'MCQ', duration: 'Varies', fee: 'Varies', frequency: 'Annually', website: '#', description: 'State-sponsored financial aid tests.', career: 'State-level merit lists and funding.', examDate: 'TBA' },
  { id: 'e9_11', name: 'Maharashtra Talent Search Examination (MTSE)', category: 'Talent Search', stage: 'After 9th', conductedBy: 'Wadia College', eligibility: 'Class 8, 9, 10', pattern: 'MAT & SAT', duration: '3 Hours', fee: '₹250', frequency: 'Annually', website: '#', description: 'State level talent search and NTSE prep.', career: 'Scholarships and competitive exam readiness.', examDate: '2026-04-25' },
  { id: 'e9_12', name: 'National Science Olympiad (NSO)', category: 'Olympiad', stage: 'After 9th', conductedBy: 'SOF', eligibility: 'Class 1-12', pattern: 'MCQ (Science & Logical Reasoning)', duration: '1 Hour', fee: '₹150', frequency: 'Annually', website: 'https://sofworld.org/nso', description: 'Assesses scientific aptitude and logical reasoning.', career: 'Medals, cash awards, and international recognition.', examDate: '2026-10-18' },
  { id: 'e9_13', name: 'International Mathematics Olympiad (IMO)', category: 'Olympiad', stage: 'After 9th', conductedBy: 'SOF', eligibility: 'Class 1-12', pattern: 'MCQ (Mathematics & Logical Reasoning)', duration: '1 Hour', fee: '₹150', frequency: 'Annually', website: 'https://sofworld.org/imo', description: 'Tests mathematical and analytical skills.', career: 'International ranking and scholarships.', examDate: '2026-11-22' },
  { id: 'e9_14', name: 'National Standard Examination in Junior Science (NSEJS)', category: 'Science', stage: 'After 9th', conductedBy: 'IAPT', eligibility: 'Class 9 & 10 (Age limits apply)', pattern: 'MCQ (Physics, Chemistry, Biology)', duration: '2 Hours', fee: '₹200', frequency: 'Annually', website: 'https://iapt.org.in', description: 'First stage for International Junior Science Olympiad (IJSO).', career: 'Pathway to international science olympiads.', examDate: '2026-11-25' },
  { id: 'e9_15', name: 'National Cyber Olympiad (NCO)', category: 'Olympiad', stage: 'After 9th', conductedBy: 'SOF', eligibility: 'Class 1-10', pattern: 'MCQ (Computers & IT)', duration: '1 Hour', fee: '₹150', frequency: 'Annually', website: 'https://sofworld.org/nco', description: 'Focuses on computer and IT knowledge.', career: 'Builds foundation for IT and tech careers.', examDate: '2026-12-20' },
  { id: 'e9_16', name: 'International English Olympiad (IEO)', category: 'Olympiad', stage: 'After 9th', conductedBy: 'SOF', eligibility: 'Class 1-12', pattern: 'MCQ (English Language)', duration: '1 Hour', fee: '₹150', frequency: 'Annually', website: 'https://sofworld.org/ieo', description: 'Evaluates English language and grammar proficiency.', career: 'Improves communication skills and global readiness.', examDate: '2026-10-15' },
  { id: 'e9_17', name: 'General Knowledge International Olympiad (GKIO)', category: 'Olympiad', stage: 'After 9th', conductedBy: 'Various', eligibility: 'Class 1-10', pattern: 'MCQ (General Awareness)', duration: '1 Hour', fee: '₹150', frequency: 'Annually', website: '#', description: 'Tests general knowledge and current affairs.', career: 'Enhances general awareness for competitive exams.', examDate: 'TBA' },
  { id: 'e9_18', name: 'National Social Studies Olympiad (NSSO)', category: 'Olympiad', stage: 'After 9th', conductedBy: 'Various', eligibility: 'Class 1-10', pattern: 'MCQ (History, Geography, Civics)', duration: '1 Hour', fee: '₹150', frequency: 'Annually', website: '#', description: 'Focuses on social sciences and humanities.', career: 'Good foundation for civil services and humanities.', examDate: 'TBA' },
  { id: 'e9_19', name: 'International Computer Olympiad (ICO)', category: 'Olympiad', stage: 'After 9th', conductedBy: 'Various', eligibility: 'Class 1-10', pattern: 'MCQ (Computer Science)', duration: '1 Hour', fee: '₹150', frequency: 'Annually', website: '#', description: 'Promotes computer science education.', career: 'Software engineering and IT foundation.', examDate: 'TBA' },
  { id: 'e9_20', name: 'Unified Cyber Olympiad (UCO)', category: 'Olympiad', stage: 'After 9th', conductedBy: 'Unified Council', eligibility: 'Class 2-10', pattern: 'MCQ (Mental Ability, Reasoning, Computer)', duration: '1 Hour', fee: '₹300', frequency: 'Annually', website: 'https://unifiedcouncil.com', description: 'Combines mental ability and cyber concepts.', career: 'Prepares for modern digital challenges.', examDate: '2026-10-10' },
  { id: 'e9_21', name: 'National Essay Olympiad (NESO)', category: 'Olympiad', stage: 'After 9th', conductedBy: 'Various', eligibility: 'Class 1-10', pattern: 'Descriptive (Essay Writing)', duration: '1 Hour', fee: '₹150', frequency: 'Annually', website: '#', description: 'Develops creative writing and articulation skills.', career: 'Enhances expression for future professional roles.', examDate: 'TBA' },

  // 📘 EXAMS AFTER 10TH CLASS
  { id: 'e10_1', name: 'CBSE Board Examination', category: 'Board Exam', stage: 'After 10th', conductedBy: 'CBSE', eligibility: 'Class 10 Enrolled', pattern: 'Subjective + MCQ', duration: '3 Hours/Subject', fee: '₹1500', frequency: 'Annually', website: 'https://cbse.gov.in', description: 'Central board final examination.', career: 'Qualifies for 11th admission in desired streams.', examDate: '2026-02-15' },
  { id: 'e10_2', name: 'ICSE Board Examination', category: 'Board Exam', stage: 'After 10th', conductedBy: 'CISCE', eligibility: 'Class 10 Enrolled', pattern: 'Subjective + MCQ', duration: '2-3 Hours/Subject', fee: 'Varies', frequency: 'Annually', website: 'https://cisce.org', description: 'Council for the Indian School Certificate Exams.', career: 'Qualifies for higher secondary education.', examDate: '2026-02-20' },
  { id: 'e10_3', name: 'Maharashtra SSC Board Examination', category: 'Board Exam', stage: 'After 10th', conductedBy: 'MSBSHSE', eligibility: 'Class 10 Enrolled', pattern: 'Subjective + MCQ', duration: '2-3 Hours', fee: '₹400', frequency: 'Annually', website: 'https://mahahsscboard.in', description: 'State board final examination.', career: 'Qualifies for FYJC (11th) admissions.', examDate: '2026-03-01' },
  { id: 'e10_4', name: 'Polytechnic Entrance Exams', category: 'Engineering Diploma', stage: 'After 10th', conductedBy: 'State Technical Boards', eligibility: '10th Pass with 35%', pattern: 'MCQ (Math, Sci, English)', duration: '2 Hours', fee: '₹400', frequency: 'Annually', website: '#', description: 'Entrance for 3-year engineering diplomas.', career: 'Junior Engineer, Direct 2nd Yr B.Tech.', examDate: '2026-05-20' },
  { id: 'e10_5', name: 'National Defence Academy Examination', category: 'Defence', stage: 'After 10th', conductedBy: 'UPSC', eligibility: '10th pass (Preparation Phase)', pattern: 'Math + GAT', duration: '5 Hours', fee: '₹100', frequency: 'Twice a year', website: 'https://upsc.gov.in', description: 'Awareness and prep stage for actual 12th level NDA.', career: 'Army, Navy, Air Force Commissioned Officer.', examDate: 'TBA' },
  { id: 'e10_6', name: 'Science Olympiads', category: 'Olympiad', stage: 'After 10th', conductedBy: 'HBCSE', eligibility: 'Class 10/11 Students', pattern: 'Theory + Practical', duration: '3 Hours', fee: '₹200', frequency: 'Annually', website: 'https://olympiads.hbcse.tifr.res.in', description: 'National and International science competitions.', career: 'Global medals, direct university invites.', examDate: '2026-11-25' },
  { id: 'e10_7', name: 'NTSE (Stage preparation)', category: 'Talent Search', stage: 'After 10th', conductedBy: 'NCERT', eligibility: 'Class 10 Students', pattern: 'MAT + SAT', duration: '4 Hours', fee: 'None (State tier varies)', frequency: 'Annually', website: '#', description: 'Final stage for the National Talent Search.', career: 'Lifelong scholarship.', examDate: '2026-05-10' },
  { id: 'e10_8', name: 'KVPY (SA Stream)', category: 'Science Fellowship', stage: 'After 10th', conductedBy: 'IISc', eligibility: 'Class 11 Enrolled (Sci)', pattern: 'Online MCQ', duration: '3 Hours', fee: '₹1000', frequency: 'Annually', website: '#', description: 'Fellowship for basic sciences.', career: 'Direct entry to IISc/IISER.', examDate: '2026-11-05' },
  { id: 'e10_9', name: 'Other Talent Search Exams', category: 'Scholarship', stage: 'After 10th', conductedBy: 'Various NGOs', eligibility: 'Class 10 Pass', pattern: 'Aptitude', duration: 'Varies', fee: 'Varies', frequency: 'Annually', website: '#', description: 'Private and NGO talent search exams.', career: 'Cash prizes and tuition waivers.', examDate: 'TBA' },
  { id: 'e10_10', name: 'Pariksha Pe Charcha', category: 'Interactive', stage: 'After 10th', conductedBy: 'Govt of India', eligibility: 'Class 9-12', pattern: 'Creative Writing', duration: 'N/A', fee: 'Free', frequency: 'Annually', website: 'https://innovateindia.mygov.in/ppc/', description: 'Interactive program with the Prime Minister.', career: 'Certificates and interaction opportunity.', examDate: '2026-01-20' },
  { id: 'e10_11', name: 'ITI Entrance Exams', category: 'Vocational', stage: 'After 10th', conductedBy: 'State DGT', eligibility: '10th Pass', pattern: 'Merit / Entrance Test', duration: '2 Hours', fee: '₹200', frequency: 'Annually', website: '#', description: 'Industrial Training Institute admissions.', career: 'Electrician, Mechanic, Fitter, Welder roles.', examDate: '2026-06-15' },

  // 📘 EXAMS AFTER 12TH CLASS - ENGINEERING
  { id: 'e12_1', name: 'Joint Entrance Examination Main (JEE Main)', category: 'Engineering', stage: 'After 12th', conductedBy: 'NTA', eligibility: '12th Pass (PCM)', pattern: 'Online CBT', duration: '3 Hours', fee: '₹1000', frequency: 'Twice a year', website: 'https://jeemain.nta.nic.in', description: 'Gateway to NITs, IIITs and JEE Advanced.', career: 'B.Tech/B.E. Engineering degrees.', examDate: '2026-04-05' },
  { id: 'e12_2', name: 'Joint Entrance Examination Advanced', category: 'Engineering', stage: 'After 12th', conductedBy: 'IITs', eligibility: 'Top 2.5 Lakh in JEE Main', pattern: 'Online CBT (Paper 1 & 2)', duration: '6 Hours', fee: '₹2900', frequency: 'Annually', website: 'https://jeeadv.ac.in', description: 'Exclusive entrance exam for the IITs.', career: 'B.Tech in IITs.', examDate: '2026-05-25' },
  { id: 'e12_3', name: 'BITS Admission Test (BITSAT)', category: 'Engineering', stage: 'After 12th', conductedBy: 'BITS Pilani', eligibility: '12th Pass (PCM, 75%)', pattern: 'Online CBT', duration: '3 Hours', fee: '₹3400', frequency: 'Twice a year', website: 'https://bitsadmission.com', description: 'Entrance for BITS Pilani, Goa, and Hyderabad.', career: 'Premium Private B.Tech degrees.', examDate: '2026-05-15' },
  { id: 'e12_4', name: 'VIT Engineering Entrance Examination (VITEEE)', category: 'Engineering', stage: 'After 12th', conductedBy: 'VIT University', eligibility: '12th Pass (PCM, 60%)', pattern: 'Online CBT', duration: '2.5 Hours', fee: '₹1350', frequency: 'Annually', website: 'https://vit.ac.in', description: 'Entrance for VIT Vellore, Chennai, AP, Bhopal.', career: 'B.Tech Programs.', examDate: '2026-04-19' },
  { id: 'e12_5', name: 'SRM Joint Engineering Entrance Examination', category: 'Engineering', stage: 'After 12th', conductedBy: 'SRM Institute', eligibility: '12th Pass (PCM, 50%)', pattern: 'Online CBT', duration: '2.5 Hours', fee: '₹1200', frequency: 'Multiple phases', website: 'https://srmist.edu.in', description: 'Entrance for SRM University campuses.', career: 'B.Tech Programs.', examDate: '2026-04-20' },
  { id: 'e12_6', name: 'Manipal Entrance Test (MET)', category: 'Engineering', stage: 'After 12th', conductedBy: 'MAHE', eligibility: '12th Pass (PCM, 50%)', pattern: 'Online CBT', duration: '2 Hours', fee: '₹1400', frequency: 'Annually', website: 'https://manipal.edu', description: 'Entrance for Manipal Academy of Higher Education.', career: 'B.Tech & other allied programs.', examDate: '2026-04-16' },
  { id: 'e12_7', name: 'State CET Exams', category: 'Engineering', stage: 'After 12th', conductedBy: 'State Governments', eligibility: '12th Pass (PCM)', pattern: 'Online CBT', duration: 'Varies', fee: 'Varies', frequency: 'Annually', website: '#', description: 'Entrance for state-level engineering colleges.', career: 'State university B.Tech admissions.', examDate: 'May 2026' },
  { id: 'e12_8', name: 'MHT-CET', category: 'Engineering', stage: 'After 12th', conductedBy: 'Maharashtra CET Cell', eligibility: '12th Pass (PCM/PCB)', pattern: 'Online CBT', duration: '3 Hours', fee: '₹800', frequency: 'Annually', website: 'https://cetcell.mahacet.org', description: 'Entrance for Engg & Pharma in Maharashtra.', career: 'B.Tech, B.Pharm in MH state colleges.', examDate: '2026-05-05' },

  // 📘 AFTER 12TH - MEDICAL
  { id: 'e12_9', name: 'National Eligibility cum Entrance Test (NEET-UG)', category: 'Medical', stage: 'After 12th', conductedBy: 'NTA', eligibility: '12th Pass (PCB, 50%)', pattern: 'Offline OMR', duration: '3 Hrs 20 Mins', fee: '₹1700', frequency: 'Annually', website: 'https://neet.nta.nic.in', description: 'Single national entrance for medical courses.', career: 'MBBS, BDS, BAMS, BHMS.', examDate: '2026-05-03' },
  { id: 'e12_10', name: 'AIIMS Nursing Entrance Exam', category: 'Medical', stage: 'After 12th', conductedBy: 'AIIMS', eligibility: '12th Pass (PCB, Female for B.Sc)', pattern: 'Online CBT', duration: '2 Hours', fee: '₹2000', frequency: 'Annually', website: 'https://aiimsexams.ac.in', description: 'Entrance for B.Sc & M.Sc Nursing at AIIMS.', career: 'Nursing Professional in premium institutes.', examDate: '2026-06-08' },
  { id: 'e12_11', name: 'JIPMER Nursing Entrance Exam', category: 'Medical', stage: 'After 12th', conductedBy: 'JIPMER', eligibility: '12th Pass (PCB)', pattern: 'Online CBT', duration: '1.5 Hours', fee: '₹1500', frequency: 'Annually', website: 'https://jipmer.edu.in', description: 'Nursing entrance for JIPMER.', career: 'B.Sc Nursing.', examDate: '2026-07-02' },
  { id: 'e12_12', name: 'AFMC Pune MBBS Entrance', category: 'Medical', stage: 'After 12th', conductedBy: 'AFMC (via NEET)', eligibility: 'NEET Qualified + Physical Fitness', pattern: 'NEET Score + ToELR + Interview', duration: 'Varies', fee: 'Via NEET', frequency: 'Annually', website: 'https://afmc.nic.in', description: 'Armed Forces Medical College admission.', career: 'Commissioned Medical Officer in Armed Forces.', examDate: 'Post NEET' },

  // 📘 AFTER 12TH - DEFENCE
  { id: 'e12_13', name: 'NDA & NA', category: 'Defence', stage: 'After 12th', conductedBy: 'UPSC', eligibility: '12th Pass (16.5 - 19.5 years)', pattern: 'Offline Written + SSB', duration: '5 Hours', fee: '₹100', frequency: 'Twice a year', website: 'https://upsc.gov.in', description: 'National Defence Academy and Naval Academy.', career: 'Officer in Army, Navy, Air Force.', examDate: '2026-04-19' },
  { id: 'e12_14', name: 'Indian Navy B.Tech Entry', category: 'Defence', stage: 'After 12th', conductedBy: 'Indian Navy', eligibility: '12th Pass (PCM 70%) + JEE Main', pattern: 'SSB Interview based on JEE', duration: '5 Days (SSB)', fee: 'Nil', frequency: 'Twice a year', website: 'https://joinindiannavy.gov.in', description: 'Direct entry scheme for B.Tech in Indian Navy.', career: 'Naval Officer + B.Tech Degree.', examDate: 'Varies' },
  { id: 'e12_15', name: 'Indian Army TES Entry', category: 'Defence', stage: 'After 12th', conductedBy: 'Indian Army', eligibility: '12th Pass (PCM 60%) + JEE Main', pattern: 'SSB Interview', duration: '5 Days (SSB)', fee: 'Nil', frequency: 'Twice a year', website: 'https://joinindianarmy.nic.in', description: 'Technical Entry Scheme for Indian Army.', career: 'Army Officer (Lieutenant) + B.Tech.', examDate: 'Varies' },

  // 📘 AFTER 12TH - LAW
  { id: 'e12_16', name: 'Common Law Admission Test (CLAT)', category: 'Law', stage: 'After 12th', conductedBy: 'Consortium of NLUs', eligibility: '12th Pass (45%)', pattern: 'Offline Comprehension based', duration: '2 Hours', fee: '₹4000', frequency: 'Annually', website: 'https://consortiumofnlus.ac.in', description: 'Entrance for 22+ National Law Universities.', career: 'Corporate Lawyer, Litigation, Judge.', examDate: '2026-12-01' },
  { id: 'e12_17', name: 'All India Law Entrance Test (AILET)', category: 'Law', stage: 'After 12th', conductedBy: 'NLU Delhi', eligibility: '12th Pass (45%)', pattern: 'Offline', duration: '2 Hours', fee: '₹3500', frequency: 'Annually', website: 'https://nludelhi.ac.in', description: 'Exclusive entrance for NLU Delhi.', career: 'Premium Legal careers.', examDate: '2026-12-08' },
  { id: 'e12_18', name: 'Law School Admission Test (LSAT India)', category: 'Law', stage: 'After 12th', conductedBy: 'Pearson VUE', eligibility: '12th Pass', pattern: 'Online Home Proctored', duration: '2 Hrs 20 Mins', fee: '₹3999', frequency: 'Twice a year', website: 'https://discoverlaw.in', description: 'Accepted by multiple private law colleges in India.', career: 'Legal professional.', examDate: '2026-05-15' },

  // 📘 AFTER 12TH - MANAGEMENT
  { id: 'e12_19', name: 'IPMAT', category: 'Management', stage: 'After 12th', conductedBy: 'IIM Indore/Rohtak', eligibility: '12th Pass (60%)', pattern: 'Online CBT', duration: '2 Hours', fee: '₹4140', frequency: 'Annually', website: 'https://iimidr.ac.in', description: 'Integrated Program in Management Aptitude Test.', career: 'BBA + MBA from IIM.', examDate: '2026-05-23' },
  { id: 'e12_20', name: 'Common University Entrance Test (CUET)', category: 'Management', stage: 'After 12th', conductedBy: 'NTA', eligibility: '12th Pass', pattern: 'Online CBT', duration: 'Varies by subjects', fee: '₹750+', frequency: 'Annually', website: 'https://cuet.samarth.ac.in', description: 'Unified entrance for central universities.', career: 'BBA, BMS, B.Com, BA, B.Sc.', examDate: '2026-05-15' },
  { id: 'e12_21', name: 'DU JAT (via CUET)', category: 'Management', stage: 'After 12th', conductedBy: 'NTA', eligibility: '12th Pass (Maths required)', pattern: 'Online CBT', duration: 'Varies', fee: 'Varies', frequency: 'Annually', website: '#', description: 'Delhi University Joint Admission Test (Now merged with CUET).', career: 'BMS, BBA(FIA) at Delhi University.', examDate: 'May 2026' },

  // 📘 AFTER 12TH - ARCHITECTURE & DESIGN
  { id: 'e12_22', name: 'National Aptitude Test in Architecture (NATA)', category: 'Architecture', stage: 'After 12th', conductedBy: 'CoA', eligibility: '12th Pass (PCM)', pattern: 'Online + Drawing', duration: '3 Hours', fee: '₹2000', frequency: 'Thrice a year', website: 'https://nata.in', description: 'Required for B.Arch admissions across India.', career: 'Architect, Urban Planner.', examDate: '2026-04-15' },
  { id: 'e12_23', name: 'Undergraduate Common Entrance Exam for Design (UCEED)', category: 'Architecture', stage: 'After 12th', conductedBy: 'IIT Bombay', eligibility: '12th Pass (Any Stream)', pattern: 'Online + Offline Sketching', duration: '3 Hours', fee: '₹3800', frequency: 'Annually', website: 'https://uceed.iitb.ac.in', description: 'Admissions to B.Des programs at IITs.', career: 'Industrial/Product/UI/UX Designer.', examDate: '2026-01-18' },
  { id: 'e12_24', name: 'NID Design Aptitude Test (DAT)', category: 'Architecture', stage: 'After 12th', conductedBy: 'NID', eligibility: '12th Pass (Any Stream)', pattern: 'Prelims (Written) + Mains (Studio)', duration: '3 Hours', fee: '₹3000', frequency: 'Annually', website: 'https://admissions.nid.edu', description: 'National Institute of Design entrance test.', career: 'Premium Design careers.', examDate: '2026-12-24' },

  // 📘 AFTER 12TH - HOTEL MANAGEMENT & AGRI & ABROAD
  { id: 'e12_25', name: 'NCHM JEE', category: 'Hotel Management', stage: 'After 12th', conductedBy: 'NTA', eligibility: '12th Pass with English', pattern: 'Online CBT', duration: '3 Hours', fee: '₹1000', frequency: 'Annually', website: 'https://nchmjee.nta.nic.in', description: 'Admission to B.Sc in Hospitality & Hotel Administration.', career: 'Hotel Manager, Chef, Hospitality Exec.', examDate: '2026-05-10' },
  { id: 'e12_26', name: 'IIHM eCHAT', category: 'Hotel Management', stage: 'After 12th', conductedBy: 'IIHM', eligibility: '12th Pass', pattern: 'Online CBT', duration: '1 Hour', fee: '₹600', frequency: 'Multiple times', website: 'https://echat.elink.in', description: 'Electronic Common Hospitality Aptitude Test.', career: 'Hospitality Management.', examDate: 'Varies' },
  { id: 'e12_27', name: 'ICAR AIEEA', category: 'Agriculture', stage: 'After 12th', conductedBy: 'NTA', eligibility: '12th Pass (PCB/PCM/PCA)', pattern: 'Online CBT', duration: '2.5 Hours', fee: '₹800', frequency: 'Annually', website: 'https://icar.nta.nic.in', description: 'All India Entrance Exam for Agriculture.', career: 'B.Sc Agriculture, Forestry, Fisheries.', examDate: '2026-06-15' },
  { id: 'e12_28', name: 'Scholastic Assessment Test (SAT)', category: 'Study Abroad', stage: 'After 12th', conductedBy: 'College Board', eligibility: 'High School Students', pattern: 'Digital', duration: '2 Hrs 14 Mins', fee: '$103', frequency: 'Multiple times', website: 'https://collegeboard.org', description: 'Undergraduate admissions, primarily in US.', career: 'Global university admissions.', examDate: 'Varies' },
  { id: 'e12_29', name: 'ACT Test', category: 'Study Abroad', stage: 'After 12th', conductedBy: 'ACT Inc', eligibility: 'High School Students', pattern: 'Online', duration: '3 Hours', fee: '$175', frequency: 'Multiple times', website: 'https://act.org', description: 'US college admissions test including Science.', career: 'Global university admissions.', examDate: 'Varies' },
  { id: 'e12_30', name: 'IELTS', category: 'Study Abroad', stage: 'After 12th', conductedBy: 'IDP/British Council', eligibility: 'Anyone', pattern: 'Reading, Writing, Listening, Speaking', duration: '2 Hrs 45 Mins', fee: '₹17,000', frequency: 'Weekly', website: 'https://ielts.org', description: 'English language proficiency test.', career: 'Study or migration to English-speaking countries.', examDate: 'Weekly' },
  { id: 'e12_31', name: 'TOEFL', category: 'Study Abroad', stage: 'After 12th', conductedBy: 'ETS', eligibility: 'Anyone', pattern: 'Internet Based (iBT)', duration: '2 Hours', fee: '$195', frequency: 'Weekly', website: 'https://ets.org/toefl', description: 'Test of English as a Foreign Language.', career: 'University admissions primarily in USA.', examDate: 'Weekly' },

  // 📘 POSTGRADUATE
  { id: 'pg_1', name: 'Common Admission Test (CAT)', category: 'Management', stage: 'Postgraduate', conductedBy: 'IIMs', eligibility: 'Bachelor\'s Degree (50%)', pattern: 'Online CBT', duration: '2 Hours', fee: '₹2400', frequency: 'Annually', website: 'https://iimcat.ac.in', description: 'Premier MBA entrance for IIMs and top B-schools.', career: 'MBA, PGDM, Corporate Leadership.', examDate: '2026-11-29' },
  { id: 'pg_2', name: 'CUET-PG', category: 'Postgraduate', stage: 'Postgraduate', conductedBy: 'NTA', eligibility: 'Bachelor\'s Degree', pattern: 'Online CBT', duration: '2 Hours', fee: '₹1200', frequency: 'Annually', website: 'https://cuet.nta.nic.in', description: 'Entrance for PG programs in Central Universities.', career: 'MA, M.Sc, M.Com, LLM.', examDate: '2026-06-05' },
  { id: 'pg_3', name: 'MAH-MBA-CET', category: 'Management', stage: 'Postgraduate', conductedBy: 'Maharashtra CET Cell', eligibility: 'Bachelor\'s Degree', pattern: 'Online CBT', duration: '2.5 Hours', fee: '₹1000', frequency: 'Annually', website: 'https://cetcell.mahacet.org', description: 'MBA entrance for Maharashtra state colleges.', career: 'MBA/MMS in MH.', examDate: '2026-03-25' },
  { id: 'pg_4', name: 'Graduate Aptitude Test in Engineering (GATE)', category: 'Engineering', stage: 'Postgraduate', conductedBy: 'IITs/IISc', eligibility: 'B.Tech/B.E/M.Sc', pattern: 'Online CBT', duration: '3 Hours', fee: '₹1800', frequency: 'Annually', website: 'https://gate.iitk.ac.in', description: 'M.Tech admissions and PSU recruitment.', career: 'M.Tech, Ph.D, PSU Jobs (IOCL, ONGC).', examDate: '2026-02-08' },
  { id: 'pg_5', name: 'IIT JAM', category: 'Science', stage: 'Postgraduate', conductedBy: 'IITs', eligibility: 'B.Sc Degree', pattern: 'Online CBT', duration: '3 Hours', fee: '₹1800', frequency: 'Annually', website: 'https://jam.iitm.ac.in', description: 'Joint Admission test for Masters in IITs/NITs.', career: 'M.Sc, Joint M.Sc-Ph.D.', examDate: '2026-02-14' },
  { id: 'pg_6', name: 'JEST', category: 'Science', stage: 'Postgraduate', conductedBy: 'SERB', eligibility: 'B.Sc/B.Tech/M.Sc', pattern: 'Offline OMR', duration: '3 Hours', fee: '₹800', frequency: 'Annually', website: 'https://jest.org.in', description: 'Joint Entrance Screening Test for Physics & CS.', career: 'Ph.D / Int. Ph.D in premier research institutes.', examDate: '2026-03-01' },

  // 📘 PROFESSIONAL CERTIFICATION EXAMS
  { id: 'prof_1', name: 'CA Foundation', category: 'Professional', stage: 'Professional', conductedBy: 'ICAI', eligibility: 'Appear in 12th', pattern: 'Descriptive + Objective', duration: 'Varies', fee: '₹1500', frequency: 'Twice a year', website: 'https://icai.org', description: 'Entry level exam for Chartered Accountancy.', career: 'Chartered Accountant.', examDate: '2026-06-20' },
  { id: 'prof_2', name: 'CA Intermediate', category: 'Professional', stage: 'Professional', conductedBy: 'ICAI', eligibility: 'CA Foundation Pass / Graduate', pattern: 'Descriptive + Objective', duration: 'Varies', fee: '₹2700', frequency: 'Twice a year', website: 'https://icai.org', description: 'Second level of CA.', career: 'Articleship, progressing to CA Final.', examDate: '2026-05-05' },
  { id: 'prof_3', name: 'CA Final', category: 'Professional', stage: 'Professional', conductedBy: 'ICAI', eligibility: 'CA Inter Pass + Articleship', pattern: 'Descriptive + Case Studies', duration: 'Varies', fee: '₹3300', frequency: 'Twice a year', website: 'https://icai.org', description: 'Final level of CA.', career: 'Certified Chartered Accountant.', examDate: '2026-05-02' },
  { id: 'prof_4', name: 'CSEET', category: 'Professional', stage: 'Professional', conductedBy: 'ICSI', eligibility: '12th Pass', pattern: 'Online Proctored', duration: '2 Hours', fee: '₹2000', frequency: '4 times a year', website: 'https://icsi.edu', description: 'CS Executive Entrance Test.', career: 'Entry to Company Secretary course.', examDate: '2026-05-09' },
  { id: 'prof_5', name: 'CS Executive', category: 'Professional', stage: 'Professional', conductedBy: 'ICSI', eligibility: 'CSEET Pass / Graduate', pattern: 'Descriptive', duration: '3 Hours/Paper', fee: '₹1200/Module', frequency: 'Twice a year', website: 'https://icsi.edu', description: 'Second level of Company Secretary course.', career: 'Progressing to CS Professional.', examDate: '2026-06-01' },
  { id: 'prof_6', name: 'CS Professional', category: 'Professional', stage: 'Professional', conductedBy: 'ICSI', eligibility: 'CS Executive Pass', pattern: 'Descriptive', duration: '3 Hours/Paper', fee: '₹1200/Module', frequency: 'Twice a year', website: 'https://icsi.edu', description: 'Final level of CS.', career: 'Certified Company Secretary.', examDate: '2026-06-01' },
  { id: 'prof_7', name: 'CMA Foundation', category: 'Professional', stage: 'Professional', conductedBy: 'ICMAI', eligibility: '10th Pass (appear after 12th)', pattern: 'Offline / Online', duration: 'Varies', fee: '₹6000 (Reg)', frequency: 'Twice a year', website: 'https://icmai.in', description: 'Cost and Management Accountant entry level.', career: 'Entry to CMA Intermediate.', examDate: '2026-06-15' },
  { id: 'prof_8', name: 'CMA Intermediate', category: 'Professional', stage: 'Professional', conductedBy: 'ICMAI', eligibility: 'CMA Found Pass / Graduate', pattern: 'Descriptive', duration: '3 Hours/Paper', fee: '₹23100 (Reg)', frequency: 'Twice a year', website: 'https://icmai.in', description: 'Second level of CMA.', career: 'Cost Accounting trainee.', examDate: '2026-06-11' },
  { id: 'prof_9', name: 'CMA Final', category: 'Professional', stage: 'Professional', conductedBy: 'ICMAI', eligibility: 'CMA Inter Pass', pattern: 'Descriptive', duration: '3 Hours/Paper', fee: '₹25000 (Reg)', frequency: 'Twice a year', website: 'https://icmai.in', description: 'Final level of CMA.', career: 'Certified Cost and Management Accountant.', examDate: '2026-06-11' },

  // 📘 GOVERNMENT & ADMINISTRATIVE
  { id: 'gov_1', name: 'Civil Services Examination (UPSC)', category: 'Government', stage: 'Government', conductedBy: 'UPSC', eligibility: 'Graduate (Age 21-32)', pattern: 'Prelims + Mains + Interview', duration: 'Varies', fee: '₹100', frequency: 'Annually', website: 'https://upsc.gov.in', description: 'Premier exam for IAS, IPS, IFS.', career: 'Top administrative government positions.', examDate: '2026-05-31' },
  { id: 'gov_2', name: 'Maharashtra State Services Exam (MPSC Rajyaseva)', category: 'Government', stage: 'Government', conductedBy: 'MPSC', eligibility: 'Graduate', pattern: 'Prelims + Mains + Interview', duration: 'Varies', fee: '₹394', frequency: 'Annually', website: 'https://mpsc.gov.in', description: 'Exam for Class A & B officer posts in Maharashtra.', career: 'Deputy Collector, DSP, Tahsildar.', examDate: '2026-04-12' },
  { id: 'gov_3', name: 'MPSC Combined Exam', category: 'Government', stage: 'Government', conductedBy: 'MPSC', eligibility: 'Graduate', pattern: 'Prelims + Mains + Physical (for PSI)', duration: 'Varies', fee: '₹394', frequency: 'Annually', website: 'https://mpsc.gov.in', description: 'Exam for Group B & C posts (PSI, STI, ASO).', career: 'Police Sub Inspector, State Tax Inspector.', examDate: '2026-06-16' },
];

export default function ScholarshipExamModule() {
  const [activeTab, setActiveTab] = useState('Scholarships');
  const [searchQuery, setSearchQuery] = useState('');
  
  // --- Smart Filter System State ---
  const [scholarshipFilters, setScholarshipFilters] = useState<{
    classes: string[];
    countries: string[];
    genders: string[];
    religions: string[];
    states: string[];
    courses: string[];
  }>({
    classes: [], countries: [], genders: [], religions: [], states: [], courses: []
  });
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);
  const [activeExamStage, setActiveExamStage] = useState('After 12th');
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [savedItems, setSavedItems] = useState<string[]>([]);

  // Filter Handlers
  const toggleSmartFilter = (category: keyof typeof scholarshipFilters, value: string) => {
    setScholarshipFilters(prev => {
      const current = prev[category];
      if (current.includes(value)) {
        return { ...prev, [category]: current.filter(item => item !== value) };
      } else {
        return { ...prev, [category]: [...current, value] };
      }
    });
  };

  const clearAllFilters = () => {
    setScholarshipFilters({ classes: [], countries: [], genders: [], religions: [], states: [], courses: [] });
  };

  const applyPopularFilter = (type: string) => {
    if (type === 'Engineering12') {
      setScholarshipFilters({ classes: ['Class 12'], countries: [], genders: [], religions: [], states: [], courses: ['Engineering'] });
    } else if (type === 'AbroadPG') {
      setScholarshipFilters({ classes: ['Post Graduation'], countries: ['Study Abroad'], genders: [], religions: [], states: [], courses: [] });
    }
  };

  // --- Filter Logic Execution ---
  const filteredScholarships = scholarships.filter(s => {
    // 1. Search Query
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    // 2. Smart Filters
    const matchesClass = scholarshipFilters.classes.length === 0 || (s.class_level && scholarshipFilters.classes.some(c => s.class_level!.includes(c)));
    const matchesCountry = scholarshipFilters.countries.length === 0 || (s.country && scholarshipFilters.countries.some(c => s.country!.includes(c)));
    const matchesGender = scholarshipFilters.genders.length === 0 || (s.gender && scholarshipFilters.genders.some(g => s.gender!.includes(g)));
    const matchesReligion = scholarshipFilters.religions.length === 0 || (s.religion && scholarshipFilters.religions.some(r => s.religion!.includes(r)));
    const matchesState = scholarshipFilters.states.length === 0 || (s.state && scholarshipFilters.states.some(st => s.state!.includes(st)));
    const matchesCourse = scholarshipFilters.courses.length === 0 || (s.course && scholarshipFilters.courses.some(c => s.course!.includes(c)));

    return matchesSearch && matchesClass && matchesCountry && matchesGender && matchesReligion && matchesState && matchesCourse;
  });

  const filteredExams = comprehensiveExams.filter(e => 
    e.stage === activeExamStage &&
    (e.name.toLowerCase().includes(searchQuery.toLowerCase()) || e.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const toggleSave = (id: string) => {
    setSavedItems(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const getStatusColor = (status: string) => {
    if (status === 'Closing Soon') return 'bg-red-100 text-red-600 border-red-200';
    if (status === 'Open') return 'bg-green-100 text-green-600 border-green-200';
    return 'bg-gray-100 text-gray-500 border-gray-200';
  };

  const formatText = (text?: string) => {
    if (!text) return <span className="text-slate-400 italic">Information not specified.</span>;
    return text.split('\n').map((str, index) => (
      <span key={index} className="block mb-1">{str}</span>
    ));
  };

  // Reusable Checkbox Component for Filters
  const FilterCheckbox = ({ label, checked, onChange }: { label: string, checked: boolean, onChange: () => void }) => (
    <label className="flex items-center gap-3 p-1.5 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors group">
      <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${checked ? 'bg-indigo-600 border-indigo-600' : 'border-slate-300 group-hover:border-indigo-400'}`}>
        {checked && <Check size={12} className="text-white" />}
      </div>
      <span className={`text-sm ${checked ? 'text-indigo-700 font-semibold' : 'text-slate-600'}`}>{label}</span>
    </label>
  );

  // The Filter Panel UI (Used in Sidebar and Mobile Modal)
  const FilterPanel = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-black text-slate-800 flex items-center gap-2"><Filter size={18}/> Smart Filters</h3>
        <button onClick={clearAllFilters} className="text-xs font-bold text-red-500 hover:text-red-700">Clear All</button>
      </div>

      <div className="space-y-4">
        {/* Class Filter */}
        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Education Level</h4>
          <div className="space-y-1 max-h-40 overflow-y-auto custom-scrollbar pr-2">
            {FILTER_OPTIONS.classes.map(c => (
              <FilterCheckbox key={c} label={c} checked={scholarshipFilters.classes.includes(c)} onChange={() => toggleSmartFilter('classes', c)} />
            ))}
          </div>
        </div>

        {/* Course Filter */}
        <div className="pt-4 border-t border-slate-100">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Course Type</h4>
          <div className="space-y-1">
            {FILTER_OPTIONS.courses.map(c => (
              <FilterCheckbox key={c} label={c} checked={scholarshipFilters.courses.includes(c)} onChange={() => toggleSmartFilter('courses', c)} />
            ))}
          </div>
        </div>

        {/* Country Filter */}
        <div className="pt-4 border-t border-slate-100">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Country</h4>
          <div className="space-y-1">
            {FILTER_OPTIONS.countries.map(c => (
              <FilterCheckbox key={c} label={c} checked={scholarshipFilters.countries.includes(c)} onChange={() => toggleSmartFilter('countries', c)} />
            ))}
          </div>
        </div>

        {/* State Filter */}
        <div className="pt-4 border-t border-slate-100">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">State (India)</h4>
          <div className="space-y-1 max-h-40 overflow-y-auto custom-scrollbar pr-2">
            {FILTER_OPTIONS.states.map(s => (
              <FilterCheckbox key={s} label={s} checked={scholarshipFilters.states.includes(s)} onChange={() => toggleSmartFilter('states', s)} />
            ))}
          </div>
        </div>

        {/* Religion Filter */}
        <div className="pt-4 border-t border-slate-100">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Religion</h4>
          <div className="space-y-1">
            {FILTER_OPTIONS.religions.map(r => (
              <FilterCheckbox key={r} label={r} checked={scholarshipFilters.religions.includes(r)} onChange={() => toggleSmartFilter('religions', r)} />
            ))}
          </div>
        </div>

        {/* Gender Filter */}
        <div className="pt-4 border-t border-slate-100">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Gender</h4>
          <div className="space-y-1">
            {FILTER_OPTIONS.genders.map(g => (
              <FilterCheckbox key={g} label={g} checked={scholarshipFilters.genders.includes(g)} onChange={() => toggleSmartFilter('genders', g)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* DETAILED EXAM MODAL */}
      <AnimatePresence>
        {selectedExam && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="bg-white w-full max-w-4xl rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-indigo-600 text-white relative overflow-hidden shrink-0">
                <div className="absolute -right-10 -top-10 opacity-10">
                  <Award size={150} />
                </div>
                <div className="relative z-10">
                  <span className="px-3 py-1 bg-white/20 rounded-full text-[10px] font-bold uppercase tracking-wider mb-3 inline-block backdrop-blur-sm">
                    {selectedExam.category}
                  </span>
                  <h2 className="text-3xl font-black">{selectedExam.name}</h2>
                  <p className="opacity-90 font-medium text-sm mt-1">Conducted by {selectedExam.conductedBy}</p>
                </div>
                <button onClick={() => setSelectedExam(null)} className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors relative z-10">
                  <X size={24} />
                </button>
              </div>

              <div className="p-8 overflow-y-auto custom-scrollbar bg-slate-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-6">
                    <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                      <h4 className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <GraduationCap size={16} /> Who is this for?
                      </h4>
                      <div className="text-slate-700 text-sm leading-relaxed">{formatText(selectedExam.eligibility)}</div>
                    </section>
                    
                    <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                      <h4 className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <FileText size={16} /> Exam Pattern & Syllabus
                      </h4>
                      <div className="space-y-4 text-sm text-slate-700">
                        <div className="border-b border-slate-100 pb-3">
                          <span className="text-slate-400 font-bold uppercase text-xs block mb-1">Format</span>
                          <div className="font-bold text-slate-800">{formatText(selectedExam.pattern)}</div>
                        </div>
                        <div className="flex justify-between border-b border-slate-100 pb-3">
                          <span className="text-slate-400 font-bold uppercase text-xs">Duration</span>
                          <span className="font-bold text-slate-800">{selectedExam.duration}</span>
                        </div>
                        <div className="flex justify-between pb-2">
                          <span className="text-slate-400 font-bold uppercase text-xs">Frequency</span>
                          <span className="font-bold text-slate-800">{selectedExam.frequency}</span>
                        </div>
                      </div>
                    </section>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                      <h4 className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <Briefcase size={16} /> Benefits & Opportunities
                      </h4>
                      <div className="text-slate-700 text-sm leading-relaxed">{formatText(selectedExam.career)}</div>
                    </section>

                    <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                       <h4 className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <Award size={16} /> About the Exam
                      </h4>
                      <div className="text-slate-700 text-sm leading-relaxed">{formatText(selectedExam.description)}</div>
                    </section>

                    <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
                      <div className="flex justify-between items-center mb-6">
                        <div>
                          <span className="text-xs font-bold text-indigo-800 uppercase block">Application Fee</span>
                          <span className="text-xl font-black text-indigo-600">{selectedExam.fee}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-bold text-indigo-800 uppercase block">Tentative Date</span>
                          <span className="text-sm font-black text-indigo-600">{selectedExam.examDate !== 'N/A' && selectedExam.examDate !== 'TBA' && selectedExam.examDate !== 'Weekly' && selectedExam.examDate !== 'Varies' && selectedExam.examDate !== 'Post NEET' ? new Date(selectedExam.examDate).toLocaleDateString('en-GB') : selectedExam.examDate}</span>
                        </div>
                      </div>
                      <a 
                        href={selectedExam.website} 
                        target="_blank" 
                        rel="noreferrer"
                        className="w-full flex items-center justify-center gap-2 py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-md"
                      >
                        Visit Official Website <ExternalLink size={18} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DETAILED SCHOLARSHIP MODAL */}
      <AnimatePresence>
        {selectedScholarship && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="bg-white w-full max-w-4xl rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-teal-600 text-white relative overflow-hidden shrink-0">
                <div className="absolute -right-10 -top-10 opacity-10">
                  <Banknote size={150} />
                </div>
                <div className="relative z-10">
                  <div className="flex gap-2 mb-3">
                    <span className="px-3 py-1 bg-white/20 rounded-full text-[10px] font-bold uppercase tracking-wider inline-block backdrop-blur-sm">
                      {selectedScholarship.category}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider inline-block ${selectedScholarship.status === 'Closing Soon' ? 'bg-red-500 text-white' : selectedScholarship.status === 'Open' ? 'bg-green-500 text-white' : 'bg-gray-400 text-white'}`}>
                      {selectedScholarship.status}
                    </span>
                  </div>
                  <h2 className="text-3xl font-black pr-8">{selectedScholarship.name}</h2>
                  {selectedScholarship.provider && (
                    <p className="opacity-90 font-medium text-sm mt-2 flex items-center gap-2">
                       <Shield size={14} /> Provider: {selectedScholarship.provider}
                    </p>
                  )}
                </div>
                <button onClick={() => setSelectedScholarship(null)} className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors relative z-10 absolute top-8 right-8">
                  <X size={24} />
                </button>
              </div>

              <div className="p-8 overflow-y-auto custom-scrollbar bg-slate-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-6">
                    <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                      <h4 className="text-xs font-black text-teal-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <GraduationCap size={16} /> Eligibility Criteria
                      </h4>
                      <div className="text-slate-700 text-sm leading-relaxed">{formatText(selectedScholarship.eligibilityDetails)}</div>
                    </section>
                    
                    <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                      <h4 className="text-xs font-black text-teal-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <FileCheck size={16} /> Required Documents
                      </h4>
                      <div className="text-slate-700 text-sm leading-relaxed">{formatText(selectedScholarship.documents)}</div>
                    </section>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                      <h4 className="text-xs font-black text-teal-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <Banknote size={16} /> Benefits & Allowances
                      </h4>
                      <div className="text-slate-700 text-sm leading-relaxed">{formatText(selectedScholarship.benefitsDetail)}</div>
                      
                      <div className="mt-4 pt-4 border-t border-slate-100">
                        <span className="text-slate-400 font-bold uppercase text-xs block mb-1">Applicable Education Levels</span>
                        <div className="flex gap-2 flex-wrap">
                          {selectedScholarship.level.map(l => (
                             <span key={l} className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-semibold border border-slate-200">{l}</span>
                          ))}
                        </div>
                      </div>
                    </section>

                    <div className="p-6 bg-teal-50 rounded-2xl border border-teal-100">
                      <div className="flex justify-between items-center mb-6">
                        <div>
                          <span className="text-xs font-bold text-teal-800 uppercase block">Estimated Amount</span>
                          <span className="text-xl font-black text-teal-600">{selectedScholarship.amount}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-bold text-teal-800 uppercase block">Application Deadline</span>
                          <span className={`text-sm font-black ${selectedScholarship.status === 'Closing Soon' ? 'text-red-600' : 'text-teal-600'}`}>
                            {selectedScholarship.deadline !== 'null' && selectedScholarship.deadline ? new Date(selectedScholarship.deadline).toLocaleDateString('en-GB') : 'Varies / Rolling'}
                          </span>
                        </div>
                      </div>
                      <a 
                        href={selectedScholarship.link} 
                        target="_blank" 
                        rel="noreferrer"
                        className="w-full flex items-center justify-center gap-2 py-4 bg-teal-600 text-white rounded-xl font-bold hover:bg-teal-700 transition-all shadow-md"
                      >
                        Apply / Visit Official Portal <ExternalLink size={18} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MOBILE SMART FILTER MODAL */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-40 lg:hidden flex justify-end bg-black/50 backdrop-blur-sm">
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-4/5 max-w-sm h-full bg-white shadow-2xl flex flex-col"
            >
              <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h3 className="font-black text-slate-800 flex items-center gap-2"><Filter size={18}/> Filters</h3>
                <button onClick={() => setIsMobileFilterOpen(false)} className="p-2 bg-slate-200 rounded-full text-slate-600"><X size={18}/></button>
              </div>
              <div className="flex-1 overflow-y-auto p-6">
                <FilterPanel />
              </div>
              <div className="p-4 border-t border-slate-100 bg-white">
                <button onClick={() => setIsMobileFilterOpen(false)} className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-md">Apply Filters</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MAIN SIDEBAR NAVIGATION (With Integrated Filters) */}
      <aside className="w-72 bg-white border-r border-slate-200 flex flex-col p-4 sticky top-0 h-screen hidden lg:flex shrink-0 overflow-y-auto custom-scrollbar">
        <div className="flex items-center gap-3 px-2 mb-8 mt-2 shrink-0">
          <div className="bg-indigo-600 p-2 rounded-xl text-white"><ShieldCheck size={24}/></div>
          <span className="text-xl font-black tracking-tight text-slate-800">EduPortal</span>
        </div>

        <nav className="space-y-2 shrink-0 mb-6">
          {[
            { name: 'Scholarships', icon: CalIcon },
            { name: 'Exams', icon: BookOpen },
            { name: 'Upcoming Deadlines', icon: Clock },
            { name: 'Student Tools', icon: GraduationCap },
            { name: 'Saved Items', icon: Bookmark },
          ].map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === item.name ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <item.icon size={18} />
              {item.name}
            </button>
          ))}
        </nav>

        {/* Integrated Filter Panel for Scholarships */}
        {activeTab === 'Scholarships' && (
          <div className="pt-6 border-t border-slate-100 mt-4">
            <FilterPanel />
          </div>
        )}
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-6 lg:p-10 max-w-7xl mx-auto h-screen overflow-y-auto custom-scrollbar">
        
        {/* HEADER BAR */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">{activeTab}</h1>
            <p className="text-slate-500 text-sm mt-1">Manage your academic future and financial aid.</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder={`Search ${activeTab.toLowerCase()}...`}
                className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-full text-sm focus:ring-2 focus:ring-indigo-500 outline-none w-full md:w-80 shadow-sm"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {activeTab === 'Scholarships' && (
              <button onClick={() => setIsMobileFilterOpen(true)} className="lg:hidden p-2.5 bg-white border border-slate-200 rounded-full text-indigo-600 shadow-sm hover:bg-indigo-50">
                <SlidersHorizontal size={18} />
              </button>
            )}
          </div>
        </div>

        {/* ============================================================== */}
        {/* SECTION: SCHOLARSHIPS (WITH SMART FILTERS)                     */}
        {/* ============================================================== */}
        {activeTab === 'Scholarships' && (
          <div className="space-y-6">
            
            {/* Popular Filters Presets */}
            <div className="mb-6">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Popular Filters</h4>
              <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                <button onClick={() => applyPopularFilter('Engineering12')} className="px-4 py-2 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-full text-xs font-bold whitespace-nowrap hover:bg-indigo-100 transition-colors">Class 12 + Engineering</button>
                <button onClick={() => applyPopularFilter('AbroadPG')} className="px-4 py-2 bg-teal-50 text-teal-700 border border-teal-100 rounded-full text-xs font-bold whitespace-nowrap hover:bg-teal-100 transition-colors">Post Graduation + Abroad</button>
                <button onClick={() => toggleSmartFilter('genders', 'Female')} className="px-4 py-2 bg-pink-50 text-pink-700 border border-pink-100 rounded-full text-xs font-bold whitespace-nowrap hover:bg-pink-100 transition-colors">Girls / Women</button>
                <button onClick={() => toggleSmartFilter('categories', 'Government')} className="px-4 py-2 bg-blue-50 text-blue-700 border border-blue-100 rounded-full text-xs font-bold whitespace-nowrap hover:bg-blue-100 transition-colors">Government Schemes</button>
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-500">Showing {filteredScholarships.length} results</span>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <AnimatePresence>
                {filteredScholarships.length > 0 ? filteredScholarships.map((s) => (
                  <motion.div 
                    layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                    key={s.id} 
                    onClick={() => setSelectedScholarship(s)}
                    className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm hover:shadow-xl hover:border-teal-300 transition-all group relative overflow-hidden cursor-pointer flex flex-col"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex gap-2 flex-wrap">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusColor(s.status)}`}>
                          {s.status}
                        </span>
                        <span className="px-3 py-1 bg-slate-100 text-slate-600 border border-slate-200 rounded-full text-[10px] font-black uppercase tracking-widest">
                          {s.category}
                        </span>
                      </div>
                      <button onClick={(e) => { e.stopPropagation(); toggleSave(s.id); }} className={`p-2 rounded-full transition-colors ${savedItems.includes(s.id) ? 'bg-teal-50 text-teal-600' : 'text-slate-300 hover:bg-slate-50'}`}>
                        <Bookmark size={18} fill={savedItems.includes(s.id) ? "currentColor" : "none"} />
                      </button>
                    </div>
                    <h3 className="font-bold text-lg leading-tight mb-2 group-hover:text-teal-600 transition-colors flex-1">{s.name}</h3>
                    
                    {s.provider && (
                      <p className="text-xs font-medium text-slate-400 mb-4 flex items-center gap-1"><Shield size={12}/> {s.provider}</p>
                    )}

                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                        <GraduationCap size={14} className="text-slate-400 shrink-0"/> <span className="line-clamp-1">{s.level.join(', ')}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                        <Clock size={14} className="text-slate-400 shrink-0"/> Deadline: {s.deadline && s.deadline !== 'null' ? new Date(s.deadline).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Varies'}
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Amount</p>
                        <p className="text-teal-600 font-black">{s.amount}</p>
                      </div>
                      <div className="bg-slate-100 p-2 rounded-lg text-slate-400 group-hover:bg-teal-600 group-hover:text-white transition-all">
                        <ChevronRight size={16} />
                      </div>
                    </div>
                  </motion.div>
                )) : (
                  <div className="col-span-full py-16 text-center text-slate-400">
                    <Filter size={48} className="mx-auto mb-4 opacity-20" />
                    <p className="text-lg font-bold">No scholarships match your filters.</p>
                    <button onClick={clearAllFilters} className="mt-4 px-6 py-2 bg-indigo-50 text-indigo-600 rounded-full font-bold text-sm hover:bg-indigo-100">Clear All Filters</button>
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* BROWSE SCHOLARSHIP DIRECTORY */}
            <div className="mt-12 border-t border-slate-200 pt-8 pb-12">
              <h3 className="text-xl font-black text-slate-800 mb-6">Browse Scholarship Collections</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* State Wise */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="text-sm font-black text-indigo-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <MapPin size={16} /> State Wise
                  </h4>
                  <ul className="space-y-3">
                    {['Uttar Pradesh', 'Maharashtra', 'Bihar', 'West Bengal', 'Madhya Pradesh', 'Tamil Nadu', 'Rajasthan', 'Karnataka'].map(state => (
                      <li key={state} className="flex items-center gap-2">
                        <ChevronRight size={14} className="text-slate-300" />
                        <button onClick={() => toggleSmartFilter('states', state)} className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors text-left">Top Scholarships of {state}</button>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Current Class */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="text-sm font-black text-indigo-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <GraduationCap size={16} /> Current Class
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2"><ChevronRight size={14} className="text-slate-300" /><button onClick={() => toggleSmartFilter('classes', 'Class 10')} className="text-sm font-medium text-slate-600 hover:text-indigo-600 text-left">Class 1 to 10</button></li>
                    <li className="flex items-center gap-2"><ChevronRight size={14} className="text-slate-300" /><button onClick={() => {toggleSmartFilter('classes', 'Class 11'); toggleSmartFilter('classes', 'Class 12');}} className="text-sm font-medium text-slate-600 hover:text-indigo-600 text-left">Class 11, 12</button></li>
                    <li className="flex items-center gap-2"><ChevronRight size={14} className="text-slate-300" /><button onClick={() => toggleSmartFilter('classes', 'Graduation')} className="text-sm font-medium text-slate-600 hover:text-indigo-600 text-left">Graduation</button></li>
                    <li className="flex items-center gap-2"><ChevronRight size={14} className="text-slate-300" /><button onClick={() => toggleSmartFilter('classes', 'Post Graduation')} className="text-sm font-medium text-slate-600 hover:text-indigo-600 text-left">Post-Graduation</button></li>
                    <li className="flex items-center gap-2"><ChevronRight size={14} className="text-slate-300" /><button onClick={() => toggleSmartFilter('classes', 'Polytechnic/Diploma')} className="text-sm font-medium text-slate-600 hover:text-indigo-600 text-left">Diploma/Polytechnic</button></li>
                    <li className="flex items-center gap-2"><ChevronRight size={14} className="text-slate-300" /><button onClick={() => toggleSmartFilter('classes', 'ITI')} className="text-sm font-medium text-slate-600 hover:text-indigo-600 text-left">ITI</button></li>
                    <li className="flex items-center gap-2"><ChevronRight size={14} className="text-slate-300" /><button onClick={() => toggleSmartFilter('genders', 'Female')} className="text-sm font-medium text-slate-600 hover:text-indigo-600 text-left">Girls/Women</button></li>
                  </ul>
                </div>
                
                {/* Type Based */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="text-sm font-black text-indigo-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Layers size={16} /> Type Based
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2"><ChevronRight size={14} className="text-slate-300" /><a href="#" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Merit Based</a></li>
                    <li className="flex items-center gap-2"><ChevronRight size={14} className="text-slate-300" /><a href="#" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Means Based</a></li>
                    <li className="flex items-center gap-2"><ChevronRight size={14} className="text-slate-300" /><button onClick={() => {toggleSmartFilter('religions', 'Muslim'); toggleSmartFilter('religions', 'Christian');}} className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Minorities</button></li>
                    <li className="flex items-center gap-2"><ChevronRight size={14} className="text-slate-300" /><a href="#" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Talent Based</a></li>
                    <li className="flex items-center gap-2"><ChevronRight size={14} className="text-slate-300" /><a href="#" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Disability</a></li>
                    <li className="flex items-center gap-2"><ChevronRight size={14} className="text-slate-300" /><a href="#" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Government</a></li>
                    <li className="flex items-center gap-2"><ChevronRight size={14} className="text-slate-300" /><button onClick={() => toggleSmartFilter('courses', 'Engineering')} className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Engineering</button></li>
                    <li className="flex items-center gap-2"><ChevronRight size={14} className="text-slate-300" /><button onClick={() => toggleSmartFilter('countries', 'Study Abroad')} className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Study Abroad</button></li>
                  </ul>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* ============================================================== */}
        {/* SECTION: EXAMS (INTEGRATED EXAM EXPLORER)                      */}
        {/* ============================================================== */}
        {activeTab === 'Exams' && (
          <div className="space-y-6">
            {/* Exam Stage Sub-Navigation */}
            <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar border-b border-slate-200">
              {['After 9th', 'After 10th', 'After 12th', 'Postgraduate', 'Professional', 'Government'].map(stage => (
                <button 
                  key={stage}
                  onClick={() => setActiveExamStage(stage)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                    activeExamStage === stage 
                      ? 'bg-slate-900 text-white shadow-md' 
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {stage}
                </button>
              ))}
            </div>

            {/* Exam Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
              <AnimatePresence>
                {filteredExams.length > 0 ? filteredExams.map((exam) => (
                  <motion.div
                    key={exam.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    onClick={() => setSelectedExam(exam)}
                    className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-indigo-300 transition-all cursor-pointer group flex flex-col h-full"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-wider rounded-full">
                        {exam.category}
                      </span>
                      <button onClick={(e) => { e.stopPropagation(); toggleSave(exam.id); }} className={`p-1.5 rounded-full transition-colors ${savedItems.includes(exam.id) ? 'bg-indigo-100 text-indigo-600' : 'text-slate-300 hover:bg-slate-100'}`}>
                        <Bookmark size={18} fill={savedItems.includes(exam.id) ? "currentColor" : "none"} />
                      </button>
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-800 mb-2 leading-tight group-hover:text-indigo-600 transition-colors">{exam.name}</h3>
                    <p className="text-sm text-slate-500 line-clamp-2 mb-6 flex-1">{exam.description.split('\n')[0]}</p>
                    
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                        <Shield size={14} /> {exam.conductedBy}
                      </div>
                      <ChevronRight size={18} className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
                    </div>
                  </motion.div>
                )) : (
                  <div className="col-span-full py-12 text-center text-slate-400 font-medium">
                    <Search size={40} className="mx-auto mb-3 opacity-20" />
                    No exams found matching your search in this category.
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* SECTION: ELIGIBILITY CHECKER (STUDENT TOOLS)                   */}
        {/* ============================================================== */}
        {activeTab === 'Student Tools' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-indigo-100 rounded-2xl text-indigo-600"><GraduationCap size={24}/></div>
                  <h2 className="text-xl font-black">Eligibility Checker</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-2">Current Class</label>
                    <select className="w-full bg-slate-50 border border-slate-200 p-3 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium">
                      <option>10th Standard</option>
                      <option>12th Standard</option>
                      <option>Undergraduate</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-2">Stream / Field</label>
                    <select className="w-full bg-slate-50 border border-slate-200 p-3 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium">
                      <option>Science (PCM)</option>
                      <option>Science (PCB)</option>
                      <option>Commerce</option>
                      <option>Arts</option>
                    </select>
                  </div>
                </div>
                <button className="w-full mt-6 bg-indigo-600 text-white py-4 rounded-2xl font-black text-sm shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2">
                  Show Exam & Scholarship Recommendations <ChevronRight size={18}/>
                </button>
              </div>

              {/* DOCUMENT MANAGER */}
              <div className="bg-slate-900 rounded-[2rem] p-8 text-white shadow-xl">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-500/20 rounded-xl text-indigo-400"><FileText size={20} /></div>
                    <h2 className="text-xl font-bold">DocVault</h2>
                  </div>
                  <button className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl text-xs font-bold hover:bg-white/20 transition-all">
                    <Upload size={14}/> Upload
                  </button>
                </div>
                <div className="space-y-3">
                  {['Aadhaar Card', '10th Marksheet', 'Income Certificate'].map(doc => (
                    <div key={doc} className="flex items-center justify-between bg-white/5 p-4 rounded-2xl border border-white/10 hover:bg-white/10 cursor-pointer transition-colors">
                      <div className="flex items-center gap-3">
                        <CheckCircle size={16} className="text-emerald-400" />
                        <span className="text-sm font-medium">{doc}</span>
                      </div>
                      <span className="text-[10px] text-white/40 font-mono bg-black/20 px-2 py-1 rounded-md">PDF • 1.2MB</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* UPCOMING ALERTS SIDEBAR */}
            <div className="space-y-6">
              <div className="bg-red-50 border border-red-100 rounded-3xl p-6 shadow-inner">
                <h3 className="text-red-700 font-black text-sm uppercase tracking-tighter mb-4 flex items-center gap-2">
                  <AlertCircle size={16}/> Critical Deadlines
                </h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-2xl border border-red-200 shadow-sm hover:shadow-md transition-shadow">
                    <p className="text-xs font-bold text-slate-800">JEE Main Registration</p>
                    <p className="text-[11px] text-red-600 font-black mt-1 flex items-center gap-1"><Clock size={12}/> 4 Days Left</p>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-red-200 shadow-sm hover:shadow-md transition-shadow">
                    <p className="text-xs font-bold text-slate-800">NSP Scholarship Phase 1</p>
                    <p className="text-[11px] text-red-600 font-black mt-1 flex items-center gap-1"><Clock size={12}/> Tomorrow</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}