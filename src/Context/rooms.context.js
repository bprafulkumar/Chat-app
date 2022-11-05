import { createContext, useEffect, useState } from "react";
import { database } from "../misc/firebase";
import trasformToArrWithId from '../misc/helper'



const RoomsContext = createContext();

export const RoomsProvider = ({children}) =>{
    const [rooms, setRooms] = useState(null);

    useEffect(() => {
       const roomListRef = database.ref('rooms');

       roomListRef.on('value',(snap) => {
            // console.log(snap.val(),"shshsh")
            const data  = trasformToArrWithId(snap.val());
            setRooms(data)
       });
    
      return () => {
        roomListRef.off()
      }
    }, []);
    
    return (<RoomsContext.Provider value={rooms}>
            {children}
    </RoomsContext.Provider>)
}