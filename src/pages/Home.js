import React from "react";
import { Col, Grid, Row } from "rsuite";
import Sidebar from "../components/sidebar";
import { RoomsProvider } from "../Context/rooms.context";
// import 'rsuite/styles/index.less'

const Home = () => {
    return(
        <RoomsProvider>

        <Grid fluid className="h-100">
            <Row className="h-100">
                <Col xs={24} md={8} className="h-100">
                    <Sidebar/>
                </Col>
            </Row>
        </Grid>
        </RoomsProvider>
    )
} 

export default Home