import React, { Component } from "react";
import "./Background.css";
import "./Style.css";
import Navbar from "./Container/1. Navbar/Navbar";
import Aboutme from "./Container/3. AboutMeSection/AboutMe";
import Homesection from "./Container/2. HomeSection/HomeSection";
import Experiencesection from "./Container/4. ExperienceSection/ExperienceSection";
import Projectsection from "./Container/5. ProjectSection/ProjectSection";
import Getintouch from "./Container/6. GetInTouch/GetInTouch";
import Signiaturesection from "./Container/7. Signiature Section/SigniatureSection";
import { AnimatePresence, motion } from "framer-motion";

class Zulkarnaenfhr extends Component {
   constructor(props) {
      super(props);

      this.state = {
         load: true,
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

   componentDidMount() {
      setTimeout(() => {
         this.setState({
            load: false,
         });
      }, 5000);

      const starCount = this.props.starCount || 3000;
      const width = this.props.width || 3000;
      const height = this.props.height || 10000;

      const stars = [];
      for (let i = 0; i < starCount; i++) {
         const x = Math.floor(Math.random() * width);
         const y = Math.floor(Math.random() * height);
         stars.push(`${x}px ${y}px #fff`);
      }
      const stars2 = [];
      for (let i = 0; i < starCount; i++) {
         const x = Math.floor(Math.random() * width);
         const y = Math.floor(Math.random() * height);
         stars2.push(`${x}px ${y}px #fff`);
      }
      const stars3 = [];
      for (let i = 0; i < starCount; i++) {
         const x = Math.floor(Math.random() * width);
         const y = Math.floor(Math.random() * height);
         stars3.push(`${x}px ${y}px #fff`);
      }

      this.setState({
         boxShadow: stars.join(", "),
         boxShadow2: stars2.join(", "),
         boxShadow3: stars3.join(", "),
      });
   }

   render() {
      const starStyle = {
         position: "absolute",
         top: 0,
         left: 0,
         width: "1px",
         height: "1px",
         boxShadow: this.state.boxShadow,
         background: "transparent",
         animation: "fallingStars 90s linear infinite",
      };
      const starStyle2 = {
         position: "absolute",
         top: 0,
         left: 0,
         width: "1px",
         height: "1px",
         boxShadow: this.state.boxShadow2,
         background: "transparent",
         animation: "fallingStars 70s linear infinite",
      };
      const starStyle3 = {
         position: "absolute",
         top: 0,
         left: 0,
         width: "1px",
         height: "1px",
         boxShadow: this.state.boxShadow3,
         background: "transparent",
         animation: "fallingStars 50s linear infinite",
      };

      return (
         <>
            <style>
               {`
            @keyframes fallingStars {
              0% {
                transform: translateY(-100vh);
              }
              100% {
                transform: translateY(0vh);
              }
            }
          `}
            </style>
            <div id="all-parents-content">
               {this.state.load ? (
                  <AnimatePresence>
                     <motion.div
                        key="loading-page"
                        initial="pageInitial"
                        animate="pageAnimate"
                        variants={{
                           pageInitial: {
                              opacity: 0,
                              // transition: { duration: 1 },
                           },
                           pageAnimate: {
                              opacity: 1,
                              transition: {
                                 duration: 1.5,
                              },
                           },
                        }}
                        exit="pageInitial"
                        className="loading-page"
                     >
                        <div id="loadPage">
                           <div className="loadPage-content-container">
                              <h1 className="loadPage-text">SpaceCapt Technology Industry</h1>
                           </div>
                        </div>
                     </motion.div>
                  </AnimatePresence>
               ) : (
                  <AnimatePresence>
                     <motion.div
                        key={"landingPage"}
                        initial="pageInitial"
                        animate="pageAnimate"
                        variants={{
                           pageInitial: {
                              opacity: 0,
                              transition: { duration: 1.5 },
                           },
                           pageAnimate: {
                              opacity: 1,
                           },
                        }}
                        exit="pageInitial"
                        className="landingPage"
                     >
                        <div onMouseMove={this.handleMouseMoveforEye} className="starsbackground">
                           {/* <!-- html for background section  --> */}
                           <section id="background">
                              <div style={starStyle}></div>
                              <div style={starStyle2}></div>
                              <div style={starStyle3}></div>
                           </section>
                           {/* <!-- end of html for background section  --> */}
                           <Navbar />
                           <Homesection />
                           <Aboutme />
                           <Experiencesection />
                           <Projectsection />
                           <Getintouch />
                           <Signiaturesection />
                        </div>
                     </motion.div>
                  </AnimatePresence>
               )}
            </div>
         </>
      );
   }
}

export default Zulkarnaenfhr;
