import { createContext, useState } from "react";
import type { ReactNode } from "react";

type SortProviderPropsType = {
    children: ReactNode;
};

type SortType = string | undefined;

interface SortContextType {
    appliedSort: SortType;
    setAppliedSort: (sortingFilter: SortType) => void;
}

export const SortContext = createContext<SortContextType | undefined>(undefined);

export default function SortProvider({children}: SortProviderPropsType) {

    const [appliedSort, setAppliedSort] = useState<SortType>(undefined);

        return (
            <SortContext.Provider value={{appliedSort, setAppliedSort}} >
                {children}
            </SortContext.Provider>
        );
};