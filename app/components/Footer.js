import Image from "next/image";
export default function Footer() {
return (
    <div className="bg-black border-t border-gray-200 p-4 sm:p-8 md:p-12 lg:p-20">
      <div className="flex flex-row gap-3 sm:gap-5 items-center">
         <Image
                  src="/mainlogo.png"
                  alt="logo"
                  width={60}
                  height={60}
                  className="w-10 h-10 sm:w-14 sm:h-14 md:w-[60px] md:h-[60px]"
                />
                <h1 className="text-white text-xl sm:text-2xl md:text-3xl font-medium"> Influencer Hub</h1>
                </div>
 
<div className="flex flex-col md:flex-row justify-between gap-8 sm:gap-12 md:gap-16 mt-8 sm:mt-10">

<div className="flex flex-1 flex-col gap-3">
<h2 className="text-white text-base sm:text-lg font-semibold mb-2">Company</h2>
<a href="#" className="text-gray-400 hover:text-gray-200 transition text-sm sm:text-base">About Us</a>
<a href="#" className="text-gray-400 hover:text-gray-200 transition text-sm sm:text-base">Careers</a>
<a href="#" className="text-gray-400 hover:text-gray-200 transition text-sm sm:text-base">Contact</a>
<a href="#" className="text-gray-400 hover:text-gray-200 transition text-sm sm:text-base">Plan Ambassador</a>
<a href="#" className="text-gray-400 hover:text-gray-200 transition text-sm sm:text-base">Success Stories</a>
<a href="#" className="text-gray-400 hover:text-gray-200 transition text-sm sm:text-base">iOS</a>
<a href="#" className="text-gray-400 hover:text-gray-200 transition text-sm sm:text-base">Android</a>
</div>
<div className="flex flex-col gap-3">
<h2 className="text-white text-base sm:text-lg font-semibold mb-2">Resources</h2>
<a href="#" className="text-gray-400 hover:text-gray-200 transition text-sm sm:text-base">Blog</a>
<a href="#" className="text-gray-400 hover:text-gray-200 transition text-sm sm:text-base">Help Center</a>
<a href="#" className="text-gray-400 hover:text-gray-200 transition text-sm sm:text-base">Privacy Policy</a>
</div>
<div className="flex flex-col gap-3">
<h2 className="text-white text-base sm:text-lg font-semibold mb-2">Help</h2>
<a href="#" className="text-gray-400 hover:text-gray-200 transition text-sm sm:text-base">Help Center</a>
<a href="#" className="text-gray-400 hover:text-gray-200 transition text-sm sm:text-base">Password Reset</a>
<a href="#" className="text-gray-400 hover:text-gray-200 transition text-sm sm:text-base">FAQ</a>
<a href="#" className="text-gray-400 hover:text-gray-200 transition text-sm sm:text-base">Documentation</a> 
</div>


<div className="w-full bg-black py-8 sm:py-12 md:py-16 px-0 sm:px-4 md:px-6 flex justify-center">
  <div className="w-full max-w-4xl">

    <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-semibold mb-6 sm:mb-8">
      Join 1M+ Brands Growing Their Social Media
    </h2>

    <div className="flex flex-col md:flex-row gap-3 sm:gap-4 bg-[#111] p-2 sm:p-3 rounded-2xl sm:rounded-3xl items-center">
      <input
        type="email"
        placeholder="Email"
        className="w-full flex-1 bg-[#1a1a1a] text-white placeholder-gray-400 px-4 sm:px-6 py-4 sm:py-5 rounded-xl sm:rounded-2xl outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
      />

      <button
        type="button"
        className="w-full md:w-auto bg-[#91c7da] hover:bg-[#548293] text-white font-semibold px-8 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl transition-all duration-300 whitespace-nowrap text-sm sm:text-base"
      >
        JOIN NEWSLETTER
      </button>
    </div>

    <div className="flex items-start gap-2 sm:gap-3 mt-4 sm:mt-6 text-gray-400 text-xs sm:text-sm">
      <input
        type="checkbox"
        className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 sm:mt-1 accent-[#91c7da] flex-shrink-0"
      />
      <p>
        Yes, I would like to receive email marketing communication from InfluencerHub. I understand that I can unsubscribe at any time.
      </p>
    </div>

  </div>
</div>

</div>

<div className="w-full border-t border-gray-400 px-4 sm:px-8 py-4 text-center mt-6 sm:mt-8">
<p className="text-xs sm:text-sm text-gray-500 mb-2">
&copy; {new Date().getFullYear()} InfluencerHub. All rights reserved.</p>
<p className="text-xs sm:text-sm text-gray-500">Terms of Service | Privacy Policy</p>
     </div>
   
     </div> );
      }