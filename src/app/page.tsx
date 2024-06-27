import Link from "next/link";

export default function Home() {
   return (
      <main>
         <div className="">
            <div className=" w-full aspect-[9/12] sm:aspect-[15/11] md:aspect-[15/10] lg:aspect-[15/7] object-cover overflow-hidden relative">
               <img
                  className=" w-full h-full object-cover object-center sm:object-top "
                  src="/images/main.jpg"
                  alt=""
               />
               <div className=" absolute top-0 bg-gradient-to-r from-black  to-transparent w-full aspect-[9/12] sm:aspect-[15/11] md:aspect-[15/10] lg:aspect-[15/7] text-gray-300 flex flex-col gap-8 sm:gap-8 px-6 py-12 sm:px-6 sm:py-8 xl:gap-16 md:px-10 lg:px-24  xl:py-18">
                  <div className="  sm:w-1/2 text-5xl sm:text-5xl md:text-6xl xl:text-7xl font-serif font-semibold flex flex-col sm:gap-4 xl:gap-8">
                     <span>Experience</span>
                     <span>Comfort &</span>
                     <span>Style</span>
                  </div>
                  <div className=" sm:text-base xl:text-xl w-11/12 sm:w-2/4 xl:w-2/5">
                     <p>Our online store offers a wide selection of premium quality hoodies that are designed to keep you comfortable and stylish. Browse our collection and find the perfect hoodie that suits your style and needs.</p>
                  </div>
                  <div className=" font-lora flex gap-10">
                     <button className=" bg-gray-300 text-black px-10 sm:px-12 py-2 sm:py-3 text-xl font-semibold border-[1px] border-white hover:text-white hover:bg-black "><Link href="/male">Male</Link></button>
                     <button className=" bg-gray-300 text-black px-10 sm:px-12 py-2 sm:py-3 text-xl font-semibold border-[1px] border-white hover:text-white hover:bg-black"><Link href="/male">Female</Link></button>
                  </div>
               </div>
            </div>
         </div>
      </main>
   );
}
