import { useState } from "react";
import "./App.css";

function App() {
  const [saved, setSaved] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [language, setLanguage] = useState("English");
  const [visibility, setVisibility] = useState("Public");
  const [activeSection, setActiveSection] = useState("General");

  const handleSave = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  const handleCancel = () => {
    setDarkMode(false);
    setEmailNotifications(true);
    setLanguage("English");
    setVisibility("Public");
    setSaved(false);
  };

  const sections = [
    "General",
    "Account",
    "Notifications",
    "Security",
  ];

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <aside className="sidebar">
        <h2>Settings</h2>

        <nav>
          {sections.map((section) => (
            <button
              key={section}
              className={`nav-item ${
                activeSection === section ? "active" : ""
              }`}
              onClick={() => setActiveSection(section)}
            >
              {section}
            </button>
          ))}
        </nav>
      </aside>

      <main className="content">
        <div className="header">
          <div>
            <h1>{activeSection}</h1>
            <p>
              Manage your {activeSection.toLowerCase()} settings and
              preferences.
            </p>
          </div>
        </div>

        {activeSection === "General" && (
          <section className="settings-card">
            <h2>General</h2>

            <p className="section-description">
              Customize how the application works for you.
            </p>

            <div className="setting-row">
              <div>
                <h3>Dark mode</h3>
                <p>
                  Use a darker appearance that's easier on your eyes.
                </p>
              </div>

              <button
                className={`toggle ${darkMode ? "on" : ""}`}
                onClick={() => setDarkMode(!darkMode)}
                aria-label="Toggle dark mode"
              >
                <span></span>
              </button>
            </div>

            <div className="setting-row">
              <div>
                <h3>Email notifications</h3>
                <p>
                  Receive updates and important notifications by email.
                </p>
              </div>

              <button
                className={`toggle ${
                  emailNotifications ? "on" : ""
                }`}
                onClick={() =>
                  setEmailNotifications(!emailNotifications)
                }
                aria-label="Toggle email notifications"
              >
                <span></span>
              </button>
            </div>

            <div className="setting-row">
              <div>
                <h3>Language</h3>
                <p>
                  Choose the language used throughout the application.
                </p>
              </div>

              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option>English</option>
                <option>Urdu</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>

            <div className="setting-row">
              <div>
                <h3>Profile visibility</h3>
                <p>
                  Control whether other users can see your profile.
                </p>
              </div>

              <select
                value={visibility}
                onChange={(e) => setVisibility(e.target.value)}
              >
                <option>Public</option>
                <option>Private</option>
              </select>
            </div>

            <div className="actions">
              <button
                className="cancel-button"
                onClick={handleCancel}
              >
                Cancel
              </button>

              <button
                className="save-button"
                onClick={handleSave}
              >
                Save changes
              </button>
            </div>

            {saved && (
              <p className="success-message">
                Changes saved successfully!
              </p>
            )}
          </section>
        )}

        {activeSection === "Account" && (
          <section className="settings-card">
            <h2>Account</h2>

            <p className="section-description">
              Manage your personal account information.
            </p>

            <div className="setting-row">
              <div>
                <h3>Account name</h3>
                <p>Manage the name associated with your account.</p>
              </div>

              <button className="secondary-button">
                Edit
              </button>
            </div>

            <div className="setting-row">
              <div>
                <h3>Email address</h3>
                <p>Manage your account email address.</p>
              </div>

              <button className="secondary-button">
                Change
              </button>
            </div>
          </section>
        )}

        {activeSection === "Notifications" && (
          <section className="settings-card">
            <h2>Notifications</h2>

            <p className="section-description">
              Choose how you want to receive notifications.
            </p>

            <div className="setting-row">
              <div>
                <h3>Email notifications</h3>
                <p>Receive important updates by email.</p>
              </div>

              <button
                className={`toggle ${
                  emailNotifications ? "on" : ""
                }`}
                onClick={() =>
                  setEmailNotifications(!emailNotifications)
                }
                aria-label="Toggle email notifications"
              >
                <span></span>
              </button>
            </div>

            <div className="setting-row">
              <div>
                <h3>Product updates</h3>
                <p>Receive news about new features and updates.</p>
              </div>

              <button className="toggle on">
                <span></span>
              </button>
            </div>
          </section>
        )}

        {activeSection === "Security" && (
          <section className="settings-card">
            <h2>Security</h2>

            <p className="section-description">
              Keep your account secure and protected.
            </p>

            <div className="setting-row">
              <div>
                <h3>Password</h3>
                <p>Change your account password regularly.</p>
              </div>

              <button className="secondary-button">
                Change
              </button>
            </div>

            <div className="setting-row">
              <div>
                <h3>Two-factor authentication</h3>
                <p>Add an extra layer of security to your account.</p>
              </div>

              <button className="toggle">
                <span></span>
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;