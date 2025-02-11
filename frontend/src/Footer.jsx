import React from "react";
import { motion } from "framer-motion";
import { Instagram, Facebook, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const cities = [
    ["Mumbai", "Delhi", "Bangalore", "Kolkata", "Chennai"],
    ["Hyderabad", "Pune", "Ahmedabad", "Jaipur", "Surat"],
    ["Lucknow", "Kanpur", "Nagpur", "Indore", "Thane"],
    ["Bhopal", "Visakhapatnam", "Patna", "Vadodara", "Ghaziabad"],
    ["Ludhiana", "Agra", "Nashik", "Meerut", "Rajkot"],
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className=" bg-gray-900 text-gray-300 py-12 px-6 ">
      <motion.div
        className="max-w-full mx-auto lg:pl-24"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Top Cities Section */}
        {/* <motion.div variants={itemVariants} className="mb-12">
          <h2 className="text-white text-xl font-semibold mb-6">
            Our top cities
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {cities.map((column, columnIndex) => (
              <div key={columnIndex}>
                {column.map((city, index) => (
                  <motion.a
                    key={city}
                    href="#"
                    className="block text-gray-400 hover:text-white mb-2 transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    {city}
                  </motion.a>
                ))}
              </div>
            ))}
          </div>
        </motion.div> */}

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-8 ">
          {/* Company Section */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <div className="space-y-2">
              <motion.div
                href="#"
                className="block text-gray-400 hover:text-white"
                whileHover={{ x: 5 }}
              >
                <Link to={"https://chatorasquad.in/about"}>About us</Link>{" "}
              </motion.div>
              {/* <motion.a
                href="#"
                className="block text-gray-400 hover:text-white"
                whileHover={{ x: 5 }}
              >
                Team
              </motion.a>
              <motion.a
                href="#"
                className="block text-gray-400 hover:text-white"
                whileHover={{ x: 5 }}
              >
                Careers
              </motion.a>
              <motion.a
                href="#"
                className="block text-gray-400 hover:text-white"
                whileHover={{ x: 5 }}
              >
                Blog
              </motion.a> */}
            </div>
          </motion.div>

          {/* Contact Section */}
          {/* <motion.div variants={itemVariants}>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <div className="space-y-2">
              <motion.a
                href="#"
                className="block text-gray-400 hover:text-white"
                whileHover={{ x: 5 }}
              >
                Help & Support
              </motion.a>
              <motion.a
                href="#"
                className="block text-gray-400 hover:text-white"
                whileHover={{ x: 5 }}
              >
                Partner with us
              </motion.a>
              <motion.a
                href="#"
                className="block text-gray-400 hover:text-white"
                whileHover={{ x: 5 }}
              >
                Ride with us
              </motion.a>
            </div>
          </motion.div> */}

          {/* Legal Section */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <div className="space-y-2">
              <motion.a
                href="https://chatorasquad.in/terms"
                className="block text-gray-400 hover:text-white"
                whileHover={{ x: 5 }}
              >
                Terms & Conditions
              </motion.a>
              <motion.a
                href="https://chatorasquad.in/refund-shiping-return"
                className="block text-gray-400 hover:text-white"
                whileHover={{ x: 5 }}
              >
                Refund, Shipping & Return
              </motion.a>
              <motion.a
                href="https://chatorasquad.in/privacy"
                className="block text-gray-400 hover:text-white"
                whileHover={{ x: 5 }}
              >
                Privacy Policy
              </motion.a>
            </div>
          </motion.div>

          {/* Newsletter Section */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-semibold mb-4">FOLLOW US</h3>
            <div className="flex space-x-4 mb-6">
              <motion.a
                href={import.meta.env.INSTAGRAM}
                whileHover={{ scale: 1.2 }}
                className="text-gray-400 hover:text-white"
              >
                <Instagram size={20} />
              </motion.a>
              <motion.a
                href={import.meta.env.FACEBOOK}
                whileHover={{ scale: 1.2 }}
                className="text-gray-400 hover:text-white"
              >
                <Facebook size={20} />
              </motion.a>
              <motion.a
                href={import.meta.env.TWITTER}
                whileHover={{ scale: 1.2 }}
                className="text-gray-400 hover:text-white"
              >
                <Twitter size={20} />
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800"
        >
          <p className="text-gray-400 text-sm">
            All rights Reserved © SCSH CHATORA SQUAD (OPC) PRIVATE LIMITED ({""}
            {currentYear})
          </p>
          {/* <div className="flex items-center text-gray-400 text-sm">
            <span>Made with</span>
           
            <span>by Themewagon</span>
          </div> */}
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;