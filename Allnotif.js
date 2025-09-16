import React, { useState, useEffect } from "react";
import "../assets/css/styles.css";

// Sample notifications
const sampleNotifications = [
  { message: "Voice access denied", timestamp: "2025-05-26 13:19:42" },
  { message: "Voice access denied", timestamp: "2025-05-26 13:19:08" },
  { message: "Access granted via voice recognition.", timestamp: "2025-05-18 05:52:04" },
];

function DashboardPage() {
  const [latestNotifications, setLatestNotifications] = useState([]);
  const [allNotifications, setAllNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showAll, setShowAll] = useState(false);
  const [liveView, setLiveView] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    setLatestNotifications(sampleNotifications.slice(0, 10));
    setAllNotifications(sampleNotifications);
    setLoading(false);
  }, []);

  // Categorize notifications
  const categories = { fingerprint: [], voice: [], pin: [], face: [] };

  (showAll ? allNotifications : latestNotifications).forEach((n) => {
    if (n.message && n.message.toLowerCase().includes("fingerprint"))
      categories.fingerprint.push(n);
    else if (n.message && n.message.toLowerCase().includes("voice"))
      categories.voice.push(n);
    else if (n.message && n.message.toLowerCase().includes("pin"))
      categories.pin.push(n);
    else if (n.message && n.message.toLowerCase().includes("face"))
      categories.face.push(n);
  });

  const getStatusClass = (message) => {
    if (!message) return "";
    message = message.toLowerCase();
    if (message.includes("granted") || message.includes("registered") || message.includes("successfully"))
      return "success";
    if (message.includes("denied") || message.includes("failed"))
      return "error";
    return "";
  };

  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);
  const toggleSettings = () => setSettingsOpen(!settingsOpen);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  useEffect(() => {
    document.body.style.background = darkMode ? "#121212" : "#f4f6f8";
    document.body.style.color = darkMode ? "#eee" : "#222";
  }, [darkMode]);

  if (loading) return <div>Loading notifications...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={darkMode ? "dark" : ""}>
      {/* HEADER */}
      <div className="header">
        <div className="logo">
          <img src="/assets/image/logo.png" alt="Logo" />
        </div>
        <img
          src="/assets/image/menu.png"
          className="menu-icon"
          alt="Menu"
          onClick={openSidebar}
        />
      </div>

      {/* CONTROLS */}
      <div className="controls">
        <div className="toggle-label">
          <label>OPEN DOOR LOCK</label>
          <label className="toggle-switch">
            <input type="checkbox" />
            <span className="slider"></span>
          </label>
        </div>
        <button
          className="live-view-btn"
          onClick={() => setLiveView(true)}
        >
          LIVE VIEW
        </button>
      </div>

      {/* LIVE VIEW MODAL */}
      {liveView && (
        <div
          id="liveViewContainer"
          style={{
            display: "flex",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.85)",
            zIndex: 10000,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "15px",
            padding: "20px",
            boxSizing: "border-box",
          }}
        >
          {/* Close button */}
          <button
            id="closeLiveView"
            style={{
              position: "fixed",
              top: 20,
              right: 20,
              background: "#ff4444",
              color: "white",
              border: "none",
              fontSize: "2rem",
              width: 44,
              height: 44,
              borderRadius: "50%",
              cursor: "pointer",
              zIndex: 11000,
              lineHeight: "40px",
              textAlign: "center",
              padding: 0,
              transition: "background 0.3s ease",
            }}
            onClick={() => setLiveView(false)}
          >
            ×
          </button>

          {/* Video feed */}
          <img
            src="http://192.168.137.135:5000/video_feed"
            alt="Live Video Feed"
			title="Live Video Feed"
            style={{
              maxWidth: "95vw",
              maxHeight: "80vh",
              borderRadius: "8px",
              boxShadow: "0 0 20px rgba(0,0,0,0.3)",
            }}
          />
        </div>
      )}

      {/* NOTIFICATION AREA */}
      {!showAll && (
        <div className="notification-container">
          <h2>NOTIFICATION AREA</h2>
          <div className="notification-list">
            {latestNotifications.map((notif, i) => (
              <div key={i} className={`notification-item ${getStatusClass(notif.message)}`}>
                {notif.message} at {notif.timestamp}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW ALL BUTTON */}
      {!showAll && (
        <div style={{ textAlign: "center", margin: "20px 0" }}>
          <button onClick={() => setShowAll(true)} className="view-all-btn">
            View All Notifications
          </button>
        </div>
      )}

      {/* ALL NOTIFICATIONS */}
      {showAll && (        
  <div id="allNotifications">
    <button
      onClick={() => setShowAll(false)}
      aria-label="Close notifications"
      className="close-allnotif-btn"
    >
      ×
    </button>
    <div className="notification-grid custom-notif-grid">
      <div className="notif-card voice">
        <div className="notif-card-header">
          Voice Auth
          <span style={{ display: 'inline-flex', alignItems: 'center', marginLeft: 'auto' }}>
            <img src="/assets/image/notification.png" alt="Voice Icon" className="notif-icon" />
            <span className="notif-count" style={{ marginLeft: 6 }}>{categories.voice.length}</span>
          </span>
        </div>
        <div className="notif-card-list">
          {categories.voice.map((n, i) => (
            <div key={i} className={`notif-card-item ${getStatusClass(n.message)}`}>{n.message}<br /><span className="notif-date">{n.timestamp}</span></div>
          ))}
        </div>
      </div>
      <div className="notif-card fingerprint">
        <div className="notif-card-header">
          Fingerprint
          <span style={{ display: 'inline-flex', alignItems: 'center', marginLeft: 'auto' }}>
            <img src="/assets/image/notification.png" alt="Fingerprint Icon" className="notif-icon" />
            <span className="notif-count" style={{ marginLeft: 6 }}>{categories.fingerprint.length}</span>
          </span>
        </div>
        <div className="notif-card-list">
          {categories.fingerprint.map((n, i) => (
            <div key={i} className={`notif-card-item ${getStatusClass(n.message)}`}>{n.message}<br /><span className="notif-date">{n.timestamp}</span></div>
          ))}
        </div>
      </div>
      <div className="notif-card face">
        <div className="notif-card-header">
          Face Auth
          <span style={{ display: 'inline-flex', alignItems: 'center', marginLeft: 'auto' }}>
            <img src="/assets/image/notification.png" alt="Face Icon" className="notif-icon" />
            <span className="notif-count" style={{ marginLeft: 6 }}>{categories.face.length}</span>
          </span>
        </div>
        <div className="notif-card-list">
          {categories.face.map((n, i) => (
            <div key={i} className={`notif-card-item ${getStatusClass(n.message)}`}>{n.message}<br /><span className="notif-date">{n.timestamp}</span></div>
          ))}
        </div>
      </div>
      <div className="notif-card pin">
        <div className="notif-card-header">
          PIN Auth
          <span style={{ display: 'inline-flex', alignItems: 'center', marginLeft: 'auto' }}>
            <img src="/assets/image/notification.png" alt="PIN Icon" className="notif-icon" />
            <span className="notif-count" style={{ marginLeft: 6 }}>{categories.pin.length}</span>
          </span>
        </div>
        <div className="notif-card-list">
          {categories.pin.map((n, i) => (
            <div key={i} className={`notif-card-item ${getStatusClass(n.message)}`}>{n.message}<br /><span className="notif-date">{n.timestamp}</span></div>
          ))}
        </div>
      </div>
    </div>
  </div>
      )}

      {/* SIDEBAR */}
      {sidebarOpen && <div className="overlay" onClick={closeSidebar} />}
      <nav className={`sidebar ${sidebarOpen ? "visible" : ""}`}>
        <div className="sidebar-header">
          <img src="/assets/image/profile.png" alt="User Icon" className="user-icon" />
          <p>
            Welcome, <strong>ADMIN</strong>
          </p>
        </div>
        <a href="/allnotif" className="btn-link">
          <img src="/assets/image/home.png" className="sidebar-icon" alt="" /> Home
        </a>
        <a href="/approval" className="btn-link">
          <img src="/assets/image/approval.png" className="sidebar-icon" alt="" /> Approval
        </a>
        <a href="/images" className="btn-link">
          <img src="/assets/image/picture.png" className="sidebar-icon" alt="" /> Image
        </a>
        <button
          onClick={toggleSettings}
          aria-expanded={settingsOpen}
          aria-controls="settingsDropdown"
        >
          <img src="/assets/image/settings.png" className="sidebar-icon" alt="" /> Settings
          <svg
            className={`dropdown-arrow ${settingsOpen ? "open" : ""}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
          </svg>
        </button>

        <div className={`settings-dropdown ${settingsOpen ? "open" : ""}`}>
          <div className="toggle-label">
            <label htmlFor="darkModeToggle">Dark Mode</label>
            <label className="toggle-switch">
              <input
                type="checkbox"
                id="darkModeToggle"
                checked={darkMode}
                onChange={toggleDarkMode}
              />
              <span className="slider"></span>
            </label>
          </div>
          <div className="toggle-label">
            <label htmlFor="biometricToggle">Enable Biometric</label>
            <label className="toggle-switch">
              <input type="checkbox" id="biometricToggle" defaultChecked />
              <span className="slider"></span>
            </label>
          </div>
        </div>

        <button
          onClick={async () => {
            if (window.confirm("Are you sure you want to log out?")) {
              try {
                await fetch("http://localhost/CAPSTONE_BACKEND/logout.php", {
                  method: "GET",
                  credentials: "include",
                });
                window.location.replace("/login");
              } catch (error) {
                alert("Logout failed. Please check your backend server and try again.");
              }
            }
          }}
        >
          <img src="/assets/image/logout.png" className="sidebar-icon" alt="" /> Logout
        </button>
      </nav>

    </div>
  );
}

export default DashboardPage;
