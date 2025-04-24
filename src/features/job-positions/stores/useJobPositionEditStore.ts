import { JobPositionResponseDTO } from "@/dto/response/JobPositionResponseDTO";
import { create } from "zustand";

interface JobPositionToEdit {
  jobPosition?: JobPositionResponseDTO;
  setJobPosition: (jobPosition?: JobPositionResponseDTO) => void;
}

export const useJobPositionEditStore = create<JobPositionToEdit>((set) => ({
  jobPosition: undefined,
  setJobPosition: (jobPosition) => set({ jobPosition })
}));
