import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";

const app = new Hono();

// Serve static files from ./public
app.use("/*", serveStatic({ root: "./public" }));

// Premium calculation endpoint
app.get("/calculate-premium", (c) => {
  const riskScore = Number(c.req.query("riskScore") || 1000);
  const promoCode = c.req.query("promoCode") || "";

  console.log(`CPG Backend: Calculating premium for Risk Score ${riskScore}`);

  // Base premium equals the risk score
  const basePremium = riskScore;

  // Discount for SAFE_ELF promo code
  let discount = 0;
  if (promoCode === "SAFE_ELF") {
    discount = 200;
    console.log(`CPG Backend: Applied SAFE_ELF discount of $${discount}`);
  }

  // BUG: Subtraction is backwards! Should be basePremium - discount
  const finalPremium = discount - basePremium;

  console.log(`CPG Backend: Final premium calculated: $${finalPremium}`);

  return c.json({
    basePremium,
    discount,
    promoCode,
    finalPremium,
  });
});

const port = 3000;
console.log(`CPG Premium Calculator running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
