import React, { Component } from "react";
import "./GetInTouch.css";
import { LanguageContext } from "../../LanguageContext";

const socials = [
   { label: "Instagram", icon: "fab fa-instagram", href: "https://www.instagram.com/zulkarnaenfhr/" },
   { label: "LinkedIn", icon: "fab fa-linkedin-in", href: "https://www.linkedin.com/in/fahrizulkarnaen" },
   { label: "GitHub", icon: "fab fa-github", href: "https://github.com/zulkarnaenfhr" },
];

class Getintouch extends Component {
   static contextType = LanguageContext;
   render() {
      const { t } = this.context;
      return (
         <section id="getInTouch" className="page-section">
            <div className="section-container contact">
               <h1 className="contact__title" data-aos="fade-up" data-aos-offset="100">
                  {t.contact}
               </h1>
               <p className="contact__sub" data-aos="fade-up" data-aos-offset="100">
                  {t.contactSub}
               </p>

               <div className="contact__block" data-aos="fade-up">
                  <p className="contact__label">{t.email}</p>
                  <a className="contact__email" href="mailto:fahrizulkarnaen1@gmail.com">
                     fahrizulkarnaen1@gmail.com
                  </a>
               </div>

               <div className="contact__block" data-aos="fade-up">
                  <p className="contact__label">{t.social}</p>
                  <ul className="contact__socials">
                     {socials.map((social) => (
                        <li key={social.label}>
                           <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                              <i className={social.icon} aria-hidden="true"></i>
                              <span>{social.label}</span>
                           </a>
                        </li>
                     ))}
                  </ul>
               </div>
            </div>
         </section>
      );
   }
}

export default Getintouch;
