"use client";

import { useState, useEffect } from "react";
import { headlinesCategories } from "@/libs/constants";
import { Select } from "antd";
import { useRouter, useSearchParams } from "next/navigation";

const FilterCategory = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [localValue, setLocalValue] = useState<string | undefined>(undefined);

  useEffect(() => {
    setLocalValue(searchParams.get("category") || undefined);
  }, [searchParams]);

  const handleChange = (value: string) => {
    setLocalValue(value);

    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("category", value);
    } else {
      params.delete("category");
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="w-full md:max-w-[180px]">
      <Select
        showSearch
        allowClear
        size="large"
        className="w-full"
        placeholder="Select category"
        filterOption={(input, option) => (typeof option?.label === "string" ? option.label.toLowerCase() : (option?.value ?? "").toLowerCase()).includes(input.toLowerCase())}
        options={headlinesCategories.map((item) => ({
          label: item.charAt(0).toUpperCase() + item.slice(1),
          value: item,
        }))}
        value={localValue}
        onChange={handleChange}
      />
    </div>
  );
};

export default FilterCategory;
