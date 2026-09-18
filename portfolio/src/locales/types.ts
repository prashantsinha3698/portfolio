export type Locale = "en" | "de";

export interface NavTranslations {
  home: string;
  projects: string;
  experience: string;
  skills: string;
  education: string;
  about: string;
  contact: string;
  resume: string;
  downloadResume: string;
  reachOutBadge: string;
  activeBadge: string;
  contactModal: {
    sectionTag: string;
    title: string;
    closeDialogAria: string;
    availabilityStatus: string;
    primaryEmailTag: string;
    copyEmail: string;
    copiedEmail: string;
    openEmailClient: string;
    locationNote: string;
    verifiedProfilesTag: string;
    homepageContactLink: string;
    escHint: string;
  };
}

export interface FooterTranslations {
  roleTitle: string;
  builtWith: string;
  locationBaseTag: string;
  locationValue: string;
  returnToTop: string;
  copyright: string;
}

export interface HeroTranslations {
  typewriterPhrases: string[];
  greetingTag: string;
  headlineLine1: string;
  headlineLine2: string;
  leadBio: string;
  ctaExploreWork: string;
  ctaResume: string;
  ctaGetInTouch: string;
  statusBadge: string;
  quickFacts: {
    experienceLabel: string;
    experienceValue: string;
    experienceSub: string;
    baseLabel: string;
    baseValue: string;
    baseSub: string;
    buildLabel: string;
    buildValue: string;
    buildSub: string;
    stackLabel: string;
    stackValue: string;
    stackSub: string;
  };
}

export interface HomeProjectsTranslations {
  sectionLabel: string;
  title: string;
  subtitle: string;
  onyxflow: {
    categoryTag: string;
    tagline: string;
    description: string;
    bullet1: string;
    bullet2: string;
    bullet3: string;
    bullet4: string;
    metric1Val: string;
    metric1Label: string;
    metric2Val: string;
    metric2Label: string;
    ctaDocs: string;
    ctaGithub: string;
  };
  quantfolio: {
    categoryTag: string;
    tagline: string;
    description: string;
    bullet1: string;
    bullet2: string;
    bullet3: string;
    bullet4: string;
    metric1Val: string;
    metric1Label: string;
    metric2Val: string;
    metric2Label: string;
    ctaLive: string;
    ctaGithub: string;
  };
  viewAllProjects: string;
}

export interface HomeExperienceTranslations {
  sectionLabel: string;
  title: string;
  subtitle: string;
  period: string;
  company: string;
  account: string;
  region: string;
  roleTitle: string;
  roleContext: string;
  leadParagraph: string;
  selectedDeliverablesTitle: string;
  deliverables: {
    title: string;
    desc: string;
  }[];
  viewFullTimeline: string;
}

export interface HomeSkillsTranslations {
  sectionLabel: string;
  title: string;
  subtitle: string;
  categories: {
    title: string;
    desc: string;
  }[];
  viewSkillMatrix: string;
}

export interface HomeEducationTranslations {
  sectionLabel: string;
  title: string;
  subtitle: string;
  degreeName: string;
  degreeFull: string;
  institution: string;
  location: string;
  period: string;
  badge: string;
  curriculumHighlight: string;
  stats: {
    gradeLabel: string;
    gradeValue: string;
    creditsLabel: string;
    creditsValue: string;
    ectsLabel: string;
    ectsValue: string;
    labsLabel: string;
    labsValue: string;
  };
  viewAcademicRecord: string;
}

export interface HomeAboutTranslations {
  sectionLabel: string;
  title: string;
  paragraphs: string[];
  viewFullStory: string;
}

export interface HomeContactTranslations {
  sectionLabel: string;
  title: string;
  subtitle: string;
  statusBadge: string;
  directEmailTag: string;
  copyBtn: string;
  copiedBtn: string;
  openClientBtn: string;
  timezoneLabel: string;
  timezoneValue: string;
  profilesTag: string;
}

export interface ProjectsPageTranslations {
  metaTitle: string;
  metaDescription: string;
  headerNumber: string;
  headerCategory: string;
  headerTitle: string;
  headerDescription: string;
  compareTag: string;
  compareHeading: string;
  compareParagraph: string;
  compareOnyxflowTitle: string;
  compareOnyxflowSubtitle: string;
  compareOnyxflowBullets: string[];
  compareQuantfolioTitle: string;
  compareQuantfolioSubtitle: string;
  compareQuantfolioBullets: string[];
  card1Status: string;
  card1Category: string;
  card1Tagline: string;
  card1Desc: string;
  card1HighlightsTitle: string;
  card1Highlights: string[];
  card1MetricsTitle: string;
  card1Metrics: { val: string; lbl: string; sub: string }[];
  card1CtaDoc: string;
  card1CtaGithub: string;
  card2Status: string;
  card2Category: string;
  card2Tagline: string;
  card2Desc: string;
  card2HighlightsTitle: string;
  card2Highlights: string[];
  card2MetricsTitle: string;
  card2Metrics: { val: string; lbl: string; sub: string }[];
  card2CtaDemo: string;
  card2CtaGithub: string;
}

