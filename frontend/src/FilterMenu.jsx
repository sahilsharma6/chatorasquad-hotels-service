import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Search, SlidersHorizontal, X } from 'lucide-react';

const FilterMenu = ({
  isOpen,
  onClose,
  selectedCuisine,
  setSelectedCuisine,
  selectedSort,
  setSelectedSort,
  searchQuery,
  setSearchQuery,
  priceRange,
  setPriceRange,
  dietaryFilters,
  setDietaryFilters,
}) => {
  const cuisineTypes = ["All", "Indian", "Chinese", "Italian", "Mexican", "Thai"];
  const sortOptions = ["Recommended", "Price: Low to High", "Price: High to Low", "Rating"];
  const dietaryOptions = ["Vegetarian", "Vegan", "Gluten-Free", "Spicy"];

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", damping: 25 }}
      className="fixed bottom-0 left-0 right-0 bg-white rounded-t-xl shadow-xl z-50 max-h-[80vh] overflow-y-auto"
    >
      <div className="sticky top-0 bg-white p-4 border-b">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Filters & Sort</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Search Bar */}
        <div className="mt-4 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search dishes..."
            className="pl-10"
          />
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Cuisine Type */}
        <div>
          <Label className="text-sm font-medium mb-2 block">Cuisine Type</Label>
          <div className="flex flex-wrap gap-2">
            {cuisineTypes.map((cuisine) => (
              <Badge
                key={cuisine}
                variant={selectedCuisine === cuisine ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedCuisine(cuisine)}
              >
                {cuisine}
              </Badge>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <Label className="text-sm font-medium mb-2 block">
            Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
          </Label>
          <div className="space-y-2">
            <input
              type="range"
              min="0"
              max="2000"
              step="100"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="w-full"
            />
          </div>
        </div>

        {/* Dietary Preferences */}
        <div>
          <Label className="text-sm font-medium mb-2 block">Dietary Preferences</Label>
          <div className="flex flex-wrap gap-2">
            {dietaryOptions.map((option) => (
              <Badge
                key={option}
                variant={dietaryFilters.includes(option) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => {
                  setDietaryFilters(prev =>
                    prev.includes(option)
                      ? prev.filter(item => item !== option)
                      : [...prev, option]
                  );
                }}
              >
                {option}
              </Badge>
            ))}
          </div>
        </div>

        {/* Sort Options */}
        <div>
          <Label className="text-sm font-medium mb-2 block">Sort By</Label>
          <div className="space-y-2">
            {sortOptions.map((option) => (
              <Button
                key={option}
                variant={selectedSort === option ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => setSelectedSort(option)}
              >
                {option}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Apply Filters Button */}
      <div className="sticky bottom-0 p-4 bg-white border-t">
        <Button className="w-full" onClick={onClose}>
          Apply Filters
        </Button>
      </div>
    </motion.div>
  );
};

export default FilterMenu;