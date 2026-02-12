"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import Navbar from "../components/Navbar";

export default function Page() {


  return (
    <div>
   
     <Navbar />

      <Body />
    </div>
  );
}



function Body() {
  return (
    <div className="min-h-screen bg-slate-50 px-10 py-10">
      <h1 className="text-4xl text-[#124253] font-bold text-center">
        Analytics
      </h1>
      <p className="text-center text-gray-400 text-lg mt-4">
        Track your content performance and consistency
      </p>

      <div className="mt-10 flex justify-center">
        <Calendar />
      </div>
    </div>
  );
}



function Calendar() {
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

  const getScore = () => Math.floor(Math.random() * 10);

  return (
    <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-5 w-full max-w-3xl">
      
      
      <div className="flex items-center justify-between mb-6 border-b-2 border-slate-200 pb-4">
        <h2 className="text-[19px] font-semibold text-[#124253]">
          Calendar Consistency
        </h2>

        <div className="flex items-center gap-4">
          <button
            onClick={goToPreviousMonth}
            className="px-3 py-1 rounded-md  bg-[#91c7da] hover:bg-[#a8c9d5] text-white"
          >
            ←
          </button>

          <span className="font-medium text-slate-700">
            {monthNames[month]} {year}
          </span>

          <button
            onClick={goToNextMonth}
            className="px-3 py-1 rounded-md  bg-[#91c7da] hover:bg-[#a8c9d5] text-white"
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
                {getScore()}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
