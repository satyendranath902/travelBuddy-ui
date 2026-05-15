"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

const defaultExpenses = {
  house: "₹95,000",
  food: "₹28,000",
  transport: "₹24,000",
  healthcare: "₹12,000",
};

const defaultFromPlaceholder = "Bengaluru (BLR)";
const defaultToPlaceholder = "London, The Royal City";

export default function Home() {
  const [authMode, setAuthMode] = useState<"login" | "signup">("signup");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    contact: "",
    city: "",
    country: "",
  });
  const [budgetSearch, setBudgetSearch] = useState({
    from: "",
    to: "",
    date: "",
  });
  const [showCalculation, setShowCalculation] = useState(false);
  const fromLabel = budgetSearch.from || defaultFromPlaceholder;
  const toLabel = budgetSearch.to || defaultToPlaceholder;
  const [salary, setSalary] = useState(0);
  const [memberCount, setMemberCount] = useState(1);
  const [members, setMembers] = useState([{ name: "", age: "" }]);
  const [message, setMessage] = useState("");

  const comparison = useMemo(
    () => [
      { label: "Rent", from: "₹35,000", to: "₹95,000" },
      { label: "Food", from: "₹18,000", to: "₹28,000" },
      { label: "Transport", from: "₹9,500", to: "₹24,000" },
      { label: "Healthcare", from: "₹4,000", to: "₹12,000" },
    ],
    []
  );

  const handleAuthSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user.firstName || !user.lastName || !user.contact) {
      setMessage("Please complete the mandatory fields before continuing.");
      return;
    }
    setMessage("");
    setIsSignedIn(true);
  };

  const handleBudgetSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(`Showing monthly budget summary for ${budgetSearch.to}.`);
  };

  const handleMemberCount = (count: number) => {
    const safeCount = Math.max(1, Math.min(6, count));
    setMemberCount(safeCount);
    setMembers((prev) => {
      const next = [...prev];
      while (next.length < safeCount) next.push({ name: "", age: "" });
      return next.slice(0, safeCount);
    });
  };

  const handleMemberChange = (
    index: number,
    field: "name" | "age",
    value: string
  ) => {
    setMembers((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const exactCost = useMemo(() => {
    if (!salary || memberCount < 1) return null;
    const multiplier = 1 + memberCount * 0.18;
    const total = Math.round(salary * multiplier * 0.9);
    return {
      salary,
      total: `₹${total.toLocaleString("en-IN")}`,
      details: `Estimated budget for ${memberCount} member(s): ${total.toLocaleString(
        "en-IN"
      )}`,
    };
  }, [salary, memberCount]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8 flex flex-col gap-4 rounded-3xl bg-white p-8 shadow-lg">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <Image src="/logo.svg" alt="TravelBuddy logo" width={50} height={50} className="rounded-2xl bg-slate-100 p-2" />
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-sky-600">
                  TravelBuddy
                </p>
                <h1 className="text-3xl font-semibold text-slate-900">
                  Your relocation and travel planner
                </h1>
              </div>
            </div>
            <div className="rounded-3xl bg-slate-100 px-4 py-3 text-sm text-slate-700">
              {!isSignedIn ? (
                <span>Not signed in yet</span>
              ) : (
                <span>Signed in as {user.firstName} {user.lastName}</span>
              )}
            </div>
          </div>
        </header>

        <section className="grid gap-8 lg:grid-cols-[360px_1fr]">
          <div className="space-y-6 rounded-3xl bg-white p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-600">Login / Signup</p>
                <p className="text-sm text-slate-500">Enter your details to continue</p>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                <button
                  className={`rounded-full px-3 py-1 ${authMode === "signup" ? "bg-sky-600 text-white" : "hover:bg-slate-200"}`}
                  onClick={() => setAuthMode("signup")}
                  type="button"
                >
                  Signup
                </button>
                <button
                  className={`rounded-full px-3 py-1 ${authMode === "login" ? "bg-sky-600 text-white" : "hover:bg-slate-200"}`}
                  onClick={() => setAuthMode("login")}
                  type="button"
                >
                  Login
                </button>
              </div>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium text-slate-700">
                  First name *
                  <input
                    value={user.firstName}
                    onChange={(event) => setUser({ ...user, firstName: event.target.value })}
                    className="mt-1 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-sky-500"
                    placeholder="First name"
                  />
                </label>
                <label className="block text-sm font-medium text-slate-700">
                  Last name *
                  <input
                    value={user.lastName}
                    onChange={(event) => setUser({ ...user, lastName: event.target.value })}
                    className="mt-1 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-sky-500"
                    placeholder="Last name"
                  />
                </label>
              </div>
              <label className="block text-sm font-medium text-slate-700">
                Mobile or Email *
                <input
                  value={user.contact}
                  onChange={(event) => setUser({ ...user, contact: event.target.value })}
                  className="mt-1 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-sky-500"
                  placeholder="e.g. +91 98765 43210 or you@example.com"
                />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium text-slate-700">
                  City
                  <input
                    value={user.city}
                    onChange={(event) => setUser({ ...user, city: event.target.value })}
                    className="mt-1 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-sky-500"
                    placeholder="City"
                  />
                </label>
                <label className="block text-sm font-medium text-slate-700">
                  Country
                  <input
                    value={user.country}
                    onChange={(event) => setUser({ ...user, country: event.target.value })}
                    className="mt-1 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-sky-500"
                    placeholder="Country"
                  />
                </label>
              </div>
              {message ? <p className="text-sm text-rose-600">{message}</p> : null}
              <button className="w-full rounded-2xl bg-sky-600 px-5 py-3 text-white transition hover:bg-sky-700" type="submit">
                {authMode === "signup" ? "Create account" : "Sign in"}
              </button>
            </form>
          </div>

          <div className="space-y-6 rounded-3xl bg-white p-6 shadow-md">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Budget Plan</p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-900">Plan your move</h2>
              <p className="mt-2 text-sm text-slate-600">
                Compare monthly living costs, save on housing, and check travel options from {fromLabel} to {toLabel}.
              </p>
            </div>

            <form onSubmit={handleBudgetSearch} className="grid gap-4 rounded-3xl bg-slate-50 p-6">
              <label className="block text-sm font-medium text-slate-700">
                From location
                <input
                  value={budgetSearch.from}
                  placeholder={defaultFromPlaceholder}
                  onChange={(event) => setBudgetSearch({ ...budgetSearch, from: event.target.value })}
                  className="mt-1 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-sky-500"
                />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                To location
                <input
                  value={budgetSearch.to}
                  placeholder={defaultToPlaceholder}
                  onChange={(event) => setBudgetSearch({ ...budgetSearch, to: event.target.value })}
                  className="mt-1 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-sky-500"
                />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Date
                <input
                  type="date"
                  value={budgetSearch.date}
                  onChange={(event) => setBudgetSearch({ ...budgetSearch, date: event.target.value })}
                  className="mt-1 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-sky-500"
                />
              </label>
              <button className="rounded-2xl bg-slate-900 px-5 py-3 text-white transition hover:bg-slate-800">
                Search budget
              </button>
            </form>

            <div className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Monthly expense</p>
                    <h3 className="mt-2 text-xl font-semibold text-slate-900">{budgetSearch.to}</h3>
                  </div>
                  <span className="rounded-full bg-sky-50 px-3 py-1 text-sm font-medium text-sky-700">
                    Summary
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                {Object.entries(defaultExpenses).map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                    <span className="text-sm text-slate-700">{label.charAt(0).toUpperCase() + label.slice(1)}</span>
                    <span className="font-semibold text-slate-900">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-lg font-semibold text-slate-900">From vs To comparison</h3>
              <div className="mt-4 space-y-3">
                {comparison.map((item) => (
                  <div key={item.label} className="grid gap-3 rounded-2xl bg-white p-4 sm:grid-cols-[1fr_1fr_1fr]">
                    <span className="font-medium text-slate-700">{item.label}</span>
                    <span className="text-slate-500">{budgetSearch.from}: {item.from}</span>
                    <span className="text-slate-500">{budgetSearch.to}: {item.to}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              className="mt-2 w-full rounded-2xl bg-slate-900 px-5 py-3 text-white transition hover:bg-slate-800"
              onClick={() => setShowCalculation(true)}
              type="button"
            >
              Do you want the exact calculation?
            </button>
          </div>
        </section>

        <section className="mt-10 grid gap-8 lg:grid-cols-2">
          <article className="rounded-3xl bg-white p-6 shadow-md">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Housing Booking</p>
                <h2 className="text-xl font-semibold text-slate-900">Find your new home</h2>
              </div>
            </div>
            <p className="text-sm leading-6 text-slate-600">
              Browse rentals and neighborhoods close to your destination city. Compare support services, short-term housing, and relocation-friendly properties.
            </p>
            <div className="mt-6 grid gap-4">
              <div className="rounded-3xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-700">City</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">{budgetSearch.to}</p>
              </div>
              <button className="rounded-2xl bg-sky-600 px-5 py-3 text-white transition hover:bg-sky-700">
                Book housing support
              </button>
            </div>
          </article>

          <article className="rounded-3xl bg-white p-6 shadow-md">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Flight Booking</p>
                <h2 className="text-xl font-semibold text-slate-900">Book your flight</h2>
              </div>
            </div>
            <p className="text-sm leading-6 text-slate-600">
              Choose the best travel options from {fromLabel} to {toLabel}. Get alerts for visa-friendly flights and relocation-friendly baggage policies.
            </p>
            <div className="mt-6 grid gap-4">
              <div className="rounded-3xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-700">Route</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">{fromLabel} → {toLabel}</p>
              </div>
              <button className="rounded-2xl bg-slate-900 px-5 py-3 text-white transition hover:bg-slate-800">
                Find flights
              </button>
            </div>
          </article>
        </section>
      </div>

      {showCalculation ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
          <div className="w-full max-w-2xl rounded-3xl bg-white p-8 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-semibold text-slate-900">Exact Cost Calculation</h3>
                <p className="mt-2 text-sm text-slate-600">Enter your salary and household details to refine the budget.</p>
              </div>
              <button
                className="rounded-full bg-slate-100 px-3 py-2 text-slate-700 hover:bg-slate-200"
                onClick={() => setShowCalculation(false)}
                type="button"
              >
                Close
              </button>
            </div>
            <div className="mt-6 grid gap-4">
              <label className="block text-sm font-medium text-slate-700">
                Current salary
                <input
                  type="number"
                  min={0}
                  value={salary || ""}
                  onChange={(event) => setSalary(Number(event.target.value))}
                  className="mt-1 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-sky-500"
                  placeholder="Annual salary"
                />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                How many members?
                <input
                  type="number"
                  min={1}
                  max={6}
                  value={memberCount}
                  onChange={(event) => handleMemberCount(Number(event.target.value))}
                  className="mt-1 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-sky-500"
                />
              </label>
              <div className="space-y-4">
                {members.map((member, index) => (
                  <div key={index} className="grid gap-4 rounded-3xl bg-slate-100 p-4 sm:grid-cols-2">
                    <label className="block text-sm font-medium text-slate-700">
                      Member {index + 1} name
                      <input
                        value={member.name}
                        onChange={(event) => handleMemberChange(index, "name", event.target.value)}
                        className="mt-1 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-sky-500"
                        placeholder="Name"
                      />
                    </label>
                    <label className="block text-sm font-medium text-slate-700">
                      Member {index + 1} age
                      <input
                        value={member.age}
                        onChange={(event) => handleMemberChange(index, "age", event.target.value)}
                        className="mt-1 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-sky-500"
                        placeholder="Age"
                      />
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button
                className="rounded-2xl bg-sky-600 px-5 py-3 text-white transition hover:bg-sky-700"
                onClick={() => setShowCalculation(false)}
                type="button"
              >
                Save details
              </button>
              {exactCost ? (
                <div className="rounded-3xl bg-slate-50 p-4 text-slate-700 shadow-sm">
                  <p className="text-sm font-medium text-slate-900">Estimated budget</p>
                  <p className="mt-2 text-xl font-semibold">{exactCost.total}</p>
                  <p className="mt-1 text-sm text-slate-500">{exactCost.details}</p>
                </div>
              ) : (
                <p className="text-sm text-slate-600">Enter salary and members to see the calculation.</p>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
