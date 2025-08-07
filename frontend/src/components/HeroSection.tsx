// import FilterCategory from "./FilterCategory";
// import SearchArticles from "./SearchArticles";

const HeroSection = async ({ query }: { query?: string }) => {
  return (
    <section className="relative h-[624px] md:h-[500px] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url(/img-background.jpg)] bg-cover bg-center bg-no-repeat"></div>

      {/*Blue Overlay */}
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(37, 99, 235, 0.86)" }}></div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center text-white">
        <div className="b-purple-600 h-full w-full max-w-[730px] flex flex-col items-center justify-center gap-10">
          {/* Title */}
          <div className="w-full max-w-[24.5rem] md:max-w-full mx-auto flex flex-col items-center justify-center gap-4 text-center mt-20">
            <span className="text-sm md:text-base font-bold">Blog Eigen</span>

            <h1 className="text-4xl md:text-5xl font-medium">The Journal : Design Resources, Interviews, and Industry News</h1>

            <p className="text-xl md:text-2xl font-normal">Your daily dose of design insights!</p>
          </div>

          {/* Filler & Search */}
          <div className="w-full max-w-[24.5rem] md:max-w-[38rem] mx-auto">
            <div className="p-[10px] md:py-2 md:px-3 rounded-[12px] h-[130px] md:h-[70px] flex flex-col justify-center   md:flex-row items-center gap-[8px]">
              {/* <FilterCategory caategories={categories} /> */}

              {/* Search */}
              {/* <SearchArticles query={query} /> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
