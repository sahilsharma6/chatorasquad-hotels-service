import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SearchFilter from '../components/Hotel/SearchFilter'
import HotelOrderTable from '../components/Hotel/HotelOrderTable';
import OrdersCard from '@/components/Hotel/OrdersCard';
import apiClient from '../services/ApiClient';

const HotelOrders= ()=>{
     // Sample data
  const initialOrders = [
    {
      id: '67a37edb93f167c2b7f4eeaa',
      dishName: 'Des French Fries',
      roomName: '301',
      hotelName: 'Grand Plaza',
      value: 578,
      date: '2025-02-05',
      time: '14:30',
      orderStatus: 'Delivered',
      paymentStatus: 'completed',
      customerName: 'Jatin Mehra',
      email: 'admin@example.com',
      phoneNo: '+91 9876543210',
      resturantName:'anc'
    },
    {
      id: '67a37edb93f167c2b7f4eeab',
      dishName: 'Dessert Brownies',
      roomName: '205',
      hotelName: 'Sunset Resort',
      value: 1398,
      date: '2025-02-05',
      time: '15:45',
      orderStatus: 'Delivered',
      paymentStatus: 'completed',
      customerName: 'Jatin Mehra',
      email: 'admin@example.com',
      phoneNo: '+91 9876543211',
      resturantName:'anc'
    },
    {
      id: '67a373e893f167c2b7f4e9f5',
      dishName: 'Desi Samosas with chutni',
      roomName: '102',
      hotelName: 'Royal Suites',
      value: 50,
      date: '2025-02-05',
      time: '12:15',
      orderStatus: 'Confirm',
      paymentStatus: 'failed',
      customerName: 'Jatin Mehra',
      email: 'admin@example.com',
      phoneNo: '+91 9876543212',
      resturantName:'anc'
    },
    {
      id: '67a37267a3f167c2b7f4e872',
      dishName: 'Des Spaghetti Aglio e Olio',
      roomName: '405',
      hotelName: 'Grand Plaza',
      value: 299,
      date: '2025-02-05',
      time: '16:30',
      orderStatus: 'Delivered',
      paymentStatus: 'completed',
      customerName: 'Jatin Mehra',
      email: 'admin@example.com',
      phoneNo: '+91 9876543213',
      resturantName:'anc'
    },
    {
      id: '67a3710a93f167c2b7f4e6d6',
      dishName: 'Dessert Tiramisu',
      roomName: '506',
      hotelName: 'Ocean View',
      value: 599,
      date: '2025-02-05',
      time: '18:00',
      orderStatus: 'Pending',
      paymentStatus: 'failed',
      customerName: 'Jatin Mehra',
      email: 'admin@example.com',
      phoneNo: '+91 9876543214',
      resturantName:'anc'
    },
    {
      id: '67a370a893f167c2b7f4e686',
      dishName: 'Desi Samosas with chutni',
      roomName: '201',
      hotelName: 'Royal Suites',
      value: 50,
      date: '2025-02-05',
      time: '13:45',
      orderStatus: 'Confirm',
      paymentStatus: 'failed',
      customerName: 'Jatin Mehra',
      email: 'admin@example.com',
      phoneNo: '+91 9876543215',
      resturantName:'anc'
    }
  ];

  const [orders, setOrders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(()=>{
    try {
      async function fetchHotelOrders(){
        const response = await apiClient.get('/hotel/get/orders');
        console.log(response.data);
        
        // setOrders(data);
      }
      fetchHotelOrders();
    } catch (error) {
      
    }
  },[])
  // Sort function
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Filtered and sorted orders
  const getFilteredAndSortedOrders = () => {
    let filteredOrders = [...orders];
    
    // Apply search filter
    if (searchTerm) {
      filteredOrders = filteredOrders.filter(order => 
        order.dishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.roomName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.hotelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.date.includes(searchTerm) ||
        order.time.includes(searchTerm) ||
        order.value.toString().includes(searchTerm) ||
        order.resturantName.toString().includes(searchTerm) 
      );
    }
    
    // Apply sorting
    if (sortConfig.key) {
      filteredOrders.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    
    return filteredOrders;
  };

  // Handle order status update
  const updateOrderStatus = (id, newStatus) => {
    setOrders(orders.map(order => 
      order.id === id ? {...order, orderStatus: newStatus} : order
    ));
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = getFilteredAndSortedOrders().slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(getFilteredAndSortedOrders().length / itemsPerPage);


  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-4">
      <div className="max-w-full mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
      
        
        {/* Search and Filter */}
       <SearchFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} indexOfFirstItem={indexOfFirstItem} indexOfLastItem={indexOfFirstItem} getFilteredAndSortedOrders={getFilteredAndSortedOrders} />
        
        {/* Desktop Table View */}
       <HotelOrderTable requestSort={requestSort} currentItems={currentItems} updateOrderStatus={updateOrderStatus} itemVariants={itemVariants} />
        
        {/* Mobile Card View */}
       <OrdersCard currentItems={currentItems} updateOrderStatus={updateOrderStatus} itemVariants={itemVariants} />
        
        {/* Pagination */}
        <div className="px-6 py-4 flex justify-between items-center border-t">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-md border ${currentPage === 1 
              ? 'text-gray-400 border-gray-200' 
              : 'text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            Previous
          </button>
          
          <div className="flex space-x-1">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`w-8 h-8 flex items-center justify-center rounded-md ${
                  currentPage === index + 1
                    ? 'bg-orange-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-md border ${currentPage === totalPages 
              ? 'text-gray-400 border-gray-200' 
              : 'text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
export default HotelOrders;
