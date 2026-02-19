import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { LingoDotDevEngine } from "lingo.dev/sdk"; // Using the lingo.dev SDK
import { Octokit } from "@octokit/core";

// 1. Initialize Clients
const lingoDotDev = new LingoDotDevEngine({
  apiKey: process.env.LINGODOTDEV_API_KEY,
});
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

const server = new McpServer({
  name: "lingo-repo-agent",
  version: "1.0.0",
}, {
  capabilities: { tools: {} },
});

// 2. Register the tool with the high-level API
server.registerTool("localize_github_issue", {
  description: "Fetches a GitHub issue and uses lingo.dev to translate it for non-English contributors.",
  inputSchema: {
    owner: z.string(),
    repo: z.string(),
    issueNumber: z.number(),
    targetLocale: z.string().describe("ISO code like 'es-ES', 'zh-CN', or 'fr-FR'"),
  },
}, async ({ owner, repo, issueNumber, targetLocale }) => {
  // Step A: Get content from GitHub
  const { data: issue } = await octokit.request('GET /repos/{owner}/{repo}/issues/{issue_number}', {
    owner, repo, issue_number: issueNumber
  });

  const localizeObject = {
    title: issue.title,
    body: issue.body,

  }
  // Step B: Use lingo.dev to translate
  const translationResult = await lingoDotDev.localizeObject(localizeObject, {
    sourceLocale: "en",
    targetLocale: targetLocale
  });

  return {
    content: [{
      type: "text",
      text: `### Translated Issue #${issueNumber}\n\n**Title:** ${translationResult}\n\n---\n${translatedBody}`
    }]
  };
});

// Start the server
const transport = new StdioServerTransport();
await server.connect(transport);