import React, { useState } from 'react';
import { Plus, Search, ChevronUp, ChevronDown, Pencil, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import RoomTable from '../components/Hotel/RoomTable';
import { DeleteModal, EditRoomModal } from '@/components/Hotel/EditDeleteModal';

const Room = () => {
  const [rooms, setRooms] = useState([
    { id: 1, name: 'Conference Room A', date: '2025-02-12' },
    { id: 2, name: 'Meeting Room B', date: '2025-02-13' },
    { id: 3, name: 'Board Room', date: '2025-02-14' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [newRoom, setNewRoom] = useState({ name: '' });

  const itemsPerPage = 5;

  // Format date function
  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  // Sort and filter rooms
  const filteredRooms = rooms
    .filter(room => 
      room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.date.includes(searchTerm)
    )
    .sort((a, b) => {
      const modifier = sortDirection === 'asc' ? 1 : -1;
      return a[sortField] > b[sortField] ? modifier : -modifier;
    });

  // Pagination
  const totalPages = Math.ceil(filteredRooms.length / itemsPerPage);
  const paginatedRooms = filteredRooms.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleAdd = () => {
    const newId = Math.max(...rooms.map(room => room.id)) + 1;
    const currentDate = formatDate(new Date());
    setRooms([...rooms, { 
      ...newRoom, 
      id: newId,
      date: currentDate
    }]);
    setNewRoom({ name: '' });
    setIsAddModalOpen(false);
  };

  const handleEdit = () => {
    setRooms(rooms.map(room => 
      room.id === selectedRoom.id ? selectedRoom : room
    ));
    setIsEditModalOpen(false);
  };

  const handleDelete = () => {
    setRooms(rooms.filter(room => room.id !== selectedRoom.id));
    setIsDeleteModalOpen(false);
  };

  const SortIcon = ({ field }) => (
    <span className="ml-2 inline-block">
      {sortField === field ? (
        sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
      ) : (
        <ChevronUp className="h-4 w-4 text-gray-300" />
      )}
    </span>
  );

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative">
          <Search className="absolute left-2 top-3.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search rooms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 py-6"
          />
        </div>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-orange-500 hover:bg-orange-600">
              <Plus className="mr-2 h-4 w-4" /> Add Room
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Room</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 ">
              <Input
              className="py-6"
                placeholder="Room Name"
                value={newRoom.name}
                onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
                
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
              <Button className="bg-orange-500 hover:bg-orange-600" onClick={handleAdd}>Add</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

    <RoomTable SortIcon={SortIcon} handleSort={handleSort}  setSelectedRoom={setSelectedRoom} setIsDeleteModalOpen={setIsDeleteModalOpen} setIsEditModalOpen={setIsEditModalOpen} paginatedRooms={paginatedRooms} />

      <div className="flex justify-center space-x-2">
        <Button
          variant="outline"
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="py-2">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>

      {/* Edit Modal */}
      <EditRoomModal selectedRoom={selectedRoom} setIsEditModalOpen={setIsEditModalOpen} setSelectedRoom={setSelectedRoom} handleEdit={handleEdit} isEditModalOpen={isEditModalOpen}/>
      <DeleteModal selectedRoom={selectedRoom} setIsDeleteModalOpen={setIsDeleteModalOpen} isDeleteModalOpen={isDeleteModalOpen} handleDelete={handleDelete}  />
    </div>
  );
};

export default Room;