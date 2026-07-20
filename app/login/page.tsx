"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";
import Button from "@/components/Button";
import InputPasswordField from "@/components/InputPasswordField";
import { InputField } from "@/components/InputField";
import { useToast } from "@/lib/useToast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const { notifySuccess, notifyError } = useToast();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const result = await signIn(email, password);
      if (result.error) {
        notifyError(result.error);
      } else {
        notifySuccess("Logged in successfully!");
      }
    } catch (err) {
      notifyError("Failed to sign in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-md flex-col justify-center animate-rise">
      <h2 className="mb-2 text-center font-display text-3xl font-semibold text-ink">
        Sign In
      </h2>
      <p className="mb-6 text-center text-ink-soft">
        Welcome back! Please enter your credentials.
      </p>
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-line bg-card p-6 shadow-(--shadow-card)"
      >
        {error && (
          <div className="mb-4 rounded-xl border border-secondary/30 bg-secondary/5 p-3 text-sm text-secondary">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label
            htmlFor="email"
            className="mb-1.5 block text-sm font-semibold text-ink"
          >
            Email
          </label>
          <InputField
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-6">
          <InputPasswordField
            label="Password"
            value={password}
            onChange={setPassword}
            placeholder="Enter your password"
            error={!password && error ? "Password is required" : ""}
          />
        </div>

        <div>
          <Button
            type="submit"
            isLoading={isLoading}
            className="rounded-full bg-primary hover:bg-primary/90 focus:ring-primary/30"
          >
            Sign In
          </Button>
        </div>
      </form>

      <p className="mt-4 text-center text-ink-soft">
        Don't have an account?{" "}
        <Link
          href="/register"
          className="font-semibold text-secondary hover:underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
