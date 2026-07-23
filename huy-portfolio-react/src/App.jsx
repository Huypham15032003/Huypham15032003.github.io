import React, { useRef, useState, useEffect } from 'react';
import { 
  motion, useScroll, useTransform, useMotionValue, useSpring 
} from 'framer-motion';
import {
  BriefcaseBusiness, GraduationCap, MapPin, Database,
  FileText, BarChart3, Workflow, CheckCircle2,
  Calendar, Mail, Phone, Users
} from 'lucide-react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

// --- REUSABLE COMPONENTS ---

function ContactButton() {
  return (
    <button className="rounded-full font-medium uppercase tracking-widest text-white px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base cursor-pointer hover:scale-105 transition-transform shrink-0"
      style={{
        background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
        outline: '2px solid white',
        outlineOffset: '-3px'
      }}>
      Contact Me
    </button>
  );
}

function GhostButton({ children, as = "button", href, target, rel, className = "", onClick }) {
  const baseClasses = "rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base hover:bg-[#D7E2EA]/10 transition-colors cursor-pointer inline-flex items-center justify-center text-center shrink-0 " + className;
  if (as === "a") {
    return <a href={href} target={target} rel={rel} className={baseClasses} onClick={onClick}>{children}</a>;
  }
  return <button className={baseClasses} onClick={onClick}>{children}</button>;
}

function FadeIn({ children, delay = 0, duration = 0.7, x = 0, y = 30, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Magnet({ children, padding = 150, strength = 3, activeTransition = "transform 0.3s ease-out", inactiveTransition = "transform 0.6s ease-in-out", className = "" }) {
  const ref = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      
      const distX = e.clientX - cx;
      const distY = e.clientY - cy;
      const distance = Math.sqrt(distX * distX + distY * distY);
      
      if (distance < padding) {
        setIsActive(true);
        x.set(distX / strength);
        y.set(distY / strength);
      } else {
        setIsActive(false);
        x.set(0);
        y.set(0);
      }
    };

    const handleMouseLeave = () => {
      setIsActive(false);
      x.set(0);
      y.set(0);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [padding, strength, x, y]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ 
        x: springX, 
        y: springY,
        willChange: 'transform',
        transition: isActive ? activeTransition : inactiveTransition
      }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedText({ text, className = "", style }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2']
  });

  const chars = text.split("");

  return (
    <p ref={ref} className={`block break-words overflow-visible text-center ${className}`} style={style}>
      {chars.map((char, i) => {
        const start = i / chars.length;
        const end = start + (1 / chars.length);
        const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);

        return (
          <motion.span key={i} style={{ opacity, display: 'inline' }}>
            {char}
          </motion.span>
        );
      })}
    </p>
  );
}

// --- SECTIONS ---

