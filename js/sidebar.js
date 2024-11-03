const menuButton = document.getElementById("menu-button");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const linkElements = document.querySelectorAll(".link");


const toggleSidebar = (isOpen) => {
  sidebar.classList.toggle("open", isOpen);
  overlay.classList.toggle("open", isOpen);
};


menuButton.addEventListener("click", () => {
  const isOpen = sidebar.classList.contains("open");
  toggleSidebar(!isOpen); 
});

overlay.addEventListener("click", () => toggleSidebar(false));

linkElements.forEach((element) => {
  element.addEventListener("click", () => toggleSidebar(false));
});



const anchors = document.querySelectorAll('a[href^="#"]');
anchors.forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    event.preventDefault();

    const targetId = anchor.getAttribute("href");

    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});