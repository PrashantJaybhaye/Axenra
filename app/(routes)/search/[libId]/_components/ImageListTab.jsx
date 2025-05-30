import Image from "next/image";
import React from "react";

function ImageListTab({ chat }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 mt-6">
      {chat?.searchResult.map((item, index) => {
        const isValidSrc = item?.thumbnail && item.thumbnail.trim() !== "";

        if (!isValidSrc) return null;

        // Add local state to handle image error
        const [imgError, setImgError] = React.useState(false);

        return (
          <div
            key={index}
            className="bg-accent rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-200 transform hover:scale-[1.02] cursor-pointer flex items-center justify-center"
            style={{ minHeight: "12rem" }}
          >
            {!imgError ? (
              <Image
                src={item.thumbnail}
                alt={`Image ${index + 1}`}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
                className="object-cover w-full h-48"
                onError={() => setImgError(true)}
              />
            ) : (
              <span className="text-center text-sm text-gray-500 w-[80%]">
                Source image is unreachable
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default ImageListTab;
