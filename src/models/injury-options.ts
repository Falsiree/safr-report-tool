export interface TreatmentOption {
  label: string;
  reportText: string;
  emote: string | null;
}

export interface SubInjuryOption {
  subInjuryType: string;
  treatmentSteps: TreatmentOption[];
}

export interface InjuryOption {
  injuryName: string;
  subInjuries: SubInjuryOption[] | null;
  treatments: TreatmentOption[] | null;
}
