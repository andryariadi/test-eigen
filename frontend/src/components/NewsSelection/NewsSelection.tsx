"use client";

import { newsSelection } from "@/libs/constants";
import { useRouter, useSearchParams } from "next/navigation";

const NewsSelection = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedNews = searchParams.get("news_selection") || "";

  const handleClick = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (selectedNews === value) {
      params.delete("news_selection");
    } else {
      params.set("news_selection", value);
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="px-4 md:px-10 lg:px-20 xl:px-32 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {newsSelection.map((item, index) => (
          <div
            key={index}
            className={`
            border 
            ${selectedNews === item ? "border-blue-500 bg-blue-100" : "border-slate-600 hover:border-blue-200 hover:bg-blue-200"} 
            transition-all duration-300 
            w-max px-3 py-1 rounded-full
            cursor-pointer
          `}
            onClick={() => handleClick(item)}
          >
            <button
              className={`
              text-sm font-normal 
              ${selectedNews === item ? "text-blue-800 font-medium" : "text-slate-600 hover:text-blue-900"} 
              transition-all duration-300
              capitalize
            `}
            >
              {item.replace("-", " ")} {/* Mengubah "top-headlines" menjadi "top headlines" */}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsSelection;
