export const en = {
  navigation: {
    about: "About me",
    work: "Work",
    entrepreneurial: "Entrepreneurial",
    education: "Education",
    projects: "Projects",
    publications: "Publications",
    skills: "Skills",
    contact: "Contact",
  },
  hero: {
    name: "Jishnu Sai Matra",
    wordmark: "Jishnuuu.",
    lines: [
      "Hey! :)",
      "I'm Jishnu, I bring engineering, design,",
      "and curiosity together to turn ideas",
      "into products people love.",
    ],
    photoAlt: "Jishnu Sai Matra",
    pill: "thinks like an engineer, sees like a designer",
    meaning:
      "Jishnu (Sanskrit: जिष्णु, Telugu: జిష్ణు) is a traditional Sanskrit name meaning triumphant, victorious, or one whose nature is to win. In the Mahabharata, it is an epithet of Arjuna, the warrior who could not be defeated, and of Indra, the unconquerable king of the gods. The name carries the idea of someone born to prevail — unyielding, unconquerable, and never easily suppressed.",
    tagline: "Product Builder × Data Analyst × Strategic Thinker",
    description:
      "MBA in Business Analytics student who codes, launches products, and turns data into decisions. Engineering background, entrepreneurial mindset, business acumen.",
  },
  built: {
    label: "Things I've built",
    intro: "Everything I build starts the same way.",
    introEnd: "Here's how that played out in a few of them.",
    seeMore: "See more projects",
    seeLess: "Show fewer",
    process: [
      {
        step: "01",
        title: "Dig in",
        body: "Get into the market. Understand the space, the people stuck in it, and why.",
      },
      {
        step: "02",
        title: "Find the gap",
        body: "Not a feature idea. A real problem worth solving.",
      },
      {
        step: "03",
        title: "Prove it's worth it",
        body: "Why this should exist despite the competition. How it survives and thrives.",
      },
      {
        step: "04",
        title: "Form a philosophy",
        body: "Before design, before prototyping, a simple belief. An identity for the product, how it should feel, what it stands for.",
      },
      {
        step: "05",
        title: "Let it drive strategy",
        body: "That philosophy becomes the filter. Every call gets easier from here.",
      },
      {
        step: "06",
        title: "Build",
        body: "Design and features follow the philosophy, shaped by understanding human behaviour.",
      },
    ],
    beats: {
      gap: "The gap",
      philosophy: "The philosophy",
      became: "What it became",
      next: "What's next",
    },
    projects: [
      {
        id: "2read",
        name: "2Read",
        dot: true,
        meta: "iOS & Android · ~2,800 users",
        badges: [
          {
            src: "/badges/ph-product-of-the-week.png",
            alt: "Product Hunt — Product of the Week, #3 in Productivity",
          },
          {
            src: "/badges/ph-product-of-the-day.png",
            alt: "Product Hunt — Product of the Day, #4",
          },
        ],
        gap: "The competitors are all built like infrastructure. A database for your Kindle highlights with a chatbot bolted on the side. Clinical, functional, and joyless. They treat your highlights as data to store, not something to experience.",
        philosophy:
          "Your Kindle highlights deserve better than a spreadsheet. The whole thing should be experience first, beautiful to move through, with intelligence woven into every stage instead of parked in a chatbot you have to go ask. Design leads, AI supports quietly, everywhere.",
        became:
          "An app that captures your Kindle highlights — sideloaded documents included, which nothing else on mobile does — and returns them through a genuinely beautiful, swipeable experience. Daily reviews, connections drawn across books, intelligence at each step rather than one chatbot doing all the work.",
        next: "Rebuilding it now: new strategy, design refinements, stronger AI use cases, and pricing. Less about shipping features, more about building a real identity around the product.",
        links: [
          { label: "Live app", href: "https://www.2read.app/" },
          { label: "New build (in dev)", href: "https://2-read-web-26.vercel.app/" },
        ],
      },
      {
        id: "pangolin",
        name: "Pangolin",
        meta: "Tracking, with analytics underneath",
        gap: "Every tracking app looks like a spreadsheet wearing a costume. Clinical, cold, faintly guilt inducing. Tracking is supposed to help you understand yourself, but most tools make it feel like data entry for a doctor you don't like.",
        philosophy:
          "If you're going to look at your own life every day, it should be something you actually want to look at. Warm, illustrated, human. The insight should come to you, not sit buried in a chart you have to interpret.",
        became:
          "A tracker with a soft, illustrated design and a calendar grid view, that quietly turns your own data into patterns and correlations worth noticing. A tracking app on the surface, a small data analytics project underneath.",
        links: [{ label: "Try it", href: "https://pangolin-three.vercel.app/" }],
      },
      {
        id: "doit",
        name: "Do-it",
        meta: "A to-do list that emails like a friend",
        gap: "To-do apps have gone one of two ways. Either they're bloated with features nobody asked for, or they're so clinical they feel like a punishment. Neither actually helps you decide what matters today.",
        philosophy:
          "A to-do list should feel less like a manager and more like a friend who's got your back. Fewer features, more warmth, and a little help figuring out what's actually worth doing.",
        became:
          "A deliberately simple to-do app that emails your reminders in the voice of a friend and nudges you toward the handful of tasks that matter that day, instead of drowning you in the full list.",
        links: [{ label: "Try it", href: "https://doit-ten-flax.vercel.app/" }],
      },
      {
        id: "zwicky",
        name: "Zwicky Box",
        meta: "AI-assisted structured ideation",
        gap: "Ideation tools are either blank canvases or generators that hand you a list and call it creativity. Both leave you with the same obvious answers, because neither changes how you're actually thinking. Ask ten people to solve one problem and you get the same five ideas.",
        philosophy:
          "Creativity isn't a spark, it's a structure. Force the mind through combinations it would never reach on its own and the interesting ideas fall out by themselves. The tool's job is to hold the structure honestly — and let AI do the legwork so the method doesn't feel like homework.",
        became:
          "A thinking tool built on Fritz Zwicky's 1943 morphological analysis, the method he used to work through jet engine designs and classify galaxies. You break a problem into categories, fill each with options, then combine across them to reach ideas you wouldn't have landed on alone. AI proposes the categories and fills the gaps.",
        links: [{ label: "Try it", href: "https://zwicky-box.vercel.app/" }],
      },
    ],
  },
  toolkit: {
    label: "The toolkit",
    heading: "A mix of disciplines",
    description:
      "Product, design, engineering, research, data, and the tools that connect them.",
    centerLabel: "Capability Map",
    hint: "A map of the things I know, use, and keep learning.",
    hintPinned: "Hover any node for its description.",
    clusters: [
      {
        id: "data",
        label: "Data & Analytics",
        color: "#179150",
        angle: 45,
        blurb: "Turning messy inputs into decisions people can act on.",
        items: [
          "Excel",
          "Power BI",
          "SQL",
          "Python",
          "R",
          "Machine Learning",
          "Product analytics (Mixpanel)",
        ],
      },
      {
        id: "product",
        label: "Product & Process",
        color: "#4C5FD5",
        angle: -90,
        blurb: "Deciding what to build, and keeping the build honest.",
        items: [
          "Product Requirements",
          "UI/UX Analysis",
          "Agile / Scrum",
          "SaaS Product Design",
          "Market Research",
        ],
      },
      {
        id: "engineering",
        label: "Engineering",
        color: "#2F6FB5",
        angle: -45,
        blurb: "Enough craft to build the thing myself, and ship it.",
        items: [
          "React",
          "Angular",
          "TypeScript",
          "Node.js",
          "Supabase",
          "REST APIs",
          "MCP",
          "Agentic Workflows",
        ],
      },
      {
        id: "design",
        label: "Design & Prototyping",
        color: "#7A4FD1",
        angle: 135,
        blurb: "How it looks, how it moves, and whether it actually works.",
        items: [
          "Figma",
          "Adobe Illustrator",
          "Wireframing",
          "Prototyping",
          "Usability Testing",
        ],
      },
      {
        id: "tools",
        label: "Tools & Platforms",
        color: "#C8842A",
        angle: 90,
        blurb: "The day-to-day machinery of getting work done.",
        items: [
          "Notion",
          "Jira",
          "Confluence",
          "SAP (basic)",
          "RStudio",
          "Office 365",
        ],
      },
      {
        id: "ai",
        label: "AI Stack",
        color: "#1F8A8F",
        angle: 0,
        blurb: "What I actually reach for, most days.",
        items: [
          "Claude · Claude Code",
          "ChatGPT · Gemini",
          "Cursor · Codex",
          "Figma AI · Stitch",
          "Lovable · Base44 · Floot",
          "Perplexity",
          "Midjourney · Runway",
          "Julius",
          "n8n · Zapier · Make",
        ],
      },
      {
        id: "credentials",
        label: "Credentials",
        color: "#C2455E",
        angle: 180,
        blurb: "Formal learning, mostly where product meets AI and analysis.",
        items: [
          "AI Product Management — Duke",
          "AI Fluency — Anthropic",
          "Claude Code in Action — Anthropic",
          "Statistics for Data Science — Udemy",
          "Business Analysis — Microsoft",
          "Strategic Management — CBS",
          "Value Investing — Wealthy Education",
          "Meta Ads for eCommerce — Udemy",
          "Ethical Hacking — z Security",
        ],
      },
      {
        id: "research",
        label: "Research",
        color: "#5A6472",
        angle: -135,
        blurb: "Two peer-reviewed conference papers.",
        items: [
          {
            label:
              "An Ensemble of Light Gradient Boosting Machine and Adaptive Boosting for Prediction of Type-2 Diabetes",
            blurb: "Springer Conference Paper | February 2023",
          },
          {
            label: "IoT-Based Automated Toll Gate Collection System",
            blurb: "WCASET Conference Paper | February 2020",
          },
        ],
      },
      {
        id: "thesis",
        label: "MBA Thesis",
        color: "#8A6A2F",
        angle: -160,
        blurb:
          "Investments in R&D and Innovation Strategies in the German Automotive Industry.",
        items: [
          "Investments in R&D and Innovation Strategies in the German Automotive Industry",
        ],
      },
      {
        id: "education",
        label: "Education",
        color: "#8E2F8E",
        angle: -160,
        blurb: "Where the engineering half and the business half came from.",
        items: [
          {
            label: "MBA, Business Administration",
            blurb:
              "Hochschule Fresenius University of Applied Sciences, Köln, DE",
            items: [
              "Business Analytics",
              "Market Research",
              "Strategy",
              "Leadership",
              "Data-Driven Decision Making",
            ],
          },
          {
            label: "B.Tech, Electrical & Electronics",
            blurb: "Sikkim Manipal Institute of Technology, Sikkim, India",
            items: [
              {
                label: "Leadership: Joint Secretary",
                blurb: "Joint Secretary, Electrical Department",
              },
              {
                label: "Engineering Projects",
                blurb: "Six builds from the engineering years.",
                items: [
                  {
                    label: "Home Automation System",
                    blurb:
                      "Built a smart home system to remotely control lights, fans, and appliances.",
                  },
                  {
                    label: "Custom Powerbank",
                    blurb:
                      "Designed and built a custom powerbank, including PCB layout and battery management.",
                  },
                  {
                    label: "Robotic Arm",
                    blurb:
                      "Built and programmed a multi-degree-of-freedom robotic arm for precise object handling.",
                  },
                  {
                    label: "SoundBeam",
                    blurb:
                      "Built a directional speaker using ultrasonic waves to project focused sound.",
                  },
                  {
                    label: "RC Drone",
                    blurb:
                      "Designed and built an RC drone from scratch, including the frame, motors, and flight controller.",
                  },
                  {
                    label: "Transformer Simulations",
                    blurb:
                      "Simulated transformer designs in Maxwell to study and optimize electromagnetic behavior.",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  next: {
    label: "The next thing",
    lineOne: "Engineering taught me to make things work.",
    lineTwo: "Business taught me to understand why they should exist.",
    lineThree: "Building taught me to bring the two together.",
    lineFour:
      "I thrive at the intersection of technology and strategy, bridging the gap between development and business to create impactful solutions.",
    pill: "nice people devLOVEping ideas",
    statement: "Let's make something worth building.",
    note: "I like curious minds, ambitious ideas, and the space between “what if?” and “why not?”",
  },
  about: {
    heading: "👋 Hey! I am Jishnu.",
    intro: "✌️ Yo, I'm Jishnu Sai Matra, passionate about building products and...",
    headline: "helping startups and businesses create meaningful digital experiences.",
    bio: "I thrive at the intersection of technology and strategy, bridging the gap between development and business to create impactful solutions.",
    stickers: [
      { label: "Product Builder" },
      { label: "Data Analyst" },
      { label: "Entrepreneur" },
      { label: "Full Stack" },
      { label: "AI Enthusiast" },
    ],
  },
  education: {
    title: "education.",
    headline: "My academic roots.",
    hochschule: {
      name: "Hochschule Fresenius",
      degree: "MBA in Business Administration, specialised in Business Analytics",
      years: "2025 - 2026",
      location: "Köln, Germany",
    },
    smit: {
      name: "Sikkim Manipal Institute of Technology",
      degree: "B.Tech in Electrical & Electronics Engineering",
      years: "2017 - 2021",
      location: "Sikkim, India",
    },
  },
  work: {
    title: "work experience.",
    headline: "where I've worked.",
    tcs: {
      role: "Assistant System Engineer",
      duration: "Jan 2022 - Apr 2023",
      companyName: "TCS",
      aboutTitle: "About TCS",
      about: "IT services, consulting and business solutions organization partnering with the world's largest businesses.",
      missionTitle: "Mission",
      mission: "Help customers achieve business objectives by providing innovative, best-in-class consulting and IT solutions.",
      keyAchievementTitle: "Key Achievement",
      keyAchievement: "Built internal tools used by thousands",
      narrativeTitle: "My Experience",
      narrative: "This is where I learned to build at scale. Created internal tools used by thousands—a smart chatbot that cut support tickets by 35%, and an ML-powered search engine that transformed IP discovery. Working with enterprise-level systems taught me the importance of scalability, testing, and clean architecture.",
      metric1Number: "40%",
      metric1Label: "Improved Scalability",
      metric2Number: "35%",
      metric2Label: "Fewer Support Tickets",
      metric3Number: "25%",
      metric3Label: "Faster Sprint Delivery",
      skills: ["Angular", "Python", "TypeScript", "Agile", "ML", "Figma"],
    },

    ohm: {
      role: "Business Development Intern",
      duration: "Aug 2023 - Apr 2024",
      companyName: "Ohm Material Handling Solutions",
      location: "Bangalore, India",
      aboutTitle: "About Ohms",
      about: "Preventive maintenance & construction equipment rental service providing cost-effective machinery solutions to 200+ small and medium builders across South India.",
      coreValuesTitle: "Core Values",
      coreValues: "Efficiency in operations. Data-driven decisions. Customer success focus.",
      keyAchievementTitle: "Key Achievement",
      keyAchievement: "Turned messy spreadsheets into insights",
      narrativeTitle: "My Journey",
      narrative: "Turned messy spreadsheets into insights. Learned that great analysis means nothing if you can't explain it to someone covered in concrete dust. Built dashboards, managed client relations, and discovered the power of making data accessible to everyone.",
      metric1Number: "200+",
      metric1Label: "Active Builders",
      metric2Number: "10+",
      metric2Label: "Dashboards Built",
      metric3Number: "30%",
      metric3Label: "Efficiency Gain",
      skills: ["Power BI", "Excel", "Data Analysis", "Client Relations", "SQL"],
    },

    smit: {
      role: "Joint Secretary, Electrical Dept",
      duration: "2019 - 2021",
      companyName: "SMIT",
      location: "Sikkim, India",
      aboutTitle: "About SMIT",
      about: "Sikkim Manipal Institute of Technology - premier technical institution fostering innovation and leadership among students.",
      leadershipTitle: "Leadership Lessons",
      leadership: "Influence without authority. Building consensus. Budget management. Event coordination.",
      keyAchievementTitle: "Key Achievement",
      keyAchievement: "First real taste of leadership",
      narrativeTitle: "The Experience",
      narrative: "Chaotic but invaluable. This role taught me that leadership isn't about having a title—it's about earning trust, solving problems, and getting people excited about a shared vision. From technical symposiums to cultural events, every challenge was a lesson in project management and people skills.",
      metric1Number: "20+",
      metric1Label: "Events Organized",
      metric2Number: "200+",
      metric2Label: "Students Impacted",
      metric3Number: "100%",
      metric3Label: "Team Engagement",
      skills: ["Leadership", "Event Planning", "Team Management", "Budget Management", "Communication"],
    },
    hal: {
      role: "Summer Trainee",
      duration: "May - June 2019",
      companyName: "HAL",
      location: "Bangalore, India",
      aboutTitle: "About HAL",
      about: "India's state-owned aerospace and defense company, a key player in the nation's security and technological advancement.",
      missionTitle: "Mission",
      mission: "To become a global player in the aerospace industry through design, development, and manufacturing.",
      keyLearningTitle: "Key Learning",
      keyLearning: "Gained foundational knowledge in helicopter manufacturing, assembly, and testing processes.",
      keyAchievement: "Gained foundational knowledge in helicopter manufacturing, assembly, and testing processes.",
      narrativeTitle: "My Experience",
      narrative: "My first real-world engineering experience. I was immersed in the complex world of aerospace, observing the manufacturing, assembly, and testing of helicopters. I contributed by documenting key processes, which taught me the importance of precision and detail in a high-stakes environment.",
      metric1Number: "2 Months",
      metric1Label: "Intensive Training",
      metric2Number: "Hands-On",
      metric2Label: "Experience",
      metric3Number: "Aero",
      metric3Label: "Helicopter Division",
      skills: ["Manufacturing", "Documentation", "Aerospace", "Assembly", "Testing"],
    },
  },
  projects: {
    title: "projects.",
    headline: "Ideas I've shipped.",
    personalTitle: "Personal Projects",
    engineeringTitle: "Engineering Projects",
    personal: [
      {
        title: "2Read",
        description: "An AI reading companion that doesn't just summarize—it actually makes you think. Hit #4 on Product Hunt and now helps 2,000+ people read smarter, not harder. Turns out, people really do want to understand what they're reading.",
        tags: ["React", "AI", "Mobile Application"],
        actionButton: { label: "Know More", href: "https://www.2read.app/" },
      },
      {
        title: "Life's Archive",
        description: "Not your usual journal app — two ways to capture life: Daily Poetry turns your thoughts into art, from Bukowski's grit to Rupi Kaur's warmth, while Life Stories saves your bigger moments with photos and detail. Together, they make your life both art and memory.",
        tags: ["Design", "Ideation", "Vibe Code"],
        actionButton: { label: "Try Out!", href: "https://lifesarchive.floot.app/" },
      },
      {
        title: "Issue51.shop",
        description: "My crash course in e-commerce reality. Launched an internet-meme-inspired clothing brand, learned that cool designs don't sell themselves, and discovered marketing is way harder than building websites. Lasted 4 months. Worth every lesson.",
        tags: ["E-commerce", "Marketing", "Fashion"],
      },
    ],
    engineering: [
      {
        title: "Home Automation System",
        description: "Built a smart home automation system during college that could control lights, fans, and appliances remotely. It was my first real dive into IoT and embedded systems—lots of late nights debugging circuits and code.",
        tags: ["C++", "Electronics", "PCB Design"],
      },
      {
        title: "Custom Powerbank",
        description: "Designed and built a custom powerbank from scratch—PCB layout, battery management, the whole deal. Learned that designing something people use every day requires balancing capacity, safety, and size perfectly.",
        tags: ["PCB Design", "Electronics", "Hardware"],
      },
      {
        title: "Robotic Arm",
        description: "Built a programmable robotic arm with multiple degrees of freedom. Watching it pick up objects precisely after weeks of calibration was incredibly satisfying. Still one of my favorite college projects.",
        tags: ["C++", "Electronics", "Mechanical"],
      },
      {
        title: "SoundBeam",
        description: "A directional speaker that projects sound in a focused beam using ultrasonic waves—basically audio that only you can hear when standing in the right spot. One of those projects that sounds like sci-fi but is totally doable with the right equipment.",
        tags: ["Electronics", "Acoustics", "Engineering"],
      },
      {
        title: "RC Drone",
        description: "Built a remote-controlled drone from scratch—frame, motors, flight controller, everything. The first successful flight (after several crashes) made all the troubleshooting worth it.",
        tags: ["C++", "Electronics", "Aerodynamics"],
      },
      {
        title: "Transformer Simulations",
        description: "Built and simulated transformer designs in Maxwell software to understand electromagnetic behavior. Learned that simulation software can save you from a lot of expensive mistakes in the real world.",
        tags: ["Maxwell Software", "Electrical", "Simulation"],
      },
    ],
  },
  publications: {
    title: "publications.",
    headline: "Research I've contributed to.",
    buttonLabel: "Read Paper",
    items: [
      {
        title: "Type-2 Diabetes Prediction Using Ensemble Machine Learning",
        venue: "Springer Conference • February 2023",
        description: "Developed an ensemble machine learning model combining multiple algorithms for improved Type-2 diabetes prediction accuracy.",
        link: "https://link.springer.com/article/10.1007/s44196-023-00184-y",
      },
      {
        title: "IoT-Based Automated Toll Collection System",
        venue: "WCASET Conference • February 2020",
        description: "Designed an IoT solution for automated toll collection to reduce traffic congestion. My first published work exploring connected devices.",
        link: "https://wcaset.com/thailand/previous-conference-proceedings",
      },
    ],
  },
  skills: {
    title: "💻 my expertise.",
    intro: "when i'm not building products or analyzing data...",
headline: "you'll catch me doing a combo of these things:",
card1: {
title: "things I do",
      items: [
        "Business Analytics",
        "Data Analytics",
        "Product Design (SaaS)",
        "Agile Project Management"
      ]
    },
    andMore: "and more",
card2: {
title: "for products in",
items: [
"IT Services & Consulting",
"EdTech & Consumer Apps",
"Construction & B2B",
"Fashion & E-commerce",
"Aerospace & Manufacturing"
]
},
card3: {
title: "using tools like",
items: [
"Python, R, SQL, n8n",
"Angular, Vue.js, TypeScript",
"Excel, PowerBI, SAP",
"Figma, RStudio",
"MS Word, PowerPoint",
"React Native, Shopify"
]
}
  },
  contact: {
    title: "Get in Touch.",
    heading: "Let's Build Something Together",
    description: "Open to opportunities in Business Analytics, Product Management, and Strategy. Want to build your own personal website? Let's connect!",
    location: "Based in Köln, DE",
    emailButton: "Get in Touch",
    linkedinButton: "LinkedIn",
    instagramButton: "Instagram",
    substackButton: "Substack",
    xButton: "X",
    metaDescription: "Get in touch with Jishnu Sai Matra. Connect via email, LinkedIn, or download my resume.",
  },
  buttons: {
    resume: "Resume",
    seeMyWork: "See My Work",
    contactMe: "Contact Me",
  },
  footer: {
    name: "Jishnu Sai Matra",
    rights: "© 2026",
    email: "jishnu.matra@gmail.com",
    copy: "copy",
    copied: "copied",
    socials: [
      { label: "Instagram", href: "https://www.instagram.com/1truejishnu/" },
      { label: "X", href: "https://x.com/1TrueJishnu" },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/jishnu-sai-m-264115230/",
      },
      { label: "Github", href: "https://github.com/randomoranges" },
    ],
  },
};