export type Operation = {
  slug: string;
  category: string;
  title: string;
  headline: string;
  accent: string;
  intro: string;
  image: string;
  imagePosition: string;
  imageAlt: string;
  caption: string;
  overviewHeading: string;
  overview: string;
  focus: { title: string; text: string }[];
  journey: { title: string; heading: string; text: string; points: string[] }[];
  questions: string[];
  inquirySubject: string;
};

export const operations: Operation[] = [
  {
    slug: "mining",
    category: "MINING & DEVELOPMENT",
    title: "Jonnagiri Gold Project",
    headline: "Rooted in the resource.",
    accent: "Focused on the future.",
    intro:
      "Mining connects geological understanding with work on the ground. Discover the considerations that shape the journey from a mineral resource to a thoughtfully developed operation.",
    image: "/images/hero-mine.webp",
    imagePosition: "center 65%",
    imageAlt: "Illustrative terraced gold mine in a wooded landscape",
    caption: "A perspective on the mining landscape",
    overviewHeading: "A resource is only the beginning.",
    overview:
      "The Jonnagiri Gold Project in Andhra Pradesh brings a focus to Geo Mysore’s mining story. Understanding a deposit is one part of a larger picture that includes engineering, people, the surrounding environment, and the next stage of processing.",
    focus: [
      {
        title: "Geological understanding",
        text: "A clear view of the deposit informs the questions, studies, and decisions that follow.",
      },
      {
        title: "Considered development",
        text: "Planning connects resource knowledge with technical studies and the practicalities of working on the ground.",
      },
      {
        title: "A connected operation",
        text: "Mining and processing work together. Understanding the material helps inform the next stage of the journey.",
      },
    ],
    journey: [
      {
        title: "Understand",
        heading: "Start with the geology.",
        text: "Every deposit has its own character. Geological interpretation builds a picture of the resource and the uncertainties that need further study.",
        points: [
          "Deposit characteristics",
          "Geological interpretation",
          "Resource knowledge",
        ],
      },
      {
        title: "Plan",
        heading: "Bring the whole picture together.",
        text: "A development plan considers the resource alongside engineering requirements, land, people, and the wider environment.",
        points: [
          "Technical evaluation",
          "Environmental considerations",
          "Development planning",
        ],
      },
      {
        title: "Operate",
        heading: "Connect planning with practice.",
        text: "A mining operation depends on coordinated people, equipment, and information. Safe working practices and operating discipline matter throughout.",
        points: [
          "People and equipment",
          "Material handling",
          "Operating discipline",
        ],
      },
      {
        title: "Connect",
        heading: "Think beyond extraction.",
        text: "The characteristics of mined material influence how it is handled and processed. Considering the next stage supports a more connected view of the operation.",
        points: [
          "Ore characteristics",
          "Processing requirements",
          "Long-term perspective",
        ],
      },
    ],
    questions: [
      "Current project development status",
      "Geology and project information",
      "Business and technical inquiries",
    ],
    inquirySubject: "Project information",
  },
  {
    slug: "gold-processing",
    category: "GOLD PROCESSING",
    title: "Gold Processing Plant",
    headline: "The next stage.",
    accent: "A deeper kind of value.",
    intro:
      "The story continues beyond the mine. Gold processing brings mineral knowledge and engineering together to prepare ore, recover its value, and understand performance at every stage.",
    image: "/images/processing-plant.webp",
    imagePosition: "center",
    imageAlt:
      "Illustrative gold processing plant with steel tanks, conveyors, and yellow-railed walkways",
    caption: "A perspective on gold processing infrastructure",
    overviewHeading: "Where potential meets process.",
    overview:
      "Processing is a core part of Geo Mysore’s business. The right processing approach depends on the ore: its mineralogy, physical characteristics, and how the gold occurs within it. From preparation to recovery and control, each stage informs the next.",
    focus: [
      {
        title: "Ore preparation",
        text: "Preparing mined material for subsequent recovery stages, with the characteristics of the feed in mind.",
      },
      {
        title: "Mineral recovery",
        text: "Connecting knowledge of the ore with the engineering needed to recover the value it holds.",
      },
      {
        title: "Process control",
        text: "Using sampling, monitoring, and technical interpretation to understand operating performance.",
      },
    ],
    journey: [
      {
        title: "Characterise",
        heading: "First, understand the feed.",
        text: "Mineralogy, grade, and physical characteristics influence the processing route. Testwork and feed characterisation help establish the questions a process must address.",
        points: [
          "Ore mineralogy",
          "Feed characteristics",
          "Testwork and evaluation",
        ],
      },
      {
        title: "Prepare",
        heading: "Prepare for what comes next.",
        text: "Ore preparation can include crushing, milling, and material handling. The purpose is to bring the material into a form suited to the selected recovery process.",
        points: ["Size reduction", "Material handling", "Feed preparation"],
      },
      {
        title: "Recover",
        heading: "Bring mineral potential into focus.",
        text: "Gold recovery methods depend on how gold occurs in the ore. A suitable flowsheet considers mineral response, recovery performance, and the wider operating context.",
        points: [
          "Ore-specific process selection",
          "Recovery performance",
          "Flowsheet considerations",
        ],
      },
      {
        title: "Monitor",
        heading: "Keep learning from the process.",
        text: "Sampling and process information help teams interpret performance. Water, energy, material balances, and operating conditions are important parts of that picture.",
        points: [
          "Sampling and monitoring",
          "Resource use",
          "Process understanding",
        ],
      },
    ],
    questions: [
      "Plant configuration and processing flowsheet",
      "Current capacity and operating information",
      "Technical collaboration and partnerships",
    ],
    inquirySubject: "Gold processing",
  },
  {
    slug: "exploration",
    category: "GEOLOGICAL EXPLORATION",
    title: "Exploration portfolio",
    headline: "Good discoveries begin",
    accent: "with better questions.",
    intro:
      "Look closely. Connect the evidence. Build understanding. Exploration is the process of turning observations about the landscape into a clearer picture of its mineral potential.",
    image: "/images/hero-mine.webp",
    imagePosition: "left 20%",
    imageAlt:
      "Illustrative wooded southern Indian landscape surrounding a mineral exploration area",
    caption: "A perspective on the exploration landscape",
    overviewHeading: "A considered search for possibility.",
    overview:
      "Exploration connects fieldwork with analysis. Mapping, sampling, and geological interpretation inform where to look next and what needs to be understood in more detail. Each stage builds on the evidence gathered before it.",
    focus: [
      {
        title: "Field observations",
        text: "Reading the landscape and recording the geological evidence that provides a starting point.",
      },
      {
        title: "Data and interpretation",
        text: "Connecting observations and analytical information to build and test geological ideas.",
      },
      {
        title: "Evidence-led decisions",
        text: "Using the quality of the evidence to guide further work and identify important uncertainties.",
      },
    ],
    journey: [
      {
        title: "Observe",
        heading: "Read the landscape.",
        text: "Geological mapping and field observations create a starting point. The goal is to understand the setting and identify questions that deserve closer attention.",
        points: ["Geological setting", "Field mapping", "Initial observations"],
      },
      {
        title: "Investigate",
        heading: "Follow the evidence.",
        text: "Sampling and analytical work add detail to the picture. The interpretation depends on the quality, context, and representativeness of the information collected.",
        points: ["Sampling", "Analytical information", "Data quality"],
      },
      {
        title: "Interpret",
        heading: "Connect the pieces.",
        text: "Geological interpretation brings multiple sources of information together. Working hypotheses can then be tested against new observations and results.",
        points: [
          "Geological interpretation",
          "Target understanding",
          "Testing ideas",
        ],
      },
      {
        title: "Evaluate",
        heading: "Ask what comes next.",
        text: "Evaluation considers what is known, what remains uncertain, and whether further investigation is warranted. Exploration is a continuing process of learning.",
        points: ["Evidence review", "Uncertainty", "Next-stage studies"],
      },
    ],
    questions: [
      "Exploration interests and areas of focus",
      "Geological and technical collaboration",
      "Project and partnership discussions",
    ],
    inquirySubject: "Project information",
  },
];
