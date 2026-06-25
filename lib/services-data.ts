/**
 * lib/services-data.ts — structured per-service catalog for /services + /services/[slug] routes.
 *
 * Every prose field below is poured VERBATIM from CONTENT.md
 * (`/Users/jonasvangura/sites/holistic-v6/CONTENT.md`). Build-engineer does not paraphrase.
 *
 * Voice-anchor budget for F3.3 (per dispatcher):
 *   Mind · Body · Soul, Preventive Medicine → 0 (cap reached on home)
 *   have a Blessed Day, heal & restore, Family Wellness Clinic, BEST CLIENTS in the World → 0
 *     (reserved for /about etc. in F3.4)
 *   → service pages contain ZERO voice anchors. If CONTENT.md service blocks include any
 *     anchor, strip it on render.
 *
 * Regulatory flags map to wellness disclaimers per content-strategist.md:
 *   ZYTO        → "Not a medical diagnostic test."
 *   Thermography→ "Adjunctive tool only — not a replacement for mammography or any clinically indicated imaging."
 *   Bach Flowers→ "Wellness practice — not a treatment for clinical mental-health conditions."
 *   OlyLife PEMF→ "Wellness session only — not FDA-evaluated as a medical intervention."
 *   Ultrasound  → "Direct-to-consumer wellness screening — not a substitute for clinically indicated imaging."
 *   doTERRA EOs → "Wellness/lifestyle use — not medicine."
 *   Ionic Foot Bath → "Relaxation modality — not a medical detoxification."
 */

export type ServiceStep = { title: string; body: string };
export type ServiceFAQ = { q: string; a: string };
export type ServiceExpectation = { label: string; body: string };

export type ServicePricing = {
  historical?: string;
  current: string;
  typical?: string;
};

export type ServiceRelated = { slug: string; title: string; reason: string };

export type ServiceSpec = {
  slug: string;
  name: string;
  shortName: string;
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  hero: {
    headline: string;
    sub: string;
    image: string;
  };
  whatItIs: string[]; // multiple paragraphs
  howItWorks: ServiceStep[];
  howItWorksLeadIn?: string;
  whatToExpect: ServiceExpectation[];
  pricing: ServicePricing;
  faqs: ServiceFAQ[];
  smallNote?: { title: string; body: string };
  related: ServiceRelated[];
  readyToBook: { heading: string; body: string };
  regulatoryDisclaimer?: string;
};

