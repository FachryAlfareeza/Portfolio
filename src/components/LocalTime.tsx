"use client";

import { useEffect, useState } from "react";

// Live local time for the profile's timezone. Renders nothing on the server
// and first client render so there is never a hydration mismatch.
export function LocalTime({ timeZone }: { timeZone: string }) {
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    let formatter: Intl.DateTimeFormat;
    let zoneFormatter: Intl.DateTimeFormat;
    try {
      formatter = new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone,
      });
      zoneFormatter = new Intl.DateTimeFormat("en-GB", {
        timeZoneName: "short",
        timeZone,
      });
    } catch {
      return; // invalid timezone in data.json: show nothing rather than crash
    }

    const tick = () => {
      const now = new Date();
      const zone =
        zoneFormatter.formatToParts(now).find((p) => p.type === "timeZoneName")?.value ?? "";
      setLabel(`${formatter.format(now)} ${zone}`.trim());
    };

    tick();
    const id = window.setInterval(tick, 15_000);
    return () => window.clearInterval(id);
  }, [timeZone]);

  if (!label) return null;

  return (
    <span data-testid="local-time">
      <span aria-hidden="true" className="px-2 opacity-50">
        ·
      </span>
      <span className="sr-only">Local time: </span>
      {label}
    </span>
  );
}
