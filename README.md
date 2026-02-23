# 🌉 Lingo-Bridge: Multilingual Repo Onboarding Agent

**Breaking the language barrier in Open Source, one repository at a time.**

Built for the [Lingo.dev Multilingual Hackathon 2026](https://luma.com/wv9mbyal).

---

## 📖 The Problem

Open Source is global, but documentation is not. Over **75% of the world's population** does not speak English fluently, yet the vast majority of top GitHub repositories are English-only. This creates a "Language Wall" that prevents thousands of talented developers from contributing to world-changing projects.

## ✨ The Solution: Lingo-Bridge

**Lingo-Bridge** is an AI-powered onboarding sidekick that transforms any English-centric repository into a localized, welcoming environment for global contributors. By leveraging the **Lingo.dev ecosystem**, it allows developers to interact with codebases, read documentation, and track issues in their native tongue—without the maintainers ever having to manually translate a single line.

---

## 🛠️ Tech Stack & Lingo.dev Integration

To maximize impact and technical depth, Lingo-Bridge utilizes the full Lingo.dev suite:

* **Lingo MCP (Model Context Protocol):** Connects the AI Agent (Cursor/Claude) directly to Lingo’s translation engine, allowing the agent to "understand" and translate repo context on the fly.
* **Lingo SDK:** Used for dynamic, real-time translation of GitHub Issues and contributor discussions.
* **Lingo Compiler:** Powering our web dashboard with a **"Zero-Refactor"** approach—ensuring the UI is localized instantly for every user.
* **Lingo CLI:** Automates the creation of localized documentation (`README.es.md`, `CONTRIBUTING.zh.md`, etc.) via GitHub Actions.

---

## 🚀 Key Features

* **Context-Aware Translation:** Uses AI to ensure technical terms (like "middleware" or "rebase") are translated accurately within a developer's context.
* **On-the-Fly Docs:** Generate localized versions of any `.md` file in the repo with a single command.
* **Interactive Issue Bridge:** Submit issues in your native language; Lingo-Bridge translates them for maintainers while keeping your view localized.

---

## ⚙️ Getting Started

### Prerequisites

* Node.js (v18+)
* A [Lingo.dev](https://lingo.dev) API Key
* An MCP-enabled IDE (like Cursor)

### Installation

1. **Clone the repo:**

   ```bash
   git clone https://github.com/ShoaibAh/lingo-bridge.git
   cd lingo-bridge
   ```
2. **Install dependencies:**

   ```bash
   npm install
   ```
3. **Initialize Lingo:**

   ```bash
   npx lingo.dev@latest init
   ```
4. **Set up the MCP Server:**
   Add the following command to your IDE's MCP settings:

   ```javascript
     "mcpServers": {
       "lingo-github-contents": {
         "command": "node",
         "args": ["./lingo-agent.js"],
         "env": {
           "GITHUB_TOKEN": "${GITHUB_TOKEN}",
           "LINGODOTDEV_API_KEY": "${LINGODOTDEV_API_KEY}"
         }
       },
       "lingo-i18n": {
         "url": "https://mcp.lingo.dev/main"
       }
     }

   ```

   - ### Server 1: user-lingo-agent (lingo-agent)
   - 1. `localize_github_issue`

     - Fetches a GitHub issue and uses lingo.dev to translate it for non-English contributors
     - Parameters: `owner`, `repo`, `issueNumber`, `targetLocale`, optional `outputPath`
     - Saves to `{owner}-{repo}-issue-{issueNumber}-{targetLocale}.md` by default
   - 2. `localize_github_readme`

     - Fetches a GitHub repository README and uses lingo.dev to translate it for non-English contributors
     - Parameters: `owner`, `repo`, `targetLocale`, optional `readmePath`
   - ### Server 2: user-lingo-i18n (lingo-i18n)
   - 1. `get_framework_docs`

     - Retrieves framework documentation from official repositories
     - Supports: nextjs-app-router, nextjs-pages-router, tanstack-start, react-router
     - Parameters: framework (required), version (default: "latest"), action ("index" or "read"), section_id (for reading)
   - 2. `get_i18n_library_docs`

     - Retrieves documentation for i18n libraries (currently react-intl)
     - Parameters: library (required, currently only "react-intl"), version, action, section_id
   - 3. `get_project_context`

     - Captures project architecture to inform i18n implementation strategy
     - Parameters: detectionResults (required) - complex object with framework detection, TypeScript, package manager, locales, etc.
   - 4. `i18n_checklist`

     - Mandatory tool for all i18n work - provides a structured 13-step checklist
     - Parameters: step_number (1-13), done (boolean), evidence (array), build_passing (boolean)

---

## 🎥 Demo: Try These Prompts in Your IDE

- prompts like `Translate this repo README to Spanish (owner: facebook, repo: react)` will translate the README content via `localize_github_readme` and save it as `README.es.md`.
- prompts like `Translate issue #2000 from facebook/react to es-ES` will fetch the issue via `localize_github_issue` and save it as `facebook-react-issue-2000.es` by default (or to your `outputPath`).

### Quick demo video

> Sidenote: If the video doesn’t render on GitHub, open `./demo/hackathon_demo.mov` directly.

<video src="./demo//hackathon_demo.mov" controls>
    Your browser does not support the video tag.
</video>


## 🌍 Impact

By making onboarding accessible, we increase the diversity of the Open Source community and accelerate innovation by inviting the "next billion developers" to the table.

---

### 🤝 Acknowledgments

* Powered by [Lingo.dev](https://lingo.dev)
* Hackathon hosted via [Luma](https://luma.com/wv9mbyal)
