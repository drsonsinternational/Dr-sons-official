# Technology Stack: DrSons International Portal

## 1. Overview

The DrSons International portal is a high-performance modern web application centered around a React 19 and Vite 8 frontend with Tailwind CSS v4 styling, configured for deployment onto Cloudflare Pages / Workers infrastructure ([package.json:14-36](file:///C:/Users/ASUS%20PC/.gemini/antigravity/worktrees/8464c7cb-1913-4e11-82d3-7ea8e440598e/subagent-Codebase-Researcher-gsd-researcher-798c8ce9/package.json#L14-L36), [wrangler.jsonc:1-9](file:///C:/Users/ASUS%20PC/.gemini/antigravity/worktrees/8464c7cb-1913-4e11-82d3-7ea8e440598e/subagent-Codebase-Researcher-gsd-researcher-798c8ce9/wrangler.jsonc#L1-L9)).

---

## 2. Core Language & Runtime

| Component | Specification / Version | File Reference |
| :--- | :--- | :--- |
| **Language** | TypeScript `^7.0.2` (Target: `ES2022`, JSX: `react-jsx`) | [package.json:33](file:///C:/Users/ASUS%20PC/.gemini/antigravity/worktrees/8464c7cb-1913-4e11-82d3-7ea8e440598e/subagent-Codebase-Researcher-gsd-researcher-798c8ce9/package.json#L33), [tsconfig.json:3,18](file:///C:/Users/ASUS%20PC/.gemini/antigravity/worktrees/8464c7cb-1913-4e11-82d3-7ea8e440598e/subagent-Codebase-Researcher-gsd-researcher-798c8ce9/tsconfig.json#L3) |
| **Module System** | ECMAScript Modules (`"type": "module"`, `moduleResolution: "bundler"`) | [package.json:6](file:///C:/Users/ASUS%20PC/.gemini/antigravity/worktrees/8464c7cb-1913-4e11-82d3-7ea8e440598e/subagent-Codebase-Researcher-gsd-researcher-798c8ce9/package.json#L6), [tsconfig.json:6,14](file:///C:/Users/ASUS%20PC/.gemini/antigravity/worktrees/8464c7cb-1913-4e11-82d3-7ea8e440598e/subagent-Codebase-Researcher-gsd-researcher-798c8ce9/tsconfig.json#L6) |
| **Runtime Target** | Modern evergreen browsers (DOM, DOM.Iterable, ES2022) / Node.js 18+ | [tsconfig.json:8-12](file:///C:/Users/ASUS%20PC/.gemini/antigravity/worktrees/8464c7cb-1913-4e11-82d3-7ea8e440598e/subagent-Codebase-Researcher-gsd-researcher-798c8ce9/tsconfig.json#L8-L12), [README.md:61](file:///C:/Users/ASUS%20PC/.gemini/antigravity/worktrees/8464c7cb-1913-4e11-82d3-7ea8e440598e/subagent-Codebase-Researcher-gsd-researcher-798c8ce9/README.md#L61) |

---

## 3. Frameworks & UI Ecosystem

| Dependency | Version | Role & Notes | File Reference |
| :--- | :--- | :--- | :--- |
| **`react`** | `^19.0.1` | UI rendering engine | [package.json:19](file:///C:/Users/ASUS%20PC/.gemini/antigravity/worktrees/8464c7cb-1913-4e11-82d3-7ea8e440598e/subagent-Codebase-Researcher-gsd-researcher-798c8ce9/package.json#L19) |
| **`react-dom`** | `^19.0.1` | DOM mount / client entrypoint via `createRoot` | [package.json:20](file:///C:/Users/ASUS%20PC/.gemini/antigravity/worktrees/8464c7cb-1913-4e11-82d3-7ea8e440598e/subagent-Codebase-Researcher-gsd-researcher-798c8ce9/package.json#L20), [src/main.tsx:1](file:///C:/Users/ASUS%20PC/.gemini/antigravity/worktrees/8464c7cb-1913-4e11-82d3-7ea8e440598e/subagent-Codebase-Researcher-gsd-researcher-798c8ce9/src/main.tsx#L1) |
| **`lucide-react`** | `^0.546.0` | UI iconography (`Check`, `Copy`, `Mail`, `ArrowRight`, `MessageSquare`, `Apple`, `Coffee`, `PackageCheck`, etc.) | [package.json:18](file:///C:/Users/ASUS%20PC/.gemini/antigravity/worktrees/8464c7cb-1913-4e11-82d3-7ea8e440598e/subagent-Codebase-Researcher-gsd-researcher-798c8ce9/package.json#L18), [src/App.tsx:2-17](file:///C:/Users/ASUS%20PC/.gemini/antigravity/worktrees/8464c7cb-1913-4e11-82d3-7ea8e440598e/subagent-Codebase-Researcher-gsd-researcher-798c8ce9/src/App.tsx#L2-L17) |
| **`motion`** | `^12.23.24` | Motion / animation library (Installed; latent dependency) | [package.json:24](file:///C:/Users/ASUS%20PC/.gemini/antigravity/worktrees/8464c7cb-1913-4e11-82d3-7ea8e440598e/subagent-Codebase-Researcher-gsd-researcher-798c8ce9/package.json#L24) |

---

## 4. Styling & Typography

| Tool / Resource | Specification | Notes | File Reference |
| :--- | :--- | :--- | :--- |
| **`tailwindcss`** | `^4.3.3` | Tailwind CSS v4 engine | [package.json:31](file:///C:/Users/ASUS%20PC/.gemini/antigravity/worktrees/8464c7cb-1913-4e11-82d3-7ea8e440598e/subagent-Codebase-Researcher-gsd-researcher-798c8ce9/package.json#L31), [src/index.css:1](file:///C:/Users/ASUS%20PC/.gemini/antigravity/worktrees/8464c7cb-1913-4e11-82d3-7ea8e440598e/subagent-Codebase-Researcher-gsd-researcher-798c8ce9/src/index.css#L1) |
| **`@tailwindcss/vite`** | `^4.3.3` | Official Vite plugin for Tailwind v4 compilation | [package.json:16](file:///C:/Users/ASUS%20PC/.gemini/antigravity/worktrees/8464c7cb-1913-4e11-82d3-7ea8e440598e/subagent-Codebase-Researcher-gsd-researcher-798c8ce9/package.json#L16), [vite.config.ts:1,8](file:///C:/Users/ASUS%20PC/.gemini/antigravity/worktrees/8464c7cb-1913-4e11-82d3-7ea8e440598e/subagent-Codebase-Researcher-gsd-researcher-798c8ce9/vite.config.ts#L1) |
| **`autoprefixer`** | `^10.4.21` | CSS vendor prefix postprocessing | [package.json:30](file:///C:/Users/ASUS%20PC/.gemini/antigravity/worktrees/8464c7cb-1913-4e11-82d3-7ea8e440598e/subagent-Codebase-Researcher-gsd-researcher-798c8ce9/package.json#L30) |
| **Typography (Sans)** | *Plus Jakarta Sans* | Primary body font loaded from Google Fonts CDN | [index.html:14](file:///C:/Users/ASUS%20PC/.gemini/antigravity/worktrees/8464c7cb-1913-4e11-82d3-7ea8e440598e/subagent-Codebase-Researcher-gsd-researcher-798c8ce9/index.html#L14), [src/index.css:5](file:///C:/Users/ASUS%20PC/.gemini/antigravity/worktrees/8464c7cb-1913-4e11-82d3-7ea8e440598e/subagent-Codebase-Researcher-gsd-researcher-798c8ce9/src/index.css#L5) |
| **Typography (Serif)** | *Playfair Display* | Editorial/brand serif class `.font-serif-brand` | [index.html:14](file:///C:/Users/ASUS%20PC/.gemini/antigravity/worktrees/8464c7cb-1913-4e11-82d3-7ea8e440598e/subagent-Codebase-Researcher-gsd-researcher-798c8ce9/index.html#L14), [src/index.css:13-15](file:///C:/Users/ASUS%20PC/.gemini/antigravity/worktrees/8464c7cb-1913-4e11-82d3-7ea8e440598e/subagent-Codebase-Researcher-gsd-researcher-798c8ce9/src/index.css#L13-L15) |

---

## 5. Build, Bundling & Dev Tooling

| Tool | Version | Configuration Details | File Reference |
| :--- | :--- | :--- | :--- |
| **`vite`** | `^8.3.0` | Development server (`--port=3000 --host=0.0.0.0`) and production bundler | [package.json:8-10,21](file:///C:/Users/ASUS%20PC/.gemini/antigravity/worktrees/8464c7cb-1913-4e11-82d3-7ea8e440598e/subagent-Codebase-Researcher-gsd-researcher-798c8ce9/package.json#L8-L10), [vite.config.ts:4-22](file:///C:/Users/ASUS%20PC/.gemini/antigravity/worktrees/8464c7cb-1913-4e11-82d3-7ea8e440598e/subagent-Codebase-Researcher-gsd-researcher-798c8ce9/vite.config.ts#L4-L22) |
| **`@vitejs/plugin-react`** | `^6.1.1` | React Fast Refresh and JSX compilation for Vite | [package.json:17](file:///C:/Users/ASUS%20PC/.gemini/antigravity/worktrees/8464c7cb-1913-4e11-82d3-7ea8e440598e/subagent-Codebase-Researcher-gsd-researcher-798c8ce9/package.json#L17), [vite.config.ts:2,8](file:///C:/Users/ASUS%20PC/.gemini/antigravity/worktrees/8464c7cb-1913-4e11-82d3-7ea8e440598e/subagent-Codebase-Researcher-gsd-researcher-798c8ce9/vite.config.ts#L2) |
| **`tsx`** | `^4.21.0` | TypeScript execution engine for Node scripts | [package.json:32](file:///C:/Users/ASUS%20PC/.gemini/antigravity/worktrees/8464c7cb-1913-4e11-82d3-7ea8e440598e/subagent-Codebase-Researcher-gsd-researcher-798c8ce9/package.json#L32) |
| **`wrangler`** | `^3.114.0` | Cloudflare CLI / worker runtime manager | [package.json:35](file:///C:/Users/ASUS%20PC/.gemini/antigravity/worktrees/8464c7cb-1913-4e11-82d3-7ea8e440598e/subagent-Codebase-Researcher-gsd-researcher-798c8ce9/package.json#L35), [wrangler.jsonc:1-9](file:///C:/Users/ASUS%20PC/.gemini/antigravity/worktrees/8464c7cb-1913-4e11-82d3-7ea8e440598e/subagent-Codebase-Researcher-gsd-researcher-798c8ce9/wrangler.jsonc#L1-L9) |

---

## 6. Cloud & External Integrations

| Integration | Type | Details | File Reference |
| :--- | :--- | :--- | :--- |
| **Cloudflare Pages / Workers** | Hosting | Static asset directory `./dist`, SPA routing mode | [wrangler.jsonc:4-8](file:///C:/Users/ASUS%20PC/.gemini/antigravity/worktrees/8464c7cb-1913-4e11-82d3-7ea8e440598e/subagent-Codebase-Researcher-gsd-researcher-798c8ce9/wrangler.jsonc#L4-L8) |
| **WhatsApp Trade Desk** | Outbound Bridge | Formatted inquiry dispatch directly to phone `+91 9411268879` | [src/App.tsx:113,163](file:///C:/Users/ASUS%20PC/.gemini/antigravity/worktrees/8464c7cb-1913-4e11-82d3-7ea8e440598e/subagent-Codebase-Researcher-gsd-researcher-798c8ce9/src/App.tsx#L113) |
| **Google Gemini API** | AI Service (Staged) | `@google/genai` dependency present; `GEMINI_API_KEY` configured in `.env.example` | [package.json:15](file:///C:/Users/ASUS%20PC/.gemini/antigravity/worktrees/8464c7cb-1913-4e11-82d3-7ea8e440598e/subagent-Codebase-Researcher-gsd-researcher-798c8ce9/package.json#L15), [.env.example:4](file:///C:/Users/ASUS%20PC/.gemini/antigravity/worktrees/8464c7cb-1913-4e11-82d3-7ea8e440598e/subagent-Codebase-Researcher-gsd-researcher-798c8ce9/.env.example#L4) |
| **Express Backend** | Server (Staged) | `express` and `@types/express` present in `package.json` | [package.json:22,34](file:///C:/Users/ASUS%20PC/.gemini/antigravity/worktrees/8464c7cb-1913-4e11-82d3-7ea8e440598e/subagent-Codebase-Researcher-gsd-researcher-798c8ce9/package.json#L22) |

---

## 7. Package Scripts & Workflows

| Script | Command | Purpose | File Reference |
| :--- | :--- | :--- | :--- |
| `dev` | `vite --port=3000 --host=0.0.0.0` | Launch local Vite development server on port 3000 | [package.json:8](file:///C:/Users/ASUS%20PC/.gemini/antigravity/worktrees/8464c7cb-1913-4e11-82d3-7ea8e440598e/subagent-Codebase-Researcher-gsd-researcher-798c8ce9/package.json#L8) |
| `build` | `vite build` | Compile and bundle production assets to `./dist` | [package.json:9](file:///C:/Users/ASUS%20PC/.gemini/antigravity/worktrees/8464c7cb-1913-4e11-82d3-7ea8e440598e/subagent-Codebase-Researcher-gsd-researcher-798c8ce9/package.json#L9) |
| `preview` | `vite preview` | Locally preview `./dist` production output | [package.json:10](file:///C:/Users/ASUS%20PC/.gemini/antigravity/worktrees/8464c7cb-1913-4e11-82d3-7ea8e440598e/subagent-Codebase-Researcher-gsd-researcher-798c8ce9/package.json#L10) |
| `clean` | `rm -rf dist server.js` | Remove generated build artifact directories and server output | [package.json:11](file:///C:/Users/ASUS%20PC/.gemini/antigravity/worktrees/8464c7cb-1913-4e11-82d3-7ea8e440598e/subagent-Codebase-Researcher-gsd-researcher-798c8ce9/package.json#L11) |
| `lint` | `tsc --noEmit` | Run TypeScript type-checking across project files without emitting JS | [package.json:12](file:///C:/Users/ASUS%20PC/.gemini/antigravity/worktrees/8464c7cb-1913-4e11-82d3-7ea8e440598e/subagent-Codebase-Researcher-gsd-researcher-798c8ce9/package.json#L12) |

---

## 8. Unknowns & Undetermined Elements

- **Node/TypeScript Runtime Availability in Worktree**: `node_modules` is not populated in this fresh worktree context, preventing execution of `tsc` directly without `npm install`.
- **Purpose of Express & tsx Dependencies**: `express`, `@types/express`, `dotenv`, and `tsx` are in `package.json` dependencies/devDependencies ([package.json:22-23,32,34](file:///C:/Users/ASUS%20PC/.gemini/antigravity/worktrees/8464c7cb-1913-4e11-82d3-7ea8e440598e/subagent-Codebase-Researcher-gsd-researcher-798c8ce9/package.json#L22-L23)), but no backend script file (such as `server.ts` or `server.js`) exists in the repository.

