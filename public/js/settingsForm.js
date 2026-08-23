const { FIELD_ORDER, validateField, validateSettings } =
  window.settingsValidation;

const form = document.getElementById("settings-form");
const formStatus = document.getElementById("form-status");
const bioCount = document.getElementById("bio-count");

function getFormData() {
  return {
    displayName: form.displayName.value,
    email: form.email.value,
    username: form.username.value,
    bio: form.bio.value,
    theme: form.theme.value,
    language: form.language.value,
  };
}

function setFormData(data) {
  form.displayName.value = data.displayName ?? "";
  form.email.value = data.email ?? "";
  form.username.value = data.username ?? "";
  form.bio.value = data.bio ?? "";
  form.theme.value = data.theme ?? "";
  form.language.value = data.language ?? "";
  updateBioCount();
}

function showFieldError(fieldName, message) {
  const input = form.elements[fieldName];
  const errorEl = document.querySelector(`[data-error="${fieldName}"]`);

  if (message) {
    input.classList.add("invalid");
    input.setAttribute("aria-invalid", "true");
    errorEl.textContent = message;
    errorEl.hidden = false;
  } else {
    input.classList.remove("invalid");
    input.setAttribute("aria-invalid", "false");
    errorEl.textContent = "";
    errorEl.hidden = true;
  }
}

function clearErrors() {
  FIELD_ORDER.forEach((field) => showFieldError(field, ""));
  formStatus.hidden = true;
  formStatus.className = "form-status";
  formStatus.textContent = "";
}

function validateFormField(fieldName) {
  const data = getFormData();
  const message = validateField(fieldName, data[fieldName]);
  showFieldError(fieldName, message);
  return !message;
}

function validateForm() {
  return validateSettings(getFormData());
}

function setFormStatus(message, type) {
  formStatus.textContent = message;
  formStatus.className = `form-status ${type}`;
  formStatus.hidden = false;
}

function updateBioCount() {
  bioCount.textContent = String(form.bio.value.length);
}

function focusFirstInvalid(errors) {
  const firstInvalid = FIELD_ORDER.find((field) => errors[field]);
  if (firstInvalid) {
    form.elements[firstInvalid].focus();
  }
}

async function loadSettings() {
  try {
    const response = await fetch("/api/settings");
    if (!response.ok) throw new Error("Failed to load settings");
    const data = await response.json();
    setFormData(data);
  } catch {
    setFormStatus("Could not load your current settings.", "error");
  }
}

FIELD_ORDER.forEach((fieldName) => {
  const input = form.elements[fieldName];
  if (!input) return;

  input.addEventListener("blur", () => validateFormField(fieldName));
  input.addEventListener("input", () => {
    if (input.getAttribute("aria-invalid") === "true") {
      validateFormField(fieldName);
    }
    if (fieldName === "bio") {
      updateBioCount();
    }
  });
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  clearErrors();

  const result = validateForm();
  if (!result.success) {
    Object.entries(result.errors).forEach(([field, message]) => {
      showFieldError(field, message);
    });
    setFormStatus("Fix the highlighted fields before saving.", "error");
    focusFirstInvalid(result.errors);
    return;
  }

  const submitBtn = form.querySelector('[type="submit"]');
  submitBtn.disabled = true;

  try {
    const response = await fetch("/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(getFormData()),
    });

    const payload = await response.json();

    if (!response.ok) {
      if (payload.errors) {
        Object.entries(payload.errors).forEach(([field, message]) => {
          showFieldError(field, message);
        });
        focusFirstInvalid(payload.errors);
      }
      setFormStatus(payload.message || "Could not save settings.", "error");
      return;
    }

    setFormData(payload.data);
    setFormStatus(payload.message, "success");
  } catch {
    setFormStatus("Network error. Please try again.", "error");
  } finally {
    submitBtn.disabled = false;
  }
});

loadSettings();
