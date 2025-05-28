import Image from "next/image";
import React from "react";

function AnswerDisplay({ searchResult }) {
  const webResult = searchResult?.web?.results;
  return (
    <div>
      <div className="flex gap-2 flex-wrap mt-5">
        {webResult?.map((item, index) => (
          <div
            key={index}
            className="p-3 rounded-lg  bg-accent hover:bg-accent-foreground w-[200px] cursor-pointer"
            onClick={() => window.open(item?.profile?.url,'_blank')}
          >
            <div className="flex gap-2 items-center">
              <Image
                src={item?.profile?.img}
                alt={item?.profile?.name}
                width={20}
                height={20}
              />
              <h2 className="text-xs">{item?.profile?.long_name}</h2>
            </div>
            <h2 className="line-clamp-2 text-xs" dangerouslySetInnerHTML={{ __html: item?.description }}></h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AnswerDisplay;
