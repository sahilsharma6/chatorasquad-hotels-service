// Menu categories with counts
export const menuCategories = [
    { id: 'value-meals', name: 'Value Meals', count: 4 },
    { id: 'special-combos', name: 'Special Combos', count: 6 },
    { id: 'starters', name: 'Starters', count: 4 },
    { id: 'main-course', name: 'Main Course', count: 31 },
    { id: 'seafood', name: 'Seafood', count: 4 },
    { id: 'breads', name: 'Breads', count: 7 },
    { id: 'rice-biryani', name: 'Rice and Biryani', count: 7 },
    { id: 'south-indian', name: 'South Indian', count: 4 },
    { id: 'fried-rice-noodles', name: 'Fried Rice and Noodles', count: 11 },
    { id: 'rolls', name: 'Rolls', count: 4 },
    { id: 'snacks', name: 'Snacks', count: 13 },
    { id: 'accompaniments', name: 'Accompaniments', count: 3 },
    { id: 'flash-sale', name: 'Flash Sale Combos', count: 3 },
    { id: 'dotd', name: 'Dotd', count: 1 }
  ];
  
  // Menu items organized by category
  export const menuItems = [
    // Value Meals
    {
      id: "value-meal-1",
      name: "Mini Thali",
      category: "value-meals",
      type: "Veg",
      sellingPrice: 199,
      discountedPrice: 169,
      description: "Dal, 2 Rotis, Rice, 1 Sabji, Raita, and Pickle",
      images: ["/images/menu/mini-thali.jpg"],
      isAvailable: true,
      rating: 4.5
    },
    
    // Rice and Biryani items
    {
      id: "biryani-1",
      name: "Veg Biryani",
      category: "rice-biryani",
      type: "Veg",
      sellingPrice: 249,
      discountedPrice: 0,
      description: "Fragrant basmati rice cooked with mixed vegetables and aromatic spices",
      images: ["/images/menu/veg-biryani.jpg"],
      isAvailable: true,
      rating: 4.3
    },
    {
      id: "biryani-2",
      name: "Chicken Biryani",
      category: "rice-biryani",
      type: "Non-Veg",
      sellingPrice: 299,
      discountedPrice: 0,
      description: "Classic Hyderabadi style chicken biryani made with premium basmati rice",
      images: ["/images/menu/chicken-biryani.jpg"],
      isAvailable: true,
      rating: 4.6
    },
  
    // Main Course items
    {
      id: "main-1",
      name: "Butter Chicken",
      category: "main-course",
      type: "Non-Veg",
      sellingPrice: 349,
      discountedPrice: 299,
      description: "Tender chicken pieces in rich, creamy tomato gravy",
      images: ["/images/menu/butter-chicken.jpg"],
      isAvailable: true,
      rating: 4.7
    },
    {
      id: "main-2",
      name: "Paneer Butter Masala",
      category: "main-course",
      type: "Veg",
      sellingPrice: 299,
      discountedPrice: 0,
      description: "Cottage cheese cubes in rich tomato-cashew gravy",
      images: ["/images/menu/paneer-butter-masala.jpg"],
      isAvailable: true,
      rating: 4.5
    },
  
    // South Indian items
    {
      id: "south-1",
      name: "Masala Dosa",
      category: "south-indian",
      type: "Veg",
      sellingPrice: 149,
      discountedPrice: 129,
      description: "Crispy rice crepe filled with spiced potato mixture, served with sambar and chutney",
      images: ["/images/menu/masala-dosa.jpg"],
      isAvailable: true,
      rating: 4.4
    },
  
    // Breads
    {
      id: "bread-1",
      name: "Butter Naan",
      category: "breads",
      type: "Veg",
      sellingPrice: 69,
      discountedPrice: 0,
      description: "Soft tandoor-baked flatbread brushed with butter",
      images: ["/images/menu/butter-naan.jpg"],
      isAvailable: true,
      rating: 4.3
    }
  ];