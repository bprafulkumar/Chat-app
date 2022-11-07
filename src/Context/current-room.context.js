import { createContext, useContext } from "react";


export const CurrentRoomContext = createContext()

export const CurrentRoomProvider = ({children,data}) =>{
    
    // console.log(data,"Cdkjmdcoklmdk")
    return <CurrentRoomContext.Provider value={data}>
        {children}
    </CurrentRoomContext.Provider>
}

export const useCurrentRoom = () => useContext(CurrentRoomProvider);