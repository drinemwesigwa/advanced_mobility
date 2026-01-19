// Load language preference FIRST before anything else
let currentLang = localStorage.getItem("preferred-language") || "en";
// Apply language immediately to HTML element
document.documentElement.lang = currentLang;
document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr";
document.body.classList.toggle("rtl", currentLang === "ar");

fetch("partials/top.html")
	.then((res) => res.text())
	.then((data) => {
		document.getElementById("top-section").innerHTML = data;
	})
	.catch((err) => console.error("Failed to load top.html:", err));

let bottomLoaded = false,
	topLoaded = false;

const translations = {
	en: {
		about: "About MLG",
		solutions: "Solutions",
		products: "Products & Platforms",
		industries: "Industries",
		newsroom: "Newsroom",
		partner: "Partner With Us",
		explore: "Explore the Network",
		title: "Architecting the Sky. Enabling the Future.",
		hero_desc:
			"The infrastructure behind advanced air mobility. Sovereign mobility capability at regional scale.",
		network_title: "The Operating Network",
		network_subtitle: "Corridors, vertiports, and coverage across the region.",
		estimator_title: "Coverage Estimator",
		origin: "Origin",
		destination: "Destination",
		calculate: "Calculate Route",
		proven_title: "Proven Technology",
		proven_subtitle:
			"Enterprise-grade autonomous systems built for reliability",
		ready_title: "Ready to Transform Your Operations?",
		ready_subtitle:
			"Get started with a customized demo and see how autonomous cargo delivery can revolutionize your business.",
		subsidiaries: "Subsidiaries",
		audience: "Audience",
		legal: "Legal & Compliance",
		nav_ourStory: "Our Story",
		nav_oneEcosystem: "One Ecosystem",
		nav_infrastructure: "Infrastructure",
		nav_capabilities: "Capabilities",

		search_placeholder: "Search",
		partner_portal: "Partner Portal",
		lang_short: "EN",

		hero_btn_partner: "Partner With Us",
		hero_btn_explore: "Explore the Network",

		trusted_by: "Trusted by:",

		story_title: "OUR STORY",
		story_subtitle: "Pioneering the Future of Air Mobility",

		story_paragraph_1:
			"Advanced Mobility Hub was established to build the region's sovereign advanced air mobility infrastructure. Operating across civil logistics, defense, infrastructure, and digital airspace management, AMH integrates global OEM partnerships with local operational capability.",

		story_paragraph_2:
			"Today, we operate a multi-OEM fleet across planned vertiport networks, working in close alignment with GCAA to define the regulatory pathway for autonomous aerial operations in the region.",

		stat_founded: "Founded",
		stat_cities: "Cities Served",
		stat_deliveries: "Deliveries",

		story_cta: "Read Our Full Story →",

		// Form Validation Messages
		industry_required: "Please select an industry",
		email_required: "Email is required",
		email_invalid: "Please enter a valid email",
		use_case_required: "Please describe your use case",
		select_industry_error: "Please select an industry",
		enter_email_error: "Please enter your email",
		valid_email_error: "Please enter a valid email address",
		describe_use_case_error: "Please describe your use case",
		thank_you_success: "Thank you! Our team will contact you shortly.",
		something_went_wrong_error: "Something went wrong. Please try again later.",
		enter_origin_destination_error: "Please enter both origin and destination.",

		// Domains Section
		domains_title: "Four Domains. One Ecosystem.",
		domains_subtitle:
			"Civil Mobility, Defense, Infrastructure, and Digital Airspace — Integrated.",
		domain_civil_alt: "Civil Mobility",
		domain_civil_desc:
			"Civil logistics and passenger mobility solutions for urban and regional transportation networks.",
		domain_defense_alt: "Defense",
		domain_defense_desc:
			"Sovereign surveillance and security capabilities for defense and public safety operations.",
		domain_infra_alt: "Infrastructure",
		domain_infra_desc:
			"Physical infrastructure and landing ports providing the foundation for advanced air mobility.",
		domain_digital_alt: "Digital Airspace",
		domain_digital_desc:
			"Digital backbone and UTM systems enabling seamless integration and traffic management.",
		domains_btn_view: "View Capabilities",
		domains_btn_contact: "Contact Our Team",

		//Network Section
		network_title: "The Operating Network",
		network_subtitle: "Corridors, vertiports, and coverage across the region.",
		network_subsidiary_label: "Subsidiary",
		network_status_label: "Status",
		network_aircraft_label: "Aircraft Type",
		status_active: "Active",
		status_in_dev: "In Development",
		status_planned: "Planned",
		estimator_title: "Coverage Estimator",
		estimator_origin_label: "Origin",
		estimator_destination_label: "Destination",
		origin_placeholder: "Enter Location",
		destination_placeholder: "Enter Location",
		btn_calculate: "Calculate Route",
		vertiport_icon: "Vertiport Icon",
		label_nearest_vertiport: "Nearest Vertiport:",
		value_vertiport_name: "Downtown Hub",
		aircraft_icon: "Aircraft Icon",
		label_compatible_aircraft: "Compatible Aircraft:",
		value_aircraft_name: "EHang EH216-S",

		//national value
		national_value_title: "National Value. Regional Scale.",
		national_value_subtitle:
			"Contributing to Industrial Capability, Workforce, and Sustainability.",

		industry_agriculture_alt: "Agriculture",
		industry_agriculture_title: "Agriculture",
		industry_agriculture_desc:
			"Precision crop monitoring and automated pesticide delivery",

		industry_construction_alt: "Construction",
		industry_construction_title: "Construction",
		industry_construction_desc:
			"Material transport to remote and elevated locations",

		industry_security_alt: "Security",
		industry_security_title: "Security",
		industry_security_desc:
			"Perimeter monitoring and emergency response delivery",

		industry_medical_alt: "Medical",
		industry_medical_title: "Medical",
		industry_medical_desc: "Emergency medical supply delivery to remote areas",

		//proven technology
		proven_title: "Proven Technology",
		proven_subtitle:
			"Enterprise-grade autonomous systems built for reliability",

		proven_slide1_title: "Regulatory-Ready Operations",
		proven_slide1_desc:
			"Our fleet operates under active GCAA Type Certificate pathways, with aircraft from certified global OEMs. We maintain full compliance with CAR-UAS regulations and participate in regulatory sandbox programs shaping the region's AAM framework.",

		proven_slide2_title: "Economics That Scale",
		proven_slide2_desc:
			"Multi-OEM fleet strategy reduces vendor lock-in and enables mission-optimized aircraft selection. Integrated infrastructure vertiports, UTM, MRO drives operational efficiency, delivering 40-60% cost reduction versus traditional aviation alternatives.",
		proven_slide3_title: "Operational Today",
		proven_slide3_desc:
			"Not a concept. Not a prototype. AMH aircraft are flying missions now — with 2,400+ logged flight hours, 8 planned vertiports, and 200km of approved air corridors. Infrastructure and operations ready for enterprise and government deployment.",

		proven_card1_img_alt: "Certified",
		proven_card1_label: "CERTIFIED",
		proven_card2_img_alt: "Commercial Feasibility",
		proven_card2_label: "COMMERCIAL\nFEASIBILITY",
		proven_card3_img_alt: "Deployable",
		proven_card3_label: "DEPLOYABLE",

		hero_title: "Architecting the Sky.",
		hero_subtitle: "Enabling the Future.",
		hero_title2: "Advanced Air Mobility",
		hero_subtitle2: "The Infrastructure Behind",
		hero_title3: "Mobility Ecosystem",
		hero_subtitle3: "The Region's Integrated",
		trusted_by: "Trusted by:",

		// Footer translations
		footer_description:
			"Advanced Air Mobility Holdings operates as the sovereign infrastructure provider for next-generation aerial transportation across the region.",
		footer_copyright:
			"&copy; 2026 Advanced Air Mobility Holdings. All rights reserved.",

		// CTA Section
		choose_industry: "Choose industry...",
		email_placeholder: "Enter your email",
		use_case_placeholder: "Describe your use case...",
		schedule_demo: "Schedule Demo Call",

		// Fleet Explorer
		operational_telemetry: "Operational Telemetry",
		telemetry_desc:
			"Real-time performance metrics and operational status monitoring",

		// Aircraft specs labels
		curb_weight: "Curb weight",
		speed: "Speed",
		endurance: "Endurance",
		max_takeoff_weight: "Maximum Take off Weight",
		flight_time: "Flight Time",
		payload: "Payload",
		max_flight_altitude: "Max Flight Altitude",
		range: "Range",
		passengers: "Passengers",
		seats: "Seats",
		full_specifications: "Full Specifications",
		form_error_required: "Error",

		// Partners section
		partners_subtitle:
			"Multi-OEM fleet. Technology partnerships. Regulatory alignment.",
		partners_title: "Built With Global Leaders",
		become_partner: "Become a Partner",
		partnership_overview: "Partnership Overview",

		// Stats section
		aircraft_partners: "Aircraft Across 3 OEM<br />Partners",

		vertiports_corridor: "Vertiports Planned<br />200km corridor",

		gcaa_certificate: "GCAA Type Certificate<br />Pathway Active",

		flight_hours_logged: "Flight Hours<br />Logged",

		technology_partners: "Technology Integration<br />Partners",

		// Fleet Explorer header
		fleet_explorer_title: "Fleet Explorer",
		fleet_explorer_desc:
			"Explore operational capabilities across our aerial mobility fleet",

		// Specs labels (shared across aircraft)
		curb_weight: "Curb Weight",
		speed: "Speed",
		endurance: "Endurance",
		max_takeoff_weight: "Maximum Take Off Weight",
		flight_time: "Flight Time",
		payload: "Payload",
		range: "Range",
		max_flight_altitude: "Max Flight Altitude",
		passengers: "Passengers",
		seats: "Seats",

		// Telemetry
		operational_telemetry: "Operational Telemetry",
		telemetry_desc:
			"Real-time performance metrics and operational status monitoring",

		// CTA
		full_specifications: "Full Specifications",

		// Shaping section
		shaping_title: "Shaping the Future <br />of Air Mobility",

		shaping_desc:
			"From concept to commercial impact, we enable air mobility ventures to lead their markets.",

		shaping_cta_link: "Got a project in mind?",

		// CTA section
		ready_title: "Ready to Transition to Autonomous Operations?",

		choose_industry: "Choose industry...",

		agriculture: "Agriculture",
		construction: "Construction",
		logistics: "Logistics",
		healthcare: "Healthcare",
		security: "Security",
		other: "Other",

		email_placeholder: "Enter your email",
		use_case_placeholder: "Tell us about your use case...",

		schedule_demo: "Schedule Demo Call",
	},
	ar: arTranslations,
};

