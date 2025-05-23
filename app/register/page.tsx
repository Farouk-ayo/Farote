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
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Create an Account</h1>

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
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
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
            className="block text-sm font-medium text-gray-700 mb-1"
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
            className="bg-tertiary focus:ring-primary/30"
          >
            Sign Up
          </Button>
        </div>
      </form>

      <p className="mt-4 text-center text-gray-600">
        Already have an account?{" "}
        <Link href="/login" className="text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
