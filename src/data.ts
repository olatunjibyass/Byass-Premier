/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Service, FAQ, Testimonial, Job } from './types';

export const SERVICES: Service[] = [
  {
    id: 'personal-care',
    title: 'Personal Care Assistance',
    shortDescription: 'Respectful, professional support with daily activities including bathing, dressing, and mobility to maintain personal hygiene and self-esteem.',
    fullDescription: 'Our personal care services are designed to help you or your loved one maintain independence with daily living tasks. We provide assistance in a highly respectful, compassionate, and professional manner, preserving the client\'s dignity at all times.',
    icon: 'HeartHandshake',
    category: 'daily-living',
    benefits: [
      'Assistance with safe bathing, showering, and grooming',
      'Support with dressing and visual matching',
      'Incontinence care, toileting, and personal hygiene',
      'Mobility, transferring, and positioning support to prevent falls',
      'Eating and feeding assistance'
    ],
    typicalPlan: 'Typically 4 to 12 hours daily, customized according to mobility levels and personal routines.'
  },
  {
    id: 'companion-care',
    title: 'Companion Care',
    shortDescription: 'Warm emotional support, friendly conversation, and recreational activities to combat loneliness and stimulate cognitive wellness.',
    fullDescription: 'Social isolation can severely impact physical and mental health. Companion care offers meaningful social interaction, emotional support, and friendly engagement, helping seniors stay connected and active in their homes.',
    icon: 'Smile',
    category: 'daily-living',
    benefits: [
      'Meaningful conversation, storytelling, and reading',
      'Engaging in hobbies, board games, crafts, and puzzles',
      'Accompaniment on light outdoor walks or garden visits',
      'Help keeping in touch with family via video calls and emails',
      'Accompanying to social gatherings or community clubs'
    ],
    typicalPlan: 'Often scheduled 2 to 5 times per week, providing respite for families and cognitive stimulation for clients.'
  },
  {
    id: 'medication-reminders',
    title: 'Medication Reminders',
    shortDescription: 'Helpful oversight to ensure prescribed dosages are taken on schedule, avoiding critical health setbacks and medication errors.',
    fullDescription: 'Managing complex medication regimens can be challenging and dangerous. While our standard caregivers do not administer injections, they provide strict compliance oversight, reminding clients when and how to take their oral medications.',
    icon: 'Pills',
    category: 'clinical',
    benefits: [
      'Timely reminders matching physician-prescribed schedules',
      'Assistance reading medication bottle labels and instructions',
      'Help opening child-proof containers and organizing daily pill organizers',
      'Documenting medication intake logs for family and physician review',
      'Monitoring and reporting potential side effects or missed doses immediately'
    ],
    typicalPlan: 'Usually integrated into daily care visits or offered as a key part of our morning/evening wellness check-ins.'
  },
  {
    id: 'respite-care',
    title: 'Respite Care',
    shortDescription: 'Short-term relief and peace of mind for primary family caregivers, allowing you to rest and recharge while your loved one is safely attended.',
    fullDescription: 'Caring for a loved one is highly rewarding but physically and emotionally demanding. Our Respite Care services provide family caregivers with a much-needed break to rest, work, attend to personal matters, or take a vacation, knowing professional hands are on duty.',
    icon: 'Coffee',
    category: 'specialized',
    benefits: [
      'Flexible relief shifts ranging from a few hours to several days',
      'Seamless handoff with detailed care checklists',
      'Ensuring continuity of the client\'s daily routine without interruption',
      'Peace of mind knowing a background-checked caregiver is in charge',
      'Prevents family caregiver burnout and preserves positive relationships'
    ],
    typicalPlan: 'Highly flexible. Can be booked on-demand, weekly, or for temporary block periods (e.g. weekend coverage).'
  },
  {
    id: 'dementia-alzheimers-care',
    title: 'Dementia & Alzheimer\'s Care',
    shortDescription: 'Specialized, patient cognitive care utilizing memory exercises and calming techniques to handle behavioral changes safely.',
    fullDescription: 'Dementia and Alzheimer\'s demand highly specialized care strategies. Our caregivers are specifically trained in dementia management, using positive reinforcement, sensory engagement, and routine-building to minimize anxiety and confusion.',
    icon: 'Brain',
    category: 'specialized',
    benefits: [
      'Sustaining structured, calming daily routines to minimize confusion',
      'Gentle redirection and patience-driven behavioral management',
      'Cognitive stimulation through memory scrapbooks, familiar music, and gentle games',
      'Safe environment auditing to prevent wandering or accidental falls',
      'Nutritional monitoring customized for specialized diets'
    ],
    typicalPlan: 'Standardized 8 to 24-hour schedules with designated, consistent caregivers to build trust and routine safety.'
  },
  {
    id: 'disability-support',
    title: 'Disability Support',
    shortDescription: 'Dedicated physical assistance and empowering care designed to help adults living with disabilities lead independent, fulfilling lives.',
    fullDescription: 'We provide specialized assistance to adults living with physical, intellectual, or developmental disabilities. Our goal is to promote autonomy, assist with daily barriers, and empower our clients to live actively and safely within their communities.',
    icon: 'Activity',
    category: 'specialized',
    benefits: [
      'Adaptive daily living assistance customized to specific physical needs',
      'Support using mobility aids, wheelchairs, and transfers',
      'Encouragement and assistance in occupational or educational hobbies',
      'Assistance with exercises prescribed by physical therapists',
      'Creating an empowering, non-judgmental environment of respect'
    ],
    typicalPlan: 'Varies from periodic daily assistance to 24/7 care, adjusted strictly to the client\'s autonomy goals.'
  },
  {
    id: 'post-hospital-recovery',
    title: 'Post-Hospital Recovery Care',
    shortDescription: 'Structured transitional support to ease the journey from hospital to home, reducing readmission rates and accelerating healing.',
    fullDescription: 'The first few weeks after hospital discharge are critical for recovery. We provide structured transitional support, assisting with wound care reminders, therapy exercise compliance, and general household tasks, allowing clients to rest and heal.',
    icon: 'Home',
    category: 'clinical',
    benefits: [
      'Assistance following hospital discharge instructions and care plans',
      'Accompanying to vital follow-up medical appointments',
      'Wound healing monitoring and nutrition tracking',
      'Immediate alert system for complications or warning signs',
      'Prevents accidental falls or overexertion during early healing'
    ],
    typicalPlan: 'Intensive short-term support (e.g., 2 to 6 weeks post-discharge), often tapering down as strength is recovered.'
  },
  {
    id: 'live-in-care',
    title: 'Live-In Care',
    shortDescription: 'Around-the-clock professional coverage providing continuous safety, nighttime security, and constant comfort in familiar surroundings.',
    fullDescription: 'For clients requiring continuous supervision and immediate assistance, Live-In Care offers a highly secure and cost-effective alternative to nursing homes. Caregivers live in the client\'s residence, providing 24/7 peace of mind.',
    icon: 'Bed',
    category: 'specialized',
    benefits: [
      'Continuous 24-hour home presence for immediate safety interventions',
      'Nighttime reassurance and assistance with late-night toileting',
      'Seamless coordination between day and night routines',
      'Enables clients to remain in their beloved home permanently',
      'High continuity of care with an extremely small, dedicated team'
    ],
    typicalPlan: 'Around-the-clock care, divided among a rotation of 2 to 3 primary caregivers who stay in the home.'
  },
  {
    id: 'meal-preparation',
    title: 'Meal Preparation',
    shortDescription: 'Nutritious, fresh, and appetizing meal prep aligned with clinical dietary restrictions, keeping clients energized and healthy.',
    fullDescription: 'Proper nutrition is critical for immunity, energy, and overall health. Our caregivers handle grocery shopping and prepare fresh, delicious, well-balanced meals customized to the client\'s specific clinical dietary requirements.',
    icon: 'Utensils',
    category: 'daily-living',
    benefits: [
      'Planning menus based on dietary restrictions (e.g., low-sodium, diabetic-friendly)',
      'Grocery shopping and maintaining kitchen food safety',
      'Preparing and cooking fresh, portioned, appetizing meals',
      'Assisting with neat kitchen clean-up and organizing leftovers safely',
      'Encouraging hydration and tracking dietary intake logs'
    ],
    typicalPlan: 'Usually booked in morning/midday or evening shifts, ensuring fresh hot meals are ready daily.'
  },
  {
    id: 'transportation-assistance',
    title: 'Transportation Assistance',
    shortDescription: 'Safe, escorted rides to doctor visits, therapy sessions, grocery stores, and social appointments to maintain full social mobility.',
    fullDescription: 'Losing the ability to drive can make clients feel trapped. We provide safe, fully escorted door-to-door transportation services, ensuring clients can run errands, attend medical appointments, and maintain active social schedules.',
    icon: 'Car',
    category: 'daily-living',
    benefits: [
      'Escorted door-to-door rides in reliable vehicles',
      'Assistance loading and unloading wheelchairs, walkers, or groceries',
      'Accompanying clients inside doctor\'s offices and waiting rooms',
      'Help running pharmacy, post office, and retail errands',
      'Eliminating transportation stress for working family members'
    ],
    typicalPlan: 'Can be booked as a standalone service for specific errands or integrated into regular daily care shifts.'
  }
];

