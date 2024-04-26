<script lang="ts">
import { Component, Vue, Watch } from 'vue-facing-decorator'

@Component
export default class ReportsView extends Vue {
  public callsign: string = localStorage.getItem('callsign') || ''

  @Watch('callsign')
  public callsignChanged(value: string) {
    localStorage.setItem('callsign', value)
  }
}
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="6">
        <v-card>
          <v-container fluid>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field label="Callsign" v-model="callsign" hide-details></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
