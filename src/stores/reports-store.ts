import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import type { ReportForm } from '@/models/report-form'

function getDefaultForm(): ReportForm {
  return {
    patientIdentifier: '',
    injuries: [],
    cpr: { administered: false },

    location: '',
    notes: '',
    callType: '10-52',

    airway: 'Clear',
    breathing: 'Normal',
    circulation: 'Normal',
    skin: 'Normal',
    pulse: 'Normal (60-100 BPM)',
    alertness: 'Patient was responsive, alert, and oriented on scene.',

    painLevel: 0,

    allergies: '',
    prescriptions: '',
    dora: null,
    dora_type: '',

    painMedicationQualification: '',
    painMedication: '',

    safrDischarge: 'Patient was transported to a hospital by SAFR.',
    hospital: '',
    hospitalHandoff: 'Local Nurses',

    leoName: '',
    hospitalStaffName: ''
  }
}

function getReportsFromLocalStorage() {

}

export const useReportsStore = defineStore('reports-store', {
  state: () => ({
    currentIndex: 0,
    reports: [{
      ...getDefaultForm()
    }]
  }),
  getters: {
    currentReport: (state) => state.reports[state.currentIndex],
  },
  actions: {
    restoreReportsFromStorage() {
      const storedReports = localStorage.getItem('reports')

      console.log(storedReports)

      if(storedReports != null && storedReports != '') {
        this.reports = JSON.parse(storedReports);
      }
    },
    updateCurrentIndex(newIndex: number) {
      this.currentIndex = newIndex
    },
    updateCurrentReport(form: ReportForm) {
      this.reports[this.currentIndex] = {...form}
    },
    resetCurrentReport() {
      this.updateCurrentReport({...getDefaultForm()})
    },
    addNewReport() {
      console.log('add report')
      this.reports.push(getDefaultForm())
    },
    copyCurrentReport() {
      this.reports.push({...this.currentReport})
    },
    closeReport(index: number) {
      this.reports.splice(index, 1)
      // console.log(reports.length)
      // this.reports = reports
      // console.log({...reports})
    }
  },
})

const store = useReportsStore();

store.$subscribe((mutation, state) => {
  const reportsString = JSON.stringify(state.reports)

  console.log(reportsString)

  localStorage.setItem('reports', reportsString)
})