export const FAQS: FAQ[] = [
  {
    id: 'faq-1',
    question: 'What is home care, and how does it differ from home health?',
    answer: 'Home care (which Byass Premier provides) focuses on personal support, companionship, safety, and assistances with daily living activities (bathing, meals, medication reminders, housekeeping). Home health care involves clinical, medical care provided by licensed nurses or physical therapists, typically ordered by a doctor after a hospital stay. We work hand-in-hand with clinical home health teams to provide holistic coverage.',
    category: 'General'
  },
  {
    id: 'faq-2',
    question: 'How do you screen and select your caregivers?',
    answer: 'Your safety is our absolute priority. Every caregiver at Byass Premier undergoes a rigorous multi-step screening process. This includes a comprehensive nationwide criminal background check, social security verification, professional reference audits, CPR certification checks, tuberculosis (TB) screening, and a detailed in-person skill assessment. We hire only those caregivers we would trust with our own family members.',
    category: 'Caregivers'
  },
  {
    id: 'faq-3',
    question: 'Do we have to sign a long-term contract?',
    answer: 'No, there are no rigid long-term contracts. We believe in earning your trust daily. We operate on a flexible service agreement that details the care schedule and billing rates. You can adjust your care plan, increase hours, or pause services with a simple 48-hour notice, giving you full control over your care needs.',
    category: 'Scheduling'
  },
  {
    id: 'faq-4',
    question: 'Can I choose or meet my caregiver before services start?',
    answer: 'Absolutely. We believe caregiver matching is both a science and an art. We analyze the care assessment to select a caregiver who has both the correct clinical skills and a compatible personality. We then facilitate a warm initial introduction. If at any point you feel the caregiver is not a perfect fit, we will arrange a replacement immediately, no questions asked.',
    category: 'Caregivers'
  },
  {
    id: 'faq-5',
    question: 'Is Byass Premier Health Care licensed and insured?',
    answer: 'Yes, Byass Premier Health Care is fully licensed by the state health department, bonded, and comprehensively insured. This ensures total safety, compliance, and legal peace of mind for our clients and their families. We assume all employer liabilities, including workers\' compensation and payroll taxes.',
    category: 'General'
  },
  {
    id: 'faq-6',
    question: 'What are your rates, and are services covered by insurance?',
    answer: 'Rates depend on the level of care required and the weekly schedule (hourly vs. live-in). We provide completely transparent pricing during our free care assessment. While traditional Medicare typically does not cover non-medical companion/personal home care, our services are highly compatible with Long-Term Care Insurance (LTCI), Veterans Aid & Attendance benefits, and private funds. We can assist you in filing insurance claims.',
    category: 'Costs & Insurance'
  },
  {
    id: 'faq-7',
    question: 'How quickly can care services begin?',
    answer: 'In many cases, care can begin within 24 to 48 hours of our initial contact. We first conduct a free in-home consultation to perform safety assessments and customize your care plan. For urgent post-hospital discharges, we expedite the process to coordinate with hospital discharge planners.',
    category: 'Scheduling'
  },
  {
    id: 'faq-8',
    question: 'What happens if our caregiver is sick or unavailable?',
    answer: 'We have a robust backup caregiver system. If your primary caregiver is sick or has an emergency, our scheduling coordinator will contact you immediately and arrange a fully brief, qualified backup caregiver. All care plans are stored securely in our systems, allowing the backup caregiver to step in and understand your exact routines.',
    category: 'Scheduling'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    author: 'Sarah Jenkins',
    relationship: 'Daughter of Senior Client',
    quote: 'The level of professionalism and deep empathy shown by the Byass caregivers has completely changed our family\'s life. Knowing my father is safe, eating well, and has active companionship while I am at work brings an incredible sense of relief.',
    rating: 5,
    type: 'client'
  },
  {
    id: 't-2',
    author: 'Robert L. Montgomery',
    relationship: 'Post-Surgery Recovery Client',
    quote: 'After my knee replacement, I was terrified of being helpless at home. The transitional support team from Byass Premier assisted me with mobility, meals, and kept me strictly on track with my physical therapy homework. I recovered ahead of schedule!',
    rating: 5,
    type: 'client'
  },
  {
    id: 't-3',
    author: 'Elena Rostova',
    relationship: 'Byass Caregiver (4 Years)',
    quote: 'Working with Byass Premier Care feels like being part of a family. They genuinely respect our efforts, provide continuous skills training, and structure logical schedules that prevent caregiver burnout. This respect trickles down to our clients.',
    rating: 5,
    type: 'caregiver'
  },
  {
    id: 't-4',
    author: 'David Vance',
    relationship: 'Son of Alzheimer\'s Client',
    quote: 'Caring for my mother who has advanced Alzheimer\'s was overwhelming. The memory care caregivers from Byass Premier have a calming presence and patience that is truly angelic. They know exactly how to manage her anxiety with routines.',
    rating: 5,
    type: 'client'
  }
];

