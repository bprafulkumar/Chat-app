import React from "react";
import { Container,Grid,Row,Panel,Col,Button } from 'rsuite';
import "../Cssfile/Signin.css"
import firebase from "firebase/app"
import { auth, database } from "../misc/firebase";


const Signin = () => {

    const singinWithProvider = async (provider) => {

        try{
            const {additionalUserInfo,user} = await auth.signInWithPopup(provider)

            if(additionalUserInfo.isNewUser){
                await database.ref(`/profiles/${user.uid}`).set({
                    name: user.displayName,
                    createdAt : firebase.database.ServerValue.TIMESTAMP,
                })
            }

            console.log("success")
        } catch(err){
            // alert.info(err.message,4000)
            console.log(err.message,"error")
        }

    }

    const onFacebookSignin = () => {
        singinWithProvider(new firebase.auth.FacebookAuthProvider())
    }
    const onGoogleSignin = () => {
        singinWithProvider(new firebase.auth.GoogleAuthProvider())
    }

    return(
        <Container>
            <Grid className="mt-page">
                <Row>
                    <Col xs={24} md={12} mdOffset={12}>
                        <Panel>
                            <div className="text-center">
                                <h1>Welcome to Chat</h1>
                                <p>Progressive Wrok Platform for Neophythes</p>
                            </div>

                            <div>
                            <div className="text-center">
                                <Button className="facebook-btn" onClick={onFacebookSignin}>
                                <i className="fa-brands fa-facebook-f" id="icons"></i>Continue with Facebook
                                </Button>
                            </div>
                            <div className="text-center">
                                <Button className="google-btn" onClick={onGoogleSignin}>
                                <i className="fa-brands fa-google" id="icons"></i>Continue with Google
                                </Button>
                            </div>
                            </div>
                        </Panel>
                    </Col>
                </Row>
            </Grid>
        </Container>
    )
} 

export default Signin