"use client";

import { useRouter } from "next/navigation";

interface Props {
  visible: boolean;
  selectedZone: number | null;
  onClose: () => void;
}

export default function ProjectPanel({
  visible,
  selectedZone,
  onClose,
}: Props) {
  const router = useRouter();

  if (!visible) return null;

  const project =
    selectedZone === 1
      ? {
          title: "Fashion Semantic Search",
          subtitle: "Similarity Forest",
          description:
            "A fashion search system that finds visually and semantically similar apparel items using embeddings and similarity matching.",
          demoPath: "/projects/fashion-search",
          demoLabel: "Open Fashion Search",
          githubLabel: "GitHub",
          githubUrl: "https://github.com/smtrixx/fashion-semantic-search.git",
          accent: "text-emerald-200/80",
          primaryButton:
            "border-emerald-300/20 bg-emerald-400/10 text-emerald-100 hover:bg-emerald-400/20",
        }
      : selectedZone === 2
      ? {
          title: "Stock Price Predictor",
          subtitle: "Prediction Tower",
          description:
            "A machine learning-based forecasting system designed to predict short-term stock price movements using engineered time-series features and comparative modeling.",
          demoPath: "/projects/forex",
          demoLabel: "View Case Study",
          githubLabel: "GitHub",
          githubUrl: "https://github.com/smtrixx/stock-price-prediction.git",
          accent: "text-cyan-200/80",
          primaryButton:
            "border-cyan-300/20 bg-cyan-400/10 text-cyan-100 hover:bg-cyan-400/20",
        }
      : selectedZone === 3
      ? {
          title: "Blog / Research Notes",
          subtitle: "Notebook Cave",
          description:
            "A knowledge zone for notes, experiments, project learnings, model insights, and research-oriented writeups.",
          demoPath: "",
          demoLabel: "Coming Soon",
          // githubLabel: "GitHub",
          // githubUrl: "https://github.com/smtrixx",
          accent: "text-amber-200/80",
          primaryButton:
            "border-amber-300/20 bg-amber-400/10 text-amber-100 hover:bg-amber-400/20",
        }
      : selectedZone === 4
      ? {
          title: "Contact & Links",
          subtitle: "Signal Beacon",
          description:
            "Connect with me, explore my profiles, and reach out for collaborations, projects, or opportunities.",
          demoPath: "/connect",
          demoLabel: "Connect",
          githubLabel: "GitHub",
          githubUrl: "https://github.com/smtrixx",
          accent: "text-orange-200/80",
          primaryButton:
            "border-orange-300/20 bg-orange-400/10 text-orange-100 hover:bg-orange-400/20",
        }
      : {
          title: "Project",
          subtitle: "Unknown Zone",
          description: "No project selected.",
          demoPath: "",
          demoLabel: "Open Demo",
          githubLabel: "GitHub",
          githubUrl: "",
          accent: "text-cyan-200/80",
          primaryButton:
            "border-cyan-300/20 bg-cyan-400/10 text-cyan-100 hover:bg-cyan-400/20",
        };

  const handleDemoClick = () => {
    if (project.demoPath) {
      onClose();
      router.push(project.demoPath);
    }
  };

  const handleGithubClick = () => {
    if (project.githubUrl) {
      window.open(project.githubUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-md">
      <div className="relative w-[460px] rounded-2xl border border-white/10 bg-slate-950/95 p-8 text-white shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-3 text-xl text-white/70 hover:text-red-400"
        >
          ✕
        </button>

        <p className={`text-xs uppercase tracking-[0.3em] ${project.accent}`}>
          {project.subtitle}
        </p>

        <h2 className="mt-2 text-3xl font-bold tracking-[0.06em] text-white">
          {project.title}
        </h2>

        <p className="mt-4 text-sm leading-7 text-white/75">
          {project.description}
        </p>

        <div className="mt-6 flex gap-3">
          <button
            onClick={handleDemoClick}
            disabled={!project.demoPath}
            className={`rounded-xl border px-4 py-2 text-sm transition disabled:cursor-not-allowed disabled:opacity-50 ${project.primaryButton}`}
          >
            {project.demoLabel}
          </button>

          {project.githubUrl && (
  <button
    onClick={handleGithubClick}
    className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/85 transition hover:bg-white/10"
  >
    {project.githubLabel}
  </button>
)}
        </div>
      </div>
    </div>
  );
}