export const SERVICES: ServiceSpec[] = [
  // ─────────────────────────────────────────────────────────────────────────────
  // 1. ZYTO Wellness Scan
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: "zyto-wellness-scan",
    name: "ZYTO Wellness Scan",
    shortName: "ZYTO Scan",
    metaTitle: "ZYTO Scan Louisiana — Holistic Medspa, Cut Off LA",
    metaDescription:
      "A bioenergetic ZYTO Balancer scan with Toya in Cut Off, Louisiana. A 20-page snapshot of where your body's stress signals are loudest right now. Not a diagnosis — a starting map.",
    primaryKeyword: "ZYTO scan Louisiana",
    hero: {
      headline: "A 20-page snapshot of where your body's stress signals are loudest right now.",
      sub: "Not a diagnosis. A starting map.",
      image: "/media/services/service-naturopathy-consultation.jpg",
    },
    whatItIs: [
      "The ZYTO Balancer is a hand-scanner that measures the body's responses to a series of digital “stimulus” signals — roughly 200 of them — through a galvanic-skin-response cradle. You rest your hand on the scanner for the duration of the reading. The software then compiles those responses into a report covering six body-system categories.",
      "The report we hand you covers: gastrointestinal, immune, lymphatic, mental and emotional stress, respiratory, and sleep. Each section flags which signals returned in stronger or weaker patterns relative to baseline, presented as bar graphs and brief commentary. None of those categories implies an underlying medical condition — they describe the body's response patterns to the stimulus prompts on that day.",
      "The scan is a bioenergetic wellness tool. It is not a medical diagnostic test. It does not detect, identify, treat, cure, or prevent any disease. What it offers is a structured way to think about which body systems may benefit from extra support — and which lifestyle, dietary, or herbal practices might be worth a conversation. That conversation happens with Toya after the scan, sitting with the report between you.",
      "The ZYTO Balancer is one of several bioenergetic wellness devices used in the broader wellness-practitioner community. We were one of the early local adopters when we opened in 2020. Over five years of running these scans for returning clients, the most common feedback we hear is that the printed report gives people a concrete artifact to think with — something to bring to a follow-up consultation, something to compare against in six months, something more than a verbal summary of a single conversation.",
    ],
    howItWorks: [
      {
        title: "Set the question.",
        body: "Toya asks what you'd most like the scan to focus on — overall body systems, a specific area you're curious about, or a baseline read. There is no wrong answer here. People come in asking everything from “I just want a general sense of where I'm at” to “my sleep has been off for two months and I'd love a structured way to think about it.”",
      },
      {
        title: "Rest your hand on the scanner.",
        body: "The session itself takes only a few minutes. You sit, hand on the cradle, while the device cycles through its prompts. Most people find the position comfortable; you can rest your other hand, your feet, your phone — there is no required posture beyond keeping your scanning hand still on the cradle.",
      },
      {
        title: "Walk through the report together.",
        body: "We print the report, sit down, and Toya walks you through the bar graphs section by section. The walkthrough is the longest part of the visit and the most useful. You will leave with the printout and notes on which areas might benefit from a follow-up — herbal options, dietary shifts, or other services like lymphatic drainage or sauna.",
      },
    ],
    whatToExpect: [
      { label: "Duration", body: "roughly 20-30 minutes for the scan and walkthrough combined. The reading itself is fast; the conversation around the report is the part that takes the time." },
      { label: "Downtime", body: "none. You can eat, drink, drive, work normally before and after." },
      { label: "Sessions", body: "one scan gives you a snapshot. People who use ZYTO ongoing tend to rescan every few months to see how their patterns shift as they adjust their wellness routine. There is no minimum cadence. Some people scan once, take the report home, and never return for a follow-up scan — that is also a complete use of the service." },
      { label: "Results timeline", body: "the report is in your hand the same visit. Any decisions about what to do next happen at your pace. We will never pressure you toward a follow-up service in the same session; if you want to take the report home and think about it for a week, that is the answer." },
      { label: "What to wear", body: "anything comfortable. The scan involves only your hand on the cradle." },
      { label: "What to bring", body: "your medication and supplement list (useful context for the walkthrough), and any notes about specific wellness questions you'd like the conversation to cover." },
    ],
    pricing: {
      historical: "$99 per scan (2020 Grand Opening flyer).",
      current: "Call or text (985) 278-6087 to confirm the 2026 rate.",
      typical:
        "Comparable ZYTO scans in the U.S. wellness market typically run $75-$150 per session, often with discounts on packaged follow-ups. Our 2020 published rate sat near the lower end of that range, which has been characteristic of our pricing model since the founding — we keep the door wide enough that the people who need this most can actually afford to walk through it.",
    },
    faqs: [
      { q: "Is this a medical test?", a: "No. The ZYTO scan is a bioenergetic wellness assessment, not a medical diagnostic test. It does not identify, treat, cure, or prevent any disease. Always follow up with your medical provider for medical concerns." },
      { q: "Can it tell me if I have a condition?", a: "No. The report shows patterns of response across six body-system categories. Those patterns may suggest which areas of your wellness routine are worth attention. They are not medical findings and they are not a substitute for clinical evaluation." },
      { q: "How long does the actual scan take?", a: "The reading itself takes only a few minutes. The full visit, including the walkthrough of the printed report, runs roughly 20-30 minutes." },
      { q: "Do I need to do anything to prepare?", a: "Come hydrated. Eat normally. Wear comfortable clothing. No fasting or supplement-pausing required. We have had clients come straight from work, straight from a workout, and straight from breakfast — all are fine." },
      { q: "What do I take home?", a: "A printed report of the scan (covering gastrointestinal, immune, lymphatic, mental/emotional, respiratory, and sleep responses) plus any notes from the walkthrough. You decide what — if anything — to do next." },
      { q: "Can I rescan?", a: "Yes. Many clients return after 8-12 weeks of changes to compare. The two-report comparison is often where the most interesting conversations happen, because patterns of response have time to shift in the time between visits. There is no obligation to rescan; the choice is yours." },
      { q: "Is this covered by insurance?", a: "No. Wellness scans are not insurance-billed and we are not a medical clinic. Payment is at the time of service." },
      { q: "Will I be sold a stack of supplements at the end?", a: "No. The walkthrough is a conversation about your results — not a sales pitch. If there are essential oils or herbal options in our retail section that align with what we discussed, Toya may mention them; she will also tell you which options are widely available elsewhere if you prefer to source them on your own. Nothing in the ZYTO session is engineered to upsell you." },
    ],
    smallNote: {
      title: "A small note on history",
      body: "The ZYTO Balancer has been part of this practice's catalog since the 2020 Grand Opening — one of the original four anchor services on the founding flyer, alongside thermography, the Lymphstar, and infrared sauna. Over the years we have refined how we present the scan (more transparent about its wellness-only positioning, more emphasis on the walkthrough as the load-bearing part of the visit, less emphasis on the device for its own sake). What has not changed: the printed report goes home with you, the conversation is yours, and the pricing has been kept deliberately accessible.",
    },
    related: [
      { slug: "lymphatic-drainage", title: "Lymphatic Drainage with Lymphstar Pro", reason: "Often a useful follow-up if the lymph-system section of your report ran high." },
      { slug: "millys-minutes", title: "Milly's Minutes — Infrared Sauna", reason: "Gentle, low-cost ongoing support for general circulation and relaxation." },
      { slug: "naturopathy-consultation", title: "Naturopathy Consultation", reason: "Sit-down hour to talk about what the report suggests, with herbal and lifestyle options." },
    ],
    readyToBook: {
      heading: "Ready to book your ZYTO scan?",
      body: "Call or text (985) 278-6087. Or send your details through the consultation request form and Toya will reach back the next time she's in the clinic.",
    },
    regulatoryDisclaimer:
      "The ZYTO scan is a bioenergetic wellness assessment. It is not a medical diagnostic test and does not detect, identify, treat, cure, or prevent any disease. Always consult your medical provider for medical concerns.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 2. Lymphatic Drainage
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: "lymphatic-drainage",
    name: "Lymphatic Drainage with Lymphstar Pro",
    shortName: "Lymphatic Drainage",
    metaTitle: "Lymphatic Drainage Cut Off LA — Lymphstar Pro Session at Holistic Medspa",
    metaDescription:
      "A 30-minute Lymphstar Pro lymphatic drainage session with Toya at Holistic Medspa, Cut Off, Louisiana. Gentle sound-and-vibration lymph work — by appointment.",
    primaryKeyword: "lymphatic drainage Cut Off LA",
    hero: {
      headline: "A half-hour of gentle, sound-and-vibration lymph work that lets your body do the rest of the moving on its own.",
      sub: "Lymphstar Pro session at the Cut Off clinic, by appointment.",
      image: "/media/services/service-lymphatic-drainage.jpg",
    },
    whatItIs: [
      "The Lymphstar Pro is a specialized lymphatic-drainage device that uses electrically generated harmonic vibration and noble-gas frequencies to support the body's natural lymph movement. Unlike manual lymphatic drainage massage — which uses skilled, light hands-on strokes — the Lymphstar Pro uses a glass wand applicator that's lightly passed over the skin along the major lymph pathways: the neck and clavicle area, the underarms, the abdomen, the inner thighs, the backs of the knees.",
      "The lymphatic system is the quiet plumbing of the body. It moves a clear fluid that picks up cellular waste, extra protein, and fluid from tissues, and delivers it back into the bloodstream for the body to clear. Unlike the cardiovascular system, the lymph has no central pump — it relies on muscle movement, breathing, posture changes, and gentle tissue work to keep moving. When it slows down (from a sedentary stretch, illness, a stressful month, post-surgical swelling, or simply life), the body's recovery slows down with it.",
      "The Lymphstar Pro is designed to encourage that natural movement, not force it. It is a wellness modality. It is not a medical procedure, and it does not identify, treat, cure, or prevent any disease.",
      "This is one of the modalities that has been on offer at the clinic since the very first day. The 2020 Grand Opening flyer listed “Lymphatic Drainage Lymphstar Pro 30 min $30” — and since then, Lymphstar sessions have been one of the steady regulars in the practice's rhythm. People who book Lymphstar tend to come in waves: a few weeks of focused sessions during a recovery stretch, then a quieter season, then back again when life changes. The pricing model is built around that pattern — single sessions, no packages required, no membership obligation.",
    ],
    howItWorks: [
      {
        title: "Settle in.",
        body: "You lie down, fully clothed in loose layers or in a gown depending on the regions being addressed. Toya begins with a brief check-in on how you've been feeling and any specific areas of focus.",
      },
      {
        title: "The wand moves slowly.",
        body: "The glass applicator is passed in slow, deliberate paths along the lymph chains — usually starting at the neck/clavicle and working outward, then progressing to the abdomen and lower-body regions. The wand emits a subtle vibration and a soft hum; many people describe the sensation as quietly buzzing or barely perceptible. There is no firm pressure — this is not deep-tissue work.",
      },
      {
        title: "Hydrate after.",
        body: "Plain water — at least 16-20 ounces in the hours after the session — supports the body's clearance process. Avoid caffeine and alcohol for the rest of the day if you can. A short walk, even ten minutes around the block, supports natural lymph movement as well.",
      },
    ],
    whatToExpect: [
      { label: "Duration", body: "30 minutes per session." },
      { label: "Downtime", body: "none. Most people feel relaxed, sometimes lightly fatigued for an hour." },
      { label: "Sessions", body: "people use Lymphstar Pro in different rhythms. Some come for one session before or after a stressful stretch; some run a series of 4-6 over several weeks during recovery from illness or post-surgical swelling; some maintain a monthly visit as part of an ongoing wellness routine. There is no required course. We do not sell packages. Each session is priced individually so that the rhythm is yours, not ours." },
      { label: "Results timeline", body: "sensations of lightness, reduced puffiness, or a calmer night's sleep are commonly reported the same day or the next. These are subjective wellness observations, not clinical outcomes." },
      { label: "What to wear", body: "loose layers you can adjust easily; a sports bra or camisole works well for upper-body lymph paths. We provide towels and gowns if you prefer that for the lower-body regions." },
      { label: "What to bring", body: "water (you can refill at the clinic), and any notes about specific areas where you have been noticing swelling, heaviness, or tightness." },
    ],
    pricing: {
      historical: "$30 per 30-minute session (2020 Grand Opening flyer).",
      current: "Call or text (985) 278-6087 to confirm the 2026 rate.",
      typical: "Comparable Lymphstar Pro sessions in the U.S. typically run $45-$120 per session. Our 2020 price was well under the typical range, reflecting our community-rooted model.",
    },
    faqs: [
      { q: "Is this the same as manual lymphatic drainage massage?", a: "No. Manual lymphatic drainage (MLD) is a hands-on bodywork technique performed by a trained massage therapist. The Lymphstar Pro is a device-based session — the practitioner guides a glass wand applicator along lymph pathways. Many people find the two complementary; some prefer one over the other. We do not offer manual lymphatic drainage at this location, and we are happy to refer if that is the modality you are looking for." },
      { q: "Will I feel anything during the session?", a: "Most people describe it as quietly relaxing — a soft hum, a light touch, no pressure to speak of. A small number find the vibration sensation noticeable; you can ask Toya to adjust at any point. The wand is held just above the skin or in very light contact, not pressed into the body." },
      { q: "Should I avoid this if I have a medical condition?", a: "Talk to your medical provider first if you have active cancer treatment, a pacemaker, lymph-node removal histories, deep vein thrombosis, or are pregnant. The Lymphstar Pro is a wellness modality and not a substitute for medical care. We will ask about these conditions during the booking conversation and during your first visit so we can plan around them." },
      { q: "How soon will I feel a difference?", a: "That varies. Some people notice lightness or reduced swelling the same day. Others describe a calmer night's sleep. These are subjective wellness observations and we do not promise specific results. The honest answer is: try one session and see what you notice. If something feels useful, come back. If it doesn't, you have lost a half-hour and the cost of a meal out." },
      { q: "What should I do after the session?", a: "Hydrate well — plain water, ideally 16-20 ounces over the next several hours. Skip caffeine and alcohol for the rest of the day if possible. A short walk supports natural lymph movement. If you have a sauna session booked back-to-back, the post-Lymphstar walk can be from one room to the next — many clients pair the two." },
      { q: "Can I bundle this with other sessions?", a: "Yes. Lymphstar Pro pairs naturally with infrared sauna and ZYTO scans. Ask Toya about combining a Lymphstar session with sauna time or a wellness scan when you book. We tend to recommend lymphatic drainage first and sauna second when the two are paired, but the order is not strict." },
      { q: "Is this covered by insurance?", a: "No. Wellness sessions are not insurance-billed. Payment is at the time of service." },
    ],
    smallNote: {
      title: "A small note on history",
      body: "The Lymphstar Pro session has been on this practice's catalog from the first day. It is one of the four anchor services on the 2020 Grand Opening flyer: lymphatic drainage, infrared sauna, ZYTO scan, thermography. Over the years it has remained the same length (30 minutes), the same gentle protocol, and at the same accessible price point. Many of our longest-tenured clients started with a Lymphstar session, found it useful, and built the rest of their wellness routine outward from there.",
    },
    related: [
      { slug: "millys-minutes", title: "Milly's Minutes — Infrared Sauna", reason: "Pairs naturally with lymph work; many clients schedule them back-to-back." },
      { slug: "zyto-wellness-scan", title: "ZYTO Wellness Scan", reason: "If the lymphatic section of your scan ran high, this is the most direct follow-up." },
      { slug: "naturopathy-consultation", title: "Naturopathy Consultation", reason: "For a fuller conversation about supporting lymphatic, immune, and circulatory health through diet and herbal practice." },
    ],
    readyToBook: {
      heading: "Ready to book a Lymphstar session?",
      body: "Call or text (985) 278-6087. Landline (985) 632-6087. Or use the request form below.",
    },
    regulatoryDisclaimer:
      "The Lymphstar Pro is a wellness modality. It is not a medical procedure and does not identify, treat, cure, or prevent any disease.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 3. Milly's Minutes
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: "millys-minutes",
    name: "Milly's Minutes",
    shortName: "Milly's Minutes",
    metaTitle: "Infrared Sauna Cut Off LA — Milly's Minutes at Holistic Medspa",
    metaDescription:
      "Milly's Minutes: $1 per minute across infrared sauna, vibra plate, and ionic foot bath. Use the time however you need it that day. At Holistic Medspa in Cut Off, Louisiana.",
    primaryKeyword: "infrared sauna Cut Off LA",
    hero: {
      headline: "One dollar a minute. Three modalities. Use the time however you need it that day.",
      sub: "Infrared sauna, vibra plate, ionic foot bath — booked by the minute, in the proportions you choose.",
      image: "/media/services/service-millys-minutes.jpg",
    },
    whatItIs: [
      "Milly's Minutes is the simplest pricing structure in the clinic, and one of the things our regulars come back for. You pay a dollar a minute, and you choose how to spend that time across three modalities: the infrared sauna (with optional chromotherapy and sound therapy), the vibra plate (a whole-body vibration platform you stand or sit on), and the ionic foot bath (a footbath that runs a low electrical current through saltwater).",
      "You can do a 20-minute sauna for $20 one week and a 15-minute foot bath for $15 the next. You can split a single visit across two modalities. There's no package commitment. Minutes are usable when you need them, in the proportions you need.",
      "The program was named after Mildred Hayes Cheramie — a person who mattered to this practice. The naming is a small honoring, kept on the flyer since the early days.",
      "There is a logic to the per-minute model that took us a while to land on. Sauna sessions, vibra-plate sessions, and ionic foot baths are all genuinely modular — there is no clinical reason a “session” must be exactly 30 minutes. Different people need different amounts of time on each modality depending on the day, the weather, what they had for lunch, how they slept. Charging by the minute respects that. It also keeps the floor of the menu low — a 10-minute foot bath for $10 is a very different ask than a “session” at $40. We wanted the kind of pricing that would let a working mom come in on a lunch break for 15 minutes if that is what she had, and a retired neighbor come in for an hour if that is what he wanted.",
    ],
    howItWorksLeadIn:
      "Three modalities, one program. You choose how much of each on the day of your visit.",
    howItWorks: [
      {
        title: "Infrared sauna (with optional chromotherapy and sound).",
        body: "Infrared saunas use light wavelengths to gently warm the body from within, rather than heating the air around you the way a traditional Finnish sauna does. The result is a deep, relaxing warmth at a more moderate ambient temperature — often experienced as easier to tolerate than a conventional sauna. We offer optional chromotherapy (color-light therapy, where the cabin is bathed in a chosen color while you sit) and sound therapy (low ambient music or specific frequencies during the session). A typical sauna session runs 20-40 minutes. Most people sweat lightly to moderately. Hydrate well before and after. The session is yours — you can sit quietly, listen to a playlist on your headphones, meditate, or simply rest with your eyes closed.",
      },
      {
        title: "Vibra plate (whole-body vibration).",
        body: "The vibra plate is a vibrating platform you stand on (or sit on for a less intense option). The vibrations are transmitted up through the legs and into the body, causing the muscles to engage and release rapidly. Sessions are typically short — 10 to 20 minutes — and are popular as a quick warm-up before sauna or as a standalone circulation-and-engagement session. People with hesitant standing balance can sit on the plate or sit on a stable surface with their feet on the plate. The intensity setting is adjustable. We always start a first-time client at a low setting and let them work up to what feels comfortable.",
      },
      {
        title: "Ionic foot bath.",
        body: "You sit with your feet in a saltwater basin while a low electrical current runs through the water from an electrode. Over the course of a 20-30 minute session, the water often changes color. People who use ionic foot baths describe them as relaxing and grounding. We do not make claims about what the water-color changes represent — there is ongoing wellness-community discussion about that — and we present the session as a relaxation and lifestyle wellness modality, not a medical detoxification. The foot bath is the gentlest of the three modalities in the Milly's program. There is no exertion, no heat, no vibration. You can read, scroll your phone, sip tea, or just let your mind drift for the duration. Many regulars use the foot bath as a wind-down after a sauna or vibra session.",
      },
    ],
    whatToExpect: [
      { label: "Duration", body: "you choose — typical visits run 20-40 minutes per modality. Most regulars combine two in one visit (e.g. 20 min vibra plate + 30 min infrared sauna)." },
      { label: "Downtime", body: "none. You can go straight from a session back to your day. The sauna may leave you wanting a quiet hour or a nap." },
      { label: "Sessions", body: "there is no required series. Some people come once a week; some come occasionally; some pair Milly's Minutes with a Lymphstar or ZYTO visit." },
      { label: "What to wear", body: "loose, breathable clothing for sauna and vibra plate; for foot bath, you'll roll up pant legs. We provide towels. If you'd prefer to change into shorts or a tank for the sauna, ask when you book and we'll make sure the changing space is set up." },
      { label: "Hydration", body: "before and after every session. Plain water. Avoid caffeine and alcohol for the rest of the day if you can." },
      { label: "What to bring", body: "water, a towel if you have a preferred one, headphones or a book if you'd like, and a hair tie if you have long hair (the sauna gets warm enough that you may want it up)." },
    ],
    pricing: {
      historical: "$1 per minute, across all three modalities (Milly's Minutes flyer). Historical 2020 alternate rates: $30 for a 30-minute sauna with chromo and sound; $20 for a 30-minute basic infrared session.",
      current: "Call or text (985) 278-6087 to confirm — Milly's Minutes is a long-running honoring program but rates may have updated.",
    },
    faqs: [
      { q: "Can I split minutes between modalities?", a: "Yes. A 15-minute vibra plate + 15-minute foot bath in the same visit is $30." },
      { q: "Do I need to book each modality separately?", a: "No. You book one visit; we discuss what you'd like to do when you arrive. If the schedule is tight, mention the modalities you want when you call so we can plan the time correctly." },
      { q: "How long should my first sauna session be?", a: "If you have never used an infrared sauna, start with 20 minutes at a moderate temperature. Some people stretch to 30-40 minutes over later visits as they learn what their body prefers. There is no virtue in pushing through discomfort. The sauna is supposed to feel good." },
      { q: "Is the foot bath a real detox?", a: "We present the ionic foot bath as a relaxing and grounding wellness session, not a medical detoxification. The body has its own detoxification organs — primarily the liver and kidneys — and we encourage thinking of the foot bath as a calming addition to a broader healthy routine, not a replacement for it." },
      { q: "Are there reasons I shouldn't use the vibra plate or sauna?", a: "Talk to your medical provider first if you are pregnant, have a pacemaker or other implanted electronic device, have low blood pressure, have heat-sensitive conditions, or are recovering from a recent surgery. These are wellness modalities, not medical treatments. We will ask about contraindications when you book; please tell us about any conditions even if they seem unrelated." },
      { q: "Who was Mildred?", a: "A person honored by the program's pricing." },
      { q: "Do I need an appointment, or can I walk in?", a: "Appointment, please. We are a small practice and Toya is often the only person on site; she may be in the middle of a Lymphstar session or a consultation when you walk in. A quick call or text the morning of is usually enough to confirm a slot." },
      { q: "Can I bring a friend?", a: "The sauna at the Cut Off clinic is a single-person unit, so sauna time is one-at-a-time. The vibra plate and foot bath can be used in succession, and the waiting space is comfortable enough for a friend to read while you sauna. If you want a paired sauna experience, ask about scheduling back-to-back appointments." },
    ],
    related: [
      { slug: "lymphatic-drainage", title: "Lymphatic Drainage with Lymphstar Pro", reason: "Many clients pair a Lymphstar session with a 30-minute sauna in one visit." },
      { slug: "zyto-wellness-scan", title: "ZYTO Wellness Scan", reason: "For a structured read on which body systems might most benefit from ongoing Milly's Minutes time." },
      { slug: "naturopathy-consultation", title: "Naturopathy Consultation", reason: "For the bigger-picture conversation around lifestyle, sleep, stress, and circulation." },
    ],
    readyToBook: {
      heading: "Ready to book a Milly's Minutes visit?",
      body: "Call or text (985) 278-6087. Or use the consultation request form below.",
    },
    regulatoryDisclaimer:
      "Infrared sauna, vibra plate, and ionic foot bath are wellness/relaxation modalities. They are not medical treatments and do not constitute medical detoxification.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 4. Thermography
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: "thermography",
    name: "Total Thermography (hosted)",
    shortName: "Thermography",
    metaTitle: "Thermography Cut Off LA — Hosted Clinic at Holistic Medspa",
    metaDescription:
      "Hosted full-body thermography clinic at Holistic Medspa in Cut Off, Louisiana, with visiting certified thermographer Sandy Cambre. Radiation-free thermal imaging — adjunctive only, never a replacement for mammography.",
    primaryKeyword: "thermography Cut Off LA",
    hero: {
      headline: "A radiation-free, contact-free thermal-imaging session you can think of as a complement to your existing screening routine — never a replacement for it.",
      sub: "Hosted clinic at our Cut Off location, run a few times a year by visiting certified thermographer Sandy Cambre.",
      image: "/media/services/service-thermography.jpg",
    },
    whatItIs: [
      "This is a hosted service. Bayou Holistics / Holistic Medspa does not perform thermography in-house. We host a visiting certified clinical thermographer, Sandy Cambre (337-981-7703), for one- or two-day clinic events at our Cut Off location, typically scheduled a few times a year. When a clinic is booked, we open scheduling for our clients; Sandy operates the imaging equipment and produces the report.",
      "We surface this clearly because we want you to know who is doing what. The visiting practitioner is the medical-imaging professional. We are the host venue and the appointment-booker. The session, the report, and the interpretation are Sandy's domain. If you have ever booked an event-day vaccination clinic at a pharmacy or a flu-shot day at your local community center, the format is similar — a credentialed traveling provider, hosted in a known local space.",
      "Total Thermography (full-body) is a roughly one-hour session of thermal imaging using an infrared camera. The camera does not touch you, does not emit any radiation, and produces a series of heat-pattern images of the body. After the session, the clinical thermographer reads the images and produces a written report.",
      "Thermography is FDA-cleared as an adjunctive tool only — meaning it is approved to be used alongside, not in place of, conventional diagnostic imaging like mammography. The FDA has issued warning letters about thermography marketed as a screening or diagnostic substitute. We do not market it that way. Thermography is one piece of information; your mammogram, ultrasound, and any clinically indicated imaging from your medical provider remain the standard of care.",
    ],
    howItWorks: [
      {
        title: "Acclimate.",
        body: "You sit in a temperature-controlled room without lotions or perfumes (and without recent vigorous exercise) for roughly 15 minutes so your skin temperature equalizes. This acclimation step matters for the quality of the imaging — it is not skippable, but it is also not effortful.",
      },
      {
        title: "Image.",
        body: "The thermographer positions the infrared camera and takes a series of images at standardized angles. The camera does not touch you. No contrast agent. No radiation. The imaging portion runs roughly 20-30 minutes. You will be asked to assume specific positions for short stretches (standing, arms raised, turning); none of these is physically demanding.",
      },
      {
        title: "Report.",
        body: "Sandy reviews the images and produces a written report afterward, typically delivered within a few weeks. The report describes thermal patterns; it does not constitute a medical finding.",
      },
    ],
    whatToExpect: [
      { label: "Duration", body: "roughly 1 hour for the full-body session, including acclimation." },
      { label: "Downtime", body: "none." },
      { label: "Sessions", body: "thermography is often used annually or biannually as a tracked baseline; specific intervals are between you and your medical provider. The value of thermography as an adjunctive tool grows with comparison — a single image is a snapshot; a series of annual images is a record." },
      { label: "Results timeline", body: "the written report arrives in the weeks after the session. The thermographer (or your medical provider) walks you through it." },
      { label: "What to bring", body: "a list of current medications and any specific concerns you'd like noted in the report. Avoid lotions, deodorants, and perfumes the day of. Avoid hot showers or vigorous exercise within an hour of the session." },
      { label: "What to wear", body: "loose layers you can change out of comfortably. Sandy will provide draping for the session as appropriate." },
      { label: "Privacy", body: "the imaging suite is closed and private. You and Sandy are the only people present during the session." },
    ],
    pricing: {
      historical: "$340 for the 1-hour full-body Total Thermography session (2020 Grand Opening flyer).",
      current: "Set by the visiting thermography service (Total Thermography / Sandy Cambre), not by us. Call or text (985) 278-6087 to ask about upcoming clinic dates and current pricing.",
      typical: "Comparable clinical thermography in the U.S. runs roughly $200-$500 for full-body screening; region- and dental-only sessions are typically lower.",
    },
    faqs: [
      { q: "Is thermography a replacement for my mammogram?", a: "No. Thermography is an adjunctive tool, not a replacement for mammography or any other clinically indicated diagnostic imaging. The FDA has been explicit on this point. Follow your medical provider's screening recommendations." },
      { q: "Does it use radiation?", a: "No. Thermography is purely an infrared imaging method. There is no X-ray, no contrast agent, no compression." },
      { q: "Who reads my report?", a: "A certified clinical thermographer reads the imaging and produces a written report. For our hosted clinics, that has been Sandy Cambre." },
      { q: "How do I know when you have a clinic scheduled?", a: "Call or text (985) 278-6087 to ask. Hosted thermography clinics typically run a few times a year at our location. When one is scheduled, we open booking for our client list first, then publicly. If you would like to be added to the notify list, mention that when you contact us." },
      { q: "What should I do before the session?", a: "Avoid hot showers, vigorous exercise, lotions, deodorants, and perfumes within an hour of the appointment. Bring a list of medications and any specific concerns. Wear loose clothing you can change out of comfortably." },
      { q: "Will I get my report on the same day?", a: "No. The written report is typically delivered in the weeks after the session by the thermography service." },
      { q: "Is this covered by insurance?", a: "Not typically. Thermography is generally a direct-pay wellness imaging service. Check with your insurance carrier if you'd like to confirm; the answer is almost always no." },
      { q: "Will the report tell me whether I have a particular condition?", a: "No. The thermography report describes thermal patterns observed on the day of the imaging session. It does not constitute a medical finding. If the report flags anything that warrants follow-up, you take that information to your medical provider, who will order whatever clinically indicated imaging or evaluation is appropriate." },
    ],
    smallNote: {
      title: "A note on hosted-clinic timing",
      body: "Hosted thermography days at our location have historically been scheduled a few times a year (December and the warmer months are the most common windows). If you book during a clinic day, expect to share the clinic-day flow with other clients (Sandy is seeing back-to-back appointments in our space for the day). The booking-day experience is structured to keep your individual session private and well-paced — but the clinic itself is busy, by design, because we batch the visiting practitioner's day. If you prefer a non-event-day rhythm, the in-house modalities (Lymphstar, sauna, ZYTO) are always individually booked on quieter days.",
    },
    related: [
      { slug: "zyto-wellness-scan", title: "ZYTO Wellness Scan", reason: "Different mechanism, also non-medical; many clients run both as wellness baselines." },
      { slug: "naturopathy-consultation", title: "Naturopathy Consultation", reason: "A follow-up conversation about lifestyle and nutritional support after a thermography report." },
      { slug: "lymphatic-drainage", title: "Lymphatic Drainage with Lymphstar Pro", reason: "Often part of a broader lymphatic-support routine." },
    ],
    readyToBook: {
      heading: "Want to know when the next thermography clinic is at Holistic Medspa?",
      body: "Call or text (985) 278-6087. We will add you to the list and reach back when Sandy's next visit is scheduled.",
    },
    regulatoryDisclaimer:
      "Thermography is an adjunctive imaging tool only. It is not a replacement for mammography or any other clinically indicated diagnostic imaging. The FDA has issued warning letters about thermography marketed as a screening or diagnostic substitute. Follow your medical provider's screening recommendations.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 5. Naturopathy Consultation
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: "naturopathy-consultation",
    name: "Naturopathy / Homeopathic / Herbal Consultation",
    shortName: "Naturopathy Consult",
    metaTitle: "Naturopathy Consultation Cut Off LA — Holistic Medspa",
    metaDescription:
      "One quiet hour with Toya at Holistic Medspa, Cut Off, Louisiana. A listening-first naturopathy, homeopathic, and herbal consultation. NAHA-listed practitioner.",
    primaryKeyword: "naturopathy consultation Cut Off LA",
    hero: {
      headline: "One quiet hour. No clipboard speed-run. We start by listening.",
      sub: "Sit-down naturopathy, homeopathy, and herbal consultation at the Cut Off clinic.",
      image: "/media/services/service-naturopathy-consultation.jpg",
    },
    whatItIs: [
      "A naturopathy consultation at Holistic Medspa is a conversation. You sit down with Toya for about an hour. You talk through what's been going on — sleep, digestion, energy, mood, cycle if relevant, stress, what you eat and drink, what you've already tried, what your medical provider has said. Toya listens. She asks questions where she needs more context. She does not interrupt.",
      "From that conversation, you and Toya put together a small, practical plan together — usually some combination of: lifestyle adjustments (sleep timing, hydration, simple dietary shifts, movement); herbal and homeopathic options (Toya is listed in the NAHA directory for Naturopathy, Homeopathic, Traditional Chinese Medicine, and Herbal Medicine); on-site wellness services if relevant (a Lymphstar session, infrared sauna time, a ZYTO scan to map systems); and referrals out when something belongs with your medical provider, a registered dietitian, a counselor, or another professional.",
      "A critical clarification. Louisiana does not license naturopathic doctors. Toya does not practice as a medical doctor, does not perform diagnoses, does not prescribe pharmaceuticals, and does not treat medical conditions. What she does is sit with you, listen to your wellness questions, and offer naturopathy- and homeopathy-tradition options for you to consider. She always defers to your medical provider for medical care.",
      "This is the central service of the practice — the one that anchors everything else. The body-work modalities, the scans, the essential oils — those are tools, and they work best when they are used in the context of an ongoing conversation. The consultation is where that conversation happens. Some clients come for one consultation, walk out with a small plan, and never need to come back. Some return seasonally. Some build a years-long rhythm of one or two consultations a year plus occasional body-work visits. We do not have a “package” for this. We do not push for a recurring schedule. The cadence is yours.",
    ],
    howItWorks: [
      {
        title: "Bring your story.",
        body: "A list of what you've been experiencing (in your own words), what your current medical provider(s) have said, what medications and supplements you are taking, and what you have already tried that worked or did not. Handwritten notes are perfect. You do not need to type up a polished intake document; the back of an envelope is fine.",
      },
      {
        title: "The conversation.",
        body: "Roughly an hour. We start broad and narrow as we go. You set the priorities. There are no required topics. If you only want to talk about sleep, we talk about sleep. If you want to talk about everything, that is also a complete first visit.",
      },
      {
        title: "The small plan.",
        body: "At the end, Toya writes a few practical next steps — usually a handful of items, never a long protocol. You take it home. You decide what to act on and at what pace. Nothing about the plan is contingent on a return visit; you can come back if you want to discuss progress, or not.",
      },
    ],
    whatToExpect: [
      { label: "Duration", body: "roughly 60 minutes for a first consultation. Follow-ups are usually 30-45 minutes." },
      { label: "Downtime", body: "none." },
      { label: "Sessions", body: "many clients return for one follow-up in 4-8 weeks to discuss what's working. Some don't need a follow-up. Some return seasonally. There is no required series." },
      { label: "What you take home", body: "the handwritten plan, any herbal/homeopathic recommendations with where to find them, and clear language about what is for you to try and what should be discussed with your medical provider." },
      { label: "What to bring", body: "your medication and supplement list, recent lab results if you have them (they are useful context but not required), and any notes about what you'd most like the conversation to cover." },
      { label: "Privacy", body: "the consultation room is closed and private. The conversation stays between you and Toya." },
    ],
    pricing: {
      historical: "The 2020 flyer listed Consultation among bookable appointments but did not publish a flat consultation rate.",
      current: "Call or text (985) 278-6087 to confirm — first-consult and follow-up rates differ.",
      typical: "Comparable naturopathy consultations in the U.S. typically run $100-$250 for a 60-minute first visit; follow-ups generally $60-$150.",
    },
    faqs: [
      { q: "Will Toya identify what is wrong with me?", a: "No. Naturopathy consultations at Holistic Medspa are wellness conversations. Toya is not a licensed medical provider and Louisiana does not license naturopaths. She does not perform diagnoses. For medical diagnosis and treatment, please see your medical provider." },
      { q: "Can I still come if I'm under a doctor's care for something?", a: "Yes — many of our clients are. Bring your medical provider's notes and your medication list. Toya works alongside your medical care, not in place of it. If anything you discuss should be reviewed with your medical provider, she will tell you." },
      { q: "Will I leave with supplements to buy?", a: "Sometimes a handful of suggestions; never a long, expensive supplement protocol. Toya is a doTERRA Wellness Advocate, so some recommendations may include essential oils available in our retail section. There is no pressure to buy anything on-site or anywhere else. You decide what is worth trying." },
      { q: "Can I talk about emotional or mental wellness too?", a: "Yes. Mood, stress, sleep, and emotional patterns are part of the conversation. If anything you describe should be supported by a licensed counselor, psychologist, or psychiatrist, Toya will say so and encourage that referral. Bach Flower remedies (which we offer separately) sometimes come up here." },
      { q: "Is the consultation confidential?", a: "Yes. What you share stays between you and Toya. If you'd like notes shared with another practitioner, she'll provide them with your written permission." },
      { q: "Do I need to bring lab results?", a: "If you have recent labs, bring them — they are useful context. If you do not, no problem. Toya works with what you can share." },
      { q: "Is this covered by insurance?", a: "No. Wellness consultations are not insurance-billed. Payment is at the time of service." },
      { q: "How is this different from a primary-care visit?", a: "A primary-care visit is medical care delivered by a licensed medical provider — assessing symptoms, ordering labs, providing medical findings, prescribing pharmaceuticals or referring to specialists. A naturopathy consultation at Holistic Medspa is a wellness conversation about your daily routines, your lifestyle, and herbal-tradition options that you may want to consider. The two are complementary, not interchangeable. People who come to us almost always have a primary-care provider; we are an additional resource, not a substitute." },
    ],
    smallNote: {
      title: "A small note on the consultation room",
      body: "The consultation happens in a quiet, private space at the Cut Off clinic. There is no clock prominently on the wall and the door stays closed. The hour is yours; we will not look at the schedule pointedly and rush you toward the door. If the conversation runs long because the topic deserves it, it runs long. That is part of why we book consultations with margin in the calendar instead of stacking them back-to-back.",
    },
    related: [
      { slug: "zyto-wellness-scan", title: "ZYTO Wellness Scan", reason: "A structured snapshot of body-system stress patterns to bring into your consultation conversation." },
      { slug: "bach-flowers", title: "Bach Flower Consultation", reason: "A separate, more targeted session for emotional and energetic balance." },
      { slug: "lymphatic-drainage", title: "Lymphatic Drainage with Lymphstar Pro", reason: "Often a recommendation that comes out of a consultation." },
    ],
    readyToBook: {
      heading: "Ready to book a consultation?",
      body: "Call or text (985) 278-6087. Landline (985) 632-6087. Or send your details using the request form below.",
    },
    regulatoryDisclaimer:
      "Louisiana does not license naturopathic doctors. Toya is not a licensed medical provider and does not perform medical diagnoses, prescribe medications, or treat medical conditions. Consultations are wellness conversations only. Please consult your medical provider for medical concerns.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 6. Bach Flowers
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: "bach-flowers",
    name: "Bach Flower Consultation",
    shortName: "Bach Flowers",
    metaTitle: "Bach Flower Consultation Louisiana — Holistic Medspa, Cut Off LA",
    metaDescription:
      "A gentle Bach Flower consultation at Holistic Medspa in Cut Off, Louisiana. Custom-blended plant remedies for emotional balance — not a substitute for medical or mental-health care.",
    primaryKeyword: "Bach flower consultation Louisiana",
    hero: {
      headline: "A gentle, plant-based system for working with emotional weather. We blend a small bottle for you, and you take it home.",
      sub: "A short consultation and a custom Bach Flower blend at the Cut Off clinic.",
      image: "/media/services/service-bach-flowers.jpg",
    },
    whatItIs: [
      "Bach Flower Remedies are a system of 38 plant-based preparations developed in the 1930s by Edward Bach, a British medical doctor and bacteriologist. Each remedy corresponds to a specific emotional state — Mimulus for known fears, Walnut for periods of change, White Chestnut for repetitive thoughts that won't quiet down, Star of Bethlehem for shock or grief, and so on. Practitioners blend a small number of remedies together for the person in front of them, addressing the emotional patterns they are working through right now.",
      "Bach Flowers are not pharmaceutical. They are not herbal medicine in the way TCM herbs are. They are not a medical intervention. They are an old, gentle tradition used by people who find them quietly supportive during emotional or transitional periods.",
      "A Bach Flower consultation at Holistic Medspa is a short, focused conversation: we talk through what has been emotionally present for you, identify a small group of remedies that fits, and blend a custom bottle (typically 4-7 remedies) for you to take home. Standard dosing is a few drops several times a day, either directly under the tongue or in water.",
      "The Bach system has been part of the original 2020 service catalog at this practice — listed plainly on the appointment flyer right alongside ZYTO scans and consultations. It tends to attract a particular client: someone going through a hard stretch (a divorce, a job loss, a grief year, an exam season, an upcoming surgery) who wants something gentle and non-pharmaceutical to hold alongside whatever else they are doing. The remedies do not replace counseling, medication, or any other support someone is using; they sit alongside it.",
    ],
    howItWorks: [
      {
        title: "The conversation.",
        body: "A short check-in (15-25 minutes) about what has been emotionally present — stress, transitions, grief, a recurring worry, an upcoming life event, a hard week. The questions are gentle and the answers are yours. There is no required vulnerability; you share what feels right to share.",
      },
      {
        title: "The blend.",
        body: "Toya selects 4-7 Bach Flower remedies that fit the picture you have described, then prepares your custom bottle on the spot. She will tell you what is in it and why each remedy was chosen.",
      },
      {
        title: "The take-home.",
        body: "A small dropper bottle with simple dosing instructions. Most people take a few drops several times a day for the period they are navigating, then revisit if needed. The standard bottle lasts several weeks at typical dosing.",
      },
    ],
    whatToExpect: [
      { label: "Duration", body: "roughly 30 minutes total — conversation plus blending." },
      { label: "Downtime", body: "none." },
      { label: "Sessions", body: "people use Bach Flowers in different rhythms. Some come for one custom blend during a specific stretch; some return seasonally; some come once and revisit only when something new comes up. There is no required series." },
      { label: "What you take home", body: "a small bottle with your custom blend, dosing instructions, and a brief note of which remedies it contains and why." },
      { label: "What to bring", body: "nothing required. Some clients find it useful to come with a few notes about specific situations or feelings they would like the conversation to address; others prefer to walk in and let the conversation find its own shape." },
      { label: "Privacy", body: "the conversation is closed and confidential. Bach Flower consultations often touch on emotional material that you would not share casually; that material stays in the room." },
    ],
    pricing: {
      historical: "Bach Flowers were listed as a bookable appointment type on the 2020 service-list flyer without a published price.",
      current: "Call or text (985) 278-6087 to confirm the 2026 rate.",
      typical: "Comparable Bach Flower consultations in the U.S. typically run $50-$120 for the consultation; custom blend bottles typically run $15-$30 separately.",
    },
    faqs: [
      { q: "Do Bach Flower remedies actually work?", a: "Bach Flower Remedies are not FDA-evaluated for efficacy and we make no medical or therapeutic claims about them. They are a homeopathic-tradition wellness practice used by people who find them quietly supportive during emotional and transitional periods. Whether they help you is a question you will answer for yourself with use." },
      { q: "Are they safe to take with my medication?", a: "Bach Flower Remedies are dilutions preserved in a small amount of alcohol (or, increasingly, glycerin for alcohol-free versions). They are generally regarded as safe, but if you have any concerns about interactions — particularly if you have alcohol-sensitivity or are pregnant — please confirm with your medical provider before use." },
      { q: "Can children take them?", a: "The traditional answer is yes — Bach Flowers are commonly used with children and even pets in the wellness-homeopathic tradition. We will discuss any pediatric considerations during the consultation if your visit is for a child or you are asking on behalf of one." },
      { q: "Is this the same as essential oils?", a: "No. Essential oils are concentrated plant extracts (we carry doTERRA in retail). Bach Flowers are dilute flower-based preparations used in the homeopathic tradition. They serve different purposes and you can use both." },
      { q: "Can I get the same blend refilled?", a: "Yes. If a blend is working for you, we can prepare a refill. If your emotional landscape has shifted (which is common over weeks), we may suggest a brief check-in to adjust the remedies." },
      { q: "Is this covered by insurance?", a: "No. Wellness consultations are not insurance-billed. Payment is at the time of service." },
      { q: "Are there situations Bach Flowers are not the right fit for?", a: "Yes. Bach Flowers are a wellness practice for emotional balance, not a treatment for clinical mental-health conditions. If you are experiencing a mental-health crisis, severe depression, panic attacks, suicidal thoughts, or any condition that warrants licensed clinical care, please reach out to a mental-health professional, your medical provider, or in an emergency call 988 (the U.S. Suicide and Crisis Lifeline) or 911. Bach Flowers are not a substitute for that care." },
    ],
    smallNote: {
      title: "A small note on what Bach Flowers are not",
      body: "Bach Flowers are not a substitute for medication, therapy, or any medical care. They are not an “alternative” in the sense of replacing those things. They are an addition that some people find supportive during emotional or transitional periods. We say this plainly because the homeopathic-wellness space sometimes gets conflated with claims it cannot make; we would rather frame what Bach is honestly than market it loudly.",
    },
    related: [
      { slug: "naturopathy-consultation", title: "Naturopathy Consultation", reason: "A fuller, longer conversation that covers physical, emotional, and lifestyle factors together." },
      { slug: "essential-oils", title: "doTERRA Essential Oils", reason: "A complementary, aromatic approach to mood and lifestyle support." },
      { slug: "millys-minutes", title: "Milly's Minutes — Infrared Sauna", reason: "A relaxation modality some clients pair with emotional-balance practices." },
    ],
    readyToBook: {
      heading: "Ready to book a Bach Flower consultation?",
      body: "Call or text (985) 278-6087. Or use the consultation request form below.",
    },
    regulatoryDisclaimer:
      "Bach Flower Remedies are a wellness/homeopathic-tradition practice. They are not FDA-evaluated for efficacy and are not a treatment for clinical mental-health conditions. If you are in a mental-health crisis, contact a licensed provider, 988 (U.S. Suicide and Crisis Lifeline), or 911.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 7. Essential Oils + Blending on the Bayou
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: "essential-oils",
    name: "doTERRA Essential Oils + Blending on the Bayou",
    shortName: "Essential Oils",
    metaTitle: "doTERRA Essential Oils Cut Off LA — Blending on the Bayou at Holistic Medspa",
    metaDescription:
      "doTERRA Certified Pure Therapeutic Grade essential oils retail at Holistic Medspa, Cut Off, Louisiana — plus the Blending on the Bayou private class for groups of seven or more.",
    primaryKeyword: "doTERRA essential oils Cut Off LA",
    hero: {
      headline: "Real bottles on the shelf — and a private blending class when you bring seven friends.",
      sub: "doTERRA retail at the Cut Off clinic, plus Blending on the Bayou: a hands-on private class.",
      image: "/media/services/service-essential-oils.jpg",
    },
    whatItIs: [
      "Holistic Medspa stocks doTERRA Certified Pure Therapeutic Grade (CPTG) essential oils at our Cut Off location. The current shelf includes the most-used single oils (Peppermint, Lavender, Lemon, Wild Orange, Frankincense, Tea Tree, Eucalyptus and the broader staples) and a rotating selection of blends (OnGuard, Breathe, DigestZen, Past Tense and others), along with topical roller bottles and a small selection of carrier oils.",
      "If there is an oil you use that you don't see on the shelf, ask. Toya is a doTERRA Wellness Advocate and can typically order anything from the full line. For frequent users, the Wellness Advocate path opens member-discount pricing and a recurring-order option that can save real money over the course of a year; Toya is happy to walk you through whether that makes sense for your usage.",
      "Blending on the Bayou is the private group class — a guided evening on the mixology of blending essential oils for therapeutic and personal-care use. You learn the basics of dilution rates, top/middle/base notes, common blending pairings, and you leave with one or two custom roller blends you have made yourself.",
      "It runs for groups of seven or more. Two scheduling options: at the clinic (Toya hosts the class at the Cut Off location, two time slots are typical — 6pm to 8pm, or 7pm to 9pm); or at your location (Toya brings the materials and class to you within a reasonable driving radius).",
      "It is a popular birthday-circle, ladies'-night, church-group, or small-team activity — the kind of evening where the group ends up talking about everything that has been going on in their lives while they blend. The two-hour structure leaves room for conversation as much as instruction. The leave-with-something-you-made part matters: people remember the class differently when they walk out with a roller bottle in their hand that they personally mixed.",
    ],
    howItWorks: [
      {
        title: "Reach out to schedule.",
        body: "Tell us your preferred date, your group size (must be 7 or more), and whether you'd like to host at our Cut Off location or have Toya come to you.",
      },
      {
        title: "Confirm with deposit.",
        body: "A small deposit holds the date; the per-person fee is collected the night of the class.",
      },
      {
        title: "Two hours together.",
        body: "Brief teaching on the basics of blending, then a guided session where each person creates and bottles a custom blend (typically one or two roller bottles per person). Each person leaves with their own bottle(s) and notes on what is in them.",
      },
    ],
    whatToExpect: [
      { label: "Duration (retail)", body: "plan for 15-30 minutes if you'd like to talk through oils with Toya; quicker if you know what you want." },
      { label: "Duration (class)", body: "plan for 2 hours; arrive a few minutes early to settle the group." },
      { label: "Downtime", body: "none for retail or class." },
      { label: "What you take home", body: "the oils (or roller bottles) you have purchased or made, plus a short reference card if you ask." },
      { label: "What to bring (class)", body: "an open mind, and any preferences you have about scents (some people love citrus; some love floral; some find both overwhelming). If anyone in the group has a fragrance sensitivity, mention it when you book so we can plan the station setup." },
    ],
    pricing: {
      historical: "Blending on the Bayou class — $30.00 per person, groups of 7 or more (2020 flyer).",
      current: "Retail oils vary by product (doTERRA list pricing applies; Wellness Advocate status sometimes opens member-discount paths). Class — call or text (985) 278-6087 to confirm the 2026 rate.",
    },
    faqs: [
      { q: "Are doTERRA oils medicine?", a: "No. We use lifestyle and wellness language about essential oils — for relaxation, aromatic use, daily routines. doTERRA-corporate restricts the medical and disease claims affiliates can make about their oils, and we follow that conservatively. Always consult your medical provider for medical concerns." },
      { q: "Can essential oils replace any prescriptions?", a: "No. Do not stop or change any medication based on essential-oil information. Talk to your prescribing medical provider about any medication changes." },
      { q: "Are oils safe in pregnancy?", a: "Some are; some are not advised. Talk to your medical provider and to Toya before establishing a regular essential-oil practice during pregnancy." },
      { q: "Can I bring a smaller group to the class?", a: "The Blending on the Bayou private class requires a minimum of 7. Smaller groups can ask about a shorter individual or pair-based blending session as a custom appointment instead." },
      { q: "What if I have a fragrance sensitivity?", a: "Mention it when you book. The retail browse can be done quickly in a way that minimizes the exposure, and the class environment can be designed with single-oil rather than blend stations if needed." },
      { q: "Do you ship oils?", a: "We are a small in-person clinic. We do not run an e-commerce shipping operation. Local pickup is the model. If you live further out and want to set up a recurring doTERRA order, Toya can walk you through that as a Wellness Advocate." },
      { q: "Is the Blending on the Bayou class still actively running?", a: "Yes — by-request, when groups of 7+ schedule. The class has been part of the offering since 2020." },
      { q: "Are the oils safe for pets?", a: "This is a deeper conversation than fits a single FAQ answer. Some oils are well-tolerated by household pets at low dilution; some (notably tea tree, certain citrus, and peppermint at high concentrations) require care or avoidance around cats, small dogs, and birds. If you are buying oils for a household with pets, mention it during retail and Toya will go through the relevant guidance." },
    ],
    smallNote: {
      title: "A small note on the doTERRA business model",
      body: "doTERRA operates a multi-level marketing structure for its Wellness Advocates. We disclose this plainly because it sometimes comes up in conversation: Toya's Wellness Advocate status means she can order from the line at member-pricing and pass that path on to clients who want it. It does not mean we run a recruitment funnel or pressure clients to join doTERRA's downline structure. The retail and class offerings here are about the oils and the blending experience, not about building a sales team.",
    },
    related: [
      { slug: "bach-flowers", title: "Bach Flower Consultation", reason: "A complementary, gentler-flower-based modality for emotional patterns." },
      { slug: "naturopathy-consultation", title: "Naturopathy Consultation", reason: "For a fuller conversation about how essential-oil practice fits a broader wellness routine." },
      { slug: "millys-minutes", title: "Milly's Minutes — Infrared Sauna with chromotherapy and sound", reason: "Many clients pair an aromatic-oil practice at home with a sauna session at the clinic." },
    ],
    readyToBook: {
      heading: "Ready to schedule a retail visit or a class?",
      body: "Call or text (985) 278-6087. Or use the consultation request form below and mention “essential oils” or “Blending on the Bayou.”",
    },
    regulatoryDisclaimer:
      "Essential oils are sold and discussed as lifestyle/wellness products. They are not medicine and are not a substitute for prescription medication or medical care. Always consult your medical provider for medical concerns.",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 8. Hosted Modalities (Ultrasound + OlyLife)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: "hosted-modalities",
    name: "Hosted Modalities — Sound Prevention Ultrasound + OlyLife THz",
    shortName: "Hosted Modalities",
    metaTitle: "Hosted Ultrasound + OlyLife THz Cut Off LA — Holistic Medspa",
    metaDescription:
      "Two hosted modalities at Holistic Medspa in Cut Off, Louisiana: Sound Prevention mobile ultrasound clinics and the in-clinic OlyLife THz Tera-P90 wellness station. Both framed honestly — wellness session, not medical treatment.",
    primaryKeyword: "Sound Prevention ultrasound Cut Off LA",
    hero: {
      headline: "Two newer offerings, framed honestly.",
      sub: "One is a visiting third-party medical clinic we host a few times a year. The other is a newer in-clinic wellness station we use conservatively.",
      image: "/media/services/service-hosted-modalities.jpg",
    },
    whatItIs: [
      "Sound Prevention is a third-party mobile ultrasound clinic. They are the medical providers performing and reading the scans. Holistic Medspa is the host venue when they bring their mobile clinic to Cut Off — typically for one-day events scheduled in advance.",
      "The scan menu Sound Prevention has run at our location includes: Women's Comprehensive Ultrasound ($300 — thyroid, breast, vascular [carotid, aorta, lower-extremity arterial], abdomen, pelvic); Men's Comprehensive Ultrasound ($200 — thyroid, vascular, abdomen, bladder); Breast Ultrasound ($200 — breast and axilla); Vascular Ultrasound ($100 — carotid, aorta, lower extremities).",
      "The clinical provider is Sound Prevention — soundprevention@gmail.com — (985) 228-5858 — www.sound-prevention.com. The host venue and scheduling contact for events at our location is Holistic Medspa — (985) 278-6087. When you schedule for a hosted ultrasound day, you are booking with us into a slot on Sound Prevention's clinic calendar. The scan, the technology, the imaging report, and any follow-up questions about the scan itself are Sound Prevention's domain. We provide the room, coordinate the schedule, and welcome you in.",
      "The OlyLife THz Tera-P90 is a wellness device that combines two technology categories: Terahertz (THz) — an electromagnetic frequency band situated between microwaves and infrared, used in low-power emitter sessions directed at specific areas of the body for short durations; and PEMF (pulsed electromagnetic field) — a low-frequency pulsed magnetic field. PEMF devices are FDA-cleared at the Class II level for a narrow set of specific medical uses (non-union bone fractures being the primary cleared indication). Broader wellness use of PEMF and THz devices — for relaxation, general circulation support, lifestyle wellness — is widespread but not FDA-evaluated as a medical procedure.",
      "We use the OlyLife THz station as a wellness session only. We do not make medical claims about it. We do not present it as a treatment for any disease or condition. We describe it as an electromagnetic wellness session, used in short focused sittings for relaxation and general energetic support. This is the newest modality in our offerings, added during the rebrand-and-rebuild period of the practice.",
    ],
    howItWorksLeadIn:
      "Two distinct booking paths: a hosted clinic day for Sound Prevention ultrasound, and a regular-hours short session for OlyLife THz.",
    howItWorks: [
      {
        title: "For Sound Prevention ultrasound — ask about the next clinic.",
        body: "Call or text (985) 278-6087 to ask whether a Sound Prevention clinic is scheduled or to be added to the notify list. When a date is set, we open scheduling for slots on that day. On the day, arrive 10-15 minutes early to settle in. The scan itself takes 20-45 minutes depending on which package you booked. Sound Prevention produces and delivers the imaging report after the event, per their own schedule. Any questions about your report should be directed to them as the clinical provider.",
      },
      {
        title: "For OlyLife THz — talk through your interest first.",
        body: "First-time clients sit briefly with Toya to talk about whether and how the OlyLife session fits what you are working on. Some people skip the OlyLife session entirely and stick to the gentler modalities; others find it interesting to try.",
      },
      {
        title: "OlyLife THz — a focused short session.",
        body: "OlyLife sessions are typically short (15-30 minutes) and directed at a specific area you choose to focus on. You remain clothed and seated/lying comfortably throughout. A glass of water after. As with all of our sessions, hydration after is a small good practice.",
      },
    ],
    whatToExpect: [
      { label: "Ultrasound duration", body: "the scan itself takes 20-45 minutes depending on which package you booked." },
      { label: "OlyLife THz duration", body: "typically 15-30 minutes." },
      { label: "Downtime", body: "none for either." },
      { label: "OlyLife sensation", body: "most people describe gentle warmth in the area of focus; some feel nothing remarkable." },
      { label: "OlyLife sessions", body: "no required frequency. Some clients try one as a one-off; some incorporate it occasionally; some prefer not to use it at all." },
      { label: "Ultrasound report timing", body: "delivered by Sound Prevention in the days/weeks after the clinic, per their schedule." },
    ],
    pricing: {
      historical: "Sound Prevention ultrasound published rates (per the hosted-clinic flyer): Women's Comprehensive $300; Men's Comprehensive $200; Breast $200; Vascular $100.",
      current: "Call or text (985) 278-6087 to confirm the 2026 OlyLife THz rate and upcoming Sound Prevention clinic dates.",
      typical: "Comparable THz/PEMF wellness sessions in the U.S. run roughly $30-$80 per short session at independent clinics.",
    },
    faqs: [
      { q: "Is Sound Prevention's ultrasound a substitute for the imaging my doctor would order?", a: "No. It is offered as additional, direct-to-consumer information. Your medical provider's clinically indicated imaging remains the standard of care. If a Sound Prevention scan flags something for follow-up, take that information to your medical provider promptly." },
      { q: "How do I know when the next Sound Prevention clinic is scheduled?", a: "Call or text (985) 278-6087 and ask to be added to the notify list. We reach out when a date is set." },
      { q: "Does the OlyLife THz device treat any conditions?", a: "We make no medical or therapeutic claims about it. It is a wellness session only. PEMF technology is FDA-cleared at the Class II level for non-union bone fractures specifically; broader wellness use of PEMF and THz devices is not FDA-evaluated as a medical intervention." },
      { q: "Are there reasons I shouldn't use the OlyLife THz station?", a: "Talk to your medical provider first if you have a pacemaker, an implanted electronic device, are pregnant, or have a history of seizures. The OlyLife is a wellness session and is not appropriate as a substitute for any prescribed medical care." },
      { q: "Are these covered by insurance?", a: "Sound Prevention's direct-to-consumer ultrasound is generally not covered (check with your carrier; the answer is usually no). The OlyLife THz wellness session is not insurance-billed." },
      { q: "Can I do an OlyLife session and a Lymphstar session in the same visit?", a: "Yes. Both are short enough to fit in a single visit if you book the time. Mention both when you schedule so we can plan the appointment correctly." },
      { q: "Will I be encouraged to buy an OlyLife or PEMF device for home use?", a: "No. We do not sell OlyLife devices or run a multi-level distribution arrangement around them. The in-clinic OlyLife station is a service offered during your visit; if you want to research home devices, that is a conversation you can have on your own time with the manufacturer or with an independent device review." },
    ],
    related: [
      { slug: "zyto-wellness-scan", title: "ZYTO Wellness Scan", reason: "A different non-medical wellness assessment; many clients use both as long-running baselines." },
      { slug: "thermography", title: "Thermography (hosted)", reason: "Our other hosted clinical-imaging modality, with a similar host-and-vendor framing." },
      { slug: "lymphatic-drainage", title: "Lymphatic Drainage with Lymphstar Pro", reason: "A gentler in-house wellness modality if the hosted/newer options are not a fit." },
    ],
    readyToBook: {
      heading: "Ready to ask about a hosted clinic date or an OlyLife session?",
      body: "Call or text (985) 278-6087. Or use the consultation request form below and tell us which one you are interested in.",
    },
    regulatoryDisclaimer:
      "Sound Prevention ultrasound is direct-to-consumer wellness screening, not a substitute for clinically indicated imaging ordered by your medical provider. The OlyLife THz Tera-P90 is a wellness session only — it is not FDA-evaluated as a medical intervention and we make no medical or therapeutic claims about it.",
  },
];

export const SERVICE_BY_SLUG: Record<string, ServiceSpec> = Object.fromEntries(
  SERVICES.map((s) => [s.slug, s])
);

export const SERVICE_SLUGS = SERVICES.map((s) => s.slug);
