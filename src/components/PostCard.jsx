import React from 'react';
import appwriteService from '../appwrite/config';
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`} className="group">
      <div className="w-full bg-gray-800 rounded-xl p-4 shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
        
        {/* Image */}
        <div className="w-full flex justify-center mb-4">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-lg object-cover w-full max-h-[200px] md:max-h-[250px] lg:max-h-[300px]"
          />
        </div>

        {/* Title */}
        <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-white group-hover:text-blue-400 transition-colors duration-200 overflow-hidden">
          {title}
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
