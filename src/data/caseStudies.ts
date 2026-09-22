// Source: Pass-and-Turn Reading Assignment.pdf (AT-Investigation Course)
// Extracted manually from 43-page case study document.

export interface DiscussionQuestion {
  question: string;
  hint?: string;
  modelAnswer: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  source: string;
  category: string;
  difficulty: "foundational" | "intermediate" | "advanced";
  scenario: string;
  facts: string[];
  discussionQuestions: DiscussionQuestion[];
  analysis: {
    keyIssues: string[];
    whyItMatters: string;
    howToApproach: string[];
    commonMistakes: string[];
    conceptConnections: string[];
  };
}

export const caseStudies: CaseStudy[] = [
  {
    id: "pass-and-turn-liability",
    title: "The Passing and Turning Accident — Untangling a Three-Vehicle Liability Dispute",
    source: "Pass-and-Turn Reading Assignment (AT-Investigation Course)",
    category: "Liability",
    difficulty: "advanced",
    scenario:
      "It is approximately 5:00 pm on a rainy February evening on Highway 64, about 4 miles west of town. A Ford Explorer (your insured) slows to turn left onto Highway 17. A Chevy pickup truck, traveling in the same direction, attempts to pass the Explorer in the passing lane at the same moment. The truck strikes the Explorer in the passing lane; the Explorer is pushed sideways into a school bus that is stopped at the stop sign on Highway 17. All three drivers are injured. The Chevy truck driver is uninsured. The bus driver immediately retains an attorney. Both your insured and the truck driver blame each other completely — a textbook 'swearing match.' There are no skid marks on the wet road, and vehicle damage is consistent with both stories. Sixty days after the accident, the adjuster submits a Liability Claim Summary Report to DCM noting the investigation is at an impasse. One independent witness — a jogger named Mr. Jones — exists.",
    facts: [
      "Claim 7N50120 — insured's 2006 Ford Explorer, full coverage + UM, limits 100/300/50",
      "Accident occurred February 16, 20XX at approximately 5:00 pm, Highway 64 at intersection with Highway 17 (Smith County)",
      "Three vehicles: insured Ford Explorer (turning left), uninsured Chevy truck (passing), school bus (stopped at stop sign on Hwy 17)",
      "Weather: rain started suddenly and hard about 10 minutes before accident; roads very wet; visibility reduced to approximately 100 yards",
      "All vehicles had headlights on at time of accident",
      "No skid marks — wet road prevented tire marks",
      "School bus was stopped at stop sign on Highway 17, apparently planning to turn right onto Highway 64",
      "No students on the bus — driver only",
      "All three drivers injured; 3 Tri-County ambulances responded; Explorer driver was unconscious at scene",
      "Chevy truck driver was uninsured (lost job 6 months prior)",
      "Bus driver retained attorney Joe Smith immediately",
      "Highway Patrol investigated the scene",
      "One independent witness: Mr. Jones, jogging approximately 200 feet from the accident on the south side of Highway 64",
      "Initial witness statement: Explorer turned left in front of the Chevy that was passing it, Chevy hit Explorer, Explorer hit school bus",
      "Truck left the roadway and went through a fence into a field after the collision",
      "Initial hospital bill for bus driver: $11,584.32 with additional medical and wage losses accumulating",
    ],
    discussionQuestions: [
      {
        question:
          "Given the 'swearing match' between both drivers — and no skid marks — what are the four critical issue areas you must clarify to determine liability? Why must each one be resolved?",
        hint: "Think about speed, road markings, who had the right to be in the passing lane, and what each driver could see.",
        modelAnswer:
          "(1) Speed — Was the truck speeding? The speed limit on Highway 64 matters because a passing vehicle traveling too fast cannot safely stop if the car ahead signals a turn. (2) Intersection or not? — Texas law and most state laws prohibit passing at intersections. If Highway 17 creates a legal intersection at that point on Highway 64, the Chevy truck had no right to pass at all, shifting fault entirely to the truck. Road markings determine this — a double yellow line means no passing; dotted lines mean passing may be legal. (3) Who entered the passing lane first? — If the Explorer was already in the turn lane signaling a left turn before the truck moved to pass, the truck driver had the last clear chance to avoid the accident. (4) Visibility and notice — Did the Explorer use its turn signal? Did the truck driver have sufficient visibility to see the signal and slow down? In rain and dusk conditions, this matters enormously.",
      },
      {
        question:
          "Mr. Jones is the only independent witness. Why would a neutral third-party witness generally hold more credibility with a jury than the two drivers involved in the accident?",
        hint: "Ask yourself: what does each person have to gain or lose?",
        modelAnswer:
          "Both drivers have a direct financial and personal stake in the outcome — each wants to avoid blame for damages and injuries. Juries know this and discount their testimony accordingly. Mr. Jones, a jogger who happened to be on the road, has no financial interest in the case and nothing to gain by favoring either side. He stopped to help, called 911, and waited for police — the actions of a disinterested bystander. In court, this gives his testimony significant weight. In a 'swearing match' where physical evidence supports both stories equally, the neutral witness's account may be the deciding factor in how the jury rules.",
      },
      {
        question:
          "What does it mean to 'tie down' issues in a witness statement, and give three specific examples of facts from this case that should be locked down before the statement ends?",
        hint: "Tying down means getting exact, specific, confirmed answers — not general impressions.",
        modelAnswer:
          "'Tying down' means asking follow-up questions until the witness is committed to a precise, confirmed fact rather than a vague impression. Examples specific to this case: (1) Was the Explorer's left turn signal on? — Don't just ask once. Ask 'are you sure?' and 'could you have been mistaken?' A confirmed, repeated answer is hard to impeach later. (2) Was the Chevy truck's blinker on at any time? — A definitive 'no, I was watching closely because I thought an accident was about to happen' locks down the truck's failure to signal. (3) Exactly where was each vehicle when the Explorer's brake lights came on? — Was the truck still in the right lane? This determines who entered the left lane first and whether the truck had time to react. Vague answers leave room for defense attorneys to reframe the facts at trial.",
      },
      {
        question:
          "Five problems were identified after the initial investigation stalled: (1) unclear liability, (2) lawsuit risk, (3) insufficient investigation, (4) pressure for good-faith settlement, and (5) excess exposure. Which problem is the most urgent to solve — and does solving it make the others easier?",
        hint: "Think about which problem, if solved, would give you the clearest path forward on everything else.",
        modelAnswer:
          "Problem 3 — insufficient investigation — is the root cause of all others. If the investigation were thorough from the start, liability would be clearer (solves Problem 1). A clear liability picture reduces the urgency of early settlement (solves Problem 4) and lets the company make an informed decision about settlement value (addresses Problem 5, excess exposure). The lawsuit risk (Problem 2) is reduced when the company has a defensible position backed by a complete investigation. Nearly every downstream problem in a complex liability claim traces back to investigation quality. The first and most urgent step is always: get back to the witness and tie down every fact before the opportunity disappears.",
      },
      {
        question:
          "Based on the first witness statement, what is the initial liability picture? What key information is missing that would change the analysis?",
        modelAnswer:
          "The first statement suggests the Explorer turned left without adequate warning in front of a passing truck — implying the Explorer driver (your insured) is at fault. However, the statement is missing: (1) whether the Explorer had its turn signal on before it reached the truck — if it did, the truck should have seen it; (2) whether the accident occurred within a legal intersection (passing at intersections is typically prohibited); (3) the truck's speed — if it was doing 75 mph in a 55-60 zone, the truck may not have been able to stop regardless; (4) whether the truck used its blinker to signal the pass; (5) exactly when the truck moved into the passing lane relative to when the Explorer began its turn — this determines who had the right-of-way in that lane. Without these facts, the witness statement is incomplete, even though it exists.",
      },
    ],
    analysis: {
      keyIssues: [
        "Determining negligence in a 'swearing match' with no physical evidence requires identifying every fact the neutral witness can establish",
        "Whether the accident occurred at a legal intersection is potentially outcome-determinative — passing at intersections is typically prohibited",
        "Road markings (double yellow vs. dotted yellow) determine whether the truck had the right to pass at that location",
        "Speed of the Chevy truck (~75 mph estimated) raises questions about whether it could have stopped even with adequate warning",
        "Excess exposure — $100,000/300,000 limits with injuries to three drivers is immediately a potential excess claim",
        "The uninsured truck driver triggers potential UM coverage for the insured, adding another layer to the investigation",
        "School bus driver has counsel, adding urgency to the BI claim timeline",
      ],
      whyItMatters:
        "This case illustrates that liability determination is not just about taking statements — it's about identifying every fact that could flip the outcome and locking those facts down before the evidence window closes. A 'swearing match' is never truly a dead end if there is a neutral witness. The adjuster's job is to get the complete story from that witness before they move, forget, or become unavailable. Failing to do so — as this case shows — can result in a $450,000 verdict against your insured, a bad faith exposure of $500,000, and a UM claim on top. The cost of one detailed witness interview is nothing compared to the cost of losing the witness.",
      howToApproach: [
        "Before taking any statement, review the Liability Claim Summary Report and identify every fact that could determine negligence — then build those into your statement guide as case-specific questions",
        "Identify the neutral witness immediately and treat that statement as your highest priority — witnesses move, phone numbers change, memories fade",
        "Get second-by-second detail from the witness about each driver's movements — position, speed, signals, brake lights — and confirm each fact multiple times",
        "Determine whether the accident site is legally an intersection, which changes passing rules entirely",
        "Obtain or request the Highway Patrol report for road markings (yellow line type) at that exact location",
        "Ask about visibility, lighting, and weather conditions — they affect the standard of care for both drivers",
        "Look for additional witnesses — bystanders, tractor drivers, residents — and follow up on every lead",
        "When DCM gives you a diary directive, treat it as urgent regardless of your workload",
      ],
      commonMistakes: [
        "Stopping at the first witness statement without follow-up questions — the initial Q&A is a starting point, not a conclusion",
        "Treating a busy schedule as a reason to delay contacting the witness after a DCM directive",
        "Assuming 'no skid marks' and 'vehicle damage fits both stories' means the case is unresolvable — it means you need a better statement",
        "Underestimating how fast a witness can become unreachable — they move, change phones, or become unavailable within weeks",
        "Estimating the 'worst case' scenario too conservatively — the bus driver's case alone eventually returned a $450,000 verdict",
        "Waiting for physical evidence to emerge instead of aggressively pursuing witness testimony while it's available",
      ],
      conceptConnections: [
        "Negligence (Duty / Breach / Damage)",
        "Witness credibility",
        "Excess exposure",
        "Uninsured Motorist (UM) coverage",
        "Statement guide techniques",
        "Liability Claim Summary Report",
        "Last clear chance doctrine",
        "Good faith claims handling",
      ],
    },
  },

  {
    id: "pass-and-turn-investigation-failure",
    title: "The Witness Who Got Away — Investigation Failure, Bad Faith, and a $450,000 Verdict",
    source: "Pass-and-Turn Reading Assignment (AT-Investigation Course)",
    category: "Investigation",
    difficulty: "advanced",
    scenario:
      "Following the initial liability impasse in the passing-and-turning accident (Claim 7N50120), the DCM issues a diary request directing the adjuster to obtain a detailed second statement from the sole independent witness, Mr. Jones. The adjuster delays due to workload. When the adjuster finally tries to contact the witness, the phone is disconnected. The witness has moved — and despite 9 months of searching, the adjuster cannot locate him. Without the witness, the case goes to a jury trial. The jury finds the insured at fault and awards $450,000 in damages — $350,000 above the policy limits. Shortly after, the insured's personal (excess) attorney hires a private investigator. The PI locates the witness in 12 days. The witness's detailed second statement reveals the Chevy truck was almost certainly at fault — and that the case should have been defensible all along. The insured's attorney now makes four demands, including $500,000 for bad faith.",
    facts: [
      "DCM issued diary request directing adjuster to obtain a detailed second statement from witness Mr. Jones — adjuster delayed due to workload",
      "When adjuster finally called, witness phone was disconnected; witness had moved",
      "Adjuster searched for witness for 9 months through cell phone company, local businesses, and apartment manager — unable to locate",
      "Without witness testimony, case went to jury trial; insured found at fault by the jury",
      "Jury awarded $450,000 in damages (policy limits: $100,000 — $350,000 in excess exposure)",
      "Insured's personal attorney hired private investigator after the verdict",
      "PI located witness in just 12 days",
      "Second statement (PI-taken) revealed: Explorer had left blinker on at 200+ feet from intersection; Explorer brake lights activated at 150 feet; Explorer was already in turn lane when truck moved over",
      "Truck had NO blinker at any time during the incident; truck was 100% in right lane when Explorer's signals were already on",
      "Truck was traveling approximately 75 mph; did not appear to slow down until 2-3 seconds before impact",
      "Accident occurred at an actual intersection — Highway 17 — where passing is typically prohibited",
      "Witness observed possible open beer cans inside the Chevy truck",
      "Witness confirmed Explorer would not have hit bus if not struck by truck first",
      "Truck had an out-of-state tag — driver may have been unfamiliar with the intersection",
      "Bus driver medical bills: $16,362.12 + lost wages $3,529; bus driver's case alone resulted in the $450,000 verdict",
      "Insured's excess attorney issued four demands: (1) Pay full $450,000 verdict including excess; (2) Do not reflect payments against insured's policy; (3) Pay $100,000 UM limits since truck driver was at fault; (4) Pay attorney fees + $500,000 for failure to conduct proper and timely investigation",
    ],
    discussionQuestions: [
      {
        question:
          "The DCM directed the adjuster to take a detailed second witness statement. What should the adjuster have done — and within what timeframe — after receiving that directive?",
        hint: "How fast can a witness become unreachable? What is the cost of a one-week delay vs. the cost of a $450,000 verdict?",
        modelAnswer:
          "The adjuster should have contacted Mr. Jones within 24–48 hours of receiving the DCM's directive — the same day if possible. In a complex liability case with a single independent witness, that witness IS the case. Witnesses move, phone numbers change, memories fade, and life continues. A one-week delay to prioritize other claims may seem reasonable in the moment, but the potential consequences — as this case shows — are catastrophic. When DCM identifies a specific, urgent action item, it becomes the adjuster's top priority. The adjuster should have set aside other work, called immediately, scheduled an in-person interview if needed, and confirmed the appointment in writing.",
      },
      {
        question:
          "Compare the two witness statements in this case. What five critical facts did the first statement miss that the PI's second statement revealed?",
        hint: "Focus on signals, lane position, speed, and who entered the left lane first.",
        modelAnswer:
          "(1) The Explorer had its left turn signal on at least 200 feet before the intersection — which means the truck driver had advance notice the Explorer was turning. (2) The Explorer was already in the left turn lane when the truck made its move — establishing that the truck entered the passing lane AFTER the Explorer had signaled and slowed. (3) The Chevy truck never turned on its blinker at any time — no signal, no warning before passing. (4) The truck was traveling approximately 75 mph and showed NO sign of slowing until 2–3 seconds before impact — the truck had the last clear chance and failed to take it. (5) The accident occurred at a legal intersection (Highway 17), where passing is typically prohibited by law — meaning the truck had no right to pass there at all. These five facts combined flip the liability from the Explorer to the Chevy truck.",
      },
      {
        question:
          "After the $450,000 verdict, the insured's personal attorney makes four demands. Which demand is legally the most significant and why — and could it have been avoided?",
        hint: "One demand has nothing to do with the original accident value. It's about how the claim was handled.",
        modelAnswer:
          "The most significant demand is #4 — $500,000 for failing to conduct a proper and timely investigation (bad faith). This demand is not based on the value of the accident itself; it's based on the insurance company's conduct. Bad faith exposure exists when an insurer fails to fulfill its duty to properly defend its insured, investigate the claim, or act in the insured's best interest. By letting the witness become unreachable, the company lost the ability to defend the case — and the insured suffered a $350,000 excess verdict as a result. The bad faith demand directly targets the investigation failure and can easily exceed the underlying claim value. Demand #3 (UM limits) is also significant because the truck driver's fault, confirmed by the second witness statement, entitles the insured to UM benefits — which should have been identified and paid early in the claim. Both could have been avoided with a timely, thorough investigation.",
      },
      {
        question:
          "In the end, was it more or less work — and more or less stressful — to handle this claim poorly vs. handling it thoroughly from the start? What does this tell you about investigation quality?",
        modelAnswer:
          "Dramatically more work and more stress. The adjuster spent 9 months trying to locate a witness who the PI found in 12 days. A jury trial was litigated. A $450,000 verdict was returned. Four separate legal demands — including $500,000 bad faith — were filed. The company now faces potential liability of over $1 million. A thorough investigation at the start would have meant: one detailed witness statement taken within days, a clear liability picture that favored the insured (Explorer), a defensible BI claim against the uninsured truck driver, timely UM payment to the insured, and likely a settlement for a fraction of the verdict. The cost of one proper witness statement is hours. The cost of not getting it was everything in this case. Quality investigation is not optional for complex claims — it is the foundation of everything that follows.",
      },
      {
        question:
          "The PI found the witness in 12 days that the adjuster couldn't find in 9 months. What does this tell you about investigation resources and approach — and how should you handle a 'missing' witness before concluding they're untraceable?",
        modelAnswer:
          "It tells us the witness was findable all along — the adjuster simply didn't use the right methods or didn't prioritize the search. A private investigator has specialized tools and techniques: skip tracing, credit bureau inquiries, social media searches, neighborhood canvassing, contacting former employers and landlords, DMV records. Before concluding a witness is 'missing,' an adjuster should exhaust all available resources — or escalate to SIU or a professional investigator. In high-stakes claims where a witness is the deciding factor in liability, hiring a PI is a small expense against the potential exposure. The case also suggests the adjuster may not have pursued the search with sufficient urgency or creativity. If a witness matters to the case outcome, treat finding them as a mission-critical assignment — not a background task.",
      },
    ],
    analysis: {
      keyIssues: [
        "Investigation timing — once a witness becomes unreachable, critical evidence may be permanently lost",
        "DCM directives are priority assignments — delaying them can constitute bad faith if the delay causes harm to the insured",
        "The difference between a first witness statement and a detailed, follow-up statement can be the difference between winning and losing at trial",
        "Bad faith exposure can exceed the underlying claim value when investigation failures directly harm the insured",
        "UM benefits — when the at-fault third party is uninsured, the insured's own UM coverage must be actively considered",
        "Excess exposure begins the moment a claim's likely value exceeds the policy limits — and must trigger immediate action",
        "Comparing statement #1 (adjuster) with statement #2 (PI) reveals how much a skilled, thorough interviewer can extract vs. a rushed, checklist-driven approach",
      ],
      whyItMatters:
        "This case is the clearest possible illustration of why investigation quality is not optional. The adjuster did not do anything dramatically wrong — they were busy, they tried to find the witness, they followed up when they could. But in a case where one witness holds the key to a $450,000 exposure, 'reasonably busy' is not good enough. The system of diary requests, priority assignments, and DCM oversight exists exactly for situations like this. Every adjuster will face a claim where the investigation feels hard or inconvenient. This case shows what happens when that inconvenience is allowed to become inaction — and what it costs the insured, the company, and ultimately everyone involved.",
      howToApproach: [
        "Treat DCM diary directives as immediately actionable — not as items for a weekly to-do list",
        "When a witness is identified as critical, contact them the same day — confirm their address and phone before hanging up",
        "If a witness's phone is disconnected, begin skip tracing immediately: apartment manager, previous employer, family, social media, DMV records",
        "When internal resources fail, escalate to a professional investigator early — the cost is trivial compared to potential excess exposure",
        "Identify and document excess exposure from day one so leadership can monitor and intervene",
        "When the third party is uninsured, evaluate UM coverage simultaneously with liability — the insured may be owed benefits regardless of who is at fault",
        "Build your statement guide with case-specific questions before every interview — don't rely on the generic guide alone",
        "Count your questions and follow-ups after every statement: if a PI later asks twice as many, your investigation was incomplete",
      ],
      commonMistakes: [
        "Prioritizing current workload over a time-sensitive DCM directive on a high-exposure file",
        "Concluding a witness is 'untraceable' after standard phone attempts without escalating to investigative resources",
        "Failing to recognize when excess exposure should trigger heightened investigation urgency",
        "Underestimating bad faith exposure — believing the company's only liability is the policy limits when investigation failures exist",
        "Taking a first witness statement and treating it as 'done' — the first statement is the beginning of the interview, not the end",
        "Not investigating UM coverage potential when the adverse driver is uninsured",
        "Confusing 'I tried to find the witness' with 'I did everything reasonably possible to find the witness'",
      ],
      conceptConnections: [
        "Good faith claims handling",
        "Bad faith exposure",
        "Excess exposure",
        "Uninsured Motorist (UM) coverage",
        "Statement guide techniques",
        "DCM diary management",
        "Skip tracing / SIU resources",
        "Negligence (Duty / Breach / Damage)",
        "Witness credibility",
        "Investigation timeline urgency",
      ],
    },
  },
];
