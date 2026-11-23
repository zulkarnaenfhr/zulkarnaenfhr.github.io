import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useLanguage } from "../../LanguageContext";

function Navbar() {
   const { language, toggleLanguage, t } = useLanguage();
   return (
      <section className="space-navbar">
         <div data-aos="fade-left" data-aos-offset="100" id="fixedSideNavbar" data-aos-delay="2500" className="navbarfahri">
            <div>
               <div className="language-toggle" role="group" aria-label="Language selector">
                  <button type="button" aria-pressed={language === "en"} className={language === "en" ? "active" : ""} onClick={() => language !== "en" && toggleLanguage()}>EN</button>
                  <span>/</span>
                  <button type="button" aria-pressed={language === "id"} className={language === "id" ? "active" : ""} onClick={() => language !== "id" && toggleLanguage()}>ID</button>
               </div>
               <ul className="ulmenu">
                  {t.nav.map((label, index) => <li key={label}><a aria-label={label} href={["#homeSection", "#aboutMeSection", "#experienceSection", "#projectSection", "#getInTouch"][index]}>/ {label}</a></li>)}
                  <li><Link to="/files/CV_Fahri Izzuddin Zulkarnaen_Website Developer.pdf" target="_blank" download="CV_Fahri izzuddin Zulkarnaen_Website Developer"><p className="navbarDownloadCV">/ {t.download}</p></Link></li>
               </ul>
            </div>
         </div>
      </section>
   );
}

export default Navbar;
