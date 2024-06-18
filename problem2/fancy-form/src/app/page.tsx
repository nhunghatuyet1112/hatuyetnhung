import Image from "next/image";
import { Token } from "./types/tokens";
import SwapForm from "./components/SwapForm";

async function getTokens() {
  const res = await fetch("https://interview.switcheo.com/prices.json");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Home() {
  const data: Token[] = await getTokens();
  const currencyName = new Set(data.map((v) => v.currency));
  console.log(currencyName);
  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        minHeight: "280px",
        backgroundImage:
          "radial-gradient(at center top, rgb(21 27 63), black), radial-gradient(at center bottom, rgb(10 43 37), black)",
        display: "flex ",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <Image
        priority
        quality={100}
        fill
        alt="background"
        src={"/background.svg"}
        style={{ objectFit: "cover" }}
      />
      <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h1 style={{ fontSize: "2vw", letterSpacing: "2px", color: "white" }}>Fancy Form</h1>
        <div
          className="form-wrapper"
          style={{ marginTop: "20px", padding: "25px", width: "400px" }}>
          <SwapForm data={data} />
        </div>
      </div>
    </div>
  );
}