// Language switching functionality
function updateLanguage(lang) {
	currentLang = lang;
	const t = translations[lang];
	document.documentElement.lang = lang;
	document.body.classList.toggle("rtl", lang === "ar");
	document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

	// Update all elements with data-i18n attributes
	document.querySelectorAll("[data-i18n]").forEach((el) => {
		const key = el.getAttribute("data-i18n");
		if (t[key]) {
			if (el.tagName === "INPUT" && el.type === "submit") {
				el.value = t[key];
			} else if (el.classList.contains("lang-text")) {
				// Update language button text
				el.textContent = t[key];
			} else {
				el.textContent = t[key];
			}
			if (t[key].includes("<br")) {
				el.innerHTML = t[key];
			} else {
				el.textContent = t[key];
			}
		}
	});

	// Update placeholders
	document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
		const key = el.getAttribute("data-i18n-placeholder");
		if (t[key]) {
			el.placeholder = t[key];
		}
	});

	// Update language button - show the language you can SWITCH TO
	const langBtn = document.getElementById("lang-toggle");
	if (langBtn) {
		langBtn.textContent = lang === "en" ? "AR" : "EN";
	}

	// Update mobile language button
	const mobileLangBtn = document.getElementById("mobile-lang-toggle");
	if (mobileLangBtn) {
		const langText = mobileLangBtn.querySelector(".lang-text");
		if (langText) {
			langText.textContent = lang === "en" ? "AR" : "EN";
		} else {
			mobileLangBtn.textContent = lang === "en" ? "AR" : "EN";
		}
	}

	// Store language preference
	localStorage.setItem("preferred-language", lang);

	// Call registered language update callbacks for dynamic content
	if (window.updateHeroLanguage) {
		window.updateHeroLanguage();
	}
	if (window.updateProvenTechnologyLanguage) {
		window.updateProvenTechnologyLanguage();
	}
}

