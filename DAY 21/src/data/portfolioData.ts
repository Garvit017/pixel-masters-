import { PortfolioData, Project, Skill, Experience, Education, Certification, Testimonial, PersonalInfo } from '../types';

export const personalInfo: PersonalInfo = {
  name: 'John Doe',
  title: 'Full Stack Developer',
  bio: 'Passionate full-stack developer with 5+ years of experience building scalable web applications. I specialize in React, Node.js, and modern web technologies, with a focus on creating exceptional user experiences and robust backend systems.',
  location: 'San Francisco, CA',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  website: 'https://johndoe.dev',
  github: 'https://github.com/johndoe',
  linkedin: 'https://linkedin.com/in/johndoe',
  twitter: 'https://twitter.com/johndoe',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
  resumeUrl: '/resume.pdf',
};

export const projects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce platform with advanced features including real-time inventory management, payment processing, and analytics dashboard.',
    longDescription: 'Built a comprehensive e-commerce solution from scratch using React, Node.js, and PostgreSQL. The platform includes user authentication, product management, shopping cart functionality, payment integration with Stripe, order tracking, and an admin dashboard with analytics. Implemented real-time features using WebSockets for live inventory updates and order notifications.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
    ],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'WebSockets', 'Redis', 'Docker'],
    category: 'web',
    status: 'completed',
    featured: true,
    githubUrl: 'https://github.com/johndoe/ecommerce-platform',
    liveUrl: 'https://ecommerce-demo.johndoe.dev',
    startDate: new Date('2023-01-01'),
    endDate: new Date('2023-06-30'),
    tags: ['E-commerce', 'Full Stack', 'Payment Processing', 'Real-time'],
    challenges: [
      'Implementing real-time inventory updates across multiple users',
      'Optimizing database queries for large product catalogs',
      'Ensuring secure payment processing and PCI compliance'
    ],
    achievements: [
      'Reduced page load time by 40% through code splitting and lazy loading',
      'Achieved 99.9% uptime with proper error handling and monitoring',
      'Processed over $1M in transactions with zero security incidents'
    ]
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates, team collaboration features, and advanced project tracking.',
    longDescription: 'Developed a modern task management application using React, TypeScript, and Firebase. Features include real-time collaboration, drag-and-drop task organization, time tracking, team management, and comprehensive reporting. The app supports multiple project views including Kanban boards, Gantt charts, and calendar views.',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    ],
    technologies: ['React', 'TypeScript', 'Firebase', 'Material-UI', 'React DnD', 'Chart.js'],
    category: 'web',
    status: 'completed',
    featured: true,
    githubUrl: 'https://github.com/johndoe/task-manager',
    liveUrl: 'https://taskmanager.johndoe.dev',
    startDate: new Date('2022-08-01'),
    endDate: new Date('2023-01-15'),
    tags: ['Productivity', 'Collaboration', 'Real-time', 'TypeScript'],
    challenges: [
      'Implementing real-time collaboration without conflicts',
      'Creating intuitive drag-and-drop interfaces',
      'Managing complex state with multiple users'
    ],
    achievements: [
      'Increased team productivity by 35% according to user feedback',
      'Achieved 4.8/5 user rating on the app store',
      'Successfully handled 1000+ concurrent users'
    ]
  },
  {
    id: '3',
    title: 'Weather Dashboard',
    description: 'A comprehensive weather application with interactive maps, detailed forecasts, and location-based alerts.',
    longDescription: 'Built a feature-rich weather application using React, Leaflet maps, and multiple weather APIs. The app provides current weather conditions, 7-day forecasts, interactive maps with weather overlays, location search, and customizable alerts. Implemented geolocation services and offline functionality for better user experience.',
    image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=600&fit=crop',
    ],
    technologies: ['React', 'Leaflet', 'OpenWeatherMap API', 'PWA', 'Service Workers'],
    category: 'web',
    status: 'completed',
    featured: false,
    githubUrl: 'https://github.com/johndoe/weather-dashboard',
    liveUrl: 'https://weather.johndoe.dev',
    startDate: new Date('2023-07-01'),
    endDate: new Date('2023-09-30'),
    tags: ['Weather', 'Maps', 'PWA', 'API Integration'],
    challenges: [
      'Integrating multiple weather data sources',
      'Creating responsive map interfaces',
      'Implementing offline functionality'
    ],
    achievements: [
      'Achieved 95% Lighthouse performance score',
      'Successfully integrated 3 different weather APIs',
      'Implemented offline functionality for core features'
    ]
  },
  {
    id: '4',
    title: 'Social Media Dashboard',
    description: 'A comprehensive social media management platform with analytics, scheduling, and engagement tracking.',
    longDescription: 'Developed a social media management platform that allows users to manage multiple social media accounts from a single dashboard. Features include post scheduling, analytics tracking, engagement monitoring, and automated responses. Built with React, Node.js, and integrated with major social media APIs.',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop',
    ],
    technologies: ['React', 'Node.js', 'MongoDB', 'Social Media APIs', 'Chart.js', 'Cron Jobs'],
    category: 'web',
    status: 'in-progress',
    featured: false,
    githubUrl: 'https://github.com/johndoe/social-dashboard',
    startDate: new Date('2023-10-01'),
    tags: ['Social Media', 'Analytics', 'Automation', 'Dashboard'],
    challenges: [
      'Managing rate limits across multiple social media APIs',
      'Implementing real-time analytics updates',
      'Creating intuitive scheduling interfaces'
    ],
    achievements: [
      'Successfully integrated 5 major social media platforms',
      'Implemented automated posting with 99.9% success rate',
      'Created comprehensive analytics dashboard'
    ]
  },
  {
    id: '5',
    title: 'Mobile Banking App',
    description: 'A secure mobile banking application with biometric authentication, transaction management, and financial insights.',
    longDescription: 'Developed a mobile banking application using React Native with advanced security features including biometric authentication, encrypted data transmission, and fraud detection. The app includes account management, transaction history, bill payments, investment tracking, and personalized financial insights.',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop',
    ],
    technologies: ['React Native', 'Node.js', 'PostgreSQL', 'Biometric Auth', 'Encryption', 'JWT'],
    category: 'mobile',
    status: 'completed',
    featured: true,
    githubUrl: 'https://github.com/johndoe/mobile-banking',
    startDate: new Date('2022-03-01'),
    endDate: new Date('2022-12-31'),
    tags: ['Mobile', 'Banking', 'Security', 'Fintech'],
    challenges: [
      'Implementing bank-level security measures',
      'Creating smooth mobile user experiences',
      'Integrating with legacy banking systems'
    ],
    achievements: [
      'Achieved SOC 2 Type II compliance',
      'Processed over $10M in transactions securely',
      'Maintained 4.9/5 app store rating'
    ]
  }
];

