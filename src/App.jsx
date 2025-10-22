import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import TaskManager from "./components/TaskManager";
import ApiList from "./components/ApiList";
import { ThemeProvider } from "./context/ThemeContext";

export default function App() {
  return (
    // ✅ Wrap everything inside ThemeProvider
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Navbar />
        <main className="flex-grow max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Intro Section */}
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h1 className="text-2xl font-bold mb-2">
              Welcome — PLP Task Manager
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              This app demonstrates React + Tailwind: tasks (with persistence),
              API integration, theme switcher, and a responsive layout.
            </p>
          </section>

          {/* Tasks */}
          <TaskManager />

          {/* API */}
          <ApiList />
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
}
