import type { InjuryOption } from './injury-options'

export interface ReportFormCPR {
  administered: boolean
  epi?: boolean
  aed?: boolean
  lucas?: boolean
}

export interface ReportForm {
  patientIdentifier: string
  injuries: InjuryOption[]
  cpr: ReportFormCPR

  location: string
  notes: string
  callType: '911 Call' | '10-52' | '10-13B' | '10-13' | '10-78'

  airway: string
  breathing: string
  circulation: string
  skin: string
  pulse: string
  alertness: string

  painLevel: number

  allergies: string
  prescriptions: string
  dora: boolean | null
  dora_type: string

  painMedicationQualification: string
  painMedication: string

  safrDischarge: string
  hospital: string
  hospitalHandoff: string

  leoName: string
  hospitalStaffName: string
}
