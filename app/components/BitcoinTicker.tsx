"use client";
import React, { useState, useEffect } from "react";
import { fetchBitcoinPrice } from "../utils/fetchBitcoinPrice";
import { FaBitcoin } from "react-icons/fa";

const BitcoinTicker: React.FC = () => {
  const [bitcoinPrice, setBitcoinPrice] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchPrice = async () => {
    try {
      const price = await fetchBitcoinPrice();
      setBitcoinPrice(price);
      setError(null);
    } catch (err) {
      setError("Failed to fetch Bitcoin price");
    }
  };

  useEffect(() => {
    fetchPrice();
    const interval = setInterval(fetchPrice, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-orange-500 text-white p-4 rounded-lg shadow-md space-y-4">
      <div className="flex flex-col items-center space-y-3">
        <div className="text-center">
          <span className="font-bold text-lg">
            100 million satoshis (1 BTC) equals this many cuck-bucks: {bitcoinPrice !== null ? `$${bitcoinPrice.toLocaleString()}` : "Loading..."}
          </span>
        </div>
        <div className="text-center">
          <span className="font-bold text-lg">
            One dollar buys: {bitcoinPrice !== null ? `${(100000000 / bitcoinPrice).toFixed(0)} sats` : "Loading..."}
          </span>
        </div>
        <div className="text-center">
          <FaBitcoin className="text-3xl mx-2" />
        </div>
      </div>
      <div className="text-center mt-4">
        {error && (
          <span className="text-red-700 font-medium">{error}</span>
        )}
      </div>
    </div>
  );
};

export default BitcoinTicker;