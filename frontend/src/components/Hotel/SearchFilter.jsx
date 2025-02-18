import React from "react";
import { Search } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function SearchFilter({
  searchTerm,
  setSearchTerm,
  indexOfFirstItem,
  indexOfLastItem,
  getFilteredAndSortedOrders
}) {
  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="pb-0 flex-wrap">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center flex-wrap">
          <div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Order Management 
            </CardTitle>
            <CardDescription className="text-gray-600 mt-1">
              Manage room orders efficiently
            </CardDescription>
          </div>
          <div className="mt-4 md:mt-0 relative">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none flex-wrap">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search orders..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full md:w-72 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="text-sm text-gray-500">
          Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem + 1, getFilteredAndSortedOrders().length)} of {getFilteredAndSortedOrders().length} entries
        </div>
      </CardContent>
    </Card>
  );
}