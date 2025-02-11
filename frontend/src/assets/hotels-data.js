export const hotelsData = [
    {
      name: "Hotel Sunshine",
      phoneNo: "1234567890",
      isValid: true,
      userId: new mongoose.Types.ObjectId(),
      rooms: [
        {
          roomNumber: "101",
          roomType: "Single",
          price: 100,
          menu: [
            { foodName: "Burger", price: 5 },
            { foodName: "Pizza", price: 8 },
            { foodName: "Pasta", price: 7 }
          ]
        },
        {
          roomNumber: "102",
          roomType: "Double",
          price: 150,
          menu: [
            { foodName: "Steak", price: 15 },
            { foodName: "Salad", price: 5 },
            { foodName: "Fries", price: 3 }
          ]
        }
      ]
    },
    {
      name: "Hotel Moonlight",
      phoneNo: "2345678901",
      isValid: true,
      userId: new mongoose.Types.ObjectId(),
      rooms: [
        {
          roomNumber: "201",
          roomType: "Suite",
          price: 250,
          menu: [
            { foodName: "Sushi", price: 20 },
            { foodName: "Ramen", price: 12 },
            { foodName: "Dumplings", price: 10 }
          ]
        },
        {
          roomNumber: "202",
          roomType: "Penthouse",
          price: 500,
          menu: [
            { foodName: "Lobster", price: 40 },
            { foodName: "Champagne", price: 30 },
            { foodName: "Caviar", price: 50 }
          ]
        }
      ]
    },
    {
      name: "Hotel Oceanview",
      phoneNo: "3456789012",
      isValid: true,
      userId: new mongoose.Types.ObjectId(),
      rooms: [
        {
          roomNumber: "301",
          roomType: "Single",
          price: 120,
          menu: [
            { foodName: "Sandwich", price: 6 },
            { foodName: "Juice", price: 4 },
            { foodName: "Cake", price: 5 }
          ]
        },
        {
          roomNumber: "302",
          roomType: "Double",
          price: 180,
          menu: [
            { foodName: "Chicken Wings", price: 8 },
            { foodName: "Caesar Salad", price: 6 },
            { foodName: "Coleslaw", price: 4 }
          ]
        }
      ]
    },
    {
      name: "Hotel Skyline",
      phoneNo: "4567890123",
      isValid: true,
      userId: new mongoose.Types.ObjectId(),
      rooms: [
        {
          roomNumber: "401",
          roomType: "Suite",
          price: 350,
          menu: [
            { foodName: "Grilled Salmon", price: 25 },
            { foodName: "Mashed Potatoes", price: 6 },
            { foodName: "Green Beans", price: 4 }
          ]
        },
        {
          roomNumber: "402",
          roomType: "Penthouse",
          price: 700,
          menu: [
            { foodName: "Filet Mignon", price: 40 },
            { foodName: "Tiramisu", price: 8 },
            { foodName: "Wine", price: 20 }
          ]
        }
      ]
    },
    {
      name: "Hotel Riverside",
      phoneNo: "5678901234",
      isValid: true,
      userId: new mongoose.Types.ObjectId(),
      rooms: [
        {
          roomNumber: "501",
          roomType: "Single",
          price: 80,
          menu: [
            { foodName: "French Toast", price: 7 },
            { foodName: "Coffee", price: 3 },
            { foodName: "Croissant", price: 4 }
          ]
        },
        {
          roomNumber: "502",
          roomType: "Double",
          price: 130,
          menu: [
            { foodName: "Omelette", price: 6 },
            { foodName: "Pancakes", price: 8 },
            { foodName: "Hot Chocolate", price: 5 }
          ]
        }
      ]
    }
  ];