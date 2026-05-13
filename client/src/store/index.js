import { create } from "zustand"

export const useClinicalTrialStore = create((set) => ({
    clinicalTrials: [
        {
            "title": "Lung Cancer Immunotherapy Study",
            "objective": "Evaluate effectiveness of Drug-X",
            "phase": "Phase I",
            "therapeutic_area": "Oncology",
            "status": "Active",
            "start_date": "11-05-2026"
        },
        {
            "title": "Skin Cancer Immunotherapy Study",
            "objective": "Evaluate effectiveness of Drug-X",
            "phase": "Phase II",
            "therapeutic_area": "Oncology",
            "status": "Active",
            "start_date": "11-05-2026"
        },
        {
            "title": "Lung Cancer Immunotherapy Study",
            "objective": "Evaluate effectiveness of Drug-X",
            "phase": "Phase III",
            "therapeutic_area": "Oncology",
            "status": "Active",
            "start_date": "11-05-2026"
        }
    ],
}));

export const useAuthStore = create((set) => ({
    authState: false,
    user: null,
    setAuthState: (authState) => set(() => ({ authState })),
    setUser: (user) => set(() => ({ user })),
}))