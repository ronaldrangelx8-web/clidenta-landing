"use client";
import React, { useEffect } from 'react';
import Cal, { getCalApi } from "@calcom/embed-react";

const Agenda: React.FC = () => {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "reunion-clidenta" });
      cal("ui", { theme: "light", hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  return (
    <section id="agenda" className="bg-[#fff7eb] pt-2 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl md:text-2xl font-serif font-semibold text-[#262a2e] mb-4 text-center">
          Agenda tu demostración gratuita
        </h2>
        <div style={{ width: '100%', minHeight: '600px' }}>
          <Cal
            namespace="reunion-clidenta"
            calLink="rangel/reunion-clidenta"
            style={{ width: "100%", height: "100%", overflow: "scroll" }}
            config={{ layout: "month_view", useSlotsViewOnSmallScreen: "true", theme: "light" }}
          />
        </div>
      </div>
    </section>
  );
};

export default Agenda;
