import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { categories, Category } from "@/data/artworks";

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
  artworkCounts: Record<string, number>;
}

const CategoryFilter = ({ selectedCategory, onCategoryChange, artworkCounts }: CategoryFilterProps) => {
  const { language, t } = useLanguage();

  return (
    <div className="flex flex-wrap gap-3 justify-center mb-8">
      <Button
        variant={selectedCategory === "all" ? "default" : "outline"}
        size="sm"
        onClick={() => onCategoryChange("all")}
        className="rounded-full"
      >
        {t("allCategories")}
        <Badge variant="secondary" className="ml-2">
          {Object.values(artworkCounts).reduce((sum, count) => sum + count, 0)}
        </Badge>
      </Button>
      
      {categories.map((category: Category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? "default" : "outline"}
          size="sm"
          onClick={() => onCategoryChange(category.id)}
          className="rounded-full gap-2"
        >
          <span className="text-lg">{category.icon}</span>
          {category.name[language]}
          <Badge variant="secondary" className="ml-1">
            {artworkCounts[category.id] || 0}
          </Badge>
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter;

