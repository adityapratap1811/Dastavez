# Dastavez (दस्तावेज़)

> **हर दस्तावेज़, आपकी ज़ुबान में।** Every document, in your language.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Hacktoberfest 2026](https://img.shields.io/badge/Hacktoberfest-2026-orange.svg)](https://hacktoberfest.com)
[![Built with ElevenLabs](https://img.shields.io/badge/Built%20with-ElevenLabs-black.svg)](https://elevenlabs.io)

Dastavez turns a phone into a patient reader. Photograph a bill, notice or form, hear it explained in simple words in your own language, then ask follow-up questions by voice.

![Dastavez architecture](./docs/architecture.svg)

## The problem

Many people receive documents they cannot read with confidence: electricity notices, court summons, bank KYC warnings, scholarship deadlines. The language is formal English or legal Hindi, so people miss deadlines, pay avoidable penalties, or fall for "digital arrest" and fake KYC scams. Elderly, first-generation and low-vision users are hit hardest.

## How it works

1. **Photograph or upload** a document. The image is downscaled on the client.
2. **Gemini Vision** extracts issuer, deadline, amount due, urgency (`red`, `yellow`, `green`), numbered actions and scam risk into one validated Zod schema.
3. **ElevenLabs** reads a plain-language explanation aloud, with word-by-word highlighting.
4. **Voice Q&A**: tap the mic and ask, for example, "What happens if I don't pay?". The agent answers from the document only.

Supported languages: Hindi (default), English, Bengali, Marathi, Tamil, Telugu, Urdu.

## ElevenLabs integration

| Capability | Use | Code |
| :--- | :--- | :--- |
| Text to Speech (Multilingual v2) | Spoken explanation | [`src/lib/elevenlabs.ts`](./src/lib/elevenlabs.ts) |
| TTS with timestamps | Live word highlighting | [`src/components/HighlightedText.tsx`](./src/components/HighlightedText.tsx) |
| Agents Platform | Voice Q&A grounded in the document | [`src/app/api/agent-session/route.ts`](./src/app/api/agent-session/route.ts), [`src/components/AgentCall.tsx`](./src/components/AgentCall.tsx) |
| Sound Effects | Urgency cues | [`scripts/generate-sfx.ts`](./scripts/generate-sfx.ts) |
| Scribe STT | Speech-to-text fallback | [`src/app/api/transcribe/route.ts`](./src/app/api/transcribe/route.ts) |

## Architecture

```
Phone camera / upload
        │
        ▼
Next.js PWA (client)
        │
        ├─ POST /api/analyze        → Gemini Vision → validated DocAnalysis JSON
        ├─ POST /api/speak          → ElevenLabs TTS + timestamps
        ├─ GET  /api/agent-session  → ElevenLabs agent signed URL
        └─ POST /api/transcribe     → ElevenLabs Scribe STT (fallback)
```

The screen, the spoken explanation and the voice agent all consume the same `DocAnalysis` JSON, so everything the user hears is grounded in the document.

## Tech stack

Next.js (App Router), React, TypeScript, Tailwind CSS, Zod, Vitest, Google Gemini Vision, ElevenLabs. PWA, Vercel-ready.

## Getting started

**Prerequisites:** Node.js 20+, an [ElevenLabs](https://elevenlabs.io) account and a [Google AI Studio](https://aistudio.google.com) API key.

```bash
git clone https://github.com/your-username/dastavez.git
cd dastavez
npm install
cp .env.example .env.local
```

Fill in `.env.local` (all keys are server-side only):

```bash
ELEVENLABS_API_KEY=
ELEVENLABS_AGENT_ID=
ELEVENLABS_VOICE_EXPLAIN_HI=
ELEVENLABS_VOICE_ORIGINAL_HI=
ELEVENLABS_TTS_MODEL=eleven_multilingual_v2
ELEVENLABS_STT_MODEL=scribe_v1
GEMINI_API_KEY=
VISION_MODEL=gemini-2.5-flash
```

Then run:

```bash
npm run dev
```

### Voice agent setup (optional)

1. Create an agent in the [ElevenLabs Agents dashboard](https://elevenlabs.io/app/conversational-ai).
2. Paste the prompt from [`prompts/agent-system.md`](./prompts/agent-system.md).
3. Add the dynamic variables `{{doc_json}}` and `{{language}}`, and set the default language to Hindi.
4. Put the agent ID in `ELEVENLABS_AGENT_ID`.

## Demo mode

Add `?demo=1` to the URL for an offline demo with no API keys. It uses cached results for four sample documents: an electricity disconnection notice, a fake KYC SMS, a court summons and a scholarship form.

To rebuild the cache:

```bash
npx tsx scripts/generate-sfx.ts
npx tsx scripts/build-demo-cache.ts
```

## Privacy and safety

- **Nothing is stored.** No database; images and text live in server memory only for the request.
- **IDs are masked.** Aadhaar, PAN and bank account numbers show only the last 4 digits.
- **Not legal or medical advice.** Serious notices, such as court summons, point the user to a qualified professional.
- **Prompt-injection defense.** Scanned text is treated as data, never as instructions.
- **Third-party processing.** Images go to Google Gemini over HTTPS; text summaries go to ElevenLabs.

## Roadmap

- [ ] WhatsApp sharing of summaries
- [ ] On-device OCR for low-connectivity areas
- [ ] DigiLocker and UMANG integration

## Contributing

Contributions are welcome. See [CONTRIBUTING.md](./CONTRIBUTING.md) for beginner-friendly `good first issue` tasks.

## License

[MIT](./LICENSE)
