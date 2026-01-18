function submitForm() {
	const industry = document.getElementById("industry").value;
	const email = document.getElementById("email").value.trim();
	const message = document.getElementById("use-case").value.trim();

	if (!industry) {
		showAlert("Please select an industry", "error");
		return;
	}

	if (!email) {
		showAlert("Please enter your email", "error");
		return;
	}

	// ✅ Email validation
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
	if (!emailRegex.test(email)) {
		showAlert("Please enter a valid email address", "error");
		return;
	}

	if (!message) {
		showAlert("Please describe your use case", "error");
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
			showAlert("Thank you! Our team will contact you shortly.", "success");

			document.getElementById("industry").value = "";
			document.getElementById("email").value = "";
			document.getElementById("use-case").value = "";
			document.getElementById("char-count").textContent = "0/100";
		})
		.catch(() => {
			showAlert("Something went wrong. Please try again later.", "error");
		})
		.finally(() => {
			btn.classList.remove("loading");
			btn.disabled = false;
		});
}
