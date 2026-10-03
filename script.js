const countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"];

const countrySelect = document.getElementById("country");
countries.forEach(country => {
  const option = document.createElement("option");
  option.value = country;
  option.textContent = country;
  countrySelect.appendChild(option);
});

const cards = [...document.querySelectorAll(".intern-card")];
const domainSelect = document.getElementById("domain");
const locationSelect = document.getElementById("location");
const resultCount = document.getElementById("resultCount");
const emptyState = document.getElementById("emptyState");
const toast = document.getElementById("toast");

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
}

function filterCards() {
  const country = countrySelect.value;
  const location = locationSelect.value;
  const domain = domainSelect.value;

  let visible = 0;
  cards.forEach(card => {
    const matchesCountry = country === "all" || card.dataset.country === country;
    const matchesLocation = location === "all" || card.dataset.location === location;
    const matchesDomain = domain === "all" || card.dataset.domain === domain;
    const match = matchesCountry && matchesLocation && matchesDomain;
    card.style.display = match ? "flex" : "none";
    if (match) visible++;
  });

  // The demo contains a small curated set; show a helpful state when filters are too specific.
  emptyState.style.display = visible ? "none" : "block";
  resultCount.textContent = visible
    ? `${visible} curated match${visible === 1 ? "" : "es"}`
    : "No exact matches";
}

document.getElementById("searchBtn").addEventListener("click", () => {
  filterCards();
  document.querySelector(".opportunities").scrollIntoView({behavior:"smooth", block:"start"});
});

document.querySelectorAll(".quick-tags button").forEach(btn => {
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

document.querySelectorAll("[data-login]").forEach(btn => {
  btn.addEventListener("click", () => {
    showToast(`${btn.dataset.login} sign-in is ready to connect to your authentication provider.`);
  });
});

document.getElementById("navLogin").addEventListener("click", () => {
  document.querySelector(".login-card").scrollIntoView({behavior:"smooth", block:"center"});
});

document.querySelectorAll(".save").forEach(save => {
  save.addEventListener("click", () => {
    save.textContent = save.textContent === "♡" ? "♥" : "♡";
    showToast(save.textContent === "♥" ? "Internship saved." : "Removed from saved internships.");
  });
});

document.getElementById("viewAll").addEventListener("click", () => {
  countrySelect.value = "all";
  locationSelect.value = "all";
  domainSelect.value = "all";
  cards.forEach(card => card.style.display = "flex");
  emptyState.style.display = "none";
  resultCount.textContent = "12,480+ opportunities";
  document.querySelector(".opportunities").scrollIntoView({behavior:"smooth"});
});
/* =========================
   PRAXIS AI CHATBOT
========================= */

const aiInput = document.getElementById("aiInput");
const aiSend = document.getElementById("aiSend");
const chatBody = document.getElementById("chatBody");

function addUserMessage(message) {
  const messageDiv = document.createElement("div");
  messageDiv.className = "ai-message user-message";

  messageDiv.innerHTML = `
    <div class="message-bubble user-bubble">
      ${message}
    </div>
  `;

  chatBody.appendChild(messageDiv);
}

function addAIMessage(message) {
  const messageDiv = document.createElement("div");
  messageDiv.className = "ai-message";

  messageDiv.innerHTML = `
    <div class="message-avatar">✦</div>
    <div class="message-bubble">
      ${message}
    </div>
  `;

  chatBody.appendChild(messageDiv);
}

function getAIResponse(message) {

  const text = message.toLowerCase();

  if (text.includes("ai") || text.includes("machine learning")) {
    return "For AI / ML, look for internships involving Python, Machine Learning, Deep Learning, Data Science or Generative AI. I can help you narrow down the right role.";
  }

  if (text.includes("remote") || text.includes("work from home")) {
    return "Sure! You can explore remote internships using the Location filter below. Try selecting <b>Remote</b> or <b>Work from home</b>.";
  }

  if (text.includes("software") || text.includes("developer") || text.includes("coding")) {
    return "For software development, you can explore internships in Web Development, App Development, Software Engineering or Cloud & DevOps.";
  }

  if (text.includes("design") || text.includes("ui") || text.includes("ux")) {
    return "If you're interested in design, check out UI/UX Design and Graphic Design internships. A portfolio can be especially useful for these roles.";
  }

  if (text.includes("domain") || text.includes("career")) {
    return "Think about what you enjoy: coding → Software/AI, analysing data → Data Science, creativity → UI/UX, security → Cybersecurity, or business → Product/Strategy.";
  }

  if (text.includes("hello") || text.includes("hi") || text.includes("hey")) {
    return "Hey! 👋 I'm Praxis AI. Tell me your skills, preferred domain or location and I'll help you explore internships.";
  }

  return "I can help you explore internships based on your skills, domain and location. Try asking something like <b>“Find AI internships”</b> or <b>“I want a remote software internship”</b>.";
}

function sendAIMessage() {

  const message = aiInput.value.trim();

  if (!message) return;

  addUserMessage(message);

  aiInput.value = "";

  setTimeout(() => {
    const response = getAIResponse(message);
    addAIMessage(response);

    chatBody.scrollTop = chatBody.scrollHeight;
  }, 500);

  chatBody.scrollTop = chatBody.scrollHeight;
}

aiSend.addEventListener("click", sendAIMessage);

aiInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    sendAIMessage();
  }
});


/* Quick suggestion buttons */

document.querySelectorAll(".ai-suggestions button").forEach(button => {

  button.addEventListener("click", () => {

    aiInput.value = button.textContent;

    sendAIMessage();

  });

});
