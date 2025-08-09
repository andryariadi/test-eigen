"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/libs/utils";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import { useState } from "react";

const SearchArticles = ({ query, placeholder = "Search articles..." }: { query?: string; action?: string; placeholder?: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(query || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());

    if (searchQuery.trim()) {
      params.set("query", searchQuery.trim());
    } else {
      params.delete("query");
    }

    // Reset pagination when searching
    // params.delete("page");

    router.push(`?${params.toString()}`);
  };

  const handleReset = () => {
    setSearchQuery("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("query");
    router.push(`?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="group relative search w-full flex items-center justify-center">
      <div className="relative w-full max-w-2xl">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={placeholder}
          className={cn("max-w-2xl w-full py-2 pl-11 bg-white rounded-[6px] outline-none text-slate-900 placeholder:text-sm placeholder-slate-400 transition-all duration-300")}
        />

        <div className={cn("absolute top-[8px] right-3")}>
          {searchQuery && (
            <button type="reset" onClick={handleReset}>
              <CloseOutlined size={24} style={{ color: "#BFAAB9" }} />
            </button>
          )}
        </div>

        <div className={cn("absolute top-[8px] left-3")}>
          <button data-testid="search-button" type="submit">
            <SearchOutlined size={24} style={{ color: "#BFAAB9" }} />
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchArticles;
