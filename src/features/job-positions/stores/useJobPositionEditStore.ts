import { JobPositionResponseDTO } from "@/dto/response/JobPositionResponseDTO";
import { create } from "zustand";

interface JobPositionToEdit {
  jobPosition: JobPositionResponseDTO | null;
  setJobPosition: (jobPosition: JobPositionResponseDTO | null) => void;
}

export const useJobPositionEditStore = create<JobPositionToEdit>((set) => ({
  jobPosition: null,
  setJobPosition: (jobPosition) => set({ jobPosition })
}));