// Mobile menu functionality
function initMobileMenu() {
	const menuToggle = document.querySelector(".mobile-menu-toggle");
	const menuOverlay = document.querySelector(".mobile-menu-overlay");
	const menuClose = document.querySelector(".mobile-menu-close");

	if (menuToggle && menuOverlay) {
		menuToggle.addEventListener("click", () => {
			menuOverlay.classList.add("active");
			document.body.style.overflow = "hidden";
		});

		menuClose.addEventListener("click", closeMobileMenu);
		menuOverlay.addEventListener("click", (e) => {
			if (e.target === menuOverlay) {
				closeMobileMenu();
			}
		});
	}
}

function closeMobileMenu() {
	const menuOverlay = document.querySelector(".mobile-menu-overlay");
	if (menuOverlay) {
		menuOverlay.classList.remove("active");
		document.body.style.overflow = "";
	}
}

// Fleet Explorer tab functionality
function initFleetTabs() {
	const tabButtons = document.querySelectorAll(".tab-button");
	const tabContents = document.querySelectorAll(".tab-content");

	tabButtons.forEach((button) => {
		button.addEventListener("click", () => {
			// Remove active class from all buttons and contents
			tabButtons.forEach((btn) => btn.classList.remove("active"));
			tabContents.forEach((content) => content.classList.remove("active"));

			// Add active class to clicked button
			button.classList.add("active");

			// Show corresponding content
			const tabId = button.getAttribute("data-tab");
			const targetContent = document.getElementById(tabId);
			if (targetContent) {
				targetContent.classList.add("active");
			}
		});
	});
}

