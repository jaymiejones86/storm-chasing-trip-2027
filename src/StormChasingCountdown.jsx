import React, { useEffect, useMemo, useState } from "react";
import { CalendarDays, CloudLightning, MapPin, PiggyBank, Settings2 } from "lucide-react";

const DEFAULT_CONFIG = {
  title: "Storm Chasing",
  subtitle: "Texas & Oklahoma Tornado Alley Trip",
  startDate: "2027-04-12T00:00",
  endDate: "2027-04-26T23:59",
  location: "Texas / Oklahoma Plains",
  note: "Big skies. Supercells. Structure. Tornado Alley.",
  budgetTarget: 8000,
  budgetSaved: 3300,
};

function getTimeLeft(targetDate) {
  const total = new Date(targetDate).getTime() - new Date().getTime();

  if (Number.isNaN(total)) {
    return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const seconds = Math.max(0, Math.floor((total / 1000) % 60));
  const minutes = Math.max(0, Math.floor((total / 1000 / 60) % 60));
  const hours = Math.max(0, Math.floor((total / (1000 * 60 * 60)) % 24));
  const days = Math.max(0, Math.floor(total / (1000 * 60 * 60 * 24)));

  return { total, days, hours, minutes, seconds };
}

function formatDateRange(start, end) {
  const opts = { day: "numeric", month: "short", year: "numeric" };
  const startDate = new Date(start);
  const endDate = new Date(end);

  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
    return "Set your trip dates";
  }

  return `${startDate.toLocaleDateString("en-AU", opts)} -> ${endDate.toLocaleDateString("en-AU", opts)}`;
}

function getSavedConfig() {
  try {
    const saved = window.localStorage.getItem("storm-countdown-config");
    return saved ? { ...DEFAULT_CONFIG, ...JSON.parse(saved) } : DEFAULT_CONFIG;
  } catch {
    return DEFAULT_CONFIG;
  }
}

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  }).format(amount);
}

function Button({ children, className = "", type = "button", ...props }) {
  return (
    <button className={`button ${className}`} type={type} {...props}>
      {children}
    </button>
  );
}

function CountdownUnit({ value, label }) {
  return (
    <div className="countdown-unit">
      <div className="countdown-value">{String(value).padStart(2, "0")}</div>
      <div className="countdown-label">{label}</div>
    </div>
  );
}

export default function StormChasingCountdown() {
  const [config, setConfig] = useState(getSavedConfig);
  const [draft, setDraft] = useState(config);
  const [isEditing, setIsEditing] = useState(false);
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(config.startDate));

  useEffect(() => {
    const timer = window.setInterval(() => setTimeLeft(getTimeLeft(config.startDate)), 1000);
    return () => window.clearInterval(timer);
  }, [config.startDate]);

  const dateRange = useMemo(
    () => formatDateRange(config.startDate, config.endDate),
    [config.startDate, config.endDate],
  );
  const hasStarted = timeLeft.total <= 0;
  const budgetTarget = Number(config.budgetTarget) || 0;
  const budgetSaved = Number(config.budgetSaved) || 0;
  const budgetProgress = budgetTarget > 0 ? Math.min((budgetSaved / budgetTarget) * 100, 100) : 0;
  const budgetRemaining = Math.max(budgetTarget - budgetSaved, 0);

  function saveConfig() {
    setConfig(draft);
    window.localStorage.setItem("storm-countdown-config", JSON.stringify(draft));
    setIsEditing(false);
  }

  function resetConfig() {
    setDraft(DEFAULT_CONFIG);
    setConfig(DEFAULT_CONFIG);
    window.localStorage.setItem("storm-countdown-config", JSON.stringify(DEFAULT_CONFIG));
    setIsEditing(false);
  }

  return (
    <main className="page-shell">
      <div className="storm-photo" />
      <div className="weather-glow" />
      <div className="storm-shade" />
      <div className="grid-overlay" />

      <section className="hero-section">
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="status-pill">
              <CloudLightning size={16} />
              Chase Mode Armed
            </div>

            <h1>{config.title}</h1>
            <p className="subtitle">{config.subtitle}</p>

            <div className="trip-meta">
              <div className="meta-pill">
                <CalendarDays size={16} />
                {dateRange}
              </div>
              <div className="meta-pill">
                <MapPin size={16} />
                {config.location}
              </div>
            </div>

            <p className="trip-note">{config.note}</p>
          </div>

          <section className="countdown-card" aria-label="Storm chasing countdown">
            <div className="card-heading">
              <div>
                <p className="eyebrow">Countdown</p>
                <h2>{hasStarted ? "The chase is on" : "Until departure"}</h2>
              </div>
              <Button className="ghost-button" onClick={() => setIsEditing((value) => !value)}>
                <Settings2 size={16} />
                Configure
              </Button>
            </div>

            <div className="countdown-grid">
              <CountdownUnit value={timeLeft.days} label="Days" />
              <CountdownUnit value={timeLeft.hours} label="Hours" />
              <CountdownUnit value={timeLeft.minutes} label="Mins" />
              <CountdownUnit value={timeLeft.seconds} label="Secs" />
            </div>

            <section className="budget-panel" aria-label="Trip budget progress">
              <div className="budget-heading">
                <div>
                  <p className="eyebrow">Budget</p>
                  <h3>{formatCurrency(budgetSaved)} saved</h3>
                </div>
                <div className="budget-icon">
                  <PiggyBank size={22} />
                </div>
              </div>

              <div
                className="budget-progress"
                aria-label={`${Math.round(budgetProgress)}% of budget saved`}
                aria-valuemax={budgetTarget}
                aria-valuemin={0}
                aria-valuenow={Math.min(budgetSaved, budgetTarget)}
                role="progressbar"
              >
                <div className="budget-progress-fill" style={{ width: `${budgetProgress}%` }} />
              </div>

              <div className="budget-stats">
                <div>
                  <span>Target</span>
                  <strong>{formatCurrency(budgetTarget)}</strong>
                </div>
                <div>
                  <span>Remaining</span>
                  <strong>{formatCurrency(budgetRemaining)}</strong>
                </div>
                <div>
                  <span>Progress</span>
                  <strong>{Math.round(budgetProgress)}%</strong>
                </div>
              </div>
            </section>

            {isEditing && (
              <form className="config-panel" onSubmit={(event) => event.preventDefault()}>
                {[
                  ["Holiday / trip name", "title"],
                  ["Subtitle", "subtitle"],
                  ["Location", "location"],
                  ["Note", "note"],
                  ["Start date", "startDate", "datetime-local"],
                  ["End date", "endDate", "datetime-local"],
                  ["Budget target (AUD)", "budgetTarget", "number"],
                  ["Amount saved (AUD)", "budgetSaved", "number"],
                ].map(([label, key, type = "text"]) => (
                  <label key={key}>
                    <span>{label}</span>
                    <input
                      min={type === "number" ? "0" : undefined}
                      step={type === "number" ? "100" : undefined}
                      type={type}
                      value={draft[key] ?? ""}
                      onChange={(event) => setDraft({ ...draft, [key]: event.target.value })}
                    />
                  </label>
                ))}

                <div className="config-actions">
                  <Button className="save-button" onClick={saveConfig}>
                    Save
                  </Button>
                  <Button className="ghost-button" onClick={resetConfig}>
                    Reset
                  </Button>
                </div>
              </form>
            )}
          </section>
        </div>
      </section>
    </main>
  );
}
