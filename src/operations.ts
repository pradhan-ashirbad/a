import { contentSources } from "./contentSources";

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
  source: string;
  specifications: { value: string; label: string }[];
  sourceNote: string;
};

export const operations: Operation[] = [
  {
    slug: "mining",
    category: "MINING & DEVELOPMENT",
    title: "Swarnagiri Gold Project",
    headline: "Rooted in the resource.",
    accent: "Focused on the future.",
    intro:
      "The Swarnagiri project in Andhra Pradesh brings exploration, open-pit mining, and gold processing into one connected development. Discover the company’s published mining approach and project setting.",
    image: "/images/hero-mine.webp",
    imagePosition: "center 65%",
    imageAlt:
      "Swarnagiri open-pit mine, photographed on Geomysore’s original website",
    caption: "Swarnagiri project · Company photograph",
    overviewHeading: "A resource is only the beginning.",
    overview:
      "Geomysore’s published mining plan permits 0.4 million tonnes per annum at Swarnagiri. The East Block is planned as an open-pit operation using drilling and blasting. The project is located in Tuggali Mandal, Kurnool District, Andhra Pradesh, with a published mining lease area of 597.82 hectares.",
    focus: [
      {
        title: "Geological understanding",
        text: "The mineralised area is described in four blocks: East, West, South, and North. Detailed work has focused on the East and West Blocks.",
      },
      {
        title: "Considered development",
        text: "The published plan describes 7.5-metre benches, 10-metre working widths, and a six-metre final bench width.",
      },
      {
        title: "A connected operation",
        text: "The company’s development approach connects open-pit mining with an integrated gold processing facility.",
      },
    ],
    journey: [
      {
        title: "Understand",
        heading: "Start with the geology.",
        text: "The Swarnagiri lease sits within the Eastern Dharwar Craton. Gold mineralisation is described mainly in granodiorite, with additional quartz-vein occurrences in metavolcanic rocks.",
        points: [
          "Deposit characteristics",
          "Geological interpretation",
          "Resource knowledge",
        ],
      },
      {
        title: "Plan",
        heading: "Bring the whole picture together.",
        text: "The published East Block mine design uses pit optimisation and selective mining unit models. The mining page describes a permitted mining capacity of 0.4 MTPA, subject to periodic plan renewal.",
        points: [
          "Technical evaluation",
          "Environmental considerations",
          "Development planning",
        ],
      },
      {
        title: "Operate",
        heading: "Connect planning with practice.",
        text: "The East Block plan describes open-pit mining with drilling and blasting, with the pit progressing from north to south. These are published design details, rather than confirmation of today’s operating status.",
        points: [
          "People and equipment",
          "Material handling",
          "Operating discipline",
        ],
      },
      {
        title: "Connect",
        heading: "Think beyond extraction.",
        text: "The project connects mining with ore processing. The published plan also describes planting worked-out benches at the end of mine life, linking extraction with longer-term land management.",
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
    source: contentSources.mining,
    specifications: [
      { value: "0.4 MTPA", label: "Published permitted mining capacity" },
      { value: "597.82 ha", label: "Published mining lease area" },
      { value: "7.5 m", label: "Planned bench height" },
    ],
    sourceNote:
      "Details summarise the published mining plan and geology pages. Capacity is a permitted figure, not evidence of current production.",
  },
  {
    slug: "gold-processing",
    category: "GOLD PROCESSING",
    title: "Gold Processing Plant",
    headline: "The next stage.",
    accent: "A deeper kind of value.",
    intro:
      "The Swarnagiri processing design connects crushing and milling with gravity recovery and carbon-in-leach treatment. The published pilot-plant description documents gravity-recovery operations that informed process understanding.",
    image: "/images/processing-plant.webp",
    imagePosition: "center",
    imageAlt:
      "Gold processing equipment and ball mill pictured in Geomysore’s original gallery",
    caption: "Pilot processing equipment · Company photograph",
    overviewHeading: "Where potential meets process.",
    overview:
      "Geomysore describes Swarnagiri ore as free milling, with a significant gravity-recoverable component. Published metallurgical evaluations were carried out at SGS Johannesburg and the Indian Bureau of Mines in Bangalore. The main plant design specifies a nominal 1,000 tonnes per day and a milling rate of 50 tonnes per hour.",
    focus: [
      {
        title: "Ore preparation",
        text: "A three-stage crushing plant followed by a ball mill in closed circuit with a hydrocyclone, as described in the published design.",
      },
      {
        title: "Mineral recovery",
        text: "The published flowsheet combines gravity recovery with carbon-in-leach treatment, followed by elution, electrowinning, and doré smelting.",
      },
      {
        title: "Process control",
        text: "Testwork covers grind size, reagent use, leach time, thickening, settling, and tailings detoxification requirements.",
      },
    ],
    journey: [
      {
        title: "Characterise",
        heading: "First, understand the feed.",
        text: "The company describes free-milling ore with a substantial gravity-recoverable component. Its testwork programme examined comminution, gold deportment, gravity response, and leach performance.",
        points: [
          "Ore mineralogy",
          "Feed characteristics",
          "Testwork and evaluation",
        ],
      },
      {
        title: "Prepare",
        heading: "Prepare for what comes next.",
        text: "The published main-plant design uses three stages of crushing and a ball mill in closed circuit with a hydrocyclone. The design basis is nominally 1,000 tonnes per day at a milling rate of 50 tonnes per hour.",
        points: ["Size reduction", "Material handling", "Feed preparation"],
      },
      {
        title: "Recover",
        heading: "Bring mineral potential into focus.",
        text: "The published recovery route includes gravity recovery, cyanide leaching with carbon-in-leach, carbon elution, electrowinning, and doré smelting. These describe the proposed main flowsheet; the pilot plant uses gravity recovery.",
        points: [
          "Ore-specific process selection",
          "Recovery performance",
          "Flowsheet considerations",
        ],
      },
      {
        title: "Monitor",
        heading: "Keep learning from the process.",
        text: "The published design includes tailings detoxification before disposal. Metallurgical evaluations also considered reagent consumption, slurry density, oxygen requirements, settling, and environmental performance.",
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
    source: contentSources.processing,
    specifications: [
      { value: "1,000 t/day", label: "Nominal main-plant design basis" },
      { value: "50 t/hour", label: "Published design milling rate" },
      { value: "Gravity + CIL", label: "Published main recovery route" },
    ],
    sourceNote:
      "Figures describe the published plant design, not confirmed current throughput. The original page gives pilot capacity as 2 t/h in its narrative and 3 TPH in its table; confirm the correct pilot rating with the company.",
  },
  {
    slug: "exploration",
    category: "GEOLOGICAL EXPLORATION",
    title: "Exploration portfolio",
    headline: "Good discoveries begin",
    accent: "with better questions.",
    intro:
      "Established in 1994, Geomysore has explored more than 35,000 square kilometres across India. Its work connects field geology, geochemistry, geophysics, and drilling to understand mineral potential.",
    image: "/images/exploration-rig.jpg",
    imagePosition: "center",
    imageAlt:
      "Exploration drilling rig from Geomysore’s published exploration page",
    caption: "Exploration drilling · Company photograph",
    overviewHeading: "A considered search for possibility.",
    overview:
      "Geomysore and its associated companies describe exploration across Andhra Pradesh, Karnataka, Madhya Pradesh, Chhattisgarh, Rajasthan, Maharashtra, Arunachal Pradesh, and Nagaland. At Swarnagiri, published work includes trenching, soil sampling, induced-polarisation and magnetic surveys, and approximately 33,000 metres of close-spaced drilling.",
    focus: [
      {
        title: "Field observations",
        text: "Fieldwork at Swarnagiri includes trenching and soil sampling, supported by mapping of the mineralised blocks.",
      },
      {
        title: "Data and interpretation",
        text: "Induced-polarisation and magnetic surveys complement drilling and geological interpretation.",
      },
      {
        title: "Evidence-led decisions",
        text: "The company describes technical studies covering resource estimation, ore beneficiation, geotechnical work, and pit optimisation.",
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
    source: contentSources.exploration,
    specifications: [
      { value: "1994", label: "Company established" },
      { value: "35,000+ km²", label: "Explored by company and associates" },
      { value: "~33,000 m", label: "Published Swarnagiri drilling" },
    ],
    sourceNote:
      "Company history is sourced from the About page; Swarnagiri fieldwork and drilling figures are published on the Exploration page. They are not an updated resource or reserve statement.",
  },
];