// Scroll animations
function initScrollAnimations() {
	const observerOptions = {
		threshold: 0.1,
		rootMargin: "0px 0px -50px 0px",
	};

	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add("active");
			}
		});
	}, observerOptions);

	// Add reveal class to elements that should animate
	const revealElements = document.querySelectorAll(
		".domain-card, .stat-item, .info-card, .proven-text, .cta-content, .application-card, .partners-content, .fleet-content",
	);
	revealElements.forEach((el) => {
		el.classList.add("reveal");
		observer.observe(el);
	});
}

// Header scroll effect
function initHeaderScroll() {
	const header = document.getElementById("header");
	let lastScrollY = window.scrollY;

	function updateHeader() {
		const currentScrollY = window.scrollY;

		if (currentScrollY > 50) {
			header.classList.add("scrolled");
		} else {
			header.classList.remove("scrolled");
		}

		lastScrollY = currentScrollY;
	}

	window.addEventListener("scroll", updateHeader, { passive: true });
	updateHeader();
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
	document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
		anchor.addEventListener("click", function (e) {
			e.preventDefault();
			const target = document.querySelector(this.getAttribute("href"));
			if (target) {
				target.scrollIntoView({
					behavior: "smooth",
					block: "start",
				});
				// Close mobile menu if open
				closeMobileMenu();
			}
		});
	});
}

// Form handling for coverage estimator
function initEstimatorForm() {
	const form = document.querySelector(".estimator-form");
	if (form) {
		form.addEventListener("submit", (e) => {
			e.preventDefault();
			const origin = form.querySelector('input[placeholder*="origin"]').value;
			const destination = form.querySelector(
				'input[placeholder*="destination"]',
			).value;

			if (origin && destination) {
				// Simulate calculation
				alert(
					`Calculating route from ${origin} to ${destination}...\n\nThis is a demo. In a real application, this would connect to a routing API.`,
				);
			} else {
				showAlert(
					translations[currentLang].enter_origin_destination_error,
					"error",
				);
			}
		});
	}
}

