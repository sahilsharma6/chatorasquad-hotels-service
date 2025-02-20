import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const DownloadInvoice = ({ order }) => {
  const generateInvoice = () => {
    const doc = new jsPDF();
    
    // Add company logo/header
    doc.setFontSize(22);
    doc.setTextColor(40, 40, 40);
    doc.text('INVOICE', 20, 20);
    
    // Add order details
    doc.setFontSize(12);
    doc.setTextColor(80, 80, 80);
    doc.text(`Order #${order?._id?.slice(-6)}`, 20, 35);
    doc.text(`Date: ${new Date(order?.orderDate).toLocaleString()}`, 20, 42);
    
    // Add hotel and room info
    doc.text(`Hotel: ${order?.hotelId?.name || 'Unknown Hotel'}`, 20, 55);
    doc.text(`Room: ${order?.roomId?.room || 'Unknown Room'}`, 20, 62);
    
    // Add items table
    const tableColumn = ['Qty', 'Item', 'Price', 'Total'];
    const tableRows = order?.orderItems?.map(item => [
      item?.quantity,
      item?.menuItem?.name || 'Item Unavailable',
      `${order?.totalPrice?.toFixed(2) || '0.00'}`,
      `Rs. ${order?.totalPrice?.toFixed(2)} /-`
    ]);

    doc.autoTable({
      startY: 70,
      head: [tableColumn],
      body: tableRows,
      theme: 'striped',
      headStyles: {
        fillColor: [71, 85, 105],
        textColor: 255,
        fontSize: 12
      },
      styles: {
        fontSize: 11,
        cellPadding: 5
      }
    });

    // Add total
    const finalY = doc.previousAutoTable.finalY || 150;
    doc.setFontSize(14);
    doc.setTextColor(40, 40, 40);
    doc.text(`Total: Rs. ${order?.totalPrice?.toFixed(2) || '0.00'} /-`, 150, finalY + 20);
    
    // Add footer
    doc.setFontSize(10);
    doc.setTextColor(128, 128, 128);
    doc.text('Thank you for your order!', 20, finalY + 35);

    // Save PDF
    doc.save(`invoice-${order?._id?.slice(-6)}.pdf`);
  };

  return (
    <Button
      onClick={generateInvoice}
      variant="outline"
      size="sm"
      className="flex items-center gap-2"
    >
      <Download className="w-4 h-4" />
      Download Invoice
    </Button>
  );
};

export default DownloadInvoice;