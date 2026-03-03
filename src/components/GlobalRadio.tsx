"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import LofiRadio from "./LofiRadio";

export default function GlobalRadio() {
  const [slot, setSlot] = useState<Element | null>(null);

  useEffect(() => {
    const findSlot = () => document.getElementById("gc-radio-slot");
    setSlot(findSlot());

    const observer = new MutationObserver(() => setSlot(findSlot()));
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  // When the main page provides a slot, portal into it (inline with theme/intro buttons)
  if (slot) return createPortal(<LofiRadio />, slot);

  // Fallback for other pages: fixed bottom-left
  return (
    <div className="pointer-events-auto fixed bottom-4 left-3 z-[25] sm:left-4">
      <LofiRadio />
    </div>
  );
}
