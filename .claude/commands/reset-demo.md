# Reset Demo State

Reset the CPG demo to its initial buggy state for demonstration purposes.

## Tasks

1. **Reintroduce the price calculation bug** in `app/api/calculate-price/route.ts`:

   - Change line 20-21 from:
     ```typescript
     // Apply discount to base price
     const finalPrice = basePrice - discount;
     ```
   - To:
     ```typescript
     // BUG: Subtraction is backwards! Should be basePrice - discount
     const finalPrice = discount - basePrice;
     ```

2. **Reset Jira ticket EP-1** to "To Do" status:

   - Use the Jira MCP tool to transition EP-1 back to "To Do" (transition ID: 11)
   - Cloud ID: `8d98b1f8-6945-42d8-94e6-ef93d0966cbc`

3. **Delete all comments on EP-1**:

   - Use the Jira API to retrieve and delete all comments on ticket EP-1
   - This cleans up any resolution comments from previous demo runs

4. **Commit the buggy code** to develop branch with message:

   ```
   Reset demo: reintroduce EP-1 price calculation bug
   ```

5. **Start the Next.js dev server on port 3000**:

   - First, kill any existing process on port 3000: `lsof -ti:3000 | xargs kill -9 2>/dev/null`
   - Start the dev server in the background: `npm run dev &`
   - Wait for the server to be ready on http://localhost:3000
   - Verify the server is running by testing the API endpoint

6. **Confirm the reset** by running the Playwright test (it should FAIL)

Do NOT push to remote - this is a local demo reset only.