// ROI Calculator functionality
function initROICalculator() {
	const missionFrequencySlider = document.getElementById("mission-frequency");
	const distanceSlider = document.getElementById("average-distance");
	const missionValueDisplay = document.getElementById("mission-value");
	const distanceValueDisplay = document.getElementById("distance-value");
	const annualSavingsDisplay = document.getElementById("annual-savings");

	if (
		missionFrequencySlider &&
		distanceSlider &&
		missionValueDisplay &&
		distanceValueDisplay &&
		annualSavingsDisplay
	) {
		// Function to calculate annual savings
		function calculateSavings(missions, distance) {
			// Simplified calculation: base savings of $2000 per mission, adjusted by distance factor
			const baseSavingsPerMission = 2000;
			const distanceMultiplier = Math.max(0.5, Math.min(2, distance / 15)); // Normalize around 15km
			const savingsPerMission = baseSavingsPerMission * distanceMultiplier;
			return Math.round(missions * 12 * savingsPerMission); // Annual (12 months)
		}

		// Function to update displays
		function updateCalculator() {
			const missions = parseInt(missionFrequencySlider.value);
			const distance = parseInt(distanceSlider.value);

			missionValueDisplay.textContent = missions.toString();
			distanceValueDisplay.textContent = distance.toString() + " km";

			const savings = calculateSavings(missions, distance);
			annualSavingsDisplay.textContent = "$" + savings.toLocaleString();
		}

		// Add event listeners
		missionFrequencySlider.addEventListener("input", updateCalculator);
		distanceSlider.addEventListener("input", updateCalculator);

		// Initialize with default values
		updateCalculator();
	}
}

// Optimize video loading - ensure videos play properly
function initVideoAutoplay() {
	const videos = document.querySelectorAll("video");
	videos.forEach((video) => {
		// Set preload to metadata for faster play initiation
		if (!video.preload) {
			video.preload = "metadata";
		}

		// Try to play video
		const playPromise = video.play();
		if (playPromise !== undefined) {
			playPromise.catch(() => {
				// Autoplay failed, set up intersection observer
				if ("IntersectionObserver" in window) {
					const videoObserver = new IntersectionObserver(
						(entries) => {
							entries.forEach((entry) => {
								if (entry.isIntersecting) {
									entry.target.play().catch(() => {
										// Play failed silently
									});
								} else {
									entry.target.pause();
								}
							});
						},
						{ threshold: 0.25 },
					);
					videoObserver.observe(video);
				}
			});
		}
	});
}

// Keyboard navigation
function initKeyboardNavigation() {
	document.addEventListener("keydown", (e) => {
		debugger;
		// Close mobile menu with Escape key
		if (e.key === "Escape") {
			closeMobileMenu();
		}

		// Language switching with Ctrl+L
		if (e.ctrlKey && e.key === "l") {
			e.preventDefault();
			updateLanguage(currentLang === "en" ? "en" : "ar");
		}
	});
}

// Performance optimization
function initPerformanceOptimizations() {
	// Debounce scroll events
	let scrollTimeout;
	const debouncedScroll = () => {
		clearTimeout(scrollTimeout);
		scrollTimeout = setTimeout(() => {
			// Any scroll-dependent logic here
		}, 16);
	};

	window.addEventListener("scroll", debouncedScroll, { passive: true });

	// Preload critical resources
	const preloadLink = document.createElement("link");
	preloadLink.rel = "preload";
	preloadLink.href = "css/style.css";
	preloadLink.as = "style";
	document.head.appendChild(preloadLink);
}

