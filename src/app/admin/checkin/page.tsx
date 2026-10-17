"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";

function CheckinContent() {
  const params = useSearchParams();
  const router = useRouter();
  const runId = params.get("runId");
  const bib = params.get("bib");

  const [status, setStatus] = useState<"loading" | "success" | "error" | "login">("loading");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");

  async function doCheckin() {
    setStatus("loading");
    setMessage("Checking in...");

    const res = await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "checkin", runId, bib, checkedIn: true }),
    });

    if (res.status === 401) {
      setStatus("login");
      setMessage("Please log in first");
      return;
    }

    if (res.ok) {
      setStatus("success");
      setMessage(`Bib #${bib} checked in!`);
    } else {
      setStatus("error");
      setMessage("Check-in failed. Try again.");
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "login", password }),
    });

    if (res.ok) {
      doCheckin();
    } else {
      setMessage("Wrong password");
    }
  }

  useEffect(() => {
    if (!runId || !bib) {
      setStatus("error");
      setMessage("Invalid QR code — missing runId or bib");
      return;
    }
    doCheckin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#FAF9F6",
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
      padding: 24,
    }}>
      <div style={{
        background: "#fff",
        borderRadius: 16,
        padding: 40,
        maxWidth: 400,
        width: "100%",
        textAlign: "center",
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
      }}>
        {status === "loading" && (
          <>
            <p style={{ fontSize: 48 }}>⏳</p>
            <p style={{ fontSize: 18, color: "#6B6B6B" }}>{message || "Checking in..."}</p>
          </>
        )}

        {status === "success" && (
          <>
            <p style={{ fontSize: 48 }}>✅</p>
            <h2 style={{ margin: "12px 0", fontSize: 24, color: "#141414" }}>{message}</h2>
            <p style={{ color: "#6B6B6B" }}>Runner is good to go!</p>
            <button
              onClick={() => router.push("/admin")}
              style={{
                marginTop: 20,
                padding: "10px 24px",
                background: "#C2531F",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Back to Admin
            </button>
          </>
        )}

        {status === "error" && (
          <>
            <p style={{ fontSize: 48 }}>❌</p>
            <h2 style={{ margin: "12px 0", fontSize: 24, color: "#C2531F" }}>{message}</h2>
            <button
              onClick={() => doCheckin()}
              style={{
                marginTop: 20,
                padding: "10px 24px",
                background: "#141414",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Retry
            </button>
          </>
        )}

        {status === "login" && (
          <>
            <p style={{ fontSize: 48 }}>🔒</p>
            <h2 style={{ margin: "12px 0", fontSize: 24, color: "#141414" }}>Admin Login</h2>
            <p style={{ color: "#6B6B6B", marginBottom: 16 }}>Log in to check in Bib #{bib}</p>
            <form onSubmit={handleLogin}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Admin password"
                style={{
                  width: "100%",
                  padding: "10px 16px",
                  border: "1px solid #D9D6CF",
                  borderRadius: 8,
                  fontSize: 16,
                  boxSizing: "border-box",
                }}
              />
              <button
                type="submit"
                style={{
                  marginTop: 12,
                  width: "100%",
                  padding: "10px 24px",
                  background: "#C2531F",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Log in & Check in
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default function CheckinPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>Loading...</div>}>
      <CheckinContent />
    </Suspense>
  );
}
