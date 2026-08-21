const form = document.getElementById("settings-form");
const resetBtn = document.getElementById("reset-btn");
const formStatus = document.getElementById("form-status");
const bioField = document.getElementById("bio");
const bioCount = document.getElementById("bio-count");

const rules = {
  displayName(value) {
    const trimmed = value.trim();
    if (!trimmed) return "Display name is required";
    if (trimmed.length < 2) return "Display name must be at least 2 characters";
    if (trimmed.length > 50) return "Display name must be at most 50 characters";
    return "";
  },
  email(value) {
    const trimmed = value.trim();
    if (!trimmed) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      return "Enter a valid email address";
    }
    return "";
  },
  username(value) {
    const trimmed = value.trim();
    if (!trimmed) return "Username is required";
    if (trimmed.length < 3) return "Username must be at least 3 characters";
    if (trimmed.length > 20) return "Username must be at most 20 characters";
    if (!/^[a-zA-Z0-9_]+$/.test(trimmed)) {
      return "Username may only contain letters, numbers, and underscores";
    }
    return "";
  },
  bio(value) {
    if (value.trim().length > 500) return "Bio must be at most 500 characters";
    return "";
  },
  theme(value) {
    if (!["light", "dark", "system"].includes(value)) return "Select a theme";
    return "";
  },
  language(value) {
    if (!["en", "es", "fr", "de"].includes(value)) return "Select a language";
    return "";
  },
};

function getFormData() {
  return {
    displayName: form.displayName.value,
    email: form.email.value,
    username: form.username.value,
    bio: form.bio.value,
    notifications: form.notifications.checked,
    theme: form.theme.value,
    language: form.language.value,
  };
}

function setFormData(data) {
  form.displayName.value = data.displayName ?? "";
  form.email.value = data.email ?? "";
  form.username.value = data.username ?? "";
  form.bio.value = data.bio ?? "";
  form.notifications.checked = Boolean(data.notifications);
  form.theme.value = data.theme ?? "";
  form.language.value = data.language ?? "";
  updateBioCount();
}

function showFieldError(fieldName, message) {
  const input = form.elements[fieldName];
  const errorEl = document.querySelector(`[data-error="${fieldName}"]`);

  if (message) {
    input.classList.add("invalid");
    errorEl.textContent = message;
    errorEl.hidden = false;
  } else {
    input.classList.remove("invalid");
    errorEl.textContent = "";
    errorEl.hidden = true;
  }
}

function clearErrors() {
  Object.keys(rules).forEach((field) => showFieldError(field, ""));
  formStatus.hidden = true;
  formStatus.className = "form-status";
}

function validateField(fieldName) {
  const data = getFormData();
  const validator = rules[fieldName];
  if (!validator) return true;

  const message = validator(data[fieldName]);
  showFieldError(fieldName, message);
  return !message;
}

function validateForm() {
  let isValid = true;

  for (const fieldName of Object.keys(rules)) {
    if (!validateField(fieldName)) {
      isValid = false;
    }
  }

  return isValid;
}

function setFormStatus(message, type) {
  formStatus.textContent = message;
  formStatus.className = `form-status ${type}`;
  formStatus.hidden = false;
}

function updateBioCount() {
  bioCount.textContent = String(form.bio.value.length);
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

Object.keys(rules).forEach((fieldName) => {
  const input = form.elements[fieldName];
  if (!input) return;

  input.addEventListener("blur", () => validateField(fieldName));
  input.addEventListener("input", () => {
    if (input.classList.contains("invalid")) {
      validateField(fieldName);
    }
  });
});

bioField.addEventListener("input", updateBioCount);

resetBtn.addEventListener("click", async () => {
  clearErrors();
  await loadSettings();
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  clearErrors();

  if (!validateForm()) {
    setFormStatus("Fix the highlighted fields before saving.", "error");
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

    const result = await response.json();

    if (!response.ok) {
      if (result.errors) {
        Object.entries(result.errors).forEach(([field, message]) => {
          showFieldError(field, message);
        });
      }
      setFormStatus(result.message || "Could not save settings.", "error");
      return;
    }

    setFormData(result.data);
    setFormStatus(result.message, "success");
  } catch {
    setFormStatus("Network error. Please try again.", "error");
  } finally {
    submitBtn.disabled = false;
  }
});

loadSettings();
