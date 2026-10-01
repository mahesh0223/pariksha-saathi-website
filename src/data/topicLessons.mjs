// Content for the /learn/:slug topic-lesson pages, in English and Hindi. Unlike the syllabus
// pages (structural facts about exams), these are actual worked math/reasoning/English content -
// every number here has been computed and checked, not estimated, since a wrong worked example is
// far worse than a vague one. Topics are generic (not exam-specific) because the underlying
// content genuinely is the same across exams - this mirrors the app's own shared topic pool
// across SSC/IBPS/SBI rather than forking near-identical pages per exam.

export const TOPIC_LESSONS = [
  {
    slug: 'percentages',
    en: {
      pageTitle: 'Percentage Questions with Solutions',
      lede: 'Percentages show up in some form in every one of these exams’ Quantitative Aptitude sections — and in a lot of General/Banking Awareness questions too, once you count statistics and data interpretation. Here’s the concept, four fully worked examples covering the patterns that actually come up, and a few to try yourself.',
      conceptHeading: 'The concept, quickly',
      conceptBody: [
        '"Percent" just means "per hundred" — x% of a number N is (x/100) × N.',
        'Percentage change (increase or decrease) is always calculated on the original value: (change / original value) × 100.',
        'For two successive percentage changes of a% and b% (either can be negative, for a decrease), the net change is a + b + (ab/100) — not simply a + b. This is the single most common mistake in percentage questions.',
      ],
      examplesHeading: 'Worked examples',
      examples: [
        {
          question: 'What is 35% of 240?',
          solution: ['35% of 240 = (35/100) × 240', '= 35 × 2.4', '= 84'],
          answer: '84',
        },
        {
          question: 'The price of an item increased from ₹800 to ₹920. What is the percentage increase?',
          solution: ['Increase = 920 − 800 = 120', 'Percentage increase = (120 / 800) × 100', '= 15%'],
          answer: '15%',
        },
        {
          question: 'A number is first increased by 20%, then the result is decreased by 20%. What is the net percentage change?',
          solution: [
            'Using the successive-change formula: net change = a + b + (ab/100)',
            '= 20 + (−20) + (20 × −20)/100',
            '= 0 − 4 = −4%',
            'Check directly: start with 100 → increase 20% → 120 → decrease 20% → 120 × 0.8 = 96, which is 4% less than 100.',
          ],
          answer: 'Net decrease of 4% (not 0%, even though +20 and −20 look like they should cancel)',
        },
        {
          question: 'In an election between two candidates, the winner received 60% of the votes and won by 4,800 votes. Find the total number of votes polled.',
          solution: [
            'Winner: 60%, Loser: 40% → difference = 20% of total votes',
            '20% of total = 4,800',
            '1% of total = 240',
            '100% of total = 24,000',
          ],
          answer: '24,000 votes',
        },
      ],
      practiceHeading: 'Try these yourself',
      practiceIntro: 'Work through these the same way, then check against the answer.',
      practiceQuestions: [
        { question: 'What is 45% of 160?', answer: '72' },
        { question: 'A number increased from 250 to 300. Find the percentage increase.', answer: '20%' },
        { question: 'If 20% of a number is 50, find the number.', answer: '250' },
      ],
      relevantForHeading: 'Where this comes up',
      relevantForBody: 'Percentages are tested directly in the Quantitative/Numerical Aptitude section of every exam Pariksha Saathi covers — SSC CGL, SSC MTS, SSC CHSL, IBPS PO, IBPS Clerk, SBI PO and SBI Clerk — and indirectly in data-interpretation and General/Banking Awareness questions that quote statistics as percentages.',
      offerHeading: 'Practice more percentage questions',
      offerBody: 'This page covers the concept and a handful of worked examples. Pariksha Saathi has full topic-wise practice sets for Percentages (and every other Quant/Reasoning/English topic) with instant scoring and explanations — free, no account required.',
      ctaLabel: 'Practice Percentages free',
      backLabel: 'Home',
      solutionLabel: 'Solution',
      answerLabel: 'Answer',
      disclaimer: 'Pariksha Saathi is an independent project and is not affiliated with SSC, IBPS, SBI, or any government body.',
    },
    hi: {
      pageTitle: 'प्रतिशत के प्रश्न हल सहित',
      lede: 'प्रतिशत इन सभी परीक्षाओं के मात्रात्मक अभियोग्यता खंड में किसी न किसी रूप में ज़रूर आता है — और सांख्यिकी व डेटा इंटरप्रिटेशन को जोड़ें तो सामान्य/बैंकिंग जागरूकता के कई सवालों में भी। यहां अवधारणा, चार पूरी तरह हल किए गए उदाहरण जो वास्तव में आने वाले पैटर्न को कवर करते हैं, और खुद हल करने के लिए कुछ प्रश्न दिए गए हैं।',
      conceptHeading: 'अवधारणा, संक्षेप में',
      conceptBody: [
        '"प्रतिशत" का अर्थ है "प्रति सौ" — किसी संख्या N का x% = (x/100) × N होता है।',
        'प्रतिशत परिवर्तन (वृद्धि या कमी) हमेशा मूल मान पर आधारित होकर निकाला जाता है: (परिवर्तन / मूल मान) × 100।',
        'दो क्रमिक प्रतिशत परिवर्तनों a% और b% के लिए (कमी के लिए कोई भी ऋणात्मक हो सकता है), शुद्ध परिवर्तन होता है a + b + (ab/100) — सीधे a + b नहीं। प्रतिशत के प्रश्नों में यह सबसे आम गलती है।',
      ],
      examplesHeading: 'हल किए गए उदाहरण',
      examples: [
        {
          question: '240 का 35% क्या है?',
          solution: ['240 का 35% = (35/100) × 240', '= 35 × 2.4', '= 84'],
          answer: '84',
        },
        {
          question: 'एक वस्तु की कीमत ₹800 से बढ़कर ₹920 हो गई। प्रतिशत वृद्धि क्या है?',
          solution: ['वृद्धि = 920 − 800 = 120', 'प्रतिशत वृद्धि = (120 / 800) × 100', '= 15%'],
          answer: '15%',
        },
        {
          question: 'एक संख्या को पहले 20% बढ़ाया जाता है, फिर परिणाम को 20% घटाया जाता है। शुद्ध प्रतिशत परिवर्तन क्या है?',
          solution: [
            'क्रमिक परिवर्तन सूत्र का उपयोग करते हुए: शुद्ध परिवर्तन = a + b + (ab/100)',
            '= 20 + (−20) + (20 × −20)/100',
            '= 0 − 4 = −4%',
            'सीधे जांचें: 100 से शुरू करें → 20% वृद्धि → 120 → 20% कमी → 120 × 0.8 = 96, जो 100 से 4% कम है।',
          ],
          answer: 'शुद्ध रूप से 4% की कमी (0% नहीं, भले ही +20 और −20 एक-दूसरे को रद्द करते हुए लगें)',
        },
        {
          question: 'दो उम्मीदवारों के बीच एक चुनाव में, विजेता को 60% वोट मिले और वह 4,800 वोटों से जीता। कुल डाले गए वोटों की संख्या ज्ञात करें।',
          solution: [
            'विजेता: 60%, हारने वाला: 40% → अंतर = कुल वोटों का 20%',
            'कुल का 20% = 4,800',
            'कुल का 1% = 240',
            'कुल का 100% = 24,000',
          ],
          answer: '24,000 वोट',
        },
      ],
      practiceHeading: 'खुद हल करके देखें',
      practiceIntro: 'इन्हें उसी तरीके से हल करें, फिर उत्तर से मिलान करें।',
      practiceQuestions: [
        { question: '160 का 45% क्या है?', answer: '72' },
        { question: 'एक संख्या 250 से बढ़कर 300 हो गई। प्रतिशत वृद्धि ज्ञात करें।', answer: '20%' },
        { question: 'यदि किसी संख्या का 20%, 50 है, तो वह संख्या ज्ञात करें।', answer: '250' },
      ],
      relevantForHeading: 'यह कहां काम आता है',
      relevantForBody: 'Pariksha Saathi द्वारा कवर की जाने वाली हर परीक्षा — SSC CGL, SSC MTS, SSC CHSL, IBPS PO, IBPS क्लर्क, SBI PO और SBI क्लर्क — के मात्रात्मक/संख्यात्मक अभियोग्यता खंड में प्रतिशत सीधे परखा जाता है, और डेटा इंटरप्रिटेशन व सामान्य/बैंकिंग जागरूकता के उन प्रश्नों में परोक्ष रूप से भी जो आंकड़ों को प्रतिशत में बताते हैं।',
      offerHeading: 'प्रतिशत के और प्रश्नों का अभ्यास करें',
      offerBody: 'इस पेज में अवधारणा और कुछ हल किए गए उदाहरण शामिल हैं। Pariksha Saathi पर प्रतिशत (और हर दूसरे मात्रात्मक/तर्कशक्ति/अंग्रेजी विषय) के लिए पूरे विषयवार अभ्यास सेट हैं, तुरंत स्कोरिंग और स्पष्टीकरण के साथ — मुफ्त, बिना किसी खाते की आवश्यकता के।',
      ctaLabel: 'प्रतिशत का मुफ्त अभ्यास करें',
      backLabel: 'होम',
      solutionLabel: 'हल',
      answerLabel: 'उत्तर',
      disclaimer: 'Pariksha Saathi एक स्वतंत्र परियोजना है और SSC, IBPS, SBI या किसी भी सरकारी निकाय से संबद्ध नहीं है।',
    },
  },
  {
    slug: 'profit-and-loss',
    en: {
      pageTitle: 'Profit and Loss Questions with Solutions',
      lede: 'Profit and Loss builds directly on percentages, and the two are often tested together — a marked-price-and-discount question is really a percentage question wearing a different costume. Here’s the concept, four fully worked examples, and a few to try yourself.',
      conceptHeading: 'The concept, quickly',
      conceptBody: [
        'Profit = Selling Price (SP) − Cost Price (CP), when SP > CP. Loss = CP − SP, when CP > SP.',
        'Profit% or Loss% is always calculated on the Cost Price: (Profit or Loss / CP) × 100.',
        'Discount is calculated on the Marked Price (MP), not the cost price: SP = MP × (1 − Discount%/100). Mixing this up with CP is the most common mistake.',
        'When an item is marked up by a% and then discounted by b%, the net effect on profit is the same successive-change formula as percentages: net% = a + b + (ab/100).',
      ],
      examplesHeading: 'Worked examples',
      examples: [
        {
          question: 'A shopkeeper buys a table for ₹1,200 and sells it for ₹1,500. Find his profit percentage.',
          solution: ['Profit = 1,500 − 1,200 = 300', 'Profit% = (300 / 1,200) × 100', '= 25%'],
          answer: '25%',
        },
        {
          question: 'A man sells a watch for ₹1,140 at a loss of 5%. Find the cost price.',
          solution: ['SP = CP × (1 − 5/100) = CP × 0.95', '1,140 = CP × 0.95', 'CP = 1,140 / 0.95 = 1,200'],
          answer: '₹1,200',
        },
        {
          question: 'An article marked at ₹2,000 is sold after a discount of 15%. Find the selling price.',
          solution: ['SP = MP × (1 − 15/100)', '= 2,000 × 0.85', '= 1,700'],
          answer: '₹1,700',
        },
        {
          question: 'A trader marks his goods 40% above cost price, then allows a discount of 10% on the marked price. Find his profit percentage.',
          solution: [
            'Let CP = 100. Marked Price = 100 × 1.40 = 140',
            'SP = 140 × (1 − 10/100) = 140 × 0.90 = 126',
            'Profit = 126 − 100 = 26, so Profit% = 26%',
            'Check with the successive-change formula: a=+40, b=−10 → net% = 40 − 10 + (40×−10)/100 = 30 − 4 = 26%.',
          ],
          answer: '26%',
        },
      ],
      practiceHeading: 'Try these yourself',
      practiceIntro: 'Work through these the same way, then check against the answer.',
      practiceQuestions: [
        { question: 'A man buys an item for ₹500 and sells it for ₹575. Find his profit percentage.', answer: '15%' },
        { question: 'A bicycle is sold at a loss of 12% for ₹2,640. Find its cost price.', answer: '₹3,000' },
        { question: 'Goods marked at ₹800 are sold at a discount of 25%. Find the selling price.', answer: '₹600' },
      ],
      relevantForHeading: 'Where this comes up',
      relevantForBody: 'Profit and Loss is tested directly in the Quantitative/Numerical Aptitude section of every exam Pariksha Saathi covers — SSC CGL, SSC MTS, SSC CHSL, IBPS PO, IBPS Clerk, SBI PO and SBI Clerk.',
      offerHeading: 'Practice more Profit and Loss questions',
      offerBody: 'This page covers the concept and a handful of worked examples. Pariksha Saathi has full topic-wise practice sets for Profit and Loss (and every other Quant/Reasoning/English topic) with instant scoring and explanations — free, no account required.',
      ctaLabel: 'Practice Profit and Loss free',
      backLabel: 'Home',
      solutionLabel: 'Solution',
      answerLabel: 'Answer',
      disclaimer: 'Pariksha Saathi is an independent project and is not affiliated with SSC, IBPS, SBI, or any government body.',
    },
    hi: {
      pageTitle: 'लाभ और हानि के प्रश्न हल सहित',
      lede: 'लाभ और हानि सीधे प्रतिशत पर आधारित है, और दोनों अक्सर एक साथ परखे जाते हैं — अंकित मूल्य और छूट वाला सवाल असल में एक अलग रूप में प्रतिशत का ही सवाल होता है। यहां अवधारणा, चार पूरी तरह हल किए गए उदाहरण, और खुद हल करने के लिए कुछ प्रश्न दिए गए हैं।',
      conceptHeading: 'अवधारणा, संक्षेप में',
      conceptBody: [
        'लाभ = विक्रय मूल्य (SP) − क्रय मूल्य (CP), जब SP > CP हो। हानि = CP − SP, जब CP > SP हो।',
        'लाभ% या हानि% हमेशा क्रय मूल्य (CP) पर निकाला जाता है: (लाभ या हानि / CP) × 100।',
        'छूट हमेशा अंकित मूल्य (MP) पर निकाली जाती है, क्रय मूल्य पर नहीं: SP = MP × (1 − छूट%/100)। इसे CP से गड्डमड्ड करना सबसे आम गलती है।',
        'जब किसी वस्तु को a% बढ़ाकर अंकित किया जाता है और फिर b% की छूट दी जाती है, तो शुद्ध लाभ पर प्रभाव वही क्रमिक-परिवर्तन सूत्र होता है जो प्रतिशत में है: शुद्ध% = a + b + (ab/100)।',
      ],
      examplesHeading: 'हल किए गए उदाहरण',
      examples: [
        {
          question: 'एक दुकानदार ₹1,200 में एक मेज़ खरीदता है और उसे ₹1,500 में बेचता है। उसका लाभ प्रतिशत ज्ञात करें।',
          solution: ['लाभ = 1,500 − 1,200 = 300', 'लाभ% = (300 / 1,200) × 100', '= 25%'],
          answer: '25%',
        },
        {
          question: 'एक व्यक्ति एक घड़ी ₹1,140 में 5% हानि पर बेचता है। क्रय मूल्य ज्ञात करें।',
          solution: ['SP = CP × (1 − 5/100) = CP × 0.95', '1,140 = CP × 0.95', 'CP = 1,140 / 0.95 = 1,200'],
          answer: '₹1,200',
        },
        {
          question: '₹2,000 पर अंकित एक वस्तु को 15% की छूट के बाद बेचा जाता है। विक्रय मूल्य ज्ञात करें।',
          solution: ['SP = MP × (1 − 15/100)', '= 2,000 × 0.85', '= 1,700'],
          answer: '₹1,700',
        },
        {
          question: 'एक व्यापारी अपने माल को क्रय मूल्य से 40% अधिक पर अंकित करता है, फिर अंकित मूल्य पर 10% की छूट देता है। उसका लाभ प्रतिशत ज्ञात करें।',
          solution: [
            'मान लें CP = 100। अंकित मूल्य = 100 × 1.40 = 140',
            'SP = 140 × (1 − 10/100) = 140 × 0.90 = 126',
            'लाभ = 126 − 100 = 26, अतः लाभ% = 26%',
            'क्रमिक-परिवर्तन सूत्र से जांचें: a=+40, b=−10 → शुद्ध% = 40 − 10 + (40×−10)/100 = 30 − 4 = 26%।',
          ],
          answer: '26%',
        },
      ],
      practiceHeading: 'खुद हल करके देखें',
      practiceIntro: 'इन्हें उसी तरीके से हल करें, फिर उत्तर से मिलान करें।',
      practiceQuestions: [
        { question: 'एक व्यक्ति ₹500 में एक वस्तु खरीदता है और उसे ₹575 में बेचता है। उसका लाभ प्रतिशत ज्ञात करें।', answer: '15%' },
        { question: 'एक साइकिल 12% हानि पर ₹2,640 में बेची जाती है। इसका क्रय मूल्य ज्ञात करें।', answer: '₹3,000' },
        { question: '₹800 पर अंकित माल 25% की छूट पर बेचा जाता है। विक्रय मूल्य ज्ञात करें।', answer: '₹600' },
      ],
      relevantForHeading: 'यह कहां काम आता है',
      relevantForBody: 'Pariksha Saathi द्वारा कवर की जाने वाली हर परीक्षा — SSC CGL, SSC MTS, SSC CHSL, IBPS PO, IBPS क्लर्क, SBI PO और SBI क्लर्क — के मात्रात्मक/संख्यात्मक अभियोग्यता खंड में लाभ और हानि सीधे परखा जाता है।',
      offerHeading: 'लाभ और हानि के और प्रश्नों का अभ्यास करें',
      offerBody: 'इस पेज में अवधारणा और कुछ हल किए गए उदाहरण शामिल हैं। Pariksha Saathi पर लाभ और हानि (और हर दूसरे मात्रात्मक/तर्कशक्ति/अंग्रेजी विषय) के लिए पूरे विषयवार अभ्यास सेट हैं, तुरंत स्कोरिंग और स्पष्टीकरण के साथ — मुफ्त, बिना किसी खाते की आवश्यकता के।',
      ctaLabel: 'लाभ और हानि का मुफ्त अभ्यास करें',
      backLabel: 'होम',
      solutionLabel: 'हल',
      answerLabel: 'उत्तर',
      disclaimer: 'Pariksha Saathi एक स्वतंत्र परियोजना है और SSC, IBPS, SBI या किसी भी सरकारी निकाय से संबद्ध नहीं है।',
    },
  },
  {
    slug: 'simple-compound-interest',
    en: {
      pageTitle: 'Simple & Compound Interest Questions with Solutions',
      lede: 'Interest questions are about keeping one distinction straight: simple interest is the same amount every year, compound interest grows on top of itself. Here’s the concept, four fully worked examples, and a few to try yourself.',
      conceptHeading: 'The concept, quickly',
      conceptBody: [
        'Simple Interest (SI) = (P × R × T) / 100, where P is principal, R is the annual rate, T is time in years. Amount = P + SI.',
        'Compound Interest (CI), compounded annually: Amount = P × (1 + R/100)ᵀ. CI = Amount − P.',
        'For the same P, R and T, CI is always ≥ SI — interest earning interest. For 2 years specifically, CI − SI = P × (R/100)², a useful shortcut.',
      ],
      examplesHeading: 'Worked examples',
      examples: [
        {
          question: 'Find the simple interest on ₹5,000 at 8% per annum for 3 years.',
          solution: ['SI = (P × R × T) / 100', '= (5,000 × 8 × 3) / 100', '= 1,200'],
          answer: '₹1,200',
        },
        {
          question: 'A sum of ₹8,000 amounts to ₹9,440 in 3 years at simple interest. Find the rate of interest per annum.',
          solution: ['SI = 9,440 − 8,000 = 1,440', 'R = (SI × 100) / (P × T) = (1,440 × 100) / (8,000 × 3)', '= 144,000 / 24,000 = 6%'],
          answer: '6% per annum',
        },
        {
          question: 'Find the compound interest on ₹10,000 for 2 years at 10% per annum, compounded annually.',
          solution: ['Amount = 10,000 × (1.10)²', '= 10,000 × 1.21 = 12,100', 'CI = 12,100 − 10,000 = 2,100'],
          answer: '₹2,100',
        },
        {
          question: 'Find the difference between the compound interest and simple interest on ₹15,000 for 2 years at 10% per annum.',
          solution: [
            'SI = (15,000 × 10 × 2) / 100 = 3,000',
            'CI: Amount = 15,000 × (1.10)² = 15,000 × 1.21 = 18,150, so CI = 3,150',
            'Difference = 3,150 − 3,000 = 150',
            'Shortcut check: P × (R/100)² = 15,000 × 0.01 = 150 — matches, for 2 years only.',
          ],
          answer: '₹150',
        },
      ],
      practiceHeading: 'Try these yourself',
      practiceIntro: 'Work through these the same way, then check against the answer.',
      practiceQuestions: [
        { question: 'Find the simple interest on ₹12,000 at 5% per annum for 4 years.', answer: '₹2,400' },
        { question: 'A sum amounts to ₹6,600 in 4 years at 5% simple interest per annum. Find the principal.', answer: '₹5,500' },
        { question: 'Find the compound interest on ₹20,000 for 2 years at 5% per annum, compounded annually.', answer: '₹2,050' },
      ],
      relevantForHeading: 'Where this comes up',
      relevantForBody: 'Simple and Compound Interest are tested directly in the Quantitative/Numerical Aptitude section of every exam Pariksha Saathi covers — SSC CGL, SSC MTS, SSC CHSL, IBPS PO, IBPS Clerk, SBI PO and SBI Clerk — and the underlying concept shows up in Banking Awareness questions too.',
      offerHeading: 'Practice more Interest questions',
      offerBody: 'This page covers the concept and a handful of worked examples. Pariksha Saathi has full topic-wise practice sets for Simple & Compound Interest (and every other Quant/Reasoning/English topic) with instant scoring and explanations — free, no account required.',
      ctaLabel: 'Practice Interest questions free',
      backLabel: 'Home',
      solutionLabel: 'Solution',
      answerLabel: 'Answer',
      disclaimer: 'Pariksha Saathi is an independent project and is not affiliated with SSC, IBPS, SBI, or any government body.',
    },
    hi: {
      pageTitle: 'साधारण और चक्रवृद्धि ब्याज के प्रश्न हल सहित',
      lede: 'ब्याज के सवालों में बस एक फर्क याद रखना होता है: साधारण ब्याज हर साल एक जैसा होता है, चक्रवृद्धि ब्याज अपने ऊपर ही बढ़ता है। यहां अवधारणा, चार पूरी तरह हल किए गए उदाहरण, और खुद हल करने के लिए कुछ प्रश्न दिए गए हैं।',
      conceptHeading: 'अवधारणा, संक्षेप में',
      conceptBody: [
        'साधारण ब्याज (SI) = (P × R × T) / 100, जहां P मूलधन है, R वार्षिक दर है, T वर्षों में समय है। मिश्रधन = P + SI।',
        'चक्रवृद्धि ब्याज (CI), वार्षिक रूप से संयोजित: मिश्रधन = P × (1 + R/100)^T। CI = मिश्रधन − P।',
        'समान P, R और T के लिए, CI हमेशा SI से ≥ होता है — ब्याज पर ब्याज मिलने के कारण। विशेष रूप से 2 वर्षों के लिए, CI − SI = P × (R/100)², एक उपयोगी शॉर्टकट है।',
      ],
      examplesHeading: 'हल किए गए उदाहरण',
      examples: [
        {
          question: '₹5,000 पर 8% वार्षिक दर से 3 वर्षों का साधारण ब्याज ज्ञात करें।',
          solution: ['SI = (P × R × T) / 100', '= (5,000 × 8 × 3) / 100', '= 1,200'],
          answer: '₹1,200',
        },
        {
          question: '₹8,000 की राशि साधारण ब्याज पर 3 वर्षों में ₹9,440 हो जाती है। वार्षिक ब्याज दर ज्ञात करें।',
          solution: ['SI = 9,440 − 8,000 = 1,440', 'R = (SI × 100) / (P × T) = (1,440 × 100) / (8,000 × 3)', '= 144,000 / 24,000 = 6%'],
          answer: '6% वार्षिक',
        },
        {
          question: '₹10,000 पर 2 वर्षों के लिए 10% वार्षिक दर से, वार्षिक रूप से संयोजित चक्रवृद्धि ब्याज ज्ञात करें।',
          solution: ['मिश्रधन = 10,000 × (1.10)²', '= 10,000 × 1.21 = 12,100', 'CI = 12,100 − 10,000 = 2,100'],
          answer: '₹2,100',
        },
        {
          question: '₹15,000 पर 2 वर्षों के लिए 10% वार्षिक दर पर चक्रवृद्धि ब्याज और साधारण ब्याज के बीच अंतर ज्ञात करें।',
          solution: [
            'SI = (15,000 × 10 × 2) / 100 = 3,000',
            'CI: मिश्रधन = 15,000 × (1.10)² = 15,000 × 1.21 = 18,150, अतः CI = 3,150',
            'अंतर = 3,150 − 3,000 = 150',
            'शॉर्टकट जांच: P × (R/100)² = 15,000 × 0.01 = 150 — मेल खाता है, केवल 2 वर्षों के लिए।',
          ],
          answer: '₹150',
        },
      ],
      practiceHeading: 'खुद हल करके देखें',
      practiceIntro: 'इन्हें उसी तरीके से हल करें, फिर उत्तर से मिलान करें।',
      practiceQuestions: [
        { question: '₹12,000 पर 5% वार्षिक दर से 4 वर्षों का साधारण ब्याज ज्ञात करें।', answer: '₹2,400' },
        { question: '5% वार्षिक साधारण ब्याज पर एक राशि 4 वर्षों में ₹6,600 हो जाती है। मूलधन ज्ञात करें।', answer: '₹5,500' },
        { question: '₹20,000 पर 2 वर्षों के लिए 5% वार्षिक दर से, वार्षिक रूप से संयोजित चक्रवृद्धि ब्याज ज्ञात करें।', answer: '₹2,050' },
      ],
      relevantForHeading: 'यह कहां काम आता है',
      relevantForBody: 'Pariksha Saathi द्वारा कवर की जाने वाली हर परीक्षा — SSC CGL, SSC MTS, SSC CHSL, IBPS PO, IBPS क्लर्क, SBI PO और SBI क्लर्क — के मात्रात्मक/संख्यात्मक अभियोग्यता खंड में साधारण और चक्रवृद्धि ब्याज सीधे परखा जाता है, और इसकी मूल अवधारणा बैंकिंग जागरूकता के प्रश्नों में भी आती है।',
      offerHeading: 'ब्याज के और प्रश्नों का अभ्यास करें',
      offerBody: 'इस पेज में अवधारणा और कुछ हल किए गए उदाहरण शामिल हैं। Pariksha Saathi पर ब्याज (और हर दूसरे मात्रात्मक/तर्कशक्ति/अंग्रेजी विषय) के लिए पूरे विषयवार अभ्यास सेट हैं, तुरंत स्कोरिंग और स्पष्टीकरण के साथ — मुफ्त, बिना किसी खाते की आवश्यकता के।',
      ctaLabel: 'ब्याज के प्रश्नों का मुफ्त अभ्यास करें',
      backLabel: 'होम',
      solutionLabel: 'हल',
      answerLabel: 'उत्तर',
      disclaimer: 'Pariksha Saathi एक स्वतंत्र परियोजना है और SSC, IBPS, SBI या किसी भी सरकारी निकाय से संबद्ध नहीं है।',
    },
  },
  {
    slug: 'blood-relations',
    en: {
      pageTitle: 'Blood Relation Questions with Solutions',
      lede: 'Blood relation puzzles are really just careful reading — the logic is simple once you trace each relationship one step at a time instead of trying to hold the whole family tree in your head. Here’s the approach, four fully worked examples, and a few to try yourself.',
      conceptHeading: 'The approach, quickly',
      conceptBody: [
        'Trace one relationship at a time. Convert each clue into a small family-tree sketch (even mentally) before jumping to the answer.',
        '"Only son" / "only daughter" is a strong clue — it tells you there’s exactly one person matching that description, which usually lets you identify a specific person rather than a category.',
        'Watch whose perspective the sentence is told from — "my mother’s mother" is the speaker’s grandmother, not the listener’s.',
      ],
      examplesHeading: 'Worked examples',
      examples: [
        {
          question: 'A is the brother of B. C is the sister of A. How is C related to B?',
          solution: ['A and B are siblings (A is B’s brother).', 'C is A’s sister, so C is also a sibling of A — and therefore of B.', 'Since C is specified as female, C is B’s sister.'],
          answer: 'C is the sister of B',
        },
        {
          question: 'Pointing to a man, a woman says, ‘His mother is the only daughter of my mother.’ How is the woman related to the man?',
          solution: [
            '"The only daughter of my mother" — the woman herself is a daughter of her mother, and since there’s only one, that daughter must be the woman herself.',
            'So "his mother" = the woman herself.',
          ],
          answer: 'The woman is the man’s mother',
        },
        {
          question: 'Introducing a man, a woman says, ‘He is the only son of my mother’s mother.’ How is the man related to the woman?',
          solution: [
            '"My mother’s mother" is the woman’s (maternal) grandmother.',
            'The grandmother’s only son is the brother of the woman’s mother — i.e., the woman’s maternal uncle.',
          ],
          answer: 'The man is the woman’s (maternal) uncle',
        },
        {
          question: 'A and B are sisters. C is A’s son. D is B’s brother. How is D related to C?',
          solution: [
            'A and B are sisters, so they share the same siblings.',
            'D is B’s brother, so D is also A’s brother.',
            'C is A’s son, and D is A’s brother — so D is C’s maternal uncle.',
          ],
          answer: 'D is C’s (maternal) uncle',
        },
      ],
      practiceHeading: 'Try these yourself',
      practiceIntro: 'Sketch the relationship step by step, then check against the answer.',
      practiceQuestions: [
        { question: 'Pointing to a photograph, a man says, ‘She is the daughter of my father’s only son.’ If the man has no brothers, how is the woman in the photograph related to him?', answer: 'Daughter (the man himself is his father’s only son)' },
        { question: 'P is the father of Q. Q is the sister of R. How is R related to P?', answer: 'Son or daughter (child) — R’s gender isn’t given' },
        { question: 'Introducing a man, a woman said, ‘His wife is the only daughter of my father.’ How is the man related to the woman?', answer: 'Husband (the only daughter of the woman’s father must be the woman herself)' },
      ],
      relevantForHeading: 'Where this comes up',
      relevantForBody: 'Blood Relations is a regular topic in the Reasoning/General Intelligence section of every exam Pariksha Saathi covers — SSC CGL, SSC MTS, SSC CHSL, IBPS PO, IBPS Clerk, SBI PO and SBI Clerk.',
      offerHeading: 'Practice more Blood Relation questions',
      offerBody: 'This page covers the approach and a handful of worked examples. Pariksha Saathi has full topic-wise practice sets for Blood Relations (and every other Reasoning/Quant/English topic) with instant scoring and explanations — free, no account required.',
      ctaLabel: 'Practice Blood Relations free',
      backLabel: 'Home',
      solutionLabel: 'Solution',
      answerLabel: 'Answer',
      disclaimer: 'Pariksha Saathi is an independent project and is not affiliated with SSC, IBPS, SBI, or any government body.',
    },
    hi: {
      pageTitle: 'रक्त संबंध (ब्लड रिलेशन) के प्रश्न हल सहित',
      lede: 'रक्त संबंध की पहेलियां असल में सावधानी से पढ़ने भर का मामला हैं — पूरे परिवार के पेड़ को एक साथ दिमाग में रखने की कोशिश करने के बजाय हर संबंध को एक-एक कदम ट्रेस करने पर तर्क आसान हो जाता है। यहां तरीका, चार पूरी तरह हल किए गए उदाहरण, और खुद हल करने के लिए कुछ प्रश्न दिए गए हैं।',
      conceptHeading: 'तरीका, संक्षेप में',
      conceptBody: [
        'एक बार में एक ही संबंध ट्रेस करें। उत्तर पर पहुंचने से पहले हर सुराग को एक छोटे पारिवारिक रेखाचित्र में बदलें (मन में ही सही)।',
        '"इकलौता बेटा" / "इकलौती बेटी" एक मजबूत सुराग है — यह बताता है कि उस विवरण से मेल खाने वाला ठीक एक ही व्यक्ति है, जो आमतौर पर किसी श्रेणी के बजाय एक विशिष्ट व्यक्ति की पहचान करने देता है।',
        'ध्यान दें कि वाक्य किसके नज़रिए से कहा गया है — "मेरी मां की मां" वक्ता की नानी है, सुनने वाले की नहीं।',
      ],
      examplesHeading: 'हल किए गए उदाहरण',
      examples: [
        {
          question: 'A, B का भाई है। C, A की बहन है। C का B से क्या संबंध है?',
          solution: ['A और B भाई-बहन हैं (A, B का भाई है)।', 'C, A की बहन है, इसलिए C भी A की भाई-बहन है — और इसलिए B की भी।', 'चूंकि C महिला है, इसलिए C, B की बहन है।'],
          answer: 'C, B की बहन है',
        },
        {
          question: 'एक पुरुष की ओर इशारा करते हुए एक महिला कहती है, "उसकी मां मेरी मां की इकलौती बेटी है।" महिला का उस पुरुष से क्या संबंध है?',
          solution: [
            '"मेरी मां की इकलौती बेटी" — महिला खुद अपनी मां की बेटी है, और चूंकि सिर्फ एक ही बेटी है, वह बेटी खुद महिला ही होनी चाहिए।',
            'तो "उसकी मां" = महिला खुद।',
          ],
          answer: 'महिला उस पुरुष की मां है',
        },
        {
          question: 'एक पुरुष का परिचय देते हुए एक महिला कहती है, "वह मेरी मां की मां का इकलौता बेटा है।" उस पुरुष का महिला से क्या संबंध है?',
          solution: [
            '"मेरी मां की मां" महिला की नानी है।',
            'नानी का इकलौता बेटा महिला की मां का भाई है — यानी महिला का मामा।',
          ],
          answer: 'वह पुरुष महिला का मामा है',
        },
        {
          question: 'A और B बहनें हैं। C, A का बेटा है। D, B का भाई है। D का C से क्या संबंध है?',
          solution: [
            'A और B बहनें हैं, इसलिए उनके भाई-बहन एक ही हैं।',
            'D, B का भाई है, इसलिए D, A का भी भाई है।',
            'C, A का बेटा है, और D, A का भाई है — इसलिए D, C का मामा है।',
          ],
          answer: 'D, C का मामा है',
        },
      ],
      practiceHeading: 'खुद हल करके देखें',
      practiceIntro: 'संबंध को कदम-दर-कदम रेखांकित करें, फिर उत्तर से मिलान करें।',
      practiceQuestions: [
        { question: 'एक तस्वीर की ओर इशारा करते हुए एक पुरुष कहता है, "वह मेरे पिता के इकलौते बेटे की बेटी है।" यदि उस पुरुष का कोई भाई नहीं है, तो तस्वीर में महिला का उससे क्या संबंध है?', answer: 'बेटी (वह पुरुष खुद अपने पिता का इकलौता बेटा है)' },
        { question: 'P, Q का पिता है। Q, R की बहन है। R का P से क्या संबंध है?', answer: 'बेटा या बेटी (संतान) — R का लिंग नहीं बताया गया' },
        { question: 'एक पुरुष का परिचय देते हुए एक महिला कहती है, "उसकी पत्नी मेरे पिता की इकलौती बेटी है।" उस पुरुष का उस महिला से क्या संबंध है?', answer: 'पति (महिला के पिता की इकलौती बेटी खुद महिला ही होनी चाहिए)' },
      ],
      relevantForHeading: 'यह कहां काम आता है',
      relevantForBody: 'Pariksha Saathi द्वारा कवर की जाने वाली हर परीक्षा — SSC CGL, SSC MTS, SSC CHSL, IBPS PO, IBPS क्लर्क, SBI PO और SBI क्लर्क — के तर्कशक्ति/सामान्य बुद्धिमत्ता खंड में रक्त संबंध एक नियमित विषय है।',
      offerHeading: 'रक्त संबंध के और प्रश्नों का अभ्यास करें',
      offerBody: 'इस पेज में तरीका और कुछ हल किए गए उदाहरण शामिल हैं। Pariksha Saathi पर रक्त संबंध (और हर दूसरे तर्कशक्ति/मात्रात्मक/अंग्रेजी विषय) के लिए पूरे विषयवार अभ्यास सेट हैं, तुरंत स्कोरिंग और स्पष्टीकरण के साथ — मुफ्त, बिना किसी खाते की आवश्यकता के।',
      ctaLabel: 'रक्त संबंध का मुफ्त अभ्यास करें',
      backLabel: 'होम',
      solutionLabel: 'हल',
      answerLabel: 'उत्तर',
      disclaimer: 'Pariksha Saathi एक स्वतंत्र परियोजना है और SSC, IBPS, SBI या किसी भी सरकारी निकाय से संबद्ध नहीं है।',
    },
  },
];

export function findLessonEntry(slug) {
  return TOPIC_LESSONS.find((e) => e.slug === slug);
}
