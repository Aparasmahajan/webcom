interface NavigationItem {
  label: string;
  path: string;
  dropdown?: NavigationItem[];
}

export interface SemesterFee {
  semester: string;
  tuitionFee: number;
  examFee: number;
  miscFee: number;
}

export interface Program {
  id: string;
  name: string;
  fullName: string;
  duration: string;
  semesters: number;
  description: string;
  benefits: string[];
  fees: SemesterFee[];
  popular?: boolean;
}

export interface DegreeLevel {
  id: string;
  label: string;
  shortLabel: string;
  path: string;
  tagline: string;
  programs: Program[];
}

interface AboutUsMember {
  position: string;
  name: string;
  image?: string;
  description: string;
}

export const stats = [
  { num: '500+', label: 'Students trained' },
  { num: '12+', label: 'Programs offered' },
  { num: '95%', label: 'Placement rate' },
  { num: '8+', label: 'Years of excellence' },
];

export const navigationItems: NavigationItem[] = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Check Certificate', path: '/check-certificate' },
  {
    label: 'Our Programs',
    path: '/programs',
    dropdown: [
      { label: "Bachelor's Degrees", path: '/programs/bachelors' },
      { label: "Master's Degrees",   path: '/programs/masters'   },
      { label: 'PhD Programs',       path: '/programs/phd'       },
    ],
  },
  { label: 'Contact Us', path: '/contact' },
];

export const newsItems = [
  {
    id: 1,
    title: "Webcom Announces New Educational Initiatives for 2025",
    description: "We are proud to launch comprehensive skill development programs aimed at empowering students and professionals across various domains.",
    image: "https://images.pexels.com/photos/289737/pexels-photo-289737.jpeg?auto=compress&cs=tinysrgb&w=800",
    backgroundColor: "#1E40AF",
    titleTextColor: "#FFFFFF",
    descriptionTextColor: "#E5E7EB",
    isTitleLeft: false
  },
  {
    id: 2,
    // title: "Excellence in Education Awards 2024",
    // description: "Webcom recognizes outstanding achievements in education and community development. Join us in celebrating academic excellence.",
    image: "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=800",
    backgroundColor: "#059669",
    titleTextColor: "#FFFFFF",
    descriptionTextColor: "#F3F4F6",
    isTitleLeft: true
  },
  {
    id: 3,
    title: "Community Outreach Programs Expanding",
    description: "Our commitment to social development continues with new outreach programs designed to support underserved communities.",
    image: "https://images.pexels.com/photos/1181534/pexels-photo-1181534.jpeg?auto=compress&cs=tinysrgb&w=800",
    backgroundColor: "#DC2626",
    titleTextColor: "#FFFFFF",
    descriptionTextColor: "#FDE68A",
    isTitleLeft: true
  }
];

export const aboutUsData = {
  history: `The Human Resource and Development Society (Webcom) was established in 2003 with a vision to create meaningful impact in education and community development. Over the past decade, we have worked tirelessly to bridge the gap between traditional education and modern skill requirements.

Our journey began with a small group of dedicated educators and professionals who believed in the transformative power of quality education. Today, Webcom stands as a beacon of excellence, having touched thousands of lives through our various educational initiatives, skill development programs, and community outreach efforts.

We continue to evolve and adapt to meet the changing needs of society, always keeping our core mission at the heart of everything we do: empowering individuals through education and fostering sustainable community development.`,

  members: [
    {
      position: "President",
      name: "Mr. Anoop Mahajan",
      // image: "",
      description: "Leading Webcom with over 20 years of experience in educational administration."
    },
    {
      position: "Cashier",
      name: "Mrs. Manu Mahajan",
      // // image: "",
      description: "Managing financial operations with precision and transparency."
    },
    {
      position: "Member",
      name: "Mr. Ashwani Lohtia",
      // image: "",
      description: "Contributing expertise in research and development initiatives."
    },
    {
      position: "Member",
      name: "Mrs. Indu Mahajan",
      // image: "",
      description: "Contributing expertise in research and development initiatives."
    }
  ] as AboutUsMember[]
};

export const contactInfo = {
  address: "Master Market, opposite Eye Hospital O/S, Khajuri Gate, Batala, Punjab 143505",
  mobile: "+91 78141 92670",
  email: "apex@gmail.com",
  mapCoordinates: {
    lat: 30.7900,
    lng: 75.4700
  }
};

