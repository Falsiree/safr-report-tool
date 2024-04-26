<script lang="ts">
import { Component, Vue, Watch } from 'vue-facing-decorator'
import * as consts from '../consts'
import { useReportsStore } from '../stores/reports-store'

import { GeneratePrimaryAssessment } from '@/generators/primary-assessment-generator'
import { GenerateTransportation } from '@/generators/transportation-generator'
import { GenerateTreatment } from '@/generators/treatment-generator'
import { GenerateVitals } from '@/generators/vitals-generator'

import type { ReportForm } from '../models/report-form'

const reportsStore = useReportsStore()

@Component
export default class ReportsView extends Vue {
  public callsign: string = localStorage.getItem('callsign') || ''
  public form = reportsStore.currentReport

  public callType = consts.CallType
  public injuryOptions = consts.StandardComplaints
  public airwayOptions = consts.AirwayOptions
  public breathingOptions = consts.BreathingTypes
  public circulationOptions = consts.CirculationDescriptions
  public pulseOptions = consts.PulseDescription
  public alertnessOptions = consts.AlernessOptions
  public skinOptions = consts.SkinConditions
  public painMedicationOptions = consts.PainMedicationOptions
  public painMedicationAdministrationOptions = consts.PainMedicationAdministrationOptions
  public dischargeOptions = consts.SafrTreatmentDischargeOptions
  public hospitalOptions = consts.HospitalLocations
  public hospitalStaffOptions = consts.HospitalStaffOptions

  public get reports() {
    return reportsStore.reports
  }

  public get currentIndex() {
    return reportsStore.currentIndex
  }

  public set currentIndex(newIndex: number) {
    reportsStore.updateCurrentIndex(newIndex)
    this.form = reportsStore.currentReport
  }

  @Watch('form.dora')
  public drugsOrAlcoholChanged(value: any) {
    if (value == true) {
      this.form.painMedicationQualification = 'Patient did not qualify for pain medication'
    }
  }

  public mounted() {
    reportsStore.restoreReportsFromStorage()
    this.form = reportsStore.currentReport
  }

  public primaryAssessment() {
    return GeneratePrimaryAssessment(this.form)
  }

  public secondaryAssessment() {
    const injuries = this.form.injuries.map(t => t.injuryName)
    return `Patient suffered injuries related to a/an ${injuries}`
  }

  public transportation() {
    return GenerateTransportation(this.form)
  }

  public treatment() {
    return GenerateTreatment(this.form)
  }

  public vitalsAndSymptoms() {
    return GenerateVitals(this.form)
  }

  public additionalInfo() {
    let additionalInformation = ``

    additionalInformation += `${this.transportation()}`

    return additionalInformation
  }

  public copyPrimaryAssessment() {
    navigator.clipboard.writeText(this.primaryAssessment())
  }

  public copySecondaryAssessment() {
    navigator.clipboard.writeText(this.secondaryAssessment())
  }

  public copyTreatment() {
    navigator.clipboard.writeText(this.treatment())
  }

  public copyVitalsAndSymptoms() {
    navigator.clipboard.writeText(this.vitalsAndSymptoms())
  }

  public copyAdditionalInfo() {
    navigator.clipboard.writeText(this.additionalInfo())
  }

  public getExportText() {
    return (
      `${this.form.patientIdentifier}\n\n\n` +
      `Location: ${this.form.location}\n\n\n` +
      `Notes\n${this.form.notes}\n\n\n` +
      `***Primary Assessment***\n${this.primaryAssessment()}\n\n\n` +
      `***Secondary Assessment***\n${this.secondaryAssessment()}\n\n\n` +
      `***Treatment***\n${this.treatment()}\n\n\n` +
      `***Vitals/Symptoms***\n${this.vitalsAndSymptoms()}\n\n\n` +
      `***Diagnosis***\n(COPY AND PASTE DIAGNOSIS HERE)\n\n\n` +
      `***Additional Information***\n${this.additionalInfo()}\n\n\n`
    )
  }

  public exportTextFile() {
    const link = document.createElement('a')
    const content = this.getExportText()
    const file = new Blob([content], { type: 'text/plain' })
    link.href = URL.createObjectURL(file)
    link.download = `${this.form.patientIdentifier}-${new Date().toLocaleString()}.txt`
    link.click()
    URL.revokeObjectURL(link.href)
  }

