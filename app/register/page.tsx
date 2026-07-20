"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";
import Button from "@/components/Button";
import InputPasswordField from "@/components/InputPasswordField";
import { InputField } from "@/components/InputField";
import { useToast } from "@/lib/useToast";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();
  const { notifySuccess, notifyError } = useToast();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const result = await signUp(name, email, password);
      if (result.error) {
        notifyError(result.error);
      } else {
        notifySuccess("Account created successfully!");
      }
    } catch (err) {
      console.error("Error during registration:", err);
      notifyError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-md flex-col justify-center animate-rise">
      <h1 className="mb-2 text-center font-display text-3xl font-semibold text-ink">
        Create an Account
      </h1>
      <p className="mb-6 text-center text-ink-soft">
        Start organizing your thoughts today.
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
            htmlFor="name"
            className="mb-1.5 block text-sm font-semibold text-ink"
          >
            Name
          </label>

          <InputField
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>

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

        <div className="mb-4">
          <InputPasswordField
            label="Password"
            value={password}
            onChange={setPassword}
            placeholder="Create a password"
          />
        </div>

        <div className="mb-6">
          <InputPasswordField
            label="Confirm Password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            placeholder="Confirm your password"
          />
        </div>

        <div>
          <Button
            type="submit"
            isLoading={isLoading}
            className="rounded-full bg-primary hover:bg-primary/90 focus:ring-primary/30"
          >
            Sign Up
          </Button>
        </div>
      </form>

      <p className="mt-4 text-center text-ink-soft">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-secondary hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