// Accessibility improvements
function initAccessibility() {
	// Add ARIA labels where needed
	const langBtn = document.getElementById("lang-toggle");
	if (langBtn) {
		langBtn.setAttribute("aria-label", "Switch language");
	}

	// Ensure all buttons have proper labels
	document.querySelectorAll("button:not([aria-label])").forEach((btn) => {
		if (!btn.textContent.trim()) {
			btn.setAttribute("aria-label", "Button");
		}
	});

	// Focus management for mobile menu
	const mobileMenu = document.querySelector(".mobile-menu");
	if (mobileMenu) {
		const focusableElements = mobileMenu.querySelectorAll(
			"a, button, input, select, textarea",
		);
		const firstFocusable = focusableElements[0];
		const lastFocusable = focusableElements[focusableElements.length - 1];

		document.addEventListener("keydown", (e) => {
			if (mobileMenu.classList.contains("active")) {
				if (e.key === "Tab") {
					if (e.shiftKey) {
						if (document.activeElement === firstFocusable) {
							e.preventDefault();
							lastFocusable.focus();
						}
					} else {
						if (document.activeElement === lastFocusable) {
							e.preventDefault();
							firstFocusable.focus();
						}
					}
				}
			}
		});
	}
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
	// Load preferred language
	const savedLang = localStorage.getItem("preferred-language");
	if (savedLang && translations[savedLang]) {
		currentLang = savedLang;
	}

	// Initialize language
	updateLanguage(currentLang);

	// Initialize all features
	initMobileMenu();
	initScrollAnimations();
	initHeaderScroll();
	initSmoothScrolling();
	initEstimatorForm();
	initROICalculator();
	initVideoAutoplay();
	initKeyboardNavigation();
	initPerformanceOptimizations();
	initAccessibility();

	// Language toggle event
	const langToggle = document.getElementById("lang-toggle");
	if (langToggle) {
		langToggle.addEventListener("click", () => {
			updateLanguage(currentLang === "en" ? "ar" : "en");
		});
	}

	// Mobile language toggle event
	const mobileLangToggle = document.getElementById("mobile-lang-toggle");
	if (mobileLangToggle) {
		mobileLangToggle.addEventListener("click", () => {
			updateLanguage(currentLang === "en" ? "ar" : "en");
		});
	}

	// Add loading class removal for smooth transitions
	document.body.classList.add("loaded");

	// Log initialization for debugging
	console.log("AirMobility website initialized successfully");
});

// Handle browser back/forward buttons
window.addEventListener("popstate", () => {
	closeMobileMenu();
});

// Service worker registration (for PWA capabilities)
if ("serviceWorker" in navigator) {
	window.addEventListener("load", () => {
		// Note: Service worker would be implemented separately
		// navigator.serviceWorker.register('/sw.js');
	});
}

// Network Section Toggle Functionality
document.addEventListener("DOMContentLoaded", () => {
	const toggleButtons = document.querySelectorAll(".toggle-btn");
	const activePaths = document.querySelectorAll(".active-path");
	const plannedPaths = document.querySelectorAll(".planned-path");
	const activeDots = document.querySelectorAll(".active-dot");
	const plannedDots = document.querySelectorAll(".planned-dot");

	toggleButtons.forEach((button) => {
		button.addEventListener("click", () => {
			const toggleType = button.getAttribute("data-toggle");

			// Update active button state
			toggleButtons.forEach((btn) => btn.classList.remove("active"));
			button.classList.add("active");

			// Update paths visibility
			if (toggleType === "active") {
				activePaths.forEach((path) => (path.style.display = "block"));
				plannedPaths.forEach((path) => (path.style.display = "none"));
				activeDots.forEach((dot) => (dot.style.display = "block"));
				plannedDots.forEach((dot) => (dot.style.display = "none"));
			} else {
				activePaths.forEach((path) => (path.style.display = "none"));
				plannedPaths.forEach((path) => (path.style.display = "block"));
				activeDots.forEach((dot) => (dot.style.display = "none"));
				plannedDots.forEach((dot) => (dot.style.display = "block"));
			}
		});
	});

	// Calculate Route button interaction
	const calculateBtn = document.querySelector(".btn-calculate");
	if (calculateBtn) {
		calculateBtn.addEventListener("click", (e) => {
			e.preventDefault();
			const origin = document.querySelector(
				'.estimator-form input[placeholder*="location"]:first-of-type',
			).value;
			const destination = document.querySelector(
				'.estimator-form input[placeholder*="location"]:last-of-type',
			).value;

			if (origin && destination) {
				// Visual feedback
				calculateBtn.textContent = "Route Calculated!";
				calculateBtn.style.opacity = "0.8";
				setTimeout(() => {
					calculateBtn.textContent = "Calculate Route";
					calculateBtn.style.opacity = "1";
				}, 2000);
			}
		});
	}
});

