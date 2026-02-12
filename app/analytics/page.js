"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import PieChartComponent from "../components/PieChartComponent";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import { auth } from "../lib/firebase";

export default function Page() {
  return (
    <div>
      <Navbar />
      <Body />
    </div>
  );
}

function Body() {
  const [daysData, setDaysData] = useState([]);
  const [data, setData] = useState([
    { name: "Reels", value: 0 },
    { name: "Posts", value: 0 },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const querySnapshot = await getDocs(collection(db, "plans"));

      querySnapshot.forEach((doc) => {
        const docData = doc.data();

        if (docData.userId === user.uid) {
          setDaysData(docData.days || []);

          let reels = 0;
          let posts = 0;

          docData.days?.forEach((day) => {
            if (day.type === "Reel") reels++;
            if (day.type === "Post") posts++;
          });

          setData([
            { name: "Reels", value: reels },
            { name: "Posts", value: posts },
          ]);
        }
      });
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 px-10 py-10">
      <h1 className="text-4xl text-[#124253] font-bold text-center">
        Analytics
      </h1>

      <p className="text-center text-gray-400 text-lg mt-4">
        Track your content performance and consistency
      </p>

      <div className="flex justify-center mt-6 gap-20">
        <img src="analytics.png" className="h-160 w-100 -ml-50 -mt-20" />

        <div className="mt-10 flex justify-center ml-20 w-[600px]">
          <Calendar daysData={daysData} />
        </div>

        <div className="p-11 ml-6 items-center justify-center mt-18 border rounded-2xl shadow-md border-slate-200 w-[400px] bg-white">
          <h2 className="text-2xl font-bold mb-4 text-[#124253]">
            Content Distribution
          </h2>
          <PieChartComponent data={data} />
        </div>
      </div>
    </div>
  );
}

function Calendar({ daysData }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const daysOfWeek = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const generateCalendarDays = () => {
    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const calendarDays = generateCalendarDays();

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const getScore = (dayNumber) => {
    const found = daysData.find(
      (d) =>
        d.day === dayNumber &&
        new Date(d.date).getMonth() === month &&
        new Date(d.date).getFullYear() === year
    );

    return found ? 10 : 0; 
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-5 w-full max-w-3xl">
      
      <div className="flex items-center justify-between mb-6 border-b-2 border-slate-200 pb-4">
        <h2 className="text-[19px] font-semibold text-[#124253]">
          Calendar Consistency
        </h2>

        <div className="flex items-center gap-4">
          <button
            onClick={goToPreviousMonth}
            className="px-3 py-1 rounded-md bg-[#91c7da] hover:bg-[#a8c9d5] text-white"
          >
            ←
          </button>

          <span className="font-medium text-slate-700">
            {monthNames[month]} {year}
          </span>

          <button
            onClick={goToNextMonth}
            className="px-3 py-1 rounded-md bg-[#91c7da] hover:bg-[#a8c9d5] text-white"
          >
            →
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 mb-4 text-sm text-slate-500 font-medium border-b-2 border-slate-200 pb-2">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-4">
        {calendarDays.map((day, index) => (
          <div key={index} className="flex justify-center items-center h-12">
            {day && (
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold bg-[#b8d6e1] text-[#124253] hover:scale-105 transition">
                {getScore(day)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