export const JOBS: Job[] = [
  {
    id: 'j-1',
    title: 'Certified Nursing Assistant (CNA) / Home Health Aide (HHA)',
    department: 'Direct Client Care',
    type: 'Full-time',
    location: 'Metropolitan Area',
    shortDescription: 'Provide compassionate, high-quality hands-on personal care, mobility transfers, and hygiene assistance to seniors in their private homes.',
    requirements: [
      'Valid state CNA license or Certified Home Health Aide certificate',
      'Active CPR and First Aid certifications',
      'Clean background check and valid driver\'s license with reliable vehicle',
      'Minimum 1 year of professional home care or clinical facility experience',
      'Compassionate, reliable, and detail-oriented work ethic'
    ],
    benefits: [
      'Highly competitive starting wages with weekend shift differentials',
      'Flexible scheduling with full-time and part-time shifts available',
      'Comprehensive health, dental, and vision benefits for full-time employees',
      'Paid time off (PTO) and sick leave accumulator',
      'Ongoing paid clinical training and career advancement mentorship'
    ]
  },
  {
    id: 'j-2',
    title: 'Compassionate Companion Caregiver',
    department: 'Direct Client Care',
    type: 'Part-time',
    location: 'Suburban Districts',
    shortDescription: 'Combat senior isolation by providing joyful companionship, light meal preparation, transportation to doctor appointments, and light household help.',
    requirements: [
      'High school diploma or equivalent',
      'Passionate about assisting seniors and active community engagement',
      'Excellent verbal and written communication skills in English',
      'Clean driving record and reliable personal vehicle for client escorted rides',
      'Passionate, patient, and active-listening personality'
    ],
    benefits: [
      'Great matching based on location and personal hobbies',
      'Paid orientation and comprehensive elderly companion training modules',
      'Matching retirement contributions (401k plan)',
      'A warm, highly supportive local office and scheduling coordinators',
      'Perfect schedule flexibility for students or retired professionals'
    ]
  },
  {
    id: 'j-3',
    title: 'Live-In Care Professional (Rotational)',
    department: 'Direct Client Care',
    type: 'Live-In',
    location: 'Executive Estates',
    shortDescription: 'Live inside a peaceful residential home on a rotating 3-day shift schedule, ensuring around-the-clock safety, transfers, meals, and emergency checks.',
    requirements: [
      'Certified HHA/CNA or equivalent certified caregiving experience (3+ years)',
      'Substantial experience managing advanced dementia, stroke, or severe mobility issues',
      'Willingness to reside on-site in clean, private quarters during shifts',
      'Superb home management, cooking, and nutritional preparation skills',
      'Impeccable personal references and active certification logs'
    ],
    benefits: [
      'Premium live-in daily compensation rates',
      'Fully paid private room, board, and meals during on-call periods',
      'Consistent rotations (e.g. 3 days on, 4 days off) allowing for balanced lifestyle',
      'Double-time holiday pay scales',
      'Dedicated care support hotline open 24/7 for live-in emergency assistance'
    ]
  }
];

