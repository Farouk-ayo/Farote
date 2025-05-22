"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";
import Button from "@/components/Button";
import InputPasswordField from "@/components/InputPasswordField";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();

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
        setError(result.error);
      }
    } catch (err) {
      setError("Failed to sign in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">Sign In</h2>
      <p className="text-center text-gray-600 mb-6">
        Welcome back! Please enter your credentials to access your account.
      </p>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md border border-primary/40"
      >
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
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
            className="bg-tertiary focus:ring-primary/30"
          >
            Sign In
          </Button>
        </div>
      </form>

      <p className="mt-4 text-center text-gray-600">
        Don't have an account?{" "}
        <Link href="/register" className="text-primary hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
