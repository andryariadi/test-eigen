"use client";

import Link from "next/link";
import { cn } from "@/libs/utils";
import { CloseOutlined } from "@ant-design/icons";

const SearchFormReset = () => {
  const reset = () => {
    const form = document.querySelector(".search") as HTMLFormElement;

    if (form) form.reset();
  };
  return (
    <button type="reset" onClick={reset}>
      <Link href="/" className="flex items-center justify-center w-full h-full">
        {/* <CircleX className={cn("text-slate-400 size-[24px]", { "size-[18px]": isAdmin })} /> */}
        <CloseOutlined size={24} style={{ color: "#BFAAB9" }} />
      </Link>
    </button>
  );
};

export default SearchFormReset;
