import { create } from "zustand";
import { UserResponseDTO } from "@/dto/response/UserResponseDTO";
import { JobPositionResponseDTO } from "@/dto/response/JobPositionResponseDTO";

interface DashboardStore {
  jobPositions: JobPositionResponseDTO[];
  setJobPositions: (jobPositions: JobPositionResponseDTO[]) => void;
  toFetchJobPositions: boolean;
  setToFetchJobPositions: (value: boolean) => void;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  jobPositions: [],
  setJobPositions: (jobPositions) => set({ jobPositions }),
  toFetchJobPositions: false,
  setToFetchJobPositions: (value) => set({ toFetchJobPositions: value })
}));
