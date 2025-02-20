import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useAnimation } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Check, Download, ArrowRight } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"
import downloadInvoice from "./downloadInvoice"
import { useOrder } from "./Context/OrderContext"

const CheckoutModal = ({
  isOpen,
  onClose,
  orderData,
  customerInfo,
  setCustomerInfo,
  onSuccess,
  isOrderComplete,
  orderDetails,
  setOrderDetails,
}) => {
  const [isDragging, setIsDragging] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const sliderRef = useRef(null)
  const sliderControls = useAnimation()
  const { CreateOrder } = useOrder()
  const navigate = useNavigate()
  const { hotelName, roomName } = useParams();
  

  const handleCreateOrder = async () => {
    if (orderPlaced) return 
  
    setOrderPlaced(true)
    try {
      const finalOrderData = {
        hotelId: orderData.hotelId,
        roomId: orderData.roomId,
        cart: orderData.cart,
        name: customerInfo.name,
        phoneNo: customerInfo.phone,
      }
  
      const response = await CreateOrder(finalOrderData)
      setOrderDetails(response)
      onSuccess()
      
      // Wait a brief moment to show the success message
      setTimeout(() => {
        onClose()
        // Navigate to the orders page using the current URL parameters
        navigate(`/${hotelName}/${roomName}/orders`)
      }, 2000)
    } catch (error) {
      console.error("Error creating order:", error)
      setOrderPlaced(false)
    }
  }
  
  const handleDrag = (event, info) => {
    if (orderPlaced) return 
  
    const sliderWidth = sliderRef.current?.offsetWidth || 0
    const dragPercentage = (info.point.x / sliderWidth) * 100
    
    if (dragPercentage >= 90) {
      sliderControls.start({ x: sliderWidth - 56 })
      setIsDragging(false)
      handleCreateOrder()
    } else {
       setIsDragging(true)
    }
  }
  
  const handleDragEnd = (event, info) => {
    if (orderPlaced) return;
  
    const sliderWidth = sliderRef.current?.offsetWidth || 0;
    const dragPercentage = (info.point.x / sliderWidth) * 100;
  
    if (dragPercentage < 90) {
      sliderControls.start({ x: 0 });
    }
    setIsDragging(false);
  };
  
  useEffect(() => {
    if (!isOpen) {
      sliderControls.start({ x: 0 })
      setOrderPlaced(false)
    }
  }, [isOpen, sliderControls])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-w-[100vw] w-full h-[100vh] sm:h-auto p-0 sm:p-6 gap-0">
        <div className="h-full flex flex-col">
          <DialogHeader className="p-4 sm:p-0 border-b sm:border-none">
            <div className="flex items-center justify-between">
              <DialogTitle>{isOrderComplete ? "Order Confirmed!" : "Complete Your Order"}</DialogTitle>
            </div>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto p-4 sm:p-0">
            <AnimatePresence mode="wait">
              {!isOrderComplete ? (
                <motion.div 
                  key="checkout" 
                  className="space-y-6" 
                  initial={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                >
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="name">Name</Label>
                        <span className="text-sm text-gray-500">Optional</span>
                      </div>
                      <Input
                        id="name"
                        value={customerInfo.name}
                        onChange={(e) =>
                          setCustomerInfo((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        placeholder="Enter your name (optional)"
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="phone">Phone Number</Label>
                        <span className="text-sm text-gray-500">Optional</span>
                      </div>
                      <Input
                        id="phone"
                        value={customerInfo.phone}
                        onChange={(e) =>
                          setCustomerInfo((prev) => ({
                            ...prev,
                            phone: e.target.value,
                          }))
                        }
                        placeholder="Enter your phone number (optional)"
                        className="mt-1.5"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="block font-medium">Total Amount: ₹{orderData.totalAmount.toFixed(2)}</Label>
                    <div ref={sliderRef} className="relative h-16 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500 opacity-50" />
                      <motion.div
                        drag="x"
                        dragConstraints={sliderRef}
                        dragElastic={0.1}
                        dragMomentum={false}
                        onDrag={handleDrag}
                        onDragEnd={handleDragEnd}
                        animate={sliderControls}
                        className="absolute top-1 left-1 w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing"
                      >
                        <ArrowRight
                          className={`w-6 h-6 ${isDragging ? "text-orange-600" : "text-gray-400"} transition-colors`}
                        />
                      </motion.div>
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span className="text-sm font-medium text-gray-600">Slide to confirm order</span>
                      </div>
                      
                    </div>
                    
                  </div>
                  {/* <Button
                        className="rounded-full w-full cursor-pointer active:cursor-grabbing bg-orange-600"
                        onClick={handleCreateOrder}
                      >
                      create order
                      </Button> */}
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  className="space-y-6 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", duration: 0.5 }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.5 }}
                    className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center"
                  >
                    <Check className="w-8 h-8 text-orange-500" />
                  </motion.div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Thank you for your order!</h3>
                    {customerInfo.name && <p className="text-gray-600">Order for: {customerInfo.name}</p>}
                    <p className="text-gray-500">Your order will be delivered in 30-45 minutes</p>
                    <p className="text-sm font-medium">Order ID: {orderDetails?.orderId}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CheckoutModal