  public resetForm() {
    if (confirm('Are you sure? This will clear all information and start fresh.')) {
      reportsStore.resetCurrentReport()
      this.form = reportsStore.currentReport
    }
  }

  public newReport() {
    reportsStore.addNewReport()
  }

  public copyReport() {
    reportsStore.copyCurrentReport()
  }

  public closeReport(index: number) {
    reportsStore.closeReport(index)
  }
}
</script>

<template>
  <v-toolbar color="red">
    <v-tabs v-model="currentIndex">
      <v-tab v-for="(report, index) of reports">
        {{ report.patientIdentifier || `${report.callType} - ${report.location}`  }}
        <v-btn icon class="ml-4" size="small" @click="closeReport(index)">
          <v-icon>close</v-icon>
        </v-btn>
      </v-tab>
    </v-tabs>
    <v-spacer />
    <v-btn @click="newReport()">
      <v-icon>add</v-icon>
    </v-btn>
    <v-btn @click="copyReport()">
      <v-icon>file_copy</v-icon>
    </v-btn>
  </v-toolbar>

  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="6">
        <v-card>
          <v-container fluid>
            <v-row>
              <v-col cols="12" sm="4">
                <v-text-field label="Name/SSN" v-model="form.patientIdentifier" hide-details></v-text-field>
              </v-col>
              <v-col cols="12" sm="4">
                <v-combobox v-model="form.callType" :items="callType" label="Call Type" hide-details></v-combobox>
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field label="Location" v-model="form.location" hide-details></v-text-field>
              </v-col>
              <v-col cols="12" sm="12">
                <v-textarea label="Notes" v-model="form.notes" rows="2" hide-details></v-textarea>
              </v-col>
              <v-divider class="my-4" />
              <v-col cols="12" sm="12">
                <v-combobox
                  v-model="form.injuries"
                  :items="injuryOptions"
                  item-title="injuryName"
                  label="Injuries"
                  multiple
                  chips
                  hide-details
                ></v-combobox>
              </v-col>

              <v-divider class="my-4" />

              <v-col cols="12" sm="4">
                <v-combobox v-model="form.airway" :items="airwayOptions" label="Airway" hide-details></v-combobox>
              </v-col>

              <v-col cols="12" sm="4">
                <v-combobox v-model="form.breathing" :items="breathingOptions" label="Breathing" hide-details></v-combobox>
              </v-col>

              <v-col cols="12" sm="4">
                <v-combobox v-model="form.circulation" :items="circulationOptions" label="Circulation" hide-details></v-combobox>
              </v-col>

              <v-col cols="12" sm="4">
                <v-combobox v-model="form.skin" :items="skinOptions" label="Skin" hide-details></v-combobox>
              </v-col>

              <v-col cols="12" sm="4">
                <v-combobox v-model="form.pulse" :items="pulseOptions" label="Pulse" hide-details></v-combobox>
              </v-col>

              <v-col cols="12" sm="4">
                <v-combobox v-model="form.alertness" :items="alertnessOptions" label="Alertness"></v-combobox>
              </v-col>

              <template v-if="form.pulse == 'No Pulse'">
                <v-col cols="12" sm="3">
                  <v-checkbox v-model="form.cpr.administered" label="CPR Performed" />
                </v-col>
                <v-col cols="12" sm="3">
                  <v-checkbox v-model="form.cpr.epi" :disabled="!form.cpr.administered" label="Adrenaline Administered" />
                </v-col>
                <v-col cols="12" sm="3">
                  <v-checkbox v-model="form.cpr.aed" :disabled="!form.cpr.epi" label="AED Used" />
                </v-col>
                <v-col cols="12" sm="3">
                  <v-checkbox v-model="form.cpr.lucas" :disabled="!form.cpr.aed" label="LUCAS Used" />
                </v-col>
              </template>

              <v-col cols="12" sm="12">
                <v-slider
                  :ticks="[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
                  :max="10"
                  :min="0"
                  step="1"
                  show-ticks="always"
                  tick-size="4"
                  label="Pain Scale"
                  v-model="form.painScale"
                ></v-slider>
              </v-col>

              <v-divider class="my-4" />

              <v-col cols="12" sm="6">
                <v-text-field label="Allergies" v-model="form.allergies"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="Prescription medications" v-model="form.prescriptions"></v-text-field>
              </v-col>
              <v-col cols="12" sm="12">
                <v-label>Has the patient had any drugs or alcohol in the last 24 hours?</v-label>
                <v-radio-group v-model="form.dora" inline hide-details>
                  <v-radio label="Yes" :value="true"></v-radio>
                  <v-radio label="No" :value="false"></v-radio>
                  <v-radio label="Unknown" :value="null"></v-radio>
                </v-radio-group>
              </v-col>
              <v-col cols="12" sm="12" v-if="form.dora == true">
                <v-text-field label="What drugs or alcohol did the patient report using?" v-model="form.dora_type"></v-text-field>
              </v-col>

              <v-divider class="my-4" />

              <v-col cols="12" sm="6">
                <v-combobox
                  v-model="form.painMedicationQualification"
                  :items="painMedicationAdministrationOptions"
                  label="Pain Medication Qualification"
                  hide-details
                ></v-combobox>
              </v-col>

              <v-col cols="12" sm="6">
                <v-combobox
                  v-model="form.painMedication"
                  :items="painMedicationOptions"
                  :disabled="form.painMedicationQualification != 'Patient was given pain medication'"
                  label="Pain Medication Given"
                  hide-details
                ></v-combobox>
              </v-col>

              <v-col cols="12" sm="12">
                <v-combobox
                  v-model="form.safrDischarge"
                  :items="dischargeOptions"
                  label="Discharge From SAFR Options"
                  hide-details
                ></v-combobox>
              </v-col>

              <v-col cols="12" sm="12" v-if="form.safrDischarge == 'Patient was transported to hospital by a member of Law Enforcement.'">
                <v-text-field label="LEO Name and Title" v-model="form.leoName" hide-details></v-text-field>
              </v-col>

              <v-col
                cols="12"
                sm="12"
                v-if="
                  form.safrDischarge == 'Patient was transported to hospital by SAFR.' ||
                  form.safrDischarge == 'Patient was transported to hospital by a member of Law Enforcement.'
                "
              >
                <v-combobox
                  v-model="form.hospital"
                  :items="hospitalOptions"
                  label="Which hospital was the patient transported to?"
                  hide-details
                ></v-combobox>
              </v-col>

              <v-col cols="12" sm="12" v-if="form.safrDischarge == 'Patient was transported to hospital by SAFR.'">
                <v-combobox
                  v-model="form.hospitalHandoff"
                  :items="hospitalStaffOptions"
                  label="Who was the patient handed off to?"
                  hide-details
                ></v-combobox>
              </v-col>

              <v-col
                cols="12"
                sm="12"
                v-if="
                  form.safrDischarge == 'Patient was transported to hospital by SAFR.' && form.hospitalHandoff == 'Specific Staff Member'
                "
              >
                <v-text-field label="Staff Member Name and Title" v-model="form.hospitalStaffName" hide-details></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6">
        <v-card class="px-4 py-4">
          <v-card-title>{{ form.patientIdentifier }}</v-card-title>
          <v-card-subtitle>{{ form.location }}</v-card-subtitle>

          <v-textarea label="Notes" :model-value="form.notes" readonly rows="2"></v-textarea>

          <v-divider />

          <v-textarea
            label="Primary Assessment"
            :model-value="primaryAssessment()"
            readonly
            rows="3"
            append-icon="file_copy"
            @click:append="copyPrimaryAssessment"
          ></v-textarea>
          <v-textarea
            label="Secondary Assessment"
            :model-value="secondaryAssessment()"
            readonly
            rows="3"
            append-icon="file_copy"
            @click:append="copySecondaryAssessment"
          ></v-textarea>
          <v-textarea
            label="Treatment"
            :model-value="treatment()"
            readonly
            rows="7"
            append-icon="file_copy"
            @click:append="copyTreatment"
          ></v-textarea>
          <v-textarea
            label="Vitals and Symptoms"
            :model-value="vitalsAndSymptoms()"
            readonly
            rows="7"
            append-icon="file_copy"
            @click:append="copyVitalsAndSymptoms"
          ></v-textarea>
          <v-textarea
            label="Additional Information"
            :model-value="additionalInfo()"
            readonly
            rows="4"
            append-icon="file_copy"
            @click:append="copyAdditionalInfo"
          ></v-textarea>
          <v-divider class="pt-4" />
          <v-btn color="primary" @click="exportTextFile">Save and Export to Text</v-btn>
          <v-btn color="red" class="ml-4" @click="resetForm">Reset Form</v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style></style>