export const mockCertificates = [
  { id:1, certificate_number: "12880", name: "Mahajan", father_name:"Mahajan", duration: "6 month", join_date: "02-01-2024",complete_date: "02-01-2024", course: "Digital Marketing", issued: "2025-01-15" },
  { id:2, certificate_number: "12881", name: "Mahajan", father_name:"Mahajan", duration: "6 month", join_date: "02-01-2024",complete_date: "02-01-2024", course: "Web Development", issued: "2025-02-20" },
  { id:3, certificate_number: "12882", name: "Mahajan", father_name:"Mahajan", duration: "6 month", join_date: "02-01-2024",complete_date: "02-01-2024", course: "Data Science", issued: "2025-03-10" },
  { id:4, certificate_number: "5544", name: "Harjeet Kaur", father_name:"Parkash Singh", duration: "6 month", join_date: "01-01-2023",complete_date: "30-06-2023", course: "Diploma in Office Productivity and Application", issued: "2023-07-03" },
  { id:5, certificate_number: "13008", name: "Raghav Suri", father_name:"Tarun Suri", duration: "1 year", join_date: "14-04-2025",complete_date: "13-04-2026", course: "DCA", issued: "20-04-2026" }
];

export const programsData: DegreeLevel[] = [
  // ─── BACHELOR'S ───────────────────────────────────────────────────────────
  {
    id: 'bachelors',
    label: "Bachelor's Degrees",
    shortLabel: "Bachelor's",
    path: '/programs/bachelors',
    tagline: 'Build a strong foundation with our 3-year undergraduate programs.',
    programs: [
      {
        id: 'bca',
        name: 'BCA',
        fullName: 'Bachelor of Computer Applications',
        duration: '3 Years',
        semesters: 6,
        description:
          'A cutting-edge program blending computer science fundamentals with modern software technologies, preparing graduates for a dynamic tech career.',
        benefits: [
          'Comprehensive programming in C, C++, Java, and Python',
          'Hands-on projects in web development and database management',
          'Industry-aligned curriculum updated each academic year',
          'Strong placement record with leading IT companies',
          'Dedicated lab infrastructure with the latest software tools',
          'Add-on certification tracks in networking and cybersecurity',
        ],
        fees: [
          { semester: 'Semester 1', tuitionFee: 14000, examFee: 1200, miscFee: 800 },
          { semester: 'Semester 2', tuitionFee: 14000, examFee: 1200, miscFee: 800 },
          { semester: 'Semester 3', tuitionFee: 15000, examFee: 1400, miscFee: 800 },
          { semester: 'Semester 4', tuitionFee: 15000, examFee: 1400, miscFee: 800 },
          { semester: 'Semester 5', tuitionFee: 17000, examFee: 1500, miscFee: 1000 },
          { semester: 'Semester 6', tuitionFee: 17000, examFee: 1500, miscFee: 1000 },
        ],
        popular: true,
      },
      {
        id: 'ba',
        name: 'BA',
        fullName: 'Bachelor of Arts',
        duration: '3 Years',
        semesters: 6,
        description:
          'A versatile liberal arts program developing analytical thinking, communication skills, and cultural awareness across diverse humanities disciplines.',
        benefits: [
          'Broad exposure to History, Sociology, Political Science, and more',
          'Strong foundation in academic writing and critical reasoning',
          'Flexible elective choices to align with your career aspirations',
          'Opportunities for social work and community engagement',
          'Gateway to civil services and administrative careers',
          'Research seminars and paper presentations every year',
        ],
        fees: [
          { semester: 'Semester 1', tuitionFee: 7500,  examFee: 1000, miscFee: 500 },
          { semester: 'Semester 2', tuitionFee: 7500,  examFee: 1000, miscFee: 500 },
          { semester: 'Semester 3', tuitionFee: 8000,  examFee: 1000, miscFee: 500 },
          { semester: 'Semester 4', tuitionFee: 8000,  examFee: 1000, miscFee: 500 },
          { semester: 'Semester 5', tuitionFee: 9000,  examFee: 1200, miscFee: 600 },
          { semester: 'Semester 6', tuitionFee: 9000,  examFee: 1200, miscFee: 600 },
        ],
      },
      {
        id: 'bba',
        name: 'BBA',
        fullName: 'Bachelor of Business Administration',
        duration: '3 Years',
        semesters: 6,
        description:
          "An industry-focused business program equipping students with management, marketing, and entrepreneurship skills for today's competitive corporate world.",
        benefits: [
          'Core subjects: Marketing, Finance, HR, and Operations Management',
          'Regular industry visits and guest lectures by business leaders',
          'Summer internship program with partner organisations',
          'Business case competitions and entrepreneurship workshops',
          'Strong alumni network across banking and finance sectors',
          'Preparation pathway for MBA entrance examinations',
        ],
        fees: [
          { semester: 'Semester 1', tuitionFee: 11000, examFee: 1200, miscFee: 700 },
          { semester: 'Semester 2', tuitionFee: 11000, examFee: 1200, miscFee: 700 },
          { semester: 'Semester 3', tuitionFee: 12000, examFee: 1200, miscFee: 700 },
          { semester: 'Semester 4', tuitionFee: 12000, examFee: 1200, miscFee: 700 },
          { semester: 'Semester 5', tuitionFee: 13500, examFee: 1400, miscFee: 800 },
          { semester: 'Semester 6', tuitionFee: 13500, examFee: 1400, miscFee: 800 },
        ],
      },
      {
        id: 'bcom',
        name: 'B.Com',
        fullName: 'Bachelor of Commerce',
        duration: '3 Years',
        semesters: 6,
        description:
          'A commerce-focused program covering accounting, taxation, and economics to build strong financial literacy and career readiness.',
        benefits: [
          'In-depth study of Accountancy, Taxation, and Auditing',
          'Practical training in Tally ERP and financial software',
          'Foundation for CA, CMA, and CS professional courses',
          'Exposure to banking, insurance, and stock market operations',
          'Regular mock tests aligned with university exam patterns',
          'Career pathways in audit firms, banks, and MNCs',
        ],
        fees: [
          { semester: 'Semester 1', tuitionFee: 9000,  examFee: 1100, miscFee: 600 },
          { semester: 'Semester 2', tuitionFee: 9000,  examFee: 1100, miscFee: 600 },
          { semester: 'Semester 3', tuitionFee: 9500,  examFee: 1100, miscFee: 600 },
          { semester: 'Semester 4', tuitionFee: 9500,  examFee: 1100, miscFee: 600 },
          { semester: 'Semester 5', tuitionFee: 10500, examFee: 1200, miscFee: 700 },
          { semester: 'Semester 6', tuitionFee: 10500, examFee: 1200, miscFee: 700 },
        ],
      },
      {
        id: 'bscit',
        name: 'B.Sc IT',
        fullName: 'Bachelor of Science in Information Technology',
        duration: '3 Years',
        semesters: 6,
        description:
          'A science-based IT program merging technology fundamentals with emerging tools like cloud computing, AI, and cybersecurity.',
        benefits: [
          'Advanced coursework in Networking, Cloud, and Cybersecurity',
          'Hands-on labs with Linux, AWS, and Azure environments',
          'Industry certification preparation (CompTIA, Cisco basics)',
          'Final-year project with real-world problem solving',
          'Strong focus on employability and technical interview skills',
          'Bridge course to MCA and IT management programs',
        ],
        fees: [
          { semester: 'Semester 1', tuitionFee: 13000, examFee: 1200, miscFee: 800 },
          { semester: 'Semester 2', tuitionFee: 13000, examFee: 1200, miscFee: 800 },
          { semester: 'Semester 3', tuitionFee: 14000, examFee: 1300, miscFee: 800 },
          { semester: 'Semester 4', tuitionFee: 14000, examFee: 1300, miscFee: 800 },
          { semester: 'Semester 5', tuitionFee: 16000, examFee: 1500, miscFee: 1000 },
          { semester: 'Semester 6', tuitionFee: 16000, examFee: 1500, miscFee: 1000 },
        ],
      },
    ],
  },

  // ─── MASTER'S ─────────────────────────────────────────────────────────────
  {
    id: 'masters',
    label: "Master's Degrees",
    shortLabel: "Master's",
    path: '/programs/masters',
    tagline: 'Advance your expertise with our 2-year postgraduate programs.',
    programs: [
      {
        id: 'mca',
        name: 'MCA',
        fullName: 'Master of Computer Applications',
        duration: '2 Years',
        semesters: 4,
        description:
          'An advanced computing program for deep expertise in software engineering, AI, and enterprise systems development.',
        benefits: [
          'Specialisations in AI/ML, Cloud Computing, and Cybersecurity',
          'Advanced software development and architecture projects',
          'Industry collaboration for live project experience',
          'Research-oriented curriculum with seminars and publications',
          'Excellent placement support with MNC and startup hiring drives',
          'Clear bridge pathway to PhD in Computer Science',
        ],
        fees: [
          { semester: 'Semester 1', tuitionFee: 22000, examFee: 1800, miscFee: 1200 },
          { semester: 'Semester 2', tuitionFee: 22000, examFee: 1800, miscFee: 1200 },
          { semester: 'Semester 3', tuitionFee: 25000, examFee: 2000, miscFee: 1500 },
          { semester: 'Semester 4', tuitionFee: 25000, examFee: 2000, miscFee: 1500 },
        ],
        popular: true,
      },
      {
        id: 'mba',
        name: 'MBA',
        fullName: 'Master of Business Administration',
        duration: '2 Years',
        semesters: 4,
        description:
          'A premier management program developing strategic thinkers and business leaders through real-world case studies and industry mentorship.',
        benefits: [
          'Dual specialisations: Finance, Marketing, HR, or Operations',
          'Mandatory corporate internship after the first year',
          'Business simulation labs and leadership workshops',
          'International case studies and cross-cultural management',
          'Campus recruitment drives with top corporates and startups',
          'Alumni mentorship with senior industry executives',
        ],
        fees: [
          { semester: 'Semester 1', tuitionFee: 28000, examFee: 2000, miscFee: 1500 },
          { semester: 'Semester 2', tuitionFee: 28000, examFee: 2000, miscFee: 1500 },
          { semester: 'Semester 3', tuitionFee: 32000, examFee: 2200, miscFee: 1800 },
          { semester: 'Semester 4', tuitionFee: 32000, examFee: 2200, miscFee: 1800 },
        ],
      },
      {
        id: 'ma',
        name: 'MA',
        fullName: 'Master of Arts',
        duration: '2 Years',
        semesters: 4,
        description:
          'A research-intensive postgraduate program for in-depth exploration of humanities, social sciences, and cultural studies.',
        benefits: [
          'Advanced research methodology and thesis writing guidance',
          'Specialisations in History, Sociology, or Political Science',
          'Access to well-stocked library and digital archives',
          'Academic publishing and conference participation support',
          'Preparation for UGC-NET and competitive examinations',
          'Gateway to teaching, journalism, and policy careers',
        ],
        fees: [
          { semester: 'Semester 1', tuitionFee: 11000, examFee: 1500, miscFee: 700 },
          { semester: 'Semester 2', tuitionFee: 11000, examFee: 1500, miscFee: 700 },
          { semester: 'Semester 3', tuitionFee: 12000, examFee: 1500, miscFee: 800 },
          { semester: 'Semester 4', tuitionFee: 12000, examFee: 1500, miscFee: 800 },
        ],
      },
      {
        id: 'mcom',
        name: 'M.Com',
        fullName: 'Master of Commerce',
        duration: '2 Years',
        semesters: 4,
        description:
          'Advanced commerce education focusing on financial markets, business law, and research to create expert analysts and finance professionals.',
        benefits: [
          'Advanced Accountancy, Business Finance, and Tax Planning',
          'Research-oriented curriculum with compulsory dissertation',
          'Preparation for UGC-NET and teaching careers',
          'Bridge to CA Final, CMA Final, and CS professional routes',
          'Financial modelling and data analysis workshops',
          'Strong industry connect for internships and placements',
        ],
        fees: [
          { semester: 'Semester 1', tuitionFee: 14000, examFee: 1500, miscFee: 800 },
          { semester: 'Semester 2', tuitionFee: 14000, examFee: 1500, miscFee: 800 },
          { semester: 'Semester 3', tuitionFee: 15500, examFee: 1600, miscFee: 900 },
          { semester: 'Semester 4', tuitionFee: 15500, examFee: 1600, miscFee: 900 },
        ],
      },
    ],
  },

  // ─── PhD ──────────────────────────────────────────────────────────────────
  {
    id: 'phd',
    label: 'PhD Programs',
    shortLabel: 'PhD',
    path: '/programs/phd',
    tagline: 'Pursue original research and advance the frontiers of knowledge.',
    programs: [
      {
        id: 'phd-cs',
        name: 'PhD – CS',
        fullName: 'Doctor of Philosophy in Computer Science',
        duration: '3 Years',
        semesters: 6,
        description:
          'A rigorous research degree for scholars who wish to push the boundaries of computer science through original, peer-reviewed contributions.',
        benefits: [
          'Research guidance from experienced faculty supervisors',
          'Access to high-performance computing resources and research labs',
          'Funding opportunities and research fellowship programs',
          'Publication support in international peer-reviewed journals',
          'Collaboration with industry R&D centres and institutions',
          'Teaching assistantship opportunities during the program',
        ],
        fees: [
          { semester: 'Year 1 – Sem 1', tuitionFee: 20000, examFee: 2000, miscFee: 1500 },
          { semester: 'Year 1 – Sem 2', tuitionFee: 20000, examFee: 2000, miscFee: 1500 },
          { semester: 'Year 2 – Sem 3', tuitionFee: 22000, examFee: 2000, miscFee: 1500 },
          { semester: 'Year 2 – Sem 4', tuitionFee: 22000, examFee: 2000, miscFee: 1500 },
          { semester: 'Year 3 – Sem 5', tuitionFee: 20000, examFee: 2000, miscFee: 1000 },
          { semester: 'Year 3 – Sem 6', tuitionFee: 20000, examFee: 2000, miscFee: 1000 },
        ],
        popular: true,
      },
      {
        id: 'phd-mgmt',
        name: 'PhD – Mgmt',
        fullName: 'Doctor of Philosophy in Management',
        duration: '3 Years',
        semesters: 6,
        description:
          'An interdisciplinary management research program for future academics, consultants, and policy makers with a passion for organisational studies.',
        benefits: [
          'Interdisciplinary research at the intersection of business and society',
          'Access to extensive management case study databases',
          'Mentorship by faculty with both industry and academia experience',
          'Networking with corporate research divisions',
          'Preparation for academic roles in universities and B-schools',
          'Support for attending national and international conferences',
        ],
        fees: [
          { semester: 'Year 1 – Sem 1', tuitionFee: 22000, examFee: 2000, miscFee: 1500 },
          { semester: 'Year 1 – Sem 2', tuitionFee: 22000, examFee: 2000, miscFee: 1500 },
          { semester: 'Year 2 – Sem 3', tuitionFee: 24000, examFee: 2000, miscFee: 1500 },
          { semester: 'Year 2 – Sem 4', tuitionFee: 24000, examFee: 2000, miscFee: 1500 },
          { semester: 'Year 3 – Sem 5', tuitionFee: 22000, examFee: 2000, miscFee: 1000 },
          { semester: 'Year 3 – Sem 6', tuitionFee: 22000, examFee: 2000, miscFee: 1000 },
        ],
      },
      {
        id: 'phd-edu',
        name: 'PhD – Education',
        fullName: 'Doctor of Philosophy in Education',
        duration: '3 Years',
        semesters: 6,
        description:
          'A comprehensive research degree in educational theory, policy, and practice aimed at transforming learning environments at scale.',
        benefits: [
          'Advanced research in pedagogy, curriculum design, and assessment',
          'Policy-level discussions with education department officials',
          'Opportunities to design and implement educational interventions',
          'Field research access to primary and secondary schools',
          'Workshops on quantitative and qualitative research methods',
          'Career pathways in academia, education policy, and ed-tech',
        ],
        fees: [
          { semester: 'Year 1 – Sem 1', tuitionFee: 18000, examFee: 1800, miscFee: 1200 },
          { semester: 'Year 1 – Sem 2', tuitionFee: 18000, examFee: 1800, miscFee: 1200 },
          { semester: 'Year 2 – Sem 3', tuitionFee: 20000, examFee: 1800, miscFee: 1200 },
          { semester: 'Year 2 – Sem 4', tuitionFee: 20000, examFee: 1800, miscFee: 1200 },
          { semester: 'Year 3 – Sem 5', tuitionFee: 18000, examFee: 1800, miscFee: 1000 },
          { semester: 'Year 3 – Sem 6', tuitionFee: 18000, examFee: 1800, miscFee: 1000 },
        ],
      },
    ],
  },
];

// git config --global user.name "Paras Mahajan"
// git config --global user.email "aparasmahajan@gmail.com"
