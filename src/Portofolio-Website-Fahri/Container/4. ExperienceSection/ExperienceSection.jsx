import React, { Component } from "react";
import "./ExperienceSection.css";
import SpaceObject from "../SpaceObject";
import { LanguageContext } from "../../LanguageContext";

const workingExperience = [
   {
      id: "bankCentralAsia",
      tab: "PT Bank Central Asia",
      role: "IT Specialist",
      place: "PT Bank Central Asia",
      period: "August 2023 - now",
      description:
         "Developed an Apply Credit Card Online Application for BCA customers, enabling them to apply for credit cards directly and seamlessly. Currently, this feature is accessible through the myBCA application, enhancing user experience and streamlining the application process.",
   },
   {
      id: "telkomIndonesia",
      tab: "PT Telkom Indonesia",
      role: "Developer",
      place: "Telkom Indonesia",
      period: "February 2022 - March 2023",
      description:
         "Create products that are visible to users, with special emphasis on user interface design, and also Turn well-researched product designs enjoyable app experiences that integrate well with our backend APIs and also work consistently across multiple devices.",
   },
   {
      id: "bhinneka",
      tab: "Bhinneka",
      role: "Software Developer",
      place: "Bhinneka",
      period: "Agustus 2022 - now",
      description: "Creating a website that can record all employee activities both in the form of OKR and KPI and several features that support it",
   },
   {
      id: "littleDessertSidoarjo",
      tab: "Little Dessert",
      role: "Front-End Developer",
      place: "Little dessert",
      period: "September 2021 - January 2022",
      description: (
         <>
            Design and Developed landing page website for{" "}
            <a className="experience-panel__link" href="https://zulkarnaenfhr.github.io/little-dessert.github.io/" target="_blank" rel="noopener noreferrer">
               Little Dessert Sidoarjo
            </a>
         </>
      ),
   },
];

const organizationExperience = [
   {
      id: "UPNVeteranJawaTimur",
      tab: "UPN Veteran Jawa Timur",
      role: "Huminfo division",
      place: "KoLU",
      period: "December 2020 - December 2022",
      description: "Responsible for creating harmonious relationships between internal and external parties and also responsible for creating interesting Instagram content.",
   },
   {
      id: "SMAN1Surabaya",
      tab: "SMAN 1 Surabaya",
      role: "Vice Leader",
      place: "OSIS SMAN 1 Surabaya",
      period: "September 2017 - August 2018",
      description: "Responsible to arrange and prepare all the duties related to internal and external activities. also creating policy for extracurricular activities",
   },
   {
      id: "SMPN6Sidoarjo",
      tab: "SMPN 6 Sidoarjo",
      role: "Head of Art Division",
      place: "OSIS SMPN 6 Sidoarjo",
      period: "September 2013 - August 2014",
      description: "Accommodate all school community activities regarding matters related to artistic activities",
   },
];

class ExperienceTabs extends Component {
   state = { active: this.props.items[0].id };

   render() {
      const { items, label } = this.props;
      const current = items.find((item) => item.id === this.state.active);
      return (
         <div className="experience-tabs">
            <div className="experience-tabs__list" role="tablist" aria-label={label}>
               {items.map((item) => (
                  <button
                     key={item.id}
                     type="button"
                     role="tab"
                     aria-selected={item.id === current.id}
                     className={`experience-tabs__tab${item.id === current.id ? " is-active" : ""}`}
                     onClick={() => this.setState({ active: item.id })}
                  >
                     {item.tab}
                  </button>
               ))}
            </div>
            <div className="experience-panel" role="tabpanel" key={current.id}>
               <h3 className="experience-panel__title">
                  {current.role} <span className="experience-panel__place">@ {current.place}</span>
               </h3>
               <p className="experience-panel__period">{current.period}</p>
               <p className="experience-panel__desc">{current.description}</p>
            </div>
         </div>
      );
   }
}

class Experiencesection extends Component {
   static contextType = LanguageContext;

   render() {
      const { t } = this.context;
      return (
         <section id="experienceSection" className="page-section">
            <SpaceObject variant="experience" />
            <div className="section-container">
               <h1 className="sectionTitle" data-aos="fade-up" data-aos-offset="100">
                  / {t.experience}
               </h1>
               <div className="experience-group" data-aos="fade-up" data-aos-offset="100">
                  <h2 className="section-subtitle">/ {t.working}</h2>
                  <ExperienceTabs items={workingExperience} label={t.working} />
               </div>
               <div className="experience-group" data-aos="fade-up" data-aos-offset="100">
                  <h2 className="section-subtitle">/ {t.organization}</h2>
                  <ExperienceTabs items={organizationExperience} label={t.organization} />
               </div>
            </div>
         </section>
      );
   }
}

export default Experiencesection;
