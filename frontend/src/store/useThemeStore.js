import {create} from "zustand"


export const  useThemeStore = create((set) => ({
    theme : localStorage.getItem('buddChat-theme') || "dark",
    setTheme : (theme) => {
        localStorage.setItem("buddChat-theme",theme);
        set({ theme });
 }}))