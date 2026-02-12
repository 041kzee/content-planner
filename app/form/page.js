"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useProfileStore } from "../store/profileStore";

export default function Home() {
  const router = useRouter();
  const setProfile = useProfileStore((state) => state.setProfile);

  const [form, setForm] = useState({
    name: "",
    bio: "",
    followers: 0,
    type: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: name === "followers" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.success) {
      const fullProfile = {
        id: data.id,
        name: form.name,
        bio: form.bio,
        followers: form.followers,
        type: form.type,
      };
      setProfile(fullProfile);   
      setForm({ name: "", bio: "", followers: 0, type: "" });
      router.push("/planner");
    }
    else {
      setError("Failed to save profile");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center from-blue-50 via-white to-blue-100 px-6">

        <div className="max-w-[1100px] w-full bg-white rounded-3xl shadow-xl flex overflow-hidden border border-blue-100">

          <div className="hidden md:flex w-1/2 items-center justify-center">
            <img
              src="/auth.png"
              alt="Illustration"
              className="w-75 md:w-120"
            />
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-12 py-12"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center md:text-left">
              Create Profile
            </h2>

            {error && (
              <p className="text-red-500 text-sm mb-4 text-center md:text-left">
                {error}
              </p>
            )}

            <div className="mb-4">
              <label className="text-sm text-gray-600 block mb-2">
                Name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-xl bg-blue-50 border border-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
              />
            </div>

            <div className="mb-4">
              <label className="text-sm text-gray-600 block mb-2">
                Bio
              </label>
              <textarea
                name="bio"
                rows={3}
                value={form.bio}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-xl bg-blue-50 border border-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
              />
            </div>

            <div className="mb-4">
              <label className="text-sm text-gray-600 block mb-2">
                Followers
              </label>
              <input
                name="followers"
                type="number"
                value={form.followers}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-blue-50 border border-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
              />
            </div>

            <div className="mb-6">
              <label className="text-sm text-gray-600 block mb-2">
                Type
              </label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-xl bg-blue-50 border border-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
              >
                <option value="">Select type</option>
                <option>Lifestyle</option>
                <option>Beauty</option>
                <option>Fashion</option>
                <option>Fitness</option>
                <option>Travel</option>
                <option>Food</option>
                <option>Other</option>
              </select>
            </div>

            <button
              type="submit"
              className="bg-[#91c7da] text-white py-3 rounded-full font-medium shadow-md hover:bg-[#548293] transition-all duration-300 w-full"
            >
              Save Profile
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
