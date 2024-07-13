import { RootState } from "@/app/redux/store";
import { paddingForpage } from "@/app/sizeDeclare";
import { getDressInterface, reviewInterface } from "@/types/declareTypes";
import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function Reviews({ postReview }: { postReview: getDressInterface }) {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const [starRating, setStarRating] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [hoverStarRating, setHoverStarRating] = useState<number>(0);
  const [reviewData, setReviewData] = useState<reviewInterface>({
    userId: "",
    userImage: "",
    userName: "",
    postId: "",
    rating: 0,
    comment: "",
  });

  const filledStarSrc = "/icons/ystar.png";
  const emptyStarSrc = "/icons/star.png";

  const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewData({ ...reviewData, [e.target.id]: e.target.value });
  };

  const handleReviewSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUploading(true);

    const updatedReview = {
      ...reviewData,
      rating: starRating,
      postId: postReview._id,
      userName: currentUser?.userName,
      userImage: currentUser?.avatar,
      userId: "",
    };
    console.log(updatedReview);

    // try {
    //   const res = await axios.post(`${baseUrl.baseUrl}/api/review/postreview`, updatedReview);
    //   if (res.status === 200) {
    //     toast.success("Review posted successfully!");
    //     setIsUploading(false);
    //     window.location.reload();
    //   }
    // } catch (error: any) {
    //   setIsUploading(false);
    //   if (axios.isAxiosError(error)) {
    //     toast.error(error.response?.data?.message || "An error occurred during review submission");
    //   } else {
    //     toast.error("An unknown error occurred during review submission");
    //   }
    // }
  };

  return (
    <div className={`${paddingForpage} ${postReview.category === 'male' ? "bg-blue-50":"bg-orange-50"} `}>
      <div className="mb-10">
        <p className="font-semibold font-serif text-2xl my-2">Give your opinion</p>
        <form onSubmit={handleReviewSubmit}>
          <div className="flex flex-col gap-6">
            <div className="flex gap-1">
              {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                  <img
                    key={index}
                    src={ratingValue <= (hoverStarRating || starRating) ? filledStarSrc : emptyStarSrc}
                    alt={`${ratingValue} star`}
                    className="cursor-pointer h-6"
                    onClick={() => setStarRating(ratingValue)}
                    onMouseEnter={() => setHoverStarRating(ratingValue)}
                    onMouseLeave={() => setHoverStarRating(0)}
                  />
                );
              })}
            </div>
            <textarea
              className="w-full sm:w-6/12 font-Quicksand border-2 border-gray-500 p-4 rounded-md outline-none"
              id="comment"
              placeholder="Write your review"
              rows={4}
              onChange={handleReviewChange}
            />
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className={`bg-black text-white font-Lora text-base sm:text-xl px-8 py-2 rounded-md hover:bg-gray-200 hover:text-black font-semibold outline outline-1 ${isUploading ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={isUploading}
            >
              {isUploading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
