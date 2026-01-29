import React, { useState, useEffect } from "react";

interface PortfolioFiltersProps {
  categories: string[];
  activeCategory?: string;
  allLabel?: string;
}

const PortfolioFilters: React.FC<PortfolioFiltersProps> = ({
  categories,
  activeCategory = "all",
  allLabel = "All",
}) => {
  const [active, setActive] = useState(activeCategory);

  useEffect(() => {
    // Read category from URL on mount
    const params = new URLSearchParams(window.location.search);
    const categoryParam = params.get("category");
    if (categoryParam) {
      setActive(categoryParam);
      filterProjects(categoryParam);
    }
  }, []);

  const handleFilterClick = (category: string) => {
    setActive(category);

    // Update URL query param
    const url = new URL(window.location.href);
    if (category === "all") {
      url.searchParams.delete("category");
    } else {
      url.searchParams.set("category", category);
    }
    window.history.pushState({}, "", url);

    // Filter projects
    filterProjects(category);
  };

  const filterProjects = (category: string) => {
    const items = document.querySelectorAll(".portfolio-item");

    items.forEach((item) => {
      const card = item.querySelector("[data-categories]");
      if (!card) return;

      const categoriesAttr = card.getAttribute("data-categories");
      if (!categoriesAttr) return;

      const itemCategories = JSON.parse(categoriesAttr);

      if (category === "all" || itemCategories.includes(category)) {
        (item as HTMLElement).style.display = "";
      } else {
        (item as HTMLElement).style.display = "none";
      }
    });
  };

  return (
    <div className="mb-8 flex flex-wrap gap-3 justify-center">
      <button
        onClick={() => handleFilterClick("all")}
        aria-pressed={active === "all"}
        className={`btn btn-sm ${
          active === "all"
            ? "btn-primary"
            : "btn-outline-primary"
        }`}
      >
        {allLabel}
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleFilterClick(category)}
          aria-pressed={active === category}
          className={`btn btn-sm ${
            active === category
              ? "btn-primary"
              : "btn-outline-primary"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default PortfolioFilters;
