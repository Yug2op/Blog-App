import React from "react";
// import appwriteService from "../appwrite/config"; // No longer needed
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage, slug }) {
  return (
    <Link to={`/post/${slug}`} className="group block">
      <div className="w-full bg-gray-800 rounded-xl p-3 border border-gray-700 shadow-md transition-transform transform hover:scale-[1.02] hover:shadow-lg">
        
        {/* Image */}
        <div className="w-full flex justify-center mb-3">
          <img
            src={featuredImage} // Direct Cloudinary URL
            alt={title}
            className="rounded-lg object-cover w-full h-[160px] xs:h-[180px] sm:h-[200px] md:h-[220px] lg:h-[240px] xl:h-[260px]"
          />
        </div>

        {/* Title */}
        <div className="text-sm xs:text-base sm:text-lg md:text-xl font-semibold text-white group-hover:text-blue-400 transition-colors duration-200 truncate text-center">
          {title}
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
