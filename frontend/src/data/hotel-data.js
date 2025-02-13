export const hotels = [
  {
    id: "h1",
    name: "Taj Palace Hotel",
    phoneNo: "9876543210",
    protect_password: "aa", // Individual hotel protect_password
    isValid: true,
    userId: "user123",
    room: [
      {
        roomId: "r1",
        roomNumber: "101",
        type: "Deluxe",
        price: 5000
      },
      {
        roomId: "r2",
        roomNumber: "102",
        type: "Suite",
        price: 8000
      }
    ],
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01")
  },
  {
    id: "h2",
    name: "Grand Hyatt",
    phoneNo: "9876543211",
    protect_password: "hyatt@456",
    isValid: true,
    userId: "user124",
    room: [
      {
        roomId: "r3",
        roomNumber: "201",
        type: "Standard",
        price: 3000
      },
      {
        roomId: "r4",
        roomNumber: "202",
        type: "Deluxe",
        price: 5000
      }
    ],
    createdAt: new Date("2024-01-02"),
    updatedAt: new Date("2024-01-02")
  },
  {
    id: "h3",
    name: "Marriott Resort",
    phoneNo: "9876543212",
    protect_password: "marriott@789",
    isValid: true,
    userId: "user125",
    room: [
      {
        roomId: "r5",
        roomNumber: "301",
        type: "Suite",
        price: 10000
      },
      {
        roomId: "r6",
        roomNumber: "302",
        type: "Presidential Suite",
        price: 15000
      }
    ],
    createdAt: new Date("2024-01-03"),
    updatedAt: new Date("2024-01-03")
  },
  {
    id: "h4",
    name: "Holiday Inn",
    phoneNo: "9876543213",
    protect_password: "holiday@101",
    isValid: false,
    userId: "user126",
    room: [
      {
        roomId: "r7",
        roomNumber: "401",
        type: "Standard",
        price: 2500
      }
    ],
    createdAt: new Date("2024-01-04"),
    updatedAt: new Date("2024-01-04")
  },
  {
    id: "h5",
    name: "The Oberoi",
    phoneNo: "9876543214",
    protect_password: "oberoi@555",
    isValid: true,
    userId: "user127",
    room: [
      {
        roomId: "r8",
        roomNumber: "501",
        type: "Luxury Suite",
        price: 12000
      },
      {
        roomId: "r9",
        roomNumber: "502",
        type: "Ocean View Suite",
        price: 14000
      }
    ],
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-05")
  }
];
