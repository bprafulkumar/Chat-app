import { createContext, useContext, useEffect, useState } from "react";
import { auth, database } from "../misc/firebase";


const ProfileContext = createContext();

export const ProfileProvider = ({children}) => {

    const [profile,setProfile] = useState(null)
    const  [isLoading , setIsloading] = useState(true)

    let useRef;
    useEffect(() =>{
       const authUnsub =  auth.onAuthStateChanged(authObj => {

            if(authObj){

                useRef = database.ref(`profiles/${authObj.uid}`)
                useRef.on("value" , (snap) =>{
                   
                    const {name, createdAt} = snap.val()
    
                    const data = {
                        name,
                        createdAt,
                        uid : authObj.uid,
                        email: authObj.email
                    }
                    setProfile(data)
                    setIsloading(false)
            })
            }else{

                if(useRef){
                    useRef.off()
                }
                setProfile(null)
                setIsloading(false)
            }
        })
        return () => {
            authUnsub()

            if(useRef){
                useRef.off();
            }
        }
    },[])

        return <ProfileContext.Provider value={{isLoading,profile}}>
            {children}
        </ProfileContext.Provider>
}



export const useProfile = () => useContext(ProfileContext)