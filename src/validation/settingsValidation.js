const THEMES = ["light", "dark", "system"];
const LANGUAGES = ["en", "es", "fr", "de"];

const fieldValidators = {
  displayName(value) {
    const trimmed = String(value ?? "").trim();
    if (!trimmed) return "Display name is required";
    if (trimmed.length < 2) return "Display name must be at least 2 characters";
    if (trimmed.length > 50) return "Display name must be at most 50 characters";
    return "";
  },
  email(value) {
    const trimmed = String(value ?? "").trim();
    if (!trimmed) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      return "Enter a valid email address";
    }
    return "";
  },
  username(value) {
    const trimmed = String(value ?? "").trim();
    if (!trimmed) return "Username is required";
    if (trimmed.length < 3) return "Username must be at least 3 characters";
    if (trimmed.length > 20) return "Username must be at most 20 characters";
    if (!/^[a-zA-Z0-9_]+$/.test(trimmed)) {
      return "Username may only contain letters, numbers, and underscores";
    }
    return "";
  },
  bio(value) {
    const text = String(value ?? "");
    if (text.length > 500) return "Bio must be at most 500 characters";
    return "";
  },
  theme(value) {
    if (!THEMES.includes(value)) return "Select a theme";
    return "";
  },
  language(value) {
    if (!LANGUAGES.includes(value)) return "Select a language";
    return "";
  },
};

const FIELD_ORDER = [
  "displayName",
  "email",
  "username",
  "bio",
  "theme",
  "language",
];

function validateField(fieldName, value) {
  const validator = fieldValidators[fieldName];
  if (!validator) return "";
  return validator(value);
}

function validateSettings(data) {
  const errors = {};

  for (const fieldName of FIELD_ORDER) {
    const message = validateField(fieldName, data?.[fieldName]);
    if (message) {
      errors[fieldName] = message;
    }
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      displayName: String(data.displayName).trim(),
      email: String(data.email).trim(),
      username: String(data.username).trim(),
      bio: String(data.bio ?? "").trim(),
      theme: data.theme,
      language: data.language,
    },
  };
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    THEMES,
    LANGUAGES,
    FIELD_ORDER,
    fieldValidators,
    validateField,
    validateSettings,
  };
}

if (typeof window !== "undefined") {
  window.settingsValidation = {
    FIELD_ORDER,
    validateField,
    validateSettings,
  };
}
