import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import jsPDF from "jspdf"
import "jspdf-autotable"

const DownloadInvoice = ({ order, companyLogo }) => {
  const generateInvoice = () => {
    const doc = new jsPDF()

    // Set initial coordinates and dimensions
    const pageWidth = doc.internal.pageSize.width
    const pageHeight = doc.internal.pageSize.height
    const margin = 15
    const width = pageWidth - 2 * margin
    let y = 15

    // Calculate appropriate height for main content - remove extra space
    const estimatedContentHeight = 180 // Adjusted to be more compact

    // Draw main border - adjusted size to fit content
    doc.rect(margin, y, width, estimatedContentHeight)

    // Add company logo if provided
    if (companyLogo) {
      try {
        doc.addImage(companyLogo, 'JPEG', margin + 2, y + 2, 20, 10)
      } catch (e) {
        console.error("Error adding logo:", e)
      }
    }

    // Add title with border below
    doc.setFontSize(20)
    doc.text("Tax Invoice", 105, y + 8, { align: "center" })
    y += 15
    doc.line(margin, y, margin + width, y)

    // Company details section
    doc.setFontSize(12)
    doc.text("SCSH CHATORA SQUAD (OPC) PRIVATE LIMITED", margin + 2, y + 10)
    doc.setFontSize(10)
    doc.text("Janki Mahal C/o Rajesh Gupta Hindu Dham Faizabad Ayodhya", margin + 2, y + 17)
    doc.text(`Phone: ${order?.hotelId?.phone || "8052311525"}`, margin + 2, y + 23)
    doc.text(`Email: ${order?.hotelId?.email || "howdn68@gmail.com"}`, 140, y + 23)
    doc.text(`GSTIN: ${order?.hotelId?.gstin || "09ABMCS2695H1ZP "}`, margin + 2, y + 29)
    doc.text(`State: ${order?.hotelId?.state || "09-Uttar Pradesh"}`, 140, y + 29)
    y += 35
    doc.line(margin, y, margin + width, y)

    // Bill To and Invoice Details section with vertical divider
    const midPoint = pageWidth / 2
    doc.line(midPoint, y, midPoint, y + 35) // Vertical divider

    // Bill To section
    doc.text("Bill To:", margin + 2, y + 5)
    doc.text(`Room: ${order?.roomId?.room || "Unknown Room"}`, margin + 2, y + 12)
    doc.text(`Guest Name: ${order?.guestName || "N/A"}`, margin + 2, y + 19)

    // Invoice Details section
    doc.text("Invoice Details:", midPoint + 2, y + 5)
    doc.text(`No: ${order?._id?.slice(-6) || "N/A"}`, midPoint + 2, y + 12)
    doc.text(`Date: ${new Date(order?.orderDate).toLocaleDateString()}`, midPoint + 2, y + 19)

    y += 35
    doc.line(margin, y, margin + width, y)

    // Add items table with borders
    const tableColumn = ["#", "Item Name", "Quantity", "Amount(Rs. )"]
    const tableRows = order?.orderItems?.map((item, index) => [
      index + 1,
      item?.menuItem?.name || "Item Unavailable",
      item?.quantity,
      `Rs. ${(item?.quantity * (item?.menuItem?.price || 0)).toFixed(2)}`,
    ])

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: y,
      theme: "grid",
      styles: {
        fontSize: 10,
        cellPadding: 3,
        lineColor: [0, 0, 0],
        lineWidth: 0.5,
      },
      headStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
        fontStyle: "bold",
      },
      margin: { left: margin },
      tableWidth: width,
    })

    // Add totals section with border - immediately after table
    const finalY = doc.lastAutoTable.finalY + 2

    // Draw box for totals - reduced the height
    doc.rect(margin, finalY, width, 40)

    // Add totals content
    doc.text("Sub Total:", 140, finalY + 7)
    doc.text(`Rs. ${order?.totalPrice?.toFixed(2) || "0.00"} /-`, 170, finalY + 7)
    doc.text("Total:", 140, finalY + 14)
    doc.text(`Rs. ${order?.totalPrice?.toFixed(2) || "0.00"}/-`, 170, finalY + 14)

    // Amount in words section
    doc.text("Invoice Amount In Words:", margin + 2, finalY + 10)
    doc.text(numberToWords(order?.totalPrice || 0), margin + 2, finalY + 17)

    // Terms section - moved up immediately after the totals (with reduced spacing)
    const termsY = finalY + 42
    doc.line(margin, termsY, margin + width, termsY)
    doc.text("Terms And Conditions:", margin + 2, termsY + 7)
    doc.text("Thank you for doing business with us.", margin + 2, termsY + 14)

    // Add footer with company logo and name
    const footerY = termsY + 25
    doc.line(margin, footerY, margin + width, footerY)
    
    // Add logo again in the footer if needed
    if (companyLogo) {
      try {
        doc.addImage(companyLogo, 'JPEG', 140, footerY + 5, 30, 15)
      } catch (e) {
        console.error("Error adding footer logo:", e)
      }
    }

    // Save PDF
    doc.save(`invoice-${order?._id?.slice(-6)}.pdf`)
  }

  // Helper function to convert number to words
  const numberToWords = (num) => {
    const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"]
    const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"]
    const teens = [
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ]

    if (num === 0) return "Zero Rupees"

    const convertLessThanOneThousand = (n) => {
      if (n === 0) return ""
      if (n < 10) return ones[n]
      if (n < 20) return teens[n - 10]
      const ten = Math.floor(n / 10)
      const one = n % 10
      return (tens[ten] + (one ? " " + ones[one] : "")).trim()
    }

    const convert = (n) => {
      if (n < 1000) return convertLessThanOneThousand(n)
      const thousands = Math.floor(n / 1000)
      const remainder = n % 1000
      return (convertLessThanOneThousand(thousands) + " Thousand " + convert(remainder)).trim()
    }

    const rupees = Math.floor(num)
    const paise = Math.round((num - rupees) * 100)
    let result = convert(rupees) + " Rupees"
    if (paise > 0) {
      result += " and " + convert(paise) + " Paise"
    }
    return result
  }

  return (
    <Button onClick={generateInvoice} variant="outline" size="sm" className="flex items-center gap-2">
      <Download className="w-4 h-4" />
      Download Invoice
    </Button>
  )
}

export default DownloadInvoice