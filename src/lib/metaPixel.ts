type MetaLeadPixelArguments = [
  command: "track",
  eventName: "Lead",
  parameters: Record<string, never>,
  eventData: { eventID: string },
];

type MetaPixelFunction = (...args: MetaLeadPixelArguments) => void;

declare global {
  interface Window {
    fbq?: MetaPixelFunction;
    __clidentaMetaPixelQueue?: MetaLeadPixelArguments[];
  }
}

const emittedLeadIds = new Set<string>();

export function trackMetaLead(
  eventId: string,
): "sent" | "queued" | "ignored" | "failed" {
  let normalizedEventId: string | undefined;

  try {
    if (typeof window === "undefined" || typeof eventId !== "string") {
      return "ignored";
    }
    normalizedEventId = eventId.trim();
    if (!normalizedEventId || emittedLeadIds.has(normalizedEventId)) {
      return "ignored";
    }

    emittedLeadIds.add(normalizedEventId);
    const args: MetaLeadPixelArguments = [
      "track",
      "Lead",
      {},
      { eventID: normalizedEventId },
    ];

    if (typeof window.fbq === "function") {
      window.fbq(...args);
      return "sent";
    }

    (window.__clidentaMetaPixelQueue ??= []).push(args);
    return "queued";
  } catch {
    if (normalizedEventId) emittedLeadIds.delete(normalizedEventId);
    return "failed";
  }
}
