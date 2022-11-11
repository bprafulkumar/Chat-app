import React from "react";
import { Container,Grid,Row,Panel,Col,Button, Icon, Alert } from 'rsuite';
import "../Cssfile/Signin.css"
import firebase from "firebase/app"
import { auth, database } from "../misc/firebase";
import { useNavigate } from "react-router-dom";


const Signin = () => {

    const navigate = useNavigate()

    const singinWithProvider = async (provider) => {

        try{
            const {additionalUserInfo,user} = await auth.signInWithPopup(provider)

            if(additionalUserInfo.isNewUser){
                await database.ref(`/profiles/${user.uid}`).set({
                    name: user.displayName,
                    createdAt : firebase.database.ServerValue.TIMESTAMP,
                })
            }

            Alert.success("Signed in" , 4000)
        } catch(err){
            // alert.info(err.message,4000)
            // console.log(err.message,"error")
            Alert.info(err.message, 4000)
        }

    }

    const onFacebookSignin = () => {
        singinWithProvider(new firebase.auth.FacebookAuthProvider())
    }
    const onGoogleSignin = () => {
        singinWithProvider(new firebase.auth.GoogleAuthProvider())
        // navigate('/')
        setTimeout(() =>{
            navigate('/')
        },8000)
        
    }
    // const redirect = () => {
    //     <Navigate to={'/'} />
    // }

    return(
        <Container>
            <Grid className="mt-page">
                <Row className="sign-main">
                    <Col xs={24} md={12} mdOffset={12}>
                        <Panel>
                            <div className="text-center">
                                <h1>Welcome to Chat</h1>
                                <p>Progressive Wrok Platform for Neophythes</p>
                            </div>

                            <div className="mt-3">                            
                                <Button block color="blue" onClick={onFacebookSignin}>
                                <Icon icon="facebook"/>  Continue with Facebook
                                </Button>
                           
                                <Button block color="green" onClick= {onGoogleSignin}>
                                <Icon icon="google" />  Continue with Google
                                </Button>

                            </div>
                        </Panel>
                    </Col>
                </Row>
            </Grid>
        </Container>
    )
} 

export default Signin