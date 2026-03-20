import { motion } from 'framer-motion';
import {
  GraduationCap,
  Search,
  BookOpen,
  MapPin,
  Calendar,
  Bot,
  Globe,
  ArrowRight,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

interface LandingPageProps {
  onAuth: (mode: 'login' | 'signup') => void;
  onSignUpClick: () => void;
}

export default function LandingPage({ onAuth, onSignUpClick }: LandingPageProps) {
  return (
    <div className="bg-white text-gray-900 font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-bottom border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2 whitespace-nowrap">
              <img src="/logo.png" alt="Edu-Advisory Logo" className="w-8 h-8 object-contain" />
              <span className="text-xl font-bold tracking-tight">
                <span className="text-green-600">Edu</span>-<span className="text-orange-500">Advisory</span>
              </span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#home" className="text-gray-600 hover:text-green-600 transition-colors">Home</a>
              <a href="#about" className="text-gray-600 hover:text-green-600 transition-colors">About</a>
              <a href="#work" className="text-gray-600 hover:text-green-600 transition-colors">Work</a>
              <a href="#contact" className="text-gray-600 hover:text-green-600 transition-colors">Contact</a>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onAuth('login')}
                className="px-4 py-2 text-orange-600 font-medium hover:bg-orange-50 rounded-xl transition-colors"
              >
                Login
              </button>
              <button
                onClick={onSignUpClick}
                className="px-5 py-2 bg-orange-600 text-white font-medium rounded-xl hover:bg-orange-700 transition-shadow hover:shadow-lg"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              One-Stop Personalized <br />
              <span className="text-green-600">Career & Education</span> Advisor
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-lg leading-relaxed">
              Get personalized career paths, discover nearby colleges, and unlock your true potential with our AI-driven guidance.
            </p>
            <button
              onClick={onSignUpClick}
              className="px-8 py-4 bg-orange-500 text-white text-lg font-bold rounded-2xl hover:bg-orange-600 transition-all transform hover:scale-105 shadow-xl shadow-orange-200 flex items-center gap-2"
            >
              Start Your Journey
              <ArrowRight size={20} />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="rounded-3xl shadow-2xl w-full object-cover aspect-video"
            >
              <source src="carrerpath.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 hidden sm:block">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full text-green-600">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <p className="font-bold text-gray-900">AI Verified</p>
                  <p className="text-sm text-gray-500">100% Data Driven</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
            <div className="w-20 h-1.5 bg-green-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Sparkles className="text-pink-500" />, title: "Aptitude & Interest Quiz", desc: "Find your ideal stream based on your personality." },
              { icon: <BookOpen className="text-purple-500" />, title: "Course-to-Career Mapping", desc: "See jobs & opportunities for every course." },
              { icon: <MapPin className="text-orange-500" />, title: "Nearby Colleges", desc: "Find local government and private colleges." },
              { icon: <Calendar className="text-blue-500" />, title: "Timeline Tracker", desc: "Never miss admissions or scholarship deadlines." },
              { icon: <Bot className="text-indigo-500" />, title: "AI Career Advisor", desc: "Smart suggestions tailored just for you." },
              { icon: <Globe className="text-emerald-500" />, title: "Multi-language Support", desc: "Accessible guidance for everyone, everywhere." },
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="work" className="py-16 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <p className="text-5xl font-extrabold text-orange-500 mb-2">5,000+</p>
              <p className="text-gray-600 font-medium uppercase tracking-wider text-sm">Students Guided</p>
            </div>
            <div>
              <p className="text-5xl font-extrabold text-green-600 mb-2">100+</p>
              <p className="text-gray-600 font-medium uppercase tracking-wider text-sm">Government Colleges Listed</p>
            </div>
            <div>
              <p className="text-5xl font-extrabold text-blue-600 mb-2">50+</p>
              <p className="text-gray-600 font-medium uppercase tracking-wider text-sm">Career Paths Mapped</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <h2 className="text-3xl font-bold text-center">Student Success Stories</h2>
          <div className="w-20 h-1.5 bg-green-600 mx-auto rounded-full mt-4"></div>
        </div>

        <div className="relative flex overflow-hidden">
          <motion.div
            className="flex gap-8 whitespace-nowrap py-4"
            animate={{
              x: [0, -1000],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {[...Array(4)].flatMap(() => [
              { name: "Priya Patel", role: "Business Management", img: "https://picsum.photos/seed/p1/100/100", text: "The timeline tracker saved me! Never missed a deadline." },
              { name: "Amit Kumar", role: "Graphic Design", img: "https://picsum.photos/seed/p2/100/100", text: "Course-to-career mapping gave me such clarity." },
              { name: "Ananya Sharma", role: "AI & Data Science", img: "https://picsum.photos/seed/p3/100/100", text: "I found my ideal career path through this portal." },
            ]).map((story, i) => (
              <div key={i} className="inline-block w-[350px] bg-white p-8 rounded-3xl border border-gray-100 shadow-sm whitespace-normal">
                <div className="flex items-center gap-4 mb-6">
                  <img src={story.img} alt={story.name} className="w-14 h-14 rounded-full object-cover" referrerPolicy="no-referrer" />
                  <div>
                    <p className="font-bold text-gray-900">{story.name}</p>
                    <p className="text-sm text-gray-500">{story.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic leading-relaxed">"{story.text}"</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Newsletter */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Never miss a deadline</h2>
          <p className="text-gray-600 mb-10 text-lg">
            Subscribe for admission dates, scholarship windows, and counseling schedules.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow px-6 py-4 rounded-2xl bg-gray-50 border border-gray-200 outline-none focus:ring-2 focus:ring-green-500 transition-all"
            />
            <button className="px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all">
              Subscribe
            </button>
          </div>
          <p className="mt-4 text-xs text-gray-400">By signing up you agree to our terms and privacy policy.</p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto bg-green-600 rounded-[40px] p-12 lg:p-20 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Start Your Career Journey Today</h2>
            <p className="text-green-100 text-xl mb-10 max-w-2xl mx-auto">
              It's free, easy, and made for students like you. Join thousands of others finding their path.
            </p>
            <button
              onClick={onSignUpClick}
              className="px-10 py-4 bg-white text-green-600 text-lg font-bold rounded-2xl hover:bg-green-50 transition-all transform hover:scale-105 shadow-xl"
            >
              Get Started Now
            </button>
          </div>
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-500/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-20 pb-10 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 lg:col-span-1">
              <div className="flex items-center gap-2 mb-6 whitespace-nowrap">
                <img src="/logo.png" alt="Edu-Advisory Logo" className="w-8 h-8 object-contain" />
                <span className="text-xl font-bold tracking-tight">
                  <span className="text-green-600">Edu</span>-<span className="text-orange-500">Advisory</span>
                </span>
              </div>
              <p className="text-gray-500 mb-8 leading-relaxed">
                Get guidance when it matters most. Your future starts with a single step.
              </p>
              <div className="space-y-4">
                <p className="text-sm font-semibold text-green-600 flex items-center gap-2">
                  <Sparkles size={14} /> AI-Powered Newsletter
                </p>
                <div className="flex gap-2">
                  <input type="text" placeholder="E.g. 'I want engineering scholarships'..." className="flex-grow px-4 py-2 rounded-xl bg-gray-50 border border-gray-100 text-sm outline-none" />
                  <button className="px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-bold">Subscribe</button>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-6">Platform</h4>
              <ul className="space-y-4 text-gray-500">
                <li><a href="#" className="hover:text-green-600 transition-colors">Aptitude Quiz</a></li>
                <li><a href="#" className="hover:text-green-600 transition-colors">Course Paths</a></li>
                <li><a href="#" className="hover:text-green-600 transition-colors">Colleges Directory</a></li>
                <li><a href="#" className="hover:text-green-600 transition-colors">Career Mapping</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6">Resources</h4>
              <ul className="space-y-4 text-gray-500">
                <li><a href="#" className="hover:text-green-600 transition-colors">Scholarships</a></li>
                <li><a href="#" className="hover:text-green-600 transition-colors">E-Books</a></li>
                <li><a href="#" className="hover:text-green-600 transition-colors">Skill Guides</a></li>
                <li><a href="#" className="hover:text-green-600 transition-colors">Support</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6">Follow us</h4>
              <div className="space-y-4">
                <a href="#" className="flex items-center gap-3 text-gray-500 hover:text-green-600 transition-colors">
                  <Facebook size={20} /> Facebook
                </a>
                <a href="#" className="flex items-center gap-3 text-gray-500 hover:text-green-600 transition-colors">
                  <Instagram size={20} /> Instagram
                </a>
                <a href="#" className="flex items-center gap-3 text-gray-500 hover:text-green-600 transition-colors">
                  <Twitter size={20} /> X
                </a>
                <a href="#" className="flex items-center gap-3 text-gray-500 hover:text-green-600 transition-colors">
                  <Linkedin size={20} /> LinkedIn
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-100 text-sm text-gray-400">
            <p>© 2026 Edu-Advisory. All rights reserved.</p>
            <div className="flex gap-8 mt-4 md:mt-0">
              <a href="#" className="hover:text-gray-600">Privacy Policy</a>
              <a href="#" className="hover:text-gray-600">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
