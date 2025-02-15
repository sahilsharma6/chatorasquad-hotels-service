import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { toast } from '@/components/ui/use-toast';
import { Camera, Pencil, X } from 'lucide-react';
import apiClient from '@/services/ApiClient';

const ProfileEditor = ({user}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    age: user?.age,
    phoneNo: user?.phoneNo,
    gender: user?.gender
  });

  console.log(user);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        console.log(formData);
        
        const res=await apiClient.put('/hotel/update/'+user?.hotelId,formData)
        if(!res.data) return
        console.log(res.data);
         setIsEditing(false);
    } catch (error) {
        
    }
   
    // toast({
    //   title: "Profile Updated",
    //   description: "Your profile has been successfully updated.",
    // });
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full max-w-full mx-auto p-4"
    >
      <Card className="w-full">
        <CardHeader className="relative">
          <div className="flex items-center justify-center mb-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1474176857210-7287d38d27c6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow-lg">
                <Camera className="w-4 h-4 text-gray-600" />
              </div>
            </motion.div>
          </div>
          <motion.h2 
            variants={itemVariants}
            className="text-2xl font-bold text-center mb-4"
          >
            Profile Information
          </motion.h2>
          <Button
            variant="outline"
            onClick={() => setIsEditing(!isEditing)}
            className="absolute top-4 right-4"
          >
            {isEditing ? <X /> : <Pencil />}
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="py-6"
                  required
                />
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="py-6"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  required
                  className="py-6"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="phoneNo">Phone Number</Label>
                <Input
                  id="phoneNo"
                  name="phoneNo"
                  value={formData.phoneNo}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  required
                  className="py-6"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  name="age"
                  type="number"
                  value={formData.age}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  min="18"
                  className="py-6"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) => 
                    setFormData(prev => ({ ...prev, gender: value }))
                  }
                  disabled={!isEditing}
                  className="py-6"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent >
                    <SelectItem value="Male" >Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>
            </div>

            {isEditing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-end mt-6"
              >
                <Button type="submit" className="w-full md:w-auto bg-orange-500 hover:bg-orange-700"  >
                  Save Changes
                </Button>
              </motion.div>
            )}
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProfileEditor;