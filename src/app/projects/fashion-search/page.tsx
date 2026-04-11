"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import posthog from "posthog-js";
import { useEffect, useMemo, useState } from "react";

type SearchResult = {
  index: number;
  category: string;
  similarity: number;
  image_url: string;
};

export default function FashionSearchPage() {
  const [file, setFile] = useState<File | null>(null);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

useEffect(() => {
  posthog.capture("fashion_search_opened");

  posthog.people.set({
    visited_fashion: true,
  });
}, []);

  const previewUrl = useMemo(() => {
    if (!file) return null;
    return URL.createObjectURL(file);
  }, [file]);

  const handleSearch = async () => {
    if (!file) {
      setError("Please upload an image first.");
      return;
    }

    setLoading(true);
    setError("");
    setResults([]);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
  `${process.env.NEXT_PUBLIC_BACKEND_URL}/fashion/search`,
  {
    method: "POST",
    body: formData,
  }
);

      if (!response.ok) {
  const errorText = await response.text();
  console.error("Backend error:", response.status, errorText);
  throw new Error(`Search request failed: ${response.status}`);
}

      const data = await response.json();
      setResults(data.results || []);
    } catch (err) {
      setError("Something went wrong while searching.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.10),_transparent_30%),linear-gradient(to_bottom,_#07110d,_#03110c)] px-6 py-10 text-white"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-emerald-200/70">
              Similarity Forest
            </p>

            <h1 className="mt-2 text-4xl font-bold tracking-wide text-emerald-100">
              Fashion Semantic Search
            </h1>

            <p className="mt-3 max-w-3xl text-white/70">
              Upload an apparel image and discover visually similar items from
              the DeepFashion2-based search index.
            </p>

            <p className="mt-3 max-w-3xl text-sm leading-7 text-white/60">
              This system uses CLIP-based visual embeddings and FAISS similarity
              search to retrieve semantically similar apparel items from a
              curated subset of the DeepFashion2 dataset.
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
          >
            ← Back to World
          </Link>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[380px_1fr]">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <label className="block text-sm font-medium uppercase tracking-[0.2em] text-emerald-200/80">
              Query Image
            </label>

            <div className="mt-4 rounded-2xl border border-dashed border-emerald-300/20 bg-black/20 p-4">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="block w-full text-sm text-white/80"
              />

              {file && (
                <p className="mt-3 text-sm text-emerald-100/80">
                  Selected: {file.name}
                </p>
              )}

              <div className="mt-4 overflow-hidden rounded-xl bg-black/20">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Selected query"
                    className="h-72 w-full object-cover"
                  />
                ) : (
                  <div className="flex h-72 items-center justify-center text-sm text-white/40">
                    Image preview will appear here
                  </div>
                )}
              </div>
            </div>

            <p className="mt-4 text-xs leading-6 text-white/50">
              For best results, upload clear images of apparel items. Full-body
              or cluttered images may reduce retrieval accuracy.
            </p>

            <button
              onClick={handleSearch}
              disabled={loading}
              className="mt-5 w-full rounded-xl bg-emerald-500 px-5 py-3 font-medium text-black transition hover:scale-[1.01] hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Searching through Similarity Forest..."
                : "Search Similar Items"}
            </button>

            {error && <p className="mt-4 text-sm text-red-300">{error}</p>}
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-end justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/60">
                  Retrieval Output
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-emerald-50">
                  Similarity Results
                </h2>
              </div>
            </div>

            {loading && (
              <div className="mt-6 rounded-2xl border border-emerald-300/10 bg-black/20 p-6">
                <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-1/2 animate-pulse rounded-full bg-emerald-400" />
                </div>
                <p className="mt-4 text-sm text-emerald-100/80">
                  Searching the fashion index and ranking the closest visual
                  matches...
                </p>
              </div>
            )}

            {results.length === 0 && !loading && (
              <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-8 text-center">
                <p className="text-sm uppercase tracking-[0.3em] text-emerald-200/60">
                  Similarity Forest Awaits
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-white">
                  No results yet
                </h3>
                <p className="mt-3 text-sm leading-7 text-white/60">
                  Upload a fashion image to explore visually similar items from
                  the indexed apparel collection.
                </p>
              </div>
            )}

            {results.length > 0 && (
              <div className="mt-6 grid gap-4 lg:grid-cols-[260px_1fr]">
                <div className="rounded-2xl border border-emerald-300/15 bg-black/20 p-4">
                  <p className="text-sm uppercase tracking-[0.25em] text-emerald-200/70">
                    Query Preview
                  </p>

                  <div className="mt-4 overflow-hidden rounded-xl bg-white/5">
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt="Query preview"
                        className="h-72 w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-72 items-center justify-center text-sm text-white/40">
                        Upload an image to preview it here
                      </div>
                    )}
                  </div>

                  <p className="mt-4 text-sm text-white/55">
                    Your uploaded image is compared against the indexed fashion
                    subset using semantic visual embeddings.
                  </p>
                </div>

                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-emerald-50">
                      Top Matches
                    </h3>
                    <p className="text-sm text-white/50">
                      {results.length} result{results.length > 1 ? "s" : ""}{" "}
                      found
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {results.map((item) => (
                      <motion.div
                        key={item.index}
                        whileHover={{ y: -6 }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 15,
                        }}
                        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 transition duration-300 hover:border-emerald-300/40 hover:bg-white/10"
                      >
                        <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
                          <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 via-transparent to-transparent" />
                        </div>

                        <div className="overflow-hidden rounded-xl">
                          <img
                            src={`/fashion-thumbs/${item.index}.jpg`}
                            alt={item.category}
                            className="h-56 w-full object-cover transition duration-300 group-hover:scale-105"
                          />
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                          <p className="text-sm uppercase tracking-wide text-emerald-200/80">
                            Result #{item.index}
                          </p>
                          <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-100">
                            {(item.similarity * 100).toFixed(1)}%
                          </span>
                        </div>

                        <p className="mt-3 text-lg font-semibold capitalize text-white">
                          {item.category}
                        </p>

                        <p className="mt-2 text-sm text-white/55">
                          Closest visual match retrieved from the indexed
                          fashion subset.
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.main>
  );
}