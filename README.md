# 📜 Dastavez (दस्तावेज़)

> **"हर दस्तावेज़, आपकी ज़ुबान में।"**  
> *(Every document, in your language.)*

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Hacktoberfest 2026](https://img.shields.io/badge/Hacktoberfest-2026-orange.svg)](https://hacktoberfest.com)
[![Built with ElevenLabs](https://img.shields.io/badge/Built%20with-ElevenLabs-black.svg?logo=elevenlabs)](https://elevenlabs.io)
[![Google Gemini Vision](https://img.shields.io/badge/Vision%20AI-Google%20Gemini-blue.svg)](https://ai.google.dev)
[![PWA Ready](https://img.shields.io/badge/PWA-Mobile--First-166761.svg)](https://web.dev/progressive-web-apps/)

---

## 🎥 Demo Video & Architecture Overview

![Dastavez Architecture](./docs/architecture.svg)

- **Live Application Demo:** [https://dastavez.vercel.app](https://dastavez.vercel.app) *(or run locally via `npm run dev`)*
- **Offline Demo Mode:** Supports zero-latency judging with pre-cached Hindi & English audio and document samples via `?demo=1`.

---

## 🚨 The Problem

Hundreds of millions of Indians receive documents they cannot fully read or comprehend: electricity disconnection notices, court summons, bank KYC warnings, scholarship deadlines, and medical prescriptions. The language is predominantly formal legal English or complex administrative Hindi.

According to the **National Family Health Survey (NFHS-5) & Census Data**, over **300 million adults in India have limited English literacy**, while elderly citizens and first-generation learners frequently struggle with bureaucratic terminology. As a result:
- People miss critical payment deadlines and incur punitive reconnection penalties.
- Innocent citizens fall victim to predatory SMS phishing and "digital arrest" cyber frauds threatening immediate bank account freezes.
- People panic or pay local middlemen just to read an ordinary letter.

---

## 💡 What Dastavez Does (4-Step Flow)

```
 [1. Photograph / Upload]  ==>  [2. Vision AI Extraction]  ==>  [3. Multilingual Speech]  ==>  [4. Voice Q&A Agent]
  Point phone camera at           Gemini Vision extracts         ElevenLabs reads simple         Ask "Kab tak bharna hai?"
  any physical paper               structured facts & urgency     Hindi explanation aloud         Agent answers live
```

1. **Point & Photograph:** Point any smartphone camera at a paper bill, notice, or letter. Client-side processing optimizes resolution and extracts clear images with zero lag.
2. **Instant Structured Understanding:** Gemini Vision parses the document in real time into a strict Zod schema: identifying issuer, deadline, total due, urgency level (`red`, `yellow`, `green`), concrete numbered actions, and scam probability.
3. **Voice-First Explanation with Timestamps:** ElevenLabs Multilingual v2 speaks the explanation in plain, conversational Hindi (or Bengali, Marathi, Tamil, Telugu, Urdu, English). Timestamps provide live word-by-word visual highlighting to assist low-literacy users.
4. **Interactive Voice Q&A:** Users tap the floating microphone and speak naturally (e.g., *"Is this a scam?"*, *"What happens if I don't pay?"*). The ElevenLabs Conversational AI Agent answers immediately, strictly grounded in the document facts.

---

## 🎙️ Built with ElevenLabs: Deep Integration Matrix

ElevenLabs is the foundational voice engine of Dastavez, not an afterthought. Five distinct capabilities power the experience:

| ElevenLabs Capability | Purpose in Dastavez | Source Code Implementation |
| :--- | :--- | :--- |
| **1. Text-to-Speech (Multilingual v2)** | Speaks simplified document summaries in natural, compassionate Indian voices. | [`src/lib/elevenlabs.ts`](./src/lib/elevenlabs.ts) (`textToSpeech`) |
| **2. TTS with Timestamps (`/with-timestamps`)** | Character-level alignments converted into word intervals for live highlighting. | [`src/lib/elevenlabs.ts`](./src/lib/elevenlabs.ts), [`src/components/HighlightedText.tsx`](./src/components/HighlightedText.tsx) |
| **3. Conversational AI Agents Platform** | Real-time, voice-to-voice Q&A session grounded in the document's structured JSON. | [`src/app/api/agent-session/route.ts`](./src/app/api/agent-session/route.ts), [`src/components/AgentCall.tsx`](./src/components/AgentCall.tsx) |
| **4. Sound Effects API (`/sound-generation`)** | Procedurally generated pleasant UI audio cues for urgency levels (calm chime, alert tone). | [`scripts/generate-sfx.ts`](./scripts/generate-sfx.ts), [`public/sfx/`](./public/sfx/) |
| **5. Scribe STT (`/speech-to-text`)** | Speech-to-text fallback transcription for offline or non-agent voice questions. | [`src/lib/elevenlabs.ts`](./src/lib/elevenlabs.ts) (`speechToText`), [`src/app/api/transcribe/route.ts`](./src/app/api/transcribe/route.ts) |

---

## 🏗️ Architecture & Data Flow

```
 Phone Camera / File Upload
            │
            ▼
 Next.js PWA (Client)
  ├─ DocCapture ──> Client-side downscale (max 1600px)
  ├─ LanguagePicker ──> 7 Indian languages (Hindi default)
  ├─ ResultView ──> UrgencyBadge + ScamWarning + ActionList
  ├─ VoicePlayer ──> Play / Pause / Speed Control (0.7x-1.2x) + HighlightedText
  └─ AgentCall ──> Animated Voice Orb + Live Transcript + Push-to-Talk Mic
            │
            ├─ [POST /api/analyze] ────> Google Gemini Vision ──> Validated Zod JSON
            ├─ [POST /api/speak] ──────> ElevenLabs Multilingual TTS + Timestamps
            ├─ [GET /api/agent-session]> ElevenLabs Private Agent Signed URL
            └─ [POST /api/transcribe] ─> ElevenLabs Scribe STT (Fallback Path)
```

### Key Design Principles
- **Grounding via Schema:** Vision AI generates one unified `DocAnalysis` schema. The UI, the TTS audio, and the Conversational Agent all consume the exact same structured data, ensuring zero hallucinations.
- **Credit & Token Protection:** Client-side image resizing, text pre-normalization (e.g. converting "₹2,340" to "2,340 rupees", "KYC" to "K-Y-C"), and in-memory TTS hashing caches repeated queries.
- **Two Distinct Voices:** The app features two voice personas:
  - *Explanation Voice:* Warm, friendly, colloquial Hindi voice for explaining next steps.
  - *Original Voice:* Formal voice for reading the verbatim legal excerpt.

---

## 💻 Tech Stack

- **Framework:** Next.js 14+ (App Router), React 18, TypeScript (Strict Mode)
- **Styling & UI:** Tailwind CSS, Lucide React, High-Contrast Accessible Design
- **Voice AI:** ElevenLabs REST API + Conversational AI Agent signed URLs + Sound Generation
- **Vision AI:** Google Gemini Vision (`gemini-2.5-flash` / `gemini-1.5-flash`)
- **Validation:** Zod 3.23 (strict runtime validation of all AI responses)
- **Testing:** Vitest 2.1 (schema and timestamp unit tests)
- **Deployment:** Vercel-ready, Progressive Web App (PWA) installable

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 20+ installed
- ElevenLabs Account ([elevenlabs.io](https://elevenlabs.io))
- Google AI Studio API Key ([aistudio.google.com](https://aistudio.google.com))

### 2. Installation
```bash
git clone https://github.com/your-username/dastavez.git
cd dastavez
npm install
```

### 3. Environment Configuration
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Fill in your API credentials:
```bash
# --- ElevenLabs (server-side only, never exposed to client) ---
ELEVENLABS_API_KEY=your_elevenlabs_api_key
ELEVENLABS_AGENT_ID=your_elevenlabs_agent_id
ELEVENLABS_VOICE_EXPLAIN_HI=21m00Tcm4TlvDq8ikWAM
ELEVENLABS_VOICE_ORIGINAL_HI=AZnzlk1XvdvUeBnXmlld
ELEVENLABS_TTS_MODEL=eleven_multilingual_v2
ELEVENLABS_STT_MODEL=scribe_v1

# --- Vision LLM (server-side only) ---
GEMINI_API_KEY=your_gemini_api_key
VISION_MODEL=gemini-2.5-flash
```

### 4. Create the ElevenLabs Voice Agent (Optional for Live Agent)
1. Go to the [ElevenLabs Agents Dashboard](https://elevenlabs.io/app/conversational-ai).
2. Create a new Agent named **"Dastavez Voice Assistant"**.
3. Copy the system prompt from [`prompts/agent-system.md`](./prompts/agent-system.md) into the agent's Prompt field.
4. Add dynamic variables: `{{doc_json}}` and `{{language}}`.
5. Set Default Language to **Hindi** and choose a clear voice.
6. Copy your **Agent ID** into `ELEVENLABS_AGENT_ID` in `.env.local`.

### 5. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚡ Demo Mode (Hackathon-Proof & Offline-Ready)

To ensure zero interruptions during live hackathon judging, Dastavez includes a dedicated **Demo Mode**:
- Activate the toggle in the UI or add `?demo=1` to the URL.
- **Zero API Keys Required:** Pre-computed structured JSON and voice assets are cached for 4 realistic Indian documents:
  1. **UPPCL Electricity Bill:** Imminent disconnection warning within 3 days (`red` urgency).
  2. **Fake Bank KYC SMS Notice:** High-risk phishing detection with cybercrime reporting guidance.
  3. **District Court Summons:** Civil lawsuit summons with advocate recommendation.
  4. **Post-Matric Scholarship Form:** State scholarship renewal checklist (`green` status).

To re-build or refresh demo assets:
```bash
npx tsx scripts/generate-sfx.ts
npx tsx scripts/build-demo-cache.ts
```

---

## 🛡️ Privacy, Safety & Limitations (Honest Disclosure)

- **Zero Storage Policy:** Dastavez has no database. Uploaded images and text exist purely in ephemeral server memory during the request lifecycle and are never saved to disk or logged.
- **Sensitive Data Masking:** Identifiers like Aadhaar, PAN, and bank accounts are automatically masked (showing only the last 4 digits).
- **Not Legal/Medical Advice:** The app prominently displays disclaimers. If `needs_professional_help` is flagged (e.g. for court summons), the UI and voice agent urge consulting a registered advocate or qualified professional.
- **Prompt Injection Defense:** Scanned text is treated strictly as data to be interpreted, never as executable instructions.
- **Third-Party Processing:** Images are sent via encrypted HTTPS to Google Gemini for vision extraction; text summaries are sent to ElevenLabs for speech synthesis.

---

## 🗺️ Roadmap

- [x] Multilingual text-to-speech with live word-by-word highlighting
- [x] Conversational AI voice agent with document grounding
- [x] Phishing and fraud risk detection
- [x] Two-voice persona (Explanation vs Original Text)
- [ ] WhatsApp Bot integration for sending summaries to family members
- [ ] Offline local on-device OCR model for rural areas with no connectivity
- [ ] Integration with State Government welfare portals (DigiLocker & UMANG)

---

## 🤝 Contributing & License

We love contributions! Please read our [CONTRIBUTING.md](./CONTRIBUTING.md) for 5 beginner-friendly issues (`good first issue`) to get started during Hacktoberfest.

This project is licensed under the [MIT License](./LICENSE).

---

## 👥 Acknowledgements

Special thanks to:
- **ElevenLabs** for the Hacktoberfest support, developer grants, and lifelike Multilingual v2 voice synthesis.
- **Google DeepMind / Gemini** for rapid multimodal vision inference.
- Open-source contributors building accessible technology for all.
