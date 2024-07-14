import { RootState } from "@/app/redux/store";
import { paddingForpage } from "@/app/sizeDeclare";
import {
   getDressInterface,
   getReviewInterface,
   reviewInterface,
} from "@/types/declareTypes";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function Reviews({
   postReview,
}: {
   postReview: getDressInterface;
}) {
   const currentUser = useSelector(
      (state: RootState) => state.user.currentUser
   );
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
   const [getReviews, setGetReviews] = useState<getReviewInterface[]>([]);

   const filledStarSrc = "/icons/ystar.png";
   const emptyStarSrc = "/icons/star.png";

   const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setReviewData({ ...reviewData, [e.target.id]: e.target.value });
   };

   const handleReviewSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const updatedReview = {
         ...reviewData,
         rating: starRating,
         postId: postReview._id,
         userName: currentUser?.userName,
         userImage: currentUser?.avatar,
         userId: currentUser?._id,
      };

      try {
         setIsUploading(true);
         const res = await axios.post("/api/review", updatedReview);
         if (res.status === 200) {
            setIsUploading(false);
            setReviewData({
               userId: "",
               userImage: "",
               userName: "",
               postId: "",
               rating: 0,
               comment: "",
            });
            setStarRating(0);
            fetchReviews();
         }
      } catch (error: any) {
         setIsUploading(false);
         if (axios.isAxiosError(error)) {
            toast.error(
               error.response?.data?.message ||
                  "An error occurred during review submission"
            );
         } else {
            toast.error("An unknown error occurred during review submission");
         }
      }
   };

   const fetchReviews = async () => {
      try {
         const res = await axios.get(`/api/review/${postReview._id}`);
         if (res.status === 200) {
            setGetReviews(res.data.reviews);
         }
      } catch (error) {
         console.log("Error fetching reviews: ", error);
      }
   };

   const generateStars = (rating: number) => {
      const stars = [];
      for (let i = 0; i < 5; i++) {
         stars.push(
            <img
               key={i}
               src={i < rating ? filledStarSrc : emptyStarSrc}
               alt="Star"
               className="h-5"
            />
         );
      }
      return stars;
   };

   const handleDeleteReview = async (reviewId: string) => {
      try {
         const res = await axios.delete(`/api/review/${reviewId}`);
         if (res.status === 200) {
            fetchReviews();
         }
      } catch (error) {
         console.log("Error deleting review: ", error);
      }
   };

   useEffect(() => {
      fetchReviews();
   }, [postReview]);

   return (
      <div
         className={`${paddingForpage} ${
            postReview.category === "male" ? "bg-blue-50" : "bg-orange-50"
         }`}
      >
         <div className="mb-10">
            <p className="font-semibold font-serif text-2xl my-2">
               Give your opinion
            </p>
            <form onSubmit={handleReviewSubmit}>
               <div className="flex flex-col gap-6">
                  <div className="flex gap-1">
                     {[...Array(5)].map((_, index) => {
                        const ratingValue = index + 1;
                        return (
                           <img
                              key={index}
                              src={
                                 ratingValue <= (hoverStarRating || starRating)
                                    ? filledStarSrc
                                    : emptyStarSrc
                              }
                              alt={`${ratingValue} star`}
                              className="cursor-pointer h-6"
                              onClick={() => setStarRating(ratingValue)}
                              onMouseEnter={() =>
                                 setHoverStarRating(ratingValue)
                              }
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
                     value={reviewData.comment}
                     onChange={handleReviewChange}
                  />
               </div>
               <div className="mt-4">
                  <button
                     type="submit"
                     className={`bg-black text-white font-Lora text-base sm:text-xl px-8 py-2 rounded-md hover:bg-gray-700  font-semibold outline outline-1  ${
                        isUploading ? " cursor-not-allowed " : ""
                     }`}
                     onClick={
                        currentUser
                           ? undefined
                           : (e) => {
                                e.preventDefault();
                                toast.info("Login first");
                            }
                     }
                     disabled={isUploading}
                  >
                     {isUploading ? (
                        <div className="flex justify-center items-center px-3 py-2">
                           <span className="loader"></span>
                        </div>
                     ) : (
                        "Submit"
                     )}
                  </button>
               </div>
            </form>
         </div>

         <div>
            {getReviews.length > 0 ? (
               <div className="flex flex-col mt-10">
                  {getReviews.map((review) => (
                     <div
                        className="flex flex-col gap-3 border-t-2 py-4"
                        key={review._id}
                     >
                        <div className="flex flex-row justify-start items-center gap-2">
                           <img
                              className="h-12 lg:h-14 aspect-square rounded-full object-cover"
                              src={review.userImage}
                              alt={review.userName}
                           />
                           <div className="font-Lora">
                              <p className="font-medium text-base lg:text-xl">
                                 {review.userName}
                              </p>
                              <p className="opacity-80 text-xs">
                                 {moment(review.createdAt).format("MMM Do YY")}
                              </p>
                           </div>
                        </div>
                        <div className="flex gap-1">
                           {generateStars(review.rating)}
                        </div>
                        <div>
                           <p className="font-Quicksand text-base">
                              {review.comment}
                           </p>
                           {currentUser?.userName === review.userName && (
                              <button
                                 onClick={() => handleDeleteReview(review._id)}
                                 className="font-Quicksand font-medium text-red-500 text-sm sm:text-base"
                              >
                                 Delete
                              </button>
                           )}
                        </div>
                     </div>
                  ))}
               </div>
            ) : (
               <div>No reviews!</div>
            )}
         </div>
      </div>
   );
}
