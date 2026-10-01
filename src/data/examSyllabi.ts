// Content for the /compare/:slug-syllabus pages, in English and Hindi. Structural facts only
// (tiers/stages, broad subjects tested) - never exact marks, question counts or timing, since
// those are set per-cycle by each exam body's own notification and can change between cycles.
// Each page links to the real official source for that exam instead of asserting a number this
// file can't keep current. See src/pages/compare/SyllabusPage.tsx for how this renders.

export interface SyllabusStage {
  name: string;
  body: string;
}

export interface SyllabusContent {
  pageTitle: string;
  lede: string;
  stagesHeading: string;
  stages: SyllabusStage[];
  subjectsHeading: string;
  subjects: SyllabusStage[];
  note: string;
  noteLinkLabel: string;
  recruitsHeading: string;
  recruitsBody: string;
  offerHeading: string;
  offerBody: string;
  sourceHeading: string;
  officialLinkLabel: string;
  examNoticesLinkLabel: string;
  ctaLabel: string;
  backLabel: string;
  disclaimer: string;
}

export interface ExamSyllabusEntry {
  slug: string;
  examName: string;
  officialUrl: string;
  en: SyllabusContent;
  hi: SyllabusContent;
}

export const EXAM_SYLLABI: ExamSyllabusEntry[] = [
  {
    slug: 'ssc-cgl',
    examName: 'SSC CGL',
    officialUrl: 'https://ssc.gov.in/for-candidates/cgl-exam/xsd91hjkshdk92xk',
    en: {
      pageTitle: 'SSC CGL Syllabus & Exam Pattern',
      lede: 'SSC CGL (Combined Graduate Level) is run as a multi-tier computer-based test. Here’s the stable shape of it — what gets tested at each stage — with a link to the official notification for this cycle’s exact marks, timing and negative-marking details, since those can be revised from one notification to the next.',
      stagesHeading: 'The tiers',
      stages: [
        { name: 'Tier-I', body: 'A single computer-based test covering four sections: General Intelligence & Reasoning, General Awareness, Quantitative Aptitude, and English Comprehension. This is the qualifying/screening stage — clearing it is what gets you to Tier-II.' },
        { name: 'Tier-II', body: 'A further computer-based test for candidates who clear Tier-I, going deeper on the same broad subject areas plus any role-specific papers relevant to the posts you’re eligible for.' },
      ],
      subjectsHeading: 'What’s tested',
      subjects: [
        { name: 'Quantitative Aptitude', body: 'Number system, percentages, ratio & proportion, profit & loss, time-speed-distance, algebra, geometry, mensuration, trigonometry, and data interpretation.' },
        { name: 'General Intelligence & Reasoning', body: 'Analogies, classification, series, coding-decoding, blood relations, direction sense, syllogisms, non-verbal reasoning (figures, patterns), and puzzles.' },
        { name: 'English Comprehension', body: 'Grammar, vocabulary, sentence correction, fill in the blanks, cloze passages, synonyms/antonyms, and reading comprehension.' },
        { name: 'General Awareness', body: 'Static GK (history, geography, polity, economy, science) plus current affairs — which is where a daily current-affairs habit actually pays off in this exam specifically.' },
      ],
      note: 'Exact number of questions, marks per question, section-wise timing and the negative-marking fraction are set by each cycle’s own official notification and can change from one CGL cycle to the next. Treat the subjects above as the stable shape to study toward, and check',
      noteLinkLabel: 'SSC’s own CGL exam page',
      recruitsHeading: 'What CGL recruits for',
      recruitsBody: 'CGL fills Group B and Group C posts across central government ministries and departments — roles like Inspector-level posts in central tax departments, Auditor and Accountant posts, Assistant-level posts in various ministries, and more, with the exact post-wise vacancy breakdown published in each cycle’s own notification.',
      offerHeading: 'What Pariksha Saathi offers for SSC CGL',
      offerBody: 'Topic-wise lessons and practice across all four subjects above, sectional tests by subject, full-length mock tests in the real pattern with negative marking, a Mistake Notebook that tracks your weak topics automatically, and dated current-affairs capsules for General Awareness — all free, with no paywalled content.',
      sourceHeading: 'Official source & latest updates',
      officialLinkLabel: 'SSC CGL — official exam page',
      examNoticesLinkLabel: 'Latest admit card, result and deadline alerts on Pariksha Saathi',
      ctaLabel: 'Start studying SSC CGL free',
      backLabel: 'Home',
      disclaimer: 'Pariksha Saathi is an independent project and is not affiliated with SSC or any government body. Syllabus and pattern details above are general and may change — always confirm against the official notification linked above.',
    },
    hi: {
      pageTitle: 'SSC CGL सिलेबस और परीक्षा पैटर्न',
      lede: 'SSC CGL (कंबाइंड ग्रेजुएट लेवल) एक बहु-स्तरीय कंप्यूटर-आधारित परीक्षा के रूप में आयोजित की जाती है। यहां इसकी स्थिर संरचना दी गई है — हर चरण में क्या परखा जाता है — साथ ही आधिकारिक अधिसूचना का लिंक भी, जहां से इस चक्र के सटीक अंक, समय और नेगेटिव मार्किंग विवरण मिलेंगे, क्योंकि ये हर अधिसूचना में बदल सकते हैं।',
      stagesHeading: 'स्तर (टियर)',
      stages: [
        { name: 'टियर-I', body: 'एक ही कंप्यूटर-आधारित परीक्षा जिसमें चार खंड होते हैं: सामान्य बुद्धिमत्ता एवं तर्कशक्ति, सामान्य जागरूकता, मात्रात्मक अभियोग्यता, और अंग्रेजी बोधगम्यता। यह क्वालिफाइंग/स्क्रीनिंग चरण है — इसे पास करने पर ही आप टियर-II तक पहुंचते हैं।' },
        { name: 'टियर-II', body: 'टियर-I पास करने वाले उम्मीदवारों के लिए एक और कंप्यूटर-आधारित परीक्षा, जो उन्हीं व्यापक विषयों को गहराई से परखती है, साथ ही आपके लिए पात्र पदों से जुड़े किसी भी भूमिका-विशिष्ट प्रश्नपत्र के साथ।' },
      ],
      subjectsHeading: 'क्या परखा जाता है',
      subjects: [
        { name: 'मात्रात्मक अभियोग्यता', body: 'संख्या पद्धति, प्रतिशत, अनुपात एवं समानुपात, लाभ-हानि, समय-चाल-दूरी, बीजगणित, ज्यामिति, क्षेत्रमिति, त्रिकोणमिति, और डेटा इंटरप्रिटेशन।' },
        { name: 'सामान्य बुद्धिमत्ता एवं तर्कशक्ति', body: 'सादृश्य, वर्गीकरण, श्रृंखला, कोडिंग-डिकोडिंग, रक्त संबंध, दिशा ज्ञान, न्यायवाक्य (सिलोजिज़्म), अशाब्दिक तर्कशक्ति (आकृतियां, पैटर्न), और पहेलियां।' },
        { name: 'अंग्रेजी बोधगम्यता', body: 'व्याकरण, शब्दावली, वाक्य सुधार, रिक्त स्थान भरना, क्लोज़ पैसेज, समानार्थी/विलोम शब्द, और गद्यांश बोधगम्यता।' },
        { name: 'सामान्य जागरूकता', body: 'स्थैतिक सामान्य ज्ञान (इतिहास, भूगोल, राजव्यवस्था, अर्थव्यवस्था, विज्ञान) के साथ-साथ करेंट अफेयर्स — यही वह जगह है जहां रोज़ाना करेंट अफेयर्स पढ़ने की आदत इस परीक्षा में खासतौर पर काम आती है।' },
      ],
      note: 'प्रश्नों की सटीक संख्या, प्रति प्रश्न अंक, खंड-वार समय और नेगेटिव मार्किंग का अनुपात हर चक्र की अपनी आधिकारिक अधिसूचना द्वारा तय किया जाता है और एक CGL चक्र से दूसरे में बदल सकता है। ऊपर दिए गए विषयों को अध्ययन के लिए स्थिर आधार मानें, और देखें',
      noteLinkLabel: 'SSC का अपना CGL परीक्षा पेज',
      recruitsHeading: 'CGL किसके लिए भर्ती करता है',
      recruitsBody: 'CGL केंद्र सरकार के मंत्रालयों और विभागों में ग्रुप B और ग्रुप C पदों को भरता है — जैसे केंद्रीय कर विभागों में इंस्पेक्टर-स्तर के पद, ऑडिटर और अकाउंटेंट पद, विभिन्न मंत्रालयों में असिस्टेंट-स्तर के पद, और भी बहुत कुछ, जिसका सटीक पद-वार रिक्ति विवरण हर चक्र की अपनी अधिसूचना में प्रकाशित होता है।',
      offerHeading: 'Pariksha Saathi SSC CGL के लिए क्या देता है',
      offerBody: 'ऊपर दिए गए सभी चार विषयों में विषयवार पाठ और अभ्यास, विषयवार सेक्शनल टेस्ट, नेगेटिव मार्किंग के साथ वास्तविक पैटर्न में फुल-लेंथ मॉक टेस्ट, एक मिस्टेक नोटबुक जो आपके कमजोर विषयों को अपने आप ट्रैक करती है, और सामान्य जागरूकता के लिए दिनांकित करेंट अफेयर्स कैप्सूल — यह सब मुफ्त है, बिना किसी पेवॉल्ड कंटेंट के।',
      sourceHeading: 'आधिकारिक स्रोत और नवीनतम अपडेट',
      officialLinkLabel: 'SSC CGL — आधिकारिक परीक्षा पेज',
      examNoticesLinkLabel: 'Pariksha Saathi पर नवीनतम एडमिट कार्ड, परिणाम और डेडलाइन अलर्ट',
      ctaLabel: 'SSC CGL की मुफ्त पढ़ाई शुरू करें',
      backLabel: 'होम',
      disclaimer: 'Pariksha Saathi एक स्वतंत्र परियोजना है और SSC या किसी भी सरकारी निकाय से संबद्ध नहीं है। ऊपर दिए गए सिलेबस और पैटर्न विवरण सामान्य हैं और बदल सकते हैं — हमेशा ऊपर दी गई आधिकारिक अधिसूचना से पुष्टि करें।',
    },
  },
  {
    slug: 'ssc-mts',
    examName: 'SSC MTS',
    officialUrl: 'https://ssc.gov.in/',
    en: {
      pageTitle: 'SSC MTS Syllabus & Exam Pattern',
      lede: 'SSC MTS (Multi-Tasking Staff) is a single-stage computer-based exam for most posts, with an added physical test for one specific post. Here’s the stable shape of it, with a link to the official notification for this cycle’s exact marks and timing.',
      stagesHeading: 'The stages',
      stages: [
        { name: 'CBE', body: 'A single computer-based exam covering Numerical and Mathematical Ability, Reasoning Ability and Problem Solving, General Awareness, and English Language.' },
        { name: 'PET/PST (Havaldar only)', body: 'Candidates applying for the Havaldar post in CBIC and CBN additionally go through a Physical Efficiency Test and Physical Standards Test — not required for the general MTS post.' },
      ],
      subjectsHeading: 'What’s tested',
      subjects: [
        { name: 'Numerical & Mathematical Ability', body: 'Basic arithmetic — number system, percentages, ratio, averages, profit & loss, time & work, simple geometry and mensuration.' },
        { name: 'Reasoning Ability & Problem Solving', body: 'Analogies, similarities/differences, space visualisation, problem solving, analysis, and basic logical reasoning.' },
        { name: 'English Language', body: 'Basic grammar, vocabulary, and simple comprehension — somewhat lighter than the Tier-level exams, matching MTS’s 10th-pass eligibility.' },
        { name: 'General Awareness', body: 'Static GK plus current affairs, at a level appropriate to the exam’s eligibility.' },
      ],
      note: 'Exact number of questions, marks per question, section-wise timing and the negative-marking fraction are set by each cycle’s own official notification and can change between cycles. Treat the subjects above as the stable shape to study toward, and check',
      noteLinkLabel: 'SSC’s own official site',
      recruitsHeading: 'What MTS recruits for',
      recruitsBody: 'MTS fills Multi-Tasking (Non-Technical) Staff posts — general support and clerical roles — across central government offices and departments, including the specific Havaldar post in CBIC and CBN that requires the additional physical tests.',
      offerHeading: 'What Pariksha Saathi offers for SSC MTS',
      offerBody: 'Topic-wise lessons and practice across all four subjects above, sectional tests by subject, full-length mock tests in the real pattern with negative marking, a Mistake Notebook that tracks your weak topics automatically, and dated current-affairs capsules for General Awareness — all free, with no paywalled content.',
      sourceHeading: 'Official source & latest updates',
      officialLinkLabel: 'SSC — official site',
      examNoticesLinkLabel: 'Latest admit card, result and deadline alerts on Pariksha Saathi',
      ctaLabel: 'Start studying SSC MTS free',
      backLabel: 'Home',
      disclaimer: 'Pariksha Saathi is an independent project and is not affiliated with SSC or any government body. Syllabus and pattern details above are general and may change — always confirm against the official notification linked above.',
    },
    hi: {
      pageTitle: 'SSC MTS सिलेबस और परीक्षा पैटर्न',
      lede: 'SSC MTS (मल्टी-टास्किंग स्टाफ) अधिकांश पदों के लिए एक ही चरण की कंप्यूटर-आधारित परीक्षा है, जिसमें एक विशेष पद के लिए अतिरिक्त शारीरिक परीक्षण भी होता है। यहां इसकी स्थिर संरचना दी गई है, साथ ही आधिकारिक अधिसूचना का लिंक भी जहां से इस चक्र के सटीक अंक और समय मिलेंगे।',
      stagesHeading: 'चरण',
      stages: [
        { name: 'CBE', body: 'एक ही कंप्यूटर-आधारित परीक्षा जिसमें संख्यात्मक एवं गणितीय योग्यता, तर्कशक्ति एवं समस्या समाधान, सामान्य जागरूकता, और अंग्रेजी भाषा शामिल हैं।' },
        { name: 'PET/PST (केवल हवलदार पद)', body: 'CBIC और CBN में हवलदार पद के लिए आवेदन करने वाले उम्मीदवारों को अतिरिक्त रूप से शारीरिक दक्षता परीक्षण और शारीरिक मानक परीक्षण से गुजरना होता है — सामान्य MTS पद के लिए यह आवश्यक नहीं है।' },
      ],
      subjectsHeading: 'क्या परखा जाता है',
      subjects: [
        { name: 'संख्यात्मक एवं गणितीय योग्यता', body: 'मूल अंकगणित — संख्या पद्धति, प्रतिशत, अनुपात, औसत, लाभ-हानि, समय एवं कार्य, सरल ज्यामिति और क्षेत्रमिति।' },
        { name: 'तर्कशक्ति एवं समस्या समाधान', body: 'सादृश्य, समानता/भिन्नता, स्थान दृश्यावलोकन, समस्या समाधान, विश्लेषण, और मूल तार्किक तर्कशक्ति।' },
        { name: 'अंग्रेजी भाषा', body: 'मूल व्याकरण, शब्दावली, और सरल बोधगम्यता — टियर-स्तरीय परीक्षाओं की तुलना में कुछ हल्का, जो MTS की 10वीं पास पात्रता के अनुरूप है।' },
        { name: 'सामान्य जागरूकता', body: 'स्थैतिक सामान्य ज्ञान के साथ करेंट अफेयर्स, परीक्षा की पात्रता के अनुरूप स्तर पर।' },
      ],
      note: 'प्रश्नों की सटीक संख्या, प्रति प्रश्न अंक, खंड-वार समय और नेगेटिव मार्किंग का अनुपात हर चक्र की अपनी आधिकारिक अधिसूचना द्वारा तय किया जाता है और चक्रों के बीच बदल सकता है। ऊपर दिए गए विषयों को अध्ययन के लिए स्थिर आधार मानें, और देखें',
      noteLinkLabel: 'SSC की आधिकारिक वेबसाइट',
      recruitsHeading: 'MTS किसके लिए भर्ती करता है',
      recruitsBody: 'MTS केंद्र सरकार के कार्यालयों और विभागों में मल्टी-टास्किंग (नॉन-टेक्निकल) स्टाफ पदों को भरता है — सामान्य सहायक और लिपिकीय भूमिकाएं — जिसमें CBIC और CBN का विशेष हवलदार पद भी शामिल है, जिसके लिए अतिरिक्त शारीरिक परीक्षण आवश्यक होते हैं।',
      offerHeading: 'Pariksha Saathi SSC MTS के लिए क्या देता है',
      offerBody: 'ऊपर दिए गए सभी चार विषयों में विषयवार पाठ और अभ्यास, विषयवार सेक्शनल टेस्ट, नेगेटिव मार्किंग के साथ वास्तविक पैटर्न में फुल-लेंथ मॉक टेस्ट, एक मिस्टेक नोटबुक जो आपके कमजोर विषयों को अपने आप ट्रैक करती है, और सामान्य जागरूकता के लिए दिनांकित करेंट अफेयर्स कैप्सूल — यह सब मुफ्त है, बिना किसी पेवॉल्ड कंटेंट के।',
      sourceHeading: 'आधिकारिक स्रोत और नवीनतम अपडेट',
      officialLinkLabel: 'SSC — आधिकारिक वेबसाइट',
      examNoticesLinkLabel: 'Pariksha Saathi पर नवीनतम एडमिट कार्ड, परिणाम और डेडलाइन अलर्ट',
      ctaLabel: 'SSC MTS की मुफ्त पढ़ाई शुरू करें',
      backLabel: 'होम',
      disclaimer: 'Pariksha Saathi एक स्वतंत्र परियोजना है और SSC या किसी भी सरकारी निकाय से संबद्ध नहीं है। ऊपर दिए गए सिलेबस और पैटर्न विवरण सामान्य हैं और बदल सकते हैं — हमेशा ऊपर दी गई आधिकारिक अधिसूचना से पुष्टि करें।',
    },
  },
  {
    slug: 'ssc-chsl',
    examName: 'SSC CHSL',
    officialUrl: 'https://ssc.gov.in/',
    en: {
      pageTitle: 'SSC CHSL Syllabus & Exam Pattern',
      lede: 'SSC CHSL (Combined Higher Secondary Level) runs as a two-tier computer-based test. Here’s the stable shape of it, with a link to the official notification for this cycle’s exact marks and timing.',
      stagesHeading: 'The tiers',
      stages: [
        { name: 'Tier-I', body: 'A computer-based qualifying test across the same four broad subjects listed below. Clearing it is what gets you to Tier-II.' },
        { name: 'Tier-II', body: 'A further computer-based test for candidates who clear Tier-I. Some posts (like Data Entry Operator) also require a skill or typing test as part of the overall selection.' },
      ],
      subjectsHeading: 'What’s tested',
      subjects: [
        { name: 'Quantitative Aptitude', body: 'Number system, percentages, ratio & proportion, profit & loss, time-speed-distance, algebra, geometry, and mensuration.' },
        { name: 'General Intelligence (Reasoning)', body: 'Analogies, classification, series, coding-decoding, blood relations, direction sense, and non-verbal reasoning.' },
        { name: 'English Language', body: 'Grammar, vocabulary, sentence correction, fill in the blanks, synonyms/antonyms, and reading comprehension.' },
        { name: 'General Awareness', body: 'Static GK plus current affairs — where a daily current-affairs habit pays off directly.' },
      ],
      note: 'Exact number of questions, marks per question, section-wise timing and the negative-marking fraction are set by each cycle’s own official notification and can change between cycles. Treat the subjects above as the stable shape to study toward, and check',
      noteLinkLabel: 'SSC’s own official site',
      recruitsHeading: 'What CHSL recruits for',
      recruitsBody: 'CHSL fills Lower Divisional Clerk / Junior Secretariat Assistant, Postal Assistant / Sorting Assistant, Data Entry Operator and similar Group C posts that require a 12th-pass qualification, across central government offices and departments.',
      offerHeading: 'What Pariksha Saathi offers for SSC CHSL',
      offerBody: 'Topic-wise lessons and practice across all four subjects above, sectional tests by subject, full-length mock tests in the real pattern with negative marking, a Mistake Notebook that tracks your weak topics automatically, and dated current-affairs capsules for General Awareness — all free, with no paywalled content.',
      sourceHeading: 'Official source & latest updates',
      officialLinkLabel: 'SSC — official site',
      examNoticesLinkLabel: 'Latest admit card, result and deadline alerts on Pariksha Saathi',
      ctaLabel: 'Start studying SSC CHSL free',
      backLabel: 'Home',
      disclaimer: 'Pariksha Saathi is an independent project and is not affiliated with SSC or any government body. Syllabus and pattern details above are general and may change — always confirm against the official notification linked above.',
    },
    hi: {
      pageTitle: 'SSC CHSL सिलेबस और परीक्षा पैटर्न',
      lede: 'SSC CHSL (कंबाइंड हायर सेकेंडरी लेवल) दो-स्तरीय कंप्यूटर-आधारित परीक्षा के रूप में आयोजित होती है। यहां इसकी स्थिर संरचना दी गई है, साथ ही आधिकारिक अधिसूचना का लिंक भी जहां से इस चक्र के सटीक अंक और समय मिलेंगे।',
      stagesHeading: 'स्तर (टियर)',
      stages: [
        { name: 'टियर-I', body: 'नीचे दिए गए उन्हीं चार व्यापक विषयों पर एक कंप्यूटर-आधारित क्वालिफाइंग परीक्षा। इसे पास करने पर ही आप टियर-II तक पहुंचते हैं।' },
        { name: 'टियर-II', body: 'टियर-I पास करने वाले उम्मीदवारों के लिए एक और कंप्यूटर-आधारित परीक्षा। कुछ पदों (जैसे डेटा एंट्री ऑपरेटर) के लिए समग्र चयन प्रक्रिया के हिस्से के रूप में एक स्किल या टाइपिंग टेस्ट भी आवश्यक होता है।' },
      ],
      subjectsHeading: 'क्या परखा जाता है',
      subjects: [
        { name: 'मात्रात्मक अभियोग्यता', body: 'संख्या पद्धति, प्रतिशत, अनुपात एवं समानुपात, लाभ-हानि, समय-चाल-दूरी, बीजगणित, ज्यामिति, और क्षेत्रमिति।' },
        { name: 'सामान्य बुद्धिमत्ता (तर्कशक्ति)', body: 'सादृश्य, वर्गीकरण, श्रृंखला, कोडिंग-डिकोडिंग, रक्त संबंध, दिशा ज्ञान, और अशाब्दिक तर्कशक्ति।' },
        { name: 'अंग्रेजी भाषा', body: 'व्याकरण, शब्दावली, वाक्य सुधार, रिक्त स्थान भरना, समानार्थी/विलोम शब्द, और गद्यांश बोधगम्यता।' },
        { name: 'सामान्य जागरूकता', body: 'स्थैतिक सामान्य ज्ञान के साथ करेंट अफेयर्स — जहां रोज़ाना करेंट अफेयर्स पढ़ने की आदत सीधे काम आती है।' },
      ],
      note: 'प्रश्नों की सटीक संख्या, प्रति प्रश्न अंक, खंड-वार समय और नेगेटिव मार्किंग का अनुपात हर चक्र की अपनी आधिकारिक अधिसूचना द्वारा तय किया जाता है और चक्रों के बीच बदल सकता है। ऊपर दिए गए विषयों को अध्ययन के लिए स्थिर आधार मानें, और देखें',
      noteLinkLabel: 'SSC की आधिकारिक वेबसाइट',
      recruitsHeading: 'CHSL किसके लिए भर्ती करता है',
      recruitsBody: 'CHSL केंद्र सरकार के कार्यालयों और विभागों में लोअर डिविज़न क्लर्क/जूनियर सेक्रेटेरिएट असिस्टेंट, पोस्टल असिस्टेंट/सॉर्टिंग असिस्टेंट, डेटा एंट्री ऑपरेटर और 12वीं पास योग्यता वाले इसी तरह के ग्रुप C पदों को भरता है।',
      offerHeading: 'Pariksha Saathi SSC CHSL के लिए क्या देता है',
      offerBody: 'ऊपर दिए गए सभी चार विषयों में विषयवार पाठ और अभ्यास, विषयवार सेक्शनल टेस्ट, नेगेटिव मार्किंग के साथ वास्तविक पैटर्न में फुल-लेंथ मॉक टेस्ट, एक मिस्टेक नोटबुक जो आपके कमजोर विषयों को अपने आप ट्रैक करती है, और सामान्य जागरूकता के लिए दिनांकित करेंट अफेयर्स कैप्सूल — यह सब मुफ्त है, बिना किसी पेवॉल्ड कंटेंट के।',
      sourceHeading: 'आधिकारिक स्रोत और नवीनतम अपडेट',
      officialLinkLabel: 'SSC — आधिकारिक वेबसाइट',
      examNoticesLinkLabel: 'Pariksha Saathi पर नवीनतम एडमिट कार्ड, परिणाम और डेडलाइन अलर्ट',
      ctaLabel: 'SSC CHSL की मुफ्त पढ़ाई शुरू करें',
      backLabel: 'होम',
      disclaimer: 'Pariksha Saathi एक स्वतंत्र परियोजना है और SSC या किसी भी सरकारी निकाय से संबद्ध नहीं है। ऊपर दिए गए सिलेबस और पैटर्न विवरण सामान्य हैं और बदल सकते हैं — हमेशा ऊपर दी गई आधिकारिक अधिसूचना से पुष्टि करें।',
    },
  },
  {
    slug: 'ibps-po',
    examName: 'IBPS PO',
    officialUrl: 'https://www.ibps.in/index.php/management-trainees-xvi/',
    en: {
      pageTitle: 'IBPS PO Syllabus & Exam Pattern',
      lede: 'IBPS PO (Probationary Officer / Management Trainee) runs across three stages. Here’s the stable shape of it, with a link to the official IBPS page for this cycle’s exact marks and timing.',
      stagesHeading: 'The stages',
      stages: [
        { name: 'Preliminary exam', body: 'A screening-stage computer-based test across Reasoning, Quantitative Aptitude and English — clearing it is what gets you to the Main exam.' },
        { name: 'Main exam', body: 'A more in-depth computer-based test covering Reasoning & Computer Aptitude, Quantitative Aptitude, English, and General/Banking/Economy Awareness.' },
        { name: 'Interview', body: 'Candidates who clear the Main exam are called for an interview before the final merit list and bank allotment.' },
      ],
      subjectsHeading: 'What’s tested',
      subjects: [
        { name: 'Reasoning (& Computer Aptitude in Mains)', body: 'Puzzles, seating arrangement, syllogism, coding-decoding, inequalities, and basic computer-aptitude topics at the Mains stage.' },
        { name: 'Quantitative Aptitude', body: 'Number series, simplification, quadratic equations, data interpretation, and arithmetic word problems.' },
        { name: 'English Language', body: 'Reading comprehension, cloze test, error spotting, sentence rearrangement, and vocabulary.' },
        { name: 'General / Banking / Economy Awareness', body: 'Banking terms and regulations, financial and economic current affairs, and general static GK relevant to the sector.' },
      ],
      note: 'Exact number of questions, marks per question, section-wise timing and the negative-marking fraction are set by each cycle’s own official notification and can change between cycles. Treat the subjects above as the stable shape to study toward, and check',
      noteLinkLabel: 'IBPS’s own PO/MT page',
      recruitsHeading: 'Who IBPS PO recruits for',
      recruitsBody: 'IBPS PO recruits Probationary Officers / Management Trainees across a group of participating public sector banks — you don’t know which bank until allotment. See our IBPS PO vs SBI PO comparison for how that actually differs from SBI’s own process.',
      offerHeading: 'What Pariksha Saathi offers for IBPS PO',
      offerBody: 'Topic-wise lessons and practice across Reasoning, Quantitative Aptitude and English, sectional tests by subject, full-length mock tests in the real pattern with negative marking, a Mistake Notebook that tracks your weak topics automatically, and dated current-affairs capsules for Banking Awareness — all free, with no paywalled content.',
      sourceHeading: 'Official source & latest updates',
      officialLinkLabel: 'IBPS PO/MT — official CRP page',
      examNoticesLinkLabel: 'Latest admit card, result and deadline alerts on Pariksha Saathi',
      ctaLabel: 'Start studying IBPS PO free',
      backLabel: 'Home',
      disclaimer: 'Pariksha Saathi is an independent project and is not affiliated with IBPS or any government body. Syllabus and pattern details above are general and may change — always confirm against the official notification linked above.',
    },
    hi: {
      pageTitle: 'IBPS PO सिलेबस और परीक्षा पैटर्न',
      lede: 'IBPS PO (प्रोबेशनरी ऑफिसर/मैनेजमेंट ट्रेनी) तीन चरणों में आयोजित होती है। यहां इसकी स्थिर संरचना दी गई है, साथ ही आधिकारिक IBPS पेज का लिंक भी जहां से इस चक्र के सटीक अंक और समय मिलेंगे।',
      stagesHeading: 'चरण',
      stages: [
        { name: 'प्रारंभिक परीक्षा', body: 'तर्कशक्ति, मात्रात्मक अभियोग्यता और अंग्रेजी पर आधारित एक स्क्रीनिंग-स्तरीय कंप्यूटर-आधारित परीक्षा — इसे पास करने पर ही आप मुख्य परीक्षा तक पहुंचते हैं।' },
        { name: 'मुख्य परीक्षा', body: 'तर्कशक्ति एवं कंप्यूटर अभियोग्यता, मात्रात्मक अभियोग्यता, अंग्रेजी, और सामान्य/बैंकिंग/अर्थव्यवस्था जागरूकता को कवर करने वाली एक अधिक गहन कंप्यूटर-आधारित परीक्षा।' },
        { name: 'साक्षात्कार', body: 'मुख्य परीक्षा पास करने वाले उम्मीदवारों को अंतिम मेरिट सूची और बैंक आवंटन से पहले साक्षात्कार के लिए बुलाया जाता है।' },
      ],
      subjectsHeading: 'क्या परखा जाता है',
      subjects: [
        { name: 'तर्कशक्ति (मुख्य में कंप्यूटर अभियोग्यता सहित)', body: 'पहेलियां, बैठक व्यवस्था, न्यायवाक्य, कोडिंग-डिकोडिंग, असमानताएं, और मुख्य परीक्षा चरण में मूल कंप्यूटर-अभियोग्यता विषय।' },
        { name: 'मात्रात्मक अभियोग्यता', body: 'संख्या श्रृंखला, सरलीकरण, द्विघात समीकरण, डेटा इंटरप्रिटेशन, और अंकगणितीय शब्द समस्याएं।' },
        { name: 'अंग्रेजी भाषा', body: 'गद्यांश बोधगम्यता, क्लोज़ टेस्ट, त्रुटि पहचान, वाक्य पुनर्व्यवस्था, और शब्दावली।' },
        { name: 'सामान्य/बैंकिंग/अर्थव्यवस्था जागरूकता', body: 'बैंकिंग शब्दावली और विनियम, वित्तीय एवं आर्थिक करेंट अफेयर्स, और क्षेत्र से जुड़ा सामान्य स्थैतिक ज्ञान।' },
      ],
      note: 'प्रश्नों की सटीक संख्या, प्रति प्रश्न अंक, खंड-वार समय और नेगेटिव मार्किंग का अनुपात हर चक्र की अपनी आधिकारिक अधिसूचना द्वारा तय किया जाता है और चक्रों के बीच बदल सकता है। ऊपर दिए गए विषयों को अध्ययन के लिए स्थिर आधार मानें, और देखें',
      noteLinkLabel: 'IBPS का अपना PO/MT पेज',
      recruitsHeading: 'IBPS PO किसके लिए भर्ती करता है',
      recruitsBody: 'IBPS PO कई सार्वजनिक क्षेत्र के बैंकों के समूह में प्रोबेशनरी ऑफिसर/मैनेजमेंट ट्रेनी की भर्ती करता है — आवंटन तक आपको पता नहीं होता कि कौन सा बैंक मिलेगा। यह SBI की अपनी प्रक्रिया से वास्तव में कैसे अलग है, यह जानने के लिए हमारी IBPS PO बनाम SBI PO तुलना देखें।',
      offerHeading: 'Pariksha Saathi IBPS PO के लिए क्या देता है',
      offerBody: 'तर्कशक्ति, मात्रात्मक अभियोग्यता और अंग्रेजी में विषयवार पाठ और अभ्यास, विषयवार सेक्शनल टेस्ट, नेगेटिव मार्किंग के साथ वास्तविक पैटर्न में फुल-लेंथ मॉक टेस्ट, एक मिस्टेक नोटबुक जो आपके कमजोर विषयों को अपने आप ट्रैक करती है, और बैंकिंग जागरूकता के लिए दिनांकित करेंट अफेयर्स कैप्सूल — यह सब मुफ्त है, बिना किसी पेवॉल्ड कंटेंट के।',
      sourceHeading: 'आधिकारिक स्रोत और नवीनतम अपडेट',
      officialLinkLabel: 'IBPS PO/MT — आधिकारिक CRP पेज',
      examNoticesLinkLabel: 'Pariksha Saathi पर नवीनतम एडमिट कार्ड, परिणाम और डेडलाइन अलर्ट',
      ctaLabel: 'IBPS PO की मुफ्त पढ़ाई शुरू करें',
      backLabel: 'होम',
      disclaimer: 'Pariksha Saathi एक स्वतंत्र परियोजना है और IBPS या किसी भी सरकारी निकाय से संबद्ध नहीं है। ऊपर दिए गए सिलेबस और पैटर्न विवरण सामान्य हैं और बदल सकते हैं — हमेशा ऊपर दी गई आधिकारिक अधिसूचना से पुष्टि करें।',
    },
  },
  {
    slug: 'ibps-clerk',
    examName: 'IBPS Clerk',
    officialUrl: 'https://www.ibps.in/index.php/clerical-cadre-xvi/',
    en: {
      pageTitle: 'IBPS Clerk Syllabus & Exam Pattern',
      lede: 'IBPS Clerk (Customer Service Associate) runs across two stages — no interview, unlike IBPS PO. Here’s the stable shape of it, with a link to the official IBPS page for this cycle’s exact marks and timing.',
      stagesHeading: 'The stages',
      stages: [
        { name: 'Preliminary exam', body: 'A screening-stage computer-based test across Reasoning, Numerical Ability and English — clearing it is what gets you to the Main exam.' },
        { name: 'Main exam', body: 'A more in-depth computer-based test covering Reasoning, Numerical Ability, English, General/Financial Awareness, and Computer Knowledge. Selection is based on the Main exam score directly — there’s no interview stage for Clerk.' },
      ],
      subjectsHeading: 'What’s tested',
      subjects: [
        { name: 'Reasoning', body: 'Puzzles, seating arrangement, syllogism, coding-decoding, and inequalities.' },
        { name: 'Numerical Ability', body: 'Number series, simplification, data interpretation, and arithmetic word problems.' },
        { name: 'English Language', body: 'Reading comprehension, cloze test, error spotting, sentence rearrangement, and vocabulary.' },
        { name: 'General / Financial Awareness & Computer Knowledge', body: 'Banking terms, financial current affairs, general static GK, and basic computer-knowledge questions at the Mains stage.' },
      ],
      note: 'Exact number of questions, marks per question, section-wise timing and the negative-marking fraction are set by each cycle’s own official notification and can change between cycles. Treat the subjects above as the stable shape to study toward, and check',
      noteLinkLabel: 'IBPS’s own Clerical Cadre page',
      recruitsHeading: 'Who IBPS Clerk recruits for',
      recruitsBody: 'IBPS Clerk recruits Customer Service Associates / Clerks across the same group of participating public sector banks as IBPS PO, with allotment decided after selection.',
      offerHeading: 'What Pariksha Saathi offers for IBPS Clerk',
      offerBody: 'Topic-wise lessons and practice across Reasoning, Numerical Ability and English, sectional tests by subject, full-length mock tests in the real pattern with negative marking, a Mistake Notebook that tracks your weak topics automatically, and dated current-affairs capsules for Banking Awareness — all free, with no paywalled content.',
      sourceHeading: 'Official source & latest updates',
      officialLinkLabel: 'IBPS Clerical Cadre — official CRP page',
      examNoticesLinkLabel: 'Latest admit card, result and deadline alerts on Pariksha Saathi',
      ctaLabel: 'Start studying IBPS Clerk free',
      backLabel: 'Home',
      disclaimer: 'Pariksha Saathi is an independent project and is not affiliated with IBPS or any government body. Syllabus and pattern details above are general and may change — always confirm against the official notification linked above.',
    },
    hi: {
      pageTitle: 'IBPS क्लर्क सिलेबस और परीक्षा पैटर्न',
      lede: 'IBPS क्लर्क (कस्टमर सर्विस एसोसिएट) दो चरणों में आयोजित होती है — IBPS PO के विपरीत, इसमें कोई साक्षात्कार नहीं होता। यहां इसकी स्थिर संरचना दी गई है, साथ ही आधिकारिक IBPS पेज का लिंक भी जहां से इस चक्र के सटीक अंक और समय मिलेंगे।',
      stagesHeading: 'चरण',
      stages: [
        { name: 'प्रारंभिक परीक्षा', body: 'तर्कशक्ति, संख्यात्मक अभियोग्यता और अंग्रेजी पर आधारित एक स्क्रीनिंग-स्तरीय कंप्यूटर-आधारित परीक्षा — इसे पास करने पर ही आप मुख्य परीक्षा तक पहुंचते हैं।' },
        { name: 'मुख्य परीक्षा', body: 'तर्कशक्ति, संख्यात्मक अभियोग्यता, अंग्रेजी, सामान्य/वित्तीय जागरूकता, और कंप्यूटर ज्ञान को कवर करने वाली एक अधिक गहन कंप्यूटर-आधारित परीक्षा। चयन सीधे मुख्य परीक्षा के अंकों पर आधारित होता है — क्लर्क के लिए कोई साक्षात्कार चरण नहीं है।' },
      ],
      subjectsHeading: 'क्या परखा जाता है',
      subjects: [
        { name: 'तर्कशक्ति', body: 'पहेलियां, बैठक व्यवस्था, न्यायवाक्य, कोडिंग-डिकोडिंग, और असमानताएं।' },
        { name: 'संख्यात्मक अभियोग्यता', body: 'संख्या श्रृंखला, सरलीकरण, डेटा इंटरप्रिटेशन, और अंकगणितीय शब्द समस्याएं।' },
        { name: 'अंग्रेजी भाषा', body: 'गद्यांश बोधगम्यता, क्लोज़ टेस्ट, त्रुटि पहचान, वाक्य पुनर्व्यवस्था, और शब्दावली।' },
        { name: 'सामान्य/वित्तीय जागरूकता एवं कंप्यूटर ज्ञान', body: 'बैंकिंग शब्दावली, वित्तीय करेंट अफेयर्स, सामान्य स्थैतिक ज्ञान, और मुख्य परीक्षा चरण में मूल कंप्यूटर-ज्ञान प्रश्न।' },
      ],
      note: 'प्रश्नों की सटीक संख्या, प्रति प्रश्न अंक, खंड-वार समय और नेगेटिव मार्किंग का अनुपात हर चक्र की अपनी आधिकारिक अधिसूचना द्वारा तय किया जाता है और चक्रों के बीच बदल सकता है। ऊपर दिए गए विषयों को अध्ययन के लिए स्थिर आधार मानें, और देखें',
      noteLinkLabel: 'IBPS का अपना क्लेरिकल कैडर पेज',
      recruitsHeading: 'IBPS क्लर्क किसके लिए भर्ती करता है',
      recruitsBody: 'IBPS क्लर्क उसी सार्वजनिक क्षेत्र के बैंकों के समूह में कस्टमर सर्विस एसोसिएट/क्लर्क की भर्ती करता है जो IBPS PO के लिए है, जिसमें चयन के बाद आवंटन तय होता है।',
      offerHeading: 'Pariksha Saathi IBPS क्लर्क के लिए क्या देता है',
      offerBody: 'तर्कशक्ति, संख्यात्मक अभियोग्यता और अंग्रेजी में विषयवार पाठ और अभ्यास, विषयवार सेक्शनल टेस्ट, नेगेटिव मार्किंग के साथ वास्तविक पैटर्न में फुल-लेंथ मॉक टेस्ट, एक मिस्टेक नोटबुक जो आपके कमजोर विषयों को अपने आप ट्रैक करती है, और बैंकिंग जागरूकता के लिए दिनांकित करेंट अफेयर्स कैप्सूल — यह सब मुफ्त है, बिना किसी पेवॉल्ड कंटेंट के।',
      sourceHeading: 'आधिकारिक स्रोत और नवीनतम अपडेट',
      officialLinkLabel: 'IBPS क्लेरिकल कैडर — आधिकारिक CRP पेज',
      examNoticesLinkLabel: 'Pariksha Saathi पर नवीनतम एडमिट कार्ड, परिणाम और डेडलाइन अलर्ट',
      ctaLabel: 'IBPS क्लर्क की मुफ्त पढ़ाई शुरू करें',
      backLabel: 'होम',
      disclaimer: 'Pariksha Saathi एक स्वतंत्र परियोजना है और IBPS या किसी भी सरकारी निकाय से संबद्ध नहीं है। ऊपर दिए गए सिलेबस और पैटर्न विवरण सामान्य हैं और बदल सकते हैं — हमेशा ऊपर दी गई आधिकारिक अधिसूचना से पुष्टि करें।',
    },
  },
  {
    slug: 'sbi-po',
    examName: 'SBI PO',
    officialUrl: 'https://sbi.bank.in/web/careers/current-openings',
    en: {
      pageTitle: 'SBI PO Syllabus & Exam Pattern',
      lede: 'SBI PO (Probationary Officer) runs across three stages, specifically for State Bank of India. Here’s the stable shape of it, with a link to the official SBI careers page for this cycle’s exact marks and timing.',
      stagesHeading: 'The stages',
      stages: [
        { name: 'Preliminary exam', body: 'A screening-stage computer-based test across Reasoning, Quantitative Aptitude and English — clearing it is what gets you to the Main exam.' },
        { name: 'Main exam', body: 'A more in-depth computer-based test covering Reasoning & Computer Aptitude, Data Analysis & Interpretation, General/Economy/Banking Awareness, and English — plus a descriptive paper (essay and letter writing).' },
        { name: 'Group Exercise & Interview', body: 'Candidates who clear the Main exam go through a Group Exercise and Interview before the final merit list.' },
      ],
      subjectsHeading: 'What’s tested',
      subjects: [
        { name: 'Reasoning & Computer Aptitude', body: 'Puzzles, seating arrangement, syllogism, coding-decoding, inequalities, and basic computer-aptitude topics.' },
        { name: 'Quantitative Aptitude / Data Analysis', body: 'Number series, simplification, data interpretation, data sufficiency, and arithmetic word problems.' },
        { name: 'English Language', body: 'Reading comprehension, cloze test, error spotting, sentence rearrangement, vocabulary, plus a descriptive essay/letter-writing component at Mains.' },
        { name: 'General / Economy / Banking Awareness', body: 'Banking terms and regulations, economic and financial current affairs, and general static GK relevant to the sector.' },
      ],
      note: 'Exact number of questions, marks per question, section-wise timing and the negative-marking fraction are set by each cycle’s own official notification and can change between cycles. Treat the subjects above as the stable shape to study toward, and check',
      noteLinkLabel: 'SBI’s own careers page',
      recruitsHeading: 'Who SBI PO recruits for',
      recruitsBody: 'SBI PO recruits Probationary Officers specifically for State Bank of India — you know which bank you’re joining before you even apply. See our IBPS PO vs SBI PO comparison for how that differs from the IBPS-run process.',
      offerHeading: 'What Pariksha Saathi offers for SBI PO',
      offerBody: 'Topic-wise lessons and practice across Reasoning, Quantitative Aptitude and English, sectional tests by subject, full-length mock tests in the real pattern with negative marking, a Mistake Notebook that tracks your weak topics automatically, and dated current-affairs capsules for Banking & Economy Awareness — all free, with no paywalled content.',
      sourceHeading: 'Official source & latest updates',
      officialLinkLabel: 'SBI — official careers page',
      examNoticesLinkLabel: 'Latest admit card, result and deadline alerts on Pariksha Saathi',
      ctaLabel: 'Start studying SBI PO free',
      backLabel: 'Home',
      disclaimer: 'Pariksha Saathi is an independent project and is not affiliated with SBI or any government body. Syllabus and pattern details above are general and may change — always confirm against the official notification linked above.',
    },
    hi: {
      pageTitle: 'SBI PO सिलेबस और परीक्षा पैटर्न',
      lede: 'SBI PO (प्रोबेशनरी ऑफिसर) तीन चरणों में आयोजित होती है, जो विशेष रूप से भारतीय स्टेट बैंक के लिए है। यहां इसकी स्थिर संरचना दी गई है, साथ ही आधिकारिक SBI करियर पेज का लिंक भी जहां से इस चक्र के सटीक अंक और समय मिलेंगे।',
      stagesHeading: 'चरण',
      stages: [
        { name: 'प्रारंभिक परीक्षा', body: 'तर्कशक्ति, मात्रात्मक अभियोग्यता और अंग्रेजी पर आधारित एक स्क्रीनिंग-स्तरीय कंप्यूटर-आधारित परीक्षा — इसे पास करने पर ही आप मुख्य परीक्षा तक पहुंचते हैं।' },
        { name: 'मुख्य परीक्षा', body: 'तर्कशक्ति एवं कंप्यूटर अभियोग्यता, डेटा विश्लेषण एवं इंटरप्रिटेशन, सामान्य/अर्थव्यवस्था/बैंकिंग जागरूकता, और अंग्रेजी को कवर करने वाली एक अधिक गहन कंप्यूटर-आधारित परीक्षा — साथ ही एक वर्णनात्मक प्रश्नपत्र (निबंध और पत्र लेखन)।' },
        { name: 'ग्रुप एक्सरसाइज एवं साक्षात्कार', body: 'मुख्य परीक्षा पास करने वाले उम्मीदवार अंतिम मेरिट सूची से पहले ग्रुप एक्सरसाइज और साक्षात्कार से गुजरते हैं।' },
      ],
      subjectsHeading: 'क्या परखा जाता है',
      subjects: [
        { name: 'तर्कशक्ति एवं कंप्यूटर अभियोग्यता', body: 'पहेलियां, बैठक व्यवस्था, न्यायवाक्य, कोडिंग-डिकोडिंग, असमानताएं, और मूल कंप्यूटर-अभियोग्यता विषय।' },
        { name: 'मात्रात्मक अभियोग्यता/डेटा विश्लेषण', body: 'संख्या श्रृंखला, सरलीकरण, डेटा इंटरप्रिटेशन, डेटा पर्याप्तता, और अंकगणितीय शब्द समस्याएं।' },
        { name: 'अंग्रेजी भाषा', body: 'गद्यांश बोधगम्यता, क्लोज़ टेस्ट, त्रुटि पहचान, वाक्य पुनर्व्यवस्था, शब्दावली, साथ ही मुख्य परीक्षा में एक वर्णनात्मक निबंध/पत्र-लेखन भाग।' },
        { name: 'सामान्य/अर्थव्यवस्था/बैंकिंग जागरूकता', body: 'बैंकिंग शब्दावली और विनियम, आर्थिक एवं वित्तीय करेंट अफेयर्स, और क्षेत्र से जुड़ा सामान्य स्थैतिक ज्ञान।' },
      ],
      note: 'प्रश्नों की सटीक संख्या, प्रति प्रश्न अंक, खंड-वार समय और नेगेटिव मार्किंग का अनुपात हर चक्र की अपनी आधिकारिक अधिसूचना द्वारा तय किया जाता है और चक्रों के बीच बदल सकता है। ऊपर दिए गए विषयों को अध्ययन के लिए स्थिर आधार मानें, और देखें',
      noteLinkLabel: 'SBI का अपना करियर पेज',
      recruitsHeading: 'SBI PO किसके लिए भर्ती करता है',
      recruitsBody: 'SBI PO विशेष रूप से भारतीय स्टेट बैंक के लिए प्रोबेशनरी ऑफिसर की भर्ती करता है — आवेदन करने से पहले ही आपको पता होता है कि आप किस बैंक में शामिल हो रहे हैं। यह IBPS की प्रक्रिया से वास्तव में कैसे अलग है, यह जानने के लिए हमारी IBPS PO बनाम SBI PO तुलना देखें।',
      offerHeading: 'Pariksha Saathi SBI PO के लिए क्या देता है',
      offerBody: 'तर्कशक्ति, मात्रात्मक अभियोग्यता और अंग्रेजी में विषयवार पाठ और अभ्यास, विषयवार सेक्शनल टेस्ट, नेगेटिव मार्किंग के साथ वास्तविक पैटर्न में फुल-लेंथ मॉक टेस्ट, एक मिस्टेक नोटबुक जो आपके कमजोर विषयों को अपने आप ट्रैक करती है, और बैंकिंग एवं अर्थव्यवस्था जागरूकता के लिए दिनांकित करेंट अफेयर्स कैप्सूल — यह सब मुफ्त है, बिना किसी पेवॉल्ड कंटेंट के।',
      sourceHeading: 'आधिकारिक स्रोत और नवीनतम अपडेट',
      officialLinkLabel: 'SBI — आधिकारिक करियर पेज',
      examNoticesLinkLabel: 'Pariksha Saathi पर नवीनतम एडमिट कार्ड, परिणाम और डेडलाइन अलर्ट',
      ctaLabel: 'SBI PO की मुफ्त पढ़ाई शुरू करें',
      backLabel: 'होम',
      disclaimer: 'Pariksha Saathi एक स्वतंत्र परियोजना है और SBI या किसी भी सरकारी निकाय से संबद्ध नहीं है। ऊपर दिए गए सिलेबस और पैटर्न विवरण सामान्य हैं और बदल सकते हैं — हमेशा ऊपर दी गई आधिकारिक अधिसूचना से पुष्टि करें।',
    },
  },
  {
    slug: 'sbi-clerk',
    examName: 'SBI Clerk',
    officialUrl: 'https://sbi.bank.in/web/careers/current-openings',
    en: {
      pageTitle: 'SBI Clerk Syllabus & Exam Pattern',
      lede: 'SBI Clerk (Junior Associate) runs across two stages, specifically for State Bank of India — no interview. Here’s the stable shape of it, with a link to the official SBI careers page for this cycle’s exact marks and timing.',
      stagesHeading: 'The stages',
      stages: [
        { name: 'Preliminary exam', body: 'A screening-stage computer-based test across Reasoning, Numerical Ability and English — clearing it is what gets you to the Main exam.' },
        { name: 'Main exam', body: 'A more in-depth computer-based test covering General/Financial Awareness, General English, Quantitative Aptitude, and Reasoning Ability & Computer Aptitude. Selection is based on the Main exam score directly — there’s no interview stage for Clerk.' },
      ],
      subjectsHeading: 'What’s tested',
      subjects: [
        { name: 'Reasoning Ability & Computer Aptitude', body: 'Puzzles, seating arrangement, syllogism, coding-decoding, inequalities, and basic computer-aptitude topics at the Mains stage.' },
        { name: 'Numerical / Quantitative Aptitude', body: 'Number series, simplification, data interpretation, and arithmetic word problems.' },
        { name: 'English Language', body: 'Reading comprehension, cloze test, error spotting, sentence rearrangement, and vocabulary.' },
        { name: 'General / Financial Awareness', body: 'Banking terms, financial current affairs, and general static GK relevant to the sector.' },
      ],
      note: 'Exact number of questions, marks per question, section-wise timing and the negative-marking fraction are set by each cycle’s own official notification and can change between cycles. Treat the subjects above as the stable shape to study toward, and check',
      noteLinkLabel: 'SBI’s own careers page',
      recruitsHeading: 'Who SBI Clerk recruits for',
      recruitsBody: 'SBI Clerk recruits Junior Associates (Customer Support & Sales) specifically for State Bank of India.',
      offerHeading: 'What Pariksha Saathi offers for SBI Clerk',
      offerBody: 'Topic-wise lessons and practice across Reasoning, Numerical Ability and English, sectional tests by subject, full-length mock tests in the real pattern with negative marking, a Mistake Notebook that tracks your weak topics automatically, and dated current-affairs capsules for General Awareness — all free, with no paywalled content.',
      sourceHeading: 'Official source & latest updates',
      officialLinkLabel: 'SBI — official careers page',
      examNoticesLinkLabel: 'Latest admit card, result and deadline alerts on Pariksha Saathi',
      ctaLabel: 'Start studying SBI Clerk free',
      backLabel: 'Home',
      disclaimer: 'Pariksha Saathi is an independent project and is not affiliated with SBI or any government body. Syllabus and pattern details above are general and may change — always confirm against the official notification linked above.',
    },
    hi: {
      pageTitle: 'SBI क्लर्क सिलेबस और परीक्षा पैटर्न',
      lede: 'SBI क्लर्क (जूनियर एसोसिएट) दो चरणों में आयोजित होती है, जो विशेष रूप से भारतीय स्टेट बैंक के लिए है — इसमें कोई साक्षात्कार नहीं होता। यहां इसकी स्थिर संरचना दी गई है, साथ ही आधिकारिक SBI करियर पेज का लिंक भी जहां से इस चक्र के सटीक अंक और समय मिलेंगे।',
      stagesHeading: 'चरण',
      stages: [
        { name: 'प्रारंभिक परीक्षा', body: 'तर्कशक्ति, संख्यात्मक अभियोग्यता और अंग्रेजी पर आधारित एक स्क्रीनिंग-स्तरीय कंप्यूटर-आधारित परीक्षा — इसे पास करने पर ही आप मुख्य परीक्षा तक पहुंचते हैं।' },
        { name: 'मुख्य परीक्षा', body: 'सामान्य/वित्तीय जागरूकता, सामान्य अंग्रेजी, मात्रात्मक अभियोग्यता, और तर्कशक्ति एवं कंप्यूटर अभियोग्यता को कवर करने वाली एक अधिक गहन कंप्यूटर-आधारित परीक्षा। चयन सीधे मुख्य परीक्षा के अंकों पर आधारित होता है — क्लर्क के लिए कोई साक्षात्कार चरण नहीं है।' },
      ],
      subjectsHeading: 'क्या परखा जाता है',
      subjects: [
        { name: 'तर्कशक्ति एवं कंप्यूटर अभियोग्यता', body: 'पहेलियां, बैठक व्यवस्था, न्यायवाक्य, कोडिंग-डिकोडिंग, असमानताएं, और मुख्य परीक्षा चरण में मूल कंप्यूटर-अभियोग्यता विषय।' },
        { name: 'संख्यात्मक/मात्रात्मक अभियोग्यता', body: 'संख्या श्रृंखला, सरलीकरण, डेटा इंटरप्रिटेशन, और अंकगणितीय शब्द समस्याएं।' },
        { name: 'अंग्रेजी भाषा', body: 'गद्यांश बोधगम्यता, क्लोज़ टेस्ट, त्रुटि पहचान, वाक्य पुनर्व्यवस्था, और शब्दावली।' },
        { name: 'सामान्य/वित्तीय जागरूकता', body: 'बैंकिंग शब्दावली, वित्तीय करेंट अफेयर्स, और क्षेत्र से जुड़ा सामान्य स्थैतिक ज्ञान।' },
      ],
      note: 'प्रश्नों की सटीक संख्या, प्रति प्रश्न अंक, खंड-वार समय और नेगेटिव मार्किंग का अनुपात हर चक्र की अपनी आधिकारिक अधिसूचना द्वारा तय किया जाता है और चक्रों के बीच बदल सकता है। ऊपर दिए गए विषयों को अध्ययन के लिए स्थिर आधार मानें, और देखें',
      noteLinkLabel: 'SBI का अपना करियर पेज',
      recruitsHeading: 'SBI क्लर्क किसके लिए भर्ती करता है',
      recruitsBody: 'SBI क्लर्क विशेष रूप से भारतीय स्टेट बैंक के लिए जूनियर एसोसिएट (कस्टमर सपोर्ट एंड सेल्स) की भर्ती करता है।',
      offerHeading: 'Pariksha Saathi SBI क्लर्क के लिए क्या देता है',
      offerBody: 'तर्कशक्ति, संख्यात्मक अभियोग्यता और अंग्रेजी में विषयवार पाठ और अभ्यास, विषयवार सेक्शनल टेस्ट, नेगेटिव मार्किंग के साथ वास्तविक पैटर्न में फुल-लेंथ मॉक टेस्ट, एक मिस्टेक नोटबुक जो आपके कमजोर विषयों को अपने आप ट्रैक करती है, और सामान्य जागरूकता के लिए दिनांकित करेंट अफेयर्स कैप्सूल — यह सब मुफ्त है, बिना किसी पेवॉल्ड कंटेंट के।',
      sourceHeading: 'आधिकारिक स्रोत और नवीनतम अपडेट',
      officialLinkLabel: 'SBI — आधिकारिक करियर पेज',
      examNoticesLinkLabel: 'Pariksha Saathi पर नवीनतम एडमिट कार्ड, परिणाम और डेडलाइन अलर्ट',
      ctaLabel: 'SBI क्लर्क की मुफ्त पढ़ाई शुरू करें',
      backLabel: 'होम',
      disclaimer: 'Pariksha Saathi एक स्वतंत्र परियोजना है और SBI या किसी भी सरकारी निकाय से संबद्ध नहीं है। ऊपर दिए गए सिलेबस और पैटर्न विवरण सामान्य हैं और बदल सकते हैं — हमेशा ऊपर दी गई आधिकारिक अधिसूचना से पुष्टि करें।',
    },
  },
];

export function findSyllabusEntry(slug: string): ExamSyllabusEntry | undefined {
  return EXAM_SYLLABI.find((e) => e.slug === slug);
}
