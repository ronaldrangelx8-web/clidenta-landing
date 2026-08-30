"use client";
import React, { useEffect } from 'react';
import Cal, { getCalApi } from "@calcom/embed-react";

const Agenda: React.FC = () => {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", { theme: "light", hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  return (
    <section id="agenda" className="bg-background pt-2 pb-14 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-serif font-semibold text-slate-900 mb-2 text-center">
          Agenda tu demostración gratuita
        </h2>
        <p className="text-center text-slate-500 mb-6">
          30 minutos, sin compromiso. Te mostramos tu clínica funcionando con IA.
        </p>
        <div className="rounded-2xl border border-border bg-white shadow-sm p-2 sm:p-4">
          <div style={{ width: '100%', minHeight: '600px' }}>
            <Cal
              namespace="30min"
              calLink="veronica-garcia/30min"
              style={{ width: "100%", height: "100%", overflow: "scroll" }}
              config={{ layout: "month_view", useSlotsViewOnSmallScreen: "true", theme: "light" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Agenda;
