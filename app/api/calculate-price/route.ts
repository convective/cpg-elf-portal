import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const price = Number(searchParams.get("price") || 25);
  const promoCode = searchParams.get("promoCode") || "";

  console.log(`CPG Backend: Calculating price for base amount ${price}`);

  // Base price equals the input price
  const basePrice = price;

  // Discount for SANTA promo code
  let discount = 0;
  if (promoCode === "SANTA") {
    discount = 10;
    console.log(`CPG Backend: Applied SANTA discount of $${discount}`);
  }

  // Calculate final price
  let finalPrice: number;
  if (discount > 0) {
    // BUG: Subtraction is backwards! Should be basePrice - discount
    finalPrice = discount - basePrice;
  } else {
    finalPrice = basePrice;
  }

  console.log(`CPG Backend: Final price calculated: $${finalPrice}`);

  return NextResponse.json({
    basePrice,
    discount,
    promoCode,
    finalPrice,
  });
}
