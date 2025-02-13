import { Table, TableHead, TableHeader,TableRow,TableBody ,TableCell } from "@/components/ui/table";
import { motion,AnimatePresence } from "framer-motion";
import { Trash2,Pencil } from "lucide-react";
import { Button } from "../ui/button";


export default function RoomTable({SortIcon,handleSort,setSelectedRoom,setIsDeleteModalOpen,setIsEditModalOpen,paginatedRooms}){
    console.log(paginatedRooms);
    
    return (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-md border"
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort('name')}
              >
                Room Name <SortIcon field="name" />
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort('date')}
              >
                Date <SortIcon field="date" />
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence>
              {paginatedRooms.map((room) => (
                <motion.tr
                  key={room.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="hover:bg-gray-100"
                >
                  <TableCell>{room.name}</TableCell>
                  <TableCell>{room.date}</TableCell>
                  <TableCell className="space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedRoom(room);
                        setIsEditModalOpen(true);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedRoom(room);
                        setIsDeleteModalOpen(true);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </motion.tr>
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>
      </motion.div>
    )
}