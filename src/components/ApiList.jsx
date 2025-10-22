import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Button from "./Button";

const PAGE_SIZE = 8;

export default function ApiList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    let canceled = false;
    setLoading(true);
    setError("");

    axios
      // 👇 You can change this URL to any API you want
      .get("https://api.sampleapis.com/futurama/episodes")
      .then((res) => {
        if (!canceled) setItems(res.data);
      })
      .catch(() => setError("Failed to fetch data."))
      .finally(() => !canceled && setLoading(false));

    return () => {
      canceled = true;
    };
  }, []);

  // 🔍 Universal search across any API data structure
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => {
      const text = JSON.stringify(i).toLowerCase();
      return text.includes(q);
    });
  }, [items, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages]);

  const paged = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 fade-up">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">
          Fetched Data (Universal API Viewer)
        </h2>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {filtered.length} results
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
          placeholder="Search data..."
          className="flex-1 px-4 py-2 rounded border dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button
          variant="secondary"
          onClick={() => {
            setQuery("");
            setPage(1);
          }}
        >
          Clear
        </Button>
      </div>

      {loading ? (
        <div className="py-6 text-center">Loading...</div>
      ) : error ? (
        <div className="py-6 text-center text-red-500">{error}</div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            {paged.map((item, index) => (
              <article
                key={item.id || item.title || item.name || index}
                className="p-4 border rounded-lg hover:shadow-sm dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
              >
                <h3 className="font-semibold mb-2">
                  {item.title || item.name || `Item ${item.id || index + 1}`}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {item.body ||
                    item.desc ||
                    item.description ||
                    item.plot ||
                    JSON.stringify(item, null, 2)}
                </p>
              </article>
            ))}
          </div>

          <div className="flex items-center justify-center gap-3 mt-6">
            <Button
              variant="secondary"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Prev
            </Button>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Page {page} / {totalPages}
            </div>
            <Button
              variant="secondary"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </section>
  );
}
