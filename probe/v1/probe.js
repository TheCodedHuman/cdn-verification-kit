document.addEventListener("DOMContentLoaded", function () {
    // Inject CSS
    const cssLink = document.createElement("link");
    cssLink.rel = "stylesheet";
    cssLink.href = "../assets/probe.css";
    document.head.appendChild(cssLink);

    // Collect metadata
    const payload = {
        browser: navigator.userAgent,
        platform: navigator.platform,
        screen: {
            width: window.screen.width,
            height: window.screen.height
        },
        language: navigator.language,
        timestamp: new Date().toISOString()
    };

    
    // 🧪 Block interaction immediately
    document.body.classList.add("cdn-verification-kit-blocked")

    // 🧪 Create overlay
    const overlay = document.createElement("div");
    overlay.className = "cdn-verification-kit-overlay";
    overlay.innerText = "🔍 Verifying user...";
    document.body.appendChild(overlay);


    // 🛰️ Send to backend
    fetch("https://your-backend.com/api/telemetry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })
        .then(res => res.json())
        .then(data => {
            if (data.allow) {
                overlay.innerText = "✅ Verified! Loading site...";
                setTimeout(() => {
                    overlay.remove();
                    document.body.classList.remove("cdn-verification-kit-blocked")
                }, 1000);
            } else {
                overlay.innerText = "❌ Verification failed. You are not allowed to access this site.";
                // Keep interaction blocked
            }
        })
        .catch(err => {
            overlay.innerText = "⚠️ Error verifying user. Please try again.";
            console.error("Probe error:", err);
        });
});


