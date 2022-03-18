import React, { Component } from "react";
import "./Background.css";
import Loader from "./Loader";
import Navbar from "./Container/1. Navbar/Navbar";
import Aboutme from "./Container/3. AboutMeSection/AboutMe";
import Homesection from "./Container/2. HomeSection/HomeSection";
import Experiencesection from "./Container/4. ExperienceSection/ExperienceSection";
import Projectsection from "./Container/5. ProjectSection/ProjectSection";
import Getintouch from "./Container/6. GetInTouch/GetInTouch";
import Signiaturesection from "./Container/7. Signiature Section/SigniatureSection";

class Zulkarnaenfhr extends Component {
    render() {
        return (
            <div onMouseMove={this.handleMouseMoveforEye} className="starsbackground">
                {/* <!-- html for background section  --> */}
                <section id="background">
                    <div id="stars"></div>
                    <div id="stars2"></div>
                    <div id="stars3"></div>
                </section>
                {/* <!-- end of html for background section  --> */}
                <Loader />
                <Navbar />
                <Homesection />
                <Aboutme />
                <Experiencesection />
                <Aboutme />
                <Projectsection />
                <Getintouch />
                <Signiaturesection />
            </div>
        );
    }
}

export default Zulkarnaenfhr;
