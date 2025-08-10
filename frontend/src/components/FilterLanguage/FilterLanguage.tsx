"use client";

import { useState, useEffect } from "react";
import { everythingLanguages } from "@/libs/constants";
import { Select } from "antd";
import { useRouter, useSearchParams } from "next/navigation";

const FilterLanguage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [localValue, setLocalValue] = useState<string | undefined>(undefined);

  useEffect(() => {
    setLocalValue(searchParams.get("language") || undefined);
  }, [searchParams]);

  const handleChange = (value: string) => {
    setLocalValue(value);

    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("language", value);
    } else {
      params.delete("language");
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="w-full md:max-w-[180px]">
      <Select
        showSearch
        allowClear
        size="large"
        variant="filled"
        className="w-full"
        placeholder="Select language"
        filterOption={(input, option) => (typeof option?.label === "string" ? option.label.toLowerCase() : (option?.value ?? "").toLowerCase()).includes(input.toLowerCase())}
        options={everythingLanguages.map((item) => ({
          label: item.charAt(0).toUpperCase() + item.slice(1),
          value: item,
        }))}
        value={localValue}
        onChange={handleChange}
      />
    </div>
  );
};

export default FilterLanguage;
