# Claude Code Capabilities Demo

An interactive demonstration of Claude Code's integrated capabilities, featuring a Next.js gift wrapping price calculator with an intentional bug designed to showcase automated bug-fixing workflows.

## Overview

This demo showcases the following Claude Code features:

| Capability | Description |
|------------|-------------|
| **Custom Commands** | Automated workflows for bug fixing and demo reset |
| **Custom Skills** | AST-based structural code search |
| **MCP Servers** | OpenAPI integration for API testing + Jira for ticket management |
| **Playwright Testing** | E2E tests in headed mode for visual demonstration |
| **Developer Persona** | Customized behavior via CLAUDE.md |

## Demo Application

The **Gift Wrapping Price Calculator** allows customers to select gift sizes and apply promo codes. It contains an intentional bug where the price calculation is reversed (`discount - basePrice` instead of `basePrice - discount`), causing negative prices when the SANTA promo code is applied.

---

## Claude Code Capabilities

### Custom Commands

Located in `.claude/commands/`

#### `/fix <ticket-id>` - Automated Bug Fix Workflow

A comprehensive workflow that:
1. **Ingest** - Reads the Jira ticket and transitions it to "In Progress"
2. **Verify** - Reproduces the issue locally
3. **Plan** - Analyzes codebase and presents fix plan for approval
4. **Fix** - Implements the fix and runs tests
5. **Test** - Launches Playwright in headed mode for visual verification
6. **Resolve** - Posts root cause comment and transitions ticket to "Done"

#### `/reset-demo` - Reset Demo State

Resets the demo environment to its initial buggy state:
- Reintroduces the price calculation bug
- Resets Jira ticket to "To Do"
- Clears ticket comments
- Restarts the dev server
- Verifies reset by running tests (expects failure)

### Custom Skills

Located in `.claude/skills/`

#### `/ast-grep` - Structural Code Search

Searches code using Abstract Syntax Tree patterns rather than text matching. Finds code structures based on syntax regardless of formatting or variable names.

**Example - Finding the demo bug:**
```bash
ast-grep run -p 'discount - $VAR' -l typescript
```

This pattern finds reversed operand bugs like `discount - basePrice` (should be `basePrice - discount`).

**Common patterns:**

| Goal | Pattern |
|------|---------|
| Find subtraction with specific operand | `discount - $VAR` |
| Find useEffect with empty deps | `useEffect($FN, [])` |
| Find console.log calls | `console.log($$$)` |

### MCP Servers

Configured in `.mcp.json`

#### OpenAPI Server

Exposes the price calculation API as a tool Claude can call directly:
- **Tool:** `mcp__openapi__calculate-price`
- **Spec:** `openapi.yaml`

#### Jira Integration

Provides ticket management capabilities (requires your own Jira instance):
- Search issues with JQL
- Read ticket details
- Transition ticket status
- Add comments

### Playwright Testing

Configured in `playwright.config.ts` for visual demonstration:

```typescript
headless: false,  // Headed mode - audience can see tests run
slowMo: 1000,     // 1 second delay between actions
```

**Test file:** `tests/price.spec.ts`

Tests that the SANTA promo code gives a $10 discount (expects $15 final price, not -$15).

### Developer Persona

Configured in `CLAUDE.md`:

- **Role:** Senior Backend Engineer
- **Style:** Verbose explanations, shows work before each step
- **Testing:** Always uses headed browsers for audience visibility
- **Failures:** Treats test failures as "valuable signals"
- **Business Focus:** Emphasizes financial impact of bugs

---

## Prerequisites

- Node.js 18+ (LTS recommended)
- npm or yarn
- [Claude Code CLI](https://docs.anthropic.com/en/docs/claude-code) installed
- Jira Cloud instance (you must set up your own)
- Atlassian API token

## Installation

```bash
git clone https://github.com/convective/cpg-elf-portal.git
cd ai-demo-1
npm install
npx playwright install chromium
```

## Jira Setup

You need your own Jira Cloud instance to use the full demo workflow.

1. **Create a Jira Cloud project** (e.g., "Elf Portal" with key `EP`)

2. **Create a test ticket** for the pricing bug (e.g., EP-1)
   - Summary: "SANTA promo code produces negative prices"
   - Description: Customers are seeing -$15 instead of $15

3. **Generate an API token** - See [Atlassian API tokens documentation](https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/)

4. **Get your Cloud ID** - Visit `https://your-site.atlassian.net/_edge/tenant_info`

5. **Update `CLAUDE.md`** - Replace the CloudId with your own:
   ```markdown
   CloudId for JQL queries: YOUR_CLOUD_ID_HERE
   ```

6. **Configure Jira MCP** in Claude Code:
   ```bash
   claude mcp add jira
   ```

## Running the Demo

### Start the Development Server

```bash
npm run dev
```

The app runs at http://localhost:3000

### Run Tests (Will Fail With Bug Present)

```bash
npx playwright test
```

### Fix the Bug Using Claude Code

```
/fix EP-1
```

This runs the complete bug-fixing workflow.

### Reset for Another Demonstration

```
/reset-demo
```

---

## Project Structure

```
ai-demo-1/
├── .claude/
│   ├── commands/
│   │   ├── fix.md              # Bug fix workflow
│   │   └── reset-demo.md       # Demo reset workflow
│   ├── skills/
│   │   └── ast-grep/
│   │       └── SKILL.md        # AST search skill
│   └── settings.local.json     # Permissions config
├── .mcp.json                   # MCP server config
├── app/
│   ├── api/
│   │   └── calculate-price/
│   │       └── route.ts        # Price API (contains bug)
│   ├── layout.tsx
│   ├── page.tsx                # Calculator UI
│   └── repo/
│       └── page.tsx            # QR code page
├── tests/
│   └── price.spec.ts           # Playwright tests
├── CLAUDE.md                   # Developer persona
├── openapi.yaml                # API specification
├── playwright.config.ts        # Test configuration
└── package.json
```

## Tech Stack

- **Next.js 15** - Full-stack React framework
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Playwright** - E2E testing
- **Vitest** - Unit testing (optional)

---

## License

MIT
