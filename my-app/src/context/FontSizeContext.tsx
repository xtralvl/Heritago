import { createContext, useState }  from "react";
import type { ReactNode } from "react";

// TYPE DECLARATIONS
export type FontSizeType = "small" | "default" | "large";

type FontSizeProviderPropsType = {
    children: ReactNode;
};

interface FontSizeContextType {
    fontSize: FontSizeType;
    setFontSize: (size: FontSizeType) => void;
};

// CONTEXT CREATOR
export const FontSizeContext = createContext<FontSizeContextType | undefined>(undefined); // creating a "portal" I can use anywhere else

// CONTEXT PROVIDER FUNCTION
export default function FontSizeProvider({children}: FontSizeProviderPropsType) {
    const [fontSize, setFontSize] = useState<FontSizeType>("default");

    return (
        <FontSizeContext.Provider value={{fontSize, setFontSize}} >
            {children}
        </FontSizeContext.Provider>
    );
};



