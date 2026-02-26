"use client";

import {
  createContext,
  useContext,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";

type SectionRefsContextValue = {
  testimonialsRef: RefObject<HTMLElement | null>;
};

const SectionRefsContext = createContext<SectionRefsContextValue | null>(null);

export function SectionRefsProvider({ children }: { children: ReactNode }) {
  const testimonialsRef = useRef<HTMLElement | null>(null);

  return (
    <SectionRefsContext.Provider value={{ testimonialsRef }}>
      {children}
    </SectionRefsContext.Provider>
  );
}

export function useSectionRefs() {
  const context = useContext(SectionRefsContext);
  if (!context) {
    throw new Error("useSectionRefs must be used within a SectionRefsProvider");
  }
  return context;
}

