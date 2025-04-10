import { create } from "zustand";
import { UserResponseDTO } from "@/dto/response/UserResponseDTO";
import { JobPositionResponseDTO } from "@/dto/response/JobPositionResponseDTO";

interface DashboardStore {
  jobPositions: JobPositionResponseDTO[] | null;
  setJobPositions: (jobPositions: JobPositionResponseDTO[] | null) => void;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  jobPositions: [],
  setJobPositions: (jobPositions) => set({ jobPositions })
}));
