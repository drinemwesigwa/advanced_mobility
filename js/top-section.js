function initTopPart() {
	pathsData = [
		{
			id: "path1",
			d: "M 100 80 Q 200 120 350 100 T 550 150",
			status: "active",
			duration: 6,
		},
		{
			id: "path2",
			d: "M 100 200 Q 250 250 450 220",
			status: "active",
			duration: 5,
		},
		{
			id: "path3",
			d: "M 80 320 Q 200 280 400 300 T 550 280",
			status: "active",
			duration: 7,
		},
		// Planned paths can be added dynamically
		{
			id: "path4",
			d: "M 150 150 Q 300 100 500 180",
			status: "planned",
			duration: 6,
		},
		{
			id: "path5",
			d: "M 120 250 Q 280 300 500 250",
			status: "planned",
			duration: 5,
		},
	];

	const svg = document.querySelector(".network-svg");

	if (svg) {
		pathsData.forEach((path) => {
			// Create flight path
			const flightPath = document.createElementNS(
				"http://www.w3.org/2000/svg",
				"path",
			);
			flightPath.setAttribute("id", path.id);
			flightPath.setAttribute("d", path.d);
			flightPath.setAttribute("fill", "none");
			flightPath.classList.add("flight-path", path.status + "-path");
			if (path.status === "planned") flightPath.style.display = "none";
			svg.appendChild(flightPath);

			// Create moving aircraft dot
			const dotGroup = document.createElementNS(
				"http://www.w3.org/2000/svg",
				"g",
			);
			dotGroup.classList.add("aircraft-dot", path.status + "-dot");

			const dot = document.createElementNS(
				"http://www.w3.org/2000/svg",
				"circle",
			);
			dot.setAttribute("r", 6);

			const animateMotion = document.createElementNS(
				"http://www.w3.org/2000/svg",
				"animateMotion",
			);
			animateMotion.setAttribute("dur", path.duration + "s");
			animateMotion.setAttribute("repeatCount", "indefinite");
			const mpath = document.createElementNS(
				"http://www.w3.org/2000/svg",
				"mpath",
			);
			mpath.setAttributeNS(
				"http://www.w3.org/1999/xlink",
				"href",
				"#" + path.id,
			);

			animateMotion.appendChild(mpath);
			dot.appendChild(animateMotion);
			dotGroup.appendChild(dot);
			if (path.status === "planned") dotGroup.style.display = "none";
			svg.appendChild(dotGroup);
		});

		// Toggle button functionality
		document.querySelectorAll(".toggle-btn").forEach((btn) => {
			btn.addEventListener("click", () => {
				document
					.querySelectorAll(".toggle-btn")
					.forEach((b) => b.classList.remove("active"));
				btn.classList.add("active");
				const type = btn.dataset.toggle;

				document
					.querySelectorAll(".flight-path, .aircraft-dot")
					.forEach((el) => {
						if (
							el.classList.contains(type + "-path") ||
							el.classList.contains(type + "-dot")
						) {
							el.style.display = "";
						} else {
							el.style.display = "none";
						}
					});
			});
		});
	}

	const hoverBg = document.querySelector(".hover-bg");
	const cards = document.querySelectorAll(".industry-card");

	cards.forEach((card) => {
		const imgSrc = card.dataset.hoverImg;

		card.addEventListener("mouseenter", () => {
			hoverBg.style.backgroundImage = `url(${imgSrc})`;
			hoverBg.style.opacity = 1;
		});

		card.addEventListener("mouseleave", () => {
			hoverBg.style.opacity = 0;
			hoverBg.style.backgroundImage = "";
		});
	});

	// Domain card background image change on hover - smooth transition
	const domainsSection = document.querySelector(".domains");
	const domainCards = document.querySelectorAll(".domain-card");
	const defaultBgImage = "assets/four-domain.jpg";

	let currentBg = document.querySelector(".domains-bg.current");
	let nextBg = document.querySelector(".domains-bg.next");

	// Preload domain card background images
	function preloadDomainImages() {
		domainCards.forEach((card) => {
			const bgImage = card.getAttribute("data-bg");
			if (bgImage) {
				const img = new Image();
				img.src = bgImage;
			}
		});
		// Also preload default background
		const defaultImg = new Image();
		defaultImg.src = "assets/four-domain.jpg";
	}

	// Preload images immediately
	preloadDomainImages();

	function showSlide(bgImage) {
		// Set the next background image
		nextBg.style.backgroundImage = `url(${bgImage})`;

		// Trigger fade
		nextBg.style.opacity = 1;
		currentBg.style.opacity = 0;

		// Swap references
		[currentBg, nextBg] = [nextBg, currentBg];
	}

	// Hover events
	domainCards.forEach((card) => {
		const bg = card.dataset.bg;

		card.addEventListener("mouseenter", () => {
			if (bg) showSlide(bg);
		});

		card.addEventListener("mouseleave", () => {
			showSlide(defaultBgImage);
		});
	});
}

