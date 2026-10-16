// Content for the /compare/:slug-job-profile pages, in English and Hindi: what the role
// actually involves day to day, how promotion works, what it pays, and the non-salary perks.
// Pay figures are the stable structural numbers (basic pay scale, which wage settlement set it)
// - never a single precise in-hand number, since that depends on posting city, HRA category, DA
// (revised twice a year) and tax regime. Every entry says so explicitly and links to the official
// source for the current exact figures. See src/pages/compare/JobProfilePage.tsx for rendering.

export const EXAM_JOB_PROFILES = [
  {
    slug: 'ssc-cgl',
    examName: 'SSC CGL',
    officialUrl: 'https://ssc.gov.in/for-candidates/cgl-exam/xsd91hjkshdk92xk',
    en: {
      pageTitle: 'SSC CGL Job Profile & Salary',
      lede: 'SSC CGL doesn’t recruit for one job — it’s a single exam that places you into any of nearly twenty different Group B and C roles across central government departments, from anti-evasion fieldwork as a GST Inspector to desk-level policy coordination as an Assistant Section Officer. Here’s what the main posts actually involve, what each one pays, and how promotion works once you’re in.',
      profileHeading: 'One exam, many different jobs',
      profileBody: [
        'Your rank in CGL and the preferences you fill in decide which post you get — so “what does a CGL recruit do” genuinely depends on which post you land. The posts below cover most of the vacancy pool most cycles, but the exact list and numbers are set fresh in every notification.',
      ],
      postsHeading: 'The major posts, and what they actually involve',
      posts: [
        { name: 'Inspector of Income Tax (CBDT)', body: 'Assists in scrutinising tax returns, supports search and survey operations, and follows up on revenue collection and assessment cases under a senior officer’s supervision.' },
        { name: 'Inspector, Central Excise/GST (CBIC)', body: 'Field-heavy role: anti-evasion checks, physical verification of businesses claiming registration or refunds, and GST compliance work.' },
        { name: 'Assistant Section Officer (CSS and various ministries)', body: 'Desk-based: processes files, drafts notes and correspondence, and coordinates between sections to move government decisions through a ministry or department.' },
        { name: 'Auditor (CAG and other departments)', body: 'Examines government accounts, receipts and expenditure for compliance with financial rules — less fieldwork, more scrutiny of records.' },
        { name: 'Statistical Investigator', body: 'Collects and compiles data for official statistics (prices, employment, agriculture and more) used in government planning.' },
      ],
      promotionHeading: 'Promotion: steady, but the pace depends entirely on your post',
      promotionBody: [
        'CGL cadres promote mainly through seniority combined with a departmental qualifying exam, not a fixed timeline that’s the same for everyone. An Income Tax or GST Inspector can rise through Group B gazetted ranks over a long career, and how long the first promotion takes depends heavily on how many vacancies exist at the next rank in that specific cadre that year. An Assistant Section Officer’s path depends on the ministry they’re posted to. There’s no single “CGL promotion timeline” — check the recruitment rules for the specific post you’re aiming for.',
      ],
      salaryHeading: 'Salary: Pay Level 4 to Level 7, depending on the post',
      salaryBody: [
        'Posts like Auditor, Accountant and Tax Assistant sit at Pay Level 4, with a basic pay of ₹25,500. Most Inspector-rank posts and several Assistant Section Officer postings (CSS, MEA, Railways, AFHQ) sit at Level 6 (basic ₹35,400) or Level 7 (basic ₹44,900) under the 7th Pay Commission matrix.',
        'Once Dearness Allowance, House Rent Allowance and other allowances are added and the NPS deduction is taken out, in-hand pay for CGL posts commonly works out somewhere between roughly ₹35,000 and ₹85,000 a month — the width of that range is real, and comes down to which exact post you’re allotted and which city class (X, Y or Z) you’re posted to.',
        'DA is revised twice a year, so the exact in-hand figure moves. Every cycle’s own notification carries the current post-wise pay-level table — check it before relying on a specific number.',
      ],
      perksHeading: 'Perks and benefits',
      perks: [
        'Central Government Health Scheme (CGHS) or equivalent medical coverage for you and your family',
        'National Pension System (NPS) with a matching government contribution',
        'Leave Travel Concession (LTC) — subsidised travel home or anywhere in India once every four years',
        'Casual, earned and medical leave, plus maternity/paternity leave',
        'Group insurance and gratuity on retirement',
        'A defined, rules-based transfer and promotion policy, and strong job security',
        'Some field postings (Excise/GST, Customs) carry additional risk or kit allowances',
      ],
      note: 'The post-wise pay level mapping and the current DA rate change — the exact figures above are the stable structural facts, not this cycle’s precise take-home pay. Confirm current numbers against',
      noteLinkLabel: 'SSC’s own CGL exam page',
      recruitsHeading: 'What CGL recruits for',
      recruitsBody: 'CGL fills Group B and Group C posts across central government ministries and departments, with the exact post-wise vacancy breakdown published fresh in each cycle’s own notification.',
      offerHeading: 'What Pariksha Saathi offers for SSC CGL',
      offerBody: 'Topic-wise lessons and practice across all four tested subjects, sectional tests, full-length mock tests in the real pattern with negative marking, a Mistake Notebook that tracks your weak topics automatically, and dated current-affairs capsules for General Awareness — all free.',
      sourceHeading: 'Official source & latest updates',
      officialLinkLabel: 'SSC CGL — official exam page',
      examNoticesLinkLabel: 'Latest admit card, result and deadline alerts on Pariksha Saathi',
      syllabusLinkLabel: 'SSC CGL syllabus & exam pattern',
      ctaLabel: 'Start studying SSC CGL free',
      backLabel: 'Home',
      disclaimer: 'Pariksha Saathi is an independent project and is not affiliated with SSC or any government body. Pay and promotion details above are general, structural facts, not a guarantee of any specific figure or timeline — always confirm current numbers against the official notification linked above before making a financial decision.',
    },
    hi: {
      pageTitle: 'SSC CGL जॉब प्रोफाइल और सैलरी',
      lede: 'SSC CGL किसी एक नौकरी के लिए भर्ती नहीं करता — यह एक ऐसी परीक्षा है जो आपको केंद्र सरकार के विभागों में लगभग बीस अलग-अलग ग्रुप B और C भूमिकाओं में से किसी एक में रखती है, GST इंस्पेक्टर के रूप में कर-चोरी रोकने के फील्ड काम से लेकर असिस्टेंट सेक्शन ऑफिसर के रूप में डेस्क-स्तर के नीति-समन्वय तक। यहां बताया गया है कि मुख्य पद वास्तव में क्या करते हैं, हर एक की सैलरी कितनी है, और एक बार अंदर आने पर प्रोमोशन कैसे काम करता है।',
      profileHeading: 'एक परीक्षा, कई अलग-अलग नौकरियां',
      profileBody: [
        'CGL में आपकी रैंक और आपकी भरी हुई प्राथमिकताएं तय करती हैं कि आपको कौन-सा पद मिलेगा — इसलिए "CGL भर्ती क्या करता है" यह वास्तव में इस पर निर्भर करता है कि आपको कौन-सा पद मिला। नीचे दिए पद ज़्यादातर चक्रों में रिक्तियों के बड़े हिस्से को कवर करते हैं, लेकिन सटीक सूची और संख्या हर अधिसूचना में नई तय होती है।',
      ],
      postsHeading: 'मुख्य पद, और वे वास्तव में क्या करते हैं',
      posts: [
        { name: 'इंस्पेक्टर ऑफ इनकम टैक्स (CBDT)', body: 'टैक्स रिटर्न की जांच में सहायता करता है, सर्वे व सर्च ऑपरेशन में सहयोग देता है, और एक वरिष्ठ अधिकारी की देखरेख में रेवेन्यू कलेक्शन व असेसमेंट केसों का फॉलो-अप करता है।' },
        { name: 'इंस्पेक्टर, सेंट्रल एक्साइज/GST (CBIC)', body: 'फील्ड-प्रधान भूमिका: कर-चोरी रोकने की जांच, रजिस्ट्रेशन या रिफंड का दावा करने वाले व्यवसायों का भौतिक सत्यापन, और GST अनुपालन संबंधी काम।' },
        { name: 'असिस्टेंट सेक्शन ऑफिसर (CSS व विभिन्न मंत्रालय)', body: 'डेस्क-आधारित: फाइलों को प्रोसेस करता है, नोट्स और पत्राचार तैयार करता है, और किसी मंत्रालय या विभाग में सरकारी फैसलों को आगे बढ़ाने के लिए सेक्शनों के बीच समन्वय करता है।' },
        { name: 'ऑडिटर (CAG व अन्य विभाग)', body: 'सरकारी खातों, प्राप्तियों और व्यय की वित्तीय नियमों के अनुपालन के लिए जांच करता है — फील्ड काम कम, रेकॉर्ड की जांच अधिक।' },
        { name: 'स्टैटिस्टिकल इन्वेस्टिगेटर', body: 'सरकारी योजना में उपयोग होने वाले आधिकारिक आंकड़ों (कीमतें, रोजगार, कृषि व अन्य) के लिए डेटा इकट्ठा और संकलित करता है।' },
      ],
      promotionHeading: 'प्रोमोशन: स्थिर, लेकिन गति पूरी तरह आपके पद पर निर्भर',
      promotionBody: [
        'CGL कैडर मुख्यतः वरिष्ठता और एक विभागीय योग्यता परीक्षा के संयोजन से प्रोमोट होते हैं, न कि किसी तय समय-सीमा से जो सबके लिए एक जैसी हो। एक इनकम टैक्स या GST इंस्पेक्टर लंबे करियर में ग्रुप B राजपत्रित रैंकों तक पहुंच सकता है, और पहला प्रोमोशन कितने समय में मिलेगा यह काफी हद तक इस पर निर्भर करता है कि उस विशेष कैडर में उस साल अगली रैंक पर कितनी रिक्तियां हैं। असिस्टेंट सेक्शन ऑफिसर का रास्ता इस पर निर्भर करता है कि वह किस मंत्रालय में तैनात है। कोई एक "CGL प्रोमोशन टाइमलाइन" नहीं है — जिस पद का लक्ष्य बना रहे हैं उसके भर्ती नियम देखें।',
      ],
      salaryHeading: 'सैलरी: पद के अनुसार पे लेवल 4 से लेवल 7 तक',
      salaryBody: [
        'ऑडिटर, अकाउंटेंट और टैक्स असिस्टेंट जैसे पद पे लेवल 4 में आते हैं, जिसका बेसिक पे ₹25,500 है। अधिकांश इंस्पेक्टर-स्तर के पद और कई असिस्टेंट सेक्शन ऑफिसर पोस्टिंग (CSS, MEA, रेलवे, AFHQ) 7वें वेतन आयोग मैट्रिक्स के अंतर्गत लेवल 6 (बेसिक ₹35,400) या लेवल 7 (बेसिक ₹44,900) में आते हैं।',
        'महंगाई भत्ता (DA), मकान किराया भत्ता (HRA) और अन्य भत्ते जुड़ने और NPS कटौती के बाद, CGL पदों की इन-हैंड सैलरी आम तौर पर लगभग ₹35,000 से ₹85,000 प्रति माह के बीच आती है — यह अंतर वास्तविक है, और इस पर निर्भर करता है कि आपको कौन-सा सटीक पद मिला और आप किस शहर श्रेणी (X, Y या Z) में तैनात हैं।',
        'DA साल में दो बार संशोधित होता है, इसलिए सटीक इन-हैंड आंकड़ा बदलता रहता है। हर चक्र की अपनी अधिसूचना में वर्तमान पद-वार पे लेवल तालिका होती है — किसी विशेष संख्या पर भरोसा करने से पहले उसे देखें।',
      ],
      perksHeading: 'भत्ते और लाभ',
      perks: [
        'केंद्र सरकार स्वास्थ्य योजना (CGHS) या समतुल्य चिकित्सा कवरेज, आप और परिवार के लिए',
        'सरकार के समतुल्य अंशदान के साथ राष्ट्रीय पेंशन प्रणाली (NPS)',
        'अवकाश यात्रा सुविधा (LTC) — हर चार साल में एक बार घर या भारत में कहीं भी रियायती यात्रा',
        'आकस्मिक, अर्जित और चिकित्सा अवकाश, साथ ही मातृत्व/पितृत्व अवकाश',
        'सेवानिवृत्ति पर समूह बीमा और उपदान (ग्रेच्युटी)',
        'एक तय, नियम-आधारित तबादला और प्रोमोशन नीति, और मजबूत नौकरी सुरक्षा',
        'कुछ फील्ड पोस्टिंग (एक्साइज/GST, कस्टम्स) में अतिरिक्त रिस्क या किट भत्ते',
      ],
      note: 'पद-वार पे लेवल मैपिंग और वर्तमान DA दर बदलते रहते हैं — ऊपर दिए आंकड़े स्थिर संरचनात्मक तथ्य हैं, इस चक्र की सटीक इन-हैंड सैलरी नहीं। वर्तमान आंकड़ों की पुष्टि करें',
      noteLinkLabel: 'SSC के अपने CGL परीक्षा पेज से',
      recruitsHeading: 'CGL किसके लिए भर्ती करता है',
      recruitsBody: 'CGL केंद्र सरकार के मंत्रालयों और विभागों में ग्रुप B और ग्रुप C पदों को भरता है, जिसका सटीक पद-वार रिक्ति विवरण हर चक्र की अपनी अधिसूचना में नया प्रकाशित होता है।',
      offerHeading: 'Pariksha Saathi SSC CGL के लिए क्या देता है',
      offerBody: 'सभी चार परखे जाने वाले विषयों में विषयवार पाठ और अभ्यास, सेक्शनल टेस्ट, नेगेटिव मार्किंग के साथ वास्तविक पैटर्न में फुल-लेंथ मॉक टेस्ट, एक मिस्टेक नोटबुक जो आपके कमज़ोर विषयों को अपने आप ट्रैक करती है, और सामान्य जागरूकता के लिए दिनांकित करेंट अफेयर्स कैप्सूल — यह सब मुफ्त है।',
      sourceHeading: 'आधिकारिक स्रोत और नवीनतम अपडेट',
      officialLinkLabel: 'SSC CGL — आधिकारिक परीक्षा पेज',
      examNoticesLinkLabel: 'Pariksha Saathi पर नवीनतम एडमिट कार्ड, परिणाम और डेडलाइन अलर्ट',
      syllabusLinkLabel: 'SSC CGL सिलेबस और परीक्षा पैटर्न',
      ctaLabel: 'SSC CGL की मुफ्त पढ़ाई शुरू करें',
      backLabel: 'होम',
      disclaimer: 'Pariksha Saathi एक स्वतंत्र परियोजना है और SSC या किसी भी सरकारी निकाय से संबद्ध नहीं है। ऊपर दिए गए वेतन और प्रोमोशन विवरण सामान्य, संरचनात्मक तथ्य हैं, किसी विशेष आंकड़े या समय-सीमा की गारंटी नहीं — कोई भी वित्तीय निर्णय लेने से पहले हमेशा ऊपर दी गई आधिकारिक अधिसूचना से वर्तमान आंकड़ों की पुष्टि करें।',
    },
  },
  {
    slug: 'ssc-chsl',
    examName: 'SSC CHSL',
    officialUrl: 'https://ssc.gov.in/for-candidates/chsl-exam/jd0is9pdf8adhfakjshd98',
    en: {
      pageTitle: 'SSC CHSL Job Profile & Salary',
      lede: 'SSC CHSL is also a multi-post exam — it fills clerical and data-entry roles across central government offices and the Department of Posts. The three main posts have genuinely different daily work and different pay levels, so “what does CHSL pay” depends on which one you land.',
      profileHeading: 'Three different jobs under one exam',
      profileBody: [
        'Your rank and category decide which post and department you get. The three broad post types below cover most CHSL vacancies most cycles.',
      ],
      postsHeading: 'The main posts',
      posts: [
        { name: 'Lower Division Clerk / Junior Secretariat Assistant (LDC/JSA)', body: 'Clerical desk work inside central government offices — filing, drafting routine correspondence, record-keeping and data entry into government systems.' },
        { name: 'Postal Assistant / Sorting Assistant (Department of Posts)', body: 'Customer-facing counter work (booking and delivering mail, savings-scheme transactions) plus mail sorting — a mix of public-facing and operational duties.' },
        { name: 'Data Entry Operator (DEO)', body: 'High-speed data entry into government databases, often in statistics-heavy offices like the C&AG; some DEO posts require a certified typing speed and sit at a slightly higher pay level than the others.' },
      ],
      promotionHeading: 'Promotion: a seniority ladder that moves at very different speeds by department',
      promotionBody: [
        'LDC/JSA typically promotes through a seniority-plus-departmental-exam path toward Upper Division Clerk, then Assistant, then Section Officer — but how long the first step takes varies enormously by ministry, and can run well past a decade in departments with a large vacancy backlog at the next grade. Postal Assistants have their own separate ladder inside India Post, toward higher Postal Assistant grades and, via a specific departmental exam, supervisory posts like Inspector of Posts.',
      ],
      salaryHeading: 'Salary: Pay Level 2 for LDC/JSA, Level 4 (sometimes 5) for the others',
      salaryBody: [
        'LDC/JSA sits at Pay Level 2, basic pay ₹19,900. Postal Assistant, Sorting Assistant and most DEO posts sit at Level 4, basic pay ₹25,500; a few DEO posts (such as at the C&AG) sit at Level 5, basic pay ₹29,200.',
        'After DA, HRA and other allowances and the NPS deduction, in-hand pay commonly works out to roughly ₹25,000–₹37,000 a month for LDC/JSA, and roughly ₹35,000–₹50,000 a month for the Level 4/5 posts — again, the city you’re posted to (X/Y/Z class) makes a real difference.',
        'As with every government pay figure, DA changes twice a year — check the current post-wise table in this cycle’s own notification.',
      ],
      perksHeading: 'Perks and benefits',
      perks: [
        'Central Government Health Scheme (CGHS) or equivalent medical coverage',
        'National Pension System (NPS) with a matching government contribution',
        'Leave Travel Concession (LTC) once every four years',
        'Casual, earned and medical leave, plus maternity/paternity leave',
        'Group insurance and gratuity on retirement',
        'Strong job security and a defined, rules-based promotion and transfer policy',
        'Postal Assistant posts can carry additional department-specific allowances depending on the posting',
      ],
      note: 'Exact post-to-department allotment and the current DA rate change from cycle to cycle. Confirm current numbers against',
      noteLinkLabel: 'SSC’s own CHSL exam page',
      recruitsHeading: 'What CHSL recruits for',
      recruitsBody: 'CHSL fills Lower Division Clerk/JSA, Postal Assistant/Sorting Assistant and Data Entry Operator posts across central government ministries and the Department of Posts, with the exact vacancy breakdown published fresh each cycle.',
      offerHeading: 'What Pariksha Saathi offers for SSC CHSL',
      offerBody: 'Topic-wise lessons and practice, sectional tests, full-length mock tests in the real pattern, a Mistake Notebook that tracks your weak topics automatically, and dated current-affairs capsules for General Awareness — all free.',
      sourceHeading: 'Official source & latest updates',
      officialLinkLabel: 'SSC CHSL — official exam page',
      examNoticesLinkLabel: 'Latest admit card, result and deadline alerts on Pariksha Saathi',
      syllabusLinkLabel: 'SSC CHSL syllabus & exam pattern',
      ctaLabel: 'Start studying SSC CHSL free',
      backLabel: 'Home',
      disclaimer: 'Pariksha Saathi is an independent project and is not affiliated with SSC or any government body. Pay and promotion details above are general, structural facts, not a guarantee of any specific figure or timeline — always confirm current numbers against the official notification linked above before making a financial decision.',
    },
    hi: {
      pageTitle: 'SSC CHSL जॉब प्रोफाइल और सैलरी',
      lede: 'SSC CHSL भी एक मल्टी-पोस्ट परीक्षा है — यह केंद्र सरकार के कार्यालयों और डाक विभाग में क्लेरिकल और डेटा-एंट्री भूमिकाएं भरती है। तीन मुख्य पदों का दैनिक काम और पे लेवल वास्तव में अलग-अलग है, इसलिए "CHSL कितना देता है" यह इस पर निर्भर करता है कि आपको कौन-सा पद मिला।',
      profileHeading: 'एक परीक्षा के अंतर्गत तीन अलग-अलग नौकरियां',
      profileBody: [
        'आपकी रैंक और श्रेणी तय करती है कि आपको कौन-सा पद और विभाग मिलेगा। नीचे दिए तीन व्यापक पद प्रकार अधिकांश चक्रों में CHSL की ज़्यादातर रिक्तियों को कवर करते हैं।',
      ],
      postsHeading: 'मुख्य पद',
      posts: [
        { name: 'लोअर डिवीजन क्लर्क / जूनियर सचिवालय सहायक (LDC/JSA)', body: 'केंद्र सरकार के कार्यालयों में क्लेरिकल डेस्क काम — फाइलिंग, नियमित पत्राचार तैयार करना, रेकॉर्ड-कीपिंग और सरकारी सिस्टम में डेटा एंट्री।' },
        { name: 'पोस्टल असिस्टेंट / सॉर्टिंग असिस्टेंट (डाक विभाग)', body: 'ग्राहक-सामने वाला काउंटर काम (डाक बुकिंग व डिलीवरी, बचत योजना लेनदेन) साथ ही मेल सॉर्टिंग — सार्वजनिक और परिचालन दोनों तरह के कर्तव्यों का मिश्रण।' },
        { name: 'डेटा एंट्री ऑपरेटर (DEO)', body: 'सरकारी डेटाबेस में हाई-स्पीड डेटा एंट्री, अक्सर C&AG जैसे आंकड़ा-प्रधान कार्यालयों में; कुछ DEO पदों के लिए प्रमाणित टाइपिंग स्पीड चाहिए और इनका पे लेवल बाकी से थोड़ा ऊंचा होता है।' },
      ],
      promotionHeading: 'प्रोमोशन: एक वरिष्ठता सीढ़ी, जिसकी गति विभाग के अनुसार बहुत अलग होती है',
      promotionBody: [
        'LDC/JSA आम तौर पर वरिष्ठता-और-विभागीय-परीक्षा के रास्ते अपर डिवीजन क्लर्क, फिर असिस्टेंट, फिर सेक्शन ऑफिसर की ओर प्रोमोट होता है — लेकिन पहला चरण कितने समय में आता है यह मंत्रालय के अनुसार बहुत अलग होता है, और अगली ग्रेड में बड़ी रिक्ति-बकाया वाले विभागों में एक दशक से भी ज़्यादा लग सकता है। पोस्टल असिस्टेंट की डाक विभाग के अंदर अपनी अलग सीढ़ी होती है, ऊंची पोस्टल असिस्टेंट ग्रेड की ओर, और एक विशेष विभागीय परीक्षा के ज़रिए इंस्पेक्टर ऑफ पोस्ट्स जैसे सुपरवाइज़री पदों की ओर।',
      ],
      salaryHeading: 'सैलरी: LDC/JSA के लिए पे लेवल 2, बाकियों के लिए लेवल 4 (कभी-कभी 5)',
      salaryBody: [
        'LDC/JSA पे लेवल 2 में आता है, बेसिक पे ₹19,900। पोस्टल असिस्टेंट, सॉर्टिंग असिस्टेंट और अधिकांश DEO पद लेवल 4 में आते हैं, बेसिक पे ₹25,500; कुछ DEO पद (जैसे C&AG में) लेवल 5 में आते हैं, बेसिक पे ₹29,200।',
        'DA, HRA और अन्य भत्तों और NPS कटौती के बाद, इन-हैंड सैलरी आम तौर पर LDC/JSA के लिए लगभग ₹25,000–₹37,000 प्रति माह और लेवल 4/5 पदों के लिए लगभग ₹35,000–₹50,000 प्रति माह आती है — फिर से, आप जिस शहर (X/Y/Z श्रेणी) में तैनात हैं उससे वास्तविक अंतर आता है।',
        'हर सरकारी वेतन आंकड़े की तरह, DA साल में दो बार बदलता है — इस चक्र की अपनी अधिसूचना में वर्तमान पद-वार तालिका देखें।',
      ],
      perksHeading: 'भत्ते और लाभ',
      perks: [
        'केंद्र सरकार स्वास्थ्य योजना (CGHS) या समतुल्य चिकित्सा कवरेज',
        'सरकार के समतुल्य अंशदान के साथ राष्ट्रीय पेंशन प्रणाली (NPS)',
        'हर चार साल में एक बार अवकाश यात्रा सुविधा (LTC)',
        'आकस्मिक, अर्जित और चिकित्सा अवकाश, साथ ही मातृत्व/पितृत्व अवकाश',
        'सेवानिवृत्ति पर समूह बीमा और उपदान (ग्रेच्युटी)',
        'मजबूत नौकरी सुरक्षा और एक तय, नियम-आधारित प्रोमोशन व तबादला नीति',
        'पोस्टिंग के अनुसार पोस्टल असिस्टेंट पदों में अतिरिक्त विभाग-विशिष्ट भत्ते हो सकते हैं',
      ],
      note: 'सटीक पद-से-विभाग आवंटन और वर्तमान DA दर हर चक्र में बदलते हैं। वर्तमान आंकड़ों की पुष्टि करें',
      noteLinkLabel: 'SSC के अपने CHSL परीक्षा पेज से',
      recruitsHeading: 'CHSL किसके लिए भर्ती करता है',
      recruitsBody: 'CHSL केंद्र सरकार के मंत्रालयों और डाक विभाग में लोअर डिवीजन क्लर्क/JSA, पोस्टल असिस्टेंट/सॉर्टिंग असिस्टेंट और डेटा एंट्री ऑपरेटर पदों को भरता है, जिसका सटीक रिक्ति विवरण हर चक्र नया प्रकाशित होता है।',
      offerHeading: 'Pariksha Saathi SSC CHSL के लिए क्या देता है',
      offerBody: 'विषयवार पाठ और अभ्यास, सेक्शनल टेस्ट, वास्तविक पैटर्न में फुल-लेंथ मॉक टेस्ट, एक मिस्टेक नोटबुक जो आपके कमज़ोर विषयों को अपने आप ट्रैक करती है, और सामान्य जागरूकता के लिए दिनांकित करेंट अफेयर्स कैप्सूल — यह सब मुफ्त है।',
      sourceHeading: 'आधिकारिक स्रोत और नवीनतम अपडेट',
      officialLinkLabel: 'SSC CHSL — आधिकारिक परीक्षा पेज',
      examNoticesLinkLabel: 'Pariksha Saathi पर नवीनतम एडमिट कार्ड, परिणाम और डेडलाइन अलर्ट',
      syllabusLinkLabel: 'SSC CHSL सिलेबस और परीक्षा पैटर्न',
      ctaLabel: 'SSC CHSL की मुफ्त पढ़ाई शुरू करें',
      backLabel: 'होम',
      disclaimer: 'Pariksha Saathi एक स्वतंत्र परियोजना है और SSC या किसी भी सरकारी निकाय से संबद्ध नहीं है। ऊपर दिए गए वेतन और प्रोमोशन विवरण सामान्य, संरचनात्मक तथ्य हैं, किसी विशेष आंकड़े या समय-सीमा की गारंटी नहीं — कोई भी वित्तीय निर्णय लेने से पहले हमेशा ऊपर दी गई आधिकारिक अधिसूचना से वर्तमान आंकड़ों की पुष्टि करें।',
    },
  },
  {
    slug: 'ibps-po',
    examName: 'IBPS PO',
    officialUrl: 'https://www.ibps.in/',
    en: {
      pageTitle: 'IBPS PO Job Profile & Salary',
      lede: 'IBPS PO is the entry point into bank management at public sector banks other than SBI — Junior Management Grade Scale I, the first rung of a ladder that can eventually lead to a bank’s top leadership. Here’s what the two-year probation actually involves, what it pays, and how promotion works from there.',
      profileHeading: 'What a PO actually does',
      profileBody: [
        'During the two-year probation, a PO typically rotates through branch functions under supervision — handling customer accounts, processing loan applications, cash and clearing operations, learning credit appraisal, and cross-selling the bank’s own products. It’s deliberately broad: the point is to understand every function a branch runs before being given independent responsibility.',
        'After confirmation, a PO takes on real authority — sanctioning loans within set limits, supervising a small team, and in many postings, running day-to-day branch operations.',
      ],
      promotionHeading: 'Promotion: the first step usually takes a few years, after that it depends on the bank',
      promotionBody: [
        'Scale I officers typically become eligible for promotion to Scale II (Manager) after a minimum of around 2–3 years of service, through the bank’s own performance appraisal and often an internal exam or interview. In practice, actual promotion can take longer than that minimum, since it depends on vacancies at the next scale and the specific bank’s own policy — don’t treat the minimum as a guarantee. From Scale II, the ladder continues through Scale III, IV and beyond over a full banking career, toward senior and then executive management roles.',
      ],
      salaryHeading: 'Salary: Scale I starts at a basic pay of ₹48,480',
      salaryBody: [
        'The current Scale I basic pay is ₹48,480, set under the officers’ wage revision (the Joint Note) effective from November 2022 and signed in March 2024, which raised officer pay by roughly 17% on the previous scale. Basic pay rises through annual increments to ₹85,920 at the top of Scale I, before the next promotion.',
        'Add Dearness Allowance, House Rent Allowance and a special allowance, and gross monthly pay commonly runs ₹72,000–₹91,000; after NPS and tax deductions, in-hand pay is commonly in the ₹65,000–₹76,500 a month range — the exact figure depends heavily on your posting city (metro postings carry higher HRA) and the specific bank’s own allowance structure.',
        'DA is revised periodically, so these figures move. Check your allotted bank’s own salary circular for the exact current numbers.',
      ],
      perksHeading: 'Perks and benefits',
      perks: [
        'Staff loans (home, car, personal) at well below market interest rates',
        'Medical insurance for you and your family, often extending to parents',
        'Concessional or free banking services for staff',
        'Leave Fare Concession (LFC) — periodic travel allowance for you and your family',
        'A locker facility, often free or discounted',
        'National Pension System (NPS) with the bank’s matching contribution',
        'A clear, defined promotion ladder and strong job security compared with private-sector banking',
      ],
      note: 'The figures above are the stable structural numbers; exact in-hand pay varies by posting and changes with each DA revision. Confirm current figures against',
      noteLinkLabel: 'IBPS’s own website',
      recruitsHeading: 'What IBPS PO recruits for',
      recruitsBody: 'IBPS PO fills Junior Management Grade Scale I officer vacancies at participating public sector banks other than SBI, with the exact bank-wise vacancy breakdown published fresh in each cycle’s notification.',
      offerHeading: 'What Pariksha Saathi offers for IBPS PO',
      offerBody: 'Topic-wise lessons and practice across Reasoning, Quant and English, sectional and full-length mock tests in the real pattern, a Mistake Notebook, and dated current-affairs capsules for General Awareness and Banking Awareness — all free.',
      sourceHeading: 'Official source & latest updates',
      officialLinkLabel: 'IBPS — official website',
      examNoticesLinkLabel: 'Latest admit card, result and deadline alerts on Pariksha Saathi',
      syllabusLinkLabel: 'IBPS PO syllabus & exam pattern',
      ctaLabel: 'Start studying IBPS PO free',
      backLabel: 'Home',
      disclaimer: 'Pariksha Saathi is an independent project and is not affiliated with IBPS or any bank. Pay and promotion details above are general, structural facts, not a guarantee of any specific figure or timeline — always confirm current numbers against the official source before making a financial decision.',
    },
    hi: {
      pageTitle: 'IBPS PO जॉब प्रोफाइल और सैलरी',
      lede: 'IBPS PO, SBI के अलावा अन्य सार्वजनिक क्षेत्र के बैंकों में बैंक प्रबंधन में प्रवेश का रास्ता है — जूनियर मैनेजमेंट ग्रेड स्केल I, उस सीढ़ी का पहला पड़ाव जो आखिरकार बैंक के शीर्ष नेतृत्व तक ले जा सकता है। यहां बताया गया है कि दो साल की प्रोबेशन में वास्तव में क्या होता है, इसकी सैलरी कितनी है, और उसके बाद प्रोमोशन कैसे काम करता है।',
      profileHeading: 'एक PO वास्तव में क्या करता है',
      profileBody: [
        'दो साल की प्रोबेशन के दौरान, एक PO आम तौर पर देखरेख में ब्रांच के विभिन्न कामों में घूमता है — ग्राहक खाते संभालना, लोन आवेदन प्रोसेस करना, कैश और क्लीयरिंग ऑपरेशन, क्रेडिट मूल्यांकन सीखना, और बैंक के अपने उत्पाद बेचना। यह जानबूझकर व्यापक है: उद्देश्य यह है कि स्वतंत्र जिम्मेदारी मिलने से पहले ब्रांच के हर काम को समझ लिया जाए।',
        'पुष्टिकरण के बाद, एक PO असली अधिकार संभालता है — तय सीमा के अंदर लोन मंजूर करना, एक छोटी टीम की देखरेख करना, और कई पोस्टिंग में ब्रांच का रोज़मर्रा का परिचालन चलाना।',
      ],
      promotionHeading: 'प्रोमोशन: पहला पड़ाव आम तौर पर कुछ साल लेता है, उसके बाद बैंक पर निर्भर',
      promotionBody: [
        'स्केल I अधिकारी आम तौर पर लगभग 2–3 साल की सेवा के बाद स्केल II (मैनेजर) में प्रोमोशन के पात्र बनते हैं, बैंक के अपने प्रदर्शन मूल्यांकन और अक्सर एक आंतरिक परीक्षा या इंटरव्यू के ज़रिए। व्यवहार में, वास्तविक प्रोमोशन इस न्यूनतम से ज़्यादा समय ले सकता है, क्योंकि यह अगली स्केल में रिक्तियों और उस विशेष बैंक की अपनी नीति पर निर्भर करता है — न्यूनतम को गारंटी न मानें। स्केल II से, सीढ़ी स्केल III, IV और उससे आगे पूरे बैंकिंग करियर में चलती है, वरिष्ठ और फिर कार्यकारी प्रबंधन भूमिकाओं की ओर।',
      ],
      salaryHeading: 'सैलरी: स्केल I की शुरुआत ₹48,480 बेसिक पे से होती है',
      salaryBody: [
        'वर्तमान स्केल I बेसिक पे ₹48,480 है, जो अधिकारियों के वेतन संशोधन (जॉइंट नोट) के अंतर्गत नवंबर 2022 से प्रभावी और मार्च 2024 में हस्ताक्षरित हुआ, जिसने पिछले स्केल की तुलना में अधिकारी वेतन में लगभग 17% की वृद्धि की। बेसिक पे वार्षिक वेतन वृद्धि के साथ स्केल I के शीर्ष पर ₹85,920 तक बढ़ता है, अगले प्रोमोशन से पहले।',
        'महंगाई भत्ता, मकान किराया भत्ता और एक विशेष भत्ता जोड़ने पर, मासिक सकल वेतन आम तौर पर ₹72,000–₹91,000 के बीच होता है; NPS और टैक्स कटौती के बाद, इन-हैंड सैलरी आम तौर पर ₹65,000–₹76,500 प्रति माह के दायरे में होती है — सटीक आंकड़ा काफी हद तक आपकी पोस्टिंग वाले शहर (मेट्रो पोस्टिंग में ज़्यादा HRA) और उस विशेष बैंक के अपने भत्ता ढांचे पर निर्भर करता है।',
        'DA समय-समय पर संशोधित होता है, इसलिए ये आंकड़े बदलते रहते हैं। सटीक वर्तमान आंकड़ों के लिए अपने आवंटित बैंक का अपना सैलरी सर्कुलर देखें।',
      ],
      perksHeading: 'भत्ते और लाभ',
      perks: [
        'बाजार दर से काफी कम ब्याज दर पर स्टाफ लोन (होम, कार, पर्सनल)',
        'आपके और परिवार के लिए मेडिकल इंश्योरेंस, अक्सर माता-पिता तक भी विस्तारित',
        'स्टाफ के लिए रियायती या मुफ्त बैंकिंग सेवाएं',
        'अवकाश यात्रा सुविधा (LFC) — आपके और परिवार के लिए समय-समय पर यात्रा भत्ता',
        'लॉकर सुविधा, अक्सर मुफ्त या रियायती',
        'बैंक के समतुल्य अंशदान के साथ राष्ट्रीय पेंशन प्रणाली (NPS)',
        'प्राइवेट-सेक्टर बैंकिंग की तुलना में एक स्पष्ट, तय प्रोमोशन सीढ़ी और मजबूत नौकरी सुरक्षा',
      ],
      note: 'ऊपर दिए आंकड़े स्थिर संरचनात्मक संख्याएं हैं; सटीक इन-हैंड सैलरी पोस्टिंग के अनुसार अलग होती है और हर DA संशोधन के साथ बदलती है। वर्तमान आंकड़ों की पुष्टि करें',
      noteLinkLabel: 'IBPS की अपनी वेबसाइट से',
      recruitsHeading: 'IBPS PO किसके लिए भर्ती करता है',
      recruitsBody: 'IBPS PO, SBI के अलावा अन्य सार्वजनिक क्षेत्र के बैंकों में जूनियर मैनेजमेंट ग्रेड स्केल I अधिकारी रिक्तियों को भरता है, जिसका सटीक बैंक-वार रिक्ति विवरण हर चक्र की अधिसूचना में नया प्रकाशित होता है।',
      offerHeading: 'Pariksha Saathi IBPS PO के लिए क्या देता है',
      offerBody: 'रीज़निंग, क्वांट और अंग्रेजी में विषयवार पाठ और अभ्यास, वास्तविक पैटर्न में सेक्शनल और फुल-लेंथ मॉक टेस्ट, एक मिस्टेक नोटबुक, और सामान्य जागरूकता व बैंकिंग जागरूकता के लिए दिनांकित करेंट अफेयर्स कैप्सूल — यह सब मुफ्त है।',
      sourceHeading: 'आधिकारिक स्रोत और नवीनतम अपडेट',
      officialLinkLabel: 'IBPS — आधिकारिक वेबसाइट',
      examNoticesLinkLabel: 'Pariksha Saathi पर नवीनतम एडमिट कार्ड, परिणाम और डेडलाइन अलर्ट',
      syllabusLinkLabel: 'IBPS PO सिलेबस और परीक्षा पैटर्न',
      ctaLabel: 'IBPS PO की मुफ्त पढ़ाई शुरू करें',
      backLabel: 'होम',
      disclaimer: 'Pariksha Saathi एक स्वतंत्र परियोजना है और IBPS या किसी भी बैंक से संबद्ध नहीं है। ऊपर दिए गए वेतन और प्रोमोशन विवरण सामान्य, संरचनात्मक तथ्य हैं, किसी विशेष आंकड़े या समय-सीमा की गारंटी नहीं — कोई भी वित्तीय निर्णय लेने से पहले हमेशा आधिकारिक स्रोत से वर्तमान आंकड़ों की पुष्टि करें।',
    },
  },
  {
    slug: 'ibps-clerk',
    examName: 'IBPS Clerk',
    officialUrl: 'https://www.ibps.in/',
    en: {
      pageTitle: 'IBPS Clerk Job Profile & Salary',
      lede: 'IBPS Clerk recruits Customer Service Associates for public sector banks other than SBI — the front line of most branches, and for many, the first step toward an officer career. Here’s the actual day-to-day, the salary, and the two real paths up from here.',
      profileHeading: 'What a Clerk actually does',
      profileBody: [
        'Most of the role is direct customer interaction: counter transactions (deposits, withdrawals, passbook updates, cheque processing), opening new accounts and completing KYC, and cross-selling the bank’s own products. Depending on the branch, there’s also back-office work — clearing, reconciliation and document handling that doesn’t involve a customer standing at the counter.',
      ],
      promotionHeading: 'Promotion: two real paths, and the timeline varies a lot by bank',
      promotionBody: [
        'There are two realistic routes up. The first is a seniority-based path within the clerical cadre itself, toward Senior Clerk or Special Assistant grades. The second is an internal promotion exam into the officer cadre, which several public sector banks run separately from the open-market IBPS PO exam — but the minimum years of service required, and how often the exam is actually conducted, varies significantly from bank to bank. Check your specific bank’s own promotion policy rather than assuming a fixed timeline.',
      ],
      salaryHeading: 'Salary: basic pay starts at ₹24,050 (₹26,730 for graduates)',
      salaryBody: [
        'The clerical cadre’s pay scale was set under the 12th Bipartite Settlement, effective from November 2022 to October 2027 (signed in March 2024). Starting basic pay is ₹24,050; graduate entrants get two advance increments, taking their starting basic to ₹26,730. The scale rises through increments to ₹64,480 over roughly two decades of service.',
        'Gross monthly pay (basic plus DA, HRA and other allowances) commonly runs around ₹37,000–₹41,000 at most participating banks; in-hand pay after deductions is commonly in the ₹37,000–₹39,500 a month range, varying by posting city and the specific bank’s own allowance structure.',
        'These figures move with each DA revision — check your allotted bank’s own salary circular for the exact current numbers.',
      ],
      perksHeading: 'Perks and benefits',
      perks: [
        'Staff loans (home, personal, car) at concessional interest rates',
        'Medical insurance for you and your family',
        'Leave Fare Concession (LFC) — periodic travel allowance',
        'A locker facility, often free or discounted',
        'National Pension System (NPS) with the bank’s matching contribution',
        'A defined promotion channel into both senior clerical grades and, via the internal exam route, the officer cadre',
        'Strong job security compared with private-sector banking roles',
      ],
      note: 'The figures above are the stable structural numbers; exact in-hand pay varies by posting and changes with each DA revision. Confirm current figures against',
      noteLinkLabel: 'IBPS’s own website',
      recruitsHeading: 'What IBPS Clerk recruits for',
      recruitsBody: 'IBPS Clerk fills Customer Service Associate vacancies at participating public sector banks other than SBI, with the exact bank-wise vacancy breakdown published fresh in each cycle’s notification.',
      offerHeading: 'What Pariksha Saathi offers for IBPS Clerk',
      offerBody: 'Topic-wise lessons and practice across Reasoning, Quant and English, sectional and full-length mock tests in the real pattern, a Mistake Notebook, and dated current-affairs capsules for General and Banking Awareness — all free.',
      sourceHeading: 'Official source & latest updates',
      officialLinkLabel: 'IBPS — official website',
      examNoticesLinkLabel: 'Latest admit card, result and deadline alerts on Pariksha Saathi',
      syllabusLinkLabel: 'IBPS Clerk syllabus & exam pattern',
      ctaLabel: 'Start studying IBPS Clerk free',
      backLabel: 'Home',
      disclaimer: 'Pariksha Saathi is an independent project and is not affiliated with IBPS or any bank. Pay and promotion details above are general, structural facts, not a guarantee of any specific figure or timeline — always confirm current numbers against the official source before making a financial decision.',
    },
    hi: {
      pageTitle: 'IBPS क्लर्क जॉब प्रोफाइल और सैलरी',
      lede: 'IBPS क्लर्क, SBI के अलावा अन्य सार्वजनिक क्षेत्र के बैंकों के लिए कस्टमर सर्विस एसोसिएट भर्ती करता है — ज़्यादातर शाखाओं की फ्रंट लाइन, और कई लोगों के लिए, अधिकारी करियर की ओर पहला पड़ाव। यहां बताया गया है कि असल रोज़मर्रा का काम क्या है, सैलरी कितनी है, और यहां से ऊपर जाने के दो वास्तविक रास्ते क्या हैं।',
      profileHeading: 'एक क्लर्क वास्तव में क्या करता है',
      profileBody: [
        'भूमिका का अधिकांश हिस्सा सीधा ग्राहक संपर्क है: काउंटर लेनदेन (जमा, निकासी, पासबुक अपडेट, चेक प्रोसेसिंग), नए खाते खोलना और KYC पूरा करना, और बैंक के अपने उत्पाद बेचना। शाखा के अनुसार, बैक-ऑफिस काम भी होता है — क्लीयरिंग, रिकंसिलिएशन और दस्तावेज़ संभालना जिसमें काउंटर पर खड़ा ग्राहक शामिल नहीं होता।',
      ],
      promotionHeading: 'प्रोमोशन: दो वास्तविक रास्ते, और समय-सीमा बैंक के अनुसार बहुत अलग',
      promotionBody: [
        'ऊपर जाने के दो यथार्थवादी रास्ते हैं। पहला है क्लेरिकल कैडर के भीतर ही एक वरिष्ठता-आधारित रास्ता, सीनियर क्लर्क या स्पेशल असिस्टेंट ग्रेड की ओर। दूसरा है अधिकारी कैडर में एक आंतरिक प्रोमोशन परीक्षा, जिसे कई सार्वजनिक क्षेत्र के बैंक ओपन-मार्केट IBPS PO परीक्षा से अलग चलाते हैं — लेकिन आवश्यक न्यूनतम सेवा वर्ष, और परीक्षा वास्तव में कितनी बार होती है, यह बैंक-दर-बैंक काफी अलग है। किसी तय समय-सीमा मान लेने के बजाय अपने विशेष बैंक की अपनी प्रोमोशन नीति देखें।',
      ],
      salaryHeading: 'सैलरी: बेसिक पे ₹24,050 से शुरू (स्नातकों के लिए ₹26,730)',
      salaryBody: [
        'क्लेरिकल कैडर का पे स्केल 12वें द्विपक्षीय समझौते (बाइपार्टाइट सेटलमेंट) के अंतर्गत तय हुआ, जो नवंबर 2022 से अक्टूबर 2027 तक प्रभावी है (मार्च 2024 में हस्ताक्षरित)। शुरुआती बेसिक पे ₹24,050 है; स्नातक अभ्यर्थियों को दो एडवांस इंक्रीमेंट मिलते हैं, जिससे उनका शुरुआती बेसिक ₹26,730 हो जाता है। यह स्केल लगभग दो दशकों की सेवा में वेतन वृद्धि के साथ ₹64,480 तक बढ़ता है।',
        'मासिक सकल वेतन (बेसिक + DA, HRA और अन्य भत्ते) अधिकांश भाग लेने वाले बैंकों में आम तौर पर लगभग ₹37,000–₹41,000 होता है; कटौतियों के बाद इन-हैंड सैलरी आम तौर पर ₹37,000–₹39,500 प्रति माह के दायरे में होती है, जो पोस्टिंग वाले शहर और उस विशेष बैंक के अपने भत्ता ढांचे के अनुसार अलग होती है।',
        'ये आंकड़े हर DA संशोधन के साथ बदलते हैं — सटीक वर्तमान आंकड़ों के लिए अपने आवंटित बैंक का अपना सैलरी सर्कुलर देखें।',
      ],
      perksHeading: 'भत्ते और लाभ',
      perks: [
        'रियायती ब्याज दर पर स्टाफ लोन (होम, पर्सनल, कार)',
        'आपके और परिवार के लिए मेडिकल इंश्योरेंस',
        'अवकाश यात्रा सुविधा (LFC) — समय-समय पर यात्रा भत्ता',
        'लॉकर सुविधा, अक्सर मुफ्त या रियायती',
        'बैंक के समतुल्य अंशदान के साथ राष्ट्रीय पेंशन प्रणाली (NPS)',
        'वरिष्ठ क्लेरिकल ग्रेड और, आंतरिक परीक्षा के ज़रिए, अधिकारी कैडर दोनों में एक तय प्रोमोशन चैनल',
        'प्राइवेट-सेक्टर बैंकिंग भूमिकाओं की तुलना में मजबूत नौकरी सुरक्षा',
      ],
      note: 'ऊपर दिए आंकड़े स्थिर संरचनात्मक संख्याएं हैं; सटीक इन-हैंड सैलरी पोस्टिंग के अनुसार अलग होती है और हर DA संशोधन के साथ बदलती है। वर्तमान आंकड़ों की पुष्टि करें',
      noteLinkLabel: 'IBPS की अपनी वेबसाइट से',
      recruitsHeading: 'IBPS क्लर्क किसके लिए भर्ती करता है',
      recruitsBody: 'IBPS क्लर्क, SBI के अलावा अन्य सार्वजनिक क्षेत्र के बैंकों में कस्टमर सर्विस एसोसिएट रिक्तियों को भरता है, जिसका सटीक बैंक-वार रिक्ति विवरण हर चक्र की अधिसूचना में नया प्रकाशित होता है।',
      offerHeading: 'Pariksha Saathi IBPS क्लर्क के लिए क्या देता है',
      offerBody: 'रीज़निंग, क्वांट और अंग्रेजी में विषयवार पाठ और अभ्यास, वास्तविक पैटर्न में सेक्शनल और फुल-लेंथ मॉक टेस्ट, एक मिस्टेक नोटबुक, और सामान्य व बैंकिंग जागरूकता के लिए दिनांकित करेंट अफेयर्स कैप्सूल — यह सब मुफ्त है।',
      sourceHeading: 'आधिकारिक स्रोत और नवीनतम अपडेट',
      officialLinkLabel: 'IBPS — आधिकारिक वेबसाइट',
      examNoticesLinkLabel: 'Pariksha Saathi पर नवीनतम एडमिट कार्ड, परिणाम और डेडलाइन अलर्ट',
      syllabusLinkLabel: 'IBPS क्लर्क सिलेबस और परीक्षा पैटर्न',
      ctaLabel: 'IBPS क्लर्क की मुफ्त पढ़ाई शुरू करें',
      backLabel: 'होम',
      disclaimer: 'Pariksha Saathi एक स्वतंत्र परियोजना है और IBPS या किसी भी बैंक से संबद्ध नहीं है। ऊपर दिए गए वेतन और प्रोमोशन विवरण सामान्य, संरचनात्मक तथ्य हैं, किसी विशेष आंकड़े या समय-सीमा की गारंटी नहीं — कोई भी वित्तीय निर्णय लेने से पहले हमेशा आधिकारिक स्रोत से वर्तमान आंकड़ों की पुष्टि करें।',
    },
  },
  {
    slug: 'sbi-po',
    examName: 'SBI PO',
    officialUrl: 'https://sbi.co.in/web/careers',
    en: {
      pageTitle: 'SBI PO Job Profile & Salary',
      lede: 'SBI runs its own Probationary Officer recruitment, separate from IBPS, for Junior Management Grade Scale I at the country’s largest public sector bank. The role is broadly similar to an IBPS PO’s, but SBI’s own pay structure and nationwide branch network make the specifics worth knowing separately.',
      profileHeading: 'What an SBI PO actually does',
      profileBody: [
        'The first two years are probation, spent rotating through branch functions much like at any PSU bank — customer accounts, credit appraisal, cash and clearing operations, cross-selling — but often at higher transaction volumes, given SBI’s scale. SBI POs also commonly handle government-linked accounts and schemes (pension disbursal, PMJDY accounts) that are a bigger part of the workload at SBI than at smaller banks.',
        'After confirmation as a JMGS-I officer, a PO takes on loan-sanctioning authority within set limits, team supervision, and increasingly independent branch responsibility.',
      ],
      promotionHeading: 'Promotion: a 2-year probation, then a broadly similar ladder to other PSU banks',
      promotionBody: [
        'Confirmation as a JMGS-I officer happens after the 2-year probation. From there, eligibility for the next step (Scale II) typically arrives after a further minimum of around 2–3 years, subject to SBI’s own performance appraisal and promotion process — SBI’s scale means this process tends to be more structured and predictable than at some smaller PSU banks, though actual promotion still depends on vacancies in a given year. The ladder continues through Scale III and beyond over a full career.',
      ],
      salaryHeading: 'Salary: a starting basic pay of ₹56,480, with four advance increments built in',
      salaryBody: [
        'SBI’s Scale I pay scale runs ₹48,480–₹62,480–₹67,160–₹85,920 with annual increments, same as the broader officers’ wage revision (effective November 2022, signed March 2024). SBI gives new POs four advance increments at hiring, which lifts the actual starting basic pay to ₹56,480 — a real, specific head start before you even begin.',
        'Add Dearness Allowance, House Rent Allowance, a special allowance and city/location allowances, and gross monthly pay commonly runs ₹90,000–₹93,000; in-hand pay after NPS and tax deductions is commonly in the ₹73,000–₹86,000 a month range. SBI itself has cited an approximate annual package of around ₹21–22 lakh for prime/metro postings, and a somewhat lower figure (around ₹20.4 lakh) for the Mumbai circle specifically — treat these as the commonly-quoted industry figures, not an official CTC guarantee, since they move with allowances and posting.',
      ],
      perksHeading: 'Perks and benefits',
      perks: [
        'Staff loans (home, car, personal) at concessional interest rates',
        'Medical insurance for you and your family, with SBI’s own staff welfare schemes on top',
        'Concessional or free banking services for staff',
        'Leave Fare Concession (LFC) — periodic travel allowance for you and your family',
        'A locker facility, often free or discounted',
        'National Pension System (NPS) with the bank’s matching contribution',
        'Postings across India’s largest branch network, with a clear, structured promotion ladder',
      ],
      note: 'The figures above are the commonly-cited structural numbers; exact in-hand pay and the annual package vary by posting and change with each DA revision. Confirm current figures against',
      noteLinkLabel: 'SBI’s own careers page',
      recruitsHeading: 'What SBI PO recruits for',
      recruitsBody: 'SBI PO fills Junior Management Grade Scale I officer vacancies at the State Bank of India specifically, with the exact vacancy count published fresh in each cycle’s notification.',
      offerHeading: 'What Pariksha Saathi offers for SBI PO',
      offerBody: 'Topic-wise lessons and practice across Reasoning, Quant and English, sectional and full-length mock tests in the real pattern, a Mistake Notebook, and dated current-affairs capsules for General and Banking Awareness — all free. See also our direct comparison of IBPS PO and SBI PO if you’re deciding between the two.',
      sourceHeading: 'Official source & latest updates',
      officialLinkLabel: 'SBI — official careers page',
      examNoticesLinkLabel: 'Latest admit card, result and deadline alerts on Pariksha Saathi',
      syllabusLinkLabel: 'SBI PO syllabus & exam pattern',
      ctaLabel: 'Start studying SBI PO free',
      backLabel: 'Home',
      disclaimer: 'Pariksha Saathi is an independent project and is not affiliated with SBI or any bank. Pay and promotion details above are general, structural facts, not a guarantee of any specific figure or timeline — always confirm current numbers against the official source before making a financial decision.',
    },
    hi: {
      pageTitle: 'SBI PO जॉब प्रोफाइल और सैलरी',
      lede: 'SBI, IBPS से अलग, अपनी स्वयं की प्रोबेशनरी ऑफिसर भर्ती चलाता है, देश के सबसे बड़े सार्वजनिक क्षेत्र के बैंक में जूनियर मैनेजमेंट ग्रेड स्केल I के लिए। भूमिका मोटे तौर पर IBPS PO जैसी ही है, लेकिन SBI का अपना वेतन ढांचा और देशभर का शाखा नेटवर्क इसकी विशिष्टताओं को अलग से जानना ज़रूरी बनाते हैं।',
      profileHeading: 'एक SBI PO वास्तव में क्या करता है',
      profileBody: [
        'पहले दो साल प्रोबेशन के होते हैं, जिसमें किसी भी PSU बैंक की तरह ब्रांच के विभिन्न कामों में घूमना होता है — ग्राहक खाते, क्रेडिट मूल्यांकन, कैश और क्लीयरिंग ऑपरेशन, उत्पाद बेचना — लेकिन अक्सर SBI के पैमाने को देखते हुए ज़्यादा लेनदेन मात्रा पर। SBI PO आम तौर पर सरकार से जुड़े खाते और योजनाएं (पेंशन वितरण, PMJDY खाते) भी संभालते हैं, जो SBI में छोटे बैंकों की तुलना में काम का एक बड़ा हिस्सा होता है।',
        'JMGS-I अधिकारी के रूप में पुष्टिकरण के बाद, एक PO तय सीमा के अंदर लोन मंजूर करने का अधिकार, टीम की देखरेख, और धीरे-धीरे स्वतंत्र ब्रांच जिम्मेदारी संभालता है।',
      ],
      promotionHeading: 'प्रोमोशन: 2 साल की प्रोबेशन, फिर अन्य PSU बैंकों जैसी ही सीढ़ी',
      promotionBody: [
        '2 साल की प्रोबेशन के बाद JMGS-I अधिकारी के रूप में पुष्टिकरण होता है। वहां से, अगले पड़ाव (स्केल II) की पात्रता आम तौर पर लगभग 2–3 साल की और सेवा के बाद आती है, SBI के अपने प्रदर्शन मूल्यांकन और प्रोमोशन प्रक्रिया के अधीन — SBI के पैमाने के कारण यह प्रक्रिया कुछ छोटे PSU बैंकों की तुलना में ज़्यादा संरचित और पूर्वानुमानित होती है, हालांकि वास्तविक प्रोमोशन अभी भी किसी दिए साल में रिक्तियों पर निर्भर करता है। सीढ़ी पूरे करियर में स्केल III और उससे आगे चलती रहती है।',
      ],
      salaryHeading: 'सैलरी: ₹56,480 की शुरुआती बेसिक पे, जिसमें चार एडवांस इंक्रीमेंट शामिल',
      salaryBody: [
        'SBI का स्केल I पे स्केल ₹48,480–₹62,480–₹67,160–₹85,920 वार्षिक वेतन वृद्धि के साथ चलता है, व्यापक अधिकारी वेतन संशोधन (नवंबर 2022 से प्रभावी, मार्च 2024 में हस्ताक्षरित) जैसा ही। SBI नए PO को नियुक्ति पर चार एडवांस इंक्रीमेंट देता है, जिससे वास्तविक शुरुआती बेसिक पे ₹56,480 हो जाता है — शुरू करने से पहले ही एक वास्तविक, विशिष्ट बढ़त।',
        'महंगाई भत्ता, मकान किराया भत्ता, एक विशेष भत्ता और शहर/स्थान भत्ते जोड़ने पर, मासिक सकल वेतन आम तौर पर ₹90,000–₹93,000 होता है; NPS और टैक्स कटौती के बाद, इन-हैंड सैलरी आम तौर पर ₹73,000–₹86,000 प्रति माह के दायरे में होती है। SBI ने स्वयं प्राइम/मेट्रो पोस्टिंग के लिए लगभग ₹21–22 लाख का अनुमानित वार्षिक पैकेज बताया है, और मुंबई सर्कल के लिए विशेष रूप से थोड़ा कम आंकड़ा (लगभग ₹20.4 लाख) — इन्हें सामान्यतः बताए जाने वाले उद्योग के आंकड़ों के रूप में लें, किसी आधिकारिक CTC गारंटी के रूप में नहीं, क्योंकि ये भत्तों और पोस्टिंग के साथ बदलते हैं।',
      ],
      perksHeading: 'भत्ते और लाभ',
      perks: [
        'रियायती ब्याज दर पर स्टाफ लोन (होम, कार, पर्सनल)',
        'आपके और परिवार के लिए मेडिकल इंश्योरेंस, साथ में SBI की अपनी स्टाफ कल्याण योजनाएं',
        'स्टाफ के लिए रियायती या मुफ्त बैंकिंग सेवाएं',
        'अवकाश यात्रा सुविधा (LFC) — आपके और परिवार के लिए समय-समय पर यात्रा भत्ता',
        'लॉकर सुविधा, अक्सर मुफ्त या रियायती',
        'बैंक के समतुल्य अंशदान के साथ राष्ट्रीय पेंशन प्रणाली (NPS)',
        'भारत के सबसे बड़े शाखा नेटवर्क में पोस्टिंग, एक स्पष्ट, संरचित प्रोमोशन सीढ़ी के साथ',
      ],
      note: 'ऊपर दिए आंकड़े सामान्यतः बताई जाने वाली संरचनात्मक संख्याएं हैं; सटीक इन-हैंड सैलरी और वार्षिक पैकेज पोस्टिंग के अनुसार अलग होते हैं और हर DA संशोधन के साथ बदलते हैं। वर्तमान आंकड़ों की पुष्टि करें',
      noteLinkLabel: 'SBI के अपने करियर पेज से',
      recruitsHeading: 'SBI PO किसके लिए भर्ती करता है',
      recruitsBody: 'SBI PO विशेष रूप से स्टेट बैंक ऑफ इंडिया में जूनियर मैनेजमेंट ग्रेड स्केल I अधिकारी रिक्तियों को भरता है, जिसकी सटीक रिक्ति संख्या हर चक्र की अधिसूचना में नई प्रकाशित होती है।',
      offerHeading: 'Pariksha Saathi SBI PO के लिए क्या देता है',
      offerBody: 'रीज़निंग, क्वांट और अंग्रेजी में विषयवार पाठ और अभ्यास, वास्तविक पैटर्न में सेक्शनल और फुल-लेंथ मॉक टेस्ट, एक मिस्टेक नोटबुक, और सामान्य व बैंकिंग जागरूकता के लिए दिनांकित करेंट अफेयर्स कैप्सूल — यह सब मुफ्त है। IBPS PO और SBI PO के बीच तय करना हो तो हमारी सीधी तुलना भी देखें।',
      sourceHeading: 'आधिकारिक स्रोत और नवीनतम अपडेट',
      officialLinkLabel: 'SBI — आधिकारिक करियर पेज',
      examNoticesLinkLabel: 'Pariksha Saathi पर नवीनतम एडमिट कार्ड, परिणाम और डेडलाइन अलर्ट',
      syllabusLinkLabel: 'SBI PO सिलेबस और परीक्षा पैटर्न',
      ctaLabel: 'SBI PO की मुफ्त पढ़ाई शुरू करें',
      backLabel: 'होम',
      disclaimer: 'Pariksha Saathi एक स्वतंत्र परियोजना है और SBI या किसी भी बैंक से संबद्ध नहीं है। ऊपर दिए गए वेतन और प्रोमोशन विवरण सामान्य, संरचनात्मक तथ्य हैं, किसी विशेष आंकड़े या समय-सीमा की गारंटी नहीं — कोई भी वित्तीय निर्णय लेने से पहले हमेशा आधिकारिक स्रोत से वर्तमान आंकड़ों की पुष्टि करें।',
    },
  },
  {
    slug: 'sbi-clerk',
    examName: 'SBI Clerk',
    officialUrl: 'https://sbi.co.in/web/careers',
    en: {
      pageTitle: 'SBI Clerk Job Profile & Salary',
      lede: 'SBI runs its own clerical recruitment, separate from IBPS Clerk, for the Junior Associate (Customer Support & Sales) role at the State Bank of India. The daily work closely mirrors any PSU bank clerk’s, but SBI’s own allowance structure and internal promotion route are worth knowing on their own terms.',
      profileHeading: 'What an SBI Junior Associate actually does',
      profileBody: [
        'The core of the job is counter and customer-facing work — deposits, withdrawals, passbook updates, cheque processing, new account opening and KYC — plus cross-selling SBI’s own products. SBI branches often see higher average customer footfall than smaller banks, so the pace of the counter work tends to be busier.',
      ],
      promotionHeading: 'Promotion: seniority within the clerical cadre, or SBI’s own internal route to officer',
      promotionBody: [
        'As with other PSU banks, there are two real paths: seniority-based progression within the clerical cadre toward Senior Associate/Special Assistant grades, and an internal promotion exam into the officer cadre. SBI specifically runs its own periodic internal exam for serving clerical staff to move into the PO cadre — a well-known route for SBI clerks specifically — though the eligibility criteria (minimum years of service) and how often the exam is held can change, so check SBI’s current circular rather than assuming a fixed cycle.',
      ],
      salaryHeading: 'Salary: the same pay scale as IBPS Clerk, but a somewhat higher in-hand figure',
      salaryBody: [
        'SBI Junior Associates are on the same 12th Bipartite Settlement clerical pay scale as IBPS Clerk — starting basic pay ₹24,050 (₹26,730 for graduates), rising to ₹64,480 over roughly two decades of service.',
        'SBI’s own allowance structure tends to push gross and in-hand pay a little higher than at some other PSU banks: one commonly-cited worked example puts gross monthly pay around ₹46,000 and in-hand pay (after deductions) around ₹42,500 a month — compared with the roughly ₹37,000–₹39,500 in-hand range commonly quoted for IBPS Clerk postings elsewhere. The exact figure still depends on your posting city and current DA.',
      ],
      perksHeading: 'Perks and benefits',
      perks: [
        'Staff loans (home, personal, car) at concessional interest rates',
        'Medical insurance for you and your family, with SBI’s own staff welfare schemes on top',
        'Leave Fare Concession (LFC) — periodic travel allowance',
        'A locker facility, often free or discounted',
        'National Pension System (NPS) with the bank’s matching contribution',
        'A defined promotion channel into senior clerical grades, and SBI’s own internal route into the officer cadre',
        'Strong job security compared with private-sector banking roles',
      ],
      note: 'The figures above are the commonly-cited structural numbers; exact in-hand pay varies by posting and changes with each DA revision. Confirm current figures against',
      noteLinkLabel: 'SBI’s own careers page',
      recruitsHeading: 'What SBI Clerk recruits for',
      recruitsBody: 'SBI Clerk fills Junior Associate (Customer Support & Sales) vacancies at the State Bank of India specifically, with the exact vacancy count published fresh in each cycle’s notification.',
      offerHeading: 'What Pariksha Saathi offers for SBI Clerk',
      offerBody: 'Topic-wise lessons and practice across Reasoning, Quant and English, sectional and full-length mock tests in the real pattern, a Mistake Notebook, and dated current-affairs capsules for General and Banking Awareness — all free.',
      sourceHeading: 'Official source & latest updates',
      officialLinkLabel: 'SBI — official careers page',
      examNoticesLinkLabel: 'Latest admit card, result and deadline alerts on Pariksha Saathi',
      syllabusLinkLabel: 'SBI Clerk syllabus & exam pattern',
      ctaLabel: 'Start studying SBI Clerk free',
      backLabel: 'Home',
      disclaimer: 'Pariksha Saathi is an independent project and is not affiliated with SBI or any bank. Pay and promotion details above are general, structural facts, not a guarantee of any specific figure or timeline — always confirm current numbers against the official source before making a financial decision.',
    },
    hi: {
      pageTitle: 'SBI क्लर्क जॉब प्रोफाइल और सैलरी',
      lede: 'SBI, IBPS क्लर्क से अलग, स्टेट बैंक ऑफ इंडिया में जूनियर एसोसिएट (कस्टमर सपोर्ट एंड सेल्स) भूमिका के लिए अपनी स्वयं की क्लेरिकल भर्ती चलाता है। दैनिक काम किसी भी PSU बैंक क्लर्क जैसा ही है, लेकिन SBI का अपना भत्ता ढांचा और आंतरिक प्रोमोशन रास्ता अलग से जानना ज़रूरी है।',
      profileHeading: 'एक SBI जूनियर एसोसिएट वास्तव में क्या करता है',
      profileBody: [
        'नौकरी का मुख्य हिस्सा काउंटर और ग्राहक-सामने वाला काम है — जमा, निकासी, पासबुक अपडेट, चेक प्रोसेसिंग, नए खाते खोलना और KYC — साथ ही SBI के अपने उत्पाद बेचना। SBI शाखाओं में अक्सर छोटे बैंकों की तुलना में ज़्यादा औसत ग्राहक संख्या होती है, इसलिए काउंटर काम की गति आम तौर पर व्यस्त होती है।',
      ],
      promotionHeading: 'प्रोमोशन: क्लेरिकल कैडर के भीतर वरिष्ठता, या SBI का अपना आंतरिक अधिकारी रास्ता',
      promotionBody: [
        'अन्य PSU बैंकों की तरह, दो वास्तविक रास्ते हैं: क्लेरिकल कैडर के भीतर वरिष्ठता-आधारित प्रगति सीनियर एसोसिएट/स्पेशल असिस्टेंट ग्रेड की ओर, और अधिकारी कैडर में एक आंतरिक प्रोमोशन परीक्षा। SBI विशेष रूप से सेवारत क्लेरिकल स्टाफ के लिए PO कैडर में जाने की अपनी समय-समय की आंतरिक परीक्षा चलाता है — SBI क्लर्कों के लिए विशेष रूप से एक जाना-पहचाना रास्ता — हालांकि पात्रता मानदंड (न्यूनतम सेवा वर्ष) और परीक्षा कितनी बार होती है यह बदल सकता है, इसलिए कोई तय चक्र मानने के बजाय SBI का वर्तमान सर्कुलर देखें।',
      ],
      salaryHeading: 'सैलरी: IBPS क्लर्क जैसा ही पे स्केल, लेकिन कुछ ऊंचा इन-हैंड आंकड़ा',
      salaryBody: [
        'SBI जूनियर एसोसिएट IBPS क्लर्क जैसे ही 12वें द्विपक्षीय समझौते के क्लेरिकल पे स्केल पर हैं — शुरुआती बेसिक पे ₹24,050 (स्नातकों के लिए ₹26,730), जो लगभग दो दशकों की सेवा में ₹64,480 तक बढ़ता है।',
        'SBI का अपना भत्ता ढांचा सकल और इन-हैंड सैलरी को कुछ अन्य PSU बैंकों की तुलना में थोड़ा ऊंचा रखता है: एक सामान्यतः बताया जाने वाला उदाहरण मासिक सकल वेतन लगभग ₹46,000 और कटौतियों के बाद इन-हैंड सैलरी लगभग ₹42,500 प्रति माह बताता है — जबकि अन्यत्र IBPS क्लर्क पोस्टिंग के लिए आम तौर पर ₹37,000–₹39,500 का इन-हैंड दायरा बताया जाता है। सटीक आंकड़ा अभी भी आपकी पोस्टिंग वाले शहर और वर्तमान DA पर निर्भर करता है।',
      ],
      perksHeading: 'भत्ते और लाभ',
      perks: [
        'रियायती ब्याज दर पर स्टाफ लोन (होम, पर्सनल, कार)',
        'आपके और परिवार के लिए मेडिकल इंश्योरेंस, साथ में SBI की अपनी स्टाफ कल्याण योजनाएं',
        'अवकाश यात्रा सुविधा (LFC) — समय-समय पर यात्रा भत्ता',
        'लॉकर सुविधा, अक्सर मुफ्त या रियायती',
        'बैंक के समतुल्य अंशदान के साथ राष्ट्रीय पेंशन प्रणाली (NPS)',
        'वरिष्ठ क्लेरिकल ग्रेड में एक तय प्रोमोशन चैनल, और अधिकारी कैडर में SBI का अपना आंतरिक रास्ता',
        'प्राइवेट-सेक्टर बैंकिंग भूमिकाओं की तुलना में मजबूत नौकरी सुरक्षा',
      ],
      note: 'ऊपर दिए आंकड़े सामान्यतः बताई जाने वाली संरचनात्मक संख्याएं हैं; सटीक इन-हैंड सैलरी पोस्टिंग के अनुसार अलग होती है और हर DA संशोधन के साथ बदलती है। वर्तमान आंकड़ों की पुष्टि करें',
      noteLinkLabel: 'SBI के अपने करियर पेज से',
      recruitsHeading: 'SBI क्लर्क किसके लिए भर्ती करता है',
      recruitsBody: 'SBI क्लर्क विशेष रूप से स्टेट बैंक ऑफ इंडिया में जूनियर एसोसिएट (कस्टमर सपोर्ट एंड सेल्स) रिक्तियों को भरता है, जिसकी सटीक रिक्ति संख्या हर चक्र की अधिसूचना में नई प्रकाशित होती है।',
      offerHeading: 'Pariksha Saathi SBI क्लर्क के लिए क्या देता है',
      offerBody: 'रीज़निंग, क्वांट और अंग्रेजी में विषयवार पाठ और अभ्यास, वास्तविक पैटर्न में सेक्शनल और फुल-लेंथ मॉक टेस्ट, एक मिस्टेक नोटबुक, और सामान्य व बैंकिंग जागरूकता के लिए दिनांकित करेंट अफेयर्स कैप्सूल — यह सब मुफ्त है।',
      sourceHeading: 'आधिकारिक स्रोत और नवीनतम अपडेट',
      officialLinkLabel: 'SBI — आधिकारिक करियर पेज',
      examNoticesLinkLabel: 'Pariksha Saathi पर नवीनतम एडमिट कार्ड, परिणाम और डेडलाइन अलर्ट',
      syllabusLinkLabel: 'SBI क्लर्क सिलेबस और परीक्षा पैटर्न',
      ctaLabel: 'SBI क्लर्क की मुफ्त पढ़ाई शुरू करें',
      backLabel: 'होम',
      disclaimer: 'Pariksha Saathi एक स्वतंत्र परियोजना है और SBI या किसी भी बैंक से संबद्ध नहीं है। ऊपर दिए गए वेतन और प्रोमोशन विवरण सामान्य, संरचनात्मक तथ्य हैं, किसी विशेष आंकड़े या समय-सीमा की गारंटी नहीं — कोई भी वित्तीय निर्णय लेने से पहले हमेशा आधिकारिक स्रोत से वर्तमान आंकड़ों की पुष्टि करें।',
    },
  },
  {
    "slug": "ssc-gd",
    "examName": "SSC GD Constable",
    "officialUrl": "https://ssc.gov.in/api/attachment/uploads/masterData/NoticeBoards/Notice_of_CTGD_2026.pdf",
    "en": {
      "pageTitle": "SSC GD Constable Job Profile & Pay",
      "lede": "SSC GD is one exam that recruits Constables (General Duty) for several central forces and Riflemen (General Duty) for Assam Rifles. This page sticks to what the SSC notice itself says about the posts, the pay level and how you are allotted to a force. It does not describe duties or estimate take-home pay, because the notice does neither.",
      "profileHeading": "One exam, several forces",
      "profileBody": [
        "The notice recruits Constable (GD) in the Border Security Force (BSF), Central Industrial Security Force (CISF), Central Reserve Police Force (CRPF), Sashastra Seema Bal (SSB), Indo-Tibetan Border Police (ITBP) and the Secretariat Security Force (SSF), and Rifleman (GD) in Assam Rifles. Selection has five steps: a computer-based exam, the Physical Efficiency Test, the Physical Standard Test, a medical examination and document verification.",
        "You fill in a preference order for the forces in the application form, and all of them must be filled. The final result with force allocation is declared on CBE merit and those preferences, provided you qualify the physical tests, the medical examination and the other conditions in the notice.",
        "Candidates recommended for appointment are liable to serve anywhere in India. Appointments can come in phases, because they depend on seats in the forces’ training facilities."
      ],
      "postsHeading": "The posts and how vacancies are filled",
      "posts": [
        {
          "name": "Constable (GD): BSF, CISF, CRPF, SSB, ITBP",
          "body": "Vacancies are filled state-wise or UT-wise on the basis of the domicile or permanent residence certificate of the state you choose. Some vacancies are earmarked for border-guarding districts and for militancy or Naxal-affected districts, for candidates of those districts only."
        },
        {
          "name": "Constable (GD): SSF (Secretariat Security Force)",
          "body": "Vacancies in SSF are filled on an all-India basis, not state-wise."
        },
        {
          "name": "Rifleman (GD): Assam Rifles",
          "body": "Filled state-wise or UT-wise, like the other forces apart from SSF."
        }
      ],
      "promotionHeading": "Promotion",
      "promotionBody": [
        "The SSC notice does not describe promotion. It says that joining, in-service matters, seniority and training are governed by the rules of the force that takes you."
      ],
      "salaryHeading": "Pay: Pay Level 3",
      "salaryBody": [
        "The notice gives Pay Level 3, ₹21,700 to ₹69,100, for all the posts. It does not list allowances or in-hand pay, and this page does not estimate them."
      ],
      "perksHeading": "Perks and benefits (the notice does not list any)",
      "perks": [],
      "note": "The official notice is the authority for posts, pay level and vacancies, and it changes from cycle to cycle. Confirm current details against",
      "noteLinkLabel": "the SSC notice for this cycle",
      "recruitsHeading": "What SSC GD recruits for",
      "recruitsBody": "Constable (GD) in BSF, CISF, CRPF, SSB, ITBP and SSF, and Rifleman (GD) in Assam Rifles. The forces covered and the vacancy breakdown are published afresh in each cycle’s notice.",
      "offerHeading": "Study on Pariksha Saathi",
      "offerBody": "Free topic-wise lessons and practice for the subjects above, sectional tests by subject, full-length mock tests, a Mistake Notebook that tracks your weak topics automatically, and dated current-affairs capsules.",
      "sourceHeading": "Official source & latest updates",
      "officialLinkLabel": "SSC GD — official notice",
      "examNoticesLinkLabel": "Latest admit card, result and deadline alerts on Pariksha Saathi",
      "syllabusLinkLabel": "SSC GD syllabus & exam pattern",
      "ctaLabel": "Start studying free",
      "backLabel": "Home",
      "disclaimer": "Pariksha Saathi is an independent project and is not affiliated with SSC or any government body. The pay level and post details above are taken from the SSC notice and may change with each cycle — always confirm against the official notice linked above before making any decision."
    },
    "hi": {
      "pageTitle": "SSC GD कांस्टेबल जॉब प्रोफाइल और वेतन",
      "lede": "SSC GD एक ऐसी परीक्षा है जो कई केंद्रीय बलों में कांस्टेबल (जनरल ड्यूटी) और असम राइफल्स में राइफलमैन (जनरल ड्यूटी) की भर्ती करती है। यह पृष्ठ केवल वही बताता है जो SSC की अधिसूचना पदों, पे लेवल और बल के आवंटन के बारे में कहती है। इसमें कामकाज का ब्योरा या हाथ में आने वाले वेतन का अनुमान नहीं दिया गया है, क्योंकि अधिसूचना में ये दोनों नहीं हैं।",
      "profileHeading": "एक परीक्षा, कई बल",
      "profileBody": [
        "अधिसूचना सीमा सुरक्षा बल (BSF), केंद्रीय औद्योगिक सुरक्षा बल (CISF), केंद्रीय रिज़र्व पुलिस बल (CRPF), सशस्त्र सीमा बल (SSB), भारत-तिब्बत सीमा पुलिस (ITBP) और सचिवालय सुरक्षा बल (SSF) में कांस्टेबल (GD), तथा असम राइफल्स में राइफलमैन (GD) की भर्ती करती है। चयन के पाँच चरण हैं: कंप्यूटर आधारित परीक्षा, शारीरिक दक्षता परीक्षा, शारीरिक मानक परीक्षा, चिकित्सा परीक्षा और दस्तावेज़ सत्यापन।",
        "आवेदन-पत्र में आप बलों की प्राथमिकता का क्रम भरते हैं, और सभी बलों की प्राथमिकता भरना ज़रूरी है। बल के आवंटन के साथ अंतिम परिणाम CBE मेरिट और इन्हीं प्राथमिकताओं के आधार पर घोषित होता है, बशर्ते आप शारीरिक परीक्षाओं, चिकित्सा परीक्षा और अधिसूचना की अन्य शर्तों में उत्तीर्ण हों।",
        "अनुशंसित अभ्यर्थी भारत में कहीं भी सेवा देने के लिए बाध्य हैं। नियुक्तियाँ चरणों में हो सकती हैं, क्योंकि वे बलों की प्रशिक्षण सुविधाओं में सीटों की उपलब्धता पर निर्भर करती हैं।"
      ],
      "postsHeading": "पद और रिक्तियाँ कैसे भरी जाती हैं",
      "posts": [
        {
          "name": "कांस्टेबल (GD): BSF, CISF, CRPF, SSB, ITBP",
          "body": "रिक्तियाँ राज्यवार या केंद्रशासित प्रदेशवार भरी जाती हैं, आपके चुने हुए राज्य के अधिवास या स्थायी निवास प्रमाण-पत्र के आधार पर। कुछ रिक्तियाँ सीमावर्ती जिलों और उग्रवाद या नक्सल प्रभावित जिलों के लिए आरक्षित हैं, जो केवल उन्हीं जिलों के अभ्यर्थियों के लिए हैं।"
        },
        {
          "name": "कांस्टेबल (GD): SSF (सचिवालय सुरक्षा बल)",
          "body": "SSF की रिक्तियाँ अखिल भारतीय आधार पर भरी जाती हैं, राज्यवार नहीं।"
        },
        {
          "name": "राइफलमैन (GD): असम राइफल्स",
          "body": "SSF को छोड़कर अन्य बलों की तरह राज्यवार या केंद्रशासित प्रदेशवार भरी जाती हैं।"
        }
      ],
      "promotionHeading": "पदोन्नति",
      "promotionBody": [
        "SSC की अधिसूचना में पदोन्नति का वर्णन नहीं है। उसमें केवल इतना कहा गया है कि नियुक्ति के बाद की सेवा-संबंधी बातें, वरिष्ठता और प्रशिक्षण उस बल के नियमों से तय होते हैं जिसमें आपको लिया जाता है।"
      ],
      "salaryHeading": "वेतन: पे लेवल 3",
      "salaryBody": [
        "अधिसूचना सभी पदों के लिए पे लेवल 3, ₹21,700 से ₹69,100 बताती है। उसमें भत्तों या हाथ में आने वाले वेतन की सूची नहीं है, और यह पृष्ठ उनका अनुमान नहीं देता।"
      ],
      "perksHeading": "भत्ते और लाभ (अधिसूचना में कोई सूची नहीं है)",
      "perks": [],
      "note": "पदों, पे लेवल और रिक्तियों के लिए आधिकारिक अधिसूचना ही प्रमाण है, और यह हर चक्र में बदलती है। वर्तमान विवरण की पुष्टि करें",
      "noteLinkLabel": "इस चक्र की SSC अधिसूचना से",
      "recruitsHeading": "SSC GD किसके लिए भर्ती करता है",
      "recruitsBody": "BSF, CISF, CRPF, SSB, ITBP और SSF में कांस्टेबल (GD), तथा असम राइफल्स में राइफलमैन (GD)। कौन-से बल शामिल हैं और रिक्तियों का बँटवारा क्या है, यह हर चक्र की अधिसूचना में नए सिरे से प्रकाशित होता है।",
      "offerHeading": "Pariksha Saathi पर पढ़ाई",
      "offerBody": "ऊपर दिए विषयों के लिए मुफ्त विषयवार पाठ और अभ्यास, विषयवार सेक्शनल टेस्ट, पूर्ण-लंबाई मॉक टेस्ट, आपके कमज़ोर विषयों को अपने-आप ट्रैक करने वाली Mistake Notebook, और तारीख़वार करंट अफेयर्स कैप्सूल।",
      "sourceHeading": "आधिकारिक स्रोत और नवीनतम अपडेट",
      "officialLinkLabel": "SSC GD — आधिकारिक अधिसूचना",
      "examNoticesLinkLabel": "Pariksha Saathi पर नवीनतम एडमिट कार्ड, परिणाम और डेडलाइन अलर्ट",
      "syllabusLinkLabel": "SSC GD सिलेबस और परीक्षा पैटर्न",
      "ctaLabel": "मुफ्त पढ़ाई शुरू करें",
      "backLabel": "होम",
      "disclaimer": "Pariksha Saathi एक स्वतंत्र परियोजना है और SSC या किसी भी सरकारी निकाय से संबद्ध नहीं है। ऊपर दिए गए पे लेवल और पदों के विवरण SSC की अधिसूचना से लिए गए हैं और हर चक्र के साथ बदल सकते हैं — कोई भी निर्णय लेने से पहले हमेशा ऊपर दी गई आधिकारिक अधिसूचना से पुष्टि करें।"
    }
  },
  {
    "slug": "ctet",
    "examName": "CTET",
    "officialUrl": "https://ctet.nic.in/",
    "en": {
      "pageTitle": "CTET: What the Certificate Qualifies You For",
      "lede": "CTET (Central Teacher Eligibility Test, conducted by CBSE) is not a job and has no salary of its own. It is an eligibility test: passing it gives you a certificate that counts toward being appointed as a teacher for classes I to VIII. This page sticks to what the CTET information bulletin says about that, and nothing about pay.",
      "profileHeading": "An eligibility test, not a post",
      "profileBody": [
        "The bulletin explains that the National Council for Teacher Education (NCTE) made passing a Teacher Eligibility Test one of the essential qualifications for a person to be appointed as a teacher for classes I to VIII, and that the Ministry of Education gave CBSE the job of conducting the Central Teacher Eligibility Test.",
        "A person who scores 60% or more is considered to have passed. Qualifying does not give anyone a right to recruitment or employment; it is only one of the eligibility criteria for appointment. The bulletin adds that school managements should give weightage to CTET scores in the recruitment process."
      ],
      "postsHeading": "Which paper for which classes",
      "posts": [
        {
          "name": "Paper I",
          "body": "For a person who intends to be a teacher for classes I to V (primary stage)."
        },
        {
          "name": "Paper II",
          "body": "For a person who intends to be a teacher for classes VI to VIII (elementary stage)."
        },
        {
          "name": "Both papers",
          "body": "A person who wants to teach both levels appears in Paper I and Paper II."
        }
      ],
      "promotionHeading": "After you qualify: validity and re-attempts",
      "promotionBody": [
        "The CTET certificate is valid for life for all categories. There is no limit on the number of attempts, and a person who has qualified may appear again to improve the score. The bulletin does not describe any career progression or promotion, because CTET is not a service."
      ],
      "salaryHeading": "Pay",
      "salaryBody": [
        "CTET is an eligibility test, not a post, and the bulletin gives no pay or salary figures. For pay, see the recruitment notice of the school or authority you apply to."
      ],
      "perksHeading": "Perks and benefits (the bulletin lists none)",
      "perks": [],
      "note": "The official information bulletin is the authority for the paper pattern, qualifying percentage and where CTET applies, and it can change between editions. Confirm current details on",
      "noteLinkLabel": "the official CTET website",
      "recruitsHeading": "Where the CTET certificate counts",
      "recruitsBody": "As the bulletin states: CTET applies to schools of the Central Government (KVS, NVS, Central Tibetan Schools and others) and to schools under the administration of the UTs of Chandigarh, Dadra and Nagar Haveli, Daman and Diu, Andaman and Nicobar Islands, Lakshadweep and NCT of Delhi. Unaided private schools may choose to consider it. Schools owned by state governments or local bodies, and aided schools, consider the State TET, although a state can consider CTET if it decides not to conduct its own TET. Teachers appointed since 6 March 2012 to teach classes I to VIII in CBSE-affiliated schools must have qualified CTET or a TET conducted by the appropriate government.",
      "offerHeading": "Study on Pariksha Saathi",
      "offerBody": "Free topic-wise lessons and practice for Child Development and Pedagogy, Language Pedagogy, Mathematics Pedagogy, EVS Pedagogy, Science and Social Studies Pedagogy and Inclusive Education, plus a Mistake Notebook that tracks your weak topics automatically.",
      "sourceHeading": "Official source & latest updates",
      "officialLinkLabel": "CTET — official website",
      "examNoticesLinkLabel": "Latest admit card, result and deadline alerts on Pariksha Saathi",
      "syllabusLinkLabel": "CTET syllabus & exam pattern",
      "ctaLabel": "Start studying free",
      "backLabel": "Home",
      "disclaimer": "Pariksha Saathi is an independent project and is not affiliated with CBSE, NCTE or any government body. The details above are taken from the CTET information bulletin and may change between editions — always confirm against the official bulletin on the CTET website before making any decision."
    },
    "hi": {
      "pageTitle": "CTET: प्रमाण-पत्र से आप किसके पात्र बनते हैं",
      "lede": "CTET (केंद्रीय शिक्षक पात्रता परीक्षा, जिसे CBSE आयोजित करता है) कोई नौकरी नहीं है और इसका अपना कोई वेतन नहीं होता। यह एक पात्रता परीक्षा है: इसे पास करने पर मिलने वाला प्रमाण-पत्र कक्षा I से VIII के शिक्षक के रूप में नियुक्ति के लिए गिना जाता है। यह पृष्ठ केवल वही बताता है जो CTET सूचना बुलेटिन इस बारे में कहता है, और वेतन के बारे में कुछ नहीं कहता।",
      "profileHeading": "पात्रता परीक्षा, कोई पद नहीं",
      "profileBody": [
        "बुलेटिन बताता है कि राष्ट्रीय अध्यापक शिक्षा परिषद (NCTE) ने कक्षा I से VIII के शिक्षक की नियुक्ति के लिए शिक्षक पात्रता परीक्षा उत्तीर्ण करना अनिवार्य योग्यताओं में से एक बनाया है, और शिक्षा मंत्रालय ने केंद्रीय शिक्षक पात्रता परीक्षा आयोजित करने की ज़िम्मेदारी CBSE को सौंपी है।",
        "60% या उससे अधिक अंक पाने वाला व्यक्ति उत्तीर्ण माना जाता है। उत्तीर्ण होने से किसी को भर्ती या रोज़गार का अधिकार नहीं मिलता; यह नियुक्ति के मानदंडों में से केवल एक है। बुलेटिन यह भी कहता है कि विद्यालय प्रबंधनों को भर्ती प्रक्रिया में CTET के अंकों को महत्व देना चाहिए।"
      ],
      "postsHeading": "किस कक्षा के लिए कौन-सा पेपर",
      "posts": [
        {
          "name": "पेपर I",
          "body": "कक्षा I से V (प्राथमिक स्तर) के शिक्षक बनने के इच्छुक व्यक्ति के लिए।"
        },
        {
          "name": "पेपर II",
          "body": "कक्षा VI से VIII (उच्च प्राथमिक स्तर) के शिक्षक बनने के इच्छुक व्यक्ति के लिए।"
        },
        {
          "name": "दोनों पेपर",
          "body": "जो व्यक्ति दोनों स्तरों पर पढ़ाना चाहता है, वह पेपर I और पेपर II दोनों देता है।"
        }
      ],
      "promotionHeading": "उत्तीर्ण होने के बाद: मान्यता अवधि और दोबारा प्रयास",
      "promotionBody": [
        "CTET प्रमाण-पत्र सभी श्रेणियों के लिए आजीवन मान्य है। प्रयासों की संख्या की कोई सीमा नहीं है, और उत्तीर्ण व्यक्ति अंक सुधारने के लिए दोबारा परीक्षा दे सकता है। बुलेटिन में किसी करियर-प्रगति या पदोन्नति का वर्णन नहीं है, क्योंकि CTET कोई सेवा नहीं है।"
      ],
      "salaryHeading": "वेतन",
      "salaryBody": [
        "CTET एक पात्रता परीक्षा है, कोई पद नहीं, और बुलेटिन में वेतन या तनख्वाह का कोई आँकड़ा नहीं दिया गया है। वेतन के लिए उस विद्यालय या प्राधिकरण की भर्ती अधिसूचना देखें जिसमें आप आवेदन करते हैं।"
      ],
      "perksHeading": "भत्ते और लाभ (बुलेटिन में कोई सूची नहीं है)",
      "perks": [],
      "note": "पेपर पैटर्न, अर्हक प्रतिशत और CTET कहाँ लागू होता है, इसके लिए आधिकारिक सूचना बुलेटिन ही प्रमाण है, और यह संस्करणों के बीच बदल सकता है। वर्तमान विवरण की पुष्टि करें",
      "noteLinkLabel": "आधिकारिक CTET वेबसाइट पर",
      "recruitsHeading": "CTET प्रमाण-पत्र कहाँ मान्य है",
      "recruitsBody": "बुलेटिन के अनुसार: CTET केंद्र सरकार के विद्यालयों (केंद्रीय विद्यालय, नवोदय विद्यालय, केंद्रीय तिब्बती विद्यालय आदि) और चंडीगढ़, दादरा और नगर हवेली, दमन और दीव, अंडमान और निकोबार द्वीप समूह, लक्षद्वीप तथा राष्ट्रीय राजधानी क्षेत्र दिल्ली के प्रशासन के अधीन विद्यालयों पर लागू होता है। गैर-सहायता प्राप्त निजी विद्यालय इसे मानने का विकल्प चुन सकते हैं। राज्य सरकारों या स्थानीय निकायों के विद्यालय और सहायता प्राप्त विद्यालय राज्य की TET को मानते हैं, हालाँकि कोई राज्य अपनी TET आयोजित न करने का निर्णय ले तो CTET को मान सकता है। 6 मार्च 2012 के बाद CBSE से संबद्ध विद्यालयों में कक्षा I से VIII पढ़ाने के लिए नियुक्त शिक्षकों का CTET या संबंधित सरकार द्वारा आयोजित TET उत्तीर्ण होना आवश्यक है।",
      "offerHeading": "Pariksha Saathi पर पढ़ाई",
      "offerBody": "बाल विकास एवं शिक्षाशास्त्र, भाषा शिक्षाशास्त्र, गणित शिक्षाशास्त्र, पर्यावरण अध्ययन (EVS) शिक्षाशास्त्र, विज्ञान एवं सामाजिक अध्ययन शिक्षाशास्त्र और समावेशी शिक्षा के लिए मुफ्त विषयवार पाठ और अभ्यास, साथ में आपके कमज़ोर विषयों को अपने-आप ट्रैक करने वाली Mistake Notebook।",
      "sourceHeading": "आधिकारिक स्रोत और नवीनतम अपडेट",
      "officialLinkLabel": "CTET — आधिकारिक वेबसाइट",
      "examNoticesLinkLabel": "Pariksha Saathi पर नवीनतम एडमिट कार्ड, परिणाम और डेडलाइन अलर्ट",
      "syllabusLinkLabel": "CTET सिलेबस और परीक्षा पैटर्न",
      "ctaLabel": "मुफ्त पढ़ाई शुरू करें",
      "backLabel": "होम",
      "disclaimer": "Pariksha Saathi एक स्वतंत्र परियोजना है और CBSE, NCTE या किसी भी सरकारी निकाय से संबद्ध नहीं है। ऊपर दिए गए विवरण CTET सूचना बुलेटिन से लिए गए हैं और संस्करणों के बीच बदल सकते हैं — कोई भी निर्णय लेने से पहले हमेशा CTET वेबसाइट पर उपलब्ध आधिकारिक बुलेटिन से पुष्टि करें।"
    }
  },
  {
    "slug": "rrb-ntpc",
    "examName": "RRB NTPC",
    "officialUrl": "https://rrb.indianrailways.gov.in/",
    "en": {
      "pageTitle": "RRB NTPC Job Profile & Salary",
      "lede": "RRB NTPC fills non-technical posts across Indian Railways. The October 2026 notifications list eight posts in two groups: graduate-level posts in CEN 06/2026 and 12th-level posts in CEN 07/2026. This page gives only what those notifications print: post names, 7th CPC pay level, initial pay, qualification and medical standard. The notifications do not describe each post’s day-to-day duties.",
      "profileHeading": "Two groups of posts, two notifications",
      "profileBody": [
        "A candidate applies to one RRB and gives an order of preference for posts and railway zones within it. Posts are allotted on merit, preference, medical fitness and the vacancies on the date the panel is prepared; once empanelled, a candidate gives up the right to be considered for any other post in the same pay level.",
        "Selected candidates undergo training wherever it is prescribed, and the notifications say only a stipend is paid during training. A railway servant is ordinarily employed throughout service on the railway or unit of first appointment, and the notifications say no transfer request is registered until the new appointee has completed at least 5 to 10 years of service."
      ],
      "postsHeading": "The posts, as the notifications list them",
      "posts": [
        {
          "name": "Chief Commercial cum Ticket Supervisor (CEN 06/2026)",
          "body": "Pay Level 6, initial pay ₹35,400. Medical standard B-2. Qualification: a degree from a recognised university or its equivalent."
        },
        {
          "name": "Goods Train Manager (CEN 06/2026)",
          "body": "Pay Level 5, initial pay ₹29,200. Medical standard A-2; the notification makes candidates who have had Lasik or similar refractive surgery ineligible for A-2 posts. Qualification: a degree from a recognised university or its equivalent."
        },
        {
          "name": "Junior Accounts Assistant cum Typist (CEN 06/2026)",
          "body": "Pay Level 5, initial pay ₹29,200. Medical standard C-2. Qualification: a degree from a recognised university or its equivalent."
        },
        {
          "name": "Senior Clerk cum Typist (CEN 06/2026)",
          "body": "Pay Level 5, initial pay ₹29,200. Medical standard C-2. Qualification: a degree from a recognised university or its equivalent."
        },
        {
          "name": "Commercial cum Ticket Clerk (CEN 07/2026)",
          "body": "Pay Level 3, initial pay ₹21,700. Medical standard B-2. Qualification: 12th (+2 stage) or equivalent with at least 50% marks in aggregate, a condition not insisted on for SC, ST, PwBD, ex-servicemen and candidates with a higher qualification."
        },
        {
          "name": "Accounts Clerk cum Typist (CEN 07/2026)",
          "body": "Pay Level 2, initial pay ₹19,900. Medical standard C-2. Qualification: 12th (+2 stage) or equivalent with at least 50% marks in aggregate, with the same exceptions."
        },
        {
          "name": "Junior Clerk cum Typist (CEN 07/2026)",
          "body": "Pay Level 2, initial pay ₹19,900. Medical standard C-2. Qualification: 12th (+2 stage) or equivalent with at least 50% marks in aggregate, with the same exceptions."
        },
        {
          "name": "Trains Clerk (CEN 07/2026)",
          "body": "Pay Level 2, initial pay ₹19,900. Medical standard A-3; the notification makes candidates who have had Lasik or similar refractive surgery ineligible for A-3 posts. Qualification: 12th (+2 stage) or equivalent with at least 50% marks in aggregate, with the same exceptions."
        }
      ],
      "promotionHeading": "Promotion",
      "promotionBody": [
        "The notifications do not set out a promotion path. For the typist posts they say the typing skill test has been dispensed with, that typing proficiency will be assessed after joining, and that unsatisfactory performance may affect or delay confirmation or promotion."
      ],
      "salaryHeading": "Pay: the level and initial pay the notifications print",
      "salaryBody": [
        "The notifications give a 7th CPC pay level and an initial pay for each post: Level 6, ₹35,400 (Chief Commercial cum Ticket Supervisor); Level 5, ₹29,200 (Goods Train Manager, Junior Accounts Assistant cum Typist, Senior Clerk cum Typist); Level 3, ₹21,700 (Commercial cum Ticket Clerk); Level 2, ₹19,900 (Accounts Clerk cum Typist, Junior Clerk cum Typist, Trains Clerk).",
        "The notifications give no in-hand salary, allowance or benefit figures, so this page does not estimate any."
      ],
      "perksHeading": "Perks and benefits",
      "perks": [],
      "note": "Pay, qualification and medical standards are set by the official notification and any corrigendum to it. Confirm them against",
      "noteLinkLabel": "the official RRB website",
      "recruitsHeading": "What RRB NTPC recruits for",
      "recruitsBody": "CEN 06/2026 covers four graduate-level posts and CEN 07/2026 four 12th-level posts. Each notification lists vacancies RRB-wise and railway-zone-wise, and says they may increase or decrease with the needs of the Railway Administration.",
      "offerHeading": "What Pariksha Saathi offers for RRB NTPC",
      "offerBody": "Free topic-wise lessons and practice for the subjects above, sectional tests by subject, full-length mock tests, a Mistake Notebook that tracks your weak topics automatically, and dated current-affairs capsules.",
      "sourceHeading": "Official source & latest updates",
      "officialLinkLabel": "RRB — official website",
      "examNoticesLinkLabel": "Latest admit card, result and deadline alerts on Pariksha Saathi",
      "syllabusLinkLabel": "RRB NTPC syllabus & exam pattern",
      "ctaLabel": "Start studying RRB NTPC free",
      "backLabel": "Home",
      "disclaimer": "Pariksha Saathi is an independent project and is not affiliated with the Railway Recruitment Boards or any government body. The pay and post details above are copied from the notifications named on this page, not a guarantee of any specific figure or timeline — always confirm current numbers against the official notification linked above before making a financial decision."
    },
    "hi": {
      "pageTitle": "RRB NTPC जॉब प्रोफाइल और सैलरी",
      "lede": "RRB NTPC भारतीय रेलवे में नॉन-टेक्निकल पद भरता है। अक्टूबर 2026 की अधिसूचनाओं में आठ पद दो समूहों में दिए गए हैं: CEN 06/2026 में स्नातक स्तर के पद और CEN 07/2026 में 12वीं स्तर के पद। यह पेज केवल वही बताता है जो अधिसूचनाओं में छपा है: पदों के नाम, 7वें वेतन आयोग का पे लेवल, प्रारंभिक वेतन, योग्यता और चिकित्सा मानक। अधिसूचनाओं में हर पद के रोज़मर्रा के काम का वर्णन नहीं है।",
      "profileHeading": "पदों के दो समूह, दो अधिसूचनाएं",
      "profileBody": [
        "अभ्यर्थी एक ही RRB में आवेदन करता है और उसी के भीतर पदों और रेलवे ज़ोनों की प्राथमिकता क्रम में देता है। पद मेरिट, प्राथमिकता, चिकित्सा योग्यता और पैनल बनने की तारीख की रिक्तियों के आधार पर आवंटित होते हैं; पैनल में आने के बाद अभ्यर्थी उसी पे लेवल के किसी अन्य पद के लिए विचार किए जाने का अधिकार खो देता है।",
        "चयनित अभ्यर्थियों को जहां प्रशिक्षण निर्धारित है वहां प्रशिक्षण से गुज़रना होता है, और अधिसूचनाओं के अनुसार प्रशिक्षण के दौरान केवल वृत्ति (स्टाइपेंड) मिलती है। रेलवे कर्मचारी को सामान्यतः पूरी सेवा के दौरान उसी रेलवे या इकाई में नियोजित रखा जाता है जहां उसकी पहली नियुक्ति हुई, और अधिसूचनाओं के अनुसार नए नियुक्त कर्मचारी के कम से कम 5 से 10 साल की सेवा पूरी करने तक तबादले का कोई अनुरोध दर्ज नहीं किया जाता।"
      ],
      "postsHeading": "पद, जैसा अधिसूचनाओं में दिया है",
      "posts": [
        {
          "name": "चीफ कमर्शियल कम टिकट सुपरवाइज़र (CEN 06/2026)",
          "body": "पे लेवल 6, प्रारंभिक वेतन ₹35,400। चिकित्सा मानक B-2। योग्यता: मान्यता प्राप्त विश्वविद्यालय की डिग्री या उसके समकक्ष।"
        },
        {
          "name": "गुड्स ट्रेन मैनेजर (CEN 06/2026)",
          "body": "पे लेवल 5, प्रारंभिक वेतन ₹29,200। चिकित्सा मानक A-2; अधिसूचना के अनुसार लेसिक या इसी तरह की अपवर्तन-दोष शल्य-क्रिया करवा चुके अभ्यर्थी A-2 वाले पदों के लिए अपात्र हैं। योग्यता: मान्यता प्राप्त विश्वविद्यालय की डिग्री या उसके समकक्ष।"
        },
        {
          "name": "जूनियर अकाउंट्स असिस्टेंट कम टाइपिस्ट (CEN 06/2026)",
          "body": "पे लेवल 5, प्रारंभिक वेतन ₹29,200। चिकित्सा मानक C-2। योग्यता: मान्यता प्राप्त विश्वविद्यालय की डिग्री या उसके समकक्ष।"
        },
        {
          "name": "सीनियर क्लर्क कम टाइपिस्ट (CEN 06/2026)",
          "body": "पे लेवल 5, प्रारंभिक वेतन ₹29,200। चिकित्सा मानक C-2। योग्यता: मान्यता प्राप्त विश्वविद्यालय की डिग्री या उसके समकक्ष।"
        },
        {
          "name": "कमर्शियल कम टिकट क्लर्क (CEN 07/2026)",
          "body": "पे लेवल 3, प्रारंभिक वेतन ₹21,700। चिकित्सा मानक B-2। योग्यता: 12वीं (+2 स्तर) या समकक्ष, कुल मिलाकर कम से कम 50% अंकों के साथ; SC, ST, PwBD, पूर्व सैनिकों और उच्च योग्यता वाले अभ्यर्थियों पर यह शर्त नहीं लगाई जाती।"
        },
        {
          "name": "अकाउंट्स क्लर्क कम टाइपिस्ट (CEN 07/2026)",
          "body": "पे लेवल 2, प्रारंभिक वेतन ₹19,900। चिकित्सा मानक C-2। योग्यता: 12वीं (+2 स्तर) या समकक्ष, कुल मिलाकर कम से कम 50% अंकों के साथ, वही अपवाद लागू।"
        },
        {
          "name": "जूनियर क्लर्क कम टाइपिस्ट (CEN 07/2026)",
          "body": "पे लेवल 2, प्रारंभिक वेतन ₹19,900। चिकित्सा मानक C-2। योग्यता: 12वीं (+2 स्तर) या समकक्ष, कुल मिलाकर कम से कम 50% अंकों के साथ, वही अपवाद लागू।"
        },
        {
          "name": "ट्रेन्स क्लर्क (CEN 07/2026)",
          "body": "पे लेवल 2, प्रारंभिक वेतन ₹19,900। चिकित्सा मानक A-3; अधिसूचना के अनुसार लेसिक या इसी तरह की अपवर्तन-दोष शल्य-क्रिया करवा चुके अभ्यर्थी A-3 वाले पदों के लिए अपात्र हैं। योग्यता: 12वीं (+2 स्तर) या समकक्ष, कुल मिलाकर कम से कम 50% अंकों के साथ, वही अपवाद लागू।"
        }
      ],
      "promotionHeading": "प्रोमोशन",
      "promotionBody": [
        "अधिसूचनाओं में प्रोमोशन का कोई रास्ता नहीं बताया गया है। टाइपिस्ट पदों के लिए वे कहती हैं कि टाइपिंग स्किल टेस्ट समाप्त कर दिया गया है, टाइपिंग दक्षता का आकलन नियुक्ति के बाद होगा, और असंतोषजनक प्रदर्शन से पुष्टिकरण (कन्फर्मेशन) या प्रोमोशन प्रभावित या विलंबित हो सकता है।"
      ],
      "salaryHeading": "वेतन: अधिसूचनाओं में छपा पे लेवल और प्रारंभिक वेतन",
      "salaryBody": [
        "अधिसूचनाओं में हर पद के लिए 7वें वेतन आयोग का पे लेवल और प्रारंभिक वेतन दिया गया है: लेवल 6, ₹35,400 (चीफ कमर्शियल कम टिकट सुपरवाइज़र); लेवल 5, ₹29,200 (गुड्स ट्रेन मैनेजर, जूनियर अकाउंट्स असिस्टेंट कम टाइपिस्ट, सीनियर क्लर्क कम टाइपिस्ट); लेवल 3, ₹21,700 (कमर्शियल कम टिकट क्लर्क); लेवल 2, ₹19,900 (अकाउंट्स क्लर्क कम टाइपिस्ट, जूनियर क्लर्क कम टाइपिस्ट, ट्रेन्स क्लर्क)।",
        "अधिसूचनाओं में इन-हैंड सैलरी, भत्तों या लाभों के आंकड़े नहीं दिए गए हैं, इसलिए यह पेज कोई अनुमान नहीं देता।"
      ],
      "perksHeading": "भत्ते और लाभ",
      "perks": [],
      "note": "वेतन, योग्यता और चिकित्सा मानक आधिकारिक अधिसूचना और उसके किसी भी शुद्धिपत्र से तय होते हैं। इनकी पुष्टि करें",
      "noteLinkLabel": "आधिकारिक RRB वेबसाइट से",
      "recruitsHeading": "RRB NTPC किसके लिए भर्ती करता है",
      "recruitsBody": "CEN 06/2026 में स्नातक स्तर के चार पद और CEN 07/2026 में 12वीं स्तर के चार पद हैं। हर अधिसूचना में रिक्तियां RRB-वार और रेलवे ज़ोन-वार दी गई हैं, और कहा गया है कि रेलवे प्रशासन की ज़रूरत के अनुसार ये घट-बढ़ सकती हैं।",
      "offerHeading": "Pariksha Saathi RRB NTPC के लिए क्या देता है",
      "offerBody": "ऊपर दिए विषयों के लिए मुफ्त विषयवार पाठ और अभ्यास, विषयवार सेक्शनल टेस्ट, पूर्ण-लंबाई मॉक टेस्ट, आपके कमज़ोर विषयों को अपने-आप ट्रैक करने वाली Mistake Notebook, और तारीख़वार करंट अफेयर्स कैप्सूल।",
      "sourceHeading": "आधिकारिक स्रोत और नवीनतम अपडेट",
      "officialLinkLabel": "RRB — आधिकारिक वेबसाइट",
      "examNoticesLinkLabel": "Pariksha Saathi पर नवीनतम एडमिट कार्ड, परिणाम और डेडलाइन अलर्ट",
      "syllabusLinkLabel": "RRB NTPC सिलेबस और परीक्षा पैटर्न",
      "ctaLabel": "RRB NTPC की मुफ्त पढ़ाई शुरू करें",
      "backLabel": "होम",
      "disclaimer": "Pariksha Saathi एक स्वतंत्र परियोजना है और रेलवे भर्ती बोर्ड या किसी भी सरकारी निकाय से संबद्ध नहीं है। ऊपर दिए गए वेतन और पद संबंधी विवरण इस पेज पर बताई गई अधिसूचनाओं से लिए गए हैं, किसी विशेष आंकड़े या समय-सीमा की गारंटी नहीं हैं — कोई भी आर्थिक निर्णय लेने से पहले ऊपर दी गई आधिकारिक अधिसूचना से वर्तमान आंकड़ों की पुष्टि ज़रूर करें।"
    }
  },
  {
    "slug": "rrb-group-d",
    "examName": "RRB Group D",
    "officialUrl": "https://rrb.indianrailways.gov.in/",
    "en": {
      "pageTitle": "RRB Group D Job Profile & Salary",
      "lede": "RRB Group D recruits into Level 1 of the 7th CPC pay matrix across Indian Railways. CEN 09/2025 lists 14 post categories in several departments, all at one pay level and one qualification. This page gives only what that notification prints: the posts and their departments, pay level, initial pay, qualification and medical standard. The notification does not describe each post’s day-to-day duties.",
      "profileHeading": "One pay level, many posts",
      "profileBody": [
        "A candidate applies to one RRB or railway zone and gives an order of preference for the posts in it. The post is allotted on merit, preference, medical fitness and vacancies, and once a post is allotted the candidate gives up the right to be considered for any other post.",
        "Selected candidates undergo training wherever it is prescribed, and the notification says only a stipend is paid, as applicable, during training. A railway servant is ordinarily employed throughout service on the railway of first appointment, and the notification says no transfer request is registered until the new appointee has completed at least 5 to 10 years of service."
      ],
      "postsHeading": "The posts, as Annexure A lists them",
      "posts": [
        {
          "name": "Assistant TRD",
          "body": "Electrical department (TRD). Medical standard B-1."
        },
        {
          "name": "Assistant Operations (Electrical), General Services",
          "body": "Electrical department (General Services). Medical standard B-1."
        },
        {
          "name": "Assistant TL and AC",
          "body": "Electrical department (General Services). Medical standard B-1."
        },
        {
          "name": "Assistant (S and T), Signal",
          "body": "S and T department (Signal). Medical standard B-1."
        },
        {
          "name": "Pointsman B",
          "body": "Traffic department. Medical standard A-2."
        },
        {
          "name": "Assistant Track Machine",
          "body": "Engineering department (Track Machine). Medical standard A-3."
        },
        {
          "name": "Track Maintainer-IV",
          "body": "Engineering department (P Way). Medical standard B-1."
        },
        {
          "name": "Assistant Bridge",
          "body": "Engineering department (Bridge). Medical standard B-1."
        },
        {
          "name": "Assistant Carriage and Wagon",
          "body": "Mechanical department (Carriage and Wagon). Medical standard B-1."
        },
        {
          "name": "Assistant Loco Shed (Electrical), Electrical Shed",
          "body": "Electrical department (Electrical Shed). Medical standard B-1."
        },
        {
          "name": "Assistant P.Way",
          "body": "Engineering department (P Way). Medical standard B-1."
        },
        {
          "name": "Assistant Operations (Electrical), Workshop",
          "body": "Electrical department (Workshop). Medical standard C-1."
        },
        {
          "name": "Assistant Loco Shed (Electrical), Diesel Shed",
          "body": "Electrical department (Diesel Shed). Medical standard B-1."
        },
        {
          "name": "Assistant (S and T), Workshop",
          "body": "S and T department (Workshop). Medical standard C-1."
        }
      ],
      "promotionHeading": "Promotion",
      "promotionBody": [],
      "salaryHeading": "Pay: Level 1, initial pay as printed in the notification",
      "salaryBody": [
        "The notification lists all these posts in Level 1 of the 7th CPC pay matrix, with an initial pay of ₹18,000. The qualification printed for every post is a 10th pass, an ITI or equivalent, or a National Apprenticeship Certificate (NAC) granted by NCVT.",
        "The notification gives no in-hand salary, allowance or benefit figures, so this page does not estimate any."
      ],
      "perksHeading": "Perks and benefits",
      "perks": [],
      "note": "Pay, qualification and medical standards are set by the official notification and its corrigenda. Confirm them against",
      "noteLinkLabel": "the official RRB website",
      "recruitsHeading": "What Group D recruits for",
      "recruitsBody": "CEN 09/2025 covers Level 1 posts in the Electrical, S and T, Traffic, Engineering and Mechanical departments. The notification lists vacancies railway-wise and post-wise, and says they may be revised in part or in full.",
      "offerHeading": "What Pariksha Saathi offers for RRB Group D",
      "offerBody": "Free topic-wise lessons and practice for the subjects above, sectional tests by subject, full-length mock tests, a Mistake Notebook that tracks your weak topics automatically, and dated current-affairs capsules.",
      "sourceHeading": "Official source & latest updates",
      "officialLinkLabel": "RRB — official website",
      "examNoticesLinkLabel": "Latest admit card, result and deadline alerts on Pariksha Saathi",
      "syllabusLinkLabel": "RRB Group D syllabus & exam pattern",
      "ctaLabel": "Start studying RRB Group D free",
      "backLabel": "Home",
      "disclaimer": "Pariksha Saathi is an independent project and is not affiliated with the Railway Recruitment Boards or any government body. The pay and post details above are copied from the notification named on this page, not a guarantee of any specific figure or timeline — always confirm current numbers against the official notification linked above before making a financial decision."
    },
    "hi": {
      "pageTitle": "RRB ग्रुप D जॉब प्रोफाइल और सैलरी",
      "lede": "RRB ग्रुप D भारतीय रेलवे में 7वें वेतन आयोग के मैट्रिक्स के लेवल 1 पर भर्ती करता है। CEN 09/2025 में कई विभागों की 14 पद श्रेणियां हैं, सभी एक ही पे लेवल और एक ही योग्यता वाली। यह पेज केवल वही बताता है जो उस अधिसूचना में छपा है: पद और उनके विभाग, पे लेवल, प्रारंभिक वेतन, योग्यता और चिकित्सा मानक। अधिसूचना में हर पद के रोज़मर्रा के काम का वर्णन नहीं है।",
      "profileHeading": "एक पे लेवल, कई पद",
      "profileBody": [
        "अभ्यर्थी एक ही RRB या रेलवे ज़ोन में आवेदन करता है और उसी के भीतर पदों की प्राथमिकता क्रम में देता है। पद मेरिट, प्राथमिकता, चिकित्सा योग्यता और रिक्तियों के आधार पर आवंटित होता है, और पद आवंटित होने के बाद अभ्यर्थी किसी अन्य पद के लिए विचार किए जाने का अधिकार खो देता है।",
        "चयनित अभ्यर्थियों को जहां प्रशिक्षण निर्धारित है वहां प्रशिक्षण से गुज़रना होता है, और अधिसूचना के अनुसार प्रशिक्षण के दौरान केवल वृत्ति (स्टाइपेंड), जैसी लागू हो, मिलती है। रेलवे कर्मचारी को सामान्यतः पूरी सेवा के दौरान उसी रेलवे में नियोजित रखा जाता है जहां उसकी पहली नियुक्ति हुई, और अधिसूचना के अनुसार नए नियुक्त कर्मचारी के कम से कम 5 से 10 साल की सेवा पूरी करने तक तबादले का कोई अनुरोध दर्ज नहीं किया जाता।"
      ],
      "postsHeading": "पद, जैसा अनुलग्नक A में दिया है",
      "posts": [
        {
          "name": "असिस्टेंट TRD",
          "body": "इलेक्ट्रिकल विभाग (TRD)। चिकित्सा मानक B-1।"
        },
        {
          "name": "असिस्टेंट ऑपरेशंस (इलेक्ट्रिकल), जनरल सर्विसेज़",
          "body": "इलेक्ट्रिकल विभाग (जनरल सर्विसेज़)। चिकित्सा मानक B-1।"
        },
        {
          "name": "असिस्टेंट TL एंड AC",
          "body": "इलेक्ट्रिकल विभाग (जनरल सर्विसेज़)। चिकित्सा मानक B-1।"
        },
        {
          "name": "असिस्टेंट (S एंड T), सिग्नल",
          "body": "S एंड T विभाग (सिग्नल)। चिकित्सा मानक B-1।"
        },
        {
          "name": "पॉइंट्समैन-बी",
          "body": "ट्रैफिक विभाग। चिकित्सा मानक A-2।"
        },
        {
          "name": "असिस्टेंट ट्रैक मशीन",
          "body": "इंजीनियरिंग विभाग (ट्रैक मशीन)। चिकित्सा मानक A-3।"
        },
        {
          "name": "ट्रैक मेंटेनर-IV",
          "body": "इंजीनियरिंग विभाग (पी-वे)। चिकित्सा मानक B-1।"
        },
        {
          "name": "असिस्टेंट ब्रिज",
          "body": "इंजीनियरिंग विभाग (ब्रिज)। चिकित्सा मानक B-1।"
        },
        {
          "name": "असिस्टेंट कैरेज एंड वैगन",
          "body": "मैकेनिकल विभाग (कैरेज एंड वैगन)। चिकित्सा मानक B-1।"
        },
        {
          "name": "असिस्टेंट लोको शेड (इलेक्ट्रिकल), इलेक्ट्रिकल शेड",
          "body": "इलेक्ट्रिकल विभाग (इलेक्ट्रिकल शेड)। चिकित्सा मानक B-1।"
        },
        {
          "name": "असिस्टेंट पी-वे",
          "body": "इंजीनियरिंग विभाग (पी-वे)। चिकित्सा मानक B-1।"
        },
        {
          "name": "असिस्टेंट ऑपरेशंस (इलेक्ट्रिकल), वर्कशॉप",
          "body": "इलेक्ट्रिकल विभाग (वर्कशॉप)। चिकित्सा मानक C-1।"
        },
        {
          "name": "असिस्टेंट लोको शेड (इलेक्ट्रिकल), डीज़ल शेड",
          "body": "इलेक्ट्रिकल विभाग (डीज़ल शेड)। चिकित्सा मानक B-1।"
        },
        {
          "name": "असिस्टेंट (S एंड T), वर्कशॉप",
          "body": "S एंड T विभाग (वर्कशॉप)। चिकित्सा मानक C-1।"
        }
      ],
      "promotionHeading": "प्रोमोशन",
      "promotionBody": [],
      "salaryHeading": "वेतन: लेवल 1, प्रारंभिक वेतन जैसा अधिसूचना में छपा है",
      "salaryBody": [
        "अधिसूचना में ये सभी पद 7वें वेतन आयोग के मैट्रिक्स के लेवल 1 में दिए गए हैं, प्रारंभिक वेतन ₹18,000। हर पद के लिए छपी योग्यता 10वीं पास, ITI या समकक्ष, या NCVT द्वारा प्रदत्त राष्ट्रीय अप्रेंटिसशिप प्रमाणपत्र (NAC) है।",
        "अधिसूचना में इन-हैंड सैलरी, भत्तों या लाभों के आंकड़े नहीं दिए गए हैं, इसलिए यह पेज कोई अनुमान नहीं देता।"
      ],
      "perksHeading": "भत्ते और लाभ",
      "perks": [],
      "note": "वेतन, योग्यता और चिकित्सा मानक आधिकारिक अधिसूचना और उसके शुद्धिपत्रों से तय होते हैं। इनकी पुष्टि करें",
      "noteLinkLabel": "आधिकारिक RRB वेबसाइट से",
      "recruitsHeading": "ग्रुप D किसके लिए भर्ती करता है",
      "recruitsBody": "CEN 09/2025 में इलेक्ट्रिकल, S एंड T, ट्रैफिक, इंजीनियरिंग और मैकेनिकल विभागों के लेवल 1 पद हैं। अधिसूचना में रिक्तियां रेलवे-वार और पद-वार दी गई हैं, और कहा गया है कि इन्हें पूर्ण या आंशिक रूप से संशोधित किया जा सकता है।",
      "offerHeading": "Pariksha Saathi RRB ग्रुप D के लिए क्या देता है",
      "offerBody": "ऊपर दिए विषयों के लिए मुफ्त विषयवार पाठ और अभ्यास, विषयवार सेक्शनल टेस्ट, पूर्ण-लंबाई मॉक टेस्ट, आपके कमज़ोर विषयों को अपने-आप ट्रैक करने वाली Mistake Notebook, और तारीख़वार करंट अफेयर्स कैप्सूल।",
      "sourceHeading": "आधिकारिक स्रोत और नवीनतम अपडेट",
      "officialLinkLabel": "RRB — आधिकारिक वेबसाइट",
      "examNoticesLinkLabel": "Pariksha Saathi पर नवीनतम एडमिट कार्ड, परिणाम और डेडलाइन अलर्ट",
      "syllabusLinkLabel": "RRB ग्रुप D सिलेबस और परीक्षा पैटर्न",
      "ctaLabel": "RRB ग्रुप D की मुफ्त पढ़ाई शुरू करें",
      "backLabel": "होम",
      "disclaimer": "Pariksha Saathi एक स्वतंत्र परियोजना है और रेलवे भर्ती बोर्ड या किसी भी सरकारी निकाय से संबद्ध नहीं है। ऊपर दिए गए वेतन और पद संबंधी विवरण इस पेज पर बताई गई अधिसूचना से लिए गए हैं, किसी विशेष आंकड़े या समय-सीमा की गारंटी नहीं हैं — कोई भी आर्थिक निर्णय लेने से पहले ऊपर दी गई आधिकारिक अधिसूचना से वर्तमान आंकड़ों की पुष्टि ज़रूर करें।"
    }
  },
  {
    "slug": "rrb-alp",
    "examName": "RRB ALP",
    "officialUrl": "https://rrb.indianrailways.gov.in/",
    "en": {
      "pageTitle": "RRB ALP Job Profile & Salary",
      "lede": "RRB ALP recruits Assistant Loco Pilots. CEN 01/2026 notifies this single post, so “what does ALP pay” has one answer on paper: the 7th CPC pay level and initial pay below. The notification does not describe the post’s day-to-day duties, so this page does not either.",
      "profileHeading": "One post, with strict medical standards",
      "profileBody": [
        "The post is Assistant Loco Pilot, Pay Level 2, medical standard A-1. The notification says the ALP post has stringent medical standards, covering vision as well as physical and other standards, and that candidates found medically unsuitable are not given any alternative appointment. Candidates who have had Lasik or other surgery to correct a refractive error are not eligible, and the notification marks the post as not suitable for persons with benchmark disabilities.",
        "The qualification is Matriculation/SSLC plus an ITI or Course Completed Act Apprenticeship in a listed trade (Fitter, Electrician, Instrument Mechanic, Millwright/Maintenance Mechanic, Mechanic Radio and TV, Electronics Mechanic, Mechanic Motor Vehicle, Wireman, Tractor Mechanic, Armature and Coil Winder, Mechanic Diesel, Heat Engine, Turner, Machinist, or Refrigeration and Air-Conditioning Mechanic), or Matriculation/SSLC plus a three-year Diploma in Mechanical, Electrical, Electronics or Automobile Engineering in lieu of ITI. A Degree in these disciplines is also accepted in lieu of the Diploma.",
        "Selected candidates undergo training wherever it is prescribed, and the notification says only a stipend is paid during training. Those finally appointed are liable for active service in the Railway Engineers’ Unit of the Territorial Army. A railway servant is ordinarily employed throughout service on the zonal railway or production unit of first appointment, and the notification says no transfer request is registered until the new appointee has completed at least 5 to 10 years of service."
      ],
      "promotionHeading": "Promotion",
      "promotionBody": [],
      "salaryHeading": "Pay: Level 2, initial pay as printed in the notification",
      "salaryBody": [
        "The notification gives Pay Level 2 of the 7th CPC pay matrix and an initial pay of ₹19,900 for Assistant Loco Pilot.",
        "The notification gives no in-hand salary, allowance or benefit figures, so this page does not estimate any."
      ],
      "perksHeading": "Perks and benefits",
      "perks": [],
      "note": "Pay, qualification and medical standards are set by the official notification and any corrigendum to it. Confirm them against",
      "noteLinkLabel": "the official RRB website",
      "recruitsHeading": "What ALP recruits for",
      "recruitsBody": "CEN 01/2026 recruits Assistant Loco Pilots. The notification lists vacancies RRB-wise and zone-wise, and says they may increase or decrease with the needs of the Railway Administration.",
      "offerHeading": "What Pariksha Saathi offers for RRB ALP",
      "offerBody": "Free topic-wise lessons and practice for the subjects above, sectional tests by subject, full-length mock tests, a Mistake Notebook that tracks your weak topics automatically, and dated current-affairs capsules.",
      "sourceHeading": "Official source & latest updates",
      "officialLinkLabel": "RRB — official website",
      "examNoticesLinkLabel": "Latest admit card, result and deadline alerts on Pariksha Saathi",
      "syllabusLinkLabel": "RRB ALP syllabus & exam pattern",
      "ctaLabel": "Start studying RRB ALP free",
      "backLabel": "Home",
      "disclaimer": "Pariksha Saathi is an independent project and is not affiliated with the Railway Recruitment Boards or any government body. The pay and post details above are copied from the notification named on this page, not a guarantee of any specific figure or timeline — always confirm current numbers against the official notification linked above before making a financial decision."
    },
    "hi": {
      "pageTitle": "RRB ALP जॉब प्रोफाइल और सैलरी",
      "lede": "RRB ALP असिस्टेंट लोको पायलट की भर्ती करता है। CEN 01/2026 में यही एक पद अधिसूचित है, इसलिए “ALP कितना देता है” का कागज़ पर एक ही उत्तर है: नीचे दिया गया 7वें वेतन आयोग का पे लेवल और प्रारंभिक वेतन। अधिसूचना में पद के रोज़मर्रा के काम का वर्णन नहीं है, इसलिए यह पेज भी नहीं देता।",
      "profileHeading": "एक पद, कड़े चिकित्सा मानकों के साथ",
      "profileBody": [
        "पद असिस्टेंट लोको पायलट है: पे लेवल 2, चिकित्सा मानक A-1। अधिसूचना के अनुसार ALP पद के चिकित्सा मानक कठोर हैं, जिनमें दृष्टि के साथ शारीरिक और अन्य मानक भी शामिल हैं, और चिकित्सा रूप से अयोग्य पाए गए अभ्यर्थियों को कोई वैकल्पिक नियुक्ति नहीं दी जाती। जिन अभ्यर्थियों ने अपवर्तन दोष ठीक करने के लिए लेसिक या अन्य शल्य-क्रिया करवाई है, वे पात्र नहीं हैं, और अधिसूचना इस पद को बेंचमार्क दिव्यांगता वाले व्यक्तियों के लिए उपयुक्त नहीं बताती।",
        "योग्यता है: मैट्रिकुलेशन/SSLC के साथ किसी सूचीबद्ध ट्रेड (फिटर, इलेक्ट्रीशियन, इंस्ट्रूमेंट मैकेनिक, मिलराइट/मेंटेनेंस मैकेनिक, मैकेनिक रेडियो एंड टीवी, इलेक्ट्रॉनिक्स मैकेनिक, मैकेनिक मोटर व्हीकल, वायरमैन, ट्रैक्टर मैकेनिक, आर्मेचर एंड कॉइल वाइंडर, मैकेनिक डीज़ल, हीट इंजन, टर्नर, मशीनिस्ट, या रेफ्रिजरेशन एंड एयर-कंडीशनिंग मैकेनिक) में ITI या कोर्स कम्प्लीटेड एक्ट अप्रेंटिसशिप, या ITI के स्थान पर मैट्रिकुलेशन/SSLC के साथ मैकेनिकल, इलेक्ट्रिकल, इलेक्ट्रॉनिक्स या ऑटोमोबाइल इंजीनियरिंग में तीन वर्ष का डिप्लोमा। डिप्लोमा के स्थान पर इन विषयों की डिग्री भी मान्य है।",
        "चयनित अभ्यर्थियों को जहां प्रशिक्षण निर्धारित है वहां प्रशिक्षण से गुज़रना होता है, और अधिसूचना के अनुसार प्रशिक्षण के दौरान केवल वृत्ति (स्टाइपेंड) मिलती है। अंततः नियुक्त अभ्यर्थी प्रादेशिक सेना की रेलवे इंजीनियर यूनिट में सक्रिय सेवा के लिए उत्तरदायी हैं। रेलवे कर्मचारी को सामान्यतः पूरी सेवा के दौरान उसी जोनल रेलवे या उत्पादन इकाई में नियोजित रखा जाता है जहां उसकी पहली नियुक्ति हुई, और अधिसूचना के अनुसार नए नियुक्त कर्मचारी के कम से कम 5 से 10 साल की सेवा पूरी करने तक तबादले का कोई अनुरोध दर्ज नहीं किया जाता।"
      ],
      "promotionHeading": "प्रोमोशन",
      "promotionBody": [],
      "salaryHeading": "वेतन: लेवल 2, प्रारंभिक वेतन जैसा अधिसूचना में छपा है",
      "salaryBody": [
        "अधिसूचना में असिस्टेंट लोको पायलट के लिए 7वें वेतन आयोग के मैट्रिक्स का पे लेवल 2 और ₹19,900 प्रारंभिक वेतन दिया गया है।",
        "अधिसूचना में इन-हैंड सैलरी, भत्तों या लाभों के आंकड़े नहीं दिए गए हैं, इसलिए यह पेज कोई अनुमान नहीं देता।"
      ],
      "perksHeading": "भत्ते और लाभ",
      "perks": [],
      "note": "वेतन, योग्यता और चिकित्सा मानक आधिकारिक अधिसूचना और उसके किसी भी शुद्धिपत्र से तय होते हैं। इनकी पुष्टि करें",
      "noteLinkLabel": "आधिकारिक RRB वेबसाइट से",
      "recruitsHeading": "ALP किसके लिए भर्ती करता है",
      "recruitsBody": "CEN 01/2026 असिस्टेंट लोको पायलट की भर्ती करता है। अधिसूचना में रिक्तियां RRB-वार और ज़ोन-वार दी गई हैं, और कहा गया है कि रेलवे प्रशासन की ज़रूरत के अनुसार ये घट-बढ़ सकती हैं।",
      "offerHeading": "Pariksha Saathi RRB ALP के लिए क्या देता है",
      "offerBody": "ऊपर दिए विषयों के लिए मुफ्त विषयवार पाठ और अभ्यास, विषयवार सेक्शनल टेस्ट, पूर्ण-लंबाई मॉक टेस्ट, आपके कमज़ोर विषयों को अपने-आप ट्रैक करने वाली Mistake Notebook, और तारीख़वार करंट अफेयर्स कैप्सूल।",
      "sourceHeading": "आधिकारिक स्रोत और नवीनतम अपडेट",
      "officialLinkLabel": "RRB — आधिकारिक वेबसाइट",
      "examNoticesLinkLabel": "Pariksha Saathi पर नवीनतम एडमिट कार्ड, परिणाम और डेडलाइन अलर्ट",
      "syllabusLinkLabel": "RRB ALP सिलेबस और परीक्षा पैटर्न",
      "ctaLabel": "RRB ALP की मुफ्त पढ़ाई शुरू करें",
      "backLabel": "होम",
      "disclaimer": "Pariksha Saathi एक स्वतंत्र परियोजना है और रेलवे भर्ती बोर्ड या किसी भी सरकारी निकाय से संबद्ध नहीं है। ऊपर दिए गए वेतन और पद संबंधी विवरण इस पेज पर बताई गई अधिसूचना से लिए गए हैं, किसी विशेष आंकड़े या समय-सीमा की गारंटी नहीं हैं — कोई भी आर्थिक निर्णय लेने से पहले ऊपर दी गई आधिकारिक अधिसूचना से वर्तमान आंकड़ों की पुष्टि ज़रूर करें।"
    }
  },
  {
    "slug": "up-police",
    "examName": "UP Police Constable",
    "officialUrl": "https://uppbpb.gov.in/",
    "en": {
      "pageTitle": "UP Police Constable Job Profile & Salary",
      "lede": "One UP Police recruitment fills several constable posts and the jail warder post through a single written test. Here is what the Board’s 2025 recruitment notification says about the posts and their pay, with a link to the official source.",
      "profileHeading": "One recruitment, several posts",
      "profileBody": [
        "Candidates mark an order of preference among the posts when they apply, and posts are allotted by merit and that preference. Before final selection, the notification requires a medical board examination and character verification."
      ],
      "postsHeading": "The posts advertised",
      "posts": [
        {
          "name": "Constable, Civil Police",
          "body": "The civil police constable post, open to both men and women."
        },
        {
          "name": "Constable, PAC / Armed Police",
          "body": "Constables of the Provincial Armed Constabulary and armed police; only male candidates are eligible."
        },
        {
          "name": "Constable, Special Security Force",
          "body": "Constables for the Uttar Pradesh Special Security Force; only male candidates are eligible."
        },
        {
          "name": "Women Constable, Women Battalion",
          "body": "Women constables for the women battalions at Lucknow, Badaun and Gorakhpur; only female candidates are eligible."
        },
        {
          "name": "Constable, Mounted Police",
          "body": "Constables of the mounted police; only male candidates are eligible."
        },
        {
          "name": "Jail Warder (men and women)",
          "body": "Jail warder posts in the cadre of the Prison Administration and Reforms Department, with separate vacancies for men and for women."
        }
      ],
      "promotionHeading": "Promotion",
      "promotionBody": [],
      "salaryHeading": "Pay: Level 3 of the pay matrix",
      "salaryBody": [
        "The notification prints the pay as Pay Band 5200–20200 with Grade Pay 2000 in the old scale, and ₹21,700 to ₹69,100 at Pay Level 3 in the new pay matrix.",
        "The notification does not state an in-hand salary or list allowances, so this page does not estimate one. Your actual pay depends on the allowances and deductions in force at the time of your appointment."
      ],
      "perksHeading": "Perks and benefits",
      "perks": [],
      "note": "The pay figures above are copied from the Board’s 2025 recruitment notification. The official notification is the authority, so confirm current numbers against",
      "noteLinkLabel": "the Board’s own site",
      "recruitsHeading": "What this recruitment is for",
      "recruitsBody": "Constable posts in the Civil Police, PAC / Armed Police, Special Security Force, Women Battalions and Mounted Police, and Jail Warder posts, advertised together, with the exact vacancy breakdown published in each cycle’s notice.",
      "offerHeading": "What Pariksha Saathi offers for UP Police Constable",
      "offerBody": "Free topic-wise lessons and practice for the subjects above, sectional tests by subject, full-length mock tests, a Mistake Notebook that tracks your weak topics automatically, and dated current-affairs capsules.",
      "sourceHeading": "Official source & latest updates",
      "officialLinkLabel": "UP Police Recruitment and Promotion Board — official site",
      "examNoticesLinkLabel": "Latest admit card, result and deadline alerts on Pariksha Saathi",
      "syllabusLinkLabel": "UP Police Constable syllabus & exam pattern",
      "ctaLabel": "Start studying UP Police Constable free",
      "backLabel": "Home",
      "disclaimer": "Pariksha Saathi is an independent project and is not affiliated with the UP Police Recruitment and Promotion Board or any government body. The pay details above are copied from the Board’s 2025 recruitment notification and are not a guarantee of any particular figure — always confirm current numbers against the official notification linked above before making a financial decision."
    },
    "hi": {
      "pageTitle": "यूपी पुलिस कांस्टेबल जॉब प्रोफाइल और सैलरी",
      "lede": "यूपी पुलिस की एक ही भर्ती एक साझा लिखित परीक्षा के ज़रिए कई आरक्षी पदों और जेल वार्डर के पद को भरती है। यहां बोर्ड की 2025 भर्ती अधिसूचना के अनुसार इन पदों और उनके वेतन की जानकारी दी गई है, साथ ही आधिकारिक स्रोत का लिंक भी।",
      "profileHeading": "एक भर्ती, कई पद",
      "profileBody": [
        "आवेदन करते समय अभ्यर्थी पदों के लिए अपनी वरीयता क्रम में देते हैं, और पद मेरिट तथा इसी वरीयता के आधार पर आवंटित होते हैं। अंतिम चयन से पहले अधिसूचना के अनुसार चिकित्सा बोर्ड की जांच और चरित्र सत्यापन आवश्यक है।"
      ],
      "postsHeading": "विज्ञापित पद",
      "posts": [
        {
          "name": "आरक्षी, नागरिक पुलिस",
          "body": "नागरिक पुलिस का आरक्षी पद, जो पुरुष और महिला दोनों के लिए खुला है।"
        },
        {
          "name": "आरक्षी, पी.ए.सी. / सशस्त्र पुलिस",
          "body": "प्रादेशिक आर्म्ड कान्स्टेबुलरी और सशस्त्र पुलिस के आरक्षी; केवल पुरुष अभ्यर्थी पात्र हैं।"
        },
        {
          "name": "आरक्षी, विशेष सुरक्षा बल",
          "body": "उत्तर प्रदेश विशेष सुरक्षा बल के आरक्षी; केवल पुरुष अभ्यर्थी पात्र हैं।"
        },
        {
          "name": "महिला आरक्षी, महिला बटालियन",
          "body": "लखनऊ, बदायूं और गोरखपुर की महिला बटालियनों के लिए महिला आरक्षी; केवल महिला अभ्यर्थी पात्र हैं।"
        },
        {
          "name": "आरक्षी, घुड़सवार पुलिस",
          "body": "घुड़सवार पुलिस के आरक्षी; केवल पुरुष अभ्यर्थी पात्र हैं।"
        },
        {
          "name": "जेल वार्डर (पुरुष और महिला)",
          "body": "कारागार प्रशासन एवं सुधार विभाग के जेल वार्डर संवर्ग के पद, जिनमें पुरुषों और महिलाओं के लिए अलग-अलग रिक्तियां हैं।"
        }
      ],
      "promotionHeading": "पदोन्नति",
      "promotionBody": [],
      "salaryHeading": "वेतन: पे मैट्रिक्स का लेवल 3",
      "salaryBody": [
        "अधिसूचना में वेतन पुराने वेतनमान में पे-बैंड 5200–20200 और ग्रेड पे 2000 तथा नए वेतन मैट्रिक्स में पे लेवल 3 पर ₹21,700 से ₹69,100 छापा गया है।",
        "अधिसूचना में हाथ में आने वाला वेतन या भत्तों की सूची नहीं दी गई है, इसलिए यह पेज कोई अनुमान नहीं देता। आपका वास्तविक वेतन नियुक्ति के समय लागू भत्तों और कटौतियों पर निर्भर करेगा।"
      ],
      "perksHeading": "सुविधाएं और लाभ",
      "perks": [],
      "note": "ऊपर दिए गए वेतन के आंकड़े बोर्ड की 2025 भर्ती अधिसूचना से लिए गए हैं। आधिकारिक अधिसूचना ही प्रमाण है, इसलिए वर्तमान आंकड़े यहां देखें:",
      "noteLinkLabel": "बोर्ड की आधिकारिक वेबसाइट",
      "recruitsHeading": "यह भर्ती किसके लिए है",
      "recruitsBody": "सिविल पुलिस, पी.ए.सी. / सशस्त्र पुलिस, विशेष सुरक्षा बल, महिला बटालियन और घुड़सवार पुलिस में आरक्षी के पद, तथा जेल वार्डर के पद, जो एक साथ विज्ञापित होते हैं; पदवार रिक्तियों का सटीक ब्योरा हर चक्र की अपनी सूचना में प्रकाशित होता है।",
      "offerHeading": "Pariksha Saathi यूपी पुलिस कांस्टेबल के लिए क्या देता है",
      "offerBody": "ऊपर दिए विषयों के लिए मुफ्त विषयवार पाठ और अभ्यास, विषयवार सेक्शनल टेस्ट, पूर्ण-लंबाई मॉक टेस्ट, आपके कमज़ोर विषयों को अपने-आप ट्रैक करने वाली Mistake Notebook, और तारीख़वार करंट अफेयर्स कैप्सूल।",
      "sourceHeading": "आधिकारिक स्रोत और नवीनतम अपडेट",
      "officialLinkLabel": "उत्तर प्रदेश पुलिस भर्ती एवं प्रोन्नति बोर्ड — आधिकारिक वेबसाइट",
      "examNoticesLinkLabel": "Pariksha Saathi पर नवीनतम एडमिट कार्ड, परिणाम और डेडलाइन अलर्ट",
      "syllabusLinkLabel": "यूपी पुलिस कांस्टेबल सिलेबस और परीक्षा पैटर्न",
      "ctaLabel": "यूपी पुलिस कांस्टेबल की मुफ्त पढ़ाई शुरू करें",
      "backLabel": "होम",
      "disclaimer": "Pariksha Saathi एक स्वतंत्र परियोजना है और उत्तर प्रदेश पुलिस भर्ती एवं प्रोन्नति बोर्ड या किसी भी सरकारी निकाय से संबद्ध नहीं है। ऊपर दिए गए वेतन विवरण बोर्ड की 2025 भर्ती अधिसूचना से लिए गए हैं और किसी विशेष आंकड़े की गारंटी नहीं हैं — कोई भी वित्तीय निर्णय लेने से पहले हमेशा ऊपर दी गई आधिकारिक अधिसूचना से वर्तमान आंकड़ों की पुष्टि करें।"
    }
  },
  {
    "slug": "bihar-police",
    "examName": "Bihar Police Constable",
    "officialUrl": "https://csbc.bihar.gov.in/Default.htm",
    "en": {
      "pageTitle": "Bihar Police Constable Job Profile & Salary",
      "lede": "Bihar Police Constable (Sipahi) recruitment fills a single post, in two services: the district police and the battalions of the Bihar Special Armed Police. Here is what the Central Selection Board of Constable’s 2025 notification says about it, with a link to the official source.",
      "profileHeading": "One post, two services",
      "profileBody": [
        "When applying, candidates mark their preference between the Bihar Police district forces and the Bihar Special Armed Police battalions. Selected candidates are allotted a service and unit by merit and that preference.",
        "Before appointment, every selected candidate goes through a medical examination (the notification names eyesight, colour blindness, hearing and stammering among the checks) and character verification, and is appointed only if found fit. Appointment is made by the district Superintendent of Police or the battalion commandant, or a Superintendent-level officer named by the Director General of Police."
      ],
      "promotionHeading": "Promotion",
      "promotionBody": [],
      "salaryHeading": "Pay: Level 3 of the pay matrix",
      "salaryBody": [
        "The notification prints the pay of the Constable post as Level 3, ₹21,700 – ₹69,100.",
        "The notification does not state an in-hand salary or list allowances, so this page does not estimate one. Your actual pay depends on the allowances and deductions in force at the time of your appointment."
      ],
      "perksHeading": "Perks and benefits",
      "perks": [],
      "note": "The pay figure above is copied from the Board’s 2025 notification. The official notification is the authority, so confirm current numbers against",
      "noteLinkLabel": "the Board’s own site",
      "recruitsHeading": "What this recruitment is for",
      "recruitsBody": "Constable (Sipahi) posts in the Bihar Police district forces and in the Bihar Special Armed Police battalions, with the exact vacancy breakdown published in each cycle’s notification.",
      "offerHeading": "What Pariksha Saathi offers for Bihar Police Constable",
      "offerBody": "Free topic-wise lessons and practice for the subjects above, sectional tests by subject, full-length mock tests, a Mistake Notebook that tracks your weak topics automatically, and dated current-affairs capsules.",
      "sourceHeading": "Official source & latest updates",
      "officialLinkLabel": "Central Selection Board of Constable, Bihar — official site",
      "examNoticesLinkLabel": "Latest admit card, result and deadline alerts on Pariksha Saathi",
      "syllabusLinkLabel": "Bihar Police Constable syllabus & exam pattern",
      "ctaLabel": "Start studying Bihar Police Constable free",
      "backLabel": "Home",
      "disclaimer": "Pariksha Saathi is an independent project and is not affiliated with the Central Selection Board of Constable, Bihar, or any government body. The pay detail above is copied from the Board’s 2025 notification and is not a guarantee of any particular figure — always confirm current numbers against the official notification linked above before making a financial decision."
    },
    "hi": {
      "pageTitle": "बिहार पुलिस सिपाही जॉब प्रोफाइल और सैलरी",
      "lede": "बिहार पुलिस सिपाही भर्ती एक ही पद भरती है, जो दो सेवाओं में है: जिला पुलिस और बिहार विशेष सशस्त्र पुलिस की वाहिनियां। यहां केंद्रीय चयन पर्षद (सिपाही भर्ती) की 2025 की अधिसूचना के अनुसार इस पद की जानकारी दी गई है, साथ ही आधिकारिक स्रोत का लिंक भी।",
      "profileHeading": "एक पद, दो सेवाएं",
      "profileBody": [
        "आवेदन करते समय अभ्यर्थी बिहार पुलिस के जिला बलों और बिहार विशेष सशस्त्र पुलिस की वाहिनियों में से अपनी प्राथमिकता देते हैं। चयनित अभ्यर्थियों को मेधा और इसी प्राथमिकता के आधार पर सेवा और इकाई आवंटित की जाती है।",
        "नियुक्ति से पहले हर चयनित अभ्यर्थी का चिकित्सीय परीक्षण (अधिसूचना में आंख, कलर ब्लाइंडनेस, श्रवण शक्ति और हकलाहट की जांच का उल्लेख है) और चरित्र सत्यापन होता है, और योग्य पाए जाने पर ही नियुक्ति की जाती है। नियुक्ति जिला पुलिस अधीक्षक या वाहिनी समादेष्टा, अथवा पुलिस महानिदेशक द्वारा नामित पुलिस अधीक्षक स्तर के पदाधिकारी करते हैं।"
      ],
      "promotionHeading": "पदोन्नति",
      "promotionBody": [],
      "salaryHeading": "वेतन: पे मैट्रिक्स का लेवल 3",
      "salaryBody": [
        "अधिसूचना में सिपाही पद का वेतन लेवल 3, ₹21,700 – ₹69,100 छापा गया है।",
        "अधिसूचना में हाथ में आने वाला वेतन या भत्तों की सूची नहीं दी गई है, इसलिए यह पेज कोई अनुमान नहीं देता। आपका वास्तविक वेतन नियुक्ति के समय लागू भत्तों और कटौतियों पर निर्भर करेगा।"
      ],
      "perksHeading": "सुविधाएं और लाभ",
      "perks": [],
      "note": "ऊपर दिया गया वेतन का आंकड़ा पर्षद की 2025 की अधिसूचना से लिया गया है। आधिकारिक अधिसूचना ही प्रमाण है, इसलिए वर्तमान आंकड़े यहां देखें:",
      "noteLinkLabel": "पर्षद की आधिकारिक वेबसाइट",
      "recruitsHeading": "यह भर्ती किसके लिए है",
      "recruitsBody": "बिहार पुलिस के जिला बलों और बिहार विशेष सशस्त्र पुलिस की वाहिनियों में सिपाही के पद; पदों का सटीक ब्योरा हर चक्र की अधिसूचना में प्रकाशित होता है।",
      "offerHeading": "Pariksha Saathi बिहार पुलिस सिपाही के लिए क्या देता है",
      "offerBody": "ऊपर दिए विषयों के लिए मुफ्त विषयवार पाठ और अभ्यास, विषयवार सेक्शनल टेस्ट, पूर्ण-लंबाई मॉक टेस्ट, आपके कमज़ोर विषयों को अपने-आप ट्रैक करने वाली Mistake Notebook, और तारीख़वार करंट अफेयर्स कैप्सूल।",
      "sourceHeading": "आधिकारिक स्रोत और नवीनतम अपडेट",
      "officialLinkLabel": "केंद्रीय चयन पर्षद (सिपाही भर्ती), बिहार — आधिकारिक वेबसाइट",
      "examNoticesLinkLabel": "Pariksha Saathi पर नवीनतम एडमिट कार्ड, परिणाम और डेडलाइन अलर्ट",
      "syllabusLinkLabel": "बिहार पुलिस सिपाही सिलेबस और परीक्षा पैटर्न",
      "ctaLabel": "बिहार पुलिस सिपाही की मुफ्त पढ़ाई शुरू करें",
      "backLabel": "होम",
      "disclaimer": "Pariksha Saathi एक स्वतंत्र परियोजना है और केंद्रीय चयन पर्षद (सिपाही भर्ती), बिहार या किसी भी सरकारी निकाय से संबद्ध नहीं है। ऊपर दिया गया वेतन विवरण पर्षद की 2025 की अधिसूचना से लिया गया है और किसी विशेष आंकड़े की गारंटी नहीं है — कोई भी वित्तीय निर्णय लेने से पहले हमेशा ऊपर दी गई आधिकारिक अधिसूचना से वर्तमान आंकड़ों की पुष्टि करें।"
    }
  },
  {
    "slug": "mp-police",
    "examName": "MP Police Constable",
    "officialUrl": "https://esb.mp.gov.in/Rulebooks/rule_books.htm",
    "en": {
      "pageTitle": "MP Police Constable Job Profile & Salary",
      "lede": "MP Police Constable (G.D.) recruitment fills Class III executive posts in Madhya Pradesh Police. Here is what the MP Employees Selection Board’s 2026 rule book says about the post, its postings and its pay, with a link to the official source.",
      "profileHeading": "Constable (G.D.) in Madhya Pradesh Police",
      "profileBody": [
        "The rule book states that all the posts are third-class executive posts. When applying, candidates choose their cadre and unit preferences, and selected candidates are allotted a cadre by preference and merit.",
        "A selected candidate is not posted in the home district, and must serve at least 5 years in the unit before becoming eligible to move to another unit. After appointment, a constable can also be posted to other branches of the police and to other Madhya Pradesh government departments, inside or outside the state — for example the State Economic Offences Wing or the Special Police Establishment (Lokayukta) — without needing his or her consent."
      ],
      "postsHeading": "The two cadres",
      "posts": [
        {
          "name": "Constable (G.D.), Special Armed Force (SAF)",
          "body": "Open to men only; women candidates are not considered for this cadre."
        },
        {
          "name": "Constable (G.D.), other units",
          "body": "Open to men and women. The unit list includes the district police and the Government Railway Police at Indore, Jabalpur and Bhopal."
        }
      ],
      "promotionHeading": "Promotion",
      "promotionBody": [],
      "salaryHeading": "Pay: the scale printed in the rule book",
      "salaryBody": [
        "The rule book prints the pay scale of Constable (G.D.) as ₹19,500 – ₹62,000. For the first three years a stipend is paid: 70% of the minimum of the scale in the first year, 80% in the second year and 90% in the third year.",
        "Other allowances and emoluments sanctioned by the government from time to time are also payable, and the defined-contribution pension system applies to employees appointed on or after 1 January 2005.",
        "The rule book does not state an in-hand salary, so this page does not estimate one. Your actual pay depends on the allowances and deductions in force at the time of your appointment."
      ],
      "perksHeading": "Perks and benefits",
      "perks": [],
      "note": "The pay details above are copied from the Board’s 2026 rule book. The official rule book is the authority, so confirm current numbers against",
      "noteLinkLabel": "the Board’s own rule-book page",
      "recruitsHeading": "What this recruitment is for",
      "recruitsBody": "Constable (G.D.) posts in the Madhya Pradesh Police Special Armed Force and other units, advertised together, with the exact vacancy breakdown published in each cycle’s rule book.",
      "offerHeading": "What Pariksha Saathi offers for MP Police Constable",
      "offerBody": "Free topic-wise lessons and practice for the subjects above, sectional tests by subject, full-length mock tests, a Mistake Notebook that tracks your weak topics automatically, and dated current-affairs capsules.",
      "sourceHeading": "Official source & latest updates",
      "officialLinkLabel": "MP Employees Selection Board — official rule books",
      "examNoticesLinkLabel": "Latest admit card, result and deadline alerts on Pariksha Saathi",
      "syllabusLinkLabel": "MP Police Constable syllabus & exam pattern",
      "ctaLabel": "Start studying MP Police Constable free",
      "backLabel": "Home",
      "disclaimer": "Pariksha Saathi is an independent project and is not affiliated with the MP Employees Selection Board, the Madhya Pradesh Police or any government body. The pay details above are copied from the Board’s 2026 rule book and are not a guarantee of any particular figure — always confirm current numbers against the official rule book linked above before making a financial decision."
    },
    "hi": {
      "pageTitle": "एमपी पुलिस आरक्षक जॉब प्रोफाइल और सैलरी",
      "lede": "एमपी पुलिस आरक्षक (जी.डी.) भर्ती मध्यप्रदेश पुलिस में तृतीय श्रेणी के कार्यपालिक पद भरती है। यहां मध्यप्रदेश कर्मचारी चयन मण्डल की 2026 की नियम पुस्तिका के अनुसार इस पद, पदस्थापना और वेतन की जानकारी दी गई है, साथ ही आधिकारिक स्रोत का लिंक भी।",
      "profileHeading": "मध्यप्रदेश पुलिस में आरक्षक (जी.डी.)",
      "profileBody": [
        "नियम पुस्तिका के अनुसार सभी पद तृतीय एवं कार्यपालिक श्रेणी के हैं। आवेदन करते समय अभ्यर्थी अपने संवर्ग और इकाई की प्राथमिकता देते हैं, और चयनित अभ्यर्थियों को प्राथमिकता और मेरिट के क्रम में संवर्ग आवंटित किया जाता है।",
        "चयनित अभ्यर्थी को गृह जिले में पदस्थ नहीं किया जाता, और किसी इकाई में नियुक्त होने पर दूसरी इकाई में स्थानांतरण के लिए पात्र होने से पहले उसे वहां कम से कम 5 वर्ष की सेवा पूरी करनी होती है। नियुक्ति के बाद आरक्षक को पुलिस विभाग की अन्य शाखाओं और मध्यप्रदेश शासन के अन्य विभागों में राज्य के अंदर या बाहर भी पदस्थ किया जा सकता है — जैसे राज्य आर्थिक अपराध प्रकोष्ठ (EOW) या विशेष पुलिस स्थापना (लोकायुक्त) — और इसके लिए उसकी सहमति की आवश्यकता नहीं है।"
      ],
      "postsHeading": "दो संवर्ग",
      "posts": [
        {
          "name": "आरक्षक (जी.डी.), विशेष सशस्त्र बल (SAF)",
          "body": "केवल पुरुषों के लिए; इस संवर्ग के लिए महिला अभ्यर्थियों पर विचार नहीं किया जाता।"
        },
        {
          "name": "आरक्षक (जी.डी.), अन्य इकाइयां",
          "body": "पुरुष और महिला दोनों के लिए। इकाइयों की सूची में जिला पुलिस और इंदौर, जबलपुर व भोपाल की शासकीय रेल पुलिस शामिल हैं।"
        }
      ],
      "promotionHeading": "पदोन्नति",
      "promotionBody": [],
      "salaryHeading": "वेतन: नियम पुस्तिका में छपा वेतनमान",
      "salaryBody": [
        "नियम पुस्तिका में आरक्षक (जी.डी.) का वेतनमान ₹19,500 – ₹62,000 छापा गया है। पहले तीन वर्ष स्टाइपेंड मिलता है: पहले वर्ष में वेतनमान के न्यूनतम का 70 प्रतिशत, दूसरे वर्ष में 80 प्रतिशत और तीसरे वर्ष में 90 प्रतिशत।",
        "शासन द्वारा समय-समय पर स्वीकृत अन्य भत्ते और परिलब्धियां भी देय होती हैं, और 1 जनवरी 2005 या उसके बाद नियुक्त कर्मचारियों पर परिभाषित अंशदान पेंशन प्रणाली लागू है।",
        "नियम पुस्तिका में हाथ में आने वाला वेतन नहीं दिया गया है, इसलिए यह पेज कोई अनुमान नहीं देता। आपका वास्तविक वेतन नियुक्ति के समय लागू भत्तों और कटौतियों पर निर्भर करेगा।"
      ],
      "perksHeading": "सुविधाएं और लाभ",
      "perks": [],
      "note": "ऊपर दिए गए वेतन विवरण मण्डल की 2026 की नियम पुस्तिका से लिए गए हैं। आधिकारिक नियम पुस्तिका ही प्रमाण है, इसलिए वर्तमान आंकड़े यहां देखें:",
      "noteLinkLabel": "मण्डल का नियम पुस्तिका पेज",
      "recruitsHeading": "यह भर्ती किसके लिए है",
      "recruitsBody": "मध्यप्रदेश पुलिस के विशेष सशस्त्र बल और अन्य इकाइयों में आरक्षक (जी.डी.) के पद, जो एक साथ विज्ञापित होते हैं; पदों का सटीक ब्योरा हर चक्र की नियम पुस्तिका में प्रकाशित होता है।",
      "offerHeading": "Pariksha Saathi एमपी पुलिस आरक्षक के लिए क्या देता है",
      "offerBody": "ऊपर दिए विषयों के लिए मुफ्त विषयवार पाठ और अभ्यास, विषयवार सेक्शनल टेस्ट, पूर्ण-लंबाई मॉक टेस्ट, आपके कमज़ोर विषयों को अपने-आप ट्रैक करने वाली Mistake Notebook, और तारीख़वार करंट अफेयर्स कैप्सूल।",
      "sourceHeading": "आधिकारिक स्रोत और नवीनतम अपडेट",
      "officialLinkLabel": "मध्यप्रदेश कर्मचारी चयन मण्डल — आधिकारिक नियम पुस्तिकाएं",
      "examNoticesLinkLabel": "Pariksha Saathi पर नवीनतम एडमिट कार्ड, परिणाम और डेडलाइन अलर्ट",
      "syllabusLinkLabel": "एमपी पुलिस आरक्षक सिलेबस और परीक्षा पैटर्न",
      "ctaLabel": "एमपी पुलिस आरक्षक की मुफ्त पढ़ाई शुरू करें",
      "backLabel": "होम",
      "disclaimer": "Pariksha Saathi एक स्वतंत्र परियोजना है और मध्यप्रदेश कर्मचारी चयन मण्डल, मध्यप्रदेश पुलिस या किसी भी सरकारी निकाय से संबद्ध नहीं है। ऊपर दिए गए वेतन विवरण मण्डल की 2026 की नियम पुस्तिका से लिए गए हैं और किसी विशेष आंकड़े की गारंटी नहीं हैं — कोई भी वित्तीय निर्णय लेने से पहले हमेशा ऊपर दी गई आधिकारिक नियम पुस्तिका से वर्तमान आंकड़ों की पुष्टि करें।"
    }
  },
  {
    "slug": "rajasthan-police",
    "examName": "Rajasthan Police Constable",
    "officialUrl": "https://police.rajasthan.gov.in/portal/RecruitmentsResults",
    "en": {
      "pageTitle": "Rajasthan Police Constable Job Profile & Salary",
      "lede": "Rajasthan Police’s constable recruitment fills three kinds of constable post in its districts, units and battalions. Here is what the 2025 notification says about the posts and their pay, with a link to the official source.",
      "profileHeading": "Constable posts in Rajasthan Police",
      "profileBody": [
        "Candidates apply to one district or unit and one post. Merit lists are prepared unit-wise and category-wise, and before appointment selected candidates go through a medical examination, verification of their documents and character verification. Appointment is on probation."
      ],
      "postsHeading": "The posts advertised",
      "posts": [
        {
          "name": "Constable (General Duty)",
          "body": "Constable posts in the police, RAC, MBC and Intelligence units and battalions, filled through the written test, physical tests and special-qualification marks."
        },
        {
          "name": "Constable (Driver)",
          "body": "Constable posts for drivers. Applicants need valid licences for both light and heavy motor vehicles (LMV and HMV), issued at least one year before the cut-off date in the notification, and a proficiency test is part of selection."
        },
        {
          "name": "Constable (Band)",
          "body": "Constable posts for the police band. There is no written test for this post; selection is through the physical tests and a proficiency test."
        }
      ],
      "promotionHeading": "Promotion",
      "promotionBody": [],
      "salaryHeading": "Pay: a fixed amount first, then Level 5",
      "salaryBody": [
        "After appointment, a probationary trainee is paid a fixed remuneration of ₹14,600 a month for two years. After that, the notification says the post carries the regular pay of Level 5 of the pay matrix, with other allowances as per the rules.",
        "The notification does not state an in-hand salary or list the allowances, so this page does not estimate one. Your actual pay depends on the allowances and deductions in force at the time of your appointment."
      ],
      "perksHeading": "Perks and benefits",
      "perks": [],
      "note": "The pay figures above are copied from the 2025 constable notification. The official notification is the authority, so confirm current numbers against",
      "noteLinkLabel": "Rajasthan Police’s own recruitment page",
      "recruitsHeading": "What this recruitment is for",
      "recruitsBody": "Constable (General Duty), Constable (Driver) and Constable (Band) posts in Rajasthan Police districts, units and battalions, with the exact vacancy breakdown published in each cycle’s notification. Police Telecom constable posts are advertised separately.",
      "offerHeading": "What Pariksha Saathi offers for Rajasthan Police Constable",
      "offerBody": "Free topic-wise lessons and practice for the subjects above, sectional tests by subject, full-length mock tests, a Mistake Notebook that tracks your weak topics automatically, and dated current-affairs capsules.",
      "sourceHeading": "Official source & latest updates",
      "officialLinkLabel": "Rajasthan Police — recruitments and results",
      "examNoticesLinkLabel": "Latest admit card, result and deadline alerts on Pariksha Saathi",
      "syllabusLinkLabel": "Rajasthan Police Constable syllabus & exam pattern",
      "ctaLabel": "Start studying Rajasthan Police Constable free",
      "backLabel": "Home",
      "disclaimer": "Pariksha Saathi is an independent project and is not affiliated with Rajasthan Police or any government body. The pay details above are copied from the 2025 constable notification and are not a guarantee of any particular figure — always confirm current numbers against the official notification linked above before making a financial decision."
    },
    "hi": {
      "pageTitle": "राजस्थान पुलिस कांस्टेबल जॉब प्रोफाइल और सैलरी",
      "lede": "राजस्थान पुलिस की कांस्टेबल भर्ती अपने जिलों, इकाइयों और बटालियनों में तीन तरह के कॉन्स्टेबल पद भरती है। यहां 2025 की अधिसूचना के अनुसार इन पदों और उनके वेतन की जानकारी दी गई है, साथ ही आधिकारिक स्रोत का लिंक भी।",
      "profileHeading": "राजस्थान पुलिस में कॉन्स्टेबल के पद",
      "profileBody": [
        "अभ्यर्थी एक जिला या यूनिट और एक पद के लिए आवेदन करते हैं। मेरिट सूचियां यूनिटवार और वर्गवार बनती हैं, और नियुक्ति से पहले चयनित अभ्यर्थियों का चिकित्सा परीक्षण, दस्तावेज़ों का सत्यापन और चरित्र सत्यापन होता है। नियुक्ति परिवीक्षा पर होती है।"
      ],
      "postsHeading": "विज्ञापित पद",
      "posts": [
        {
          "name": "कॉन्स्टेबल (सामान्य)",
          "body": "पुलिस, आरएसी, एमबीसी और इन्टैलीजेन्स की इकाइयों और बटालियनों में कॉन्स्टेबल के पद, जो लिखित परीक्षा, शारीरिक परीक्षाओं और विशेष योग्यता के अंकों से भरे जाते हैं।"
        },
        {
          "name": "कॉन्स्टेबल (चालक)",
          "body": "चालकों के लिए कॉन्स्टेबल के पद। आवेदकों के पास हल्के और भारी दोनों मोटर वाहनों (LMV और HMV) के वैध लाईसेंस होने चाहिए, जो अधिसूचना में दी गई तिथि से कम से कम एक वर्ष पूर्व बने हों, और चयन में दक्षता परीक्षा भी शामिल है।"
        },
        {
          "name": "कॉन्स्टेबल (बैण्ड)",
          "body": "पुलिस बैण्ड के लिए कॉन्स्टेबल के पद। इस पद के लिए लिखित परीक्षा नहीं होती; चयन शारीरिक परीक्षाओं और दक्षता परीक्षा के आधार पर होता है।"
        }
      ],
      "promotionHeading": "पदोन्नति",
      "promotionBody": [],
      "salaryHeading": "वेतन: पहले निश्चित राशि, फिर लेवल 5",
      "salaryBody": [
        "नियुक्ति के बाद परिवीक्षाधीन प्रशिक्षणार्थी को दो वर्ष तक ₹14,600 मासिक निश्चित पारिश्रमिक मिलता है। उसके बाद अधिसूचना के अनुसार पद पर पे मैट्रिक्स के लेवल 5 का नियमित वेतन और नियमानुसार अन्य भत्ते देय होते हैं।",
        "अधिसूचना में हाथ में आने वाला वेतन या भत्तों की सूची नहीं दी गई है, इसलिए यह पेज कोई अनुमान नहीं देता। आपका वास्तविक वेतन नियुक्ति के समय लागू भत्तों और कटौतियों पर निर्भर करेगा।"
      ],
      "perksHeading": "सुविधाएं और लाभ",
      "perks": [],
      "note": "ऊपर दिए गए वेतन के आंकड़े 2025 की कांस्टेबल भर्ती अधिसूचना से लिए गए हैं। आधिकारिक अधिसूचना ही प्रमाण है, इसलिए वर्तमान आंकड़े यहां देखें:",
      "noteLinkLabel": "राजस्थान पुलिस का भर्ती पेज",
      "recruitsHeading": "यह भर्ती किसके लिए है",
      "recruitsBody": "राजस्थान पुलिस के जिलों, इकाइयों और बटालियनों में कॉन्स्टेबल (सामान्य), कॉन्स्टेबल (चालक) और कॉन्स्टेबल (बैण्ड) के पद; पदों का सटीक ब्योरा हर चक्र की अधिसूचना में प्रकाशित होता है। पुलिस दूरसंचार के कॉन्स्टेबल पद अलग से विज्ञापित होते हैं।",
      "offerHeading": "Pariksha Saathi राजस्थान पुलिस कांस्टेबल के लिए क्या देता है",
      "offerBody": "ऊपर दिए विषयों के लिए मुफ्त विषयवार पाठ और अभ्यास, विषयवार सेक्शनल टेस्ट, पूर्ण-लंबाई मॉक टेस्ट, आपके कमज़ोर विषयों को अपने-आप ट्रैक करने वाली Mistake Notebook, और तारीख़वार करंट अफेयर्स कैप्सूल।",
      "sourceHeading": "आधिकारिक स्रोत और नवीनतम अपडेट",
      "officialLinkLabel": "राजस्थान पुलिस — भर्तियां और परिणाम",
      "examNoticesLinkLabel": "Pariksha Saathi पर नवीनतम एडमिट कार्ड, परिणाम और डेडलाइन अलर्ट",
      "syllabusLinkLabel": "राजस्थान पुलिस कांस्टेबल सिलेबस और परीक्षा पैटर्न",
      "ctaLabel": "राजस्थान पुलिस कांस्टेबल की मुफ्त पढ़ाई शुरू करें",
      "backLabel": "होम",
      "disclaimer": "Pariksha Saathi एक स्वतंत्र परियोजना है और राजस्थान पुलिस या किसी भी सरकारी निकाय से संबद्ध नहीं है। ऊपर दिए गए वेतन विवरण 2025 की कांस्टेबल भर्ती अधिसूचना से लिए गए हैं और किसी विशेष आंकड़े की गारंटी नहीं हैं — कोई भी वित्तीय निर्णय लेने से पहले हमेशा ऊपर दी गई आधिकारिक अधिसूचना से वर्तमान आंकड़ों की पुष्टि करें।"
    }
  },
  {
    "slug": "bpsc",
    "examName": "BPSC CCE",
    "officialUrl": "https://bpsc.bihar.gov.in/",
    "en": {
      "pageTitle": "BPSC CCE Job Profile & Salary",
      "lede": "The BPSC Combined Competitive Examination fills a wide range of Bihar government posts from one exam. The notice lists each post with its department and pay level, so what the job is and what it pays depends on which post you are allotted.",
      "profileHeading": "Many posts under one exam",
      "profileBody": [
        "Your rank, category and post preferences decide which post you get. The 72nd CCE notice (5 May 2026) names the posts below, in two tables: Table I for the posts filled through the 72nd CCE, and Table II for Child Development Project Officer, Financial Administrative Officer and Anumandal Sanrakshan Padadhikari (Sub-Divisional Protection Officer). The notice gives each post’s department and pay level but does not describe day-to-day duties; those are set by the department concerned."
      ],
      "postsHeading": "Posts named in the 72nd CCE notice",
      "posts": [
        {
          "name": "Pay Level 9 (Table I)",
          "body": "Sub-Divisional Officer / Senior Deputy Collector (Bihar Administrative Service); Deputy Superintendent of Police (Home Department, Armed Branch); Assistant Commissioner, State Tax (Bihar Finance Service, Commercial Taxes Department); Avar Nirvachan Padadhikari (Election Department); Sub-Registrar / Joint Sub-Registrar (Excise, Prohibition and Registration Department); Labour Superintendent (Labour Resources Department); Assistant Registrar, Cooperative Societies (Cooperative Department); District Audit Officer (Cooperative Department); Bihar Education Service, administrative sub-cadre (Education Department); District Minority Welfare Officer (Minority Welfare Department); Probation Officer (Home Department, Prisons); Assistant Planning Officer / Assistant Director (Planning and Development Department)."
        },
        {
          "name": "Pay Level 7 (Table I)",
          "body": "Municipal Executive Officer (Urban Development and Housing Department); Rural Development Officer (Rural Development Department); Revenue Officer and equivalent (Bihar Revenue Service, Revenue and Land Reforms Department); Block Panchayat Raj Officer (Panchayati Raj Department); Cooperative Extension Officer (Cooperative Department); Labour Enforcement Officer (Labour Resources and Migrant Workers Welfare Department); Supply Inspector (Bihar Supply Service, Food and Consumer Protection Department); Block Scheduled Caste and Scheduled Tribe Welfare Officer."
        },
        {
          "name": "Pay Level 6 (Table I)",
          "body": "Block Minority Welfare Officer (Minority Welfare Department)."
        },
        {
          "name": "Pay Level 9 (Table II)",
          "body": "Child Development Project Officer (Social Welfare Department); Financial Administrative Officer and equivalent (Bihar Financial Administrative Service, Finance Department); Anumandal Sanrakshan Padadhikari (Social Welfare Department, women only)."
        }
      ],
      "promotionHeading": "Promotion",
      "promotionBody": [],
      "salaryHeading": "Pay: the levels printed in the notice",
      "salaryBody": [
        "The notice prints a pay level against each post: Level 9 for the posts listed above as Level 9, Level 7 for the Level 7 group and Level 6 for Block Minority Welfare Officer.",
        "It gives pay levels only, not rupee amounts, allowances or take-home pay, so none are quoted here. Check the notice and the Bihar government pay matrix for current figures."
      ],
      "perksHeading": "Perks and benefits",
      "perks": [],
      "note": "Post-wise vacancies, pay levels and eligibility are published fresh in every notice and can be corrected by later corrigenda. The official notification is the authority; confirm current details against",
      "noteLinkLabel": "BPSC’s own website",
      "recruitsHeading": "What the CCE recruits for",
      "recruitsBody": "The CCE fills the Bihar government posts listed above through one Preliminary test, a Main examination and an interview. The vacancy table for each post, with its reservation split, is in the notice.",
      "offerHeading": "What Pariksha Saathi offers for BPSC",
      "offerBody": "Free topic-wise lessons and practice for the General Studies side of the Preliminary examination: history, polity, geography, economy, environment, general science, art and culture, plus Bihar General Knowledge.",
      "sourceHeading": "Official source & latest updates",
      "officialLinkLabel": "BPSC — official website",
      "examNoticesLinkLabel": "Latest admit card, result and deadline alerts on Pariksha Saathi",
      "syllabusLinkLabel": "BPSC CCE syllabus & exam pattern",
      "ctaLabel": "Start studying for BPSC free",
      "backLabel": "Home",
      "disclaimer": "Pariksha Saathi is an independent project and is not affiliated with BPSC or any government body. The pay levels above are as printed in the notice, not a guarantee of any specific figure or timeline — always confirm against the official notification linked above before making a financial decision."
    },
    "hi": {
      "pageTitle": "BPSC CCE जॉब प्रोफाइल और सैलरी",
      "lede": "BPSC की संयुक्त प्रतियोगिता परीक्षा एक ही परीक्षा से बिहार सरकार के कई तरह के पद भरती है। अधिसूचना में हर पद के साथ उसका विभाग और पे लेवल दिया गया है, इसलिए नौकरी का स्वरूप और वेतन इस पर निर्भर करता है कि आपको कौन-सा पद मिला।",
      "profileHeading": "एक परीक्षा, कई पद",
      "profileBody": [
        "आपकी रैंक, श्रेणी और पद की प्राथमिकताएँ तय करती हैं कि आपको कौन-सा पद मिलेगा। 72वीं CCE की अधिसूचना (5 मई 2026) में नीचे दिए पद दो सारणियों में हैं: सारणी-I में 72वीं CCE से भरे जाने वाले पद और सारणी-II में बाल विकास परियोजना पदाधिकारी, वित्तीय प्रशासनिक पदाधिकारी और अनुमंडल संरक्षण पदाधिकारी। अधिसूचना में हर पद का विभाग और पे लेवल है, पर रोज़मर्रा के कामकाज का वर्णन नहीं है; वह संबंधित विभाग तय करता है।"
      ],
      "postsHeading": "72वीं CCE की अधिसूचना में दिए पद",
      "posts": [
        {
          "name": "पे लेवल 9 (सारणी-I)",
          "body": "अनुमंडल पदाधिकारी / वरीय उप समाहर्त्ता (बिहार प्रशासनिक सेवा); पुलिस उपाधीक्षक (गृह विभाग, आरक्षी शाखा); राज्य-कर सहायक आयुक्त (बिहार वित्त सेवा, वाणिज्य-कर विभाग); अवर निर्वाचन पदाधिकारी (निर्वाचन विभाग); अवर निबंधक / संयुक्त अवर निबंधक (मद्य निषेध, उत्पाद एवं निबंधन विभाग); श्रम अधीक्षक (श्रम संसाधन विभाग); सहायक निबंधक, सहयोग समितियाँ (सहकारिता विभाग); जिला अंकेक्षण पदाधिकारी (सहकारिता विभाग); बिहार शिक्षा सेवा, प्रशासनिक उप संवर्ग (शिक्षा विभाग); जिला अल्पसंख्यक कल्याण पदाधिकारी (अल्पसंख्यक कल्याण विभाग); प्रोबेशन पदाधिकारी (गृह विभाग, कारा); सहायक योजना पदाधिकारी / सहायक निदेशक (योजना एवं विकास विभाग)।"
        },
        {
          "name": "पे लेवल 7 (सारणी-I)",
          "body": "नगर कार्यपालक पदाधिकारी (नगर विकास एवं आवास विभाग); ग्रामीण विकास पदाधिकारी (ग्रामीण विकास विभाग); राजस्व अधिकारी एवं समकक्ष (बिहार राजस्व सेवा, राजस्व एवं भूमि सुधार विभाग); प्रखंड पंचायत राज पदाधिकारी (पंचायती राज विभाग); सहकारिता प्रसार पदाधिकारी (सहकारिता विभाग); श्रम प्रवर्तन पदाधिकारी (श्रम संसाधन एवं प्रवासी श्रमिक कल्याण विभाग); आपूर्ति निरीक्षक (बिहार आपूर्ति सेवा, खाद्य एवं उपभोक्ता संरक्षण विभाग); प्रखंड अनुसूचित जाति एवं अनुसूचित जनजाति कल्याण पदाधिकारी।"
        },
        {
          "name": "पे लेवल 6 (सारणी-I)",
          "body": "प्रखंड अल्पसंख्यक कल्याण पदाधिकारी (अल्पसंख्यक कल्याण विभाग)।"
        },
        {
          "name": "पे लेवल 9 (सारणी-II)",
          "body": "बाल विकास परियोजना पदाधिकारी (समाज कल्याण विभाग); वित्तीय प्रशासनिक पदाधिकारी एवं समकक्ष (बिहार वित्तीय प्रशासनिक सेवा, वित्त विभाग); अनुमंडल संरक्षण पदाधिकारी (समाज कल्याण विभाग, केवल महिलाओं के लिए)।"
        }
      ],
      "promotionHeading": "प्रोमोशन",
      "promotionBody": [],
      "salaryHeading": "सैलरी: अधिसूचना में छपे पे लेवल",
      "salaryBody": [
        "अधिसूचना में हर पद के सामने पे लेवल छपा है: ऊपर पे लेवल 9 वाले पदों के लिए लेवल 9, लेवल 7 वाले समूह के लिए लेवल 7 और प्रखंड अल्पसंख्यक कल्याण पदाधिकारी के लिए लेवल 6।",
        "इसमें केवल पे लेवल दिए गए हैं, रुपयों की राशि, भत्ते या इन-हैंड वेतन नहीं, इसलिए यहाँ कोई आंकड़ा नहीं दिया गया है। वर्तमान आंकड़ों के लिए अधिसूचना और बिहार सरकार का पे मैट्रिक्स देखें।"
      ],
      "perksHeading": "भत्ते और लाभ",
      "perks": [],
      "note": "पदवार रिक्तियाँ, पे लेवल और पात्रता हर अधिसूचना में नए सिरे से प्रकाशित होती हैं और बाद के शुद्धिपत्रों से बदल सकती हैं। आधिकारिक अधिसूचना ही प्रमाण है; वर्तमान विवरण की पुष्टि करें",
      "noteLinkLabel": "BPSC की अपनी वेबसाइट से",
      "recruitsHeading": "CCE किन पदों के लिए भर्ती करती है",
      "recruitsBody": "CCE ऊपर दिए बिहार सरकार के पदों को एक प्रारंभिक परीक्षा, मुख्य परीक्षा और साक्षात्कार के ज़रिए भरती है। हर पद की रिक्ति तालिका, आरक्षण के बँटवारे सहित, अधिसूचना में है।",
      "offerHeading": "Pariksha Saathi BPSC के लिए क्या देता है",
      "offerBody": "प्रारंभिक परीक्षा के सामान्य अध्ययन वाले हिस्से के लिए मुफ्त विषयवार पाठ और अभ्यास: इतिहास, राज्य व्यवस्था, भूगोल, अर्थव्यवस्था, पर्यावरण, सामान्य विज्ञान, कला एवं संस्कृति, साथ ही बिहार सामान्य ज्ञान।",
      "sourceHeading": "आधिकारिक स्रोत और नवीनतम अपडेट",
      "officialLinkLabel": "BPSC — आधिकारिक वेबसाइट",
      "examNoticesLinkLabel": "Pariksha Saathi पर नवीनतम एडमिट कार्ड, परिणाम और डेडलाइन अलर्ट",
      "syllabusLinkLabel": "BPSC CCE सिलेबस और परीक्षा पैटर्न",
      "ctaLabel": "BPSC की मुफ्त पढ़ाई शुरू करें",
      "backLabel": "होम",
      "disclaimer": "Pariksha Saathi एक स्वतंत्र परियोजना है और BPSC या किसी भी सरकारी निकाय से संबद्ध नहीं है। ऊपर दिए पे लेवल अधिसूचना में छपे अनुसार हैं, किसी विशेष आंकड़े या समय-सीमा की गारंटी नहीं — कोई भी वित्तीय निर्णय लेने से पहले हमेशा ऊपर दी गई आधिकारिक अधिसूचना से पुष्टि करें।"
    }
  },
  {
    "slug": "mppsc",
    "examName": "MPPSC State Service",
    "officialUrl": "https://mppsc.mp.gov.in/",
    "en": {
      "pageTitle": "MPPSC State Service Job Profile & Salary",
      "lede": "The MPPSC State Service Examination fills Madhya Pradesh government posts in the Class II gazetted and Class III executive grades from one exam. The notice lists each post with its department and pay scale, so what the job is and what it pays depends on which post you are allotted.",
      "profileHeading": "Many posts under one exam",
      "profileBody": [
        "Your rank, category and post preferences decide which post you get. The 2026 notice (Advt. No. 29/2025) names the posts below. It gives each post’s department and pay scale but does not describe day-to-day duties; those are set by the department concerned."
      ],
      "postsHeading": "Posts named in the 2026 notice, grouped by the pay scale it prints",
      "posts": [
        {
          "name": "Class II gazetted: ₹15,600–39,100 + grade pay ₹5,400",
          "body": "Deputy Collector (State Administrative Service); Deputy Superintendent of Police (Home Department); Commercial Tax Officer (Commercial Tax Department); Chief Municipal Officer, Class B (Urban Development and Housing Department); Assistant Director (Public Relations Department); District Convener / Assistant Project Administrator / Assistant Director, Administration (Tribal Affairs Department); Assistant Director, Food / District Civil Supplies Officer (Food, Civil Supplies and Consumer Protection Department); District Women and Child Development Officer / Assistant Director (Women and Child Development Department)."
        },
        {
          "name": "Class II gazetted: ₹56,100–1,77,500",
          "body": "Assistant Commissioner, Cooperative and Assistant Registrar, Cooperative Societies (Cooperative Department)."
        },
        {
          "name": "Class II gazetted: ₹9,300–34,800 + grade pay ₹4,200",
          "body": "Additional Assistant Development Commissioner / Chief Executive Officer, Janpad Panchayat (Panchayat and Rural Development Department)."
        },
        {
          "name": "Class II gazetted: ₹9,300–34,800 + grade pay ₹3,600",
          "body": "Block Development Officer (Panchayat and Rural Development Department); Area Convener / Block Development Officer (Tribal Affairs Department); Child Development Project Officer, Junior Class II, and Block Women Empowerment Officer (Women and Child Development Department); Naib Tahsildar (Revenue Department)."
        },
        {
          "name": "Class III executive: ₹9,300–34,800 + grade pay ₹3,600",
          "body": "Excise Sub-Inspector and Sub-Registrar (Commercial Tax Department); Assistant Labour Officer (Labour Department); Chief Municipal Officer, Class C (Urban Development and Housing Department)."
        },
        {
          "name": "Class III executive: ₹36,200–1,14,800 (7th pay)",
          "body": "Cooperative Inspector / Cooperative Extension Officer (Cooperative Department)."
        },
        {
          "name": "Also named",
          "body": "District Registrar."
        }
      ],
      "promotionHeading": "Promotion",
      "promotionBody": [],
      "salaryHeading": "Pay: the scales printed in the notice",
      "salaryBody": [
        "The notice prints a pay scale against each post, grouped above. Most are quoted in the older pay-band form (a pay band plus grade pay); the Assistant Commissioner, Cooperative post and the Cooperative Inspector post show a single revised range.",
        "The notice gives scales only, not allowances or take-home pay, so no in-hand figures are quoted here. Check the notice for current details."
      ],
      "perksHeading": "Perks and benefits",
      "perks": [],
      "note": "Post-wise vacancies, pay scales and eligibility are published fresh in every notice and can be corrected by later corrigenda. The official notification is the authority; confirm current details against",
      "noteLinkLabel": "MPPSC’s own website",
      "recruitsHeading": "What the State Service Examination recruits for",
      "recruitsBody": "The exam fills the Madhya Pradesh government posts listed above through a Preliminary examination, a Main examination and an interview. The vacancy table for each post, with its reservation split, is in the notice.",
      "offerHeading": "What Pariksha Saathi offers for MPPSC",
      "offerBody": "Free topic-wise lessons and practice for the General Studies paper of the Preliminary examination: history, polity, geography, economy, environment, general science, art and culture, plus Madhya Pradesh General Knowledge. They do not cover the General Aptitude Test.",
      "sourceHeading": "Official source & latest updates",
      "officialLinkLabel": "MPPSC — official website",
      "examNoticesLinkLabel": "Latest admit card, result and deadline alerts on Pariksha Saathi",
      "syllabusLinkLabel": "MPPSC State Service syllabus & exam pattern",
      "ctaLabel": "Start studying for MPPSC free",
      "backLabel": "Home",
      "disclaimer": "Pariksha Saathi is an independent project and is not affiliated with MPPSC or any government body. The pay scales above are as printed in the notice, not a guarantee of any specific figure or timeline — always confirm against the official notification linked above before making a financial decision."
    },
    "hi": {
      "pageTitle": "MPPSC राज्य सेवा जॉब प्रोफाइल और सैलरी",
      "lede": "MPPSC की राज्य सेवा परीक्षा एक ही परीक्षा से मध्य प्रदेश सरकार के द्वितीय श्रेणी राजपत्रित और तृतीय श्रेणी कार्यपालिक पद भरती है। अधिसूचना में हर पद के साथ उसका विभाग और वेतनमान दिया गया है, इसलिए नौकरी का स्वरूप और वेतन इस पर निर्भर करता है कि आपको कौन-सा पद मिला।",
      "profileHeading": "एक परीक्षा, कई पद",
      "profileBody": [
        "आपकी रैंक, श्रेणी और पद की प्राथमिकताएँ तय करती हैं कि आपको कौन-सा पद मिलेगा। 2026 की अधिसूचना (विज्ञापन क्रमांक 29/2025) में नीचे दिए पद हैं। उसमें हर पद का विभाग और वेतनमान दिया गया है, पर रोज़मर्रा के कामकाज का वर्णन नहीं है; वह संबंधित विभाग तय करता है।"
      ],
      "postsHeading": "2026 की अधिसूचना में दिए पद, उसमें छपे वेतनमान के अनुसार समूहित",
      "posts": [
        {
          "name": "द्वितीय श्रेणी राजपत्रित: ₹15,600–39,100 + ग्रेड पे ₹5,400",
          "body": "उप जिलाध्यक्ष (डिप्टी कलेक्टर, राज्य प्रशासनिक सेवा); उप पुलिस अधीक्षक (गृह विभाग); वाणिज्यिक कर अधिकारी (वाणिज्यिक कर विभाग); मुख्य नगर पालिका अधिकारी श्रेणी-ख (नगरीय विकास एवं आवास विभाग); सहायक संचालक (जनसंपर्क विभाग); जिला संयोजक / सहायक परियोजना प्रशासक / सहायक संचालक, प्रशासन (जनजातीय कार्य विभाग); सहायक संचालक, खाद्य / जिला सिविल आपूर्ति अधिकारी (खाद्य, नागरिक आपूर्ति एवं उपभोक्ता संरक्षण विभाग); जिला महिला एवं बाल विकास अधिकारी / सहायक संचालक (महिला एवं बाल विकास विभाग)।"
        },
        {
          "name": "द्वितीय श्रेणी राजपत्रित: ₹56,100–1,77,500",
          "body": "सहायक आयुक्त सहकारिता एवं सहायक पंजीयक सहकारी संस्थाएँ (सहकारिता विभाग)।"
        },
        {
          "name": "द्वितीय श्रेणी राजपत्रित: ₹9,300–34,800 + ग्रेड पे ₹4,200",
          "body": "अतिरिक्त सहायक विकास आयुक्त / मुख्य कार्यपालन अधिकारी, जनपद पंचायत (पंचायत एवं ग्रामीण विकास विभाग)।"
        },
        {
          "name": "द्वितीय श्रेणी राजपत्रित: ₹9,300–34,800 + ग्रेड पे ₹3,600",
          "body": "विकास खण्ड अधिकारी (पंचायत एवं ग्रामीण विकास विभाग); क्षेत्र संयोजक / विकास खण्ड अधिकारी (जनजातीय कार्य विभाग); बाल विकास परियोजना अधिकारी (कनिष्ठ द्वितीय श्रेणी) और विकास खण्ड महिला सशक्तिकरण अधिकारी (महिला एवं बाल विकास विभाग); नायब तहसीलदार (राजस्व विभाग)।"
        },
        {
          "name": "तृतीय श्रेणी कार्यपालिक: ₹9,300–34,800 + ग्रेड पे ₹3,600",
          "body": "आबकारी उप निरीक्षक और उप पंजीयक (वाणिज्यिक कर विभाग); सहायक श्रम पदाधिकारी (श्रम विभाग); मुख्य नगर पालिका अधिकारी श्रेणी-ग (नगरीय विकास एवं आवास विभाग)।"
        },
        {
          "name": "तृतीय श्रेणी कार्यपालिक: ₹36,200–1,14,800 (7वाँ वेतनमान)",
          "body": "सहकारी निरीक्षक / सहकारिता विस्तार अधिकारी (सहकारिता विभाग)।"
        },
        {
          "name": "अन्य पद",
          "body": "जिला पंजीयक।"
        }
      ],
      "promotionHeading": "प्रोमोशन",
      "promotionBody": [],
      "salaryHeading": "सैलरी: अधिसूचना में छपे वेतनमान",
      "salaryBody": [
        "अधिसूचना में हर पद के सामने वेतनमान छपा है, जिन्हें ऊपर समूहित किया गया है। अधिकतर पुराने पे-बैंड रूप में हैं (पे-बैंड के साथ ग्रेड पे); सहायक आयुक्त सहकारिता और सहकारी निरीक्षक के पदों में एक संशोधित वेतन-सीमा दी गई है।",
        "अधिसूचना में केवल वेतनमान हैं, भत्ते या इन-हैंड वेतन नहीं, इसलिए यहाँ इन-हैंड आंकड़े नहीं दिए गए हैं। वर्तमान विवरण के लिए अधिसूचना देखें।"
      ],
      "perksHeading": "भत्ते और लाभ",
      "perks": [],
      "note": "पदवार रिक्तियाँ, वेतनमान और पात्रता हर अधिसूचना में नए सिरे से प्रकाशित होती हैं और बाद के शुद्धिपत्रों से बदल सकती हैं। आधिकारिक अधिसूचना ही प्रमाण है; वर्तमान विवरण की पुष्टि करें",
      "noteLinkLabel": "MPPSC की अपनी वेबसाइट से",
      "recruitsHeading": "राज्य सेवा परीक्षा किन पदों के लिए भर्ती करती है",
      "recruitsBody": "यह परीक्षा ऊपर दिए मध्य प्रदेश सरकार के पदों को प्रारंभिक परीक्षा, मुख्य परीक्षा और साक्षात्कार के ज़रिए भरती है। हर पद की रिक्ति तालिका, आरक्षण के बँटवारे सहित, अधिसूचना में है।",
      "offerHeading": "Pariksha Saathi MPPSC के लिए क्या देता है",
      "offerBody": "प्रारंभिक परीक्षा के सामान्य अध्ययन प्रश्नपत्र के लिए मुफ्त विषयवार पाठ और अभ्यास: इतिहास, राज्य व्यवस्था, भूगोल, अर्थव्यवस्था, पर्यावरण, सामान्य विज्ञान, कला एवं संस्कृति, साथ ही मध्य प्रदेश सामान्य ज्ञान। इनमें सामान्य अभिरुचि परीक्षण शामिल नहीं है।",
      "sourceHeading": "आधिकारिक स्रोत और नवीनतम अपडेट",
      "officialLinkLabel": "MPPSC — आधिकारिक वेबसाइट",
      "examNoticesLinkLabel": "Pariksha Saathi पर नवीनतम एडमिट कार्ड, परिणाम और डेडलाइन अलर्ट",
      "syllabusLinkLabel": "MPPSC राज्य सेवा सिलेबस और परीक्षा पैटर्न",
      "ctaLabel": "MPPSC की मुफ्त पढ़ाई शुरू करें",
      "backLabel": "होम",
      "disclaimer": "Pariksha Saathi एक स्वतंत्र परियोजना है और MPPSC या किसी भी सरकारी निकाय से संबद्ध नहीं है। ऊपर दिए वेतनमान अधिसूचना में छपे अनुसार हैं, किसी विशेष आंकड़े या समय-सीमा की गारंटी नहीं — कोई भी वित्तीय निर्णय लेने से पहले हमेशा ऊपर दी गई आधिकारिक अधिसूचना से पुष्टि करें।"
    }
  },
  {
    "slug": "rpsc",
    "examName": "RPSC RAS",
    "officialUrl": "https://rpsc.rajasthan.gov.in/",
    "en": {
      "pageTitle": "RPSC RAS Job Profile & Salary",
      "lede": "The RAS exam fills posts in Rajasthan’s State Services and Subordinate Services from one exam. The notice lists each service with its Pay Matrix level, so what the job is and what it pays depends on which service you are allotted.",
      "profileHeading": "Many services under one exam",
      "profileBody": [
        "Your rank, category and service preferences decide which service you get. The 2026 notice (Advt. No. 02/2026-27) lists the services below with the Pay Matrix level printed against each. It does not describe day-to-day duties; those are set by the department concerned. Several services are listed twice, once for non-scheduled areas and once for scheduled areas."
      ],
      "postsHeading": "Services named in the 2026 notice, by pay level",
      "posts": [
        {
          "name": "State Services, Pay Level 14",
          "body": "Rajasthan Administrative Service; Rajasthan Police Service; Rajasthan Accounts Service; Rajasthan State Insurance Service; Rajasthan Integrated Child Development Service; Rajasthan Rural Development Service; Rajasthan Women Development Service; Rajasthan State Agriculture Marketing Service (Marketing Officer)."
        },
        {
          "name": "State Services, Pay Level 12",
          "body": "Rajasthan Cooperative Service; Planning Service; Prisons Service; Industries Service; Commercial Tax Service; Food and Civil Supplies Service; Tourism Service; Transport Service; Devasthan Service; Labour Welfare Service; Excise (General Branch) Service; Excise (Preventive Force) Service; Minority Affairs Service."
        },
        {
          "name": "Subordinate Services, Pay Level 12",
          "body": "Rajasthan Social Justice and Empowerment Subordinate Service (District Probation and Social Welfare Officer)."
        },
        {
          "name": "Subordinate Services, Pay Level 11",
          "body": "Rajasthan Tehsildar Service; Industries Subordinate Service; Integrated Child Development Subordinate Service; Social Justice and Empowerment Subordinate Service (Probation and Prison Welfare Officer; Social Security Officer); Minority Affairs Subordinate Service (Programme Officer); Rajasthan Subordinate Service, State Agriculture Marketing Department (Junior Marketing Officer)."
        },
        {
          "name": "Subordinate Services, Pay Level 10",
          "body": "Devasthan, Cooperative, Excise, Planning, Commercial Tax, Food and Civil Supplies and Labour Welfare Subordinate Services."
        }
      ],
      "promotionHeading": "Promotion",
      "promotionBody": [],
      "salaryHeading": "Pay: the levels printed in the notice",
      "salaryBody": [
        "The notice prints a Pay Matrix level against each service: Level 14 or Level 12 for State Services, and Level 10, 11 or 12 for Subordinate Services, as grouped above.",
        "It gives levels only, not rupee amounts, allowances or take-home pay, so none are quoted here. Check the notice and the Rajasthan pay matrix for current figures."
      ],
      "perksHeading": "Perks and benefits",
      "perks": [],
      "note": "Service-wise vacancies, pay levels and eligibility are published fresh in every notice and can be corrected by later corrigenda. The official notification is the authority; confirm current details against",
      "noteLinkLabel": "RPSC’s own website",
      "recruitsHeading": "What RAS recruits for",
      "recruitsBody": "RAS fills the Rajasthan State Services and Subordinate Services listed above through a Preliminary examination, a Main examination and an interview. The service-wise vacancy table, with its reservation split, is in the notice.",
      "offerHeading": "What Pariksha Saathi offers for RPSC",
      "offerBody": "Free topic-wise lessons and practice for the General Knowledge and General Science paper: history, polity, geography, economy, environment, general science, art and culture, plus Rajasthan General Knowledge. They do not cover the reasoning, mental ability and numeracy part.",
      "sourceHeading": "Official source & latest updates",
      "officialLinkLabel": "RPSC — official website",
      "examNoticesLinkLabel": "Latest admit card, result and deadline alerts on Pariksha Saathi",
      "syllabusLinkLabel": "RPSC RAS syllabus & exam pattern",
      "ctaLabel": "Start studying for RPSC free",
      "backLabel": "Home",
      "disclaimer": "Pariksha Saathi is an independent project and is not affiliated with RPSC or any government body. The pay levels above are as printed in the notice, not a guarantee of any specific figure or timeline — always confirm against the official notification linked above before making a financial decision."
    },
    "hi": {
      "pageTitle": "RPSC RAS जॉब प्रोफाइल और सैलरी",
      "lede": "RAS परीक्षा एक ही परीक्षा से राजस्थान की राज्य सेवाओं और अधीनस्थ सेवाओं के पद भरती है। अधिसूचना में हर सेवा के साथ उसका पे मैट्रिक्स लेवल दिया गया है, इसलिए नौकरी का स्वरूप और वेतन इस पर निर्भर करता है कि आपको कौन-सी सेवा मिली।",
      "profileHeading": "एक परीक्षा, कई सेवाएँ",
      "profileBody": [
        "आपकी रैंक, श्रेणी और सेवा की प्राथमिकताएँ तय करती हैं कि आपको कौन-सी सेवा मिलेगी। 2026 की अधिसूचना (विज्ञापन संख्या 02/2026-27) में नीचे दी सेवाएँ हैं, हर एक के सामने पे मैट्रिक्स लेवल छपा है। उसमें रोज़मर्रा के कामकाज का वर्णन नहीं है; वह संबंधित विभाग तय करता है। कई सेवाएँ दो बार सूचीबद्ध हैं, एक बार अनुसूचित क्षेत्र से बाहर के लिए और एक बार अनुसूचित क्षेत्र के लिए।"
      ],
      "postsHeading": "2026 की अधिसूचना में दी सेवाएँ, पे लेवल के अनुसार",
      "posts": [
        {
          "name": "राज्य सेवाएँ, पे लेवल 14",
          "body": "राजस्थान प्रशासनिक सेवा; राजस्थान पुलिस सेवा; राजस्थान लेखा सेवा; राजस्थान राज्य बीमा सेवा; राजस्थान समेकित बाल विकास सेवा; राजस्थान ग्रामीण विकास सेवा; राजस्थान महिला विकास सेवा; राजस्थान राज्य कृषि विपणन सेवा (विपणन अधिकारी)।"
        },
        {
          "name": "राज्य सेवाएँ, पे लेवल 12",
          "body": "राजस्थान सहकारी सेवा; नियोजन सेवा; कारागार सेवा; उद्योग सेवा; वाणिज्यिक कर सेवा; खाद्य एवं नागरिक रसद सेवा; पर्यटन सेवा; परिवहन सेवा; देवस्थान सेवा; श्रम कल्याण सेवा; आबकारी (सामान्य शाखा) सेवा; आबकारी (Preventive Force) सेवा; अल्प संख्यक मामलात सेवा।"
        },
        {
          "name": "अधीनस्थ सेवाएँ, पे लेवल 12",
          "body": "राजस्थान सामाजिक न्याय एवं अधिकारिता अधीनस्थ सेवा (जिला परिवीक्षा एवं समाज कल्याण अधिकारी)।"
        },
        {
          "name": "अधीनस्थ सेवाएँ, पे लेवल 11",
          "body": "राजस्थान तहसीलदार सेवा; उद्योग अधीनस्थ सेवा; समेकित बाल विकास अधीनस्थ सेवा; सामाजिक न्याय एवं अधिकारिता अधीनस्थ सेवा (परिवीक्षा एवं कारागृह कल्याण अधिकारी; सामाजिक सुरक्षा अधिकारी); अल्प संख्यक मामलात अधीनस्थ सेवा (Programme Officer); राजस्थान अधीनस्थ सेवा, राज्य कृषि विपणन विभाग (कनिष्ठ विपणन अधिकारी)।"
        },
        {
          "name": "अधीनस्थ सेवाएँ, पे लेवल 10",
          "body": "देवस्थान, सहकारिता, आबकारी, नियोजन, वाणिज्यिक कर, खाद्य एवं नागरिक रसद और श्रम कल्याण अधीनस्थ सेवाएँ।"
        }
      ],
      "promotionHeading": "प्रोमोशन",
      "promotionBody": [],
      "salaryHeading": "सैलरी: अधिसूचना में छपे पे लेवल",
      "salaryBody": [
        "अधिसूचना में हर सेवा के सामने पे मैट्रिक्स लेवल छपा है: राज्य सेवाओं के लिए लेवल 14 या लेवल 12, और अधीनस्थ सेवाओं के लिए लेवल 10, 11 या 12, जैसा ऊपर समूहित है।",
        "इसमें केवल लेवल दिए गए हैं, रुपयों की राशि, भत्ते या इन-हैंड वेतन नहीं, इसलिए यहाँ कोई आंकड़ा नहीं दिया गया है। वर्तमान आंकड़ों के लिए अधिसूचना और राजस्थान का पे मैट्रिक्स देखें।"
      ],
      "perksHeading": "भत्ते और लाभ",
      "perks": [],
      "note": "सेवावार रिक्तियाँ, पे लेवल और पात्रता हर अधिसूचना में नए सिरे से प्रकाशित होती हैं और बाद के शुद्धिपत्रों से बदल सकती हैं। आधिकारिक अधिसूचना ही प्रमाण है; वर्तमान विवरण की पुष्टि करें",
      "noteLinkLabel": "RPSC की अपनी वेबसाइट से",
      "recruitsHeading": "RAS किन पदों के लिए भर्ती करती है",
      "recruitsBody": "RAS ऊपर दी राजस्थान की राज्य सेवाओं और अधीनस्थ सेवाओं को प्रारंभिक परीक्षा, मुख्य परीक्षा और साक्षात्कार के ज़रिए भरती है। सेवावार रिक्ति तालिका, आरक्षण के बँटवारे सहित, अधिसूचना में है।",
      "offerHeading": "Pariksha Saathi RPSC के लिए क्या देता है",
      "offerBody": "सामान्य ज्ञान और सामान्य विज्ञान प्रश्नपत्र के लिए मुफ्त विषयवार पाठ और अभ्यास: इतिहास, राज्य व्यवस्था, भूगोल, अर्थव्यवस्था, पर्यावरण, सामान्य विज्ञान, कला एवं संस्कृति, साथ ही राजस्थान सामान्य ज्ञान। इनमें तर्कशक्ति, मानसिक योग्यता और संख्यात्मकता वाला हिस्सा शामिल नहीं है।",
      "sourceHeading": "आधिकारिक स्रोत और नवीनतम अपडेट",
      "officialLinkLabel": "RPSC — आधिकारिक वेबसाइट",
      "examNoticesLinkLabel": "Pariksha Saathi पर नवीनतम एडमिट कार्ड, परिणाम और डेडलाइन अलर्ट",
      "syllabusLinkLabel": "RPSC RAS सिलेबस और परीक्षा पैटर्न",
      "ctaLabel": "RPSC की मुफ्त पढ़ाई शुरू करें",
      "backLabel": "होम",
      "disclaimer": "Pariksha Saathi एक स्वतंत्र परियोजना है और RPSC या किसी भी सरकारी निकाय से संबद्ध नहीं है। ऊपर दिए पे लेवल अधिसूचना में छपे अनुसार हैं, किसी विशेष आंकड़े या समय-सीमा की गारंटी नहीं — कोई भी वित्तीय निर्णय लेने से पहले हमेशा ऊपर दी गई आधिकारिक अधिसूचना से पुष्टि करें।"
    }
  },
];

export function findJobProfileEntry(slug) {
  return EXAM_JOB_PROFILES.find((e) => e.slug === slug);
}
