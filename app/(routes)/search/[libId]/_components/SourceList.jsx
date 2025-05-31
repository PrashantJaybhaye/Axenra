import React from "react";
import Image from "next/image";

function SourceList({ webResult, loadingSearch }) {
  return (
    <div className="flex gap-2 flex-wrap mt-5">
      {webResult?.slice(0, 5).map((item, index) => (
        <div
          key={index}
          className="p-3 rounded-lg  bg-accent hover:bg-accent-foreground sm:w-[200px] w-[180px] cursor-pointer"
          onClick={() => window.open(item?.url, "_blank")}
        >
          <div className="flex gap-2 items-center">
            <Image src={item?.img} alt={''} width={20} height={20} />
            <h2 className="text-xs">{item?.long_namme}</h2>
          </div>
          <h2
            className="line-clamp-2 text-xs max-sm:hidden"
            dangerouslySetInnerHTML={{ __html: item?.description }}
          ></h2>
        </div>
      ))}
    </div>
  );
}

export default SourceList;
