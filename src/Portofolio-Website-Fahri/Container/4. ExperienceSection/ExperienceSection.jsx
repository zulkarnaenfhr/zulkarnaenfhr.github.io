import React, { Component } from "react";
import "./ExperienceSection.css";

class Experiencesection extends Component {
   constructor(props) {
      super(props);

      this.state = {
         statusWorking: "bankCentralAsia",
         statusOrganization: "UPNVeteranJawaTimur",
         innerWidth: 0,
      };
      this.handleWorkingChange = this.handleWorkingChange.bind(this);
      this.handleOrganizationChange = this.handleOrganizationChange.bind(this);
   }

   handleWorkingChange = (e) => {
      this.setState({
         statusWorking: e.target.name,
      });
   };

   handleOrganizationChange = (e) => {
      this.setState({
         statusOrganization: e.target.name,
      });
   };

   componentDidMount() {
      this.setState({
         innerWidth: window.innerWidth,
      });
   }

   render() {
      return (
         <section id="experienceSection">
            <div className="container-fluid experience">
               <div className="container ">
                  <div>
                     <h1 className="sectionTitle" data-aos="fade-up" data-aos-offset="100">
                        / Experience
                     </h1>
                  </div>
                  <div className="">
                     <div className="workingExperience" data-aos="fade-up" data-aos-offset="100">
                        <h4>/ Working Experience</h4>
                        <div className="experienceContent">
                           <div className="sectionLeftExperience">
                              <ul>
                                 <li>
                                    <button
                                       name="bankCentralAsia"
                                       onClick={this.handleWorkingChange}
                                       id="buttonBankCentralAsia"
                                       style={this.state.statusWorking === "bankCentralAsia" ? { color: "#19f9d8" } : { color: "" }}
                                       className="experienceButton"
                                    >
                                       PT Bank Central Asia
                                    </button>
                                 </li>
                                 <li className="buttonbawah">
                                    <button
                                       name="telkomIndonesia"
                                       onClick={this.handleWorkingChange}
                                       id="buttonTelkomIndonesia"
                                       style={this.state.statusWorking === "telkomIndonesia" ? { color: "#19f9d8" } : { color: "" }}
                                       className="experienceButton"
                                    >
                                       PT Telkom Indonesia
                                    </button>
                                 </li>
                                 <li className="buttonbawah">
                                    <button name="bhinneka" onClick={this.handleWorkingChange} id="buttonBhinneka" style={this.state.statusWorking === "bhinneka" ? { color: "#19f9d8" } : { color: "" }} className="experienceButton">
                                       Bhinneka
                                    </button>
                                 </li>
                                 <li className="buttonbawah">
                                    <button
                                       name="cateringBundaMia"
                                       onClick={this.handleWorkingChange}
                                       id="buttonCateringBundaMia"
                                       style={this.state.statusWorking === "cateringBundaMia" ? { color: "#19f9d8" } : { color: "" }}
                                       className="experienceButton"
                                    >
                                       Catering Bunda Mia
                                    </button>
                                 </li>
                                 <li className="buttonbawah">
                                    <button
                                       name="littleDessertSidoarjo"
                                       onClick={this.handleWorkingChange}
                                       id="buttonLittleDessert"
                                       style={this.state.statusWorking === "littleDessertSidoarjo" ? { color: "#19f9d8" } : { color: "" }}
                                       className="experienceButton button2"
                                    >
                                       Little Dessert
                                    </button>
                                 </li>
                              </ul>
                           </div>

                           <div id="experience-sectionright" className={this.state.innerWidth > 1000 ? "col-7 sectionRightExperience sectionRightExperienceworking" : "sectionRightExperience sectionRightExperienceworking"}>
                              <div className={this.state.statusWorking === "bankCentralAsia" ? "load-show-workingExperience" : "load-hide-workingExperience"}>
                                 <div className="firstExperience">
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                       <p id="positionOffice" className="position">
                                          IT Specialist @
                                          <span id="nameOffice" className="name">
                                             PT Bank Central Asia
                                          </span>
                                       </p>
                                    </div>
                                    <p id="durationOffice" className="duration">
                                       August 2023 - now
                                    </p>
                                    <p id="descriptionOffice" className="description">
                                       Developed an Apply Credit Card Online Application for BCA customers, enabling them to apply for credit cards directly and seamlessly. Currently, this feature is accessible through the myBCA
                                       application, enhancing user experience and streamlining the application process.
                                    </p>
                                 </div>
                              </div>
                              <div className={this.state.statusWorking === "telkomIndonesia" ? "load-show-workingExperience" : "load-hide-workingExperience"}>
                                 <div className="firstExperience">
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                       <p id="positionOffice" className="position">
                                          Developer @
                                          <span id="nameOffice" className="name">
                                             Telkom Indonesia
                                          </span>
                                       </p>
                                    </div>
                                    <p id="durationOffice" className="duration">
                                       February 2022 - March 2023
                                    </p>
                                    <p id="descriptionOffice" className="description">
                                       Create products that are visible to users, with special emphasis on user interface design, and also Turn well-researched product designs enjoyable app experiences that integrate well with our backend
                                       APIs and also work consistently across multiple devices.
                                    </p>
                                 </div>
                              </div>
                              <div className={this.state.statusWorking === "bhinneka" ? "load-show-workingExperience" : "load-hide-workingExperience"}>
                                 <div className="firstExperience">
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                       <p id="positionOffice" className="position">
                                          Software Developer @
                                          <span id="nameOffice" className="name">
                                             Bhinneka
                                          </span>
                                       </p>
                                    </div>
                                    <p id="durationOffice" className="duration">
                                       Agustus 2022 - now
                                    </p>
                                    <p id="descriptionOffice" className="description">
                                       Creating a website that can record all employee activities both in the form of OKR and KPI and several features that support it
                                    </p>
                                 </div>
                              </div>
                              <div className={this.state.statusWorking === "cateringBundaMia" ? "load-show-workingExperience" : "load-hide-workingExperience"}>
                                 <div className="firstExperience">
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                       <p id="positionOffice" className="position">
                                          Project Manager @
                                          <span id="nameOffice" className="name">
                                             Catering Bunda Mia
                                          </span>
                                       </p>
                                    </div>
                                    <p id="durationOffice" className="duration">
                                       May 2018 - January 2022
                                    </p>
                                    <p id="descriptionOffice" className="description">
                                       Planning, executing, monitoring, controlling, and closing out all incoming order for Catering Bunda Mia Sidoarjo.
                                    </p>
                                 </div>
                              </div>
                              <div className={this.state.statusWorking === "littleDessertSidoarjo" ? "load-show-workingExperience" : "load-hide-workingExperience"}>
                                 <div className="firstExperience">
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                       <p id="positionOffice" className="position">
                                          Front-End Developer @
                                          <span id="nameOffice" className="name">
                                             Little dessert
                                          </span>
                                       </p>
                                    </div>
                                    <p id="durationOffice" className="duration">
                                       September 2021 - January 2022
                                    </p>
                                    <p id="descriptionOffice" className="description">
                                       Design and Developed landing page website for{" "}
                                       <a aria-label="littleDesserSidoarjoWebsite" className="littleDessertSidoarjo-website" href="https://zulkarnaenfhr.github.io/little-dessert.github.io/">
                                          Little Dessert Sidoarjo
                                       </a>{" "}
                                    </p>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div id="organizationExperience" data-aos="fade-up" data-aos-offset="100">
                        <h4>/ Organization Experience</h4>
                        <div className="experienceContent">
                           <div className="sectionLeftExperience">
                              <ul>
                                 <li>
                                    <button
                                       name="UPNVeteranJawaTimur"
                                       style={this.state.statusOrganization === "UPNVeteranJawaTimur" ? { color: "#19f9d8" } : { color: "" }}
                                       onClick={this.handleOrganizationChange}
                                       className="experienceButton"
                                       id="buttonkuliah"
                                    >
                                       UPN Veteran Jawa Timur
                                    </button>
                                 </li>
                                 <li className="buttonbawah">
                                    <button
                                       style={this.state.statusOrganization === "SMAN1Surabaya" ? { color: "#19f9d8" } : { color: "" }}
                                       name="SMAN1Surabaya"
                                       onClick={this.handleOrganizationChange}
                                       className="experienceButton"
                                       id="buttonsma"
                                    >
                                       SMAN 1 Surabaya
                                    </button>
                                 </li>
                                 <li className="buttonbawah">
                                    <button
                                       style={this.state.statusOrganization === "SMPN6Sidoarjo" ? { color: "#19f9d8" } : { color: "" }}
                                       name="SMPN6Sidoarjo"
                                       onClick={this.handleOrganizationChange}
                                       className="experienceButton"
                                       id="buttonsmp"
                                    >
                                       SMPN 6 Sidoarjo
                                    </button>
                                 </li>
                              </ul>
                           </div>
                           <div id="experience-sectionright2" className={this.state.innerWidth > 1000 ? "col-7 sectionRightExperience" : "sectionRightExperience"}>
                              <div className={this.state.statusOrganization === "UPNVeteranJawaTimur" ? "load-show-workingExperience" : "load-hide-workingExperience"}>
                                 <div className="firstExperience">
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                       <p style={{ display: "none" }}>pembatas biar ga ngaco</p>
                                       <p id="positionorganization" className="position">
                                          Huminfo division @
                                          <span id="nameorganization" className="name">
                                             KoLU
                                          </span>
                                       </p>
                                    </div>
                                    <p id="durationorganization" className="duration">
                                       December 2020 - December 2022
                                    </p>
                                    <p id="descriptionorganization" className="description">
                                       Responsible for creating harmonious relationships between internal and external parties and also responsible for creating interesting Instagram content.
                                    </p>
                                 </div>
                              </div>
                              <div className={this.state.statusOrganization === "SMAN1Surabaya" ? "load-show-workingExperience" : "load-hide-workingExperience"}>
                                 <div className="firstExperience">
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                       <p style={{ display: "none" }}>pembatas biar ga ngaco</p>
                                       <p id="positionorganization" className="position">
                                          Vice Leader @
                                          <span id="nameorganization" className="name">
                                             OSIS SMAN 1 Surabaya
                                          </span>
                                       </p>
                                    </div>
                                    <p id="durationorganization" className="duration">
                                       September 2017 - August 2018{" "}
                                    </p>
                                    <p id="descriptionorganization" className="description">
                                       Responsible to arrange and prepare all the duties related to internal and external activities. also creating policy for extracurricular activities{" "}
                                    </p>
                                 </div>
                                 <div className="secondExperience">
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                       <p style={{ display: "none" }}>pembatas biar ga ngaco</p>
                                       <p id="positionorganization" className="position">
                                          Head of Art and Sport Division @
                                          <span id="nameorganization" className="name">
                                             OSIS SMAN 1 Surabaya
                                          </span>
                                       </p>
                                    </div>
                                    <p id="durationorganization" className="duration">
                                       September 2016 - August 2017{" "}
                                    </p>
                                    <p id="descriptionorganization" className="description">
                                       Arranging the schedule between extracurricular so that it does not conflict with each other and has responsibility for the competition activities carried out by the extracurricular{" "}
                                    </p>
                                 </div>
                              </div>
                              <div className={this.state.statusOrganization === "SMPN6Sidoarjo" ? "load-show-workingExperience" : "load-hide-workingExperience"}>
                                 <div className="firstExperience">
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                       <p style={{ display: "none" }}>pembatas biar ga ngaco</p>
                                       <p id="positionorganization" className="position">
                                          Head of Art Division @
                                          <span id="nameorganization" className="name">
                                             OSIS SMPN 6 Sidoarjo
                                          </span>
                                       </p>
                                    </div>
                                    <p id="durationorganization" className="duration">
                                       September 2013 - August 2014{" "}
                                    </p>
                                    <p id="descriptionorganization" className="description">
                                       Accommodate all school community activities regarding matters related to artistic activities{" "}
                                    </p>
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

export default Experiencesection;
