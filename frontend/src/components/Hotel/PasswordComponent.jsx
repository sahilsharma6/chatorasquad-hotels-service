import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Pencil, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import apiClient from '@/services/ApiClient';

const PasswordComponent = ({getPassword,id}) => {
  const [password, setPassword] = useState(getPassword);
  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleEdit =async () => {
    try {
         if (isEditing) {
      if (newPassword) {
         const res=await apiClient.post('/hotel/addpassword/'+id,{password:newPassword})
         if(!res.data) return
        setPassword(newPassword);
      }
      setNewPassword('');
    } else {
      setNewPassword(password);
    }
    setIsEditing(!isEditing);
    } catch (error) {
        
    }
   
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Update Password</h2>
      
      <div className="relative">
        <AnimatePresence mode="wait">
          {isEditing ? (
            <motion.div
              key="edit"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2"
            >
              <Input
                type={showPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="pr-20 py-6"
                placeholder="Enter new password"
                autoFocus
              />
              <Button 
                variant="ghost" 
                size="icon"
                onClick={toggleShowPassword}
                className="absolute right-10 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? <EyeOff className="h-8 w-8" /> : <Eye className="h-8 w-8" />}
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={toggleEdit}
                className="absolute right-0 top-1/2 transform -translate-y-1/2"
              >
                <Check className="h-8 w-8 text-green-500" />
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="display"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2"
            >
              <Input
                type="text"
                value={showPassword ? password : password.replace(/./g, '*')}
                readOnly
                className="pr-20 py-6"
              />
              <Button 
                variant="ghost" 
                size="icon"
                onClick={toggleShowPassword}
                className="absolute right-10 top-1/2 transform -translate-y-1/2"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </motion.div>
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={toggleEdit}
                className="absolute right-0 top-1/2 transform -translate-y-1/2"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Pencil className="h-5 w-5" />
                </motion.div>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-4 text-sm text-gray-500"
      >
        {isEditing ? 'Enter your new password' : 'Click the eye to show/hide password or pencil to edit'}
      </motion.div>
    </div>
  );
};

export default PasswordComponent;