export const skills: Skill[] = [
  { id: '1', name: 'React', category: 'frontend', level: 'expert', icon: '⚛️' },
  { id: '2', name: 'TypeScript', category: 'frontend', level: 'expert', icon: '📘' },
  { id: '3', name: 'Node.js', category: 'backend', level: 'expert', icon: '🟢' },
  { id: '4', name: 'JavaScript', category: 'frontend', level: 'expert', icon: '🟨' },
  { id: '5', name: 'Python', category: 'backend', level: 'advanced', icon: '🐍' },
  { id: '6', name: 'PostgreSQL', category: 'database', level: 'advanced', icon: '🐘' },
  { id: '7', name: 'MongoDB', category: 'database', level: 'advanced', icon: '🍃' },
  { id: '8', name: 'Docker', category: 'devops', level: 'advanced', icon: '🐳' },
  { id: '9', name: 'AWS', category: 'devops', level: 'intermediate', icon: '☁️' },
  { id: '10', name: 'Git', category: 'other', level: 'expert', icon: '📚' },
  { id: '11', name: 'Figma', category: 'design', level: 'intermediate', icon: '🎨' },
  { id: '12', name: 'Tailwind CSS', category: 'frontend', level: 'expert', icon: '🎨' },
];

export const experience: Experience[] = [
  {
    id: '1',
    company: 'TechCorp Inc.',
    position: 'Senior Full Stack Developer',
    location: 'San Francisco, CA',
    startDate: new Date('2022-01-01'),
    current: true,
    description: 'Leading development of enterprise-scale web applications and mentoring junior developers. Responsible for architecture decisions and technical strategy.',
    achievements: [
      'Led development of 3 major product features resulting in 40% increase in user engagement',
      'Mentored 5 junior developers, improving team productivity by 25%',
      'Implemented CI/CD pipeline reducing deployment time by 60%'
    ],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'],
    type: 'full-time'
  },
  {
    id: '2',
    company: 'StartupXYZ',
    position: 'Full Stack Developer',
    location: 'Remote',
    startDate: new Date('2020-06-01'),
    endDate: new Date('2021-12-31'),
    current: false,
    description: 'Developed full-stack applications for a fast-growing startup. Worked closely with product team to deliver features that directly impacted business metrics.',
    achievements: [
      'Built MVP that helped secure $2M in Series A funding',
      'Reduced application load time by 50% through performance optimization',
      'Implemented automated testing increasing code coverage to 90%'
    ],
    technologies: ['React', 'Express.js', 'MongoDB', 'Redis', 'Heroku'],
    type: 'full-time'
  },
  {
    id: '3',
    company: 'Freelance',
    position: 'Web Developer',
    location: 'Remote',
    startDate: new Date('2019-01-01'),
    endDate: new Date('2020-05-31'),
    current: false,
    description: 'Provided web development services to various clients including small businesses and startups. Specialized in custom web applications and e-commerce solutions.',
    achievements: [
      'Completed 15+ projects with 100% client satisfaction',
      'Built custom e-commerce platform generating $500K+ in sales',
      'Developed responsive websites with 99% mobile compatibility'
    ],
    technologies: ['React', 'Vue.js', 'Laravel', 'WordPress', 'Shopify'],
    type: 'freelance'
  }
];

