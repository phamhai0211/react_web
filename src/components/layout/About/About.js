import React from 'react';
import './aboutSection.css'

import { Button, Typography, Avatar } from "@material-ui/core";
import  YouTubeIcon  from "@material-ui/icons/YouTube"
import InstagramIcon  from "@material-ui/icons/Instagram"

const About = () => {
    const visitIntagram = () => {
        window.location = " https://www.instagram.com/daihai0211"
    }

    return (
        <div className="aboutSection">
            <div></div>
            <div className="aboutSectionGradient"></div>
            <div className="aboutSectionContainer">
                <Typography component="h1">About</Typography>
                <div >
                    <div>

                        <Avatar
                            style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
                            src="https://res.cloudinary.com/hainodejs/image/upload/cld-sample.jpg"
                            alt="Founder"
                        />
                        <Typography>Daihai Shop</Typography>
                    </div>
                    <Button onClick={visitIntagram} color="primary">
                        Visit Instagram
                    </Button>
                    <span>
                        You can buy everything from our website
                    </span>

                </div>
                <div className="aboutSectionContainer2">
                    <Typography component="h2">Our Brand</Typography>
                    <a href="https://www.youtube.com/watch?v=v4TfWSRGQHk&list=RDGMEMQ1dJ7wXfLlqCjwV0xfSNbAVMCxMvQkcdPl8&index=2"
                        target="blank"
                    >
                        <YouTubeIcon className="youtubeSvgIcon svg"/>
                    </a>
                    <a href = "https://www.instagram.com/daihai0211">
                        <InstagramIcon className="intagramSvgIcon svg"/>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default About