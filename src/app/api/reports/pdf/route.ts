import { NextRequest, NextResponse } from "next/server";
import PDFDocument from "pdfkit";
import { PassThrough } from "stream";
import { CURRENCY, formatCurrency } from "@/lib/currency";

interface PartRow {
  partName: string;
  partNumber?: string;
  damageType?: string;
  damageSeverity?: string;
  quantity: number;
  unitPrice: number;
  labourCost?: number;
  subtotal: number;
  found: boolean;
  selectedSupplier?: string;
}

interface ReportBody {
  customer: {
    fullName: string;
    phone: string;
    email?: string;
    address?: string;
  };
  vehicle: {
    make: string;
    model: string;
    variant?: string;
    year?: string;
    body_type?: string;
    color?: string;
    registration?: string;
  };
  damage: {
    severity: string;
    summary: string;
    structural_damage?: boolean;
    rollover?: boolean;
    possible_total_loss?: boolean;
    estimated_total_cost?: number;
    estimated_total_labor_hours?: number;
  };
  parts: PartRow[];
  structural_concerns?: string[];
  recommendations?: string[];
  images?: string[];
}

function streamToBuffer(stream: PassThrough): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    stream.on("data", (chunk: Buffer) => chunks.push(chunk));
    stream.on("end", () => resolve(Buffer.concat(chunks)));
    stream.on("error", reject);
  });
}

