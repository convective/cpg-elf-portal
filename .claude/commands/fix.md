# Fix Jira Bug

**Arguments:** `$ARGUMENTS` (Jira ticket ID, e.g., CPG-123)

**INSTRUCTIONS:**
You are fixing a bug reported in Jira.

1. **INGEST:**

   - Use the **Jira tool** to read ticket **$ARGUMENTS**.
   - Summarize the bug to me (e.g., "I see ticket $ARGUMENTS reports negative prices...").
   - **Transition the ticket to "In Progress"** to indicate work has begun.

2. **VERIFY:**

   - Based on the ticket description, reproduce the issue.
   - Confirm the result matches the Jira report.

3. **PLAN:**

   - Analyze the codebase to understand where the bug likely originates.
   - Formulate a plan for how to fix it.
   - **Enter plan mode** using the `EnterPlanMode` tool.
   - Present the fix plan to the user and wait for approval before proceeding.

4. **FIX:**

   - Analyze the codebase to find the root cause of the bug.
   - Implement a fix for the issue.
   - Run the existing tests to verify the fix works.
   - **If tests fail, keep iterating:** Analyze the failure, adjust your fix, and re-run tests until they pass.

5. **TEST:**

   - Launch Playwright (Headed, slowMo: 1000).
   - Go to localhost:3000.
   - Perform the steps from the bug report to verify the fix in the UI.

6. **RESOLVE:**
   - Post a comment on **$ARGUMENTS** with the root cause and fix details.
   - Transition the ticket to "Done" (or "In Review") if possible.
