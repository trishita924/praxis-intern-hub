document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     COUNTRY LIST
  ========================= */

  const countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola",
    "Argentina", "Armenia", "Australia", "Austria", "Bangladesh",
    "Belgium", "Bhutan", "Brazil", "Canada", "China", "Denmark",
    "Egypt", "Finland", "France", "Germany", "Ghana", "Greece",
    "India", "Indonesia", "Ireland", "Israel", "Italy", "Japan",
    "Kenya", "Malaysia", "Maldives", "Mexico", "Nepal",
    "Netherlands", "New Zealand", "Nigeria", "Norway", "Pakistan",
    "Philippines", "Poland", "Portugal", "Qatar", "Russia",
    "Saudi Arabia", "Singapore", "South Africa", "South Korea",
    "Spain", "Sri Lanka", "Sweden", "Switzerland", "Thailand",
    "Turkey", "United Arab Emirates", "United Kingdom",
    "United States", "Vietnam", "Zimbabwe"
  ];

  const countrySelect = document.getElementById("country");

  if (countrySelect) {
    countries.forEach(country => {
      const option = document.createElement("option");
      option.value = country;
      option.textContent = country;
      countrySelect.appendChild(option);
    });
  }


  /* =========================
     INTERNSHIP FILTERS
  ========================= */

  const cards = [...document.querySelectorAll(".intern-card")];
  const domainSelect = document.getElementById("domain");
  const locationSelect = document.getElementById("location");
  const resultCount = document.getElementById("resultCount");
  const emptyState = document.getElementById("emptyState");
  const toast = document.getElementById("toast");

  function showToast(message) {

    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(window.__toastTimer);

    window.__toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 2400);
  }


  function filterCards() {

    if (!countrySelect || !locationSelect || !domainSelect) return;

    const country = countrySelect.value;
    const location = locationSelect.value;
    const domain = domainSelect.value;

    let visible = 0;

    cards.forEach(card => {

      const matchesCountry =
        country === "all" ||
        card.dataset.country === country;

      const matchesLocation =
        location === "all" ||
        card.dataset.location === location;

      const matchesDomain =
        domain === "all" ||
        card.dataset.domain === domain;

      const match =
        matchesCountry &&
        matchesLocation &&
        matchesDomain;

      card.style.display = match ? "flex" : "none";

      if (match) visible++;
    });

    if (emptyState) {
      emptyState.style.display =
        visible ? "none" : "block";
    }

    if (resultCount) {
      resultCount.textContent = visible
        ? `${visible} curated match${visible === 1 ? "" : "es"}`
        : "No exact matches";
    }
  }


  const searchBtn = document.getElementById("searchBtn");

  if (searchBtn) {

    searchBtn.addEventListener("click", () => {

      filterCards();

      const opportunities =
        document.querySelector(".opportunities");

      if (opportunities) {
        opportunities.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }

    });

  }


  document
    .querySelectorAll(".quick-tags button")
    .forEach(btn => {

      btn.addEventListener("click", () => {

        if (btn.dataset.domain) {

          domainSelect.value = btn.dataset.domain;
          locationSelect.value = "all";
          countrySelect.value = "all";

        }

        if (btn.dataset.location) {

          locationSelect.value = btn.dataset.location;
          domainSelect.value = "all";
          countrySelect.value = "all";

        }

        filterCards();

      });

    });




  const navLogin = document.getElementById("navLogin");

  if (navLogin) {

    navLogin.addEventListener("click", () => {

      const loginCard =
        document.querySelector(".login-card");

      if (loginCard) {

        loginCard.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });

      }

    });

  }


  /* =========================
     SAVE INTERNSHIP
  ========================= */

  document
    .querySelectorAll(".save")
    .forEach(save => {

      save.addEventListener("click", () => {

        save.textContent =
          save.textContent === "♡" ? "♥" : "♡";

        showToast(
          save.textContent === "♥"
            ? "Internship saved."
            : "Removed from saved internships."
        );

      });

    });


  /* =========================
     VIEW ALL
  ========================= */

  const viewAll =
    document.getElementById("viewAll");

  if (viewAll) {

    viewAll.addEventListener("click", () => {

      if (countrySelect) countrySelect.value = "all";
      if (locationSelect) locationSelect.value = "all";
      if (domainSelect) domainSelect.value = "all";

      cards.forEach(card => {
        card.style.display = "flex";
      });

      if (emptyState) {
        emptyState.style.display = "none";
      }

      if (resultCount) {
        resultCount.textContent =
          "12,480+ opportunities";
      }

      const opportunities =
        document.querySelector(".opportunities");

      if (opportunities) {

        opportunities.scrollIntoView({
          behavior: "smooth"
        });

      }

    });

  }


  /* =================================================
     PRAXIS AI CHATBOT
  ================================================= */

  const aiInput =
    document.getElementById("aiInput");

  const aiSend =
    document.getElementById("aiSend");

  const chatBody =
    document.getElementById("chatBody");


  /* Check that chatbot exists */

  if (!aiInput || !aiSend || !chatBody) {

    console.error(
      "Praxis AI: Chatbot elements not found."
    );

    return;
  }


  /* Add USER message */

  function addUserMessage(message) {

    const messageDiv =
      document.createElement("div");

    messageDiv.className =
      "ai-message user-message";

    const bubble =
      document.createElement("div");

    bubble.className =
      "message-bubble user-bubble";

    bubble.textContent = message;

    messageDiv.appendChild(bubble);

    chatBody.appendChild(messageDiv);

  }


  /* Add AI message */

  function addAIMessage(message) {

    const messageDiv =
      document.createElement("div");

    messageDiv.className =
      "ai-message";

    messageDiv.innerHTML = `
      <div class="message-avatar">✦</div>

      <div class="message-bubble">
        ${message}
      </div>
    `;

    chatBody.appendChild(messageDiv);

  }


  /* AI responses */

  function getAIResponse(message) {

    const text =
      message.toLowerCase();


    if (
      text.includes("ai") ||
      text.includes("machine learning") ||
      text.includes("ml")
    ) {

      return `
        For AI / ML internships, look for roles involving
        Python, Machine Learning, Deep Learning, Data Science
        or Generative AI. 🤖
      `;

    }


    if (
      text.includes("remote") ||
      text.includes("work from home")
    ) {

      return `
        Absolutely! 🌍 You can find remote internships
        using the Location filter. Select
        <b>Remote</b> or <b>Work from home</b>.
      `;

    }


    if (
      text.includes("software") ||
      text.includes("developer") ||
      text.includes("coding")
    ) {

      return `
        For software development, you can explore
        Web Development, App Development,
        Software Engineering or Cloud & DevOps internships. 💻
      `;

    }


    if (
      text.includes("design") ||
      text.includes("ui") ||
      text.includes("ux")
    ) {

      return `
        If you enjoy creativity, UI/UX Design could be
        a great direction. A strong portfolio is especially
        useful for design internships. 🎨
      `;

    }


    if (
      text.includes("domain") ||
      text.includes("career") ||
      text.includes("confused")
    ) {

      return `
        Here's a simple way to think about it:
        coding → Software/AI,
        analysing data → Data Science,
        creativity → UI/UX,
        security → Cybersecurity,
        business → Product/Strategy.
      `;

    }


    if (
      text.includes("hello") ||
      text.includes("hi") ||
      text.includes("hey")
    ) {

      return `
        Hey! 👋 I'm Praxis AI.
        Tell me your skills, preferred domain
        or location and I'll help you explore internships.
      `;

    }


    return `
      I can help you explore internships based on
      your skills, domain and location. Try asking:
      <br><br>
      <b>“Find AI internships”</b>
      <br>
      <b>“I want a remote internship”</b>
      <br>
      <b>“Help me choose a domain”</b>
    `;

  }


  /* =========================
     SEND MESSAGE
  ========================= */

  function sendAIMessage() {

    const message =
      aiInput.value.trim();


    if (!message) return;


    /* Show user's message */

    addUserMessage(message);


    /* Clear input */

    aiInput.value = "";


    /* Scroll */

    chatBody.scrollTop =
      chatBody.scrollHeight;


    /* AI response */

    setTimeout(() => {

      const response =
        getAIResponse(message);

      addAIMessage(response);

      chatBody.scrollTop =
        chatBody.scrollHeight;

    }, 500);

  }


  /* SEND BUTTON */

  aiSend.addEventListener(
    "click",
    sendAIMessage
  );


  /* ENTER KEY */

  aiInput.addEventListener(
    "keydown",
    event => {

      if (event.key === "Enter") {

        event.preventDefault();

        sendAIMessage();

      }

    }
  );


  /* QUICK SUGGESTIONS */

  document
    .querySelectorAll(".ai-suggestions button")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          aiInput.value =
            button.textContent.trim();

          sendAIMessage();

        }
      );

    });


  console.log(
    "✓ Praxis AI chatbot loaded successfully"
  );

});
// =========================
// LOGIN MODAL
// =========================

const loginModal = document.getElementById("loginModal");
const loginClose = document.getElementById("loginClose");
const loginOverlay = document.getElementById("loginOverlay");

const socialLogin = document.getElementById("socialLogin");
const emailLogin = document.getElementById("emailLogin");
const emailSwitch = document.getElementById("emailSwitch");

const loginTitle = document.getElementById("loginTitle");
const loginSubtitle = document.getElementById("loginSubtitle");

const googleLogin = document.getElementById("googleLogin");
const appleLogin = document.getElementById("appleLogin");
const emailSubmit = document.getElementById("emailSubmit");

function openLoginModal(type){
  if (!loginModal) return;

  loginModal.classList.add("active");

  socialLogin.style.display = "flex";
  emailLogin.classList.remove("active");

  loginTitle.textContent = "Welcome to PRAXIS";
  loginSubtitle.textContent =
    "Sign in to continue exploring internships.";

  if(type === "email"){
    socialLogin.style.display = "none";
    emailLogin.classList.add("active");

    loginTitle.textContent = "Sign in with Email";
    loginSubtitle.textContent =
      "Enter your details to continue.";
  }
}

function closeLoginModal(){
  if(loginModal){
    loginModal.classList.remove("active");
  }
}

loginClose?.addEventListener("click", closeLoginModal);
loginOverlay?.addEventListener("click", closeLoginModal);

emailSwitch?.addEventListener("click", () => {
  openLoginModal("email");
});

googleLogin?.addEventListener("click", () => {
  showToast("Google sign-in selected");
});

appleLogin?.addEventListener("click", () => {
  showToast("Apple sign-in selected");
});

emailSubmit?.addEventListener("click", () => {

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  if(!email || !password){
    showToast("Please enter email and password");
    return;
  }

  showToast("Login successful!");
  closeLoginModal();
});

document.querySelectorAll("[data-login]").forEach(button => {

  button.addEventListener("click", () => {

    const type = button.dataset.login;

    if(type === "Email"){
      openLoginModal("email");
    }else{
      openLoginModal(type);
    }

  });

});
