import { createContext, useContext, useEffect, useState } from "react";
import { auth, database } from "../misc/firebase";
import firebase from "firebase/app";

 export const isOfflineForDatabase = {
    state: 'offline',
    last_changed: firebase.database.ServerValue.TIMESTAMP,
};


const isOnlineForDatabase = {
    state: 'online',
    last_changed: firebase.database.ServerValue.TIMESTAMP,
}


const ProfileContext = createContext();

export const ProfileProvider = ({children}) => {

    const [profile,setProfile] = useState(null)
    const  [isLoading , setIsloading] = useState(true)
    
    let userRef;
    let userStatusRef;
    useEffect(() =>{
        const authUnsub =  auth.onAuthStateChanged(authObj => {
            // console.log(authObj,"oososossoso")
            if(authObj){
                
                userStatusRef = database.ref(`/status/${authObj.uid}`);
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


                   database.ref('.info/connected').on('value', (snapshot) => {
                        if (snapshot.val() === false) {
                            return;
                        };
                    
                        userStatusRef.onDisconnect().set(isOfflineForDatabase).then(() => {
                            userStatusRef.set(isOnlineForDatabase);
                        });
                    });
            });
            }else{

                if(userRef){
                    userRef.off();
                }
                if(userStatusRef){
                    userStatusRef.off();
                }
                setProfile(null)
                setIsloading(false)
                
                database.ref('.info/connected').off()
            }
        })
        return () => {
            authUnsub()
            database.ref('.info/connected').off()
            
            if(userRef){
                userRef.off();
            }
            if(userStatusRef){
                userStatusRef.off();
            }
            
        }
    })

        return <ProfileContext.Provider value={{isLoading,profile}}>
            {children}
        </ProfileContext.Provider>
}



export const useProfile = () => useContext(ProfileContext)