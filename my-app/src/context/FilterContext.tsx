import { createContext, useState } from "react";
import type { ReactNode } from "react";

type FilterProviderPropsType = {
    children: ReactNode;
};

type FilterType = string[];

interface FilterContextType {
    appliedFilter: FilterType;
    setAppliedFilter: (value: FilterType | ((prev: FilterType) => FilterType)) => void;
}

export const FilterContext = createContext<FilterContextType | undefined>(undefined);

export default function FilterProvider({children}: FilterProviderPropsType) {

    const [appliedFilter, setAppliedFilter] = useState<FilterType>([]);

        return (
            <FilterContext.Provider value={{appliedFilter, setAppliedFilter}} >
                {children}
            </FilterContext.Provider>
        );
};