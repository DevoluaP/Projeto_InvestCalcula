function showNotification(message, type = "info") {
  const existingNotification = document.querySelector(".custom-notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  const notification = document.createElement("div");
  notification.className = `custom-notification ${type}`;

  let icon = "";
  if (type === "error") {
    icon = "⚠️";
  } else if (type === "success") {
    icon = "✓";
  } else {
    icon = "ℹ️";
  }

  notification.innerHTML = `
    <div class="notification-content">
        <span class="notification-icon">${icon}</span>
        <span class="notification-message">${message}</span>
    </div>
  `;

  document.body.appendChild(notification);

  notification.offsetHeight;

  setTimeout(() => {
    notification.classList.add("show");
  }, 10);

  setTimeout(() => {
    notification.classList.remove("show");
    notification.classList.add("hide");

    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

function formatCurrency(input) {
  let value = input.value.replace(/\D/g, "");
  value = (value / 100).toFixed(2);
  value = value.replace(".", ",");
  value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  input.value = "R$ " + value;
  return parseFloat(value.replace(/\./g, "").replace(",", "."));
}

function formatPercentage(input) {
  let value = input.value.replace(/\D/g, "");
  if (value === "") {
    input.value = "";
    return 0;
  }
  value = (value / 100).toFixed(2);
  value = value.replace(".", ",");
  input.value = value + "%";
  return parseFloat(value.replace(",", "."));
}

function getCurrencyValue(formattedValue) {
  if (!formattedValue || formattedValue === "R$ 0,00") return 0;
  return parseFloat(
    formattedValue
      .replace("R$", "")
      .replace(/\./g, "")
      .replace(",", ".")
      .trim(),
  );
}

function getPercentageValue(formattedValue) {
  if (!formattedValue || formattedValue === "0,00%" || formattedValue === "%")
    return 0;
  return parseFloat(formattedValue.replace("%", "").replace(",", ".").trim());
}

const initConInput = document.getElementById("initCon");
const montConInput = document.getElementById("montCon");
const intRateInput = document.getElementById("intRate");

initConInput.addEventListener("input", function (e) {
  formatCurrency(this);
});

montConInput.addEventListener("input", function (e) {
  formatCurrency(this);
});

intRateInput.addEventListener("input", function (e) {
  formatPercentage(this);
});

initConInput.placeholder = "R$ 0,00";
montConInput.placeholder = "R$ 0,00";
intRateInput.placeholder = "0,00%";

initConInput.type = "text";
montConInput.type = "text";
intRateInput.type = "text";

document.addEventListener("DOMContentLoaded", function () {
  adjustMenu();
  window.addEventListener("resize", adjustMenu);
});

function adjustMenu() {
  const menu = document.querySelector(".menu");
  const btnMenu = document.querySelector(".btnMenu");
  const btnClose = document.querySelector(".btnClose");

  if (window.innerWidth >= 768) {
    menu.style.display = "flex";
    btnMenu.style.display = "none";
    btnClose.style.display = "none";
  } else {
    menu.style.display = "none";
    btnMenu.style.display = "inline";
    btnClose.style.display = "none";
  }
}

document.querySelector(".btnMenu").addEventListener("click", function () {
  document.querySelector(".btnMenu").style.display = "none";
  document.querySelector(".btnClose").style.display = "inline";
  const menu = document.querySelector(".menu");

  menu.style.display = "flex";
  menu.classList.remove("fadeOut");
  menu.classList.add("show");
});

document.querySelector(".btnClose").addEventListener("click", function () {
  closeMenu();
});

function closeMenu() {
  const menu = document.querySelector(".menu");
  const btnMenu = document.querySelector(".btnMenu");
  const btnClose = document.querySelector(".btnClose");

  menu.classList.remove("show");
  menu.classList.add("fadeOut");
  btnClose.style.display = "none";
  btnMenu.style.display = "inline";

  setTimeout(() => {
    menu.classList.remove("fadeOut");
    menu.style.display = "none";
  }, 300);
}

document.querySelectorAll(".menu a").forEach((link) => {
  link.addEventListener("click", function () {
    if (window.innerWidth < 768) {
      closeMenu();
    }
  });
});

function calculateCompoundInterest() {
  const initCon = getCurrencyValue(initConInput.value) || 0;
  const montCon = getCurrencyValue(montConInput.value) || 0;
  const yldTime = parseInt(document.getElementById("yldTime").value) || 0;
  const intRate = getPercentageValue(intRateInput.value) || 0;
  const yldTimeValue = document.getElementById("yldTimeValue").value;
  const intRateValue = document.getElementById("intRateValue").value;

  if (yldTime <= 0) {
    showNotification("Por favor, insira um tempo de rendimento válido!");
    return false;
  }

  if (intRate <= 0) {
    showNotification("Por favor, insira uma taxa de juros válida!");
    return false;
  }

  if (initCon === 0 && montCon === 0) {
    showNotification("Por favor, insira um valor inicial ou mensal!");
    return false;
  }

  let compInt = 0;
  let totalCompInt = 0;
  let invest = initCon;
  let totalInvest = 0;
  let valTotal = 0;
  let calendar = "";
  let per = "";
  let totalMonths = 0;

  if (yldTimeValue === "years") {
    totalMonths = yldTime * 12;
    calendar = yldTime === 1 ? "Ano" : "Anos";
  } else {
    totalMonths = yldTime;
    calendar = yldTime === 1 ? "Mês" : "Meses";
  }

  let monthlyRate = 0;
  if (intRateValue === "yearly") {
    monthlyRate = (Math.pow(1 + intRate / 100, 1 / 12) - 1) * 100;
    per = "a.a";
  } else {
    monthlyRate = intRate;
    per = "a.m";
  }

  totalInvest = initCon + montCon * totalMonths;

  invest = initCon + montCon;

  for (let i = 0; i < totalMonths - 1; i++) {
    compInt = (invest * monthlyRate) / 100;
    totalCompInt += compInt;
    invest += compInt + montCon;
  }

  compInt = (invest * monthlyRate) / 100;
  totalCompInt += compInt;

  valTotal = totalInvest + totalCompInt;

  updateResultValues(
    initCon,
    montCon,
    yldTime,
    intRate,
    totalInvest,
    totalCompInt,
    valTotal,
    calendar,
    per,
  );

  generateChart(initCon, totalCompInt, totalInvest);

  return true;
}

function updateResultValues(
  initCon,
  montCon,
  yldTime,
  intRate,
  totalInvest,
  totalCompInt,
  valTotal,
  calendar,
  per,
) {
  document.querySelector(".resultValInit").textContent = initCon.toLocaleString(
    "pt-BR",
    { style: "currency", currency: "BRL" },
  );

  document.querySelector(".resultValMont").textContent = montCon.toLocaleString(
    "pt-BR",
    { style: "currency", currency: "BRL" },
  );

  document.querySelector(".resultValYldTime").textContent =
    `${yldTime} ${calendar}`;

  document.querySelector(".resultValIntRate").textContent =
    `${intRate.toFixed(2).replace(".", ",")}% ${per}`;

  document.querySelector(".resultValTotalInvest").textContent =
    totalInvest.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  document.querySelector(".resultValRate").textContent =
    totalCompInt.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  document.querySelector(".resultValTotal").textContent =
    valTotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

let chartInstance = null;

function generateChart(initCon, totalCompInt, totalInvest) {
  const pieChart = document.getElementById("pieChart");

  if (chartInstance) {
    chartInstance.destroy();
  }

  const valorInicial = initCon;
  const valorJuros = totalCompInt;
  const valorAportes = totalInvest - initCon;

  chartInstance = new Chart(pieChart, {
    type: "pie",
    data: {
      labels: ["Valor Inicial", "Aportes Mensais", "Juros"],
      datasets: [
        {
          data: [valorInicial, valorAportes, valorJuros],
          backgroundColor: ["#222831", "#31363F", "#76ABAE"],
          borderColor: "#EEEEEE",
          borderWidth: 2,
          hoverOffset: 10,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            font: {
              size: 14,
              family: "'Chivo Mono', monospace",
            },
            padding: 15,
            color: "#31363F",
          },
        },
        tooltip: {
          backgroundColor: "#222831",
          titleColor: "#EEEEEE",
          bodyColor: "#EEEEEE",
          borderColor: "#76ABAE",
          borderWidth: 1,
          padding: 12,
          displayColors: true,
          callbacks: {
            label: function (context) {
              const label = context.label || "";
              const value = context.parsed || 0;
              const formatted = value.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              });

              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = ((value / total) * 100).toFixed(1);

              return `${label}: ${formatted} (${percentage}%)`;
            },
          },
        },
      },
      animation: {
        animateRotate: true,
        animateScale: true,
        duration: 1000,
        easing: "easeInOutQuart",
      },
    },
  });
}

function openResult() {
  const success = calculateCompoundInterest();

  if (success) {
    const resultContainer = document.getElementById("resultContainer");
    resultContainer.style.display = 'flex';
    resultContainer.classList.remove('fadeOut');
    resultContainer.classList.add("show");
    document.body.style.overflow = "hidden";

    document.getElementById("result").scrollTop = 0;
  }
}

function closeResult() {
  const resultContainer = document.getElementById("resultContainer");

  resultContainer.style.opacity = '0';
  
  setTimeout(() => {
    resultContainer.classList.remove("show");
    resultContainer.style.display = 'none';
    resultContainer.style.opacity = '1';
    document.body.style.overflow = "visible";

    if (chartInstance) {
      chartInstance.destroy();
      chartInstance = null;
    }
  }, 600);
}

document.getElementById("compute").addEventListener("click", function (e) {
  e.preventDefault();
  openResult();
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    const activeElement = document.activeElement;
    if (
      activeElement && (
        activeElement.id === "initCon" ||
        activeElement.id === "montCon" ||
        activeElement.id === "yldTime" ||
        activeElement.id === "intRate"
      )
    ) {
      event.preventDefault();
      openResult();
    }
  }
});

document.querySelector(".newCalc").addEventListener("click", function (e) {
  e.preventDefault();
  closeResult();
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    const resultContainer = document.getElementById("resultContainer");
    if (resultContainer && resultContainer.classList.contains("show")) {
      closeResult();
    }
  }
});

document
  .getElementById("resultContainer")
  .addEventListener("click", function (e) {
    if (e.target === this) {
      closeResult();
    }
  });

document.getElementById("yldTime").addEventListener("input", function () {
  let value = parseInt(this.value);
  if (value < 1) {
    this.value = "";
  }
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("#intro, #calc, #about");
  sections.forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(20px)";
    section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(section);
  });
});
