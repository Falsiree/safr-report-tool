import { GenerateTransportation } from './transportation-generator'
import type { ReportForm } from '@/models/report-form'

export function GenerateTreatment(form: ReportForm) {
  let treatment = ``

  const injuries = form.injuries.map(t => t.injuryName)

  if (form.cpr.administered) {
    treatment += 'One round of CPR was administered. '

    if (form.cpr.epi) {
      treatment += 'After confirming the patient had no pulse, an injection of Adrenaline was administered and another round of CPR was performed. '
    }

    if (form.cpr.aed) {
      treatment += 'Patient still had no pulse and was hooked up to the AED machine. (ONE\TWO) shocks were administered. '
    }

    if (form.cpr.lucas) {
      treatment += 'The patient still did not have a pulse and was hooked up to LUCAS for transport.'
    } else {
      treatment += 'At this time the patient regained a pulse and treatment continued. '
    }
  }

  if (injuries.includes('Blunt Force Trauma')) {
    treatment += 'Patient made stable with a c-collar and a spine board. IV saline administered. Ice packs applied to bruising.'
  }
  if (
    injuries.includes('GSW') ||
    injuries.includes("Multiple GSW's") ||
    injuries.includes('Animal Attack') ||
    injuries.includes('Stabbing')
  ) {
    treatment +=
      'Oxygen mask applied securely to the patient. Patients wounds were packed with gauze to stop bleeding. IV saline and TXA administered. Wounds flushed with IV saline, packed with fresh gauze, and wrapped in bandages.'
  }
  if (injuries.includes('Animal Attack (Minor)')) {
    treatment += 'Wounds flushed with IV saline and cleaned with antiseptic wipes, packed with fresh gauze, and wrapped in bandages.'
  }
  if (injuries.includes('Drowning')) {
    treatment += 'Patient rolled into recovery position to expel water from lungs. Oxygen mask applied to patient. Warm IV saline administered and patient wrapped in a thermal blanket.'
  }
  if (injuries.includes('First Degree Burn')) {
    treatment +=
      "Patient's burns cooled with saline. Aloe gel applied. patient advised to stay out of the sun and to keep burn site away from sources of elevated heat."
  }
  if (injuries.includes('Second Degree Burn')) {
    treatment +=
      "Patient's burns cooled with saline. Aloe gel applied. Burn dressing applied to wound. Patient advised to reapply aloe and change bandage every 24 hours until wound has healed."
  }
  if (injuries.includes('Third Degree Burn')) {
    treatment +=
      'Oxygen mask applied to patient. IV saline administered. All burns covered with burn dressings. Patient hooked up to oxygen monitor. Patient was made stable with a C-collar and spine board.'
  }
  if (injuries.includes('Fall')) {
    treatment +=
      'C-Collar and oxygen mask applied securely to the patient. IV saline started. Open wounds flushed with saline, covered in gauze, and wrapped in bandages. Concussion questions asked and (PASSED/FAILED). Patient secured with spine board, vaccum mattress, and head blocks.'
  }
  if (injuries.includes('MVA')) {
    treatment +=
      'C-Collar and oxygen mask applied securely to the patient. IV saline started. Open wounds flushed with saline, covered in gauze, and wrapped in bandages. Patient secured with spine board, and ice packs applied to bruises.'
  }
  if (injuries.includes('Head Wound')) {
    treatment +=
      'Open wounds flushed with saline, covered in gauze, and wrapped in bandages. Concussion questions asked and (PASSED/FAILED).'
  }
  if (injuries.includes('Head Trauma')) {
    treatment +=
      'Oxygen mask applied to patient. Open wounds flushed with saline, covered in gauze, and wrapped in bandages. Concussion questions asked and (PASSED/FAILED). Patient was made stable with a C-collar and spine board.'
  }
  if (injuries.includes('Drug Overdose')) {
    treatment += 'Administer narcan for an overdose, apply an oxygen mask securely around the patient, IV line started and patient made secure.'
  }
  if (injuries.includes('Other')) {
    treatment += 'FILL IN OTHER TREATMENT'
  }

  treatment += '\r\r'
  switch (form.painMedicationQualification) {
    case 'Patient was given pain medication':
      treatment += `Patient was given ${form.painMedication} for pain management/drug overdose.`
      break
    case 'Patient declined pain medication':
      treatment += 'Patient declined pain medication.'
      break
    case 'Patient did not qualify for pain medication':
    default:
      treatment += 'Patient did not qualify for pain medication based on.'
      break
  }
  return treatment
}
