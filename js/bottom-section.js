function submitForm() {
	const industry = document.getElementById("industry").value;
	const email = document.getElementById("email").value.trim();
	const message = document.getElementById("use-case").value.trim();

	if (!industry) {
		showAlert(translations[currentLang].select_industry_error, "error");
		return;
	}

	if (!email) {
		showAlert(translations[currentLang].enter_email_error, "error");
		return;
	}

	// ✅ Email validation
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
	if (!emailRegex.test(email)) {
		showAlert(translations[currentLang].valid_email_error, "error");
		return;
	}

	if (!message) {
		showAlert(translations[currentLang].describe_use_case_error, "error");
		return;
	}

	const btn = document.getElementById("cta-submit");
	btn.classList.add("loading");
	btn.disabled = true;

	const data = new URLSearchParams();
	data.append("subject", industry);
	data.append("email", email);
	data.append("message", message);

	fetch("https://mlgutilityapi.mlt-uae.com:1629/api/MLGService/ContactUs", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: data.toString(),
	})
		.then((response) => {
			if (!response.ok) throw new Error();
			return response.json();
		})
		.then(() => {
			showAlert(translations[currentLang].thank_you_success, "success");

			document.getElementById("industry").value = "";
			document.getElementById("email").value = "";
			document.getElementById("use-case").value = "";
			document.getElementById("char-count").textContent = "0/100";
		})
		.catch(() => {
			showAlert(translations[currentLang].something_went_wrong_error, "error");
		})
		.finally(() => {
			btn.classList.remove("loading");
			btn.disabled = false;
		});
}

function initBottomLanguage() {
	// Load preferred language
	const savedLang = localStorage.getItem("preferred-language");
	if (savedLang && translations[savedLang]) {
		currentLang = savedLang;
	}

	// Initialize language
	updateLanguage(currentLang);
}
