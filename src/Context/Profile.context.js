import { createContext, useContext, useEffect, useState } from "react";
import { auth, database } from "../misc/firebase";


const ProfileContext = createContext();

export const ProfileProvider = ({children}) => {

    const [profile,setProfile] = useState(null)
    const  [isLoading , setIsloading] = useState(true)
    
    let userRef;
    useEffect(() =>{
       const authUnsub =  auth.onAuthStateChanged(authObj => {
                // console.log(authObj,"oososossoso")
            if(authObj){

                userRef = database.ref(`profiles/${authObj.uid}`)
                userRef.on("value" , snap =>{
                   
                    const { name, createdAt,avatar } = snap.val()
    
                    const data = {
                        name,
                        avatar,
                        createdAt,
                        uid : authObj.uid,
                        email: authObj.email
                    }
                    setProfile(data)
                    setIsloading(false)
            });
            }else{

                if(userRef){
                    userRef.off();
                }
                setProfile(null)
                setIsloading(false)
            }
        })
        return () => {
            authUnsub()

            if(userRef){
                userRef.off();
            }
        }
    })

        return <ProfileContext.Provider value={{isLoading,profile}}>
            {children}
        </ProfileContext.Provider>
}



export const useProfile = () => useContext(ProfileContext)