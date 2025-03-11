import { motion } from "framer-motion";
import { ArrowUpDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

export default function HotelOrderTable({ currentItems, requestSort, itemVariants }) {
  return (
    <div className="hidden md:block w-full">
      <div className="rounded-md border w-full overflow-auto">
        <Table  containerClassname="" className=' overflow-y-auto w-full'>
          <TableHeader>
            <TableRow className="bg-gray-50 hover:bg-gray-50">
              <TableHead className="whitespace-pre-wrap">
                Restaurant Name
              </TableHead>
              <TableHead 
                className="whitespace-pre-wrap cursor-pointer"
                onClick={() => requestSort('dishName')}
              >
                <div className="flex items-center">
                  Dish Name
                  <ArrowUpDown size={16} className="ml-1 text-gray-400 hover:text-gray-600" />
                </div>
              </TableHead>
              <TableHead 
                className="whitespace-pre-wrap cursor-pointer"
                onClick={() => requestSort('roomName')}
              >
                <div className="flex items-center">
                  Room Name
                  <ArrowUpDown size={16} className="ml-1 text-gray-400 hover:text-gray-600" />
                </div>
              </TableHead>
              <TableHead 
                className="whitespace-pre-wrap cursor-pointer"
                onClick={() => requestSort('value')}
              >
                <div className="flex items-center">
                  Value (₹)
                  <ArrowUpDown size={16} className="ml-1 text-gray-400 hover:text-gray-600" />
                </div>
              </TableHead>
              <TableHead 
                className="whitespace-pre-wrap cursor-pointer"
                onClick={() => requestSort('date')}
              >
                <div className="flex items-center">
                  Date & Time
                  <ArrowUpDown size={16} className="ml-1 text-gray-400 hover:text-gray-600" />
                </div>
              </TableHead>
              <TableHead className="whitespace-pre-wrap">
                Order Status
              </TableHead>
              {/* <TableHead className="whitespace-pre-wrap">
                Payment Status
              </TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.map((order, index) => (
              <motion.tr 
                key={order.id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                custom={index}
                className="hover:bg-gray-50 transition-colors"
              >
                <TableCell className="whitespace-pre-wrap font-medium">
                  <span className="font-mono">{order.resturantName}</span>
                </TableCell>
                <TableCell className="whitespace-pre-wrap text-gray-500">
                  {order.dishName}
                </TableCell>
                <TableCell className="whitespace-pre-wrap text-gray-500">
                  {order.roomName}
                </TableCell>
                <TableCell className="whitespace-pre-wrap text-gray-500">
                  ₹{order.value.toLocaleString()}
                </TableCell>
                <TableCell className="whitespace-pre-wrap text-gray-500">
                  <div>{order.date}</div>
                  <div className="text-xs text-gray-400">{order.time}</div>
                </TableCell>
                <TableCell className="whitespace-pre-wrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${order.orderStatus === 'Delivered' ? 'bg-green-100 text-green-800' : 
                      order.orderStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                      order.orderStatus === 'Confirm' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
                  >
                    {order.orderStatus}
                  </span>
                </TableCell>
                {/* <TableCell className="whitespace-pre-wrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${order.paymentStatus === 'completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                  >
                    {order.paymentStatus}
                  </span>
                </TableCell> */}
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}