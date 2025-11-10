import { createContext, useState } from "react";
import type { ReactNode } from "react";

type SearchedCountryOrStateProviderPropsType = {
    children: ReactNode;
};

type SearchedCountryOrStateType = string | undefined;

interface SearchedCountryOrStateContextType {
    searchedCountryOrState: SearchedCountryOrStateType;
    setSearchedCountryOrState: (searchedCountryOrState: SearchedCountryOrStateType) => void;
}

export const SearchedCountryOrStateContext = createContext<SearchedCountryOrStateContextType | undefined>(undefined);

export default function SearchedCountryOrStateProvider({children}: SearchedCountryOrStateProviderPropsType) {

    const [searchedCountryOrState, setSearchedCountryOrState] = useState<SearchedCountryOrStateType>(undefined);

        return (
            <SearchedCountryOrStateContext.Provider value={{searchedCountryOrState, setSearchedCountryOrState}} >
                {children}
            </SearchedCountryOrStateContext.Provider>
        );
};