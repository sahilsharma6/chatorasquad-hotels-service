import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export default function OrdersCard({ currentItems, itemVariants }) {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.05
      }
    }
  };
  
  return (
    <motion.div 
      className="md:hidden px-4 py-2 space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {currentItems.map((order, index) => (
        <motion.div 
          key={order.id}
          variants={itemVariants}
          custom={index}
        >
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-4 border-b border-gray-100">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">{order.dishName}</h3>
                    <p className="text-sm text-gray-600">
                      Room: {order.roomName}
                    </p>
                  </div>
                  <span className={`px-2 text-xs leading-5 font-semibold rounded-full
                    ${order.orderStatus === 'Delivered' ? 'bg-green-100 text-green-800' : 
                      order.orderStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                      order.orderStatus === 'Confirm' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
                  >
                    {order.orderStatus}
                  </span>
                </div>
              </div>
              <div className="px-4 py-2 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Restaurant Name:</span>
                  <span className="text-sm font-mono text-gray-900">{order.resturantName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Value:</span>
                  <span className="text-sm font-medium text-gray-900">₹{order.value.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Date & Time:</span>
                  <span className="text-sm text-gray-900">{order.date}, {order.time}</span>
                </div>
                {/* <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Payment:</span>
                  <span className={`text-sm font-medium ${order.paymentStatus === 'completed' ? 'text-green-600' : 'text-red-600'}`}>
                    {order.paymentStatus}
                  </span>
                </div> */}
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Phone:</span>
                  <span className="text-sm text-gray-900">{order.phoneNo}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}