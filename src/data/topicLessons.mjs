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
];

export function findLessonEntry(slug) {
  return TOPIC_LESSONS.find((e) => e.slug === slug);
}