function HeroSection() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if(el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative h-screen flex flex-col justify-between overflow-x-clip px-6 md:px-10">
      {/* NAVBAR */}
      <FadeIn delay={0} y={-20} className="pt-6 md:pt-8 relative z-50">
        <nav className="flex justify-between items-center text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem]">
          <button onClick={() => scrollTo('about')} className="hover:opacity-70 transition-opacity duration-200 cursor-pointer outline-none">About</button>
          <button onClick={() => scrollTo('skills')} className="hover:opacity-70 transition-opacity duration-200 cursor-pointer outline-none">Skills</button>
          <button onClick={() => scrollTo('experience')} className="hover:opacity-70 transition-opacity duration-200 cursor-pointer outline-none">Experience</button>
          <button onClick={() => scrollTo('projects')} className="hover:opacity-70 transition-opacity duration-200 cursor-pointer outline-none">Projects</button>
          <button onClick={() => scrollTo('contact')} className="hover:opacity-70 transition-opacity duration-200 cursor-pointer outline-none">Contact</button>
        </nav>
      </FadeIn>

      {/* MASSIVE BACKGROUND HEADING */}
      <div className="absolute inset-x-0 top-[22%] sm:top-[25%] md:top-[28%] z-[5] pointer-events-none select-none overflow-hidden flex justify-center">
        <FadeIn delay={0.15} y={40} className="w-full text-center">
          <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap text-[18vw] sm:text-[16vw] md:text-[14vw] lg:text-[15vw] opacity-90">
            Hi, i&apos;m Huy
          </h1>
        </FadeIn>
      </div>

      {/* ABSTRACT VISUAL FLOATING CARDS */}
      <FadeIn delay={0.6} y={30} className="absolute left-1/2 -translate-x-1/2 top-[40%] sm:top-1/2 -translate-y-1/2 z-30 w-full max-w-[600px] pointer-events-none h-[400px]">
        <Magnet padding={200} strength={4} className="w-full h-full relative pointer-events-auto">
          <motion.div 
            animate={{ y: [0, -10, 0] }} 
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute top-[10%] right-[10%] bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl text-[#D7E2EA] shadow-2xl p-4 flex items-center gap-3"
          >
            <FileText size={24} className="text-blue-400" />
            <div>
              <span className="text-xs uppercase tracking-widest opacity-60 block">Document</span>
              <span className="font-semibold text-sm">SRS Specs</span>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 15, 0] }} 
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
            className="absolute top-[40%] left-[5%] bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl text-[#D7E2EA] shadow-2xl p-4 flex items-center gap-3"
          >
            <Workflow size={24} className="text-purple-400" />
            <div>
              <span className="text-xs uppercase tracking-widest opacity-60 block">Process</span>
              <span className="font-semibold text-sm">User Stories</span>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, -12, 0] }} 
            transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }}
            className="absolute bottom-[20%] right-[20%] bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl text-[#D7E2EA] shadow-2xl p-4 flex items-center gap-3"
          >
            <BarChart3 size={24} className="text-emerald-400" />
            <div>
              <span className="text-xs uppercase tracking-widest opacity-60 block">Dashboard</span>
              <span className="font-semibold text-sm">Power BI</span>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 2 }}
            className="absolute top-[70%] left-[25%] bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl text-[#D7E2EA] shadow-2xl p-4 flex items-center gap-3"
          >
            <CheckCircle2 size={24} className="text-pink-400" />
            <div>
              <span className="text-xs uppercase tracking-widest opacity-60 block">Testing</span>
              <span className="font-semibold text-sm">UAT Support</span>
            </div>
          </motion.div>
        </Magnet>
      </FadeIn>

      {/* BOTTOM METADATA & CTA */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-end pb-7 sm:pb-8 md:pb-10 relative z-30 gap-6 mt-auto">
        <div className="flex flex-col gap-6">
          <FadeIn delay={0.3} y={20} className="flex flex-wrap gap-4 text-xs sm:text-sm text-[#D7E2EA]/80 font-light">
            <span className="flex items-center gap-1.5"><BriefcaseBusiness size={16} /> Fresher Business Analyst</span>
            <span className="flex items-center gap-1.5"><GraduationCap size={16} /> Information Systems Graduate</span>
            <span className="flex items-center gap-1.5"><MapPin size={16} /> Hanoi, Vietnam</span>
            <span className="flex items-center gap-1.5"><Database size={16} /> SQL • Power BI • SRS</span>
          </FadeIn>
          
          <FadeIn delay={0.35} y={20} className="max-w-[180px] sm:max-w-[240px] md:max-w-[320px]">
            <p className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug" style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}>
              a business analyst focused on transforming business needs into clear, practical software solutions
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.5} y={20} className="flex flex-col sm:flex-row gap-4 shrink-0">
          <GhostButton onClick={() => scrollTo('projects')}>View Projects</GhostButton>
          <div onClick={() => scrollTo('contact')}><ContactButton /></div>
        </FadeIn>
      </div>
    </section>
  );
}

const row1Cards = [
  "Requirement Elicitation", "SRS Documentation", "BRD Documentation", 
  "User Stories", "Use Cases", "Acceptance Criteria", 
  "Business Rules", "Process Flows", "Stakeholder Communication", 
  "SDLC Support", "Requirement Validation"
];

const row2Cards = [
  "UML Diagrams", "Activity Diagrams", "Sequence Diagrams", 
  "Class Diagrams", "Test Case Design", "UAT Support", 
  "Requirement Traceability", "SQL Server", "Power BI", 
  "Figma", "Draw.io", "Lark", "Agile/Scrum"
];

