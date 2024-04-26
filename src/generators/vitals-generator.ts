import type { ReportForm } from "@/models/report-form";

export function GenerateVitals(form: ReportForm) {
  return `Airway: ${form.airway}\r` +
      `Breathing: ${form.breathing}\r` +
      `Circulation: ${form.circulation}\r` +
      `Alertness: ${form.alertness}\r` +
      `Skin: ${form.skin}\r` +
      `Pulse: ${form.pulse}\r` +
      `Pain Scale: ${form.painScale}`
}