// ROI Calculator Functionality
document.addEventListener("DOMContentLoaded", () => {
	const missionFrequencySlider = document.getElementById("mission-frequency");
	const averageDistanceSlider = document.getElementById("average-distance");
	const missionValue = document.getElementById("mission-value");
	const distanceValue = document.getElementById("distance-value");
	const annualSavings = document.getElementById("annual-savings");

	if (missionFrequencySlider && averageDistanceSlider) {
		function calculateSavings() {
			const missions = parseInt(missionFrequencySlider.value) || 1;
			const distance = parseInt(averageDistanceSlider.value) || 1;

			// Calculate savings: base cost per km is $15, annual is 12 months
			const costPerMission = distance * 15; // $15 per km
			const monthlyTotal = missions * costPerMission;
			const annualTotal = monthlyTotal * 12;

			// Display with proper formatting
			annualSavings.textContent = "$" + annualTotal.toLocaleString();
		}

		// Update mission frequency display
		missionFrequencySlider.addEventListener("input", () => {
			missionValue.textContent = missionFrequencySlider.value;
			calculateSavings();
		});

		// Update distance display
		averageDistanceSlider.addEventListener("input", () => {
			distanceValue.textContent = averageDistanceSlider.value + " km";
			calculateSavings();
		});

		// Initial calculation
		calculateSavings();
	}
});

// Fallback industry options if API fails
const FALLBACK_INDUSTRIES = [
	{ id: "agriculture", name: "Agriculture" },
	{ id: "construction", name: "Construction" },
	{ id: "logistics", name: "Logistics" },
	{ id: "healthcare", name: "Healthcare" },
	{ id: "security", name: "Security" },
	{ id: "other", name: "Other" },
];

// Dynamic CTA Form Handler
async function initCTAForm() {
	const industrySelect = document.getElementById("industry");
	const emailInput = document.getElementById("email");
	const ctaForm = document.querySelector(".cta-form");
	const charCount = document.getElementById("char-count");
	const useCaseTextarea = document.getElementById("use-case");

	if (!industrySelect) return;

	// Real-time validation for industry select
	if (industrySelect) {
		industrySelect.addEventListener("change", () => {
			validateField(industrySelect);
		});
	}

	// Real-time validation for email (only if already has error or has content)
	if (emailInput) {
		emailInput.addEventListener("input", () => {
			if (
				emailInput.classList.contains("error") ||
				emailInput.value.trim() !== ""
			) {
				validateField(emailInput);
			}
		});
	}

	// Character counter and validation for textarea (only if already has error or has content)
	if (useCaseTextarea) {
		useCaseTextarea.addEventListener("input", (e) => {
			const count = e.target.value.length;
			if (charCount) {
				charCount.textContent = `${count}/100`;
			}
			if (
				useCaseTextarea.classList.contains("error") ||
				useCaseTextarea.value.trim() !== ""
			) {
				validateField(useCaseTextarea);
			}
		});
	}

	// Form submission
	if (ctaForm) {
		ctaForm.addEventListener("submit", (e) => {
			e.preventDefault();
			submitCTAForm();
		});
	}
}

// Validate individual form fields
function validateField(field) {
	const errorElement = field.parentElement.querySelector(".form-error");
	let isValid = true;
	let errorMessage = "";

	if (field.id === "industry") {
		isValid = field.value.trim() !== "";
		errorMessage =
			translations[currentLang].industry_required ||
			"Please select an industry";
	} else if (field.id === "email") {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		isValid = field.value.trim() !== "" && emailRegex.test(field.value);
		if (field.value.trim() === "") {
			errorMessage =
				translations[currentLang].email_required || "Email is required";
		} else {
			errorMessage =
				translations[currentLang].email_invalid || "Please enter a valid email";
		}
	} else if (field.id === "use-case") {
		isValid = field.value.trim() !== "" && field.value.length > 0;
		errorMessage =
			translations[currentLang].use_case_required ||
			"Please describe your use case";
	}

	// Update field styling and error message
	if (isValid) {
		field.classList.remove("error");
		if (errorElement) errorElement.textContent = "";
	} else {
		field.classList.add("error");
		if (errorElement) errorElement.textContent = errorMessage;
	}

	return isValid;
}