function MarqueeSection() {
  const [offset, setOffset] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const top = sectionRef.current.offsetTop;
      const scrollY = window.scrollY;
      const wh = window.innerHeight;
      const progress = (scrollY - top + wh) * 0.3;
      setOffset(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const row1Triple = [...row1Cards, ...row1Cards, ...row1Cards];
  const row2Triple = [...row2Cards, ...row2Cards, ...row2Cards];

  const Card = ({ text }) => (
    <div className="w-[300px] h-[150px] shrink-0 rounded-2xl border border-[#D7E2EA]/15 bg-white/5 backdrop-blur-md flex items-center justify-center text-center uppercase tracking-widest text-[#D7E2EA] font-medium p-6 shadow-lg">
      {text}
    </div>
  );

  return (
    <section ref={sectionRef} className="pt-24 sm:pt-32 md:pt-40 pb-10 bg-[#0C0C0C] overflow-hidden flex flex-col gap-3">
      <div 
        className="flex gap-3 will-change-transform"
        style={{ transform: `translateX(${offset - 200}px)` }}
      >
        {row1Triple.map((text, i) => <Card key={i} text={text} />)}
      </div>
      <div 
        className="flex gap-3 will-change-transform"
        style={{ transform: `translateX(${-(offset - 200)}px)` }}
      >
        {row2Triple.map((text, i) => <Card key={i} text={text} />)}
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="relative min-h-screen h-auto px-5 sm:px-8 md:px-10 py-20 bg-[#0C0C0C] overflow-visible flex flex-col items-center justify-center">
      {/* Decorative background layer for clipping */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <FadeIn delay={0.1} x={-80} y={0} duration={0.9} className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%]">
          <div className="bg-white/5 border border-white/10 backdrop-blur-lg rounded-3xl p-4 sm:p-6 text-[#D7E2EA] shadow-2xl flex items-center justify-center">
            <FileText size={48} className="opacity-50" />
          </div>
        </FadeIn>
        <FadeIn delay={0.25} x={-80} y={0} duration={0.9} className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%]">
          <div className="bg-white/5 border border-white/10 backdrop-blur-lg rounded-3xl p-4 sm:p-6 text-[#D7E2EA] shadow-2xl flex items-center justify-center">
            <Database size={48} className="opacity-50" />
          </div>
        </FadeIn>
        <FadeIn delay={0.15} x={80} y={0} duration={0.9} className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%]">
          <div className="bg-white/5 border border-white/10 backdrop-blur-lg rounded-3xl p-4 sm:p-6 text-[#D7E2EA] shadow-2xl flex items-center justify-center">
            <BarChart3 size={48} className="opacity-50" />
          </div>
        </FadeIn>
        <FadeIn delay={0.3} x={80} y={0} duration={0.9} className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%]">
          <div className="bg-white/5 border border-white/10 backdrop-blur-lg rounded-3xl p-4 sm:p-6 text-[#D7E2EA] shadow-2xl flex items-center justify-center">
            <Workflow size={48} className="opacity-50" />
          </div>
        </FadeIn>
      </div>

      <div className="relative z-10 w-full flex flex-col items-center gap-6 sm:gap-8 md:gap-10 overflow-visible">
        <FadeIn delay={0} y={40} className="w-full text-center overflow-visible">
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-8 sm:mb-10 md:mb-12 text-[18vw] sm:text-[15vw] md:text-[12vw] lg:text-[10vw]" style={{ fontSize: 'clamp(4rem, 12vw, 150px)' }}>
            About me
          </h2>
        </FadeIn>
        <div className="max-w-[760px] md:max-w-[900px] w-full flex flex-col items-center gap-8 sm:gap-10 md:gap-12 overflow-visible">
          <AnimatedText
            text={`Information Systems graduate with experience as a Business Analyst, specializing in requirements analysis, process standardization, data analysis, and cross-functional collaboration with software development teams. Currently transitioning into Website SEO, with a focus on Technical SEO, website performance analysis, and user experience optimization.

Possess a foundational knowledge of HTML, CSS, JavaScript, SQL Server, and Power BI, along with experience developing an e-commerce website for online book sales. Seeking to apply analytical thinking, technical collaboration skills, and an understanding of website structure in an SEO Fresher position.`}
            className="text-[#D7E2EA] font-medium leading-relaxed text-center text-base sm:text-lg md:text-xl lg:text-2xl whitespace-pre-line break-words overflow-visible mx-auto"
          />
          <div onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })} className="cursor-pointer relative z-20">
            <ContactButton />
          </div>
        </div>
      </div>
    </section>
  );
}

