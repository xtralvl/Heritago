import { createContext, useState } from "react";
import type { ReactNode } from "react";

type SearchedDestinationTypeProviderPropsType = {
    children: ReactNode;
};

type SearchedDestinationTypeType = string | undefined;

interface SearchedDestinationTypeContextType {
    searchedDestinationType: SearchedDestinationTypeType;
    setSearchedDestinationType: (SearchedDestinationType: SearchedDestinationTypeType) => void;
}

export const SearchedDestinationTypeContext = createContext<SearchedDestinationTypeContextType | undefined>(undefined);

export default function SearchedDestinationTypeProvider({children}: SearchedDestinationTypeProviderPropsType) {

    const [searchedDestinationType, setSearchedDestinationType] = useState<SearchedDestinationTypeType>(undefined);

        return (
            <SearchedDestinationTypeContext.Provider value={{searchedDestinationType, setSearchedDestinationType}} >
                {children}
            </SearchedDestinationTypeContext.Provider>
        );
};