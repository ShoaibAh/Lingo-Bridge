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

const server = new McpServer(
  {
    name: "lingo-repo-agent",
    version: "1.0.0",
  },
  {
    capabilities: { tools: {} },
  }
);

// 2. Register the tool with the high-level API
server.registerTool(
  "localize_github_readme",
  {
    description:
      "Fetches a GitHub repository README and uses lingo.dev to translate it for non-English contributors.",
    inputSchema: {
      owner: z.string(),
      repo: z.string(),
      targetLocale: z
        .string()
        .describe("ISO code like 'es-ES', 'zh-CN', or 'fr-FR'"),
      readmePath: z
        .string()
        .optional()
        .describe('Path to README file, default "README.md"'),
    },
  },
  async ({ owner, repo, targetLocale, readmePath = "README.md" }) => {
    // Step A: Get README content from GitHub
    const { data: readme } = await octokit.request(
      "GET /repos/{owner}/{repo}/contents/{path}",
      {
        owner,
        repo,
        path: readmePath,
      }
    );

    const readmeContent = Buffer.from(
      readme.content,
      readme.encoding || "base64"
    ).toString("utf8");

    // Step B: Use lingo.dev to translate the README
    const translatedReadme = await lingoDotDev.localizeText(readmeContent, {
      sourceLocale: "en",
      targetLocale,
    });

    return {
      content: [
        {
          type: "text",
          text: translatedReadme,
        },
      ],
    };
  }
);

// 3. Register the issue translation tool
server.registerTool(
  "localize_github_issue",
  {
    description:
      "Fetches a GitHub issue and uses lingo.dev to translate it for non-English contributors.",
    inputSchema: {
      owner: z.string(),
      repo: z.string(),
      issueNumber: z.number(),
      targetLocale: z
        .string()
        .describe("ISO code like 'es-ES', 'zh-CN', or 'fr-FR'"),
    },
  },
  async ({ owner, repo, issueNumber, targetLocale }) => {
    // Step A: Get issue content from GitHub
    const { data: issue } = await octokit.request(
      "GET /repos/{owner}/{repo}/issues/{issue_number}",
      {
        owner,
        repo,
        issue_number: issueNumber,
      }
    );

    // Step B: Translate title and body separately
    const translatedTitle = await lingoDotDev.localizeText(issue.title, {
      sourceLocale: "en",
      targetLocale,
    });

    const translatedBody = await lingoDotDev.localizeText(issue.body || "", {
      sourceLocale: "en",
      targetLocale,
    });

    return {
      content: [
        {
          type: "text",
          text: `### Translated Issue #${issueNumber}\n\n**Title:** ${translatedTitle}\n\n---\n\n${translatedBody}`,
        },
      ],
    };
  }
);

// Start the server
const transport = new StdioServerTransport();
await server.connect(transport);