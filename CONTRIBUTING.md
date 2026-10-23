# Contributing to Dastavez (दस्तावेज़)

Welcome! Thank you for considering contributing to **Dastavez** (*Har dastavez, aapki zubaan mein*). We are proud participants in **Hacktoberfest** and welcome contributions of all skill levels, from design and documentation to deep voice AI engineering.

## Code of Conduct
Please review and adhere to our [Code of Conduct](./CODE_OF_CONDUCT.md) to keep our community inclusive, welcoming, and harassment-free.

---

## 🎯 5 Good First Issues for Hacktoberfest

Here are 5 beginner-friendly issues ready for contributors:

1. **`good-first-issue` / `i18n`: Add Punjabi (pa) and Gujarati (gu) Language Configs**
   - File: `src/lib/languages.ts`
   - Task: Add language configs with native script labels and verify ElevenLabs Multilingual v2 voice IDs.

2. **`good-first-issue` / `accessibility`: Add High-Contrast Mode Toggle & Devanagari Dyslexic Font Option**
   - File: `src/styles/globals.css`, `src/app/layout.tsx`
   - Task: Introduce an accessible high-contrast toggle button in the navbar for low-vision users.

3. **`good-first-issue` / `samples`: Add Synthetic Medical Prescription & Hospital Discharge Summary**
   - Files: `samples/`, `src/lib/demo.ts`
   - Task: Create a realistic synthetic doctor prescription sample demonstrating medicine schedule explanations in Hindi.

4. **`good-first-issue` / `ux`: Add Audio Download / MP3 Export Button on Result Screen**
   - File: `src/components/VoicePlayer.tsx`
   - Task: Provide a one-click button allowing users to download the spoken explanation MP3 to their phone for offline playback.

5. **`good-first-issue` / `tests`: Add Robustness Test Cases for Blurry & Rotated Documents**
   - File: `tests/schema.test.ts`
   - Task: Add tests asserting proper `readable: false` handling across various non-standard image payloads.

---

## 🛠️ Local Development Setup

1. **Prerequisites:**
   - Node.js 20+ installed
   - npm or pnpm

2. **Clone & Install:**
   ```bash
   git clone https://github.com/your-username/dastavez.git
   cd dastavez
   npm install
   ```

3. **Configure Environment:**
   ```bash
   cp .env.example .env.local
   ```
   Add your `ELEVENLABS_API_KEY` and `GEMINI_API_KEY`.
   *(Note: The app runs in Demo Mode with instant offline mock responses even without API keys!)*

4. **Run Development Server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

5. **Run Test Suite:**
   ```bash
   npm run test
   ```

---

## 🚀 Submitting a Pull Request
1. Fork the repository and create your branch from `main`: `git checkout -b feature/my-improvement`.
2. Make your changes with clean, readable code and clear commit messages.
3. Verify that tests pass: `npm run test` and `npm run build`.
4. Open a Pull Request referencing the issue you solved.
