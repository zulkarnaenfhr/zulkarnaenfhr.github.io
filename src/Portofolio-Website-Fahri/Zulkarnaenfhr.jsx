import React, { Component } from "react";
import "./Background.css";
import "./Style.css";
import Loader from "./Loader";
import Navbar from "./Container/1. Navbar/Navbar";
import Aboutme from "./Container/3. AboutMeSection/AboutMe";
import Homesection from "./Container/2. HomeSection/HomeSection";
import Experiencesection from "./Container/4. ExperienceSection/ExperienceSection";
import Projectsection from "./Container/5. ProjectSection/ProjectSection";
import Getintouch from "./Container/6. GetInTouch/GetInTouch";
import Signiaturesection from "./Container/7. Signiature Section/SigniatureSection";

class Zulkarnaenfhr extends Component {
    constructor(props) {
        super(props);

        this.state = {
            first: "",
        };
        this.handleMouseMoveforEye = this.handleMouseMoveforEye.bind(this);
    }
    handleMouseMoveforEye = () => {
        const container = document.querySelector(".starsbackground");
        container.addEventListener("mousemove", (e) => {
            const eyes = document.querySelectorAll(".eye");
            [].forEach.call(eyes, function (eye) {
                // Get the mouse position on the horizontal axis
                let mouseX = eye.getBoundingClientRect().right;
                // If it's the left eye we need the left offset instead the right
                if (eye.classList.contains("eye-left")) {
                    mouseX = eye.getBoundingClientRect().left;
                }
                // Now we also need the vertical offset
                let mouseY = eye.getBoundingClientRect().top;
                // Now we are going to calculate the radian value of the offset between the mouse and the eye
                let radianDegrees = Math.atan2(e.pageX - mouseX, e.pageY - mouseY);
                // Let's convert this into a degree based value so we can use it in CSS
                let rotationDegrees = radianDegrees * (180 / Math.PI) * -1 + 180;
                // Now all we have to do is add this degrees to our eye!
                eye.style.transform = `rotate(${rotationDegrees}deg)`;
            });
        });
    };
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
                <Projectsection />
                <Getintouch />
                <Signiaturesection />
            </div>
        );
    }
}

export default Zulkarnaenfhr;
