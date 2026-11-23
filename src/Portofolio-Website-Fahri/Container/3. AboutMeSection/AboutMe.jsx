import React, { Component } from "react";
import "./AboutMe.css";
import { LanguageContext } from "../../LanguageContext";

const technologies = ["Python", "Java Spring Boot", "Java Spring Batch", "Angular", "Next.js & React", "Node.js", "SQL Databases", "NoSQL Databases"];

class Aboutme extends Component {
   static contextType = LanguageContext;
   render() {
      const { t } = this.context;
      return (
         <section id="aboutMeSection" className="page-section">
            <div className="section-container">
               <h1 className="sectionTitle" data-aos="fade-up" data-aos-offset="100">
                  / {t.about}
               </h1>
               <div className="about-grid">
                  <div className="about-text" data-aos="fade-up" data-aos-delay="100">
                     <p>
                        Hi! I’m <b className="boldAboutMe">Fahri Izzuddin Zulkarnaen</b>, a Fullstack Software Developer with experience building scalable and user-focused web applications. I graduated from Informatics
                        Engineering at UPN Veteran Jawa Timur with a GPA of 3.90 and currently work as an IT Specialist at <b className="boldAboutMe">PT Bank Central Indonesia(bca)</b>.
                     </p>
                     <p>
                        My experience includes developing high-impact applications used by thousands of users, maintaining microservices architectures, and supporting enterprise-scale system integrations. I mainly work
                        with <b className="boldAboutMe">Angular, Java Spring Boot, React, and Node.js across both frontend and backend development.</b>
                     </p>
                     <p>Outside of work, I actively explore advancements in Artificial Intelligence and software engineering to keep expanding my technical knowledge and perspective.</p>
                  </div>
                  <aside className="about-tech" data-aos="fade-up" data-aos-delay="200">
                     <p className="about-tech__label">{t.technologies}</p>
                     <ul className="about-tech__list">
                        {technologies.map((tech) => (
                           <li key={tech}>{tech}</li>
                        ))}
                     </ul>
                  </aside>
               </div>
            </div>
         </section>
      );
   }
}

export default Aboutme;