export interface ProjectDocTranslations {
  breadcrumbProjects: string;
  personalProjectLabel: string;
  devNote: string;
  technologiesHeader: string;
  chaptersHeader: string;
  mobileSectionPrefix: string;
  allProjectsIndex: string;
  prevPrefix: string;
  nextPrefix: string;
  metaTitle: string;
  metaDescription: string;
  tagline: string;
  description: string;
  metrics: { value: string; label: string; detail: string }[];
  chapters: { id: string; label: string }[];
}

export interface ExperiencePageTranslations {
  metaTitle: string;
  metaDescription: string;
  headerNumber: string;
  headerCategory: string;
  headerTitle: string;
  headerDescription: string;
  role1: {
    sectionNumber: string;
    label: string;
    period: string;
    company: string;
    account: string;
    region: string;
    roleTitle: string;
    roleContext: string;
    leadParagraph: string;
    deliverablesTitle: string;
    deliverables: { title: string; desc: string }[];
    architectureTitle: string;
    architectureList: string[];
  };
  role2: {
    sectionNumber: string;
    label: string;
    period: string;
    company: string;
    account: string;
    region: string;
    roleTitle: string;
    roleContext: string;
    leadParagraph: string;
    deliverablesTitle: string;
    deliverables: { title: string; desc: string }[];
    systemsTitle: string;
    systemsList: string[];
  };
}

export interface SkillsPageTranslations {
  metaTitle: string;
  metaDescription: string;
  headerNumber: string;
  headerCategory: string;
  headerTitle: string;
  headerDescription: string;
  summaryTitle: string;
  summaryParagraphs: string[];
  capabilitiesTitle: string;
  capabilities: {
    id: string;
    code: string;
    title: string;
    category: "SALESFORCE" | "INTEGRATION" | "ENGINEERING" | "TOOLS & DEVOPS" | "SYSTEMS";
    description: string;
    skills: { name: string; detail: string; hasDot?: boolean }[];
  }[];
}

export interface AcademicLab {
  semester: number;
  session: string;
  code: string;
  name: string;
  marks: string;
  grade: string;
  credits: number;
  ects: number;
  category: "Electronics" | "Microprocessors & VLSI" | "Communications" | "Computing & Projects";
  description: string;
}

export interface EducationPageTranslations {
  metaTitle: string;
  metaDescription: string;
  headerNumber: string;
  headerCategory: string;
  headerTitle: string;
  headerDescription: string;
  degreeSummary: {
    title: string;
    degreeName: string;
    institution: string;
    university: string;
    period: string;
    gradeText: string;
    leadParagraph: string;
    stats: {
      cgpaLabel: string;
      cgpaValue: string;
      cgpaSub: string;
      germanScaleLabel: string;
      germanScaleValue: string;
      germanScaleSub: string;
      totalCreditsLabel: string;
      totalCreditsValue: string;
      totalCreditsSub: string;
      ectsLabel: string;
      ectsValue: string;
      ectsSub: string;
    };
  };
  labsSection: {
    title: string;
    subtitle: string;
    categories: string[];
    labs: AcademicLab[];
  };
  vocationalSection: {
    title: string;
    subtitle: string;
    items: {
      organization: string;
      title: string;
      period: string;
      description: string;
    }[];
  };
  achievementsSection: {
    title: string;
    subtitle: string;
    items: {
      badge: string;
      title: string;
      description: string;
    }[];
  };
}

export interface StoryChapter {
  id: string;
  number: number;
  period: string;
  category: string;
  badgeSubtitle?: string;
  title: string;
  teaser: string;
  paragraphs: string[];
  whatILearned: string;
  recordTitle: string;
  recordItems: string[];
}

export interface AboutPageTranslations {
  metaTitle: string;
  metaDescription: string;
  headerNumber: string;
  headerCategory: string;
  headerTitle: string;
  headerDescription: string;
  introSection: {
    title: string;
    paragraphs: string[];
  };
  learningSection: {
    title: string;
    paragraphs: string[];
  };
  methodologySection: {
    title: string;
    principles: { title: string; desc: string }[];
  };
  timelineChapters: StoryChapter[];
}

export interface Translations {
  locale: Locale;
  nav: NavTranslations;
  footer: FooterTranslations;
  hero: HeroTranslations;
  homeProjects: HomeProjectsTranslations;
  homeExperience: HomeExperienceTranslations;
  homeSkills: HomeSkillsTranslations;
  homeEducation: HomeEducationTranslations;
  homeAbout: HomeAboutTranslations;
  homeContact: HomeContactTranslations;
  projectsPage: ProjectsPageTranslations;
  onyxflowPage: ProjectDocTranslations;
  quantfolioPage: ProjectDocTranslations;
  experiencePage: ExperiencePageTranslations;
  skillsPage: SkillsPageTranslations;
  educationPage: EducationPageTranslations;
  aboutPage: AboutPageTranslations;
}
