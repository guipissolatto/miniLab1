import { create } from 'zustand'

export const useCampaignStore = create((set) => ({
  campaign: null,
  setCampaign: (data) => set({ campaign: data }),
  clearCampaign: () => set({ campaign: null }),
}))
