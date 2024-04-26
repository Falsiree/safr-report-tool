import type { ReportForm } from "@/models/report-form"

export function GenerateTransportation(form: ReportForm) {
  let transportation = ''

  if (['Patient was transported to hospital by a member of SAFR.', 'Patient was transported to hospital by an LEO.'].includes(form.safrDischarge)) {
    transportation += 'Patient was transported code 3 to '

    if (form.hospital == '') {
      transportation += 'the hospital '
    } else {
      transportation += `${form.hospital} `
    }

    if (form.safrDischarge == 'Patient was transported to the hospital by an LEO.') {
      if (form.leoName == '') {
        transportation += 'by a Law Enforcement Officer.'
      } else {
        transportation += `by Law Enforcement Officer ${form.leoName}.`
      }
    } else if (form.hospitalHandoff == 'Local Nurses') {
      transportation += 'into the care of Local Nurses.'
    } else if (form.hospitalHandoff == 'Specific Staff Member' && form.hospitalStaffName == '') {
      transportation += 'into the care of SAHA Staff.'
    } else if (form.hospitalHandoff == 'Specific Staff Member' && form.hospitalStaffName != '') {
      transportation += `into the care of ${form.hospitalStaffName}.`
    }
  } else {
    transportation += form.safrDischarge
  }

  return transportation
}
