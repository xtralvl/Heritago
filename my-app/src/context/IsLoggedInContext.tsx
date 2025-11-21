import { createContext, useState }  from "react";
import type { ReactNode } from "react";

// TYPE DECLARATIONS
export type IsLoggedInType = false | true;

type IsLoggedInPropsType = {
    children: ReactNode;
};

interface IsLoggedInContextType {
    isLoggedIn: IsLoggedInType;
    setIsLoggedIn: (isLoggedIn: IsLoggedInType) => void;
};

// CONTEXT CREATOR
export const IsLoggedInContext = createContext<IsLoggedInContextType | undefined>(undefined); // creating a "portal" I can use anywhere else

// CONTEXT PROVIDER FUNCTION
export default function isLoggedInProvider({children}: IsLoggedInPropsType) {
    const [isLoggedIn, setIsLoggedIn] = useState<IsLoggedInType>(false);

    return (
        <IsLoggedInContext.Provider value={{isLoggedIn, setIsLoggedIn}} >
            {children}
        </IsLoggedInContext.Provider>
    );
};



