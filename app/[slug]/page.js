"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const { slug } = useParams();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getting = async () => {
      try {
        const response = await fetch("http://localhost:3000/backend/api");
        const result = await response.json();

        const filtered = result.filter((item) => {
          if (slug === "projects") return item.isproject;
          if (slug === "works") return !item.isproject;
          return false;
        });

        setData(filtered);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getting();
  }, [slug]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-zinc-950 via-black to-zinc-900 text-white px-6 py-16">
      {/* Heading */}
      <div className="mx-auto max-w-7xl">
        <Link
          href="/"
          className="inline-block text-zinc-400 hover:text-white transition"
        >
          ← Back Home
        </Link>

        <h1 className="mt-6 text-center text-5xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
            {slug === "projects" ? "My Projects" : "My Works"}
          </span>
        </h1>

        <p className="mt-4 text-center text-zinc-400 max-w-2xl mx-auto">
          {slug === "projects"
            ? "A collection of projects I've built using modern technologies."
            : "Some other work, experiments and things I've created."}
        </p>

        {/* Loading */}
        {loading && (
          <div className="mt-24 flex justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-zinc-700 border-t-blue-500"></div>
          </div>
        )}

        {/* Cards */}
        {!loading && (
          <>
            {data.length === 0 ? (
              <div className="mt-20 text-center text-zinc-500">
                No items found.
              </div>
            ) : (
              <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {data.map((item, index) => (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-6 transition-all duration-500 hover:-translate-y-2 hover:border-blue-500/60 hover:shadow-[0_20px_50px_rgba(59,130,246,0.25)]"
                  >
                    {/* Glow */}
                    <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    {/* Number */}
                    <span className="text-sm font-semibold text-blue-400">
                      #{String(index + 1).padStart(2, "0")}
                    </span>

                    {/* Title */}
                    <h2 className="mt-4 text-2xl font-bold text-white">
                      {item.title}
                    </h2>

                    {/* Description */}
                    <p className="mt-4 text-sm leading-7 text-zinc-400">
                      {item.desc}
                    </p>

                    {/* Button */}
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 font-semibold transition hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30"
                    >
                      Visit
                      <span className="transition group-hover:translate-x-1">
                        →
                      </span>
                    </a>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}