export async function POST(request: NextRequest) {
  try {
    const body: ReportBody = await request.json();
    const { customer, vehicle, damage, parts, structural_concerns, recommendations, images } = body;

    const stream = new PassThrough();
    const doc = new PDFDocument({ size: "A4", margin: 50, bufferPages: true });
    doc.pipe(stream);

    // Header
    doc.fontSize(22).font("Helvetica-Bold").text("Vehicle Damage Assessment Report", { align: "center" });
    doc.moveDown(0.3);
    doc.fontSize(10).font("Helvetica").fillColor("#666666").text(`Generated: ${new Date().toLocaleDateString("en-AU", { day: "2-digit", month: "short", year: "numeric" })}`, { align: "center" });
    doc.fillColor("#000000");
    doc.moveDown(1);

    doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke("#dddddd");
    doc.moveDown(0.5);

    // Customer Info
    doc.fontSize(13).font("Helvetica-Bold").fillColor("#000000").text("Customer Information");
    doc.moveDown(0.3);
    doc.fontSize(10).font("Helvetica").text(`Name: ${customer.fullName}`);
    doc.text(`Phone: ${customer.phone}`);
    if (customer.email) doc.text(`Email: ${customer.email}`);
    if (customer.address) doc.text(`Address: ${customer.address}`);
    doc.moveDown(0.8);

    // Vehicle Info
    doc.fontSize(13).font("Helvetica-Bold").text("Vehicle Information");
    doc.moveDown(0.3);
    doc.fontSize(10).font("Helvetica").text(`Make: ${vehicle.make || "N/A"}`);
    doc.text(`Model: ${vehicle.model || "N/A"}`);
    if (vehicle.variant) doc.text(`Variant: ${vehicle.variant}`);
    if (vehicle.year) doc.text(`Year: ${vehicle.year}`);
    if (vehicle.body_type) doc.text(`Body Type: ${vehicle.body_type}`);
    if (vehicle.color) doc.text(`Color: ${vehicle.color}`);
    if (vehicle.registration) doc.text(`Registration: ${vehicle.registration}`);
    doc.moveDown(0.8);

    // Damage Assessment
    doc.fontSize(13).font("Helvetica-Bold").text("Damage Assessment");
    doc.moveDown(0.3);
    doc.fontSize(10).font("Helvetica").text(`Severity: ${damage.severity}`);
    if (damage.possible_total_loss !== undefined) doc.text(`Possible Total Loss: ${damage.possible_total_loss ? "Yes" : "No"}`);
    if (damage.structural_damage !== undefined) doc.text(`Structural Damage: ${damage.structural_damage ? "Yes" : "No"}`);
    if (damage.rollover !== undefined && damage.rollover) doc.text(`Rollover: Yes`);
    doc.moveDown(0.3);
    doc.font("Helvetica-Bold").text("Summary:");
    doc.font("Helvetica").text(damage.summary, { lineGap: 2 });
    doc.moveDown(0.8);

    // Parts Table
    if (parts && parts.length > 0) {
      doc.fontSize(13).font("Helvetica-Bold").fillColor("#000000").text("Parts & Cost Breakdown");
      doc.moveDown(0.5);

      const tableTop = doc.y;
      const colWidths = [140, 80, 60, 50, 70, 60, 70];
      const headers = ["Part Name", "Supplier", "Qty", "Price", "Labour", "Subtotal", "Part No."];
      const tableLeft = 50;

      doc.rect(tableLeft, tableTop, 500, 20).fill("#f0f0f0");
      let x = tableLeft + 5;
      doc.fontSize(8).font("Helvetica-Bold").fillColor("#333333");
      headers.forEach((h, i) => {
        doc.text(h, x, tableTop + 5, { width: colWidths[i], lineBreak: false });
        x += colWidths[i];
      });

      let y = tableTop + 22;
      doc.font("Helvetica").fontSize(8).fillColor("#000000");
      let totalParts = 0;
      let totalLabour = 0;

      parts.forEach((part) => {
        if (y > 720) {
          doc.addPage();
          y = 50;
        }

        const rowHeight = 18;
        if (!part.found) {
          doc.rect(tableLeft, y - 2, 500, rowHeight).fill("#fff8f0");
        }

        x = tableLeft + 5;
        const row = [
          part.partName + (part.found ? "" : " *"),
          part.selectedSupplier || "-",
          String(part.quantity),
          part.unitPrice > 0 ? `${CURRENCY} ${part.unitPrice.toLocaleString()}` : "-",
          part.labourCost && part.labourCost > 0 ? `${CURRENCY} ${part.labourCost.toLocaleString()}` : "-",
          part.subtotal > 0 ? `${CURRENCY} ${part.subtotal.toLocaleString()}` : "-",
          part.partNumber || "-",
        ];

        doc.fillColor(part.found ? "#000000" : "#999999");
        row.forEach((cell, i) => {
          doc.text(cell, x, y, { width: colWidths[i], lineBreak: false });
          x += colWidths[i];
        });

        totalParts += part.subtotal;
        totalLabour += part.labourCost || 0;
        y += rowHeight;
      });

      y += 5;
      doc.moveTo(tableLeft, y).lineTo(tableLeft + 500, y).stroke("#dddddd");
      y += 5;
      doc.font("Helvetica-Bold").fontSize(9).fillColor("#000000");
      doc.text(`Total Parts Cost: ${CURRENCY} ${totalParts.toLocaleString()}`, tableLeft + 250, y, { width: 250, align: "right" });
      y += 15;
      if (totalLabour > 0) {
        doc.text(`Total Labour Cost: ${CURRENCY} ${totalLabour.toLocaleString()}`, tableLeft + 250, y, { width: 250, align: "right" });
        y += 15;
      }
      doc.fontSize(11).text(`Grand Total: ${CURRENCY} ${(totalParts + totalLabour).toLocaleString()}`, tableLeft + 250, y, { width: 250, align: "right" });
      y += 20;

      doc.fontSize(7).font("Helvetica").fillColor("#999999");
      doc.text("* Parts not found in catalogue - price to be confirmed", tableLeft, y);
      doc.moveDown(0.8);
    }

    // Structural Concerns
    if (structural_concerns && structural_concerns.length > 0) {
      if (doc.y > 650) doc.addPage();
      doc.fontSize(13).font("Helvetica-Bold").fillColor("#000000").text("Structural Concerns");
      doc.moveDown(0.3);
      doc.fontSize(9).font("Helvetica");
      structural_concerns.forEach((c) => {
        doc.fillColor("#b45309").text(`  *  ${c}`, { lineGap: 2 });
      });
      doc.fillColor("#000000");
      doc.moveDown(0.5);
    }

    // Recommendations
    if (recommendations && recommendations.length > 0) {
      if (doc.y > 650) doc.addPage();
      doc.fontSize(13).font("Helvetica-Bold").fillColor("#000000").text("Recommendations");
      doc.moveDown(0.3);
      doc.fontSize(9).font("Helvetica");
      recommendations.forEach((r) => {
        doc.fillColor("#2563eb").text(`  *  ${r}`, { lineGap: 2 });
      });
      doc.fillColor("#000000");
      doc.moveDown(0.5);
    }

    // Uploaded Images
    if (images && images.length > 0) {
      doc.addPage();
      doc.fontSize(13).font("Helvetica-Bold").fillColor("#000000").text("Uploaded Images");
      doc.moveDown(0.5);

      const imgMargin = 50;
      const gap = 10;
      const imgWidth = (545 - imgMargin * 2 - gap) / 2;
      const imgHeight = 200;
      let x = imgMargin;
      let y = doc.y;
      let col = 0;

      for (let i = 0; i < images.length; i++) {
        const dataUrl = images[i];
        const match = dataUrl.match(/^data:image\/(\w+);base64,(.+)$/);
        if (!match) continue;

        const imgBuffer = Buffer.from(match[2], "base64");

        if (y + imgHeight + 20 > 792) {
          doc.addPage();
          y = 50;
          col = 0;
          x = imgMargin;
        }

        try {
          doc.image(imgBuffer, x, y, { width: imgWidth, height: imgHeight, fit: [imgWidth, imgHeight] });
        } catch {
          doc.fontSize(8).fillColor("#999999").text(`[Image ${i + 1} - could not render]`, x, y + imgHeight / 2);
        }

        doc.fillColor("#666666").fontSize(7).font("Helvetica")
          .text(`Image ${i + 1}`, x, y + imgHeight + 3, { width: imgWidth, align: "center" });
        doc.fillColor("#000000");

        col++;
        if (col >= 2) {
          col = 0;
          x = imgMargin;
          y += imgHeight + 22;
        } else {
          x += imgWidth + gap;
        }
      }
    }

    // Footer disclaimer
    doc.moveDown(1);
    if (doc.y > 700) doc.addPage();
    doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke("#dddddd");
    doc.moveDown(0.5);
    doc.fontSize(7).font("Helvetica").fillColor("#999999");
    doc.text(
      "DISCLAIMER: This report is AI-generated and should be treated as an estimate only. Results may not be 100% accurate. Please verify all findings with a qualified professional before making any decisions.",
      { lineGap: 2 }
    );

    doc.end();
    const pdfBuffer = await streamToBuffer(stream);

    return new Response(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="vehicle-report-${Date.now()}.pdf"`,
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "PDF generation failed" },
      { status: 500 }
    );
  }
}
