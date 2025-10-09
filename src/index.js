import './accordion.js';
import './swiper.js';

const header = document.querySelector(".header");
const nav = document.querySelector(".nav");
const burgerLines = document.querySelectorAll(".burger__line");
const overlay = document.querySelector(".main__overlay");

document.querySelectorAll(".nav__link").forEach((link) => {
    if (link.href === window.location.href) {
        link.classList.add("nav__link_active");
    }
});

function navBar() {
    document.addEventListener("click", (event) => {
        if (event.target.closest(".burger")) {
            nav.classList.toggle("nav_active");
            nav.style.paddingTop = header.offsetHeight + "px";
            burgerLines.forEach((line) => {
                line.classList.toggle("burger_active");
                overlay.classList.toggle("main__overlay_active");
            });
        } else if (event.target.closest(".burger") || event.target.closest(".main__overlay")) {
            nav.classList.remove("nav_active");
            nav.style.paddingTop = "";
            burgerLines.forEach((line) => {
                line.classList.remove("burger_active");
            });
            overlay.classList.remove("main__overlay_active");
        }
    });

    const mediaQueryMinWidth_1200 = window.matchMedia('(min-width: 1200px)');
    mediaQueryMinWidth_1200.addEventListener("change", (e) => {
        if (e.matches) {
            nav.style.paddingTop = "";
            nav.classList.remove("nav_active")
            overlay.classList.remove("main__overlay_active");
            burgerLines.forEach((line) => {
                line.classList.remove("burger_active");
            });
            return true;
        }
        else {
            nav.style.paddingTop = header.offsetHeight + "px";
        }
        return false;
    });
}

navBar();

const loaderBox = document.querySelector(".loader-box");
window.addEventListener("load", (event) => {
    loaderBox.classList.add("loader-box_hidden");
});

if (HTMLScriptElement.supports && HTMLScriptElement.supports("speculationrules")) {
    const specScript = document.createElement("script");
    specScript.type = "speculationrules";
    const specRules = {
        prerender: [
            {
                "urls": ["/", "/about.html", "/services.html", "/team.html", "/blog.html", "/contact.html"],
                "eagerness": "immediate"
            }
        ],
    };
    specScript.textContent = JSON.stringify(specRules);
    document.body.append(specScript);
}