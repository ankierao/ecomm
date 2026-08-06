"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, LogIn, Mail, Lock, AlertCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function LoginModal() {
  const { isLoginOpen, closeLogin, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter both email and password.");
      return;
    }

    const success = login(email, password);
    if (!success) {
      setError("Invalid email or password. Please try again.");
      return;
    }

    setEmail("");
    setPassword("");
  };

  const handleClose = () => {
    setError("");
    setEmail("");
    setPassword("");
    closeLogin();
  };

  return (
    <AnimatePresence>
      {isLoginOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 z-[60] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-950 sm:p-8"
          >
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white">
                  <LogIn className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Welcome back</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Sign in to your account
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="rounded-full p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Close login"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="login-email"
                  className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    id="login-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="input-field pl-10"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="login-password"
                  className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    id="login-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="input-field pl-10"
                    autoComplete="current-password"
                  />
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-950/50 dark:text-red-400"
                >
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {error}
                </motion.div>
              )}

              <button type="submit" className="btn-primary w-full">
                Sign In
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
