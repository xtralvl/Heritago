import { createContext, useState } from "react";
import type { ReactNode } from "react";

interface SelectedResultIdContextType {
    selectedResultId: string | null;
    setSelectedResultId: (id: string | null) => void;
}

export const SelectedResultIdContext = createContext<SelectedResultIdContextType | null>(null);

export function SelectedResultIdProvider({ children }: { children: ReactNode }) {
  const [selectedResultId, setSelectedResultId] = useState<string | null>(null);

  return (
    <SelectedResultIdContext.Provider value={{ selectedResultId, setSelectedResultId }}>
      {children}
    </SelectedResultIdContext.Provider>
  );
};