export const education: Education[] = [
  {
    id: '1',
    institution: 'University of California, Berkeley',
    degree: 'Bachelor of Science',
    field: 'Computer Science',
    startDate: new Date('2015-09-01'),
    endDate: new Date('2019-05-31'),
    current: false,
    gpa: '3.8/4.0',
    description: 'Focused on software engineering, algorithms, and data structures. Completed senior capstone project on machine learning applications.',
    achievements: [
      'Dean\'s List for 6 consecutive semesters',
      'President of Computer Science Club',
      'Completed research project on AI applications in healthcare'
    ]
  }
];

export const certifications: Certification[] = [
  {
    id: '1',
    name: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services',
    issueDate: new Date('2023-03-15'),
    credentialId: 'AWS-SAA-123456',
    credentialUrl: 'https://aws.amazon.com/verification',
    description: 'Demonstrates ability to design and deploy scalable systems on AWS'
  },
  {
    id: '2',
    name: 'React Developer Certification',
    issuer: 'Meta',
    issueDate: new Date('2022-11-20'),
    credentialId: 'META-REACT-789012',
    credentialUrl: 'https://coursera.org/verify/react-cert',
    description: 'Advanced React development skills including hooks, context, and performance optimization'
  }
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    position: 'Product Manager',
    company: 'TechCorp Inc.',
    content: 'John is an exceptional developer who consistently delivers high-quality code. His attention to detail and problem-solving skills are outstanding. He played a crucial role in launching our flagship product.',
    rating: 5,
    projectId: '1'
  },
  {
    id: '2',
    name: 'Mike Chen',
    position: 'CTO',
    company: 'StartupXYZ',
    content: 'Working with John was a game-changer for our startup. He not only built amazing features but also mentored our team and helped us scale our technical infrastructure. Highly recommended!',
    rating: 5,
    projectId: '2'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    position: 'CEO',
    company: 'E-Commerce Solutions',
    content: 'John delivered our e-commerce platform ahead of schedule and exceeded all expectations. The platform has been running flawlessly for over a year with zero downtime. Excellent work!',
    rating: 5,
    projectId: '1'
  }
];

export const portfolioData: PortfolioData = {
  personalInfo,
  projects,
  skills,
  experience,
  education,
  certifications,
  testimonials,
  blogPosts: []
};
