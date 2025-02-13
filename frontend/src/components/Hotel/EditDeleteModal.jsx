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
// import { Button } from "react-day-picker"
// import { Input } from "postcss"

const EditRoomModal =({isEditModalOpen,setSelectedRoom,selectedRoom,setIsEditModalOpen,handleEdit})=>{
    console.log(isEditModalOpen);
    
    return (
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Room</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
            className='py-6'
              placeholder="Room Name"
              value={selectedRoom?.name || ''}
              onChange={(e) => setSelectedRoom({ ...selectedRoom, name: e.target.value })}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
            <Button className="bg-orange-500 hover:bg-orange-600" onClick={handleEdit}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
}

const DeleteModal=({isDeleteModalOpen,setIsDeleteModalOpen,selectedRoom,handleDelete})=>{
    return(
        <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete {selectedRoom?.name}?</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
}

export {EditRoomModal,DeleteModal}