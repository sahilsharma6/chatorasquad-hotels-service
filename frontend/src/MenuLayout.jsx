import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { ShoppingCart, Plus, Minus, Trash2, X, Search, ArrowLeft, ShieldAlert } from "lucide-react"
import { useRestaurant } from "./Context/ResturantContext"
import CheckoutModal from "./CheckoutModal"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import Cookies from "js-cookie";
import { Alert, AlertDescription } from "./components/ui/alert"
import { useHotel } from "./Context/HotelContext"
import { MenuItemSkeleton } from "./components/SketonLoadingForMenu/MenuItemSkeleton"
import { CategorySkeleton } from "./components/SketonLoadingForMenu/CategorySkeleton"
import ImageSlider from "./components/ImageSlider"


// Constants
const TAX_RATE = 0.18
const DELIVERY_FEE = 50

const MenuLayout = ({ isblock }) => {
    const { MenuItems, fetchAdminMenu, getImageUrl } = useRestaurant()
    const { hotelName, roomName } = useParams()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const { fetchHotelByName, HotelDetailsByName, fetchHotelRooms, Rooms } = useHotel();

    const [cart, setCart] = useState([])
    const [activeCategory, setActiveCategory] = useState("")
    const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false)
    const [customerInfo, setCustomerInfo] = useState({ name: "", phone: "" })
    const [isOrderComplete, setIsOrderComplete] = useState(false)
    const [orderDetails, setOrderDetails] = useState(null)
    const [isCartModalOpen, setIsCartModalOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [filteredItems, setFilteredItems] = useState([])
    const [isScrolling, setIsScrolling] = useState(false)
    const sectionRefs = useRef({})
    const [isVerified, setIsVerified] = useState(null);

    useEffect(() => {
        fetchHotelByName(hotelName);
    }, []);

    useEffect(() => {
        if (HotelDetailsByName?._id) {
            fetchHotelRooms(HotelDetailsByName._id);
        }
    }, [HotelDetailsByName?._id]);

    const currentRoom = Rooms.find((room) => room.room === roomName);

    const hotelId = HotelDetailsByName?._id;
    const RoomId = currentRoom?._id;


    useEffect(() => {
        console.log("Fetching menu...");
        fetchAdminMenu().catch(err => console.error("Fetch error:", err));
    }, []);

    const handleBack = () => {
        navigate(-1)
    }

    useEffect(() => {
        const storedToken = Cookies.get("hotel_auth_token");
        const urlToken = searchParams.get("verify");

        if (storedToken !== urlToken) {
            setIsVerified(false);
        } else {
            setIsVerified(true);
        }
    }, [navigate, searchParams, hotelName]);


    useEffect(() => {
        const savedCart = localStorage.getItem("foodCart")
        if (savedCart) setCart(JSON.parse(savedCart))
    }, [])

    useEffect(() => {
        localStorage.setItem("foodCart", JSON.stringify(cart))
    }, [cart])

    useEffect(() => {
        const handleScroll = () => {
            if (isScrolling) return

            const scrollPosition = window.scrollY
            const headerOffset = 100

            let currentCategory = MenuItems[0]?.name
            let minDistance = Number.POSITIVE_INFINITY

            MenuItems.forEach((category) => {
                const element = sectionRefs.current[category?.name]
                if (element) {
                    const rect = element.getBoundingClientRect()
                    const distance = Math.abs(rect.top - headerOffset)

                    if (distance < minDistance) {
                        minDistance = distance
                        currentCategory = category?.name
                    }
                }
            })

            setActiveCategory(currentCategory)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [isScrolling, MenuItems])

    useEffect(() => {
        const filtered = MenuItems?.flatMap(category => category?.items || [])
            .filter(item =>
                item?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item?.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        setFilteredItems(filtered);
    }, [searchTerm, MenuItems]);



    const addToCart = (item) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((cartItem) => cartItem._id === item?._id)
            if (existingItem) {
                return prevCart.map((cartItem) =>
                    cartItem._id === item?._id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
                )
            }
            return [...prevCart, { ...item, quantity: 1 }]
        })
    }

    const removeFromCart = (itemId) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item?._id === itemId)
            if (existingItem.quantity === 1) {
                return prevCart.filter((item) => item?._id !== itemId)
            }
            return prevCart.map((item) => (item?._id === itemId ? { ...item, quantity: item?.quantity - 1 } : item))
        })
    }

    const deleteFromCart = (itemId) => {
        setCart((prevCart) => prevCart.filter((item) => item?._id !== itemId))
    }

    const getItemQuantity = (itemId) => {
        const item = cart.find((cartItem) => cartItem._id === itemId)
        return item ? item?.quantity : 0
    }

    const getSubtotal = () => {
        return cart.reduce((total, item) => total + item.discountedPrice * item.quantity, 0)
    }

    const scrollToCategory = (categoryId) => {
        setIsScrolling(true)
        setActiveCategory(categoryId)

        const element = sectionRefs.current[categoryId]
        if (element) {
            const headerHeight = 170
            const rect = element.getBoundingClientRect()
            const scrollPosition = window.pageYOffset + rect.top - headerHeight

            window.scrollTo({
                top: scrollPosition,
                behavior: "smooth",
            })

            setTimeout(() => {
                setIsScrolling(false)
            }, 1000)
        }
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        })
    }

    const orderData = {
        cart: cart.map(item => ({
            itemId: item?._id,
            quantity: item?.quantity,
            price: item?.discountedPrice > 0 ? item?.discountedPrice : item?.discountedPrice,
            name: item?.name // Optional: if you need item name in the order details
        })),
        hotelId: hotelId,
        roomId: RoomId,
        totalAmount: getSubtotal()
    }

    //   console.log(filteredItems.filter((item) => item?.category));

    if (isblock) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-gray-600">This menu is under maintenance.</p>
            </div>
        );
    }

    if (isVerified === null) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-gray-600">Checking authentication...</p>
            </div>
        );
    }



    if (!isVerified) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <Card className="w-full max-w-md shadow-lg border border-red-200">
                        <CardHeader className="text-center">
                            <ShieldAlert className="w-12 h-12 text-red-500 mx-auto mb-2" />
                            <CardTitle className="text-red-600 text-lg">Access Denied</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center space-y-4">
                            <Alert variant="destructive">
                                <AlertDescription>
                                    You are not verified to access this page. Please enter the correct password to continue.
                                </AlertDescription>
                            </Alert>
                            <Button
                                className="w-full bg-red-500 hover:bg-red-600"
                                onClick={() => navigate(`/`)}
                            >
                                Go Back to Hotel Page
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        );
    }


    if (!MenuItems) {
        return (
            <div className="container mx-auto">
                <MenuItemSkeleton />

                <CategorySkeleton />
            </div>
        )
    }

    return (
        <div className="container mx-auto">

            <Button
                onClick={handleBack}
                variant="ghost"
                className="flex items-center gap-2 mt-4 mb-2 lg:mt-6 italic text-sm"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to Resturants
            </Button>
            <div className="text-3xl font-bold text-center lg:my-6 hidden lg:block">Chatora Squad / <span className="text-orange-700">Menu</span></div>
            <div className="px-4 lg:px-20 min-h-screen">
                {/* Search Bar */}
                <div className="mb-6 sticky -top-1 z-10 bg-white lg:backdrop-blur-md p-4 rounded-lg lg:shadow-md">
                    <div className="relative">
                        <Input
                            type="text"
                            placeholder="Search menu items..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 w-full"
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                </div>

                {/* Category Pills - Horizontal scrollable on mobile */}
                <div className="lg:hidden sticky top-16 z-10 -mx-4 px-4 py-2 bg-white shadow-sm">
                    <h1 className="mb-2 text-lg font-semibold">Menu</h1>
                    <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-2">
                        {MenuItems?.length === 0 ? (
                            <div className="flex gap-2 items-center">
                                <Skeleton className="h-8 w-40" />
                                <Skeleton className="h-8 w-40" />
                                <Skeleton className="h-8 w-40" />
                            </div>
                        ) : (
                            MenuItems?.map((category) => (
                                <Button
                                    key={category?._id}
                                    onClick={() => scrollToCategory(category?.name)}
                                    variant={activeCategory === category?.name ? "secondary" : "ghost"}
                                    className={`flex-shrink-0 whitespace-nowrap ${activeCategory === category?.name
                                        ? "bg-orange-100 text-orange-600 hover:bg-orange-200"
                                        : "hover:bg-gray-100"
                                        }`}
                                >
                                    {category?.name}
                                </Button>
                            ))
                        )}
                    </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden lg:flex flex-col lg:flex-row gap-6">
                    {/* Categories Sidebar */}
                    <div className="lg:w-1/5">
                        <div className="sticky top-24 bg-white p-4 border-r">
                            <h3 className="font-bold text-lg mb-4">Menu Categories</h3>
                            {MenuItems.map((category) => (
                                <motion.div
                                    key={category?._id}
                                    onClick={() => scrollToCategory(category?.name)}
                                    className={`cursor-pointer py-2 px-3 rounded-md transition-colors duration-200 ${activeCategory === category?.name ? "bg-orange-100 text-orange-600" : "hover:bg-gray-50"
                                        }`}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <span className="font-medium">{category?.name}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Menu Items Section */}
                    <div className="lg:w-1/2">
                        {MenuItems?.map((category) => (
                            <div key={category._id} ref={(el) => (sectionRefs.current[category.name] = el)} className="mb-8">
                                <h2 className="text-2xl font-bold mb-4">{category.name}</h2>
                                <div className="grid gap-6">
                                    <AnimatePresence>
                                        {filteredItems
                                            ?.filter((item) => item.Cuisine === category.name)
                                            .map((item) => (
                                                <motion.div
                                                    key={item._id}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -20 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="w-full"
                                                >
                                                    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                                                        <CardContent className="p-4">
                                                            <div className="flex flex-col sm:flex-row gap-4 items-start">
                                                                {/* <img
                                                                    src={import.meta.env.VITE_API_URL + item?.images[0] || "/no-image-food-placeholder.webp"}
                                                                    alt={item.name}
                                                                    className="w-full sm:w-24 h-40 sm:h-24 rounded-lg object-cover"
                                                                /> */}
                                                                 <ImageSlider images={item?.images} />
                                                                <div className="flex-1 w-full">
                                                                    <div className="flex justify-between items-start">
                                                                        <h3 className="font-semibold text-lg sm:text-xl">{item.name}</h3>
                                                                        <span className="font-semibold text-gray-700">₹{item.discountedPrice}</span>
                                                                    </div>
                                                                    <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                                                                    <div className="mt-4">
                                                                        {getItemQuantity(item._id) > 0 ? (
                                                                            <div className="flex items-center gap-2">
                                                                                <Button
                                                                                    size="icon"
                                                                                    variant="outline"
                                                                                    onClick={() => removeFromCart(item._id)}
                                                                                    className="rounded-full"
                                                                                >
                                                                                    <Minus className="h-4 w-4" />
                                                                                </Button>
                                                                                <span className="font-semibold">{getItemQuantity(item._id)}</span>
                                                                                <Button
                                                                                    size="icon"
                                                                                    variant="outline"
                                                                                    onClick={() => addToCart(item)}
                                                                                    className="rounded-full"
                                                                                >
                                                                                    <Plus className="h-4 w-4" />
                                                                                </Button>
                                                                            </div>
                                                                        ) : (
                                                                            <Button
                                                                                onClick={() => addToCart(item)}
                                                                                className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white"
                                                                            >
                                                                                Add to Cart
                                                                            </Button>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </motion.div>
                                            ))}
                                    </AnimatePresence>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Cart Section */}
                    <div className="lg:w-1/3">
                        <Card className="sticky top-24">
                            <CardContent className="p-6">
                                <h3 className="text-2xl font-bold mb-4">Your Cart</h3>
                                {cart.length === 0 ? (
                                    <div className="text-center py-8">
                                        <ShoppingCart className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                                        <p className="text-gray-500">Your cart is empty</p>
                                    </div>
                                ) : (
                                    <>
                                        <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                                            {cart.map((item) => (
                                                <motion.div
                                                    key={item?._id}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: 20 }}
                                                    className="flex justify-between items-center"
                                                >
                                                    <div className="flex-1">
                                                        <h4 className="font-semibold">{item?.name}</h4>
                                                        <div className="flex items-center gap-2">
                                                            <Button size="icon" variant="ghost" onClick={() => removeFromCart(item?._id)}>
                                                                <Minus className="h-4 w-4" />
                                                            </Button>
                                                            <span>{item?.quantity}</span>
                                                            <Button size="icon" variant="ghost" onClick={() => addToCart(item)}>
                                                                <Plus className="h-4 w-4" />
                                                            </Button>
                                                            <Button size="icon" variant="ghost" onClick={() => deleteFromCart(item?._id)}>
                                                                <Trash2 className="h-4 w-4 text-red-500" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-semibold">
                                                            ₹{(item?.discountedPrice) * item?.quantity}
                                                        </p>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                        <div className="border-t pt-4 space-y-2">
                                            <div className="flex justify-between font-bold text-lg">
                                                <span>Total</span>
                                                <span>₹{getSubtotal().toFixed(2)}</span>
                                            </div>
                                        </div>
                                        <Button
                                            className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white"
                                            onClick={() => setIsCheckoutModalOpen(true)}
                                            disabled={cart.length === 0}
                                        >
                                            Proceed to Checkout
                                        </Button>
                                    </>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Mobile Layout */}
                <div className="lg:hidden mt-5">
                    {/* Menu Items Grid */}
                    <div className="grid gap-4 mb-20">
                        {MenuItems.map((category) => (
                            <div key={category?._id} ref={(el) => (sectionRefs.current[category?.name] = el)} className="mb-8">
                                <h2 className="text-xl font-bold mb-4">{category?.name}</h2>
                                <div className="grid gap-4">
                                    {filteredItems
                                        ?.filter((item) => item?.Cuisine === category?.name)
                                        .map((item) => (
                                            <Card key={item?._id} className="overflow-hidden">
                                                <CardContent className="p-4">
                                                    <div className="flex flex-col gap-4">
                                                        {/* <img
                                                            src={getLogoUrl(item?.images[0]) || "/no-image-food-placeholder.webp"}
                                                            alt={item?.name}
                                                            className="rounded-lg object-cover"
                                                        /> */}
                                                        <div className="w-full">

                                                         <ImageSlider images={item?.images} />
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="flex justify-between items-start">
                                                                <h3 className="font-semibold">{item?.name}</h3>
                                                                <span className="font-semibold">₹{item?.discountedPrice}</span>
                                                            </div>
                                                            <p className="text-sm text-gray-600 mt-1">{item?.description}</p>
                                                            <div className="mt-2">
                                                                {getItemQuantity(item?._id) > 0 ? (
                                                                    <div className="flex items-center gap-2">
                                                                        <Button size="sm" variant="outline" onClick={() => removeFromCart(item?._id)}>
                                                                            <Minus className="h-4 w-4" />
                                                                        </Button>
                                                                        <span>{getItemQuantity(item?._id)}</span>
                                                                        <Button size="sm" variant="outline" onClick={() => addToCart(item)}>
                                                                            <Plus className="h-4 w-4" />
                                                                        </Button>
                                                                    </div>
                                                                ) : (
                                                                    <Button
                                                                        size="sm"
                                                                        onClick={() => addToCart(item)}
                                                                        className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                                                                    >
                                                                        Add
                                                                    </Button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Floating Cart Button for Mobile */}
                <div className="lg:hidden block">
                    {cart.length > 0 && (
                        <motion.div
                            className="fixed bottom-6 right-6 z-50"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        >
                            <Button
                                className="rounded-full w-14 h-14 shadow-lg bg-orange-500 hover:bg-orange-600 text-white"
                                onClick={() => setIsCartModalOpen(true)}
                            >
                                <ShoppingCart className="h-6 w-6" />
                                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white">
                                    {cart.reduce((total, item) => total + item?.quantity, 0)}
                                </Badge>
                            </Button>
                        </motion.div>
                    )}

                    {/* Cart Modal for Mobile */}
                    <AnimatePresence>
                        {isCartModalOpen && (
                            <motion.div
                                className="fixed inset-0 bg-black bg-opacity-50 z-50"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <motion.div
                                    className="fixed bottom-0 left-0 right-0 bg-white rounded-t-lg p-6"
                                    initial={{ y: "100%" }}
                                    animate={{ y: 0 }}
                                    exit={{ y: "100%" }}
                                    transition={{ type: "spring", damping: 25, stiffness: 500 }}
                                >
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-xl font-bold">Your Cart</h3>
                                        <Button size="icon" variant="ghost" onClick={() => setIsCartModalOpen(false)}>
                                            <X className="h-6 w-6" />
                                        </Button>
                                    </div>
                                    <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                                        {cart.map((item) => (
                                            <motion.div
                                                key={item?._id}
                                                className="flex justify-between items-center"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: 20 }}
                                            >
                                                <div className="flex-1">
                                                    <h4 className="font-semibold">{item?.name}</h4>
                                                    <div className="flex items-center gap-2">
                                                        <Button size="icon" variant="ghost" onClick={() => removeFromCart(item?._id)}>
                                                            <Minus className="h-4 w-4" />
                                                        </Button>
                                                        <span>{item?.quantity}</span>
                                                        <Button size="icon" variant="ghost" onClick={() => addToCart(item)}>
                                                            <Plus className="h-4 w-4" />
                                                        </Button>
                                                        <Button size="icon" variant="ghost" onClick={() => deleteFromCart(item?._id)}>
                                                            <Trash2 className="h-4 w-4 text-red-500" />
                                                        </Button>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-semibold">
                                                        ₹{item?.discountedPrice}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                    <div className="border-t pt-4 space-y-2">
                                        <div className="flex justify-between font-bold text-lg">
                                            <span>Total</span>
                                            <span>₹{getSubtotal().toFixed(2)}</span>
                                        </div>
                                    </div>
                                    <Button
                                        className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white"
                                        onClick={() => {
                                            setIsCartModalOpen(false)
                                            setIsCheckoutModalOpen(true)
                                        }}
                                        disabled={cart.length === 0}
                                    >
                                        Proceed to Checkout
                                    </Button>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <CheckoutModal
                    isOpen={isCheckoutModalOpen}
                    onClose={() => setIsCheckoutModalOpen(false)}
                    orderData={orderData}
                    customerInfo={customerInfo}
                    setCustomerInfo={setCustomerInfo}
                    onSuccess={() => {
                        setIsOrderComplete(true)
                        setCart([])
                        localStorage.removeItem("foodCart")
                    }}
                    isOrderComplete={isOrderComplete}
                    setOrderDetails={setOrderDetails}
                    orderDetails={orderDetails}
                />
            </div>
        </div>
    )
}

export default MenuLayout