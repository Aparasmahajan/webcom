export const navigationItems = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Check Certificate', path: '/check-certificate' },
  { 
    label: 'Our Programs', 
    path: '/programs',
    dropdown: [
      { label: 'Bachelor’s Degrees', path: '/programs/bachelors' }
    ]
  },
  { label: 'Contact Us', path: '/contact' }
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
  ]
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
  { id:3, certificate_number: "12882", name: "Mahajan", father_name:"Mahajan", duration: "6 month", join_date: "02-01-2024",complete_date: "02-01-2024", course: "Data Science", issued: "2025-03-10" }
];


// git config --global user.name "Paras Mahajan"
// git config --global user.email "aparasmahajan@gmail.com"