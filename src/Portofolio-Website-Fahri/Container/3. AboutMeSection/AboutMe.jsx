import React, { Component } from "react";
import "./AboutMe.css";

class Aboutme extends Component {
   constructor(props) {
      super(props);

      this.state = {
         innerWidth: 0,
      };
   }
   componentDidMount() {
      this.setState({
         innerWidth: window.innerWidth,
      });
   }
   render() {
      return (
         <section id="aboutMeSection">
            <div className="container-fluid aboutMe">
               <div className="container">
                  <h1 className="sectionTitle" data-aos="fade-up" data-aos-offset="100">
                     / About me
                  </h1>
                  <div className="col-10 aboutMeContent" data-aos="fade-up">
                     <div>
                        <div id="aboutMeLeft" className={this.state.innerWidth > 992 ? "col-3 aboutMeContentLeft" : "aboutMeContentLeft"} data-aos="fade-up" data-aos-delay="50"></div>
                        <div id="aboutMeRight" className={this.state.innerWidth > 992 ? "col-9 aboutMeDescription" : "aboutMeDescription"}>
                           <div className="paragraf paragraf1" data-aos="fade-up" data-aos-delay="100">
                              Hiiii, my name is <b className="boldAboutMe">Fahri Izzuddin Zulkarnaen</b>. I graduated from Informatics Engineering at <b className="boldAboutMe">UPN Veteran Jawa Timur</b> with a GPA of 3.90, specializing in
                              Fullstack Development and Artificial Intelligence Engineering. I have also worked as an IT Specialist at <b className="boldAboutMe">PT Bank Central Indonesia</b>.
                           </div>
                           <div className="paragraf paragraf2" data-aos="fade-up" data-aos-delay="100">
                              I am passionate about building excellent software that improves the lives of those around me. I am diving deeper into
                              <b className="boldAboutMe"> Front-End Development</b>. focusing on creating and animating 3D computer graphics for web browsers. I'm also Well-organised person, problem solver, independent employee with high
                              attention to detail.
                           </div>
                           <div className="paragraf paragraf2" data-aos="fade-up" data-aos-delay="100">
                              In my free time, I continue to learn and explore advancements in <b className="boldAboutMe">Artificial Intelligence</b> .
                           </div>

                           <div data-aos="fade-up" data-aos-delay="300" data-aos-offset="100">
                              <div className="technology">Here are some technologies I have been working with:</div>
                              <div className="row techlist-content" style={{ marginLeft: "-1.5rem" }}>
                                 <div className="col-6 technologylist">
                                    <ul>
                                       <li>Python</li>
                                       <li>Java Spring Boot</li>
                                       <li>Java Spring Batch</li>
                                       <li>Angular Js</li>
                                    </ul>
                                 </div>
                                 <div className="col-6 technologylist">
                                    <ul>
                                       <li>Next and React Js</li>
                                       <li>Node Js</li>
                                       <li>SQL Databases</li>
                                       <li>NoSQL Databases</li>
                                    </ul>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      );
   }
}

export default Aboutme;
