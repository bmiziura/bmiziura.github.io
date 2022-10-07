// Observer for navbar items
const sections = document.querySelectorAll("section")

const observerElements = new Map()

observerElements.set("hero", document.querySelector("#links\\.homepage"))
observerElements.set("links", document.querySelector("#links\\.homepage"))

observerElements.set("skills", document.querySelector("#links\\.skills"))
observerElements.set("projects", document.querySelector("#links\\.projects"))

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e?.target?.id) {
        const element = observerElements.get(e.target.id)

        if (element) {
          if (e.isIntersecting) {
            element.classList.add("navbar__link--active")
          } else {
            element.classList.remove("navbar__link--active")
          }
        }
      }
    })
  },
  {
    threshold: 0.5,
  }
)

sections.forEach((section) => {
  observer.observe(section)
})

//Navbar background on scroll
const navbar = document.getElementById("navbar")

var scrolled = false

addEventListener("scroll", (event) => {
  const scrollY = window.scrollY

  if (scrollY <= 50 && scrolled) {
    scrolled = false

    updateNavbar()
  } else if (scrollY > 50 && !scrolled) {
    scrolled = true

    updateNavbar()
  }
})

function updateNavbar() {
  if (scrolled) navbar.classList.add("navbar--background")
  else navbar.classList.remove("navbar--background")
}

// Mobile Navigation
const hamburgerButton = document.getElementById("hamburger-btn")
const navbarContainer = document.getElementById("navbar-mobile-container")
const navbarContainerBg = document.getElementById("navbar-mobile-container-bg")

const mobileNavbarHandler = (e) => {
  if (navbarContainer.classList.contains("navbar__container--active")) {
    navbarContainer.classList.remove("navbar__container--active")
    navbarContainerBg.classList.remove("navbar__container-bg--active")
  } else {
    navbarContainer.classList.add("navbar__container--active")
    navbarContainerBg.classList.add("navbar__container-bg--active")
  }
}

hamburgerButton.addEventListener("click", mobileNavbarHandler)
navbarContainerBg.addEventListener("click", mobileNavbarHandler)

const links = document.querySelectorAll(".navbar__link")

links.forEach((link) =>
  link.addEventListener("click", (e) => {
    navbarContainer.classList.remove("navbar__container--active")
    navbarContainerBg.classList.remove("navbar__container-bg--active")
  })
)

// Theme
const storage = localStorage

function detectTheme() {
  const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)")

  if (darkThemeMq.matches) {
    const body = document.querySelector("body")

    body.classList.add("dark-mode")
  }
}

detectTheme()

// Language
async function detectLanguage() {
  let lang = storage.getItem("selectedLanguage")

  if (lang == null) lang = navigator.language

  const file = lang === "pl" ? "lang_pl.json" : "lang_en.json"

  const res = await fetch(`assets/lang/${file}`)

  const data = await res.json()

  updateLanguage(lang, data)
}

function changeLanguage(lang) {
  storage.setItem("selectedLanguage", lang)

  detectLanguage()
}

const englishButton = document.getElementById("english-language")
englishButton.addEventListener("click", () => changeLanguage("en"))

const polishButton = document.getElementById("polish-language")
polishButton.addEventListener("click", () => changeLanguage("pl"))

function updateLanguage(lang, data) {
  englishButton.classList.remove("navbar__language--selected")
  polishButton.classList.remove("navbar__language--selected")

  if (lang === "pl") polishButton.classList.add("navbar__language--selected")
  else englishButton.classList.add("navbar__language--selected")

  Object.keys(data).map((key) => {
    Object.keys(data[key]).map((elementKey) => {
      const id = elementKey
      const value = data[key][id]

      const element = document.getElementById(id)

      if (element) element.textContent = value
    })
  })
}

detectLanguage()
