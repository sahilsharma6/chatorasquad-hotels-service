import jsPDF from 'jspdf';
import 'jspdf-autotable';

const generateInvoice = (orderDetails) => {
  // Initialize PDF document
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  
  // Add company logo/header
  doc.setFontSize(20);
  doc.text('Food Delivery Invoice', pageWidth/2, 20, { align: 'center' });
  
  // Add order information
  doc.setFontSize(12);
  doc.text(`Order ID: ${orderDetails.orderId}`, 20, 40);
  doc.text(`Date: ${new Date(orderDetails.orderDate).toLocaleDateString()}`, 20, 50);
  
  // Add customer information if provided
  let yPos = 60;
  if (orderDetails.customerInfo.name) {
    doc.text(`Customer Name: ${orderDetails.customerInfo.name}`, 20, yPos);
    yPos += 10;
  }
  if (orderDetails.customerInfo.phone) {
    doc.text(`Phone: ${orderDetails.customerInfo.phone}`, 20, yPos);
    yPos += 10;
  }
  
  // Add items table
  const tableData = orderDetails.items.map(item => [
    item.name,
    item.quantity,
    `₹${(item.discountedPrice > 0 ? item.discountedPrice : item.sellingPrice).toFixed(2)}`,
    `₹${((item.discountedPrice > 0 ? item.discountedPrice : item.sellingPrice) * item.quantity).toFixed(2)}`
  ]);
  
  doc.autoTable({
    startY: yPos + 10,
    head: [['Item', 'Quantity', 'Price', 'Total']],
    body: tableData,
    theme: 'grid',
    headStyles: { fillColor: [76, 175, 80] },
    columnStyles: {
      0: { cellWidth: 80 },
      1: { cellWidth: 30, halign: 'center' },
      2: { cellWidth: 30, halign: 'right' },
      3: { cellWidth: 30, halign: 'right' }
    },
    margin: { left: 20 }
  });
  
  // Calculate positions for summary
  const finalY = doc.previousAutoTable.finalY + 10;
  
  // Add summary
  doc.text('Summary:', 20, finalY);
  doc.text(`Subtotal: ₹${(orderDetails.total - orderDetails.tax - orderDetails.deliveryFee).toFixed(2)}`, pageWidth - 60, finalY);
  doc.text(`Tax (18%): ₹${orderDetails.tax.toFixed(2)}`, pageWidth - 60, finalY + 10);
  doc.text(`Delivery Fee: ₹${orderDetails.deliveryFee.toFixed(2)}`, pageWidth - 60, finalY + 20);
  
  // Add total
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.text('Total Amount:', 120, finalY + 35);
  doc.text(`₹${orderDetails.total.toFixed(2)}`, pageWidth - 60, finalY + 35);
  
  // Add footer
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.text('Thank you for your order!', pageWidth/2, finalY + 50, { align: 'center' });
  
  // Save the PDF
  doc.save(`invoice-${orderDetails.orderId}.pdf`);
};

// Updated download function
const downloadInvoice = (orderDetails) => {
  try {
    generateInvoice(orderDetails);
  } catch (error) {
    console.error('Error generating invoice:', error);
    alert('There was an error generating your invoice. Please try again.');
  }
};

export default downloadInvoice;