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
* **Zero-Config UI:** A dashboard for project maintainers to track how many "Global Contributors" are joining their project.

---

## ⚙️ Getting Started

### Prerequisites
* Node.js (v18+)
* A [Lingo.dev](https://lingo.dev) API Key
* An MCP-enabled IDE (like Cursor)

### Installation
1.  **Clone the repo:**
    ```bash
    git clone https://github.com/ShoaibAh/lingo-bridge.git
    cd lingo-bridge
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Initialize Lingo:**
    ```bash
    npx lingo.dev@latest init
    ```
4.  **Set up the MCP Server:**
    Add the following command to your IDE's MCP settings:
    `npx -y lingo.dev mcp <YOUR_LINGO_API_KEY>`

---

## 🎥 Demo
[Link to your Loom/YouTube demo video goes here]

## 🌍 Impact
By making onboarding accessible, we increase the diversity of the Open Source community and accelerate innovation by inviting the "next billion developers" to the table.

---

### 🤝 Acknowledgments
* Powered by [Lingo.dev](https://lingo.dev)
* Hackathon hosted via [Luma](https://luma.com/wv9mbyal)
