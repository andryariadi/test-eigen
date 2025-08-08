"use client";

import Link from "next/link";
import { CloseOutlined } from "@ant-design/icons";

const SearchFormReset = () => {
  const reset = () => {
    const form = document.querySelector(".search") as HTMLFormElement;

    if (form) form.reset();
  };
  return (
    <button type="reset" onClick={reset}>
      <Link data-testid="link" href="/" className="flex items-center justify-center w-full h-full">
        <CloseOutlined size={24} style={{ color: "#BFAAB9" }} />
      </Link>
    </button>
  );
};

export default SearchFormReset;
