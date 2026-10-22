// Content for the /compare/:slug-syllabus pages, in English and Hindi. Structural facts only
// (tiers/stages, broad subjects tested) - never exact marks, question counts or timing, since
// those are set per-cycle by each exam body's own notification and can change between cycles.
// Each page links to the real official source for that exam instead of asserting a number this
// file can't keep current. See src/pages/compare/SyllabusPage.tsx for how this renders.

export const EXAM_SYLLABI = [
  {
    slug: 'ssc-cgl',
    examName: 'SSC CGL',
    officialUrl: 'https://ssc.gov.in/api/attachment/uploads/masterData/NoticeBoards/Notice_of_adv_cgl_2026.pdf',
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
        { name: 'टियर-I', body: 'एक ही कंप्यूटर-आधारित परीक्षा जिसमें चार खंड होते हैं: सामान्य बुद्धिमत्ता एवं तर्कशक्ति, सामान्य जागरूकता, मात्रात्मक अभियोग्यता, और अंग्रेजी बोधगम्यता। यह अर्हक/स्क्रीनिंग चरण है — इसे पास करने पर ही आप टियर-II तक पहुंचते हैं।' },
        { name: 'टियर-II', body: 'टियर-I पास करने वाले अभ्यर्थियों के लिए एक और कंप्यूटर-आधारित परीक्षा, जो उन्हीं व्यापक विषयों को गहराई से परखती है, साथ ही आपके लिए पात्र पदों से जुड़े किसी भी भूमिका-विशिष्ट प्रश्नपत्र के साथ।' },
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
        { name: 'PET/PST (केवल हवलदार पद)', body: 'CBIC और CBN में हवलदार पद के लिए आवेदन करने वाले अभ्यर्थियों को अतिरिक्त रूप से शारीरिक दक्षता परीक्षण और शारीरिक मानक परीक्षण से गुजरना होता है — सामान्य MTS पद के लिए यह आवश्यक नहीं है।' },
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
      recruitsBody: 'CHSL fills Group C posts that require a 12th-pass qualification in central government ministries, departments and offices: Lower Division Clerk / Junior Secretariat Assistant, Data Entry Operator and Data Entry Operator Grade ‘A’ in the 2026 notice.',
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
        { name: 'टियर-I', body: 'नीचे दिए गए उन्हीं चार व्यापक विषयों पर एक कंप्यूटर-आधारित अर्हक परीक्षा। इसे पास करने पर ही आप टियर-II तक पहुंचते हैं।' },
        { name: 'टियर-II', body: 'टियर-I पास करने वाले अभ्यर्थियों के लिए एक और कंप्यूटर-आधारित परीक्षा। कुछ पदों (जैसे डेटा एंट्री ऑपरेटर) के लिए समग्र चयन प्रक्रिया के हिस्से के रूप में एक स्किल या टाइपिंग टेस्ट भी आवश्यक होता है।' },
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
      recruitsBody: 'CHSL केंद्र सरकार के मंत्रालयों, विभागों और कार्यालयों में 12वीं पास योग्यता वाले ग्रुप C पद भरता है: 2026 की अधिसूचना में लोअर डिवीजन क्लर्क / जूनियर सचिवालय सहायक, डेटा एंट्री ऑपरेटर और डेटा एंट्री ऑपरेटर ग्रेड ‘A’।',
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
        { name: 'साक्षात्कार', body: 'मुख्य परीक्षा पास करने वाले अभ्यर्थियों को अंतिम मेरिट सूची और बैंक आवंटन से पहले साक्षात्कार के लिए बुलाया जाता है।' },
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
        { name: 'ग्रुप एक्सरसाइज एवं साक्षात्कार', body: 'मुख्य परीक्षा पास करने वाले अभ्यर्थी अंतिम मेरिट सूची से पहले ग्रुप एक्सरसाइज और साक्षात्कार से गुजरते हैं।' },
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
  {
    "slug": "ssc-gd",
    "examName": "SSC GD Constable",
    "officialUrl": "https://ssc.gov.in/api/attachment/uploads/masterData/NoticeBoards/Notice_of_CTGD_2026.pdf",
    "en": {
      "pageTitle": "SSC GD Constable Syllabus & Exam Pattern",
      "lede": "SSC GD (Constable General Duty in the Central Armed Police Forces and SSF, and Rifleman GD in Assam Rifles) selects in stages: a computer-based exam, then physical tests, then a medical examination and document verification. Here’s the shape of it, taken from the SSC notice, with a link to the notice for this cycle’s exact marks and timing.",
      "stagesHeading": "The stages",
      "stages": [
        {
          "name": "Computer Based Examination (CBE)",
          "body": "One objective multiple-choice paper in four parts: General Intelligence and Reasoning, General Knowledge and General Awareness, Elementary Mathematics, and English or Hindi. Questions are of Matriculation level, and your CBE score (with any NCC bonus) decides who is shortlisted for the physical tests and the final merit."
        },
        {
          "name": "Physical Efficiency Test (PET) and Physical Standard Test (PST)",
          "body": "Held by the forces for candidates shortlisted from the CBE: a timed race (PET), and measurement of height, chest (men) and weight (PST). Standards differ for men and women, and some categories and regions get relaxations. The notice lists them."
        },
        {
          "name": "Medical examination and document verification",
          "body": "Candidates who clear the physical tests are examined by the forces’ medical boards and their original documents are verified. The final selection is by CBE merit, and forces are allotted by that merit and the preferences you filled in the application form."
        }
      ],
      "subjectsHeading": "What’s tested in the CBE",
      "subjects": [
        {
          "name": "General Intelligence and Reasoning",
          "body": "Mainly non-verbal questions: analogies, similarities and differences, spatial visualisation and orientation, visual memory, discrimination, observation, relationship concepts, arithmetical reasoning, figural classification, number series, non-verbal series, and coding-decoding."
        },
        {
          "name": "General Knowledge and General Awareness",
          "body": "Awareness of the environment around you, current events and everyday observation in their scientific aspect, plus India and its neighbouring countries: sports, history, culture, geography, the economic scene, general polity, the Indian Constitution and scientific research. No special study of any one discipline is needed."
        },
        {
          "name": "Elementary Mathematics",
          "body": "Number systems, computation with whole numbers, decimals and fractions, relationships between numbers, fundamental arithmetical operations, percentages, ratio and proportion, averages, interest, profit and loss, discount, mensuration, time and distance, and time and work."
        },
        {
          "name": "English / Hindi",
          "body": "Basic understanding of English or Hindi and basic comprehension."
        }
      ],
      "note": "The number of questions, marks, timing and negative marking are set by each cycle’s own SSC notice and can change from one cycle to the next. Treat the subjects above as the shape to study toward, and check",
      "noteLinkLabel": "the SSC notice for this cycle",
      "recruitsHeading": "What SSC GD recruits for",
      "recruitsBody": "Constable (GD) in the BSF, CISF, CRPF, SSB, ITBP and SSF (Secretariat Security Force), and Rifleman (GD) in Assam Rifles. The forces covered and the vacancies are set in each cycle’s own notice.",
      "offerHeading": "Study on Pariksha Saathi",
      "offerBody": "Free topic-wise lessons and practice for the subjects above, sectional tests by subject, full-length mock tests, a Mistake Notebook that tracks your weak topics automatically, and dated current-affairs capsules.",
      "sourceHeading": "Official source & latest updates",
      "officialLinkLabel": "SSC GD — official notice",
      "examNoticesLinkLabel": "Latest admit card, result and deadline alerts on Pariksha Saathi",
      "ctaLabel": "Start studying free",
      "backLabel": "Home",
      "disclaimer": "Pariksha Saathi is an independent project and is not affiliated with SSC or any government body. Syllabus and pattern details above are general and may change — always confirm against the official notice linked above."
    },
    "hi": {
      "pageTitle": "SSC GD कांस्टेबल सिलेबस और परीक्षा पैटर्न",
      "lede": "SSC GD (केंद्रीय सशस्त्र पुलिस बलों और SSF में कांस्टेबल (जनरल ड्यूटी) तथा असम राइफल्स में राइफलमैन (GD)) में चयन चरणों में होता है: पहले कंप्यूटर आधारित परीक्षा, फिर शारीरिक परीक्षाएँ, और उसके बाद चिकित्सा परीक्षा तथा दस्तावेज़ सत्यापन। यहाँ SSC की अधिसूचना के आधार पर इसका ढाँचा दिया गया है, साथ ही इस चक्र के सटीक अंक और समय के लिए अधिसूचना का लिंक भी।",
      "stagesHeading": "चरण",
      "stages": [
        {
          "name": "कंप्यूटर आधारित परीक्षा (CBE)",
          "body": "चार भागों वाला एक वस्तुनिष्ठ बहुविकल्पीय प्रश्नपत्र: सामान्य बुद्धिमत्ता एवं तर्कशक्ति, सामान्य ज्ञान एवं सामान्य जागरूकता, प्रारंभिक गणित, और अंग्रेजी या हिंदी। प्रश्न मैट्रिकुलेशन स्तर के होते हैं, और आपका CBE स्कोर (NCC बोनस हो तो उसके साथ) तय करता है कि शारीरिक परीक्षाओं के लिए कौन शॉर्टलिस्ट होगा और अंतिम मेरिट क्या बनेगी।"
        },
        {
          "name": "शारीरिक दक्षता परीक्षा (PET) और शारीरिक मानक परीक्षा (PST)",
          "body": "CBE से शॉर्टलिस्ट अभ्यर्थियों के लिए बलों द्वारा आयोजित: समयबद्ध दौड़ (PET), और ऊँचाई, छाती (पुरुष) व वज़न की माप (PST)। पुरुषों और महिलाओं के मानक अलग हैं, और कुछ श्रेणियों व क्षेत्रों को छूट मिलती है। अधिसूचना में इनकी सूची दी गई है।"
        },
        {
          "name": "चिकित्सा परीक्षा और दस्तावेज़ सत्यापन",
          "body": "शारीरिक परीक्षाओं में उत्तीर्ण अभ्यर्थियों की जाँच बलों के चिकित्सा बोर्ड करते हैं और उनके मूल दस्तावेज़ों का सत्यापन होता है। अंतिम चयन CBE मेरिट से होता है, और बल का आवंटन उसी मेरिट तथा आवेदन-पत्र में आपकी भरी हुई प्राथमिकताओं के अनुसार होता है।"
        }
      ],
      "subjectsHeading": "CBE में क्या परखा जाता है",
      "subjects": [
        {
          "name": "सामान्य बुद्धिमत्ता एवं तर्कशक्ति",
          "body": "मुख्यतः अशाब्दिक प्रश्न: सादृश्य, समानताएँ और अंतर, स्थानिक कल्पना और अभिविन्यास, दृश्य स्मृति, विभेदन, अवलोकन, संबंध-अवधारणाएँ, अंकगणितीय तर्क, आकृतिगत वर्गीकरण, संख्या श्रृंखला, अशाब्दिक श्रृंखला, और कोडिंग-डिकोडिंग।"
        },
        {
          "name": "सामान्य ज्ञान एवं सामान्य जागरूकता",
          "body": "आपके आसपास के परिवेश की जानकारी, समसामयिक घटनाएँ और रोज़मर्रा के अवलोकन का वैज्ञानिक पक्ष, साथ ही भारत और उसके पड़ोसी देश: खेल, इतिहास, संस्कृति, भूगोल, आर्थिक परिदृश्य, सामान्य राजव्यवस्था, भारतीय संविधान और वैज्ञानिक अनुसंधान। किसी एक विषय के विशेष अध्ययन की ज़रूरत नहीं है।"
        },
        {
          "name": "प्रारंभिक गणित",
          "body": "संख्या पद्धति, पूर्ण संख्याओं, दशमलव और भिन्नों की गणना, संख्याओं के आपसी संबंध, मूल अंकगणितीय संक्रियाएँ, प्रतिशत, अनुपात एवं समानुपात, औसत, ब्याज, लाभ-हानि, बट्टा, क्षेत्रमिति, समय और दूरी, तथा समय और कार्य।"
        },
        {
          "name": "अंग्रेजी / हिंदी",
          "body": "अंग्रेजी या हिंदी की बुनियादी समझ और बुनियादी बोधगम्यता।"
        }
      ],
      "note": "प्रश्नों की संख्या, अंक, समय और नेगेटिव मार्किंग हर चक्र की अपनी SSC अधिसूचना तय करती है और चक्रों के बीच बदल सकती है। ऊपर दिए विषयों को अध्ययन का आधार मानें, और देखें",
      "noteLinkLabel": "इस चक्र की SSC अधिसूचना",
      "recruitsHeading": "SSC GD किसके लिए भर्ती करता है",
      "recruitsBody": "BSF, CISF, CRPF, SSB, ITBP और SSF (सचिवालय सुरक्षा बल) में कांस्टेबल (GD), तथा असम राइफल्स में राइफलमैन (GD)। कौन-से बल शामिल हैं और कितनी रिक्तियाँ हैं, यह हर चक्र की अपनी अधिसूचना में तय होता है।",
      "offerHeading": "Pariksha Saathi पर पढ़ाई",
      "offerBody": "ऊपर दिए विषयों के लिए मुफ्त विषयवार पाठ और अभ्यास, विषयवार सेक्शनल टेस्ट, पूर्ण-लंबाई मॉक टेस्ट, आपके कमज़ोर विषयों को अपने-आप ट्रैक करने वाली Mistake Notebook, और तारीख़वार करंट अफेयर्स कैप्सूल।",
      "sourceHeading": "आधिकारिक स्रोत और नवीनतम अपडेट",
      "officialLinkLabel": "SSC GD — आधिकारिक अधिसूचना",
      "examNoticesLinkLabel": "Pariksha Saathi पर नवीनतम एडमिट कार्ड, परिणाम और डेडलाइन अलर्ट",
      "ctaLabel": "मुफ्त पढ़ाई शुरू करें",
      "backLabel": "होम",
      "disclaimer": "Pariksha Saathi एक स्वतंत्र परियोजना है और SSC या किसी भी सरकारी निकाय से संबद्ध नहीं है। ऊपर दिए गए सिलेबस और पैटर्न विवरण सामान्य हैं और बदल सकते हैं — हमेशा ऊपर दी गई आधिकारिक अधिसूचना से पुष्टि करें।"
    }
  },
  {
    "slug": "ctet",
    "examName": "CTET",
    "officialUrl": "https://ctet.nic.in/",
    "en": {
      "pageTitle": "CTET Syllabus & Exam Pattern",
      "lede": "CTET (Central Teacher Eligibility Test, conducted by CBSE) is a written test in two papers: Paper I for teachers of classes I to V and Paper II for teachers of classes VI to VIII. Here’s the shape of it and the topics tested, taken from the CTET information bulletin, with a link to the official CTET website for the current bulletin, with the exact marks and timing.",
      "stagesHeading": "The papers",
      "stages": [
        {
          "name": "Paper I (classes I to V)",
          "body": "For a person who intends to be a teacher for classes I to V. Five compulsory sections: Child Development and Pedagogy, Mathematics, Environmental Studies, Language I and Language II."
        },
        {
          "name": "Paper II (classes VI to VIII)",
          "body": "For a person who intends to be a teacher for classes VI to VIII. Compulsory sections are Child Development and Pedagogy, Language I and Language II, plus either Mathematics and Science (for Mathematics and Science teachers) or Social Studies/Social Science (for Social Studies/Social Science teachers). Any other teacher can take either one."
        },
        {
          "name": "Both papers",
          "body": "A person who wants to teach both levels, classes I to V and classes VI to VIII, appears in both Paper I and Paper II."
        }
      ],
      "subjectsHeading": "What’s tested",
      "subjects": [
        {
          "name": "Child Development and Pedagogy",
          "body": "Child development (concept of development and learning, principles of development, heredity and environment, socialisation, Piaget, Kohlberg and Vygotsky, child-centred and progressive education, intelligence and multi-dimensional intelligence, language and thought, gender, individual differences, assessment for and of learning, CCE), inclusive education and children with special needs, and learning and pedagogy (how children think and learn, errors as steps in learning, cognition and emotions, motivation, factors that affect learning). Aimed at the 6-11 age group for Paper I and the 11-14 age group for Paper II."
        },
        {
          "name": "Mathematics (Paper I)",
          "body": "Content: geometry, shapes and spatial understanding, solids around us, numbers, addition and subtraction, multiplication, division, measurement, weight, time, volume, data handling, patterns and money. Pedagogical issues: nature of mathematics and logical thinking, place of mathematics in the curriculum, language of mathematics, community mathematics, evaluation, problems of teaching, error analysis, and diagnostic and remedial teaching."
        },
        {
          "name": "Environmental Studies (Paper I)",
          "body": "Content: family and friends (relationships, work and play, animals, plants), food, shelter, water, travel, and things we make and do. Pedagogical issues: concept and scope of EVS, integrated EVS, learning principles, relation to Science and Social Science, approaches, activities, experimentation and practical work, discussion, CCE, teaching aids and problems of teaching."
        },
        {
          "name": "Mathematics and Science (Paper II)",
          "body": "Mathematics: number system, algebra, geometry, mensuration and data handling, with pedagogical issues. Science: food, materials, the world of the living, moving things, people and ideas, how things work (electric current and circuits, magnets), natural phenomena and natural resources, with pedagogical issues such as the nature of science, approaches, experiments, aids and evaluation."
        },
        {
          "name": "Social Studies/Social Science (Paper II)",
          "body": "Content from History (from the earliest societies to India after independence), Geography (the earth in the solar system, the globe, air, water, human environment, resources, agriculture) and Social and Political Life (diversity, government, democracy, the Constitution, the judiciary, social justice and the marginalised), plus pedagogical issues such as classroom processes, critical thinking, enquiry, sources, project work and evaluation."
        },
        {
          "name": "Language I and Language II",
          "body": "Language comprehension (unseen passages with questions on comprehension, inference, grammar and verbal ability) and pedagogy of language development (learning and acquisition, principles of language teaching, listening and speaking, grammar, diverse classrooms, language skills, evaluation, teaching-learning materials and remedial teaching). Language I relates to the medium of instruction and Language II must be a different language; both are chosen from the languages listed in the bulletin."
        }
      ],
      "note": "Questions follow the NCERT syllabus for the relevant classes, and the bulletin points to the NCERT syllabus and textbooks for classes I to VIII for detail. The number of questions, marks, timing and the qualifying percentage are set in each CTET edition’s bulletin; check the information bulletin on",
      "noteLinkLabel": "the official CTET website",
      "recruitsHeading": "What CTET is for",
      "recruitsBody": "CTET does not recruit anyone. It is an eligibility test: the CTET certificate is one of the criteria for appointment as a teacher for classes I to VIII in schools where CTET applies. Qualifying does not give a right to recruitment or employment.",
      "offerHeading": "Study on Pariksha Saathi",
      "offerBody": "Free topic-wise lessons and practice for Child Development and Pedagogy, Language Pedagogy, Mathematics Pedagogy, EVS Pedagogy, Science and Social Studies Pedagogy and Inclusive Education, plus a Mistake Notebook that tracks your weak topics automatically.",
      "sourceHeading": "Official source & latest updates",
      "officialLinkLabel": "CTET — official website",
      "examNoticesLinkLabel": "Latest admit card, result and deadline alerts on Pariksha Saathi",
      "ctaLabel": "Start studying free",
      "backLabel": "Home",
      "disclaimer": "Pariksha Saathi is an independent project and is not affiliated with CBSE, NCTE or any government body. Syllabus and pattern details above are general and may change — always confirm against the official information bulletin on the CTET website linked above."
    },
    "hi": {
      "pageTitle": "CTET सिलेबस और परीक्षा पैटर्न",
      "lede": "CTET (केंद्रीय शिक्षक पात्रता परीक्षा, जिसे CBSE आयोजित करता है) दो पेपरों की लिखित परीक्षा है: पेपर I कक्षा I से V के शिक्षकों के लिए और पेपर II कक्षा VI से VIII के शिक्षकों के लिए। यहाँ CTET सूचना बुलेटिन के आधार पर इसका ढाँचा और परखे जाने वाले विषय दिए गए हैं, साथ ही मौजूदा बुलेटिन, यानी सटीक अंक और समय, के लिए आधिकारिक CTET वेबसाइट का लिंक भी।",
      "stagesHeading": "पेपर",
      "stages": [
        {
          "name": "पेपर I (कक्षा I से V)",
          "body": "कक्षा I से V के शिक्षक बनने के इच्छुक व्यक्ति के लिए। पाँच अनिवार्य खंड: बाल विकास एवं शिक्षाशास्त्र, गणित, पर्यावरण अध्ययन, भाषा I और भाषा II।"
        },
        {
          "name": "पेपर II (कक्षा VI से VIII)",
          "body": "कक्षा VI से VIII के शिक्षक बनने के इच्छुक व्यक्ति के लिए। अनिवार्य खंड हैं बाल विकास एवं शिक्षाशास्त्र, भाषा I और भाषा II, और इनके साथ या तो गणित और विज्ञान (गणित और विज्ञान के शिक्षकों के लिए) या सामाजिक अध्ययन/सामाजिक विज्ञान (सामाजिक अध्ययन/सामाजिक विज्ञान के शिक्षकों के लिए)। किसी अन्य विषय का शिक्षक दोनों में से कोई एक ले सकता है।"
        },
        {
          "name": "दोनों पेपर",
          "body": "जो व्यक्ति दोनों स्तरों, कक्षा I से V और कक्षा VI से VIII, पर पढ़ाना चाहता है, वह पेपर I और पेपर II दोनों देता है।"
        }
      ],
      "subjectsHeading": "क्या परखा जाता है",
      "subjects": [
        {
          "name": "बाल विकास एवं शिक्षाशास्त्र",
          "body": "बाल विकास (विकास की अवधारणा और अधिगम से उसका संबंध, विकास के सिद्धांत, आनुवंशिकता और पर्यावरण, समाजीकरण, पियाजे, कोहलबर्ग और वाइगोत्स्की, बाल-केंद्रित और प्रगतिशील शिक्षा, बुद्धि और बहुआयामी बुद्धि, भाषा और चिंतन, जेंडर, व्यक्तिगत भिन्नताएँ, सीखने के लिए और सीखने का आकलन, CCE), समावेशी शिक्षा और विशेष आवश्यकता वाले बच्चे, तथा अधिगम और शिक्षाशास्त्र (बच्चे कैसे सोचते और सीखते हैं, त्रुटियाँ सीखने की सीढ़ी के रूप में, संज्ञान और भावनाएँ, अभिप्रेरणा, सीखने को प्रभावित करने वाले कारक)। पेपर I में 6-11 आयु वर्ग पर और पेपर II में 11-14 आयु वर्ग पर केंद्रित।"
        },
        {
          "name": "गणित (पेपर I)",
          "body": "विषयवस्तु: ज्यामिति, आकृतियाँ और स्थानिक समझ, हमारे आसपास के ठोस, संख्याएँ, जोड़ और घटाव, गुणा, भाग, मापन, भार, समय, आयतन, आँकड़ों का प्रबंधन, पैटर्न और मुद्रा। शिक्षण-संबंधी मुद्दे: गणित की प्रकृति और तार्किक चिंतन, पाठ्यक्रम में गणित का स्थान, गणित की भाषा, सामुदायिक गणित, मूल्यांकन, शिक्षण की समस्याएँ, त्रुटि विश्लेषण, तथा निदानात्मक और उपचारात्मक शिक्षण।"
        },
        {
          "name": "पर्यावरण अध्ययन (पेपर I)",
          "body": "विषयवस्तु: परिवार और मित्र (संबंध, कार्य और खेल, जानवर, पौधे), भोजन, आवास, जल, यात्रा, और हम जो बनाते और करते हैं। शिक्षण-संबंधी मुद्दे: पर्यावरण अध्ययन (EVS) की अवधारणा और दायरा, समेकित EVS, अधिगम के सिद्धांत, विज्ञान और सामाजिक विज्ञान से संबंध, उपागम, गतिविधियाँ, प्रयोग और प्रायोगिक कार्य, चर्चा, CCE, शिक्षण सामग्री और शिक्षण की समस्याएँ।"
        },
        {
          "name": "गणित और विज्ञान (पेपर II)",
          "body": "गणित: संख्या पद्धति, बीजगणित, ज्यामिति, क्षेत्रमिति और आँकड़ों का प्रबंधन, शिक्षण-संबंधी मुद्दों सहित। विज्ञान: भोजन, पदार्थ, जीवित जगत, गतिशील चीज़ें, लोग और विचार, चीज़ें कैसे काम करती हैं (विद्युत धारा और परिपथ, चुंबक), प्राकृतिक परिघटनाएँ और प्राकृतिक संसाधन, साथ ही विज्ञान की प्रकृति, उपागम, प्रयोग, शिक्षण सामग्री और मूल्यांकन जैसे शिक्षण-संबंधी मुद्दे।"
        },
        {
          "name": "सामाजिक अध्ययन/सामाजिक विज्ञान (पेपर II)",
          "body": "इतिहास (सबसे प्राचीन समाजों से स्वतंत्रता के बाद के भारत तक), भूगोल (सौरमंडल में पृथ्वी, ग्लोब, वायु, जल, मानव पर्यावरण, संसाधन, कृषि) और सामाजिक एवं राजनीतिक जीवन (विविधता, सरकार, लोकतंत्र, संविधान, न्यायपालिका, सामाजिक न्याय और हाशिये के समुदाय) की विषयवस्तु, साथ ही कक्षा की प्रक्रियाएँ, आलोचनात्मक चिंतन, जिज्ञासा-आधारित अध्ययन, स्रोत, परियोजना कार्य और मूल्यांकन जैसे शिक्षण-संबंधी मुद्दे।"
        },
        {
          "name": "भाषा I और भाषा II",
          "body": "भाषा बोधगम्यता (अपठित गद्यांशों पर बोध, अनुमान, व्याकरण और शाब्दिक योग्यता के प्रश्न) और भाषा विकास का शिक्षाशास्त्र (अधिगम और अर्जन, भाषा शिक्षण के सिद्धांत, सुनना और बोलना, व्याकरण, विविध कक्षाएँ, भाषा कौशल, मूल्यांकन, शिक्षण-अधिगम सामग्री और उपचारात्मक शिक्षण)। भाषा I शिक्षण के माध्यम से जुड़ी है और भाषा II उससे भिन्न भाषा होनी चाहिए; दोनों बुलेटिन में दी गई भाषाओं में से चुनी जाती हैं।"
        }
      ],
      "note": "प्रश्न संबंधित कक्षाओं के NCERT पाठ्यक्रम पर आधारित होते हैं, और विस्तृत पाठ्यक्रम के लिए बुलेटिन कक्षा I से VIII के NCERT पाठ्यक्रम और पाठ्यपुस्तकों को देखने को कहता है। प्रश्नों की संख्या, अंक, समय और अर्हक प्रतिशत हर CTET संस्करण के बुलेटिन में तय होते हैं। सूचना बुलेटिन के लिए देखें",
      "noteLinkLabel": "आधिकारिक CTET वेबसाइट",
      "recruitsHeading": "CTET किसलिए है",
      "recruitsBody": "CTET किसी की भर्ती नहीं करता। यह एक पात्रता परीक्षा है: CTET प्रमाण-पत्र उन विद्यालयों में कक्षा I से VIII के शिक्षक की नियुक्ति के मानदंडों में से एक है जहाँ CTET लागू होता है। उत्तीर्ण होने से भर्ती या रोज़गार का अधिकार नहीं मिलता।",
      "offerHeading": "Pariksha Saathi पर पढ़ाई",
      "offerBody": "बाल विकास एवं शिक्षाशास्त्र, भाषा शिक्षाशास्त्र, गणित शिक्षाशास्त्र, पर्यावरण अध्ययन (EVS) शिक्षाशास्त्र, विज्ञान एवं सामाजिक अध्ययन शिक्षाशास्त्र और समावेशी शिक्षा के लिए मुफ्त विषयवार पाठ और अभ्यास, साथ में आपके कमज़ोर विषयों को अपने-आप ट्रैक करने वाली Mistake Notebook।",
      "sourceHeading": "आधिकारिक स्रोत और नवीनतम अपडेट",
      "officialLinkLabel": "CTET — आधिकारिक वेबसाइट",
      "examNoticesLinkLabel": "Pariksha Saathi पर नवीनतम एडमिट कार्ड, परिणाम और डेडलाइन अलर्ट",
      "ctaLabel": "मुफ्त पढ़ाई शुरू करें",
      "backLabel": "होम",
      "disclaimer": "Pariksha Saathi एक स्वतंत्र परियोजना है और CBSE, NCTE या किसी भी सरकारी निकाय से संबद्ध नहीं है। ऊपर दिए गए सिलेबस और पैटर्न विवरण सामान्य हैं और बदल सकते हैं — हमेशा ऊपर दी गई CTET वेबसाइट पर उपलब्ध आधिकारिक सूचना बुलेटिन से पुष्टि करें।"
    }
  },
  {
    "slug": "rrb-ntpc",
    "examName": "RRB NTPC",
    "officialUrl": "https://rrb.indianrailways.gov.in/",
    "en": {
      "pageTitle": "RRB NTPC Syllabus & Exam Pattern",
      "lede": "RRB NTPC (Non-Technical Popular Categories) is run by the Railway Recruitment Boards as two computer-based tests, with one notification for graduate-level posts and another for 12th-level posts. Here’s the stable shape of it — what gets tested at each stage — with a link to the official RRB website for the current notification’s exact marks, timing and negative-marking details.",
      "stagesHeading": "The stages",
      "stages": [
        {
          "name": "CBT-1",
          "body": "A computer-based screening test, common to every post in the notification, on Mathematics, General Intelligence and Reasoning and General Awareness. Its marks are used to shortlist candidates for CBT-2."
        },
        {
          "name": "CBT-2",
          "body": "A second computer-based test on the same three subjects. Its marks decide who is called for document verification."
        },
        {
          "name": "Document verification and medical examination",
          "body": "Candidates shortlisted on CBT-2 are called for document verification, and appointment depends on passing the medical standard of the post they are allotted."
        },
        {
          "name": "Typing skill test",
          "body": "Earlier NTPC notifications used a computer-based typing skill test for typist posts. The October 2026 notifications (CEN 06/2026 and CEN 07/2026) have dispensed with it and say typing proficiency will be assessed after joining, so check each notification."
        }
      ],
      "subjectsHeading": "What’s tested",
      "subjects": [
        {
          "name": "Mathematics",
          "body": "Number system, decimals, fractions, LCM and HCF, ratio and proportion, percentage, mensuration, time and work, time and distance, simple and compound interest, profit and loss, elementary algebra, geometry and trigonometry, and elementary statistics."
        },
        {
          "name": "General Intelligence and Reasoning",
          "body": "Analogies, number and alphabetical series, coding and decoding, mathematical operations, similarities and differences, relationships, analytical reasoning, syllogism, jumbling, Venn diagrams, puzzles, data sufficiency, statement-conclusion, statement-courses of action, decision making, maps, and interpretation of graphs."
        },
        {
          "name": "General Awareness",
          "body": "Current events of national and international importance, games and sports, art and culture, Indian literature, monuments and places, general science and life science up to 10th (CBSE) level, history and the freedom struggle, physical, social and economic geography, Indian polity and governance, science and technology including space and nuclear programmes, the UN and other world organisations, environmental issues, basics of computers, common abbreviations, transport systems in India, the Indian economy, famous personalities, flagship government programmes, flora and fauna, and important government and public sector organisations."
        }
      ],
      "note": "The number of questions, marks, timing and negative-marking fraction are set by each cycle’s own notification and can change between cycles. Treat the subjects above as the stable shape to study toward, and check",
      "noteLinkLabel": "the official RRB website",
      "recruitsHeading": "What NTPC recruits for",
      "recruitsBody": "The October 2026 notifications cover graduate-level posts (Chief Commercial cum Ticket Supervisor, Goods Train Manager, Junior Accounts Assistant cum Typist, Senior Clerk cum Typist) in CEN 06/2026, and 12th-level posts (Commercial cum Ticket Clerk, Accounts Clerk cum Typist, Junior Clerk cum Typist, Trains Clerk) in CEN 07/2026.",
      "offerHeading": "What Pariksha Saathi offers for RRB NTPC",
      "offerBody": "Free topic-wise lessons and practice for the subjects above, sectional tests by subject, full-length mock tests, a Mistake Notebook that tracks your weak topics automatically, and dated current-affairs capsules.",
      "sourceHeading": "Official source & latest updates",
      "officialLinkLabel": "RRB — official website",
      "examNoticesLinkLabel": "Latest admit card, result and deadline alerts on Pariksha Saathi",
      "ctaLabel": "Start studying RRB NTPC free",
      "backLabel": "Home",
      "disclaimer": "Pariksha Saathi is an independent project and is not affiliated with the Railway Recruitment Boards or any government body. Syllabus and pattern details above are general and may change — always confirm against the official notification linked above."
    },
    "hi": {
      "pageTitle": "RRB NTPC सिलेबस और परीक्षा पैटर्न",
      "lede": "RRB NTPC (नॉन-टेक्निकल पॉपुलर कैटेगरी) की परीक्षा रेलवे भर्ती बोर्ड दो कंप्यूटर-आधारित परीक्षाओं के रूप में कराते हैं; स्नातक स्तर के पदों की अधिसूचना अलग होती है और 12वीं स्तर के पदों की अलग। यहां इसकी स्थिर संरचना दी गई है — हर चरण में क्या परखा जाता है — साथ ही आधिकारिक RRB वेबसाइट का लिंक भी, जहां मौजूदा अधिसूचना के सटीक अंक, समय और नेगेटिव मार्किंग मिलेंगे।",
      "stagesHeading": "चरण",
      "stages": [
        {
          "name": "CBT-1",
          "body": "अधिसूचना के सभी पदों के लिए एक समान कंप्यूटर-आधारित छंटनी परीक्षा, जो गणित, सामान्य बुद्धिमत्ता एवं तर्कशक्ति और सामान्य जागरूकता पर होती है। इसके अंकों से CBT-2 के लिए अभ्यर्थी चुने जाते हैं।"
        },
        {
          "name": "CBT-2",
          "body": "इन्हीं तीन विषयों पर दूसरी कंप्यूटर-आधारित परीक्षा। इसके अंक तय करते हैं कि दस्तावेज़ सत्यापन के लिए किसे बुलाया जाएगा।"
        },
        {
          "name": "दस्तावेज़ सत्यापन और चिकित्सा परीक्षा",
          "body": "CBT-2 के आधार पर चुने गए अभ्यर्थियों को दस्तावेज़ सत्यापन के लिए बुलाया जाता है, और नियुक्ति इस पर निर्भर करती है कि आवंटित पद का चिकित्सा मानक पूरा होता है या नहीं।"
        },
        {
          "name": "टाइपिंग स्किल टेस्ट",
          "body": "पहले की NTPC अधिसूचनाओं में टाइपिस्ट पदों के लिए कंप्यूटर-आधारित टाइपिंग स्किल टेस्ट होता था। अक्टूबर 2026 की अधिसूचनाओं (CEN 06/2026 और CEN 07/2026) में इसे समाप्त कर दिया गया है और कहा गया है कि टाइपिंग दक्षता का आकलन नियुक्ति के बाद होगा; इसलिए हर अधिसूचना देखें।"
        }
      ],
      "subjectsHeading": "क्या परखा जाता है",
      "subjects": [
        {
          "name": "गणित",
          "body": "संख्या पद्धति, दशमलव, भिन्न, लघुत्तम और महत्तम समापवर्तक (LCM, HCF), अनुपात एवं समानुपात, प्रतिशत, क्षेत्रमिति, समय और कार्य, समय और दूरी, साधारण और चक्रवृद्धि ब्याज, लाभ-हानि, प्रारंभिक बीजगणित, ज्यामिति और त्रिकोणमिति, तथा प्रारंभिक सांख्यिकी।"
        },
        {
          "name": "सामान्य बुद्धिमत्ता एवं तर्कशक्ति",
          "body": "सादृश्य, संख्या और वर्णमाला श्रृंखला, कोडिंग-डिकोडिंग, गणितीय संक्रियाएं, समानताएं और अंतर, संबंध, विश्लेषणात्मक तर्क, न्यायवाक्य, जंबलिंग, वेन आरेख, पहेलियां, आंकड़ों की पर्याप्तता, कथन-निष्कर्ष, कथन-कार्यवाही के तरीके, निर्णय लेना, नक्शे, और ग्राफ की व्याख्या।"
        },
        {
          "name": "सामान्य जागरूकता",
          "body": "राष्ट्रीय और अंतरराष्ट्रीय महत्व की समसामयिक घटनाएं, खेल, कला और संस्कृति, भारतीय साहित्य, स्मारक और स्थल, 10वीं (CBSE) स्तर तक सामान्य विज्ञान और जीव विज्ञान, इतिहास और स्वतंत्रता संग्राम, भौतिक, सामाजिक और आर्थिक भूगोल, भारतीय राजव्यवस्था और शासन, अंतरिक्ष और परमाणु कार्यक्रम सहित विज्ञान और प्रौद्योगिकी, संयुक्त राष्ट्र और अन्य विश्व संगठन, पर्यावरण के मुद्दे, कंप्यूटर की बुनियादी जानकारी, प्रचलित संक्षिप्त रूप, भारत की परिवहन प्रणालियां, भारतीय अर्थव्यवस्था, प्रसिद्ध व्यक्तित्व, सरकार के प्रमुख कार्यक्रम, वनस्पति और जीव-जंतु, तथा महत्वपूर्ण सरकारी और सार्वजनिक क्षेत्र के संगठन।"
        }
      ],
      "note": "प्रश्नों की संख्या, अंक, समय और नेगेटिव मार्किंग का अनुपात हर चक्र की अपनी अधिसूचना द्वारा तय किया जाता है और चक्रों के बीच बदल सकता है। ऊपर दिए गए विषयों को अध्ययन के लिए स्थिर आधार मानें, और देखें",
      "noteLinkLabel": "आधिकारिक RRB वेबसाइट",
      "recruitsHeading": "NTPC किसके लिए भर्ती करता है",
      "recruitsBody": "अक्टूबर 2026 की अधिसूचनाओं में CEN 06/2026 के तहत स्नातक स्तर के पद (चीफ कमर्शियल कम टिकट सुपरवाइज़र, गुड्स ट्रेन मैनेजर, जूनियर अकाउंट्स असिस्टेंट कम टाइपिस्ट, सीनियर क्लर्क कम टाइपिस्ट) और CEN 07/2026 के तहत 12वीं स्तर के पद (कमर्शियल कम टिकट क्लर्क, अकाउंट्स क्लर्क कम टाइपिस्ट, जूनियर क्लर्क कम टाइपिस्ट, ट्रेन्स क्लर्क) शामिल हैं।",
      "offerHeading": "Pariksha Saathi RRB NTPC के लिए क्या देता है",
      "offerBody": "ऊपर दिए विषयों के लिए मुफ्त विषयवार पाठ और अभ्यास, विषयवार सेक्शनल टेस्ट, पूर्ण-लंबाई मॉक टेस्ट, आपके कमज़ोर विषयों को अपने-आप ट्रैक करने वाली Mistake Notebook, और तारीख़वार करंट अफेयर्स कैप्सूल।",
      "sourceHeading": "आधिकारिक स्रोत और नवीनतम अपडेट",
      "officialLinkLabel": "RRB — आधिकारिक वेबसाइट",
      "examNoticesLinkLabel": "Pariksha Saathi पर नवीनतम एडमिट कार्ड, परिणाम और डेडलाइन अलर्ट",
      "ctaLabel": "RRB NTPC की मुफ्त पढ़ाई शुरू करें",
      "backLabel": "होम",
      "disclaimer": "Pariksha Saathi एक स्वतंत्र परियोजना है और रेलवे भर्ती बोर्ड या किसी भी सरकारी निकाय से संबद्ध नहीं है। ऊपर दिए गए सिलेबस और पैटर्न विवरण सामान्य हैं और बदल सकते हैं — हमेशा ऊपर दी गई आधिकारिक अधिसूचना से पुष्टि करें।"
    }
  },
  {
    "slug": "rrb-group-d",
    "examName": "RRB Group D",
    "officialUrl": "https://rrb.indianrailways.gov.in/",
    "en": {
      "pageTitle": "RRB Group D Syllabus & Exam Pattern",
      "lede": "RRB Group D recruits into Level 1 posts of Indian Railways through one computer-based test followed by a physical efficiency test. Here’s the stable shape of it — what gets tested at each stage — with a link to the official RRB website for the current notification’s exact marks, timing and negative-marking details.",
      "stagesHeading": "The stages",
      "stages": [
        {
          "name": "Computer Based Test (CBT)",
          "body": "A single computer-based test on Mathematics, General Intelligence and Reasoning, General Science and General Awareness on current affairs. Its marks decide who is called for the physical efficiency test."
        },
        {
          "name": "Physical Efficiency Test (PET)",
          "body": "A qualifying physical test for candidates shortlisted on the CBT, made up of carrying a weight over a set distance and then a timed run, with separate standards for male and female candidates. The notification exempts PwBD candidates, ex-servicemen and Course Completed Act Apprentices."
        },
        {
          "name": "Document verification and medical examination",
          "body": "Candidates who qualify are called for document verification, and appointment depends on passing the medical standard of the post, which differs from post to post."
        }
      ],
      "subjectsHeading": "What’s tested",
      "subjects": [
        {
          "name": "Mathematics",
          "body": "Number system, BODMAS, decimals, fractions, LCM and HCF, ratio and proportion, percentages, mensuration, time and work, time and distance, simple and compound interest, profit and loss, algebra, geometry and trigonometry, elementary statistics, square root, age calculations, calendar and clock, and pipes and cistern."
        },
        {
          "name": "General Intelligence and Reasoning",
          "body": "Analogies, alphabetical and number series, coding and decoding, mathematical operations, relationships, syllogism, jumbling, Venn diagram, data interpretation and sufficiency, conclusions and decision making, similarities and differences, analytical reasoning, classification, directions, and statement-arguments and assumptions."
        },
        {
          "name": "General Science",
          "body": "Physics, Chemistry and Life Sciences at 10th standard (CBSE) level."
        },
        {
          "name": "General Awareness and Current Affairs",
          "body": "Current affairs in science and technology, sports, culture, personalities, economics and politics, and any other subject of importance. A daily current-affairs habit pays off directly here."
        }
      ],
      "note": "The notification says the topics listed are illustrative, not exhaustive, and that the number of questions, marks, timing and negative-marking fraction are set by each cycle’s own notification and can change between cycles. Treat the subjects above as the stable shape to study toward, and check",
      "noteLinkLabel": "the official RRB website",
      "recruitsHeading": "What Group D recruits for",
      "recruitsBody": "CEN 09/2025 covered various Level 1 posts, including Assistant TRD, Assistant Operations (Electrical), Assistant TL and AC, Assistant (S and T), Pointsman B, Assistant Track Machine, Track Maintainer-IV, Assistant Bridge, Assistant Carriage and Wagon, Assistant Loco Shed (Electrical) and Assistant P.Way, with a 10th pass, ITI or National Apprenticeship Certificate qualification.",
      "offerHeading": "What Pariksha Saathi offers for RRB Group D",
      "offerBody": "Free topic-wise lessons and practice for the subjects above, sectional tests by subject, full-length mock tests, a Mistake Notebook that tracks your weak topics automatically, and dated current-affairs capsules.",
      "sourceHeading": "Official source & latest updates",
      "officialLinkLabel": "RRB — official website",
      "examNoticesLinkLabel": "Latest admit card, result and deadline alerts on Pariksha Saathi",
      "ctaLabel": "Start studying RRB Group D free",
      "backLabel": "Home",
      "disclaimer": "Pariksha Saathi is an independent project and is not affiliated with the Railway Recruitment Boards or any government body. Syllabus and pattern details above are general and may change — always confirm against the official notification linked above."
    },
    "hi": {
      "pageTitle": "RRB ग्रुप D सिलेबस और परीक्षा पैटर्न",
      "lede": "RRB ग्रुप D भारतीय रेलवे के लेवल 1 पदों पर भर्ती एक कंप्यूटर-आधारित परीक्षा और उसके बाद शारीरिक दक्षता परीक्षा के ज़रिए करता है। यहां इसकी स्थिर संरचना दी गई है — हर चरण में क्या परखा जाता है — साथ ही आधिकारिक RRB वेबसाइट का लिंक भी, जहां मौजूदा अधिसूचना के सटीक अंक, समय और नेगेटिव मार्किंग मिलेंगे।",
      "stagesHeading": "चरण",
      "stages": [
        {
          "name": "कंप्यूटर आधारित परीक्षा (CBT)",
          "body": "गणित, सामान्य बुद्धिमत्ता एवं तर्कशक्ति, सामान्य विज्ञान और समसामयिक विषयों पर सामान्य जागरूकता की एक ही कंप्यूटर-आधारित परीक्षा। इसके अंक तय करते हैं कि शारीरिक दक्षता परीक्षा के लिए किसे बुलाया जाएगा।"
        },
        {
          "name": "शारीरिक दक्षता परीक्षा (PET)",
          "body": "CBT के आधार पर चुने गए अभ्यर्थियों के लिए एक अर्हक शारीरिक परीक्षा, जिसमें तय दूरी तक वज़न उठाकर चलना और फिर समय-सीमा में दौड़ना शामिल है; पुरुष और महिला अभ्यर्थियों के मानक अलग हैं। अधिसूचना में PwBD अभ्यर्थियों, पूर्व सैनिकों और कोर्स कम्प्लीटेड एक्ट अप्रेंटिस को इससे छूट दी गई है।"
        },
        {
          "name": "दस्तावेज़ सत्यापन और चिकित्सा परीक्षा",
          "body": "अर्हता पाने वाले अभ्यर्थियों को दस्तावेज़ सत्यापन के लिए बुलाया जाता है, और नियुक्ति पद के चिकित्सा मानक को पूरा करने पर निर्भर करती है, जो पद-दर-पद अलग है।"
        }
      ],
      "subjectsHeading": "क्या परखा जाता है",
      "subjects": [
        {
          "name": "गणित",
          "body": "संख्या पद्धति, BODMAS, दशमलव, भिन्न, लघुत्तम और महत्तम समापवर्तक (LCM, HCF), अनुपात एवं समानुपात, प्रतिशत, क्षेत्रमिति, समय और कार्य, समय और दूरी, साधारण और चक्रवृद्धि ब्याज, लाभ-हानि, बीजगणित, ज्यामिति और त्रिकोणमिति, प्रारंभिक सांख्यिकी, वर्गमूल, आयु संबंधी गणनाएं, कैलेंडर और घड़ी, तथा पाइप और टंकी।"
        },
        {
          "name": "सामान्य बुद्धिमत्ता एवं तर्कशक्ति",
          "body": "सादृश्य, वर्णमाला और संख्या श्रृंखला, कोडिंग-डिकोडिंग, गणितीय संक्रियाएं, संबंध, न्यायवाक्य, जंबलिंग, वेन आरेख, आंकड़ों की व्याख्या और पर्याप्तता, निष्कर्ष और निर्णय लेना, समानताएं और अंतर, विश्लेषणात्मक तर्क, वर्गीकरण, दिशाएं, तथा कथन-तर्क और धारणाएं।"
        },
        {
          "name": "सामान्य विज्ञान",
          "body": "10वीं (CBSE) स्तर का भौतिकी, रसायन विज्ञान और जीव विज्ञान।"
        },
        {
          "name": "सामान्य जागरूकता एवं करेंट अफेयर्स",
          "body": "विज्ञान और प्रौद्योगिकी, खेल, संस्कृति, व्यक्तित्व, अर्थशास्त्र और राजनीति के करेंट अफेयर्स, तथा कोई भी अन्य महत्वपूर्ण विषय। यहां रोज़ाना करेंट अफेयर्स पढ़ने की आदत सीधे काम आती है।"
        }
      ],
      "note": "अधिसूचना के अनुसार ऊपर दिए विषय उदाहरण-स्वरूप हैं, पूर्ण सूची नहीं, और प्रश्नों की संख्या, अंक, समय तथा नेगेटिव मार्किंग का अनुपात हर चक्र की अपनी अधिसूचना द्वारा तय किया जाता है और चक्रों के बीच बदल सकता है। ऊपर दिए गए विषयों को अध्ययन के लिए स्थिर आधार मानें, और देखें",
      "noteLinkLabel": "आधिकारिक RRB वेबसाइट",
      "recruitsHeading": "ग्रुप D किसके लिए भर्ती करता है",
      "recruitsBody": "CEN 09/2025 में लेवल 1 के कई पद शामिल थे, जैसे असिस्टेंट TRD, असिस्टेंट ऑपरेशंस (इलेक्ट्रिकल), असिस्टेंट TL एंड AC, असिस्टेंट (S एंड T), पॉइंट्समैन-बी, असिस्टेंट ट्रैक मशीन, ट्रैक मेंटेनर-IV, असिस्टेंट ब्रिज, असिस्टेंट कैरेज एंड वैगन, असिस्टेंट लोको शेड (इलेक्ट्रिकल) और असिस्टेंट पी-वे; योग्यता 10वीं पास, ITI या राष्ट्रीय अप्रेंटिसशिप प्रमाणपत्र थी।",
      "offerHeading": "Pariksha Saathi RRB ग्रुप D के लिए क्या देता है",
      "offerBody": "ऊपर दिए विषयों के लिए मुफ्त विषयवार पाठ और अभ्यास, विषयवार सेक्शनल टेस्ट, पूर्ण-लंबाई मॉक टेस्ट, आपके कमज़ोर विषयों को अपने-आप ट्रैक करने वाली Mistake Notebook, और तारीख़वार करंट अफेयर्स कैप्सूल।",
      "sourceHeading": "आधिकारिक स्रोत और नवीनतम अपडेट",
      "officialLinkLabel": "RRB — आधिकारिक वेबसाइट",
      "examNoticesLinkLabel": "Pariksha Saathi पर नवीनतम एडमिट कार्ड, परिणाम और डेडलाइन अलर्ट",
      "ctaLabel": "RRB ग्रुप D की मुफ्त पढ़ाई शुरू करें",
      "backLabel": "होम",
      "disclaimer": "Pariksha Saathi एक स्वतंत्र परियोजना है और रेलवे भर्ती बोर्ड या किसी भी सरकारी निकाय से संबद्ध नहीं है। ऊपर दिए गए सिलेबस और पैटर्न विवरण सामान्य हैं और बदल सकते हैं — हमेशा ऊपर दी गई आधिकारिक अधिसूचना से पुष्टि करें।"
    }
  },
  {
    "slug": "rrb-alp",
    "examName": "RRB ALP",
    "officialUrl": "https://rrb.indianrailways.gov.in/",
    "en": {
      "pageTitle": "RRB ALP Syllabus & Exam Pattern",
      "lede": "RRB ALP (Assistant Loco Pilot) is selected through two computer-based tests and a computer-based aptitude test, followed by document verification and a medical examination. Here’s the stable shape of it — what gets tested at each stage — with a link to the official RRB website for the current notification’s exact marks, timing and negative-marking details.",
      "stagesHeading": "The stages",
      "stages": [
        {
          "name": "CBT-1",
          "body": "A computer-based screening test on Mathematics, Mental Ability and General Science. Its marks are not counted in the final panel; they only shortlist candidates for CBT-2."
        },
        {
          "name": "CBT-2, Part-A",
          "body": "A computer-based test on Mathematics, General Intelligence and Reasoning, and Basic Science and Engineering. Its marks count towards the final merit, and the candidate must also clear Part-B."
        },
        {
          "name": "CBT-2, Part-B",
          "body": "A qualifying trade test with questions from the trade syllabi prescribed by the Directorate General of Training (DGT). Candidates with ITI or apprenticeship answer questions from their own trade; Degree and Diploma holders pick one trade from the list the notification gives for their engineering discipline."
        },
        {
          "name": "Computer Based Aptitude Test (CBAT)",
          "body": "An aptitude test battery for candidates shortlisted on CBT-2 Part-A. Every battery must be cleared separately, and the CBAT score counts towards the final merit along with Part-A of CBT-2. The notification points to the RDSO website (Traffic and Psychology, Candidate’s Corner) for information on the CBAT."
        },
        {
          "name": "Document verification and medical examination",
          "body": "Candidates on the merit list are called for document verification. The notification says the ALP post has stringent medical standards, including vision, and that no alternative post is offered to those found medically unfit."
        }
      ],
      "subjectsHeading": "What’s tested",
      "subjects": [
        {
          "name": "Mathematics",
          "body": "Number system, BODMAS, decimals, fractions, LCM and HCF, ratio and proportion, percentages, mensuration, time and work, time and distance, simple and compound interest, profit and loss, algebra, geometry and trigonometry, elementary statistics, square root, age calculations, calendar and clock, and pipes and cistern."
        },
        {
          "name": "Mental Ability / General Intelligence and Reasoning",
          "body": "Analogies, alphabetical and number series, coding and decoding, mathematical operations, relationships, syllogism, jumbling, Venn diagram, data interpretation and sufficiency, conclusions and decision making, similarities and differences, analytical reasoning, classification, directions, and statement-arguments and assumptions."
        },
        {
          "name": "General Science (CBT-1)",
          "body": "Physics, Chemistry and Life Sciences at 10th standard level."
        },
        {
          "name": "Basic Science and Engineering (CBT-2 Part-A)",
          "body": "Engineering drawing (projections, views, drawing instruments, lines, geometric figures, symbolic representation), units, measurements, mass, weight and density, work, power and energy, speed and velocity, heat and temperature, basic electricity, levers and simple machines, occupational safety and health, environment education, and IT literacy."
        },
        {
          "name": "Trade syllabus (CBT-2 Part-B)",
          "body": "Set by trade. The notification groups trades by engineering discipline: Electrical (Electrician, Instrument Mechanic, Wireman, Armature and Coil Winder, Refrigeration and Air-conditioning Mechanic); Electronics (Electronics Mechanic, Mechanic Radio and TV); Mechanical (Fitter, Mechanic Motor Vehicle, Tractor Mechanic, Mechanic Diesel, Turner, Machinist, Refrigeration and Air-conditioning Mechanic, Millwright/Maintenance Mechanic); Automobile (Mechanic Motor Vehicle, Tractor Mechanic, Mechanic Diesel, Refrigeration and Air-conditioning Mechanic). Syllabi for the trades are on the DGT website."
        }
      ],
      "note": "The number of questions, marks, timing and negative-marking fraction are set by each cycle’s own notification and can change between cycles. Treat the subjects above as the stable shape to study toward, and check",
      "noteLinkLabel": "the official RRB website",
      "recruitsHeading": "What ALP recruits for",
      "recruitsBody": "CEN 01/2026 recruits Assistant Loco Pilots, for which the notification asks for Matriculation/SSLC plus an ITI or Course Completed Act Apprenticeship in a listed trade, or Matriculation/SSLC plus a three-year Diploma in Mechanical, Electrical, Electronics or Automobile Engineering in lieu of ITI.",
      "offerHeading": "What Pariksha Saathi offers for RRB ALP",
      "offerBody": "Free topic-wise lessons and practice for the subjects above, sectional tests by subject, full-length mock tests, a Mistake Notebook that tracks your weak topics automatically, and dated current-affairs capsules.",
      "sourceHeading": "Official source & latest updates",
      "officialLinkLabel": "RRB — official website",
      "examNoticesLinkLabel": "Latest admit card, result and deadline alerts on Pariksha Saathi",
      "ctaLabel": "Start studying RRB ALP free",
      "backLabel": "Home",
      "disclaimer": "Pariksha Saathi is an independent project and is not affiliated with the Railway Recruitment Boards or any government body. Syllabus and pattern details above are general and may change — always confirm against the official notification linked above."
    },
    "hi": {
      "pageTitle": "RRB ALP सिलेबस और परीक्षा पैटर्न",
      "lede": "RRB ALP (असिस्टेंट लोको पायलट) का चयन दो कंप्यूटर-आधारित परीक्षाओं और एक कंप्यूटर-आधारित अभिक्षमता परीक्षा के ज़रिए होता है, उसके बाद दस्तावेज़ सत्यापन और चिकित्सा परीक्षा होती है। यहां इसकी स्थिर संरचना दी गई है — हर चरण में क्या परखा जाता है — साथ ही आधिकारिक RRB वेबसाइट का लिंक भी, जहां मौजूदा अधिसूचना के सटीक अंक, समय और नेगेटिव मार्किंग मिलेंगे।",
      "stagesHeading": "चरण",
      "stages": [
        {
          "name": "CBT-1",
          "body": "गणित, मानसिक योग्यता और सामान्य विज्ञान पर कंप्यूटर-आधारित छंटनी परीक्षा। इसके अंक अंतिम पैनल में नहीं गिने जाते; ये केवल CBT-2 के लिए अभ्यर्थी छांटते हैं।"
        },
        {
          "name": "CBT-2, भाग-A",
          "body": "गणित, सामान्य बुद्धिमत्ता एवं तर्कशक्ति, और बेसिक साइंस एंड इंजीनियरिंग पर कंप्यूटर-आधारित परीक्षा। इसके अंक अंतिम मेरिट में गिने जाते हैं, और अभ्यर्थी को भाग-B भी पास करना होता है।"
        },
        {
          "name": "CBT-2, भाग-B",
          "body": "प्रशिक्षण महानिदेशालय (DGT) द्वारा निर्धारित ट्रेड पाठ्यक्रमों के प्रश्नों वाला अर्हक ट्रेड टेस्ट। ITI या अप्रेंटिसशिप वाले अभ्यर्थी अपने ट्रेड के प्रश्न हल करते हैं; डिग्री और डिप्लोमा धारक अपनी इंजीनियरिंग शाखा के लिए अधिसूचना में दी गई सूची में से एक ट्रेड चुनते हैं।"
        },
        {
          "name": "कंप्यूटर आधारित अभिक्षमता परीक्षा (CBAT)",
          "body": "CBT-2 के भाग-A के आधार पर चुने गए अभ्यर्थियों के लिए अभिक्षमता टेस्ट बैटरी। हर बैटरी अलग-अलग पास करनी होती है, और CBAT का स्कोर CBT-2 के भाग-A के साथ अंतिम मेरिट में गिना जाता है। CBAT की जानकारी के लिए अधिसूचना RDSO की वेबसाइट (ट्रैफिक एंड साइकोलॉजी, कैंडिडेट्स कॉर्नर) का हवाला देती है।"
        },
        {
          "name": "दस्तावेज़ सत्यापन और चिकित्सा परीक्षा",
          "body": "मेरिट सूची के अभ्यर्थियों को दस्तावेज़ सत्यापन के लिए बुलाया जाता है। अधिसूचना के अनुसार ALP पद के चिकित्सा मानक, दृष्टि सहित, कठोर हैं और चिकित्सा रूप से अयोग्य पाए जाने वालों को कोई वैकल्पिक पद नहीं दिया जाता।"
        }
      ],
      "subjectsHeading": "क्या परखा जाता है",
      "subjects": [
        {
          "name": "गणित",
          "body": "संख्या पद्धति, BODMAS, दशमलव, भिन्न, लघुत्तम और महत्तम समापवर्तक (LCM, HCF), अनुपात एवं समानुपात, प्रतिशत, क्षेत्रमिति, समय और कार्य, समय और दूरी, साधारण और चक्रवृद्धि ब्याज, लाभ-हानि, बीजगणित, ज्यामिति और त्रिकोणमिति, प्रारंभिक सांख्यिकी, वर्गमूल, आयु संबंधी गणनाएं, कैलेंडर और घड़ी, तथा पाइप और टंकी।"
        },
        {
          "name": "मानसिक योग्यता / सामान्य बुद्धिमत्ता एवं तर्कशक्ति",
          "body": "सादृश्य, वर्णमाला और संख्या श्रृंखला, कोडिंग-डिकोडिंग, गणितीय संक्रियाएं, संबंध, न्यायवाक्य, जंबलिंग, वेन आरेख, आंकड़ों की व्याख्या और पर्याप्तता, निष्कर्ष और निर्णय लेना, समानताएं और अंतर, विश्लेषणात्मक तर्क, वर्गीकरण, दिशाएं, तथा कथन-तर्क और धारणाएं।"
        },
        {
          "name": "सामान्य विज्ञान (CBT-1)",
          "body": "10वीं स्तर का भौतिकी, रसायन विज्ञान और जीव विज्ञान।"
        },
        {
          "name": "बेसिक साइंस एंड इंजीनियरिंग (CBT-2 भाग-A)",
          "body": "इंजीनियरिंग ड्राइंग (प्रक्षेपण, दृश्य, ड्राइंग उपकरण, रेखाएं, ज्यामितीय आकृतियां, प्रतीकात्मक निरूपण), मात्रक, मापन, द्रव्यमान, भार और घनत्व, कार्य, शक्ति और ऊर्जा, चाल और वेग, ऊष्मा और तापमान, बुनियादी विद्युत, उत्तोलक और सरल मशीनें, व्यावसायिक सुरक्षा और स्वास्थ्य, पर्यावरण शिक्षा, तथा IT साक्षरता।"
        },
        {
          "name": "ट्रेड पाठ्यक्रम (CBT-2 भाग-B)",
          "body": "ट्रेड के अनुसार तय होता है। अधिसूचना में ट्रेड इंजीनियरिंग शाखा के अनुसार समूहबद्ध हैं: इलेक्ट्रिकल (इलेक्ट्रीशियन, इंस्ट्रूमेंट मैकेनिक, वायरमैन, आर्मेचर एंड कॉइल वाइंडर, रेफ्रिजरेशन एंड एयर-कंडीशनिंग मैकेनिक); इलेक्ट्रॉनिक्स (इलेक्ट्रॉनिक्स मैकेनिक, मैकेनिक रेडियो एंड टीवी); मैकेनिकल (फिटर, मैकेनिक मोटर व्हीकल, ट्रैक्टर मैकेनिक, मैकेनिक डीज़ल, टर्नर, मशीनिस्ट, रेफ्रिजरेशन एंड एयर-कंडीशनिंग मैकेनिक, मिलराइट/मेंटेनेंस मैकेनिक); ऑटोमोबाइल (मैकेनिक मोटर व्हीकल, ट्रैक्टर मैकेनिक, मैकेनिक डीज़ल, रेफ्रिजरेशन एंड एयर-कंडीशनिंग मैकेनिक)। ट्रेडों के पाठ्यक्रम DGT की वेबसाइट पर उपलब्ध हैं।"
        }
      ],
      "note": "प्रश्नों की संख्या, अंक, समय और नेगेटिव मार्किंग का अनुपात हर चक्र की अपनी अधिसूचना द्वारा तय किया जाता है और चक्रों के बीच बदल सकता है। ऊपर दिए गए विषयों को अध्ययन के लिए स्थिर आधार मानें, और देखें",
      "noteLinkLabel": "आधिकारिक RRB वेबसाइट",
      "recruitsHeading": "ALP किसके लिए भर्ती करता है",
      "recruitsBody": "CEN 01/2026 असिस्टेंट लोको पायलट की भर्ती करता है, जिसके लिए अधिसूचना में मैट्रिकुलेशन/SSLC के साथ किसी सूचीबद्ध ट्रेड में ITI या कोर्स कम्प्लीटेड एक्ट अप्रेंटिसशिप, या ITI के स्थान पर मैट्रिकुलेशन/SSLC के साथ मैकेनिकल, इलेक्ट्रिकल, इलेक्ट्रॉनिक्स या ऑटोमोबाइल इंजीनियरिंग में तीन वर्ष का डिप्लोमा मांगा गया है।",
      "offerHeading": "Pariksha Saathi RRB ALP के लिए क्या देता है",
      "offerBody": "ऊपर दिए विषयों के लिए मुफ्त विषयवार पाठ और अभ्यास, विषयवार सेक्शनल टेस्ट, पूर्ण-लंबाई मॉक टेस्ट, आपके कमज़ोर विषयों को अपने-आप ट्रैक करने वाली Mistake Notebook, और तारीख़वार करंट अफेयर्स कैप्सूल।",
      "sourceHeading": "आधिकारिक स्रोत और नवीनतम अपडेट",
      "officialLinkLabel": "RRB — आधिकारिक वेबसाइट",
      "examNoticesLinkLabel": "Pariksha Saathi पर नवीनतम एडमिट कार्ड, परिणाम और डेडलाइन अलर्ट",
      "ctaLabel": "RRB ALP की मुफ्त पढ़ाई शुरू करें",
      "backLabel": "होम",
      "disclaimer": "Pariksha Saathi एक स्वतंत्र परियोजना है और रेलवे भर्ती बोर्ड या किसी भी सरकारी निकाय से संबद्ध नहीं है। ऊपर दिए गए सिलेबस और पैटर्न विवरण सामान्य हैं और बदल सकते हैं — हमेशा ऊपर दी गई आधिकारिक अधिसूचना से पुष्टि करें।"
    }
  },
  {
    "slug": "up-police",
    "examName": "UP Police Constable",
    "officialUrl": "https://uppbpb.gov.in/",
    "en": {
      "pageTitle": "UP Police Constable Syllabus & Exam Pattern",
      "lede": "UP Police Constable recruitment is a written test followed by a document and physical standard check and a timed physical efficiency test. Here’s the shape of it and the subjects tested, taken from the Board’s 2025 recruitment notification, with a link to the official source for the exact marks and timing.",
      "stagesHeading": "The stages",
      "stages": [
        {
          "name": "Written test",
          "body": "One OMR-based objective paper covering the four subjects listed below. Your written-test score decides your merit, and a minimum is set for each category."
        },
        {
          "name": "Document verification and physical standard test",
          "body": "A qualifying stage: your certificates are checked, and height and chest (men) or height and weight (women) are measured against the standards in the notification."
        },
        {
          "name": "Physical efficiency test",
          "body": "A qualifying timed run, with a different distance and time limit for men and women. Not finishing within the limit ends your selection; clearing it does not add marks."
        }
      ],
      "subjectsHeading": "What’s tested in the written test",
      "subjects": [
        {
          "name": "General Knowledge",
          "body": "General science, Indian history, the Indian Constitution, the Indian economy and culture, agriculture, commerce and trade, population, environment and urbanisation, the geography of India and the world, and natural resources. Uttar Pradesh specifics: education, culture and social practices, and the revenue, police and general administrative system. Also human rights, internal security and terrorism, India’s relations with its neighbours, current events of national and international importance, national and international organisations, demonetisation and its effects, cyber crime, goods and services tax, awards and honours, countries, capitals and currencies, important days, research and discoveries, books and authors, and social media communication."
        },
        {
          "name": "General Hindi",
          "body": "Hindi and other Indian languages; the basics of Hindi grammar — alphabet, tadbhav and tatsam words, synonyms, antonyms, words with several meanings, one word for a phrase, look-alike words with different meanings, correcting incorrect sentences, gender, number, case, pronoun, adjective, verb, tense, voice, indeclinables, prefixes, suffixes, sandhi, samas, punctuation, idioms and proverbs, ras, chhand and alankar; unseen passages; well-known poets, writers and their works; and awards in Hindi."
        },
        {
          "name": "Numerical and Mental Ability",
          "body": "Number system, simplification, decimals and fractions, HCF and LCM, ratio and proportion, percentage, profit and loss, discount, simple and compound interest, partnership, average, time and work, time and distance, use of tables and graphs, and mensuration. Also logical items such as logical diagrams, symbol–relationship interpretation, perception tests, word formation, letter and number series, word and alphabet analogy, common sense, direction sense, logical interpretation of data, forcefulness of argument and determining implied meanings."
        },
        {
          "name": "Mental Aptitude, IQ and Reasoning Ability",
          "body": "Relationship and analogy tests, spotting the dissimilar, series completion, coding and decoding, direction sense, blood relations, problems on the alphabet, time sequence, Venn diagrams and chart-type tests, mathematical ability and arranging in order. Also analogies, similarities and differences, space visualisation, problem solving, analysis and judgement, decision making, visual memory, discrimination, observation, concepts, arithmetical reasoning, verbal and figure classification, arithmetical number series, and handling abstract ideas and symbols and their relationships."
        }
      ],
      "note": "The Board calls its syllabus indicative, and each cycle’s notification sets its own marks, timing and qualifying standards, which can change. Treat the subjects above as the shape to study toward, and check",
      "noteLinkLabel": "the Board’s own official site",
      "recruitsHeading": "What this recruitment is for",
      "recruitsBody": "The Uttar Pradesh Police Recruitment and Promotion Board fills Constable posts in the Civil Police, PAC / Armed Police, Special Security Force, Women Battalions and Mounted Police, and Jail Warder posts, through one common written test. Some posts are open only to men or only to women, as the notification states.",
      "offerHeading": "What Pariksha Saathi offers for UP Police Constable",
      "offerBody": "Free topic-wise lessons and practice for the subjects above, sectional tests by subject, full-length mock tests, a Mistake Notebook that tracks your weak topics automatically, and dated current-affairs capsules.",
      "sourceHeading": "Official source & latest updates",
      "officialLinkLabel": "UP Police Recruitment and Promotion Board — official site",
      "examNoticesLinkLabel": "Latest admit card, result and deadline alerts on Pariksha Saathi",
      "ctaLabel": "Start studying UP Police Constable free",
      "backLabel": "Home",
      "disclaimer": "Pariksha Saathi is an independent project and is not affiliated with the UP Police Recruitment and Promotion Board or any government body. The syllabus and pattern details above come from the Board’s 2025 recruitment notification and may change — always confirm against the official notification linked above."
    },
    "hi": {
      "pageTitle": "यूपी पुलिस कांस्टेबल सिलेबस और परीक्षा पैटर्न",
      "lede": "यूपी पुलिस कांस्टेबल भर्ती में पहले लिखित परीक्षा होती है, फिर अभिलेखों की संवीक्षा व शारीरिक मानक परीक्षा, और फिर समयबद्ध शारीरिक दक्षता परीक्षा। यहां बोर्ड की 2025 भर्ती अधिसूचना के आधार पर इसकी संरचना और परखे जाने वाले विषय दिए गए हैं, साथ ही सटीक अंक और समय के लिए आधिकारिक स्रोत का लिंक भी।",
      "stagesHeading": "चरण",
      "stages": [
        {
          "name": "लिखित परीक्षा",
          "body": "नीचे दिए गए चार विषयों पर एक ओएमआर आधारित वस्तुनिष्ठ प्रश्नपत्र। आपकी मेरिट लिखित परीक्षा के अंकों से तय होती है, और हर श्रेणी के लिए न्यूनतम अंक निर्धारित हैं।"
        },
        {
          "name": "अभिलेखों की संवीक्षा और शारीरिक मानक परीक्षा",
          "body": "एक अर्हक चरण: आपके प्रमाण-पत्रों की जांच होती है, और अधिसूचना में दिए मानकों के अनुसार ऊंचाई और सीने (पुरुष) या ऊंचाई और वजन (महिला) की माप की जाती है।"
        },
        {
          "name": "शारीरिक दक्षता परीक्षा",
          "body": "एक अर्हक समयबद्ध दौड़, जिसकी दूरी और समय-सीमा पुरुषों और महिलाओं के लिए अलग है। निर्धारित समय में दौड़ पूरी न करने पर चयन प्रक्रिया से बाहर हो जाते हैं; इसमें सफल होने पर अंक नहीं जुड़ते।"
        }
      ],
      "subjectsHeading": "लिखित परीक्षा में क्या परखा जाता है",
      "subjects": [
        {
          "name": "सामान्य ज्ञान",
          "body": "सामान्य विज्ञान, भारत का इतिहास, भारतीय संविधान, भारतीय अर्थव्यवस्था एवं संस्कृति, कृषि, वाणिज्य एवं व्यापार, जनसंख्या, पर्यावरण एवं नगरीकरण, भारत और विश्व का भूगोल तथा प्राकृतिक संसाधन। उत्तर प्रदेश से जुड़े विषय: शिक्षा, संस्कृति और सामाजिक प्रथाएं, तथा राजस्व, पुलिस और सामान्य प्रशासनिक व्यवस्था। साथ ही मानवाधिकार, आंतरिक सुरक्षा तथा आतंकवाद, भारत और पड़ोसी देशों के संबंध, राष्ट्रीय व अंतर्राष्ट्रीय महत्व के समसामयिक विषय, राष्ट्रीय व अंतर्राष्ट्रीय संगठन, विमुद्रीकरण और उसका प्रभाव, साइबर क्राइम, वस्तु एवं सेवा कर, पुरस्कार और सम्मान, देश/राजधानियां/मुद्राएं, महत्वपूर्ण दिवस, अनुसंधान एवं खोज, पुस्तकें और उनके लेखक, तथा सोशल मीडिया कम्युनिकेशन।"
        },
        {
          "name": "सामान्य हिन्दी",
          "body": "हिन्दी और अन्य भारतीय भाषाएं; हिन्दी व्याकरण का मौलिक ज्ञान — वर्णमाला, तद्भव-तत्सम, पर्यायवाची, विलोम, अनेकार्थक शब्द, वाक्यांशों के लिए एक शब्द, समरूप भिन्नार्थक शब्द, अशुद्ध वाक्यों का शुद्धिकरण, लिंग, वचन, कारक, सर्वनाम, विशेषण, क्रिया, काल, वाच्य, अव्यय, उपसर्ग, प्रत्यय, संधि, समास, विराम-चिह्न, मुहावरे और लोकोक्तियां, रस, छंद, अलंकार; अपठित बोध; प्रसिद्ध कवि, लेखक और उनकी रचनाएं; तथा हिन्दी भाषा में पुरस्कार।"
        },
        {
          "name": "संख्यात्मक एवं मानसिक योग्यता",
          "body": "संख्या पद्धति, सरलीकरण, दशमलव और भिन्न, महत्तम और लघुत्तम समापवर्तक, अनुपात और समानुपात, प्रतिशतता, लाभ और हानि, छूट, साधारण और चक्रवृद्धि ब्याज, भागीदारी, औसत, समय और कार्य, समय और दूरी, सारणी और ग्राफ का प्रयोग, तथा क्षेत्रमिति। साथ ही तार्किक आरेख, संकेत-संबंध विश्लेषण, प्रत्यक्ष ज्ञान बोध, शब्द रचना, अक्षर और संख्या श्रृंखला, शब्द और वर्णमाला में आंशिक समरूपता, व्यावहारिक ज्ञान, दिशा ज्ञान, आंकड़ों का तार्किक विश्लेषण, प्रभावी तर्क और अंतर्निहित भावों का विनिश्चय जैसे तार्किक प्रश्न।"
        },
        {
          "name": "मानसिक अभिरुचि, बुद्धिलब्धि एवं तार्किक क्षमता",
          "body": "संबंध व आंशिक समानता परीक्षण, असमान को चिह्नित करना, श्रृंखला पूरी करना, संकेत लिपि और सांकेतिक लिपि को समझना, दिशा ज्ञान, रक्त संबंध, वर्णमाला पर आधारित प्रश्न, समय-क्रम परीक्षण, वेन आरेख और चार्ट सदृश परीक्षण, गणितीय योग्यता परीक्षण तथा क्रम में व्यवस्थित करना। साथ ही समरूपता, समानता, भिन्नता, खाली स्थान भरना, समस्या सुलझाना, विश्लेषण निर्णय, निर्णायक क्षमता, दृश्य स्मृति, विभेदन क्षमता, पर्यवेक्षण, अवधारणा, अंकगणितीय तर्क, शब्द और आकृति वर्गीकरण, अंकगणितीय संख्या श्रृंखला, तथा अमूर्त विचारों व प्रतीकों और उनके संबंधों से सामंजस्य की क्षमता।"
        }
      ],
      "note": "बोर्ड अपने पाठ्यक्रम को संकेतात्मक बताता है, और हर चक्र की अधिसूचना में अंक, समय और अर्हता मानक अलग से तय होते हैं और बदल सकते हैं। ऊपर दिए गए विषयों को अध्ययन के लिए आधार मानें, और यहां देखें:",
      "noteLinkLabel": "बोर्ड की आधिकारिक वेबसाइट",
      "recruitsHeading": "यह भर्ती किसके लिए है",
      "recruitsBody": "उत्तर प्रदेश पुलिस भर्ती एवं प्रोन्नति बोर्ड एक साझा लिखित परीक्षा के माध्यम से सिविल पुलिस, पी.ए.सी. / सशस्त्र पुलिस, विशेष सुरक्षा बल, महिला बटालियन और घुड़सवार पुलिस में आरक्षी के पद, तथा जेल वार्डर के पद भरता है। अधिसूचना के अनुसार कुछ पद केवल पुरुषों के लिए या केवल महिलाओं के लिए हैं।",
      "offerHeading": "Pariksha Saathi यूपी पुलिस कांस्टेबल के लिए क्या देता है",
      "offerBody": "ऊपर दिए विषयों के लिए मुफ्त विषयवार पाठ और अभ्यास, विषयवार सेक्शनल टेस्ट, पूर्ण-लंबाई मॉक टेस्ट, आपके कमज़ोर विषयों को अपने-आप ट्रैक करने वाली Mistake Notebook, और तारीख़वार करंट अफेयर्स कैप्सूल।",
      "sourceHeading": "आधिकारिक स्रोत और नवीनतम अपडेट",
      "officialLinkLabel": "उत्तर प्रदेश पुलिस भर्ती एवं प्रोन्नति बोर्ड — आधिकारिक वेबसाइट",
      "examNoticesLinkLabel": "Pariksha Saathi पर नवीनतम एडमिट कार्ड, परिणाम और डेडलाइन अलर्ट",
      "ctaLabel": "यूपी पुलिस कांस्टेबल की मुफ्त पढ़ाई शुरू करें",
      "backLabel": "होम",
      "disclaimer": "Pariksha Saathi एक स्वतंत्र परियोजना है और उत्तर प्रदेश पुलिस भर्ती एवं प्रोन्नति बोर्ड या किसी भी सरकारी निकाय से संबद्ध नहीं है। ऊपर दिए गए सिलेबस और पैटर्न विवरण बोर्ड की 2025 भर्ती अधिसूचना से लिए गए हैं और बदल सकते हैं — हमेशा ऊपर दी गई आधिकारिक अधिसूचना से पुष्टि करें।"
    }
  },
  {
    "slug": "bihar-police",
    "examName": "Bihar Police Constable",
    "officialUrl": "https://csbc.bihar.gov.in/Default.htm",
    "en": {
      "pageTitle": "Bihar Police Constable Syllabus & Exam Pattern",
      "lede": "Bihar Police Constable (Sipahi) recruitment starts with a written test that only qualifies you, and the final merit list is built on the physical efficiency test. Here’s the shape of it and the subjects tested, taken from the Central Selection Board of Constable’s 2025 notification and its syllabus, with a link to the official source for exact marks and timing.",
      "stagesHeading": "The stages",
      "stages": [
        {
          "name": "Written test",
          "body": "One OMR-based objective paper at the Class 10 (Matric) level of the Bihar School Examination Board. It is qualifying only: it decides who is called for the physical test and does not count to the final merit list."
        },
        {
          "name": "Physical efficiency test",
          "body": "Three events — a run, shot put and high jump — with different standards for men and women. You must pass each event separately, and your marks in these three events make the final merit list. Height, chest and weight are also checked against the notification’s standards."
        },
        {
          "name": "Document verification",
          "body": "Candidates who clear the physical test have their age, educational qualification and reservation documents checked in original."
        }
      ],
      "subjectsHeading": "What’s tested in the written test",
      "subjects": [
        {
          "name": "Hindi",
          "body": "Prose and poetry from the Class 9 and 10 Hindi textbooks, including poems from the Bhakti, Riti, Dwivedi, Chhayavad, post-Chhayavad, Pragativad and contemporary periods. Grammar: spelling and word breaking, prefixes and suffixes, synonyms and antonyms, idioms and proverbs, sentence correction, sandhi and samas, abridgement of passages, technical terms, and the basics of literary study such as shabd-shakti, alankar, chhand and kavya-gun."
        },
        {
          "name": "English",
          "body": "Comprehension, tales, short stories and plays, informative essays, poems, composition and writing exercises, and translation from the mother tongue. Grammar: reported speech, modal auxiliaries, punctuation, prepositions, relative and conditional clauses, phrases and idioms, sequence of tenses and subject–verb agreement. Word accent and intonation are listed too."
        },
        {
          "name": "Mathematics",
          "body": "Real numbers, polynomials, linear equations in two variables, quadratic equations, commercial mathematics (shares and dividends, discount, compound interest, payment in instalments), coordinate geometry, Euclid’s geometry, lines and angles, quadrilaterals, areas, constructions, mensuration (area, surface area and volume), trigonometric ratios and identities, statistics and probability."
        },
        {
          "name": "Social Science",
          "body": "History: geographical discoveries, the American and French revolutions, Nazism, the two world wars, tribal society and colonialism, nationalism in Europe, socialism and communism, nationalist movements in Indo-China, nationalism in India (1914–1930), urbanisation, trade and globalisation, and the press and nationalism. Geography: India’s location, physical features, drainage, vegetation, wildlife and population, neighbouring countries, map study, resources, agriculture, industries, transport, communication and trade, and the natural resources and population of Bihar. Civics: democracy in the contemporary world, constitution making, electoral politics, institutions of parliamentary democracy, democratic rights, power sharing, and the achievements and challenges of democracy. Economics: a Bihar village, human resources, poverty, unemployment, agriculture and food security, state and national income, money, savings and credit, financial institutions, employment and services, globalisation, and consumer awareness."
        },
        {
          "name": "Science",
          "body": "Physics, chemistry, zoology and botany at Class 9 and 10 level: food and matter, the living world and classification, motion, force, gravitation, work, energy and sound, natural resources, electric circuits and magnets, natural phenomena of light and the human eye, control and coordination and reproduction in living things, heredity and evolution, and conservation of natural resources and sources of energy."
        },
        {
          "name": "General Knowledge and Current Affairs",
          "body": "The notification lists general knowledge and current affairs as an area of the paper, but it does not name topics for it. A daily current-affairs habit is the practical way to prepare."
        }
      ],
      "note": "Each recruitment’s notification sets its own marks, timing and qualifying standards, and these can change between cycles. Treat the subjects above as the shape to study toward, and check",
      "noteLinkLabel": "the Board’s own official site",
      "recruitsHeading": "What this recruitment is for",
      "recruitsBody": "The Central Selection Board of Constable fills Constable (Sipahi) posts in the Bihar Police district forces and in the battalions of the Bihar Special Armed Police through one recruitment, and candidates mark their preference between the two when applying.",
      "offerHeading": "What Pariksha Saathi offers for Bihar Police Constable",
      "offerBody": "Free topic-wise lessons and practice for the subjects above, sectional tests by subject, full-length mock tests, a Mistake Notebook that tracks your weak topics automatically, and dated current-affairs capsules.",
      "sourceHeading": "Official source & latest updates",
      "officialLinkLabel": "Central Selection Board of Constable, Bihar — official site",
      "examNoticesLinkLabel": "Latest admit card, result and deadline alerts on Pariksha Saathi",
      "ctaLabel": "Start studying Bihar Police Constable free",
      "backLabel": "Home",
      "disclaimer": "Pariksha Saathi is an independent project and is not affiliated with the Central Selection Board of Constable, Bihar, or any government body. The syllabus and pattern details above come from the Board’s 2025 notification and syllabus and may change — always confirm against the official notification linked above."
    },
    "hi": {
      "pageTitle": "बिहार पुलिस सिपाही सिलेबस और परीक्षा पैटर्न",
      "lede": "बिहार पुलिस सिपाही भर्ती में पहले एक लिखित परीक्षा होती है जो केवल अर्हक है, और अंतिम मेरिट सूची शारीरिक दक्षता परीक्षा के अंकों पर बनती है। यहां केंद्रीय चयन पर्षद (सिपाही भर्ती) की 2025 की अधिसूचना और उसके पाठ्यक्रम के आधार पर इसकी संरचना और परखे जाने वाले विषय दिए गए हैं, साथ ही सटीक अंक और समय के लिए आधिकारिक स्रोत का लिंक भी।",
      "stagesHeading": "चरण",
      "stages": [
        {
          "name": "लिखित परीक्षा",
          "body": "बिहार विद्यालय परीक्षा समिति की 10वीं (मैट्रिक) कक्षा के स्तर का एक ओएमआर आधारित वस्तुनिष्ठ प्रश्नपत्र। यह केवल अर्हक है: इससे तय होता है कि शारीरिक परीक्षा के लिए कौन बुलाया जाएगा, पर इसके अंक अंतिम मेरिट सूची में नहीं जुड़ते।"
        },
        {
          "name": "शारीरिक दक्षता परीक्षा",
          "body": "तीन स्पर्धाएं — दौड़, गोला फेंक और ऊंची कूद — जिनके मानक पुरुषों और महिलाओं के लिए अलग हैं। हर स्पर्धा में अलग-अलग सफल होना जरूरी है, और इन तीनों स्पर्धाओं के अंकों से अंतिम मेरिट सूची बनती है। ऊंचाई, सीने और वजन की भी अधिसूचना में दिए मानकों के अनुसार जांच होती है।"
        },
        {
          "name": "दस्तावेज़ सत्यापन",
          "body": "शारीरिक परीक्षा में सफल अभ्यर्थियों की आयु, शैक्षणिक अर्हता और आरक्षण से जुड़े मूल दस्तावेज़ों की जांच होती है।"
        }
      ],
      "subjectsHeading": "लिखित परीक्षा में क्या परखा जाता है",
      "subjects": [
        {
          "name": "हिन्दी",
          "body": "कक्षा 9 और 10 की हिन्दी पाठ्यपुस्तकों के गद्य और पद्य, जिनमें भक्तिकाल, रीतिकाल, द्विवेदी युग, छायावाद, उत्तर छायावाद, प्रगतिवाद और समकालीन कविता की रचनाएं शामिल हैं। व्याकरण: वर्ण-विच्छेद और वर्तनी, उपसर्ग और प्रत्यय, पर्यायवाची और विलोम शब्द, मुहावरे और लोकोक्तियां, वाक्य शुद्धि, संधि और समास, संक्षेपण, पारिभाषिक शब्द, तथा साहित्यशास्त्र की बुनियादी बातें जैसे शब्द-शक्ति, अलंकार, छंद और काव्य-गुण।"
        },
        {
          "name": "अंग्रेजी",
          "body": "अपठित गद्यांश (कॉम्प्रिहेंशन), कहानियां, लघु कथाएं और नाटक, सूचनात्मक निबंध, कविताएं, रचना और लेखन अभ्यास, तथा मातृभाषा से अनुवाद। व्याकरण: रिपोर्टेड स्पीच, मोडल ऑक्सिलियरीज, विराम-चिह्न, प्रिपोजीशन, रिलेटिव और कंडीशनल क्लॉज, फ्रेज और मुहावरे, सीक्वेंस ऑफ टेंसेज और सब्जेक्ट-वर्ब एग्रीमेंट। वर्ड एक्सेंट और इंटोनेशन भी सूची में हैं।"
        },
        {
          "name": "गणित",
          "body": "वास्तविक संख्या, बहुपद, दो चर वाले रैखिक समीकरण, द्विघात समीकरण, व्यावसायिक गणित (शेयर एवं लाभांश, बट्टा, चक्रवृद्धि ब्याज, किस्तों में भुगतान), नियामक ज्यामिति, यूक्लिड की ज्यामिति, रेखाएं एवं कोण, चतुर्भुज, क्षेत्रफल, बनावट, क्षेत्रमिति (क्षेत्रफल, पृष्ठ क्षेत्रफल और आयतन), त्रिकोणमितीय अनुपात और तादात्म्य, सांख्यिकी और प्रायिकता।"
        },
        {
          "name": "सामाजिक विज्ञान",
          "body": "इतिहास: भौगोलिक खोज, अमेरिकी और फ्रांस की क्रांति, नाजीवाद, दोनों विश्वयुद्ध, आदिवासी समाज और उपनिवेशवाद, यूरोप में राष्ट्रवाद, समाजवाद एवं साम्यवाद, हिन्द-चीन में राष्ट्रवादी आंदोलन, भारत में राष्ट्रवाद (1914-1930), शहरीकरण, व्यापार और भूमंडलीकरण, तथा प्रेस और राष्ट्रवाद। भूगोल: भारत की स्थिति, भौतिक स्वरूप, अपवाह, वनस्पति, वन्य-प्राणी और जनसंख्या, भारत के पड़ोसी देश, मानचित्र अध्ययन, संसाधन, कृषि, उद्योग, परिवहन, संचार और व्यापार, तथा बिहार के प्राकृतिक संसाधन और जनसंख्या। नागरिक शास्त्र: समकालीन विश्व में लोकतंत्र, संविधान निर्माण, चुनावी राजनीति, संसदीय लोकतंत्र की संस्थाएं, लोकतांत्रिक अधिकार, सत्ता की साझेदारी, तथा लोकतंत्र की उपलब्धियां और चुनौतियां। अर्थशास्त्र: बिहार के एक गांव की कहानी, मानव एक संसाधन, गरीबी, बेकारी, कृषि और खाद्यान्न सुरक्षा, राज्य एवं राष्ट्र की आय, मुद्रा, बचत एवं साख, वित्तीय संस्थाएं, रोजगार एवं सेवाएं, वैश्वीकरण, तथा उपभोक्ता जागरण।"
        },
        {
          "name": "विज्ञान",
          "body": "कक्षा 9 और 10 के स्तर की भौतिकी, रसायन शास्त्र, प्राणि विज्ञान और वनस्पति विज्ञान: भोजन और पदार्थ, सजीवों का संसार और वर्गीकरण, गति, बल, गुरुत्वाकर्षण, कार्य, ऊर्जा और ध्वनि, प्राकृतिक संसाधन, विद्युत परिपथ और चुम्बक, प्रकाश तथा मानव आंख से जुड़ी प्राकृतिक घटनाएं, सजीवों में नियंत्रण और प्रजनन, आनुवंशिकी एवं जैव विकास, तथा प्राकृतिक संसाधनों का संरक्षण और ऊर्जा के स्रोत।"
        },
        {
          "name": "सामान्य ज्ञान एवं समसामयिक घटनाएं",
          "body": "अधिसूचना में सामान्य ज्ञान और समसामयिक घटनाओं को प्रश्नपत्र का एक क्षेत्र बताया गया है, पर इसके लिए विषय नहीं गिनाए गए हैं। रोज़ाना करेंट अफेयर्स पढ़ना इसकी तैयारी का व्यावहारिक तरीका है।"
        }
      ],
      "note": "हर भर्ती की अधिसूचना में अंक, समय और अर्हता मानक अलग से तय होते हैं और चक्रों के बीच बदल सकते हैं। ऊपर दिए गए विषयों को अध्ययन के लिए आधार मानें, और यहां देखें:",
      "noteLinkLabel": "पर्षद की आधिकारिक वेबसाइट",
      "recruitsHeading": "यह भर्ती किसके लिए है",
      "recruitsBody": "केंद्रीय चयन पर्षद (सिपाही भर्ती) एक ही भर्ती के ज़रिए बिहार पुलिस के जिला बलों और बिहार विशेष सशस्त्र पुलिस की वाहिनियों में सिपाही के पद भरता है, और आवेदन करते समय अभ्यर्थी दोनों में से अपनी प्राथमिकता देते हैं।",
      "offerHeading": "Pariksha Saathi बिहार पुलिस सिपाही के लिए क्या देता है",
      "offerBody": "ऊपर दिए विषयों के लिए मुफ्त विषयवार पाठ और अभ्यास, विषयवार सेक्शनल टेस्ट, पूर्ण-लंबाई मॉक टेस्ट, आपके कमज़ोर विषयों को अपने-आप ट्रैक करने वाली Mistake Notebook, और तारीख़वार करंट अफेयर्स कैप्सूल।",
      "sourceHeading": "आधिकारिक स्रोत और नवीनतम अपडेट",
      "officialLinkLabel": "केंद्रीय चयन पर्षद (सिपाही भर्ती), बिहार — आधिकारिक वेबसाइट",
      "examNoticesLinkLabel": "Pariksha Saathi पर नवीनतम एडमिट कार्ड, परिणाम और डेडलाइन अलर्ट",
      "ctaLabel": "बिहार पुलिस सिपाही की मुफ्त पढ़ाई शुरू करें",
      "backLabel": "होम",
      "disclaimer": "Pariksha Saathi एक स्वतंत्र परियोजना है और केंद्रीय चयन पर्षद (सिपाही भर्ती), बिहार या किसी भी सरकारी निकाय से संबद्ध नहीं है। ऊपर दिए गए सिलेबस और पैटर्न विवरण पर्षद की 2025 की अधिसूचना और पाठ्यक्रम से लिए गए हैं और बदल सकते हैं — हमेशा ऊपर दी गई आधिकारिक अधिसूचना से पुष्टि करें।"
    }
  },
  {
    "slug": "mp-police",
    "examName": "MP Police Constable",
    "officialUrl": "https://esb.mp.gov.in/Rulebooks/rule_books.htm",
    "en": {
      "pageTitle": "MP Police Constable Syllabus & Exam Pattern",
      "lede": "MP Police Constable (G.D.) recruitment has two stages: an online written test run by the MP Employees Selection Board, then a physical efficiency test run by the Police Department. Here’s the shape of it, taken from the Board’s 2026 rule book. The rule book names three areas for the written test and sets the level, but it does not give a topic list; the link below goes to the official source for exact marks and timing.",
      "stagesHeading": "The stages",
      "stages": [
        {
          "name": "Online written test",
          "body": "A computer-based objective test run by the MP Employees Selection Board, with all questions at the Class 8 level of the MP Board of Secondary Education. Home Guard candidates are exempt from it. The result is made by the percentile method, and the Board decides a cut-off percentile only after the exam."
        },
        {
          "name": "Physical efficiency test and document verification",
          "body": "Held by the Police Department for candidates called on the cut-off percentile: a timed run, long jump and shot put, with a check of physical standards and original documents. The marks from this stage are added to the written-test result for the final merit list."
        },
        {
          "name": "Medical, document and character verification",
          "body": "Selected candidates must attend a medical examination, document verification and character verification on the dates set by the department; a candidate who does not attend loses eligibility for selection."
        }
      ],
      "subjectsHeading": "What’s tested in the written test",
      "subjects": [
        {
          "name": "General Knowledge and Logical Reasoning",
          "body": "One of the three areas named in the rule book. The rule book sets the level (Class 8 of the MP Board of Secondary Education) but does not list topics under it."
        },
        {
          "name": "Intellectual Ability and Mental Aptitude",
          "body": "The second area named in the rule book, again at Class 8 level, with no topic list published."
        },
        {
          "name": "Science and Simple Arithmetic",
          "body": "The third area named in the rule book, at Class 8 level, with no topic list published. Practise Class 8 science and basic arithmetic."
        }
      ],
      "note": "Because the rule book gives no topic list, use the Class 8 level and the three area names above as your guide. Each cycle’s rule book sets its own marks, timing and standards, which can change, so check",
      "noteLinkLabel": "the Board’s own official site",
      "recruitsHeading": "What this recruitment is for",
      "recruitsBody": "The Madhya Pradesh Employees Selection Board runs the written test for Constable (G.D.) posts in Madhya Pradesh Police, in both the Special Armed Force and other units, including the Government Railway Police. Candidates give a cadre and unit preference when applying.",
      "offerHeading": "What Pariksha Saathi offers for MP Police Constable",
      "offerBody": "Free topic-wise lessons and practice for the subjects above, sectional tests by subject, full-length mock tests, a Mistake Notebook that tracks your weak topics automatically, and dated current-affairs capsules.",
      "sourceHeading": "Official source & latest updates",
      "officialLinkLabel": "MP Employees Selection Board — official rule books",
      "examNoticesLinkLabel": "Latest admit card, result and deadline alerts on Pariksha Saathi",
      "ctaLabel": "Start studying MP Police Constable free",
      "backLabel": "Home",
      "disclaimer": "Pariksha Saathi is an independent project and is not affiliated with the MP Employees Selection Board, the Madhya Pradesh Police or any government body. The syllabus and pattern details above come from the Board’s 2026 rule book and may change — always confirm against the official rule book linked above."
    },
    "hi": {
      "pageTitle": "एमपी पुलिस आरक्षक सिलेबस और परीक्षा पैटर्न",
      "lede": "एमपी पुलिस आरक्षक (जी.डी.) भर्ती में दो चरण होते हैं: पहले मध्यप्रदेश कर्मचारी चयन मण्डल की ऑनलाइन लिखित परीक्षा, फिर पुलिस विभाग की शारीरिक दक्षता परीक्षा। यहां मण्डल की 2026 की नियम पुस्तिका के आधार पर इसकी संरचना दी गई है। नियम पुस्तिका में लिखित परीक्षा के तीन क्षेत्र और उसका स्तर बताया गया है, पर विषयों की सूची नहीं दी गई है; सटीक अंक और समय के लिए नीचे आधिकारिक स्रोत का लिंक है।",
      "stagesHeading": "चरण",
      "stages": [
        {
          "name": "ऑनलाइन लिखित परीक्षा",
          "body": "मध्यप्रदेश कर्मचारी चयन मण्डल द्वारा आयोजित कंप्यूटर आधारित वस्तुनिष्ठ परीक्षा, जिसके सभी प्रश्न म.प्र. माध्यमिक शिक्षा मण्डल की आठवीं कक्षा के स्तर के होते हैं। होमगार्ड अभ्यर्थियों को इससे छूट है। परिणाम परसेंटाइल पद्धति से बनता है, और कट-ऑफ परसेंटाइल परीक्षा के बाद ही तय होता है।"
        },
        {
          "name": "शारीरिक दक्षता परीक्षण और दस्तावेज़ परीक्षण",
          "body": "कट-ऑफ परसेंटाइल पर बुलाए गए अभ्यर्थियों के लिए पुलिस विभाग द्वारा आयोजित: समयबद्ध दौड़, लंबी कूद और गोला फेंक, साथ में शारीरिक मापदंडों और मूल दस्तावेज़ों की जांच। इस चरण के अंक अंतिम प्रवीणता सूची के लिए लिखित परीक्षा के परिणाम में जोड़े जाते हैं।"
        },
        {
          "name": "मेडिकल, दस्तावेज़ और चरित्र सत्यापन",
          "body": "चयनित अभ्यर्थियों को विभाग द्वारा तय तारीख को मेडिकल, दस्तावेज़ परीक्षण और चरित्र सत्यापन के लिए उपस्थित होना अनिवार्य है; उपस्थित न होने पर चयन की पात्रता समाप्त हो जाती है।"
        }
      ],
      "subjectsHeading": "लिखित परीक्षा में क्या परखा जाता है",
      "subjects": [
        {
          "name": "सामान्य ज्ञान एवं तार्किक ज्ञान",
          "body": "नियम पुस्तिका में बताए गए तीन क्षेत्रों में से एक। नियम पुस्तिका में स्तर (म.प्र. माध्यमिक शिक्षा मण्डल की आठवीं कक्षा) बताया गया है, पर इसके अंतर्गत विषयों की सूची नहीं दी गई है।"
        },
        {
          "name": "बौद्धिक क्षमता एवं मानसिक अभिरुचि",
          "body": "नियम पुस्तिका में बताया गया दूसरा क्षेत्र, इसमें भी आठवीं कक्षा का स्तर है, और विषयों की कोई सूची प्रकाशित नहीं है।"
        },
        {
          "name": "विज्ञान एवं सरल अंक गणित",
          "body": "नियम पुस्तिका में बताया गया तीसरा क्षेत्र, आठवीं कक्षा के स्तर का, और विषयों की कोई सूची प्रकाशित नहीं है। आठवीं कक्षा के विज्ञान और बुनियादी अंकगणित का अभ्यास करें।"
        }
      ],
      "note": "नियम पुस्तिका में विषयों की सूची नहीं है, इसलिए आठवीं कक्षा के स्तर और ऊपर दिए तीन क्षेत्रों के नामों को अपना मार्गदर्शक मानें। हर चक्र की नियम पुस्तिका में अंक, समय और मानक अलग से तय होते हैं और बदल सकते हैं, इसलिए यहां देखें:",
      "noteLinkLabel": "मण्डल की आधिकारिक वेबसाइट",
      "recruitsHeading": "यह भर्ती किसके लिए है",
      "recruitsBody": "मध्यप्रदेश कर्मचारी चयन मण्डल मध्यप्रदेश पुलिस में आरक्षक (जी.डी.) के पदों के लिए लिखित परीक्षा आयोजित करता है, जिसमें विशेष सशस्त्र बल और अन्य इकाइयां, शासकीय रेल पुलिस सहित, दोनों शामिल हैं। आवेदन करते समय अभ्यर्थी संवर्ग और इकाई की प्राथमिकता देते हैं।",
      "offerHeading": "Pariksha Saathi एमपी पुलिस आरक्षक के लिए क्या देता है",
      "offerBody": "ऊपर दिए विषयों के लिए मुफ्त विषयवार पाठ और अभ्यास, विषयवार सेक्शनल टेस्ट, पूर्ण-लंबाई मॉक टेस्ट, आपके कमज़ोर विषयों को अपने-आप ट्रैक करने वाली Mistake Notebook, और तारीख़वार करंट अफेयर्स कैप्सूल।",
      "sourceHeading": "आधिकारिक स्रोत और नवीनतम अपडेट",
      "officialLinkLabel": "मध्यप्रदेश कर्मचारी चयन मण्डल — आधिकारिक नियम पुस्तिकाएं",
      "examNoticesLinkLabel": "Pariksha Saathi पर नवीनतम एडमिट कार्ड, परिणाम और डेडलाइन अलर्ट",
      "ctaLabel": "एमपी पुलिस आरक्षक की मुफ्त पढ़ाई शुरू करें",
      "backLabel": "होम",
      "disclaimer": "Pariksha Saathi एक स्वतंत्र परियोजना है और मध्यप्रदेश कर्मचारी चयन मण्डल, मध्यप्रदेश पुलिस या किसी भी सरकारी निकाय से संबद्ध नहीं है। ऊपर दिए गए सिलेबस और पैटर्न विवरण मण्डल की 2026 की नियम पुस्तिका से लिए गए हैं और बदल सकते हैं — हमेशा ऊपर दी गई आधिकारिक नियम पुस्तिका से पुष्टि करें।"
    }
  },
  {
    "slug": "rajasthan-police",
    "examName": "Rajasthan Police Constable",
    "officialUrl": "https://police.rajasthan.gov.in/portal/RecruitmentsResults",
    "en": {
      "pageTitle": "Rajasthan Police Constable Syllabus & Exam Pattern",
      "lede": "Rajasthan Police Constable recruitment starts from the Common Eligibility Test and runs through a written test and physical tests. Here’s the shape of it and the areas tested, taken from the Rajasthan Police 2025 constable notification and its standing order, with a link to the official source for exact marks and timing.",
      "stagesHeading": "The stages",
      "stages": [
        {
          "name": "Common Eligibility Test (Senior Secondary Level)",
          "body": "The gateway to the recruitment. For the 2025 constable recruitment, the notification invited applications only from candidates who had cleared the 2024 test."
        },
        {
          "name": "Written test",
          "body": "One OMR-based objective paper in three parts, with negative marking for wrong answers. Its marks count towards the final selection. There is no written test for Constable (Band)."
        },
        {
          "name": "Physical efficiency test and physical standard test",
          "body": "A qualifying timed run, followed by measurement of height, chest (men) or height and weight (women). Constable (Band) candidates come straight to this stage."
        },
        {
          "name": "Proficiency test (Driver and Band posts)",
          "body": "Practical tests of driving and vehicle upkeep for Constable (Driver), and of band instruments and tunes for Constable (Band)."
        }
      ],
      "subjectsHeading": "What’s tested in the written test",
      "subjects": [
        {
          "name": "Reasoning, Logical Aptitude, General Mathematics and basic Computer Knowledge",
          "body": "The first part of the paper, as named in the notification. It does not publish a topic list."
        },
        {
          "name": "General Knowledge, General Science, Social Science and Current Affairs",
          "body": "The second part, which also covers the rights of women and children and the schemes and institutions the Rajasthan Government runs for them. No topic list is published."
        },
        {
          "name": "History, Culture, Art, Geography, Polity and Economy of Rajasthan",
          "body": "The third part, on Rajasthan itself. No topic list is published."
        }
      ],
      "note": "The notification names the three parts but gives no topic list, and each recruitment sets its own marks, timing and standards, which can change. Treat the areas above as the shape to study toward, and check",
      "noteLinkLabel": "Rajasthan Police’s own recruitment page",
      "recruitsHeading": "What this recruitment is for",
      "recruitsBody": "Rajasthan Police fills Constable (General Duty), Constable (Driver) and Constable (Band) posts in its districts, units and battalions, with Police Telecom constable posts advertised separately. Candidates apply to one district or unit and one post.",
      "offerHeading": "What Pariksha Saathi offers for Rajasthan Police Constable",
      "offerBody": "Free topic-wise lessons and practice for the subjects above, sectional tests by subject, full-length mock tests, a Mistake Notebook that tracks your weak topics automatically, and dated current-affairs capsules.",
      "sourceHeading": "Official source & latest updates",
      "officialLinkLabel": "Rajasthan Police — recruitments and results",
      "examNoticesLinkLabel": "Latest admit card, result and deadline alerts on Pariksha Saathi",
      "ctaLabel": "Start studying Rajasthan Police Constable free",
      "backLabel": "Home",
      "disclaimer": "Pariksha Saathi is an independent project and is not affiliated with Rajasthan Police or any government body. The syllabus and pattern details above come from the 2025 constable notification and standing order and may change — always confirm against the official notification linked above."
    },
    "hi": {
      "pageTitle": "राजस्थान पुलिस कांस्टेबल सिलेबस और परीक्षा पैटर्न",
      "lede": "राजस्थान पुलिस कांस्टेबल भर्ती समान पात्रता परीक्षा से शुरू होती है और लिखित परीक्षा तथा शारीरिक परीक्षाओं से गुजरती है। यहां राजस्थान पुलिस की 2025 की कांस्टेबल भर्ती अधिसूचना और स्थाई आदेश के आधार पर इसकी संरचना और परखे जाने वाले क्षेत्र दिए गए हैं, साथ ही सटीक अंक और समय के लिए आधिकारिक स्रोत का लिंक भी।",
      "stagesHeading": "चरण",
      "stages": [
        {
          "name": "समान पात्रता परीक्षा (सीनियर सैकण्डरी लेवल)",
          "body": "भर्ती का प्रवेश द्वार। 2025 की कांस्टेबल भर्ती में अधिसूचना के अनुसार केवल उन्हीं अभ्यर्थियों से आवेदन मांगे गए जो 2024 की परीक्षा में सफल रहे थे।"
        },
        {
          "name": "लिखित परीक्षा",
          "body": "तीन भागों का एक ओएमआर आधारित वस्तुनिष्ठ प्रश्नपत्र, जिसमें गलत उत्तर पर नेगेटिव मार्किंग है। इसके अंक अंतिम चयन में जोड़े जाते हैं। कॉन्स्टेबल (बैण्ड) के लिए लिखित परीक्षा नहीं होती।"
        },
        {
          "name": "शारीरिक दक्षता परीक्षा और शारीरिक मापतौल परीक्षा",
          "body": "एक अर्हक समयबद्ध दौड़, उसके बाद ऊंचाई, सीने (पुरुष) या ऊंचाई और वजन (महिला) की माप। कॉन्स्टेबल (बैण्ड) के अभ्यर्थी सीधे इसी चरण में आते हैं।"
        },
        {
          "name": "दक्षता परीक्षा (चालक और बैण्ड पद)",
          "body": "कॉन्स्टेबल (चालक) के लिए वाहन चालन और रखरखाव की प्रायोगिक परीक्षाएं, और कॉन्स्टेबल (बैण्ड) के लिए बैण्ड वाद्य और धुनों की प्रायोगिक परीक्षाएं।"
        }
      ],
      "subjectsHeading": "लिखित परीक्षा में क्या परखा जाता है",
      "subjects": [
        {
          "name": "विवेचना, तार्किक योग्यता, सामान्य गणित एवं कंप्यूटर का सामान्य ज्ञान",
          "body": "अधिसूचना में बताया गया प्रश्नपत्र का पहला भाग। इसके लिए विषयों की सूची प्रकाशित नहीं है।"
        },
        {
          "name": "सामान्य ज्ञान, सामान्य विज्ञान, सामाजिक विज्ञान एवं समसामयिक विषय",
          "body": "दूसरा भाग, जिसमें महिलाओं और बच्चों के अधिकार तथा उनके लिए राजस्थान सरकार की योजनाएं और संस्थाएं भी शामिल हैं। विषयों की कोई सूची प्रकाशित नहीं है।"
        },
        {
          "name": "राजस्थान का इतिहास, संस्कृति, कला, भूगोल, राजनीति एवं आर्थिक स्थिति",
          "body": "तीसरा भाग, जो राजस्थान पर केंद्रित है। विषयों की कोई सूची प्रकाशित नहीं है।"
        }
      ],
      "note": "अधिसूचना में तीन भागों के नाम दिए गए हैं, पर विषयों की सूची नहीं है, और हर भर्ती में अंक, समय और मानक अलग से तय होते हैं और बदल सकते हैं। ऊपर दिए क्षेत्रों को अध्ययन के लिए आधार मानें, और यहां देखें:",
      "noteLinkLabel": "राजस्थान पुलिस का भर्ती पेज",
      "recruitsHeading": "यह भर्ती किसके लिए है",
      "recruitsBody": "राजस्थान पुलिस अपने जिलों, इकाइयों और बटालियनों में कॉन्स्टेबल (सामान्य), कॉन्स्टेबल (चालक) और कॉन्स्टेबल (बैण्ड) के पद भरती है; पुलिस दूरसंचार के कॉन्स्टेबल पद अलग से विज्ञापित होते हैं। अभ्यर्थी एक जिला या यूनिट और एक पद के लिए आवेदन करते हैं।",
      "offerHeading": "Pariksha Saathi राजस्थान पुलिस कांस्टेबल के लिए क्या देता है",
      "offerBody": "ऊपर दिए विषयों के लिए मुफ्त विषयवार पाठ और अभ्यास, विषयवार सेक्शनल टेस्ट, पूर्ण-लंबाई मॉक टेस्ट, आपके कमज़ोर विषयों को अपने-आप ट्रैक करने वाली Mistake Notebook, और तारीख़वार करंट अफेयर्स कैप्सूल।",
      "sourceHeading": "आधिकारिक स्रोत और नवीनतम अपडेट",
      "officialLinkLabel": "राजस्थान पुलिस — भर्तियां और परिणाम",
      "examNoticesLinkLabel": "Pariksha Saathi पर नवीनतम एडमिट कार्ड, परिणाम और डेडलाइन अलर्ट",
      "ctaLabel": "राजस्थान पुलिस कांस्टेबल की मुफ्त पढ़ाई शुरू करें",
      "backLabel": "होम",
      "disclaimer": "Pariksha Saathi एक स्वतंत्र परियोजना है और राजस्थान पुलिस या किसी भी सरकारी निकाय से संबद्ध नहीं है। ऊपर दिए गए सिलेबस और पैटर्न विवरण 2025 की कांस्टेबल भर्ती अधिसूचना और स्थाई आदेश से लिए गए हैं और बदल सकते हैं — हमेशा ऊपर दी गई आधिकारिक अधिसूचना से पुष्टि करें।"
    }
  },
  {
    "slug": "bpsc",
    "examName": "BPSC CCE",
    "officialUrl": "https://bpsc.bihar.gov.in/",
    "en": {
      "pageTitle": "BPSC Combined Competitive Exam (CCE) Syllabus & Exam Pattern",
      "lede": "The Bihar Public Service Commission’s Combined Competitive Examination (CCE) runs in three stages: a Preliminary screening test, a Main (written) examination and an interview. Here’s the structure and the subjects each stage tests, with a link to the official notification for this cycle’s exact marks, timing and vacancies.",
      "stagesHeading": "The stages",
      "stages": [
        {
          "name": "Preliminary examination",
          "body": "One objective General Studies paper that works only as a screening test. Its marks are not counted in the Main examination or the final merit list; candidates in a fixed multiple of the notified vacancies are called for the Main examination."
        },
        {
          "name": "Main (written) examination",
          "body": "Descriptive papers: General Hindi (a qualifying paper whose marks do not count for merit), General Studies Paper I, General Studies Paper II and an Essay, plus an optional-subject paper. For some posts (such as Child Development Project Officer, Financial Administrative Officer and Sub-Divisional Protection Officer) the optional paper is a full descriptive paper that counts for merit."
        },
        {
          "name": "Interview",
          "body": "Candidates who clear the Main examination are called for a personality test. The final merit list combines Main examination and interview marks."
        }
      ],
      "subjectsHeading": "What’s tested",
      "subjects": [
        {
          "name": "Preliminary: General Studies",
          "body": "General science; important national and international current events; the history of India and of Bihar; general geography, including Bihar’s main physical divisions and important rivers; the Indian polity and economy; major changes in Bihar’s economy since independence; the Indian national movement and Bihar’s contribution to it; and general mental ability."
        },
        {
          "name": "Main: General Studies Paper I",
          "body": "Modern Indian history and Indian culture; current events of national and international importance; statistical analysis, graphs and diagrams."
        },
        {
          "name": "Main: General Studies Paper II",
          "body": "Indian polity (including Bihar’s political system); the Indian economy, including planning; the physical, economic and social geography of India and Bihar; and the role and impact of science and technology in development."
        },
        {
          "name": "Main: General Hindi",
          "body": "A qualifying paper at secondary-school level that tests clear, correct expression in simple Hindi: essay, grammar, sentence construction and précis writing."
        },
        {
          "name": "Main: Essay",
          "body": "A descriptive essay paper, listed as a separate Main paper in the 72nd CCE notice."
        },
        {
          "name": "Main: optional subject",
          "body": "One subject chosen from the list in the notice, which covers sciences, engineering, commerce and accountancy, economics, geography, history, law, mathematics, philosophy, political science, psychology, public administration, sociology, statistics and several languages and literatures."
        }
      ],
      "note": "The exact marks, number of questions, timing and negative marking are set by each cycle’s own notification (the 72nd CCE notice of 5 May 2026 is the latest), and the Commission can revise them. Treat the subjects above as the stable shape to study toward, and check",
      "noteLinkLabel": "BPSC’s own website",
      "recruitsHeading": "What the CCE recruits for",
      "recruitsBody": "The 72nd CCE notice lists posts such as Sub-Divisional Officer / Senior Deputy Collector (Bihar Administrative Service), Deputy Superintendent of Police, Assistant Commissioner of State Tax, Revenue Officer, Municipal Executive Officer, Block Panchayat Raj Officer and Supply Inspector. Child Development Project Officer, Financial Administrative Officer and Sub-Divisional Protection Officer posts are filled through the same Preliminary test. The post-wise vacancy table is in the notice.",
      "offerHeading": "What Pariksha Saathi offers for BPSC",
      "offerBody": "Free topic-wise lessons and practice for the General Studies side of the Preliminary examination: history, polity, geography, economy, environment, general science, art and culture, plus Bihar General Knowledge.",
      "sourceHeading": "Official source & latest updates",
      "officialLinkLabel": "BPSC — official website",
      "examNoticesLinkLabel": "Latest admit card, result and deadline alerts on Pariksha Saathi",
      "ctaLabel": "Start studying for BPSC free",
      "backLabel": "Home",
      "disclaimer": "Pariksha Saathi is an independent project and is not affiliated with BPSC or any government body. Syllabus and pattern details above are general and may change — always confirm against the official notification linked above."
    },
    "hi": {
      "pageTitle": "BPSC संयुक्त प्रतियोगिता परीक्षा (CCE) सिलेबस और परीक्षा पैटर्न",
      "lede": "बिहार लोक सेवा आयोग की संयुक्त प्रतियोगिता परीक्षा (CCE) तीन चरणों में होती है: प्रारंभिक जाँच परीक्षा, मुख्य (लिखित) परीक्षा और साक्षात्कार। यहाँ इसकी संरचना और हर चरण में परखे जाने वाले विषय दिए गए हैं, साथ ही इस चक्र की आधिकारिक अधिसूचना का लिंक भी, जहाँ से सटीक अंक, समय और रिक्तियाँ मिलेंगी।",
      "stagesHeading": "चरण",
      "stages": [
        {
          "name": "प्रारंभिक परीक्षा",
          "body": "सामान्य अध्ययन का एक वस्तुनिष्ठ प्रश्नपत्र, जो केवल जाँच परीक्षा का काम करता है। इसके अंक मुख्य परीक्षा या अंतिम मेधा सूची में नहीं जोड़े जाते; अधिसूचित रिक्तियों के एक निश्चित गुना अभ्यर्थियों को मुख्य परीक्षा के लिए बुलाया जाता है।"
        },
        {
          "name": "मुख्य (लिखित) परीक्षा",
          "body": "वर्णनात्मक प्रश्नपत्र: सामान्य हिन्दी (अर्हक प्रश्नपत्र, जिसके अंक मेधा में नहीं गिने जाते), सामान्य अध्ययन प्रथम और द्वितीय प्रश्नपत्र तथा निबंध, साथ में एक वैकल्पिक विषय का प्रश्नपत्र। कुछ पदों (जैसे बाल विकास परियोजना पदाधिकारी, वित्तीय प्रशासनिक पदाधिकारी और अनुमंडल संरक्षण पदाधिकारी) के लिए वैकल्पिक प्रश्नपत्र पूरा वर्णनात्मक होता है और मेधा में गिना जाता है।"
        },
        {
          "name": "साक्षात्कार",
          "body": "मुख्य परीक्षा पास करने वाले अभ्यर्थियों को व्यक्तित्व परीक्षण के लिए बुलाया जाता है। अंतिम मेधा सूची मुख्य परीक्षा और साक्षात्कार के अंकों को जोड़कर बनती है।"
        }
      ],
      "subjectsHeading": "क्या परखा जाता है",
      "subjects": [
        {
          "name": "प्रारंभिक: सामान्य अध्ययन",
          "body": "सामान्य विज्ञान; राष्ट्रीय तथा अंतर्राष्ट्रीय महत्व की समसामयिक घटनाएँ; भारत का इतिहास और बिहार का इतिहास; सामान्य भूगोल, जिसमें बिहार के प्रमुख भौगोलिक विभाग और महत्वपूर्ण नदियाँ शामिल हैं; भारत की राज्य व्यवस्था और आर्थिक व्यवस्था; आज़ादी के बाद बिहार की अर्थव्यवस्था के प्रमुख परिवर्तन; भारत का राष्ट्रीय आंदोलन और उसमें बिहार का योगदान; तथा सामान्य मानसिक योग्यता।"
        },
        {
          "name": "मुख्य: सामान्य अध्ययन प्रथम प्रश्नपत्र",
          "body": "आधुनिक भारत का इतिहास और भारतीय संस्कृति; राष्ट्रीय तथा अंतर्राष्ट्रीय महत्व का वर्तमान घटना चक्र; सांख्यिकीय विश्लेषण, आरेखन और चित्रण।"
        },
        {
          "name": "मुख्य: सामान्य अध्ययन द्वितीय प्रश्नपत्र",
          "body": "भारतीय राज्य व्यवस्था (बिहार की राजनीतिक व्यवस्था सहित); भारतीय अर्थव्यवस्था और योजना; भारत और बिहार का भौतिक, आर्थिक और सामाजिक भूगोल; तथा विकास में विज्ञान और प्रौद्योगिकी की भूमिका और प्रभाव।"
        },
        {
          "name": "मुख्य: सामान्य हिन्दी",
          "body": "माध्यमिक स्तर का एक अर्हक प्रश्नपत्र, जो सरल हिन्दी में स्पष्ट और शुद्ध अभिव्यक्ति की क्षमता परखता है: निबंध, व्याकरण, वाक्य विन्यास और संक्षेपण।"
        },
        {
          "name": "मुख्य: निबंध",
          "body": "वर्णनात्मक निबंध का प्रश्नपत्र, जो 72वीं संयुक्त परीक्षा की अधिसूचना में मुख्य परीक्षा के अलग प्रश्नपत्र के रूप में दिया गया है।"
        },
        {
          "name": "मुख्य: वैकल्पिक विषय",
          "body": "अधिसूचना की सूची में से चुना गया एक विषय, जिसमें विज्ञान, इंजीनियरिंग, वाणिज्य एवं लेखाविधि, अर्थशास्त्र, भूगोल, इतिहास, विधि, गणित, दर्शनशास्त्र, राजनीति विज्ञान, मनोविज्ञान, लोक प्रशासन, समाजशास्त्र, सांख्यिकी और कई भाषाएँ व साहित्य शामिल हैं।"
        }
      ],
      "note": "सटीक अंक, प्रश्नों की संख्या, समय और नेगेटिव मार्किंग हर चक्र की अपनी अधिसूचना (72वीं CCE की 5 मई 2026 की अधिसूचना नवीनतम है) द्वारा तय होते हैं और आयोग इन्हें बदल सकता है। ऊपर दिए विषयों को अध्ययन के लिए स्थिर आधार मानें, और देखें",
      "noteLinkLabel": "BPSC की अपनी वेबसाइट",
      "recruitsHeading": "CCE किन पदों के लिए भर्ती करती है",
      "recruitsBody": "72वीं CCE की अधिसूचना में अनुमंडल पदाधिकारी / वरीय उप समाहर्त्ता (बिहार प्रशासनिक सेवा), पुलिस उपाधीक्षक, राज्य कर सहायक आयुक्त, राजस्व अधिकारी, नगर कार्यपालक पदाधिकारी, प्रखंड पंचायत राज पदाधिकारी और आपूर्ति निरीक्षक जैसे पद दिए गए हैं। बाल विकास परियोजना पदाधिकारी, वित्तीय प्रशासनिक पदाधिकारी और अनुमंडल संरक्षण पदाधिकारी के पद इसी प्रारंभिक परीक्षा से भरे जाते हैं। पदवार रिक्तियों की तालिका अधिसूचना में है।",
      "offerHeading": "Pariksha Saathi BPSC के लिए क्या देता है",
      "offerBody": "प्रारंभिक परीक्षा के सामान्य अध्ययन वाले हिस्से के लिए मुफ्त विषयवार पाठ और अभ्यास: इतिहास, राज्य व्यवस्था, भूगोल, अर्थव्यवस्था, पर्यावरण, सामान्य विज्ञान, कला एवं संस्कृति, साथ ही बिहार सामान्य ज्ञान।",
      "sourceHeading": "आधिकारिक स्रोत और नवीनतम अपडेट",
      "officialLinkLabel": "BPSC — आधिकारिक वेबसाइट",
      "examNoticesLinkLabel": "Pariksha Saathi पर नवीनतम एडमिट कार्ड, परिणाम और डेडलाइन अलर्ट",
      "ctaLabel": "BPSC की मुफ्त पढ़ाई शुरू करें",
      "backLabel": "होम",
      "disclaimer": "Pariksha Saathi एक स्वतंत्र परियोजना है और BPSC या किसी भी सरकारी निकाय से संबद्ध नहीं है। ऊपर दिए गए सिलेबस और पैटर्न विवरण सामान्य हैं और बदल सकते हैं — हमेशा ऊपर दी गई आधिकारिक अधिसूचना से पुष्टि करें।"
    }
  },
  {
    "slug": "mppsc",
    "examName": "MPPSC State Service",
    "officialUrl": "https://mppsc.mp.gov.in/",
    "en": {
      "pageTitle": "MPPSC State Service Exam Syllabus & Exam Pattern",
      "lede": "The Madhya Pradesh Public Service Commission’s State Service Examination runs in three stages: a two-paper Preliminary examination, a six-paper Main (written) examination and an interview. Here’s the structure and what each stage tests, with a link to the official notification for this cycle’s exact marks, timing and vacancies.",
      "stagesHeading": "The stages",
      "stages": [
        {
          "name": "Preliminary examination",
          "body": "Two objective papers: General Studies (Paper I) and a General Aptitude Test (Paper II). It is an eligibility test only: Paper I marks decide who is shortlisted for the Main examination, Paper II is qualifying, and neither is counted in the final merit."
        },
        {
          "name": "Main (written) examination",
          "body": "Six descriptive papers, all compulsory: four General Studies papers (each in two parts), General Hindi and Grammar, and Hindi Essay and Drafting. The General Studies papers can be answered in Hindi or English."
        },
        {
          "name": "Interview",
          "body": "Candidates shortlisted on Main examination marks are called for an interview. The final merit list adds Main examination and interview marks."
        }
      ],
      "subjectsHeading": "What’s tested",
      "subjects": [
        {
          "name": "Preliminary Paper I: General Studies",
          "body": "History of India (ancient and medieval India, reform movements, the freedom struggle and post-independence consolidation); history, culture and literature of Madhya Pradesh; geography of India and of Madhya Pradesh; the constitutional system of India and Madhya Pradesh; the economy of India and Madhya Pradesh; science, environment and health; international, national and Madhya Pradesh current affairs; information and communication technology; and the tribes, heritage, folk culture and folk literature of Madhya Pradesh."
        },
        {
          "name": "Preliminary Paper II: General Aptitude Test",
          "body": "Comprehension; communication skills; logical and analytical ability; decision-making and problem-solving; general mental ability; basic numeracy (number relations, magnitudes, data interpretation, Class X level); and Hindi comprehension (Class X level), set in Hindi only."
        },
        {
          "name": "Main Paper I: History and Geography",
          "body": "Indian history from the Harappan civilisation to the freedom movement and the post-independence period, with Madhya Pradesh’s dynasties, princely states and tribal heroes; and the geography of India and Madhya Pradesh: physical features and climate, agriculture and water, natural resources and industries, and disasters."
        },
        {
          "name": "Main Paper II: Political Science and Sociology",
          "body": "The Indian Constitution and governance, constitutional and statutory bodies, Indian political thinkers, and Madhya Pradesh’s political and administrative structure; sociological concepts, diversity and challenges in Indian society, rural and urban sociology, industrialisation and globalisation, population and social welfare schemes."
        },
        {
          "name": "Main Paper III: Economics; Science, Technology and Public Health",
          "body": "The Indian and Madhya Pradesh economy, taxation and policy, statistics and data analysis; general science, computer science, AYUSH and health systems, national health programmes and the environment."
        },
        {
          "name": "Main Paper IV: Philosophy, Psychology, Public Administration, Entrepreneurship and Management",
          "body": "Indian philosophy and thinkers, nation building and moral concepts, human behaviour and moral values in public administration; entrepreneurship, business organisation and management, administration and overall personality development. Each part ends with a case study."
        },
        {
          "name": "Main Paper V: General Hindi and Grammar",
          "body": "A Hindi-medium language paper testing Hindi usage and grammar."
        },
        {
          "name": "Main Paper VI: Hindi Essay and Drafting",
          "body": "Essays, drafting of official and semi-official letters, circulars, forms, advertisements, orders, endorsements and reminder letters, and report writing, all in Hindi."
        }
      ],
      "note": "The exact marks, number of questions, timing and negative marking are set by each cycle’s own notification and exam plan (the 2026 plan was revised on 21 January 2026) and can change. Treat the subjects above as the stable shape to study toward, and check",
      "noteLinkLabel": "MPPSC’s own website",
      "recruitsHeading": "What the State Service Examination recruits for",
      "recruitsBody": "The 2026 notice (Advt. No. 29/2025) names posts such as Deputy Collector, Deputy Superintendent of Police, Commercial Tax Officer, District Registrar, Block Development Officer, Chief Municipal Officer, Naib Tahsildar, Excise Sub-Inspector and Sub-Registrar. The post-wise vacancy table is in the notice.",
      "offerHeading": "What Pariksha Saathi offers for MPPSC",
      "offerBody": "Free topic-wise lessons and practice for the General Studies paper of the Preliminary examination: history, polity, geography, economy, environment, general science, art and culture, plus Madhya Pradesh General Knowledge. They do not cover the General Aptitude Test.",
      "sourceHeading": "Official source & latest updates",
      "officialLinkLabel": "MPPSC — official website",
      "examNoticesLinkLabel": "Latest admit card, result and deadline alerts on Pariksha Saathi",
      "ctaLabel": "Start studying for MPPSC free",
      "backLabel": "Home",
      "disclaimer": "Pariksha Saathi is an independent project and is not affiliated with MPPSC or any government body. Syllabus and pattern details above are general and may change — always confirm against the official notification linked above."
    },
    "hi": {
      "pageTitle": "MPPSC राज्य सेवा परीक्षा सिलेबस और परीक्षा पैटर्न",
      "lede": "मध्य प्रदेश लोक सेवा आयोग की राज्य सेवा परीक्षा तीन चरणों में होती है: दो प्रश्नपत्रों वाली प्रारंभिक परीक्षा, छह प्रश्नपत्रों वाली मुख्य (लिखित) परीक्षा और साक्षात्कार। यहाँ इसकी संरचना और हर चरण में परखी जाने वाली बातें दी गई हैं, साथ ही इस चक्र की आधिकारिक अधिसूचना का लिंक भी, जहाँ से सटीक अंक, समय और रिक्तियाँ मिलेंगी।",
      "stagesHeading": "चरण",
      "stages": [
        {
          "name": "प्रारंभिक परीक्षा",
          "body": "दो वस्तुनिष्ठ प्रश्नपत्र: सामान्य अध्ययन (प्रथम प्रश्नपत्र) और सामान्य अभिरुचि परीक्षण (द्वितीय प्रश्नपत्र)। यह केवल पात्रता परीक्षा है: प्रथम प्रश्नपत्र के अंकों से तय होता है कि मुख्य परीक्षा के लिए कौन लघुसूचीकृत होगा, द्वितीय प्रश्नपत्र अर्हक है, और दोनों के अंक अंतिम मेरिट में नहीं गिने जाते।"
        },
        {
          "name": "मुख्य (लिखित) परीक्षा",
          "body": "छह वर्णनात्मक प्रश्नपत्र, सभी अनिवार्य: सामान्य अध्ययन के चार प्रश्नपत्र (प्रत्येक दो खंडों में), सामान्य हिन्दी एवं व्याकरण, तथा हिन्दी निबंध एवं प्रारूप लेखन। सामान्य अध्ययन के प्रश्नपत्रों के उत्तर हिंदी या अंग्रेजी में दिए जा सकते हैं।"
        },
        {
          "name": "साक्षात्कार",
          "body": "मुख्य परीक्षा के अंकों के आधार पर लघुसूचीकृत अभ्यर्थियों को साक्षात्कार के लिए बुलाया जाता है। अंतिम मेरिट सूची में मुख्य परीक्षा और साक्षात्कार के अंक जोड़े जाते हैं।"
        }
      ],
      "subjectsHeading": "क्या परखा जाता है",
      "subjects": [
        {
          "name": "प्रारंभिक प्रथम प्रश्नपत्र: सामान्य अध्ययन",
          "body": "भारत का इतिहास (प्राचीन और मध्यकालीन भारत, सामाजिक-धार्मिक सुधार आंदोलन, स्वतंत्रता संघर्ष और स्वतंत्रता के बाद एकीकरण); मध्य प्रदेश का इतिहास, संस्कृति एवं साहित्य; भारत और मध्य प्रदेश का भूगोल; भारत एवं मध्य प्रदेश की संवैधानिक व्यवस्था; भारत एवं मध्य प्रदेश की अर्थव्यवस्था; विज्ञान, पर्यावरण एवं स्वास्थ्य; अंतर्राष्ट्रीय, राष्ट्रीय और मध्य प्रदेश की समसामयिक घटनाएँ; सूचना एवं संचार प्रौद्योगिकी; तथा मध्य प्रदेश की जनजातियाँ, विरासत, लोक संस्कृति एवं लोक साहित्य।"
        },
        {
          "name": "प्रारंभिक द्वितीय प्रश्नपत्र: सामान्य अभिरुचि परीक्षण",
          "body": "बोधगम्यता; सम्प्रेषण कौशल; तार्किक एवं विश्लेषणात्मक क्षमता; निर्णय लेना एवं समस्या समाधान; सामान्य मानसिक योग्यता; आधारभूत संख्यात्मकता (संख्याएँ और उनके संबंध, परिमाण क्रम, आँकड़ों का निर्वचन, दसवीं कक्षा स्तर); तथा हिन्दी भाषा में बोधगम्यता कौशल (दसवीं कक्षा स्तर), जो केवल हिंदी में पूछा जाता है।"
        },
        {
          "name": "मुख्य प्रथम प्रश्नपत्र: इतिहास एवं भूगोल",
          "body": "हड़प्पा सभ्यता से लेकर स्वतंत्रता आंदोलन और स्वतंत्रता के बाद के काल तक भारत का इतिहास, साथ में मध्य प्रदेश के राजवंश, रियासतें और जनजातीय नायक; तथा भारत और मध्य प्रदेश का भूगोल: भौतिक स्वरूप एवं जलवायु, कृषि और जल, प्राकृतिक संसाधन एवं उद्योग, और आपदाएँ।"
        },
        {
          "name": "मुख्य द्वितीय प्रश्नपत्र: राजनीति विज्ञान एवं समाजशास्त्र",
          "body": "भारत का संविधान और शासन, संवैधानिक एवं वैधानिक संस्थाएँ, भारतीय राजनीतिक चिंतक और मध्य प्रदेश की राजनीतिक व प्रशासनिक संरचना; समाजशास्त्र की मूल अवधारणाएँ, भारतीय समाज की विविधता और चुनौतियाँ, ग्रामीण एवं नगरीय समाजशास्त्र, औद्योगीकरण और वैश्वीकरण, जनसंख्या तथा सामाजिक कल्याण योजनाएँ।"
        },
        {
          "name": "मुख्य तृतीय प्रश्नपत्र: अर्थशास्त्र; विज्ञान, तकनीकी एवं जन स्वास्थ्य",
          "body": "भारत और मध्य प्रदेश की अर्थव्यवस्था, कराधान और नीतिगत परिदृश्य, सांख्यिकी और आँकड़ा विश्लेषण; सामान्य विज्ञान, कंप्यूटर विज्ञान, आयुष और स्वास्थ्य प्रणालियाँ, राष्ट्रीय स्वास्थ्य कार्यक्रम तथा पर्यावरण।"
        },
        {
          "name": "मुख्य चतुर्थ प्रश्नपत्र: दर्शनशास्त्र, मनोविज्ञान, लोक प्रशासन, उद्यमिता एवं प्रबंधन",
          "body": "भारतीय दर्शन और चिंतक, राष्ट्र निर्माण एवं नैतिक अवधारणाएँ, मानव व्यवहार और लोक प्रशासन में नैतिक मूल्य; उद्यमिता, व्यावसायिक संगठन एवं प्रबंधन, प्रशासन तथा समग्र व्यक्तित्व विकास। प्रत्येक खंड का अंत एक केस स्टडी से होता है।"
        },
        {
          "name": "मुख्य पंचम प्रश्नपत्र: सामान्य हिन्दी एवं व्याकरण",
          "body": "हिंदी माध्यम का भाषा प्रश्नपत्र, जो हिन्दी के प्रयोग और व्याकरण को परखता है।"
        },
        {
          "name": "मुख्य षष्ठ प्रश्नपत्र: हिन्दी निबंध एवं प्रारूप लेखन",
          "body": "हिंदी में निबंध, शासकीय व अर्धशासकीय पत्र, परिपत्र, प्रपत्र, विज्ञापन, आदेश, पृष्ठांकन और अनुस्मारक का प्रारूप लेखन, तथा प्रतिवेदन लेखन।"
        }
      ],
      "note": "सटीक अंक, प्रश्नों की संख्या, समय और नेगेटिव मार्किंग हर चक्र की अपनी अधिसूचना और परीक्षा योजना (2026 की योजना 21 जनवरी 2026 को संशोधित हुई) द्वारा तय होते हैं और बदल सकते हैं। ऊपर दिए विषयों को अध्ययन के लिए स्थिर आधार मानें, और देखें",
      "noteLinkLabel": "MPPSC की अपनी वेबसाइट",
      "recruitsHeading": "राज्य सेवा परीक्षा किन पदों के लिए भर्ती करती है",
      "recruitsBody": "2026 की अधिसूचना (विज्ञापन क्रमांक 29/2025) में उप जिलाध्यक्ष (डिप्टी कलेक्टर), उप पुलिस अधीक्षक, वाणिज्यिक कर अधिकारी, जिला पंजीयक, विकास खण्ड अधिकारी, मुख्य नगर पालिका अधिकारी, नायब तहसीलदार, आबकारी उप निरीक्षक और उप पंजीयक जैसे पद दिए गए हैं। पदवार रिक्तियों की तालिका अधिसूचना में है।",
      "offerHeading": "Pariksha Saathi MPPSC के लिए क्या देता है",
      "offerBody": "प्रारंभिक परीक्षा के सामान्य अध्ययन प्रश्नपत्र के लिए मुफ्त विषयवार पाठ और अभ्यास: इतिहास, राज्य व्यवस्था, भूगोल, अर्थव्यवस्था, पर्यावरण, सामान्य विज्ञान, कला एवं संस्कृति, साथ ही मध्य प्रदेश सामान्य ज्ञान। इनमें सामान्य अभिरुचि परीक्षण शामिल नहीं है।",
      "sourceHeading": "आधिकारिक स्रोत और नवीनतम अपडेट",
      "officialLinkLabel": "MPPSC — आधिकारिक वेबसाइट",
      "examNoticesLinkLabel": "Pariksha Saathi पर नवीनतम एडमिट कार्ड, परिणाम और डेडलाइन अलर्ट",
      "ctaLabel": "MPPSC की मुफ्त पढ़ाई शुरू करें",
      "backLabel": "होम",
      "disclaimer": "Pariksha Saathi एक स्वतंत्र परियोजना है और MPPSC या किसी भी सरकारी निकाय से संबद्ध नहीं है। ऊपर दिए गए सिलेबस और पैटर्न विवरण सामान्य हैं और बदल सकते हैं — हमेशा ऊपर दी गई आधिकारिक अधिसूचना से पुष्टि करें।"
    }
  },
  {
    "slug": "rpsc",
    "examName": "RPSC RAS",
    "officialUrl": "https://rpsc.rajasthan.gov.in/",
    "en": {
      "pageTitle": "RPSC RAS Syllabus & Exam Pattern",
      "lede": "The Rajasthan Public Service Commission’s State and Subordinate Services Combined Competitive Examination (RAS) runs in three stages: a Preliminary screening test, a four-paper Main examination and an interview. Here’s the structure and what each stage tests, with a link to the official notification for this cycle’s exact marks, timing and vacancies.",
      "stagesHeading": "The stages",
      "stages": [
        {
          "name": "Preliminary examination",
          "body": "One objective paper on General Knowledge and General Science, at Bachelor’s degree level. It is a screening test only: the marks of those who qualify for the Main examination are not counted in the final order of merit."
        },
        {
          "name": "Main examination",
          "body": "Four descriptive and analytical papers, all compulsory: General Studies-I, General Studies-II, General Studies-III, and General Hindi and General English."
        },
        {
          "name": "Personality and viva-voce examination",
          "body": "Candidates who reach the minimum marks in the Main examination are called for an interview, which also gives marks for knowledge of Rajasthani culture. These marks are added to the Main examination marks."
        }
      ],
      "subjectsHeading": "What’s tested",
      "subjects": [
        {
          "name": "Preliminary: Rajasthan history, art and culture",
          "body": "Pre-historic sites and sources of Rajasthan’s history, major dynasties and rulers, administrative and revenue systems, peasant, tribal and Praja Mandal movements, the integration of Rajasthan, architecture, paintings and folk arts, language and literature, religious life, fairs and festivals, and leading personalities."
        },
        {
          "name": "Preliminary: Indian history",
          "body": "Ancient and medieval India (the Indus and Vedic age, major dynasties, art and architecture, the Bhakti and Sufi movements, the Sultanate and Mughal periods) and modern India up to 2000 (British rule, the revolt of 1857, the freedom struggle and post-independence nation building)."
        },
        {
          "name": "Preliminary: Geography",
          "body": "World and India: physical features, rivers, vegetation, agriculture, industry, transport and environmental issues; and Rajasthan: location, physiography, rivers and lakes, climate, soil, agriculture, livestock, irrigation, population, tribes, minerals and tourism."
        },
        {
          "name": "Preliminary: Polity, governance and economy",
          "body": "The Indian Constitution, political system and governance, with Rajasthan’s institutions; economic concepts and the Indian economy; and the economy of Rajasthan."
        },
        {
          "name": "Preliminary: Science, reasoning and current affairs",
          "body": "Everyday science, computers and ICT, defence and space technology, biotechnology, health, environment and biodiversity; reasoning and mental ability with basic numeracy and data analysis; and current affairs with special reference to Rajasthan."
        },
        {
          "name": "Main: General Studies-I",
          "body": "History, art, culture, literature, tradition and heritage of Rajasthan; Indian history and culture; history of the modern world up to 1991; economics (the Indian, world and Rajasthan economies); and sociology, management, accounting and auditing."
        },
        {
          "name": "Main: General Studies-II",
          "body": "Administrative ethics; general science and technology; and earth science (geography and geology) of the world, India and Rajasthan."
        },
        {
          "name": "Main: General Studies-III",
          "body": "Indian polity, governance, India and international affairs and current affairs; concepts, issues and dynamics of public administration; and behaviour and law."
        },
        {
          "name": "Main: General Hindi and General English",
          "body": "General Hindi; General English (grammar and usage, comprehension, translation and précis writing, composition and letter writing); and an essay."
        }
      ],
      "note": "The exact marks, number of questions, timing and negative marking are set by each cycle’s own notification and scheme (the 2026 scheme and syllabus are dated 9 January 2026) and can change. Treat the subjects above as the stable shape to study toward, and check",
      "noteLinkLabel": "RPSC’s own website",
      "recruitsHeading": "What RAS recruits for",
      "recruitsBody": "The 2026 notice (Advt. No. 02/2026-27) lists 21 State Services, including the Rajasthan Administrative Service, Rajasthan Police Service and Rajasthan Accounts Service, and 26 Subordinate Service lines, including the Tehsildar, Cooperative, Excise and Labour Welfare Subordinate Services. The service-wise vacancy table is in the notice.",
      "offerHeading": "What Pariksha Saathi offers for RPSC",
      "offerBody": "Free topic-wise lessons and practice for the General Knowledge and General Science paper: history, polity, geography, economy, environment, general science, art and culture, plus Rajasthan General Knowledge. They do not cover the reasoning, mental ability and numeracy part.",
      "sourceHeading": "Official source & latest updates",
      "officialLinkLabel": "RPSC — official website",
      "examNoticesLinkLabel": "Latest admit card, result and deadline alerts on Pariksha Saathi",
      "ctaLabel": "Start studying for RPSC free",
      "backLabel": "Home",
      "disclaimer": "Pariksha Saathi is an independent project and is not affiliated with RPSC or any government body. Syllabus and pattern details above are general and may change — always confirm against the official notification linked above."
    },
    "hi": {
      "pageTitle": "RPSC RAS सिलेबस और परीक्षा पैटर्न",
      "lede": "राजस्थान लोक सेवा आयोग की राजस्थान राज्य एवं अधीनस्थ सेवाएँ संयुक्त प्रतियोगी परीक्षा (RAS) तीन चरणों में होती है: प्रारंभिक स्क्रीनिंग परीक्षा, चार प्रश्नपत्रों वाली मुख्य परीक्षा और साक्षात्कार। यहाँ इसकी संरचना और हर चरण में परखी जाने वाली बातें दी गई हैं, साथ ही इस चक्र की आधिकारिक अधिसूचना का लिंक भी, जहाँ से सटीक अंक, समय और रिक्तियाँ मिलेंगी।",
      "stagesHeading": "चरण",
      "stages": [
        {
          "name": "प्रारंभिक परीक्षा",
          "body": "सामान्य ज्ञान और सामान्य विज्ञान का एक वस्तुनिष्ठ प्रश्नपत्र, स्नातक स्तर का। यह केवल स्क्रीनिंग परीक्षा है: मुख्य परीक्षा के लिए अर्ह घोषित अभ्यर्थियों के इसके अंक अंतिम योग्यता क्रम में नहीं गिने जाते।"
        },
        {
          "name": "मुख्य परीक्षा",
          "body": "चार वर्णनात्मक एवं विश्लेषणात्मक प्रश्नपत्र, सभी अनिवार्य: सामान्य अध्ययन-I, सामान्य अध्ययन-II, सामान्य अध्ययन-III, तथा सामान्य हिन्दी और सामान्य अंग्रेजी।"
        },
        {
          "name": "व्यक्तित्व एवं साक्षात्कार परीक्षा",
          "body": "मुख्य परीक्षा में न्यूनतम अंक पाने वाले अभ्यर्थियों को साक्षात्कार के लिए बुलाया जाता है, जिसमें राजस्थानी संस्कृति के ज्ञान पर भी अंक मिलते हैं। ये अंक मुख्य परीक्षा के अंकों में जोड़े जाते हैं।"
        }
      ],
      "subjectsHeading": "क्या परखा जाता है",
      "subjects": [
        {
          "name": "प्रारंभिक: राजस्थान का इतिहास, कला और संस्कृति",
          "body": "राजस्थान के इतिहास के प्रागैतिहासिक स्थल और स्रोत, प्रमुख राजवंश और शासक, प्रशासनिक एवं राजस्व व्यवस्था, किसान, जनजातीय और प्रजामंडल आंदोलन, राजस्थान का एकीकरण, स्थापत्य, चित्रकला और लोक कलाएँ, भाषा एवं साहित्य, धार्मिक जीवन, मेले और त्योहार तथा प्रमुख व्यक्तित्व।"
        },
        {
          "name": "प्रारंभिक: भारतीय इतिहास",
          "body": "प्राचीन और मध्यकालीन भारत (सिंधु और वैदिक काल, प्रमुख राजवंश, कला और स्थापत्य, भक्ति और सूफी आंदोलन, सल्तनत और मुगल काल) तथा 2000 तक का आधुनिक भारत (ब्रिटिश शासन, 1857 का विद्रोह, स्वतंत्रता संग्राम और स्वतंत्रता के बाद राष्ट्र निर्माण)।"
        },
        {
          "name": "प्रारंभिक: भूगोल",
          "body": "विश्व और भारत: भौतिक स्वरूप, नदियाँ, प्राकृतिक वनस्पति, कृषि, उद्योग, परिवहन और पर्यावरणीय मुद्दे; तथा राजस्थान: स्थिति, भू-आकृति, नदियाँ और झीलें, जलवायु, मृदा, कृषि, पशुधन, सिंचाई, जनसंख्या, जनजातियाँ, खनिज और पर्यटन।"
        },
        {
          "name": "प्रारंभिक: राज्य व्यवस्था, शासन और अर्थव्यवस्था",
          "body": "भारतीय संविधान, राजनीतिक व्यवस्था और शासन, राजस्थान की संस्थाओं सहित; आर्थिक अवधारणाएँ और भारतीय अर्थव्यवस्था; तथा राजस्थान की अर्थव्यवस्था।"
        },
        {
          "name": "प्रारंभिक: विज्ञान, तर्कशक्ति और समसामयिकी",
          "body": "रोज़मर्रा का विज्ञान, कंप्यूटर और सूचना-संचार प्रौद्योगिकी, रक्षा एवं अंतरिक्ष प्रौद्योगिकी, जैव प्रौद्योगिकी, स्वास्थ्य, पर्यावरण और जैव विविधता; तर्कशक्ति और मानसिक योग्यता के साथ बुनियादी संख्यात्मकता और आँकड़ा विश्लेषण; तथा राजस्थान के विशेष संदर्भ में समसामयिक घटनाएँ।"
        },
        {
          "name": "मुख्य: सामान्य अध्ययन-I",
          "body": "राजस्थान का इतिहास, कला, संस्कृति, साहित्य, परंपरा और विरासत; भारतीय इतिहास और संस्कृति; 1991 तक का आधुनिक विश्व का इतिहास; अर्थशास्त्र (भारत, विश्व और राजस्थान की अर्थव्यवस्था); तथा समाजशास्त्र, प्रबंधन, लेखांकन और अंकेक्षण।"
        },
        {
          "name": "मुख्य: सामान्य अध्ययन-II",
          "body": "प्रशासनिक नैतिकता; सामान्य विज्ञान और प्रौद्योगिकी; तथा विश्व, भारत और राजस्थान का पृथ्वी विज्ञान (भूगोल और भूविज्ञान)।"
        },
        {
          "name": "मुख्य: सामान्य अध्ययन-III",
          "body": "भारतीय राज्य व्यवस्था, शासन, भारत और अंतर्राष्ट्रीय मामले तथा समसामयिक घटनाएँ; लोक प्रशासन की अवधारणाएँ, मुद्दे और गतिशीलता; तथा व्यवहार और विधि।"
        },
        {
          "name": "मुख्य: सामान्य हिन्दी और सामान्य अंग्रेजी",
          "body": "सामान्य हिन्दी; सामान्य अंग्रेजी (व्याकरण और प्रयोग, बोधगम्यता, अनुवाद और सार लेखन, रचना और पत्र लेखन); तथा निबंध।"
        }
      ],
      "note": "सटीक अंक, प्रश्नों की संख्या, समय और नेगेटिव मार्किंग हर चक्र की अपनी अधिसूचना और योजना (2026 की योजना और पाठ्यक्रम 9 जनवरी 2026 का है) द्वारा तय होते हैं और बदल सकते हैं। ऊपर दिए विषयों को अध्ययन के लिए स्थिर आधार मानें, और देखें",
      "noteLinkLabel": "RPSC की अपनी वेबसाइट",
      "recruitsHeading": "RAS किन पदों के लिए भर्ती करती है",
      "recruitsBody": "2026 की अधिसूचना (विज्ञापन संख्या 02/2026-27) में 21 राज्य सेवाएँ, जिनमें राजस्थान प्रशासनिक सेवा, राजस्थान पुलिस सेवा और राजस्थान लेखा सेवा शामिल हैं, तथा 26 अधीनस्थ सेवा-पंक्तियाँ, जिनमें तहसीलदार, सहकारिता, आबकारी और श्रम कल्याण अधीनस्थ सेवाएँ शामिल हैं, सूचीबद्ध हैं। सेवावार रिक्तियों की तालिका अधिसूचना में है।",
      "offerHeading": "Pariksha Saathi RPSC के लिए क्या देता है",
      "offerBody": "सामान्य ज्ञान और सामान्य विज्ञान प्रश्नपत्र के लिए मुफ्त विषयवार पाठ और अभ्यास: इतिहास, राज्य व्यवस्था, भूगोल, अर्थव्यवस्था, पर्यावरण, सामान्य विज्ञान, कला एवं संस्कृति, साथ ही राजस्थान सामान्य ज्ञान। इनमें तर्कशक्ति, मानसिक योग्यता और संख्यात्मकता वाला हिस्सा शामिल नहीं है।",
      "sourceHeading": "आधिकारिक स्रोत और नवीनतम अपडेट",
      "officialLinkLabel": "RPSC — आधिकारिक वेबसाइट",
      "examNoticesLinkLabel": "Pariksha Saathi पर नवीनतम एडमिट कार्ड, परिणाम और डेडलाइन अलर्ट",
      "ctaLabel": "RPSC की मुफ्त पढ़ाई शुरू करें",
      "backLabel": "होम",
      "disclaimer": "Pariksha Saathi एक स्वतंत्र परियोजना है और RPSC या किसी भी सरकारी निकाय से संबद्ध नहीं है। ऊपर दिए गए सिलेबस और पैटर्न विवरण सामान्य हैं और बदल सकते हैं — हमेशा ऊपर दी गई आधिकारिक अधिसूचना से पुष्टि करें।"
    }
  },
];

export function findSyllabusEntry(slug) {
  return EXAM_SYLLABI.find((e) => e.slug === slug);
}
