import LowerHeroSection from "@/components/LowerHeroSection";
import { paddingForpage } from "./sizeDeclare";
import Image from "next/image";
import Link from "next/link";
import Sale from "@/components/Sale";
import FooterCard from "@/components/FooterCard";

export default function Home() {
   return (
      <main>
         <div className="">
            <div className=" w-full aspect-[9/12] sm:aspect-[15/11] md:aspect-[15/10] lg:aspect-[15/7] object-cover overflow-hidden relative">
               <Image
                  className="w-full h-full object-cover object-right sm:object-center"
                  src="/images/mainmain2.svg"
                  alt="hero image"
                  width={600}
                  height={600}
                  quality={80} 
               />
               <div className={`absolute top-0 bg-gradient-to-r from-black  to-transparent w-full aspect-[9/12] sm:aspect-[15/11] md:aspect-[15/10] lg:aspect-[15/7] text-gray-300 flex flex-col gap-8 ${paddingForpage}`}>
                  <div className="  sm:w-1/2 text-5xl sm:text-5xl md:text-6xl xl:text-7xl font-serif font-semibold flex flex-col sm:gap-4 xl:gap-8">
                     <span>Experience</span>
                     <span>Comfort &</span>
                     <span>Style</span>
                  </div>
                  <div className=" sm:text-base xl:text-xl w-11/12 sm:w-2/4 xl:w-2/5">
                     <p>
                        Our online store offers a wide selection of premium
                        quality clothes that are designed to keep you
                        comfortable and stylish. Browse our collection and find
                        the perfect clothes that suits your style and needs.
                     </p>
                  </div>
                  <div className=" font-lora flex gap-10">
                     <button className=" bg-gray-300 text-black px-10 sm:px-12 py-2 sm:py-3 text-xl font-semibold border-[1px] border-white hover:text-white hover:bg-black ">
                        <Link href="/male">Male</Link>
                     </button>
                     <button className=" bg-gray-300 text-black px-10 sm:px-12 py-2 sm:py-3 text-xl font-semibold border-[1px] border-white hover:text-white hover:bg-black">
                        <Link href="/male">Female</Link>
                     </button>
                  </div>
               </div>
            </div>

            {/* model section */}
            <div className=" mt-16 md:mt-28">
               <LowerHeroSection/>
            </div>

            {/* sale section */}
            <div className=" mt-16 md:mt-28">
               <Sale/>
            </div>

            {/* footercard */}
            <div className=" mt-12 md:mt-20">
               <FooterCard/>
            </div>


         </div>
      </main>
   );
}