function initTopProvenTechnology() {
	const cards = document.querySelectorAll(".proven-tech-card");
	const bgLayers = document.querySelectorAll(".proven-tech-bg-layer");
	const slideTitle = document.getElementById("slide-title");
	const slideDesc = document.getElementById("slide-description");

	let currentIndex = 0;

	// NEW: function to update slide text according to current language
	function updateProvenSlideText(index) {
		const card = cards[index];
		const t = translations[currentLang]; // your currentLang from updateLanguage

		const titleKey = card.getAttribute("data-i18n-title");
		const descKey = card.getAttribute("data-i18n-desc");

		if (t[titleKey]) slideTitle.textContent = t[titleKey];
		if (t[descKey]) slideDesc.textContent = t[descKey];
	}

	function setActiveSlide(index) {
		// cards
		cards.forEach((c, i) => c.classList.toggle("active", i === index));

		// background layers
		bgLayers.forEach((bg, i) => bg.classList.toggle("active", i === index));

		// update text using i18n
		updateProvenSlideText(index);
	}

	// auto slide every 5s
	setInterval(() => {
		currentIndex = (currentIndex + 1) % cards.length;
		setActiveSlide(currentIndex);
	}, 5000);

	// click cards
	cards.forEach((card, i) => {
		card.addEventListener("click", () => {
			currentIndex = i;
			setActiveSlide(i);
		});
	});

	// NEW: update slides when language changes
	window.updateProvenTechnologyLanguage = function () {
		const card = cards[currentIndex];
		const t = translations[currentLang];
		const titleKey = card.getAttribute("data-i18n-title");
		const descKey = card.getAttribute("data-i18n-desc");
		if (t[titleKey]) slideTitle.textContent = t[titleKey];
		if (t[descKey]) slideDesc.textContent = t[descKey];
	};

	// Also update immediately in case page was loaded with non-English language
	window.updateProvenTechnologyLanguage();
}

// Mobile menu toggle functionality
document.addEventListener("DOMContentLoaded", () => {
	const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
	const mobileMenuOverlay = document.querySelector(".mobile-menu-overlay");
	const mobileMenuClose = document.querySelector(".mobile-menu-close");

	if (mobileMenuToggle) {
		// Open mobile menu
		mobileMenuToggle.addEventListener("click", () => {
			if (mobileMenuOverlay) {
				mobileMenuOverlay.classList.add("active");
			}
		});

		// Close mobile menu with close button
		if (mobileMenuClose) {
			mobileMenuClose.addEventListener("click", () => {
				if (mobileMenuOverlay) {
					mobileMenuOverlay.classList.remove("active");
				}
			});
		}

		// Close menu when clicking on a link
		document.querySelectorAll(".mobile-nav-link").forEach((link) => {
			link.addEventListener("click", () => {
				if (mobileMenuOverlay) {
					mobileMenuOverlay.classList.remove("active");
				}
			});
		});

		// Close menu when clicking outside
		if (mobileMenuOverlay) {
			mobileMenuOverlay.addEventListener("click", (e) => {
				if (e.target === mobileMenuOverlay) {
					mobileMenuOverlay.classList.remove("active");
				}
			});
		}
	}
});

function initTopLanguage() {
	// Load preferred language
	const savedLang = localStorage.getItem("preferred-language");
	if (savedLang && translations[savedLang]) {
		currentLang = savedLang;
	}

	// Initialize language
	updateLanguage(currentLang);
}