// Submit CTA Form
async function submitCTAForm() {
	const industryField = document.getElementById("industry");
	const emailField = document.getElementById("email");
	const useCaseField = document.getElementById("use-case");

	// Validate all fields
	const isIndustryValid = validateField(industryField);
	const isEmailValid = validateField(emailField);
	const isUseCaseValid = validateField(useCaseField);

	if (!isIndustryValid || !isEmailValid || !isUseCaseValid) {
		showAlert(
			translations[currentLang].validation_error ||
				"Please fill in all required fields correctly",
			"error",
		);
		return;
	}

	const industry = industryField.value;
	const email = emailField.value;
	const useCase = useCaseField.value;

	try {
		const submitButton = document.querySelector(".cta-form .btn");
		const originalText = submitButton.textContent;
		submitButton.disabled = true;
		submitButton.textContent =
			translations[currentLang].form_submitting || "Submitting...";

		// Replace this with your actual API endpoint
		const API_URL = "YOUR_API_ENDPOINT_HERE/submit-demo";

		const response = await fetch(API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				industry: industry,
				email: email,
				useCase: useCase,
				submittedAt: new Date().toISOString(),
			}),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();

		// Success
		showAlert(translations[currentLang].form_success, "success");

		// Reset form
		document.querySelector(".cta-form").reset();
		document.getElementById("char-count").textContent = "0/100";

		// Restore button
		submitButton.disabled = false;
		submitButton.textContent = originalText;
	} catch (error) {
		console.error("Error submitting form:", error);
		showAlert(translations[currentLang].form_error, "error");

		// Restore button
		const submitButton = document.querySelector(".cta-form .btn");
		submitButton.disabled = false;
		submitButton.textContent = originalText;
	}
}

// SweetAlert Helper Function
function showAlert(message, type = "info") {
	// Check if SweetAlert2 is loaded
	if (typeof Swal !== "undefined") {
		Swal.fire({
			icon: type,
			title:
				type === "success" ? "Success" : type === "error" ? "Error" : "Info",
			text: message,
			confirmButtonColor: "#F26740",
		});
	} else {
		// Fallback to browser alert if SweetAlert2 is not loaded
		if (type === "error") {
			alert("❌ " + message);
		} else if (type === "success") {
			alert("✓ " + message);
		} else {
			alert("ℹ " + message);
		}
	}
}

// Initialize bottom section with fleet tabs and CTA form
function initBottomSection() {
	if (!bottomLoaded) {
		fetch("partials/bottom.html")
			.then((res) => res.text())
			.then((data) => {
				document.getElementById("bottom-section").innerHTML = data;
				bottomLoaded = true;
				// Initialize fleet tabs
				initFleetTabs();
				// Initialize CTA form
				setTimeout(() => initCTAForm(), 100);
				initBottomLanguage();
			})
			.catch((error) => console.error("Error loading bottom section:", error));
	}
}

// Update content row and section background with card data
function updateProvenTechContent(
	card,
	contentRow,
	slideTitle,
	slideDescription,
	section,
) {
	const sectionBg = card.getAttribute("data-section-bg");
	const title = card.getAttribute("data-title");
	const description = card.getAttribute("data-description");

	// Update section background
	if (sectionBg && section) {
		section.style.backgroundImage = sectionBg;
		section.style.backgroundSize = "cover";
		section.style.backgroundPosition = "center";
		section.style.backgroundAttachment = "fixed";
	}

	// Update text content
	if (title) {
		slideTitle.textContent = title;
	}
	if (description) {
		slideDescription.textContent = description;
	}
}

// Initialize top section with fleet tabs and CTA form
function initTopSection() {
	if (!topLoaded) {
		fetch("partials/top.html")
			.then((res) => res.text())
			.then((data) => {
				document.getElementById("top-section").innerHTML = data;
				topLoaded = true;
				initTopHeroSection();
				initTopProvenTechnology();
				initTopLanguage();
			})
			.catch((error) => console.error("Error loading top section:", error));
	}
}

// Load bottom & top section on page load or when needed
document.addEventListener("DOMContentLoaded", () => {
	initBottomSection();
	initTopSection();
});

// Error handling
window.addEventListener("error", (e) => {
	console.error("JavaScript error:", e.error);
});

window.addEventListener("unhandledrejection", (e) => {
	console.error("Unhandled promise rejection:", e.reason);
});
