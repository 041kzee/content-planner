"use client"
import { useState } from "react";
import SimpleCalendar from "../components/Calendar";
import { Outfit } from "next/font/google";
import { db } from "../lib/firebase";
import Navbar from "../components/Navbar";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { toast, Toaster } from "sonner"
import { useProfileStore } from "../store/profileStore";
import Footer from "../components/Footer";

const outfit = Outfit({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-outfit",
});

function getDaysInMonth() {
    const now = new Date();

    const daysInCurrentMonth = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0
    ).getDate();

    return daysInCurrentMonth;
}
const totalDays = getDaysInMonth();

export default function PlannerPage() {
    const profile = useProfileStore((state) => state.profile);
    const [selectedDay, setSelectedDay] = useState(null);
    const [noOfDays, setNoOfDays] = useState(1);
    const [userPrompt, setUserPrompt] = useState("");

    async function generatePlan() {
        try {
            toast.success("Creating plan...");

            const response = await fetch("/api/gemini", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    numberOfDays: noOfDays,
                    influencerType: profile?.type || "general",
                    userPrompt: userPrompt,
                }),
            });

            const data = await response.json();
            console.log(data);

            const daysWithStatus = data.days.map((day) => ({
                ...day,
                status: "not_completed"
            }));
            console.log(daysWithStatus)
            console.log(profile?.type)
            await addDoc(collection(db, "plans"), {
                influencerType: profile?.type || "general",
                userPrompt: userPrompt,
                numberOfDays: noOfDays,
                createdAt: serverTimestamp(),
                startDate: new Date(),
                days: daysWithStatus,
            });

            console.log("Plan stored successfully");
            toast.success("Plan created successfully!");
        } catch (error) {
            toast.error("Failed to create plan. Please try again.");
            console.log("Error:", error)
        }
    }

    return (
        <div>
            <Navbar />
            <Toaster />
            <div className={`${outfit.className} px-10 lg:px-15 bg-gray-100`}>
                <div className="text-center pt-15">
                    <h1 className="text-4xl sm:text-6xl text-gray-700 font-medium mb-5">
                        Create Your Content Plan
                    </h1>
                    <p className="text-md sm:text-xl font-thin text-gray-500">
                        Choose how many days of content you need and we'll
                        <br className="sm:block hidden" /> {" "}
                        create a custom plan just for you!
                    </p>
                </div>
                <div className="flex lg:flex-row flex-col w-full lg:pt-20">
                    <img src="S(1).png" className="w-150 lg:-mt-30 mx-auto"></img>
                    <div className="self-center min-w-0 flex-1 max-w-[95%] md:max-w-[80%]">
                        <p className="text-gray-700 text-2xl">Days of Content</p>
                        <div className="cursor-pointer border px-2 my-4 border-gray-400 overflow-x-auto min-w-0 max-w-full flex flex-row rounded-lg">
                            {
                                Array.from({ length: totalDays }, (_, i) => (
                                    <div
                                        onClick={() => {
                                            setNoOfDays(i + 1)
                                            console.log(noOfDays)
                                            setSelectedDay(i)
                                        }}
                                        className={`p-4 shrink-0 text-xl  ${selectedDay === i ? "bg-[#81c4ee] text-white" : "text-gray-500"}`}
                                        key={i}>
                                        {i + 1}
                                    </div>
                                ))
                            }
                        </div>
                        <textarea
                            onChange={(e) => {
                                setUserPrompt(e.target.value);
                            }}
                            placeholder="Describe the type of content you want to generate..."
                            className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#81c4ee] resize-none"
                            rows={4}
                        />
                        <button
                            onClick={() => {
                                generatePlan()
                            }}
                            className="cursor-pointer py-2 px-3 bg-[#81c4ee] text-white text-md lg:text-xl rounded-lg mt-4">
                            GENERATE CONTENT PLAN
                        </button>
                    </div>
                </div>
                <SimpleCalendar />
            </div>
            <Footer />

        </div>
    )
}