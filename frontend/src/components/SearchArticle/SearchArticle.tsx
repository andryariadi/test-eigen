import Form from "next/form";
import { cn } from "@/libs/utils";
import SearchFormReset from "../SearchFormReset/SearchFormReset";
import { SearchOutlined } from "@ant-design/icons";

const SearchArticles = ({ query, action = "/", placeholder = "Search articles..." }: { query?: string; action?: string; placeholder?: string }) => {
  console.log({ query }, "<---query");

  return (
    <Form data-testid="form" action={action} scroll={false} className="group relative search w-full flex items-center justify-center">
      <div className="relative w-full max-w-2xl">
        <input
          type="text"
          name="query"
          defaultValue={query}
          placeholder={placeholder}
          className={cn("max-w-2xl w-full py-3 pl-11 bg-white rounded-[6px] outline-none text-slate-900 placeholder:text-sm placeholder-slate-400 placeholderopacity-50 transition-all duration-300")}
        />

        <div className={cn("absolute top-[12.5px] right-3")}>{query && <SearchFormReset />}</div>

        <div className={cn("absolute top-[12.5px] left-3")}>
          <button data-testid="search-button" type="submit">
            {/* <Search className={cn("text-slate-400 size-[24px]", { "size-[18px]": isAdmin })} /> */}
            <SearchOutlined size={24} style={{ color: "#BFAAB9" }} />
          </button>
        </div>
      </div>
    </Form>
  );
};

export default SearchArticles;
