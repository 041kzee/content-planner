"use client";
import { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import { updateDoc, doc, getDocs, collection, onSnapshot } from "firebase/firestore";
import { Outfit } from "next/font/google";
const outfit = Outfit({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-outfit",
});

export default function SimpleCalendar() {
    const [plans, setPlans] = useState([]);
    const [selectedContent, setSelectedContent] = useState(null);


    async function updateDayStatus(newStatus) {
        if (!selectedContent || plans.length === 0) return;

        const latestPlan = plans[plans.length - 1];

        try {
            const updatedDays = latestPlan.days.map((day) => {
                if (day.day === selectedContent.day) {
                    return { ...day, status: newStatus };
                }
                return day;
            });

            await updateDoc(doc(db, "plans", latestPlan.id), {
                days: updatedDays,
            });

            setSelectedContent({
                ...selectedContent,
                status: newStatus,
            });

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "plans"), (snapshot) => {
            const plansArray = [];

            snapshot.forEach((doc) => {
                plansArray.push({
                    id: doc.id,
                    ...doc.data()
                });
            });

            setPlans(plansArray);
        });

        return () => unsubscribe();
    }, []);


    function getPlanDayIndex(date) {
        if (plans.length === 0) return null;

        const latestPlan = plans[plans.length - 1];

        let startDate;

        if (latestPlan.startDate?.toDate) {
            startDate = latestPlan.startDate.toDate();
        } else {
            startDate = new Date(latestPlan.startDate);
        }

        startDate.setHours(0, 0, 0, 0);
        date.setHours(0, 0, 0, 0);

        const diffDays = Math.floor(
            (date - startDate) / (1000 * 60 * 60 * 24)
        );

        if (diffDays >= 0 && diffDays < latestPlan.days.length) {
            return diffDays;
        }

        return null;
    }

    const today = new Date();

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const options = [];
    for (let y = 2024; y <= 2028; y++) {
        for (let m = 0; m < 12; m++) {
            options.push({
                label: `${months[m]} ${y}`,
                month: m,
                year: y
            });
        }
    }

    const [selected, setSelected] = useState({
        month: today.getMonth(),
        year: today.getFullYear()
    });

    const totalDays = new Date(
        selected.year,
        selected.month + 1,
        0
    ).getDate();

    const firstDayIndex = new Date(
        selected.year,
        selected.month,
        1
    ).getDay();

    const emptySlots = Array.from({ length: firstDayIndex });

    return (
        <div className="flex lg:flex-row flex-col gap-20 py-20">
            <div className={`${outfit.className} rounded-xl shadow-2xl w-full`}>
                <div className="bg-gray-200 p-4 rounded-t-xl">
                    <select
                        className="border p-2 bg-[#81c4ee] border-none text-gray-600 text-lg"
                        value={`${selected.month}-${selected.year}`}
                        onChange={(e) => {
                            const [m, y] = e.target.value.split("-");
                            setSelected({
                                month: Number(m),
                                year: Number(y)
                            });
                        }}
                    >
                        {options.map((opt, index) => (
                            <option
                                key={index}
                                value={`${opt.month}-${opt.year}`}
                            >
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col m-6 bg-gray-200 rounded-xl">
                    <div className="flex text-lg text-gray-400">
                        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                            <div key={day} className={`flex-1 border bg-white border-gray-100 p-3 text-center`}>
                                {day}
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-wrap">

                        {emptySlots.map((_, i) => (
                            <div key={"empty-" + i} className="w-[14.28%] border bg-white border-gray-100 h-16"></div>
                        ))}

                        {Array.from({ length: totalDays }, (_, i) => {
                            const currentDate = new Date(selected.year, selected.month, i + 1);
                            const planIndex = getPlanDayIndex(currentDate);

                            let bgColor = "bg-white";

                            if (planIndex !== null) {
                                const latestPlan = plans[plans.length - 1];
                                const dayData = latestPlan.days[planIndex];

                                if (dayData.status === "completed") {
                                    bgColor = "bg-[#22C55E]";
                                } else if (dayData.status === "skipped") {
                                    bgColor = "bg-[#EF4444]";
                                } else {
                                    bgColor = "bg-[#81c4ee]";
                                }
                            }
                            return (
                                <div
                                    onClick={() => {
                                        const clickedDate = new Date(selected.year, selected.month, i + 1);
                                        const planIndex = getPlanDayIndex(clickedDate);

                                        if (planIndex !== null) {
                                            const latestPlan = plans[plans.length - 1];
                                            setSelectedContent(latestPlan.days[planIndex]);
                                        } else {
                                            setSelectedContent(null);
                                        }
                                    }}
                                    key={i}
                                    className={`w-[14.28%] border ${bgColor} border-gray-100 h-16 flex items-center justify-center`}
                                >
                                    {i + 1}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            {plans.length === 0 ? (
                <div className="w-full flex justify-center items-center bg-white border border-gray-200 rounded-2xl p-8 text-center">
                    <div className="">
                        <h3 className="text-2xl font-semibold text-gray-600">
                            No Plans Available
                        </h3>
                        <p className="text-gray-400 mt-2">
                            Create a plan to see it appear here.
                        </p>
                    </div>
                </div>
            ) : selectedContent ? (
                <div className="w-full bg-white border border-gray-200 rounded-2xl p-8">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-3xl font-semibold text-gray-700">
                            Day {selectedContent.day}
                        </h3>
                        <span className="text-md px-4 py-1 rounded-full bg-[#81c4ee] text-white">
                            {selectedContent.type}
                        </span>
                    </div>
                    <div className="space-y-5">
                        <div>
                            <p className="text-sm text-gray-400 mb-1">Content Idea</p>
                            <p className="text-gray-700">
                                {selectedContent.idea}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-400 mb-1">Caption</p>
                            <p className="text-gray-700">
                                {selectedContent.caption}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-row gap-4 mt-4">
                        <button
                            onClick={() => {
                                updateDayStatus("completed")
                            }}
                            className="cursor-pointer py-2 px-3 bg-[#22C55E] text-white text-md rounded-lg mt-4">
                            COMPLETED
                        </button>
                        <button
                            onClick={() => {
                                updateDayStatus("skipped")
                            }}
                            className="cursor-pointer py-2 px-3 bg-[#EF4444] text-white text-md rounded-lg mt-4">
                            SKIPPED
                        </button>
                    </div>
                </div>
            ) : (
                <div className="w-full flex justify-center items-center bg-white border border-gray-200 rounded-2xl p-8 text-center">
                    <div className="">
                        <h3 className="text-2xl font-semibold text-gray-600">
                            No Plans Available
                        </h3>
                        <p className="text-gray-400 mt-2">
                            Select a planned day to see details.
                        </p>
                    </div>
                </div>
            )}

        </div>
    );
}
