import { createContext, useContext, useState } from "react";

const Main = createContext();

export const MainContainer = ({ children }) => {
    const [update, setUpdate] = useState(0);
    return (
        <Main.Provider value={{ update, setUpdate }}>{children}</Main.Provider>
    );
};

export const MainContext = () => useContext(Main);
