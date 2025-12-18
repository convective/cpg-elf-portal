"use client";

import { useState, FormEvent } from "react";

interface PriceResult {
  basePrice: number;
  discount: number;
  promoCode: string;
  finalPrice: number;
}

type GiftSize = "small" | "medium" | "large";

const prices: Record<GiftSize, number> = {
  small: 15,
  medium: 25,
  large: 40,
};

export default function Home() {
  const [giftSize, setGiftSize] = useState<GiftSize>("medium");
  const [promoCode, setPromoCode] = useState("");
  const [result, setResult] = useState<PriceResult | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const price = prices[giftSize];
    const response = await fetch(
      `/api/calculate-price?price=${price}&promoCode=${encodeURIComponent(promoCode)}`
    );
    const data = await response.json();
    setResult(data);
  }

  return (
    <>
      {/* Header */}
      <header className="bg-red-800 text-white py-6 shadow-lg">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="text-yellow-400">CPG</span> | Christmas Present Group
          </h1>
          <p className="text-red-200 mt-1">Custom Gift Wrapping Service</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="festive-border rounded-lg">
          <div className="bg-white rounded-md p-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Wrapping Price Calculator</h2>

            <form onSubmit={handleSubmit}>
              {/* Gift Size Selector */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Gift Size
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {(["small", "medium", "large"] as const).map((size) => (
                    <label
                      key={size}
                      className={`flex flex-col items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        giftSize === size
                          ? "border-green-600 bg-green-50"
                          : "border-slate-300 hover:border-green-400"
                      }`}
                    >
                      <input
                        type="radio"
                        name="giftSize"
                        id={`size-${size}`}
                        value={size}
                        checked={giftSize === size}
                        onChange={(e) => setGiftSize(e.target.value as GiftSize)}
                        className="sr-only"
                      />
                      <span className="font-semibold capitalize text-slate-800">{size}</span>
                      <span className="text-sm text-slate-600">${prices[size]}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Promo Code Input */}
              <div className="mb-6">
                <label htmlFor="promoCode" className="block text-sm font-semibold text-slate-700 mb-2">
                  Discount Code
                </label>
                <input
                  type="text"
                  id="promoCode"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-green-500 focus:outline-none text-lg font-mono"
                  placeholder="Enter promo code (try SANTA)"
                />
              </div>

              {/* Calculate Button */}
              <button
                id="calculateBtn"
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-lg text-lg transition-colors shadow-md"
              >
                Get Wrapping Price
              </button>
            </form>

            {/* Result Display */}
            {result && (
              <div id="result" className="mt-8 p-6 bg-green-50 rounded-lg border-2 border-green-200">
                <div className="text-center">
                  <p className="text-slate-600 text-sm uppercase tracking-wide mb-2">Total Price</p>
                  <p
                    id="priceAmount"
                    className={`text-4xl font-bold ${
                      result.finalPrice < 0 ? "text-red-600" : "text-slate-800"
                    }`}
                  >
                    ${result.finalPrice}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-green-300 text-sm text-slate-600">
                  <div className="flex justify-between mb-1">
                    <span>Base Price:</span>
                    <span className="font-mono">${result.basePrice}</span>
                  </div>
                  {result.discount > 0 && (
                    <div className="flex justify-between mb-1">
                      <span>Discount ({result.promoCode}):</span>
                      <span className="font-mono text-green-600">-${result.discount}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold border-t border-green-300 pt-2 mt-2">
                    <span>Final Price:</span>
                    <span className="font-mono">${result.finalPrice}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-red-800 text-red-200 py-4 mt-auto">
        <div className="max-w-4xl mx-auto px-4 text-center text-sm">
          <p>CPG is a wholly owned subsidiary of North Pole Industries.</p>
          <a href="/repo" className="text-red-300 hover:text-white text-xs mt-2 inline-block opacity-75 hover:opacity-100 transition-opacity">
            View Source
          </a>
        </div>
      </footer>
    </>
  );
}