const skills = [
  { num: "01", name: "Business Analysis", desc: "Requirement elicitation, SRS, BRD, User Stories, Use Cases, Acceptance Criteria, business rules, and requirement traceability." },
  { num: "02", name: "Modeling", desc: "UML Use Case Diagrams, Activity Diagrams, Sequence Diagrams, Class Diagrams, and process flow modeling." },
  { num: "03", name: "Testing & Validation", desc: "Test case design, UAT support, requirement validation, feedback tracking, and coordination with QA teams." },
  { num: "04", name: "Tools", desc: "Figma, Lark, Draw.io, SQL Server, Power BI, Canva, and documentation collaboration tools." },
  { num: "05", name: "Agile / Scrum", desc: "Scrum workflow, sprint planning support, product backlog understanding, user stories, and SDLC collaboration." }
];

function SkillsSection() {
  return (
    <section id="skills" className="bg-[#FFFFFF] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-20">
      <h2 className="text-[#0C0C0C] font-black uppercase text-center mb-16 sm:mb-20 md:mb-28" style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}>
        Skills
      </h2>
      <div className="max-w-5xl mx-auto flex flex-col">
        {skills.map((skill, i) => (
          <FadeIn key={skill.num} delay={i * 0.1}>
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-10 py-8 sm:py-10 md:py-12 border-b border-[rgba(12,12,12,0.15)] last:border-0">
              <span className="text-[#0C0C0C] font-black shrink-0" style={{ fontSize: 'clamp(3rem, 10vw, 140px)', lineHeight: 1 }}>
                {skill.num}
              </span>
              <div className="flex flex-col gap-2 md:gap-4 md:ml-auto md:w-2/3">
                <h3 className="text-[#0C0C0C] font-medium uppercase" style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}>
                  {skill.name}
                </h3>
                <p className="text-[#0C0C0C] font-light leading-relaxed max-w-2xl opacity-60" style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}>
                  {skill.desc}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section id="experience" className="bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-10 -mt-10 sm:-mt-12 md:-mt-14 rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px]">
      <FadeIn delay={0}>
        <h2 className="hero-heading font-black uppercase text-center mb-16 sm:mb-20 md:mb-28" style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}>
          Experience
        </h2>
      </FadeIn>
      <FadeIn delay={0.2} className="max-w-5xl mx-auto rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-6 sm:p-8 md:p-10 text-[#D7E2EA] shadow-2xl relative overflow-hidden">
        {/* Subtle glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 blur-[100px] pointer-events-none" />
        
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 border-b border-[#D7E2EA]/20 pb-8 mb-8 relative z-10">
          <div>
            <h3 className="text-2xl sm:text-3xl font-semibold uppercase tracking-wide mb-2 flex items-center gap-3">
              <BriefcaseBusiness size={28} className="text-blue-400" />
              THG Digital Transformation Company
            </h3>
            <span className="text-lg sm:text-xl text-[#D7E2EA]/80 font-light block">Business Analyst</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full font-medium text-sm">
            <Calendar size={16} /> Jul 2025 – Present
          </div>
        </div>

        <ul className="flex flex-col gap-5 text-base sm:text-lg font-light leading-relaxed mb-10 relative z-10">
          <li className="flex items-start gap-3">
            <CheckCircle2 size={24} className="text-emerald-400 shrink-0 mt-0.5" />
            <span>Maintained and updated SRS documents for 2 projects by refining business rules, process flows, functional requirements, and acceptance criteria.</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 size={24} className="text-emerald-400 shrink-0 mt-0.5" />
            <span>Collaborated with stakeholders to gather and translate business requirements into User Stories, Use Cases, and Acceptance Criteria using Given–When–Then format.</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 size={24} className="text-emerald-400 shrink-0 mt-0.5" />
            <span>Conducted requirement review sessions with cross-functional teams to identify gaps, inconsistencies, and improve requirement quality before development.</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 size={24} className="text-emerald-400 shrink-0 mt-0.5" />
            <span>Supported UAT and requirement validation by coordinating stakeholder feedback and tracking requirement changes.</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 size={24} className="text-emerald-400 shrink-0 mt-0.5" />
            <span>Worked closely with Dev and QA teams throughout the SDLC to clarify requirements, update documentation, and support issue resolution for multiple features.</span>
          </li>
        </ul>

        <div className="flex flex-wrap gap-3 relative z-10">
          {["SRS", "User Stories", "Use Cases", "Acceptance Criteria", "UAT", "SDLC", "Dev & QA Collaboration"].map((badge) => (
            <span key={badge} className="px-4 py-1.5 bg-[#D7E2EA]/10 border border-[#D7E2EA]/20 rounded-full text-sm font-medium tracking-wide">
              {badge}
            </span>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}

const projectsData = [
  {
    name: "NAAN ERP System",
    category: "ERP / Business Analysis",
    desc: "ERP system for construction consulting and infrastructure project management.",
    role: "Business Analyst",
    contribution: ["Requirement documentation", "Business rules refinement", "Process flow analysis", "Functional requirements support", "Acceptance criteria writing", "Stakeholder communication"],
    tags: ["ERP", "SRS", "Process Flow", "Business Rules", "Acceptance Criteria"],
    link: null
  },
  {
    name: "SKYPEC Project",
    category: "Aviation Fuel Services",
    desc: "Aviation fuel services management project focused on business process support and documentation.",
    role: "Business Analyst",
    contribution: ["Requirement analysis", "Documentation support", "Stakeholder coordination", "Requirement clarification", "UAT support"],
    tags: ["Aviation", "Requirement Analysis", "Documentation", "UAT", "Stakeholders"],
    link: null
  },
  {
    name: "Business Trend Analysis",
    category: "Academic Project",
    desc: "University project analyzing business trends via interactive dashboards. Focused on data analysis, visualizing raw data into actionable insights, and understanding business processes.",
    role: "Data Analyst",
    contribution: ["Built sales dashboard analysis", "Identified revenue and product performance changes", "Designed presentation materials in Canva", "Summarized insights for business review"],
    tools: ["Power BI", "Canva", "Data Analysis"],
    tags: ["Power BI", "Canva", "Sales Analysis", "Dashboard", "Insights"],
    link: "https://www.canva.com/design/DAF6CCXP1Pw/L6UsfmnHDlcea3sIHzO6_w/view"
  },
  {
    name: "CRM System",
    category: "Academic Project",
    desc: "Academic project simulating CRM system development. Performed requirement analysis, created system documentation, managed project timelines, and supported testing routines.",
    role: "Business Analyst / Module Lead",
    contribution: ["Requirement analysis for the Product module", "Created system documentation", "Managed timeline progress and support tickets", "Supported testing routines"],
    tools: ["Requirement Analysis", "Documentation", "Testing", "MySQL"],
    tags: ["Requirement Analysis", "Documentation", "Testing", "MySQL", "Bootstrap"],
    link: "https://github.com/nguyendat1202/ISP490_SU25_G4"
  },
  {
    name: "Online Bookstore Web App",
    category: "University Project",
    desc: "University project building an e-commerce platform. Focused on requirement analysis, designing the database, and documenting user workflows for browsing and purchasing books.",
    role: "Developer / Analyst",
    contribution: ["Requirement analysis", "Database schema design", "Documented user workflows", "Frontend layout integration"],
    tools: ["Requirement Analysis", "Database Design", "Process Documentation", "SQL Server"],
    tags: ["Requirement Analysis", "Database Design", "Process Documentation", "SQL Server"],
    link: "https://github.com/Huypham15032003/BookStorePRJ_302"
  }
];

function ProjectsSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });

  return (
    <section id="projects" className="relative bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-20 py-20 px-4 sm:px-6 md:px-10">
      <FadeIn delay={0}>
        <h2 className="hero-heading font-black uppercase text-center mb-16 sm:mb-20 md:mb-28" style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}>
          Projects
        </h2>
      </FadeIn>
      
      <div ref={containerRef} className="relative w-full max-w-7xl mx-auto" style={{ height: `${projectsData.length * 85}vh` }}>
        {projectsData.map((proj, i) => {
          const targetScale = 1 - (projectsData.length - 1 - i) * 0.03;
          const scale = useTransform(scrollYProgress, [i / projectsData.length, 1], [1, targetScale]);
          
          return (
            <div key={i} className="sticky top-24 md:top-32 w-full flex justify-center items-center h-[85vh]">
              <motion.div 
                className="w-full bg-[#0C0C0C] rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] p-6 sm:p-8 md:p-12 flex flex-col h-full max-h-[900px] shadow-2xl relative overflow-hidden"
                style={{ scale, top: `calc(10vh + ${i * 28}px)` }}
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 shrink-0 border-b border-[#D7E2EA]/20 pb-6 mb-6">
                  <div className="flex items-center gap-6 md:gap-8">
                    <span className="hero-heading font-black leading-none" style={{ fontSize: 'clamp(3rem, 8vw, 100px)' }}>
                      0{i + 1}
                    </span>
                    <div>
                      <span className="text-[#D7E2EA]/60 uppercase tracking-widest text-xs sm:text-sm font-medium block mb-1">
                        {proj.category}
                      </span>
                      <h3 className="text-[#D7E2EA] font-semibold uppercase text-2xl sm:text-3xl md:text-4xl tracking-wide">
                        {proj.name}
                      </h3>
                    </div>
                  </div>
                  {proj.link && (
                    <GhostButton as="a" href={proj.link} target="_blank" rel="noreferrer">
                      View Project
                    </GhostButton>
                  )}
                </div>

                {/* Content Grid */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 min-h-0 overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin' }}>
                  {/* Left Column: Summary */}
                  <div className="flex flex-col gap-6">
                    <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-sm">
                      <h4 className="text-sm uppercase tracking-widest text-[#D7E2EA]/60 font-semibold mb-3 flex items-center gap-2">
                        <FileText size={16} /> Project Summary
                      </h4>
                      <p className="text-base sm:text-lg font-light leading-relaxed text-[#D7E2EA]">
                        {proj.desc}
                      </p>
                    </div>

                    <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-sm flex-1">
                      <h4 className="text-sm uppercase tracking-widest text-[#D7E2EA]/60 font-semibold mb-3 flex items-center gap-2">
                        <Users size={16} /> Role
                      </h4>
                      <p className="text-lg sm:text-xl font-medium text-[#D7E2EA]">
                        {proj.role}
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Contributions / Outcomes */}
                  <div className="flex flex-col gap-6">
                    <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-sm flex-1">
                      <h4 className="text-sm uppercase tracking-widest text-[#D7E2EA]/60 font-semibold mb-4 flex items-center gap-2">
                        <Workflow size={16} /> Key Contributions
                      </h4>
                      <ul className="flex flex-col gap-3">
                        {proj.contribution.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-sm sm:text-base font-light text-[#D7E2EA]">
                            <CheckCircle2 size={18} className="text-blue-400 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {proj.tags.map(t => (
                        <span key={t} className="px-3 py-1.5 bg-[#D7E2EA]/10 rounded-full text-xs font-medium tracking-wide border border-[#D7E2EA]/20">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-30">
      <FadeIn delay={0}>
        <h2 className="hero-heading font-black uppercase text-center mb-16 sm:mb-20 md:mb-28" style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}>
          Contact
        </h2>
      </FadeIn>
      
      <FadeIn delay={0.2} className="max-w-3xl mx-auto rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-6 sm:p-8 md:p-12 text-[#D7E2EA] shadow-2xl flex flex-col items-center text-center">
        <p className="text-lg sm:text-xl md:text-2xl font-light leading-relaxed mb-10 max-w-2xl">
          Let’s connect and discuss how I can support your team in analyzing business needs, improving processes, and delivering practical software solutions.
        </p>

        <div className="flex flex-col gap-6 w-full max-w-md mb-12">
          <a href="mailto:phamhaihuy150303@gmail.com" className="flex items-center justify-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors outline-none cursor-pointer">
            <Mail className="text-blue-400" />
            <span className="font-medium text-base sm:text-lg">phamhaihuy150303@gmail.com</span>
          </a>
          <a href="tel:0936080611" className="flex items-center justify-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors outline-none cursor-pointer">
            <Phone className="text-emerald-400" />
            <span className="font-medium text-base sm:text-lg">0936080611</span>
          </a>
          <div className="flex items-center justify-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
            <MapPin className="text-purple-400" />
            <span className="font-medium text-base sm:text-lg">Hanoi, Vietnam</span>
          </div>
          <a href="https://www.linkedin.com/in/huy-pham-89b0a33a7" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors outline-none cursor-pointer">
            <FaLinkedin className="text-blue-500 text-2xl" />
            <span className="font-medium text-base sm:text-lg">LinkedIn</span>
          </a>
          <a href="https://github.com/Huypham15032003" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors outline-none cursor-pointer">
            <FaGithub className="text-white text-2xl" />
            <span className="font-medium text-base sm:text-lg">GitHub</span>
          </a>
        </div>

        <a href="mailto:phamhaihuy150303@gmail.com"><ContactButton /></a>
      </FadeIn>

      <div className="mt-32 text-center text-[#D7E2EA]/40 text-sm font-light uppercase tracking-widest">
        PHẠM HẢI HUY — Business Analyst Portfolio
      </div>
    </section>
  );
}

// --- MAIN APP ---

export default function App() {
  return (
    <div className="bg-[#0C0C0C]">
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
}
