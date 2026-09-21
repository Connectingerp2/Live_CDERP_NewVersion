"use client";

import { createContext, useContext, useState, useCallback } from "react";

const PopupFormContext = createContext(null);

export function PopupFormProvider({ children }) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const openPopup = useCallback(() => setIsPopupOpen(true), []);
    const closePopup = useCallback(() => setIsPopupOpen(false), []);

    return (
        <PopupFormContext.Provider value={{ isPopupOpen, openPopup, closePopup }}>
            {children}
        </PopupFormContext.Provider>
    );
}

export function usePopupForm() {
    const ctx = useContext(PopupFormContext);
    if (!ctx) {
        throw new Error("usePopupForm must be used within a PopupFormProvider");
    }
    return ctx;
}