import React, { useEffect, useMemo, useState } from "react";
import { CalendarDays, MapPin, CloudLightning, Settings2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DEFAULT_CONFIG = {
  title: "Storm Chasing",
  subtitle: "Texas & Oklahoma Tornado Alley Trip",
  startDate: "2027-04-15T00:00:00+10:00",
  endDate: "2027-04-23T23:59:59+10:00",
  location: "Texas / Oklahoma Plains",
  note: "Big skies. Supercells. Structure. Tornado Alley.",
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

  return `${startDate.toLocaleDateString("en-AU", opts)} → ${endDate.toLocaleDateString("en-AU", opts)}`;
}

function CountdownUnit({ value, label }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-black/35 px-4 py-5 text-center shadow-2xl backdrop-blur-md sm:px-6">
      <div className="font-mono text-4xl font-black tracking-tight text-white sm:text-6xl">
        {String(value).padStart(2, "0")}
      </div>
      <div className="mt-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
        {label}
      </div>
    </div>
  );
}

export default function StormChasingCountdown() {
  const [config, setConfig] = useState(() => {
    try {
      const saved = localStorage.getItem("storm-countdown-config");
      return saved ? JSON.parse(saved) : DEFAULT_CONFIG;
    } catch {
      return DEFAULT_CONFIG;
    }
  });

  const [draft, setDraft] = useState(config);
  const [isEditing, setIsEditing] = useState(false);
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(config.startDate));

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft(config.startDate)), 1000);
    return () => clearInterval(timer);
  }, [config.startDate]);

  const dateRange = useMemo(() => formatDateRange(config.startDate, config.endDate), [config.startDate, config.endDate]);
  const hasStarted = timeLeft.total <= 0;

  function saveConfig() {
    setConfig(draft);
    localStorage.setItem("storm-countdown-config", JSON.stringify(draft));
    setIsEditing(false);
  }

  function resetConfig() {
    setDraft(DEFAULT_CONFIG);
    setConfig(DEFAULT_CONFIG);
    localStorage.setItem("storm-countdown-config", JSON.stringify(DEFAULT_CONFIG));
    setIsEditing(false);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?q=85&w=2400&auto=format&fit=crop')",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_35%,rgba(255,255,255,0.10),transparent_30%),linear-gradient(90deg,rgba(2,6,23,0.94),rgba(2,6,23,0.66)_45%,rgba(2,6,23,0.18))]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/40" />
      <div className="absolute left-0 top-0 h-full w-full opacity-20 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:72px_72px]" />

      <section className="relative z-10 flex min-h-screen items-center px-5 py-10 sm:px-10 lg:px-16">
        <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.28em] text-amber-200 backdrop-blur-md">
              <CloudLightning className="h-4 w-4" />
              Chase Mode Armed
            </div>

            <h1 className="max-w-4xl text-6xl font-black leading-[0.9] tracking-tight text-white drop-shadow-2xl sm:text-7xl lg:text-8xl">
              {config.title}
            </h1>

            <p className="mt-6 max-w-2xl text-xl font-medium text-white/80 sm:text-2xl">
              {config.subtitle}
            </p>

            <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold text-white/80">
              <div className="flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-4 py-2 backdrop-blur-md">
                <CalendarDays className="h-4 w-4 text-amber-200" />
                {dateRange}
              </div>
              <div className="flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-4 py-2 backdrop-blur-md">
                <MapPin className="h-4 w-4 text-amber-200" />
                {config.location}
              </div>
            </div>

            <p className="mt-8 max-w-xl border-l-4 border-amber-300/70 pl-5 text-lg text-white/70">
              {config.note}
            </p>
          </div>

          <Card className="border-white/15 bg-black/35 shadow-2xl backdrop-blur-xl">
            <CardContent className="p-5 sm:p-8">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.35em] text-amber-200">
                    Countdown
                  </p>
                  <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">
                    {hasStarted ? "The chase is on" : "Until departure"}
                  </h2>
                </div>
                <Button
                  variant="secondary"
                  className="rounded-full bg-white/10 text-white hover:bg-white/20"
                  onClick={() => setIsEditing((v) => !v)}
                >
                  <Settings2 className="mr-2 h-4 w-4" />
                  Configure
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <CountdownUnit value={timeLeft.days} label="Days" />
                <CountdownUnit value={timeLeft.hours} label="Hours" />
                <CountdownUnit value={timeLeft.minutes} label="Mins" />
                <CountdownUnit value={timeLeft.seconds} label="Secs" />
              </div>

              {isEditing && (
                <div className="mt-8 rounded-2xl border border-white/15 bg-white/10 p-4">
                  <div className="grid gap-4">
                    {[
                      ["Holiday / trip name", "title"],
                      ["Subtitle", "subtitle"],
                      ["Location", "location"],
                      ["Note", "note"],
                      ["Start date", "startDate", "datetime-local"],
                      ["End date", "endDate", "datetime-local"],
                    ].map(([label, key, type = "text"]) => (
                      <label key={key} className="grid gap-2 text-sm font-semibold text-white/70">
                        {label}
                        <input
                          type={type}
                          value={String(draft[key]).replace(/\+10:00$/, "")}
                          onChange={(e) => setDraft({ ...draft, [key]: e.target.value })}
                          className="rounded-xl border border-white/15 bg-black/35 px-3 py-2 text-white outline-none ring-0 placeholder:text-white/40 focus:border-amber-200"
                        />
                      </label>
                    ))}
                  </div>
                  <div className="mt-5 flex gap-3">
                    <Button onClick={saveConfig} className="rounded-full bg-amber-300 text-black hover:bg-amber-200">
                      Save
                    </Button>
                    <Button onClick={resetConfig} variant="secondary" className="rounded-full bg-white/10 text-white hover:bg-white/20">
                      Reset
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
