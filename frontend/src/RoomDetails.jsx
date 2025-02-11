import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { rooms } from "@/data/rooms-data";
import { hotels } from "@/data/hotel-data";
import { ShoppingCart, Plus, Minus, Trash2, X, CookingPot } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import CheckoutModal from "./CheckoutModal";
import { menuCategories, menuItems } from "./data/menu-data";

// Constants
const TAX_RATE = 0.18;
const DELIVERY_FEE = 50;

const RoomDetails = () => {
    const { hotelName, roomNumber } = useParams();
    const [cart, setCart] = useState([]);
    const [activeCategory, setActiveCategory] = useState(menuCategories[0].id);
    const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
    const [customerInfo, setCustomerInfo] = useState({ name: "", phone: "" });
    const [isOrderComplete, setIsOrderComplete] = useState(false);
    const [orderDetails, setOrderDetails] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isCartModalOpen, setIsCartModalOpen] = useState(false);

    const sectionRefs = useRef({});

    // Cart persistence logic
    useEffect(() => {
        const savedCart = localStorage.getItem("foodCart");
        if (savedCart) setCart(JSON.parse(savedCart));
    }, []);

    useEffect(() => {
        localStorage.setItem("foodCart", JSON.stringify(cart));
    }, [cart]);

    // Scroll sync logic
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 100;
            for (const category of menuCategories) {
                const element = sectionRefs.current[category.id];
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveCategory(category.id);
                        break;
                    }
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Hotel and room validation
    const formattedName = hotelName.replace(/-/g, " ");
    const hotel = hotels.find((h) => h.name.toLowerCase() === formattedName.toLowerCase());
    if (!hotel) return <div className="container mx-auto p-6 text-center text-red-500">Hotel not found.</div>;
    const room = rooms.find((r) => r.hotelId === hotel.id && r.number === roomNumber);
    if (!room) return <div className="container mx-auto p-6 text-center text-red-500">Room not found.</div>;

    // Cart functions
    const addToCart = (item) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
            if (existingItem) {
                return prevCart.map((cartItem) =>
                    cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
                );
            }
            return [...prevCart, { ...item, quantity: 1 }];
        });
    };

    const removeFromCart = (itemId) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === itemId);
            if (existingItem.quantity === 1) {
                return prevCart.filter((item) => item.id !== itemId);
            }
            return prevCart.map((item) =>
                item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
            );
        });
    };

    const deleteFromCart = (itemId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
    };

    const getItemQuantity = (itemId) => {
        const item = cart.find((cartItem) => cartItem.id === itemId);
        return item ? item.quantity : 0;
    };

    // Price calculations
    const getSubtotal = () => {
        return cart.reduce((total, item) => {
            const price = item.discountedPrice > 0 ? item.discountedPrice : item.sellingPrice;
            return total + price * item.quantity;
        }, 0);
    };

    const getTaxAmount = () => getSubtotal() * TAX_RATE;
    const getTotalPrice = () => getSubtotal() + getTaxAmount() + (cart.length > 0 ? DELIVERY_FEE : 0);

    const scrollToCategory = (categoryId) => {
        sectionRefs.current[categoryId]?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="px-4 lg:px-20 py-10 min-h-screen">
            {/* Desktop Layout */}
            <div className="hidden lg:flex flex-col lg:flex-row gap-6">
                {/* Categories Sidebar */}
                <div className="lg:w-1/5">
                    <div className="sticky top-6 bg-white p-4 border-r">
                        <h3 className="font-bold text-lg mb-4">Menu Categories</h3>
                        {menuCategories.map((category) => (
                            <div
                                key={category.id}
                                onClick={() => scrollToCategory(category.id)}
                                className={`cursor-pointer py-2 px-3 rounded-md transition-colors duration-200 ${activeCategory === category.id
                                        ? 'bg-red-50 text-red-500'
                                        : 'hover:bg-gray-50'
                                    }`}
                            >
                                <span className="font-medium">{category.name}</span>
                                <span className="text-gray-500 ml-2">({category.count})</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Menu Items Section */}
                <div className="lg:w-1/2">
                    {menuCategories.map((category) => (
                        <div
                            key={category.id}
                            ref={(el) => (sectionRefs.current[category.id] = el)}
                            className="mb-8"
                        >
                            <h2 className="text-2xl font-bold mb-4">{category.name}</h2>
                            <div className="grid gap-6">
                                {menuItems
                                    .filter((item) => item.category === category.id)
                                    .map((item) => (
                                        <motion.div
                                            key={item.id}
                                            whileHover={{ y: -5 }}
                                            transition={{ duration: 0.2 }}
                                            className="w-full"
                                        >
                                            <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
                                                <CardContent className="p-4">
                                                    <div className="flex flex-col sm:flex-row gap-4 items-start">
                                                        <img
                                                            src={item.images[0] || "/placeholder.svg"}
                                                            alt={item.name}
                                                            className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover"
                                                        />
                                                        <div className="flex-1 w-full">
                                                            <div className="flex justify-between items-start">
                                                                <h3 className="font-semibold text-lg sm:text-xl">{item.name}</h3>
                                                                <span className="font-semibold text-gray-700">₹{item.sellingPrice}</span>
                                                            </div>
                                                            <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                                                            <div className="mt-4">
                                                                {getItemQuantity(item.id) > 0 ? (
                                                                    <div className="flex items-center gap-2">
                                                                        <Button
                                                                            size="icon"
                                                                            variant="outline"
                                                                            onClick={() => removeFromCart(item.id)}
                                                                            className="rounded-full"
                                                                        >
                                                                            <Minus className="h-4 w-4" />
                                                                        </Button>
                                                                        <span className="font-semibold">{getItemQuantity(item.id)}</span>
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
                                                                        className="w-full sm:w-auto"
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
                            </div>
                        </div>
                    ))}
                </div>

                <div className="lg:hidden">
                    {menuCategories.map((category) => (
                        <div
                            key={category.id}
                            ref={(el) => (sectionRefs.current[category.id] = el)}
                            className="mb-8"
                        >
                            <h2 className="text-2xl font-bold mb-4">{category.name}</h2>
                            <div className="grid gap-6">
                                {menuItems
                                    .filter((item) => item.category === category.id)
                                    .map((item) => (
                                        <motion.div
                                            key={item.id}
                                            whileHover={{ y: -5 }}
                                            transition={{ duration: 0.2 }}
                                            className="w-full"
                                        >
                                            <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
                                                <CardContent className="p-4">
                                                    <div className="flex flex-col sm:flex-row gap-4 items-start">
                                                        <img
                                                            src={item.images[0] || "/placeholder.svg"}
                                                            alt={item.name}
                                                            className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover"
                                                        />
                                                        <div className="flex-1 w-full">
                                                            <div className="flex justify-between items-start">
                                                                <h3 className="font-semibold text-lg sm:text-xl">{item.name}</h3>
                                                                <span className="font-semibold text-gray-700">₹{item.sellingPrice}</span>
                                                            </div>
                                                            <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                                                            <div className="mt-4">
                                                                {getItemQuantity(item.id) > 0 ? (
                                                                    <div className="flex items-center gap-2">
                                                                        <Button
                                                                            size="icon"
                                                                            variant="outline"
                                                                            onClick={() => removeFromCart(item.id)}
                                                                            className="rounded-full"
                                                                        >
                                                                            <Minus className="h-4 w-4" />
                                                                        </Button>
                                                                        <span className="font-semibold">{getItemQuantity(item.id)}</span>
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
                                                                        className="w-full sm:w-auto"
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
                            </div>
                        </div>
                    ))}
                </div>

                {/* Cart Section */}
                <div className="lg:w-1/3">
                    <Card className="sticky top-6">
                        <CardContent className="p-6">
                            <h3 className="text-2xl font-bold mb-4">Your Cart</h3>
                            {cart.length === 0 ? (
                                <div className="text-center py-8">
                                    <ShoppingCart className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                                    <p className="text-gray-500">Your cart is empty</p>
                                </div>
                            ) : (
                                <>
                                    <div className="space-y-4 mb-6">
                                        {cart.map((item) => (
                                            <div key={item.id} className="flex justify-between items-center">
                                                <div className="flex-1">
                                                    <h4 className="font-semibold">{item.name}</h4>
                                                    <div className="flex items-center gap-2">
                                                        <Button size="icon" variant="ghost" onClick={() => removeFromCart(item.id)}>
                                                            <Minus className="h-4 w-4" />
                                                        </Button>
                                                        <span>{item.quantity}</span>
                                                        <Button size="icon" variant="ghost" onClick={() => addToCart(item)}>
                                                            <Plus className="h-4 w-4" />
                                                        </Button>
                                                        <Button size="icon" variant="ghost" onClick={() => deleteFromCart(item.id)}>
                                                            <Trash2 className="h-4 w-4 text-red-500" />
                                                        </Button>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-semibold">
                                                        ₹{(item.discountedPrice > 0 ? item.discountedPrice : item.sellingPrice) * item.quantity}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="border-t pt-4 space-y-2">
                                        <div className="flex justify-between">
                                            <span>Subtotal</span>
                                            <span>₹{getSubtotal()}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Tax ({(TAX_RATE * 100).toFixed(0)}%)</span>
                                            <span>₹{getTaxAmount().toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Delivery Fee</span>
                                            <span>₹{DELIVERY_FEE}</span>
                                        </div>
                                        <div className="flex justify-between font-bold text-lg border-t pt-2">
                                            <span>Total</span>
                                            <span>₹{getTotalPrice().toFixed(2)}</span>
                                        </div>
                                    </div>
                                    <Button
                                        className="w-full mt-6"
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
            <div className="lg:hidden block">
                {/* Floating Menu Button */}
                <Button
                    className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg"
                    onClick={() => setIsMobileMenuOpen(true)}
                >
                    <CookingPot className="h-6 w-6" />
                </Button>

                {/* Mobile Menu Modal */}
                {isMobileMenuOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
                        <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-lg p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold">Menu Categories</h3>
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <X className="h-6 w-6" />
                                </Button>
                            </div>
                            <div className="space-y-2">
                                {menuCategories.map((category) => (
                                    <div
                                        key={category.id}
                                        onClick={() => {
                                            scrollToCategory(category.id);
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="py-2 px-3 rounded-md hover:bg-gray-50 cursor-pointer"
                                    >
                                        <span className="font-medium">{category.name}</span>
                                        <span className="text-gray-500 ml-2">({category.count})</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Floating Checkout Button */}
                {cart.length > 0 && (
                    <Button
                        className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg"
                        onClick={() => setIsCartModalOpen(true)}
                    >
                        <ShoppingCart className="h-6 w-6" />
                        <Badge className="absolute -top-2 -right-2 bg-red-500 text-white">
                            {cart.reduce((total, item) => total + item.quantity, 0)}
                        </Badge>
                    </Button>
                )}

                {/* Cart Modal */}
                {isCartModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
                        <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-lg p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold">Your Cart</h3>
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    onClick={() => setIsCartModalOpen(false)}
                                >
                                    <X className="h-6 w-6" />
                                </Button>
                            </div>
                            <div className="space-y-4 mb-6">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex justify-between items-center">
                                        <div className="flex-1">
                                            <h4 className="font-semibold">{item.name}</h4>
                                            <div className="flex items-center gap-2">
                                                <Button size="icon" variant="ghost" onClick={() => removeFromCart(item.id)}>
                                                    <Minus className="h-4 w-4" />
                                                </Button>
                                                <span>{item.quantity}</span>
                                                <Button size="icon" variant="ghost" onClick={() => addToCart(item)}>
                                                    <Plus className="h-4 w-4" />
                                                </Button>
                                                <Button size="icon" variant="ghost" onClick={() => deleteFromCart(item.id)}>
                                                    <Trash2 className="h-4 w-4 text-red-500" />
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold">
                                                ₹{(item.discountedPrice > 0 ? item.discountedPrice : item.sellingPrice) * item.quantity}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t pt-4 space-y-2">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>₹{getSubtotal()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tax ({(TAX_RATE * 100).toFixed(0)}%)</span>
                                    <span>₹{getTaxAmount().toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Delivery Fee</span>
                                    <span>₹{DELIVERY_FEE}</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg border-t pt-2">
                                    <span>Total</span>
                                    <span>₹{getTotalPrice().toFixed(2)}</span>
                                </div>
                            </div>
                            <Button
                                className="w-full mt-6"
                                onClick={() => {
                                    setIsCartModalOpen(false);
                                    setIsCheckoutModalOpen(true);
                                }}
                                disabled={cart.length === 0}
                            >
                                Proceed to Checkout
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            {/* Checkout Modal */}
            <CheckoutModal
                isOpen={isCheckoutModalOpen}
                onClose={() => setIsCheckoutModalOpen(false)}
                total={getTotalPrice()}
                customerInfo={customerInfo}
                setCustomerInfo={setCustomerInfo}
                onCompleteOrder={() => {
                    setIsOrderComplete(true);
                    setCart([]);
                    localStorage.removeItem("foodCart");
                }}
                isOrderComplete={isOrderComplete}
                orderDetails={orderDetails}
            />
        </div>
    );
};

export default RoomDetails;