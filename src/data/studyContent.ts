export interface StudyCard {
  id: string;
  term: string;
  definition: string;
  category: string;
  example?: string;
}

export interface StudySection {
  id: string;
  title: string;
  summary: string;
  keyPoints: string[];
  cards: StudyCard[];
}

export const studySections: StudySection[] = [
  {
    id: "purpose",
    title: "Purpose of Investigations",
    summary: "Investigations gather information needed to process claims. Your investigative function is to report facts based on statements, field observations, physical facts, and photographs.",
    keyPoints: [
      "INVESTIGATION means obtaining information you did not have at the time of the loss.",
      "The Four W's: Who, When, Where, Why (and What happened)",
      "Every investigation must address: Coverage, Liability, and Damages",
      "Speed, Accuracy, and Timeliness are the three requirements of investigation",
    ],
    cards: [
      {
        id: "p1",
        term: "The Four W's of Investigation",
        definition: "Who was involved? When did the accident occur? Where did it happen? Why did it occur? (What happened is also addressed.)",
        category: "Purpose",
      },
      {
        id: "p2",
        term: "Three Elements Every Investigation Must Cover",
        definition: "1. Coverage — Is the loss covered under the policy? 2. Liability — Who is legally responsible? 3. Damages — What is the extent of the loss?",
        category: "Purpose",
      },
      {
        id: "p3",
        term: "Requirements of Investigation",
        definition: "Quickness (speed), Accuracy, and Timeliness. The adjuster must act promptly — evidence disappears, memories fade, and witnesses become unavailable.",
        category: "Purpose",
      },
    ],
  },
  {
    id: "coverage",
    title: "Coverage Investigation",
    summary: "Before paying any claim, the adjuster must determine whether the loss is covered under the policy. Coverage questions must be resolved immediately when they arise.",
    keyPoints: [
      "Ask: Is this the right insured and the right accident reported under the policy?",
      "Check effective dates, exclusions, conditions, and any endorsements",
      "A Non-Waiver Agreement protects the company's right to deny coverage while still investigating",
      "Permissive Use: The policy may cover drivers using the vehicle with the named insured's permission",
      "Typical coverage problems: false declaration, facts outside policy scope, breach of conditions, premature use of coverage",
    ],
    cards: [
      {
        id: "c1",
        term: "Non-Waiver Agreement",
        definition: "A document signed by the insured that allows the company to continue investigating without waiving (giving up) any coverage defenses. Used when a coverage question arises.",
        category: "Coverage",
        example: "If the adjuster is unsure whether the accident falls within policy coverage, a Non-Waiver Agreement lets the company investigate while preserving the right to deny.",
      },
      {
        id: "c2",
        term: "Permissive Use",
        definition: "Insurance coverage may extend to a driver other than the named insured if that person was using the vehicle with the insured's express or implied permission at the time of the accident.",
        category: "Coverage",
        example: "The insured's friend borrowed the car with permission. The friend's accident may be covered under the insured's policy.",
      },
      {
        id: "c3",
        term: "Typical Coverage Problems",
        definition: "1. False declaration — insured lied on the application. 2. Facts don't fall within scope of contract. 3. Breach of conditions (e.g., failure to report timely). 4. Premature use of coverage (accident before effective date).",
        category: "Coverage",
      },
      {
        id: "c4",
        term: "Immediate Importance of Coverage Investigation",
        definition: "When a coverage question arises at first report, the adjuster must immediately decide to: (1) Accept, handle and investigate the claim, or (2) Issue a Non-Waiver Agreement and investigate to determine if coverage applies.",
        category: "Coverage",
      },
    ],
  },
  {
    id: "sources",
    title: "Sources of Information",
    summary: "In a typical accident, you may be contacting the following persons in the order of importance: the insured, third party, passengers, police officer, pre-occurrence witnesses, tow truck operators, ambulance drivers, doctors, hospital records, and post-occurrence witnesses.",
    keyPoints: [
      "FIRST: Contact the insured (your policyholder) — get their version immediately",
      "SECOND: Contact the claimant(s) — make initial contact with the injured party",
      "THIRD: From the claimant, learn of other passengers who are potential claimants",
      "FOURTH: Contact all potential claimants and any independent witnesses",
      "FIFTH: Examine the scene and compare physical evidence with statements",
      "Priorities can CHANGE based on circumstances — always re-evaluate",
      "Dress, tone, and appearance are important tools when you call upon persons",
    ],
    cards: [
      {
        id: "s1",
        term: "First Priority: The Insured",
        definition: "Generally, contact the insured first or as soon as possible. The initial report gives you the insured's version while the details are still fresh. Appointment can be made to get full detail later.",
        category: "Sources",
      },
      {
        id: "s2",
        term: "Second Priority: The Claimant",
        definition: "Make initial contact with the claimant (injured party). This gives you an opportunity to: hear their version, get a medical authorization, and assess the nature of injuries and damages.",
        category: "Sources",
      },
      {
        id: "s3",
        term: "Changing Priorities",
        definition: "If the insured has purchased only liability coverage and there is a good chance the claimant will attempt to tie them as a 'Target Defendant,' you should immediately reprioritize investigation.",
        category: "Sources",
      },
      {
        id: "s4",
        term: "Police Report Contents",
        definition: "Date, time, and place of accident; traffic density; names/addresses of all persons involved; description of each driver; weather, lighting, and road conditions; description of damage; whether alcohol use is indicated; any charges filed.",
        category: "Sources",
      },
      {
        id: "s5",
        term: "Weather Reports",
        definition: "Information from local weather stations, published daily for all localities. Important factors: wind velocity, temperature, precipitation at various times, cloudiness, glare, sunrise and sunset times.",
        category: "Sources",
      },
      {
        id: "s6",
        term: "Coroner's Report",
        definition: "In fatal accident cases, a coroner's report can provide: description of injuries, history of the accident, probable cause of death, and recommendations for charges against the culpable party. Adjusters must be cautious about having the insured testify without consulting counsel.",
        category: "Sources",
      },
      {
        id: "s7",
        term: "Autopsy Report",
        definition: "Available in some fatal cases to determine if death was caused by injury sustained in the accident or by natural causes (e.g., heart attack that precipitated the accident). Usually available for payment of a small fee.",
        category: "Sources",
      },
      {
        id: "s8",
        term: "Motor Vehicle Records (MVR)",
        definition: "Available from the state; a separate filing from the police report. Contains information about drivers, vehicles, and registration. The Underwriting Department uses MVRs to evaluate risk.",
        category: "Sources",
      },
      {
        id: "s9",
        term: "Laboratory Tests",
        definition: "Blood tests can establish the presence of alcohol. Usually taken at time of arrest or at the hospital immediately after the accident. Time is critical — blood alcohol diminishes over time. An adjuster may request copies with proper authorization.",
        category: "Sources",
      },
    ],
  },
  {
    id: "evidence",
    title: "Obtaining Physical Evidence",
    summary: "Physical evidence is objective — it speaks for itself and is not subject to manipulation. The adjuster must get to the accident scene quickly because conditions change rapidly.",
    keyPoints: [
      "Physical evidence: all physical conditions at the scene + all vehicles/objects involved",
      "SPEED is critical — skid marks fade, debris is cleared, snow melts, buildings are repaired",
      "Evidence must be preserved through documentation and photos as soon as possible",
      "Standard investigative equipment: tape measure, camera with flash, ruler/accident template, flashlight, pen/pencil/paper, recorder, authorization forms",
      "Chain of custody must be maintained for any physical object retained as evidence",
    ],
    cards: [
      {
        id: "e1",
        term: "Physical Evidence — Definition",
        definition: "1. All physical conditions at the scene of an accident, and 2. All vehicles, machinery, or objects involved in an accident. It is objective evidence not subject to manipulation.",
        category: "Physical Evidence",
      },
      {
        id: "e2",
        term: "Uses of Photographs (Key Examples)",
        definition: "1. Demonstrate skid marks, debris, and gouge marks. 2. Determine point of contact. 3. Depict final resting place of vehicles. 4. Depict damage to vehicles. 5. Show automatic direction of opposing forces. 6. Show position of witnesses. 7. Show traffic controls. 8. Depict the accident scene. 9. Aid in accident reconstruction.",
        category: "Physical Evidence",
      },
      {
        id: "e3",
        term: "Chain of Custody",
        definition: "The unbroken sequence of testimony linking a physical object to the accident under investigation. Every person who had custody of the object must be able to testify how they came into possession of it. Critical when objects may be used as evidence in court.",
        category: "Physical Evidence",
      },
      {
        id: "e4",
        term: "Diagrams",
        definition: "A diagram of the accident scene can be used as a learning instrument, an effective way to make statement witnesses, and can be used at trial. Typically include: course/direction of cars, observations of the driver, all measurements, skid marks, posted speed, traffic controls, and names of streets. May be prepared without a scale if time/resources are limited.",
        category: "Physical Evidence",
      },
      {
        id: "e5",
        term: "Accident Reconstruction",
        definition: "A specialized procedure requiring knowledge of: impressions of tires on various surfaces, directions of travel, impact of brakes on tires and fluid marks, direction of debris, and sources of injury to passengers. A supervisor must generally approve the use of a reconstruction expert.",
        category: "Physical Evidence",
      },
      {
        id: "e6",
        term: "Expert Witnesses",
        definition: "An expert in accident investigation is someone who can give opinion testimony. They must have: proper credentials, experience in the field, and the ability to express themselves clearly. They can be used to determine the damage, nature of the defect, or whether reconstruction witnesses are telling the truth.",
        category: "Physical Evidence",
      },
      {
        id: "e7",
        term: "Examination of Instrumentalities",
        definition: "When a mechanical defect is alleged as the cause of an accident, the adjuster must examine the instrumentality (e.g., faulty brakes). A good adjuster has a general working knowledge of the instrumentality to properly assess it.",
        category: "Physical Evidence",
      },
    ],
  },
  {
    id: "liability",
    title: "Liability",
    summary: "Liability is the claim made against the insured. To establish liability, four elements must be present: duty, breach, causation, and damages.",
    keyPoints: [
      "Liability = the legal obligation owed to another party",
      "Four elements: (1) The amount owed, (2) The accident resulted from negligence, (3) The amount assumed by rule of law, (4) The claim is actionable due to the relationship of parties",
      "Damages = the extent of the loss (bodily injury, property damage, special/general damages)",
      "The adjuster must be proactive — delay in contacting claimant can allow them to build their case",
      "Negligence must be proven: duty + breach + causation + harm",
    ],
    cards: [
      {
        id: "l1",
        term: "Liability — Definition",
        definition: "Liability relates to the claim made against the insured. It establishes the probability of a successful defense. The adjuster must determine whether there is negligence or commission by the insured.",
        category: "Liability",
      },
      {
        id: "l2",
        term: "Four Elements Needed for a Successful Liability Claim",
        definition: "1. The amount owed. 2. The accident is the result of negligence or commission. 3. The amount assumed by rule of law (e.g., statute). 4. The claim is actionable because of the relationship of parties.",
        category: "Liability",
      },
      {
        id: "l3",
        term: "Negligence",
        definition: "Failure to exercise the care that a reasonably prudent person would exercise under similar circumstances. Must establish: duty of care, breach of that duty, causation (breach caused the harm), and actual damages.",
        category: "Liability",
      },
      {
        id: "l4",
        term: "Mechanical Failure Defense",
        definition: "A driver is not responsible for accidents caused by a sudden, unforeseeable mechanical failure. However, if the driver knew or should have known of the defect, they may be found negligent for driving anyway. Investigation should determine if the failure was sudden vs. gradual.",
        category: "Liability",
      },
    ],
  },
  {
    id: "claimtypes",
    title: "Types of Claims & Investigation Steps",
    summary: "Different types of claims require specific investigation steps. The adjuster must know the proper procedure for each claim type.",
    keyPoints: [
      "Medical Payments Coverage: pays regardless of fault; adjuster secures medical authorizations",
      "Total Loss: get insured statement → estimate if borderline → determine salvage value → determine ACV → settle protecting lienholder",
      "Theft: verify police report filed → identify vehicle → check for prior claims → establish ACV",
      "Bodily Injury: secure medical records, interview all parties, photograph scene and damages",
      "Workers Comp: verify employment status (employee vs. independent contractor), determine course and scope",
      "Property Loss: similar to auto but also involves mortgagees and building inspectors",
    ],
    cards: [
      {
        id: "ct1",
        term: "Medical Payments Coverage",
        definition: "Covers medical expenses regardless of fault. Adjuster steps: (1) get statement from injured insured, (2) insured should be assessed by a doctor, (3) medical report from the doctor, (4) medical bills to doctor, (5) send medical bills to company, (6) obtain subrogation receipt, if applicable.",
        category: "Claim Types",
      },
      {
        id: "ct2",
        term: "Accidental Death Benefit Claims",
        definition: "Death must be due solely and completely to the injury sustained in the accident. Steps: (1) Secure death certificate, (2) Secure medical payments receipt (if required), (3) Issue draft to next of kin or administrator as provided by the contract.",
        category: "Claim Types",
      },
      {
        id: "ct3",
        term: "Disability Benefits",
        definition: "Usually tied with medical payments coverage or 'no-fault' coverage. If the claimant is unable to work, the adjuster would require: (1) a medical report indicating the claimant is unable to work, (2) arrangements as to whether payments will be made weekly, bi-monthly, or monthly.",
        category: "Claim Types",
      },
      {
        id: "ct4",
        term: "Total Loss Claims — Steps",
        definition: "1. Get statement from insured about vehicle condition. 2. Secure estimate or confirm if borderline total loss. 3. Determine salvage value. 4. Determine actual cash value (ACV) using: local dealers, NADA book, or valuation service. 5. Settle total loss protecting the lien holder. 6. Secure title and/or bill of sale endorsed by insured. 7. Arrange for sale of salvage per company policy. 8. Secure subrogation receipt if subrogation is involved.",
        category: "Claim Types",
      },
      {
        id: "ct5",
        term: "Theft Loss — Key Steps",
        definition: "1. Identify vehicle through title papers and registration. 2. Get insured statement about vehicle condition, identifying marks, and all equipment. 3. Check that theft has been reported to state AND local police. 4. Check if insured needs to sign a John Doe warrant. 5. Check change of title from original dealer. 6. Establish actual cash value (NADA or local dealers). 7. Consider early settlement vs. waiting the 30-day 'loss of use' period.",
        category: "Claim Types",
      },
      {
        id: "ct6",
        term: "Bodily Injury & Property Damage Investigation",
        definition: "A person has a cause of action if: (1) A duty existed, (2) Breach of that duty occurred, (3) Tangible damages resulted from the error. Investigation steps include: statements of all parties, photos of scene and vehicles, police report, witness statements, medical records, property estimates.",
        category: "Claim Types",
      },
      {
        id: "ct7",
        term: "Animal Collision Losses",
        definition: "From a liability claim standpoint, animal collision presents a 'negligence' issue. Steps: (1) Determine number and location of animals, (2) Determine if animals are domesticated or wild, (3) Establish if insured attempted to brake, (4) Are there specific fences preventing animals from straying? (5) Investigate the accident to determine any negligence.",
        category: "Claim Types",
      },
      {
        id: "ct8",
        term: "Workers Compensation Investigation",
        definition: "Coverage provided to employees injured in the course of employment. Key steps: (1) Verify employment category (employee vs. independent contractor), (2) Determine if the accident falls within course and scope of employment, (3) Get statements from the insured and employee, (4) Get medical details, (5) Establish whether the injury was the result of negligence, (6) Get full details regarding wages and compensation rate.",
        category: "Claim Types",
      },
      {
        id: "ct9",
        term: "Employee Liability Investigation",
        definition: "For each claim: (1) Determine employment relationship — confirm there is no 'independent contractor' relationship. (2) Get statements from insured and employee, as well as witnesses. (3) If machinery was involved, determine if all guards and protective devices were in place. (4) Photograph the machine. (5) Determine if Workers Comp might also be involved.",
        category: "Claim Types",
      },
    ],
  },
  {
    id: "damages",
    title: "Investigation of Damages",
    summary: "Damages are the quantifiable loss sustained by the claimant. The adjuster must investigate all categories of damages thoroughly and verify each one.",
    keyPoints: [
      "Special Damages: out-of-pocket, itemizable expenses (medical bills, lost wages, property damage)",
      "General Damages: non-economic losses (pain and suffering, permanent disability, loss of consortium)",
      "Medical Expense: bills must be verified — ambulance, hospital, doctors, nursing, drugs, equipment, travel",
      "Loss of Income: obtain income tax records, employer verification; watch for self-employed claimants who may not accurately report income",
      "Property Damage: reliable estimates, actual loss of rental value, loss of use of personal property, diminution in value",
      "General Damages: consider marital status, dependency status, work expectancy, permanent disability, pain and suffering",
    ],
    cards: [
      {
        id: "d1",
        term: "Special Damages",
        definition: "Out-of-pocket expenses that can be itemized. Examples: medical bills, lost wages, property damage repair, rental car costs, medication. These are verifiable and quantifiable losses.",
        category: "Damages",
      },
      {
        id: "d2",
        term: "General Damages",
        definition: "Non-economic losses that are harder to quantify. Include: pain and suffering, permanent disability, loss of consortium (companionship), mental anguish. The investigation should establish: marital status, life expectancy, work expectancy, and whether the disability is permanent.",
        category: "Damages",
      },
      {
        id: "d3",
        term: "Medical Expense Verification",
        definition: "The adjuster should obtain authorization from the claimant to get medical information. Medical sources include: ambulance, emergency room visits, treating physicians, hospital records, nursing home, medications, and travel. The medical history for the last 5+ years is relevant.",
        category: "Damages",
      },
      {
        id: "d4",
        term: "Loss of Income",
        definition: "Must be determined through: employer contact, income tax records, and records of accounts. For self-employed claimants: watch for someone who does not hire a replacement while allegedly disabled — this may indicate the claim is exaggerated. The net 'take-home' pay is what is typically owed, not gross.",
        category: "Damages",
      },
      {
        id: "d5",
        term: "Property Damage (Real Property)",
        definition: "Reliable estimates of physical loss must be obtained. Factors: Loss of rental value during repair period, loss of use of personal property, storage fees, and possible diminution in value after repairs.",
        category: "Damages",
      },
      {
        id: "d6",
        term: "Activity Investigation",
        definition: "If a claimant alleges disability, the adjuster may conduct an activity investigation (surveillance) to determine the present condition of the claimant. The investigation could include: candid video/photography of daily activities, social media monitoring, and confirmation of disability from treating physicians.",
        category: "Damages",
      },
    ],
  },
  {
    id: "underwriting",
    title: "Reporting to Underwriting",
    summary: "One important duty of the claims adjuster is to report to the underwriting department any information that might affect the desirability of the risk or the adequacy of the premium.",
    keyPoints: [
      "Five categories of deficiencies must be reported to underwriting",
      "It is NOT the claim department's job to recommend cancellation — only to report facts",
      "Underwriter decides whether to retain or cancel the policy based on the information",
    ],
    cards: [
      {
        id: "u1",
        term: "1. Physical Defects (Report to Underwriting)",
        definition: "A. Poor condition of automobile or buildings. B. Defects of equipment (brakes, headlights, defective mechanism). C. Improper equipment. D. Machinery safeguards not being used or not provided.",
        category: "Underwriting",
      },
      {
        id: "u2",
        term: "2. Moral Hazards (Report to Underwriting)",
        definition: "A. Reputation for speeding, reckless driving, or criminal background. B. Police record. C. Intoxication. D. Collusion. E. Fraudulent acts or false statements. F. Illegal operation of vehicles, elevators, machinery, or equipment.",
        category: "Underwriting",
      },
      {
        id: "u3",
        term: "3. Physical Infirmities (Report to Underwriting)",
        definition: "Discovery of physical infirmities manifest subsequent to the issuance of a driver's license and/or failure of a driver having a restrictive license to use corrective devices. Examples: A. Glasses required but not used for poor eyesight or partial blindness. B. Insured or driver physically incapable of driving safely.",
        category: "Underwriting",
      },
      {
        id: "u4",
        term: "4. Matters Affecting Premium (Report to Underwriting)",
        definition: "A. Undisclosed drivers. B. Unusual traveling distance. C. Principal location of garaging of automobiles. D. Operation (business vs. personal use).",
        category: "Underwriting",
      },
      {
        id: "u5",
        term: "5. Other Hazards (Report to Underwriting)",
        definition: "A. Accident frequency or excessive traffic violations. B. Poor training or attitude of drivers/employees. C. Improper vehicle used to transport employees. D. Gross negligence or wanton disregard in accident under investigation. E. Improper registration or no driver's license. F. Catastrophe hazard (transporting butane gas, sulfur, dynamite, fire trap). G. Non-cooperation. H. Employment of minors. I. Occupational disease exposure.",
        category: "Underwriting",
      },
    ],
  },
];

export const allCards = studySections.flatMap((s) => s.cards);
