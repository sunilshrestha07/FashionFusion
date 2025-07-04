import { paddingForpage } from "@/app/sizeDeclare";
import { getDressInterface } from "@/types/declareTypes";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Sceleton from "./Sceleton";

export default function Recommendation({ Category }: { Category: string }) {
  const [recommendation, setRecommendation] = useState<getDressInterface[]>([]);

  const fetchData = async () => {
    const res = await fetch("/api/dress");
    const data = await res.json();
    const recommendationItem = data.dress.filter((item: getDressInterface) => item.category === Category);
    
    // Shuffle the array
    for (let i = recommendationItem.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [recommendationItem[i], recommendationItem[j]] = [recommendationItem[j], recommendationItem[i]];
    }

    setRecommendation(recommendationItem);
  };

  useEffect(() => {
    fetchData();
  }, [Category]);

  const filledStarSrc = "/icons/ystar.png";
  const emptyStarSrc = "/icons/star.png";

  const generateStars = (rating: number) => {
    const starCount = Math.floor(rating);
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Image
          width={20}
          height={20}
          key={i}
          src={i < starCount ? filledStarSrc : emptyStarSrc}
          alt="Star"
          className="h-4 aspect-square object-contain"
        />
      );
    }
    return stars;
  };

  if (!recommendation) {
    return <div>No product</div>;
  }

  return (
    <div className={Category === 'male' ? "bg-blue-50":"bg-orange-50"}>
      <div className={paddingForpage}>
        <div>
          <div className="text-2xl font-semibold font-serif">
            <p>Related Products</p>
          </div>
          <div className="my-10">
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-16">
              {recommendation.slice(0, 4).map((item) => (
                <div className="col-span-1 shadow-product rounded-lg" key={item._id}>
                  <Link href={`/dress/${item._id}`}>
                    <div className="w-full bg-gray-100 flex flex-col p-2 rounded-lg">
                      <div className="w-full aspect-[9/11] rounded-lg overflow-hidden">
                        <Image
                          className="w-full h-full object-cover object-top hover:scale-110 transition ease-in-out duration-300"
                          src={item.image}
                          alt={item.name}
                          width={400}
                          height={500}
                          quality={70}
                        />
                      </div>
                      <div className="font-semibold text-xl opacity-90 truncate mb-3 flex flex-col gap-1">
                        <p>{item.name}</p>
                        <div className="flex flex-col sm:flex-row justify-between">
                          <div className="flex">
                            <div className="flex gap-4 items-center">
                              <div className="flex gap-1">{generateStars(item.rating)}</div>
                              <p className="text-sm sm:text-xl">{item.rating}</p>
                            </div>
                          </div>
                          <p className="text-base sm:text-xl opacity-80">Rs: {item.price}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