export const CORE_VALUES = [
  {
    title: 'Uncompromising Compassion',
    description: 'We treat every client like family, bringing kindness, listening ears, and genuine warmth into every single visit.'
  },
  {
    title: 'Reliability & Trust',
    description: 'Our caregivers arrive on time, fully briefed, and ready to serve. We build absolute security through consistency.'
  },
  {
    title: 'Excellence in Care',
    description: 'We invest heavily in continuous skills training, state compliance, and caregiver audits to maintain industry-leading outcomes.'
  },
  {
    title: 'Respect for Dignity',
    description: 'We respect privacy and promote full autonomy, focusing on what clients can do, rather than what they cannot.'
  }
];

export const CARE_PROCESS_STEPS = [
  {
    step: '01',
    title: 'Initial Consultation',
    description: 'Call us or request care online. Our lead care coordinator answers your initial questions and clarifies your immediate scheduling and service goals.'
  },
  {
    step: '02',
    title: 'Care Assessment',
    description: 'We conduct a free, highly thorough in-home care assessment evaluating physical mobility, safety hazards, routines, medications, and personality.'
  },
  {
    step: '03',
    title: 'Care Plan Development',
    description: 'In collaboration with family members and healthcare partners, we compile a fully personalized, medical-compliant care plan listing detailed routines.'
  },
  {
    step: '04',
    title: 'Caregiver Matching',
    description: 'We hand-select a caregiver whose training, qualifications, location, and personality match the client, facilitating a stress-free initial meeting.'
  },
  {
    step: '05',
    title: 'Ongoing Monitoring',
    description: 'We conduct regular, unannounced check-ins and review daily caregiver care logs to ensure care plans remain optimized and quality remains pristine.'
  }
];

export const BENEFITS_WORKING_WITH_US = [
  'Highly competitive, transparent pay scales with performance bonuses',
  'Flexible shifts matching your life commitments (CNAs, HHAs, Companions)',
  'Generous Paid Time Off (PTO) starting from your first month',
  'Continuous paid skills advancement and specialty credentials training',
  'Matching 401(k) retirement plan with prompt vesting schedules',
  'Health, dental, and vision benefit plans for qualified full-time personnel',
  'A supportive, family-like administrative staff that defends and values caregivers'
];
