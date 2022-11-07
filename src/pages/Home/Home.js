import React from "react";
// import {  } from "react-router";
import { Col, Grid, Row } from "rsuite";
import Sidebar from "../../components/sidebar";
import { RoomsProvider } from "../../Context/rooms.context";
import { useMediaQuery } from "../../misc/custom-hooks";
import Chat from "./Chat";
// import 'rsuite/styles/index.less'

const Home = () => {

    const isDesktop = useMediaQuery('(min-width : 992px)');

    // const  isExact  = useMatch();

    const canRenderSidebar = isDesktop ;

    // console.log("JHcjkldckdcdncdndcndjcdnjdjn")

    return(
        <RoomsProvider>

        <Grid fluid className="h-100">
            <Row className="h-100">
                {canRenderSidebar && <Col xs={24} md={8} className="h-100">
                    <Sidebar/>
                </Col> }
                
          <Col xs={24} md={16} className='h-100' >
            <Chat/>
        </Col>


        {
            isDesktop && <Col xs={24} md={8} className="h-100">
                <h6 className="text-center mt-page">Please select chat</h6>
            </Col>
        }            
            </Row>
        </Grid>
        </RoomsProvider>
    )
} 

export default Home