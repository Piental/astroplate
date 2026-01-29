import React, { useState, useEffect } from "react";

export interface CategoryOption {
  slug: string;
  label: string;
}

interface PortfolioFiltersProps {
  categoryOptions: CategoryOption[];
  activeCategory?: string;
  allLabel?: string;
}

const PortfolioFilters: React.FC<PortfolioFiltersProps> = ({
  categoryOptions,
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

  const handleFilterClick = (categorySlug: string) => {
    setActive(categorySlug);

    // Update URL query param
    const url = new URL(window.location.href);
    if (categorySlug === "all") {
      url.searchParams.delete("category");
    } else {
      url.searchParams.set("category", categorySlug);
    }
    window.history.pushState({}, "", url);

    // Filter projects
    filterProjects(categorySlug);
  };

  const filterProjects = (categorySlug: string) => {
    const items = document.querySelectorAll(".portfolio-item");

    items.forEach((item) => {
      const card = item.querySelector("[data-categories]");
      if (!card) return;

      const categoriesAttr = card.getAttribute("data-categories");
      if (!categoriesAttr) return;

      const itemCategories = JSON.parse(categoriesAttr);

      if (categorySlug === "all" || itemCategories.includes(categorySlug)) {
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
      {categoryOptions.map(({ slug, label }) => (
        <button
          key={slug}
          onClick={() => handleFilterClick(slug)}
          aria-pressed={active === slug}
          className={`btn btn-sm ${
            active === slug
              ? "btn-primary"
              : "btn-outline-primary"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default PortfolioFilters;
