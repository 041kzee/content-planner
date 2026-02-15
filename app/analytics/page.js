"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import PieChartComponent from "../components/PieChartComponent";
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "../lib/firebase";
import Footer from "../components/Footer"
export default function AnalyticsPage() {
  return (
    <div>
      <Navbar />
      <AnalyticsBody />
       <Footer/>
    </div>
  );
}

function AnalyticsBody() {
  const [daysData, setDaysData] = useState([]);
  const [pieData, setPieData] = useState([
    { name: "Reels", value: 0 },
    { name: "Posts", value: 0 },
  ]);
useEffect(() => {
  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "plans"));

    let allDays = [];
    let reels = 0;
    let posts = 0;

    querySnapshot.forEach((doc) => {
      const docData = doc.data();
      const days = docData.days || [];

      days.forEach((day) => {
        allDays.push({
          ...day,
          startDate: docData.startDate?.toDate?.() || new Date(),
        });

        if (day.type?.toLowerCase() === "reel") reels++;
        if (day.type?.toLowerCase() === "post") posts++;
      });
    });

    setDaysData(allDays);

    setPieData([
      { name: "Reels", value: reels },
      { name: "Posts", value: posts },
    ]);
  };

  fetchData();
}, []);


  return (
    <div className="min-h-screen bg-slate-50 px-4 sm:px-10 py-10">
      <h1 className="text-4xl text-[#124253] font-bold text-center">
        Analytics
      </h1>
      <p className="text-center text-gray-400 text-lg mt-4">
        Track your content performance and consistency
      </p>

      <div className="flex flex-col lg:flex-row justify-center mt-6 -ml-20 gap-10 lg:gap-20 items-center">
        <img
          src="/analytics.png"
          alt="Analytics Graphic"
          className="w-full max-w-md lg:max-w-[400px] -mt-10 lg:-mt-20 "
        />

        <div className="mt-6 lg:mt-10 w-full lg:w-[600px]">
          <Calendar daysData={daysData} />
        </div>

        <div className="p-6 lg:p-11 w-full lg:w-[400px] mt-6 lg:mt-18 items-center justify-center border rounded-2xl shadow-md border-slate-200 bg-white">
          <h2 className="text-2xl font-bold mb-4 text-[#124253] text-center lg:text-left">
            Content Distribution
          </h2>
         <PieChartComponent data={pieData} />
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
    for (let i = 0; i < firstDayOfMonth; i++) days.push(null);
    for (let day = 1; day <= daysInMonth; day++) days.push(day);
    return days;
  };

  const calendarDays = generateCalendarDays();

  const goToPreviousMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const goToNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const getStatusColor = (dayNumber) => {
  const found = daysData.find((d) => {
    const startDate = new Date(d.startDate);
    const actualDate = new Date(startDate);
    actualDate.setDate(startDate.getDate() + (d.day - 1));

    return (
      actualDate.getDate() === dayNumber &&
      actualDate.getMonth() === month &&
      actualDate.getFullYear() === year
    );
  });

  if (!found) return "bg-gray-200 text-gray-500";

  if (found.status === "completed")
    return "bg-green-500 text-white";

  if (found.status === "skipped")
    return "bg-red-500 text-white";

  if (found.status === "not_completed")
    return "bg-blue-500 text-white";

  return "bg-gray-200 text-gray-500";
};


  return (
    <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-4 sm:p-13 w-full">
      <div className="flex flex-col sm:flex-row items-center sm:justify-between mb-4 sm:mb-6 border-b-2 border-slate-200 pb-4">
        <h2 className="text-[20px] font-semibold text-[#124253] mb-2 sm:mb-0">
          Calendar Consistency
        </h2>

        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={goToPreviousMonth}
            className="px-4 py-1 rounded-md bg-[#91c7da] hover:bg-[#a8c9d5] text-white"
          >
            ←
          </button>
          <span className="font-medium text-slate-700 text-sm sm:text-base">
            {monthNames[month]} {year}
          </span>
          <button
            onClick={goToNextMonth}
            className="px-4 py-1 rounded-md bg-[#91c7da] hover:bg-[#a8c9d5] text-white"
          >
            →
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 mb-4 text-xs sm:text-[16px] text-slate-500 font-medium border-b-2 border-slate-200 pb-4">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center">{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {calendarDays.map((day, index) => (
          <div key={index} className="flex justify-center items-center h-10 sm:h-12">
            {day && (
              <div
                className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold hover:scale-105 transition ${getStatusColor(day)}`}
              >
                {day}
              </div>
            )}
          </div>
        ))}
      </div>
     
    </div>
  );
}
