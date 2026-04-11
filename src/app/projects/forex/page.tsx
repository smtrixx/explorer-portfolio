"use client";

import Link from "next/link";
import posthog from "posthog-js";
import { useEffect } from "react";

export default function ForexPage() {
useEffect(() => {
  posthog.capture("forex_opened");

  posthog.people.set({
    visited_forex: true,
  });
}, []);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.10),_transparent_30%),linear-gradient(to_bottom,_#020617,_#020617)] px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/70">
              Prediction Tower
            </p>

            <h1 className="mt-2 text-4xl font-bold tracking-wide text-cyan-100">
              Stock Price Predictor
            </h1>

            <p className="mt-3 max-w-3xl text-white/70">
              A comparative forecasting study built around LSTM, rolling sequence
              prediction, XGBoost, and baseline evaluation for short-term financial
              price prediction.
            </p>

            <p className="mt-3 max-w-3xl text-sm leading-7 text-white/60">
              The model leverages XGBoost with lag features, moving averages,
              and rolling statistics to capture temporal dependencies in price
              data.
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
          >
            ← Back to World
          </Link>
        </div>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-8">
          <h2 className="text-2xl font-semibold text-cyan-100">
            Project Overview
          </h2>

          <p className="mt-4 text-white/70 leading-7">
            This project explores short-term stock and forex-style price forecasting
            using multiple machine learning approaches. Instead of relying on a single
            model, the system was structured as a comparative study across different
            forecasting strategies to better understand how sequence models, feature-based
            models, and simple baselines behave on noisy financial time-series data.
          </p>

          <p className="mt-4 text-white/70 leading-7">
            Three main modeling directions were tested: an LSTM + Dense architecture for
            one-step-ahead prediction, a rolling LSTM setup for multi-step forecasting,
            and an XGBoost model trained on engineered time-series features such as lagged
            returns, moving averages, volatility measures, momentum signals, RSI, MACD,
            and Bollinger Band features.
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-8">
          <h2 className="text-2xl font-semibold text-cyan-100">
            Modeling Strategy
          </h2>

          <ul className="mt-4 space-y-4 text-white/70 leading-7">
            <li>
              <span className="font-semibold text-white">LSTM + Dense:</span> used for
              next-day prediction by learning temporal patterns directly from sequential
              price history.
            </li>
            <li>
              <span className="font-semibold text-white">Rolling LSTM Forecast:</span>{" "}
              explored for multi-day forward prediction to simulate real-world future
              forecasting, though long-horizon outputs were less stable.
            </li>
            <li>
              <span className="font-semibold text-white">XGBoost:</span> trained on
              engineered tabular time-series features and showed strong interpretability
              and practical value for one-step prediction experiments.
            </li>
            <li>
              <span className="font-semibold text-white">Baseline Comparison:</span>{" "}
              all model outputs were evaluated against a naive last-close baseline to
              judge whether the learned models were actually adding predictive value.
            </li>
          </ul>
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-8">
          <h2 className="text-2xl font-semibold text-cyan-100">
            Evaluation & Deployment Note
          </h2>

          <p className="mt-4 text-white/70 leading-7">
            Since financial time-series data changes continuously, a reliable live system
            would require recurring data refresh, feature recomputation, scheduled model
            updates, and monitoring of prediction drift over time. For that reason, this
            project is presented here as a research-oriented case study focused on model
            design, comparative evaluation, and behavior on unseen test data.
          </p>

          <p className="mt-4 text-white/70 leading-7">
            The emphasis is therefore placed on offline experimentation, baseline-aware
            comparison, and interpretation of model behavior rather than exposing an
            always-on public forecasting endpoint.
          </p>
        </div>
      </div>
    </main>
  );
}