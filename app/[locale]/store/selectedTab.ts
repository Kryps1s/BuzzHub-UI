import { create } from "zustand";

interface SelectedTabStore {
    selectedTab: string;
    setSelectedTab: ( selectedTab: string ) => void;
}

export const useSelectedTabStore = create<SelectedTabStore>( ( set ) => ( {
  selectedTab: "upcoming",
  setSelectedTab: ( selectedTab: string ) => set( { selectedTab } )
} ) );