import { NextRequest, NextResponse } from "next/server";
import PDFDocument from "pdfkit";
import { PassThrough } from "stream";
import { prisma } from "@/lib/prisma";
import { CURRENCY } from "@/lib/currency";

function streamToBuffer(stream: PassThrough): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    stream.on("data", (chunk: Buffer) => chunks.push(chunk));
    stream.on("end", () => resolve(Buffer.concat(chunks)));
    stream.on("error", reject);
  });
}

const COLORS = {
  primary: "#111827",
  accent: "#059669",
  accentLight: "#d1fae5",
  muted: "#6b7280",
  border: "#e5e7eb",
  bgLight: "#f9fafb",
  bgGray: "#f3f4f6",
  red: "#dc2626",
  white: "#ffffff",
  black: "#000000",
};

function formatKES(amount: number): string {
  return `${CURRENCY} ${amount.toLocaleString("en-KE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function drawHeader(doc: PDFKit.PDFDocument, title: string) {
  doc.rect(50, doc.y, 495, 40).fill(COLORS.primary);
  doc.fill(COLORS.white).fontSize(14).font("Helvetica-Bold").text(title, 60, doc.y + 12, { align: "left" });
  doc.fill(COLORS.black);
  doc.y += 45;
  doc.moveDown(0.3);
}

function drawSectionBox(doc: PDFKit.PDFDocument, title: string) {
  if (doc.y > 700) doc.addPage();
  const y = doc.y;
  doc.rect(50, y, 495, 22).fill(COLORS.bgGray);
  doc.fill(COLORS.primary).fontSize(10).font("Helvetica-Bold").text(title, 60, y + 5);
  doc.fill(COLORS.black);
  doc.y = y + 28;
}

function drawField(doc: PDFKit.PDFDocument, label: string, value?: string | number | null, valueColor?: string) {
  if (value === null || value === undefined || value === "") return;
  const y = doc.y;
  const labelWidth = doc.font("Helvetica-Bold").fontSize(9).widthOfString(`${label}: `);
  doc.font("Helvetica-Bold").fontSize(9).fillColor(COLORS.muted).text(label + ":", 55, y, { continued: true });
  doc.font("Helvetica").fillColor(valueColor || COLORS.primary).text(String(value), 55 + labelWidth, y);
  doc.fillColor(COLORS.black);
}

function drawBadge(doc: PDFKit.PDFDocument, text: string, x: number, y: number, bgColor: string) {
  const w = doc.fontSize(8).widthOfString(text) + 12;
  doc.roundedRect(x, y - 1, w, 14, 7).fill(bgColor);
  doc.fill(COLORS.primary).fontSize(8).font("Helvetica-Bold").text(text, x + 6, y + 1);
  doc.fillColor(COLORS.black);
}

function drawTableHeader(
  doc: PDFKit.PDFDocument,
  tableLeft: number,
  y: number,
  headers: string[],
  colWidths: number[]
) {
  doc.rect(tableLeft, y, colWidths.reduce((a, b) => a + b, 0), 18).fill(COLORS.bgGray);
  doc.fill(COLORS.primary).fontSize(8).font("Helvetica-Bold");
  let x = tableLeft + 4;
  headers.forEach((h, i) => {
    doc.text(h, x, y + 4, { width: colWidths[i], lineBreak: false });
    x += colWidths[i];
  });
  doc.fillColor(COLORS.black);
}

function drawTableRow(
  doc: PDFKit.PDFDocument,
  y: number,
  cells: { text: string; x: number; w: number; align?: string; color?: string; bold?: boolean }[]
) {
  cells.forEach((c) => {
    doc.fontSize(8).font(c.bold ? "Helvetica-Bold" : "Helvetica").fillColor(c.color || COLORS.primary);
    doc.text(c.text, c.x, y, { width: c.w, lineBreak: false, align: (c.align as "left" | "center" | "right") || "left" });
  });
  doc.fillColor(COLORS.black);
}

function drawDivider(doc: PDFKit.PDFDocument) {
  const y = doc.y;
  doc.moveTo(50, y).lineTo(545, y).stroke(COLORS.border);
  doc.y = y + 8;
}

export async function POST(request: NextRequest) {
  try {
    const { assessmentId } = await request.json();

    if (!assessmentId) {
      return NextResponse.json({ error: "assessmentId is required" }, { status: 400 });
    }

    const assessment = await prisma.assessment.findUnique({
      where: { id: assessmentId },
      include: {
        user: { select: { name: true, logoUrl: true } },
        insuranceCompany: true,
        repairer: true,
        feeNote: true,
        claim: true,
        vehicle: {
          include: { make: true, vehicleModel: true, variant: true },
        },
        vehicleCondition: { include: { tyres: true } },
        accidentDetail: true,
        damageItems: { orderBy: { sortOrder: "asc" } },
        parts: { orderBy: { sortOrder: "asc" } },
        services: { orderBy: { sortOrder: "asc" } },
        remark: true,
        additionalObservations: { orderBy: { sortOrder: "asc" } },
        authorization: true,
        specialInstructions: { orderBy: { sortOrder: "asc" } },
        signatures: true,
        photos: { orderBy: { sortOrder: "asc" } },
      },
    });

    if (!assessment) {
      return NextResponse.json({ error: "Assessment not found" }, { status: 404 });
    }

    const stream = new PassThrough();
    const doc = new PDFDocument({ size: "A4", margin: 50, bufferPages: true });
    doc.pipe(stream);

    // ═══════════════════════════════════════════════════════════════════════════
    // HEADER
    // ═══════════════════════════════════════════════════════════════════════════
    doc.rect(0, 0, 595, 60).fill(COLORS.primary);
    doc.fill(COLORS.white).fontSize(18).font("Helvetica-Bold").text("ASSESSMENT REPORT", 50, 18, { align: "center" });
    doc.fillColor(COLORS.black);
    doc.y = 75;

    // Logo
    if (assessment.user?.logoUrl) {
      let logoBuffer: Buffer | null = null;
      try {
        const resp = await fetch(assessment.user.logoUrl);
        if (resp.ok) {
          const arr = await resp.arrayBuffer();
          logoBuffer = Buffer.from(arr);
        }
      } catch { /* logo fetch failed */ }

      if (logoBuffer && logoBuffer.length > 100) {
        try {
          doc.image(logoBuffer, 50, doc.y, { fit: [495, 150], align: "center", valign: "center" });
          doc.y += 160;
        } catch { /* logo render failed */ }
      }
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // 1. FEE NOTE
    // ═══════════════════════════════════════════════════════════════════════════
    if (assessment.feeNote) {
      drawSectionBox(doc, "1. ASSESSMENT / FEE NOTE");
      drawField(doc, "Reference Number", assessment.feeNote.referenceNumber);
      drawField(doc, "Assessment Date", assessment.feeNote.assessmentDate ? new Date(assessment.feeNote.assessmentDate).toLocaleDateString("en-KE") : null);
      drawField(doc, "Professional Fee", formatKES(assessment.feeNote.professionalFee));
      drawField(doc, "VAT", formatKES(assessment.feeNote.vat));
      drawField(doc, "Reimbursement", formatKES(assessment.feeNote.reimbursement));
      drawField(doc, "Total Professional Fee", formatKES(assessment.feeNote.totalProfessionalFee), COLORS.accent);
      doc.moveDown(0.5);
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // 2. INSURANCE + 3. CLAIM
    // ═══════════════════════════════════════════════════════════════════════════
    drawSectionBox(doc, "2. CLAIM DETAILS");
    drawField(doc, "Insurance Company", assessment.insuranceCompany?.name);
    drawField(doc, "Claim Number", assessment.claim?.claimNumber);
    drawField(doc, "Insured Name", assessment.claim?.insuredName);
    drawField(doc, "Insured Phone", assessment.claim?.insuredPhone);
    drawField(doc, "Insured Email", assessment.claim?.insuredEmail);
    drawField(doc, "Policy Number", assessment.claim?.policyNumber);
    drawField(doc, "Sum Insured", assessment.claim?.sumInsured ? formatKES(assessment.claim.sumInsured) : null);
    drawField(doc, "Excess", assessment.claim?.excessPercentage ? `${assessment.claim.excessPercentage}% (${assessment.claim.excessAmount ? formatKES(assessment.claim.excessAmount) : "0"})` : null);
    drawField(doc, "Date of Instruction", assessment.claim?.dateOfInstruction ? new Date(assessment.claim.dateOfInstruction).toLocaleDateString("en-KE") : null);
    drawField(doc, "Date of Assessment", assessment.claim?.dateOfAssessment ? new Date(assessment.claim.dateOfAssessment).toLocaleDateString("en-KE") : null);
    doc.moveDown(0.5);

    // ═══════════════════════════════════════════════════════════════════════════
    // 3. VEHICLE DETAILS
    // ═══════════════════════════════════════════════════════════════════════════
    if (assessment.vehicle) {
      drawSectionBox(doc, "3. VEHICLE DETAILS");
      drawField(doc, "Registration Number", assessment.vehicle.registrationNumber);
      const vehicleName = [assessment.vehicle.make?.name, assessment.vehicle.vehicleModel?.name, assessment.vehicle.variant?.name].filter(Boolean).join(" ");
      drawField(doc, "Make / Model", vehicleName || "N/A");
      drawField(doc, "Colour", assessment.vehicle.colour);
      drawField(doc, "Year of Manufacture", assessment.vehicle.yearOfManufacture);
      drawField(doc, "Engine Type", assessment.vehicle.engineType);
      drawField(doc, "Engine Number", assessment.vehicle.engineNumber);
      drawField(doc, "Chassis / VIN", assessment.vehicle.chassisNumber || assessment.vehicle.vin);
      drawField(doc, "Mileage", assessment.vehicle.mileage);
      drawField(doc, "Mode of Transport", assessment.vehicle.modeOfTransport);
      drawField(doc, "Repairer / Garage", assessment.vehicle.repairerName || assessment.repairer?.name);
      doc.moveDown(0.5);
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // 4. VEHICLE CONDITION
    // ═══════════════════════════════════════════════════════════════════════════
    if (assessment.vehicleCondition) {
      drawSectionBox(doc, "4. VEHICLE CONDITION");
      drawField(doc, "Overall Condition", assessment.vehicleCondition.overallCondition);
      drawField(doc, "Tyre Brand", assessment.vehicleCondition.tyreBrand);
      drawField(doc, "Tyre Size", assessment.vehicleCondition.tyreSize);
      drawField(doc, "Spare Tyre Condition", assessment.vehicleCondition.spareTyreCondition);
      drawField(doc, "Mechanical", assessment.vehicleCondition.mechanicalCondition);
      drawField(doc, "Interior", assessment.vehicleCondition.interiorCondition);
      drawField(doc, "Exterior", assessment.vehicleCondition.exteriorCondition);

      if (assessment.vehicleCondition.tyres.length > 0) {
        doc.moveDown(0.2);
        const tyreY = doc.y;
        doc.fontSize(8).font("Helvetica-Bold").fillColor(COLORS.muted).text("Tyre Conditions:", 55, tyreY);
        doc.fillColor(COLORS.black);
        const tyreData = assessment.vehicleCondition.tyres.map((t) => `${t.position}: ${t.percentage}%`).join("  |  ");
        doc.font("Helvetica").fillColor(COLORS.primary).text(tyreData, 55, tyreY + 12);
        doc.fillColor(COLORS.black);
        doc.y = tyreY + 28;
      }
      doc.moveDown(0.3);
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // 5. ACCIDENT DETAILS
    // ═══════════════════════════════════════════════════════════════════════════
    if (assessment.accidentDetail) {
      drawSectionBox(doc, "5. ACCIDENT DETAILS");
      drawField(doc, "Accident Date", assessment.accidentDetail.accidentDate ? new Date(assessment.accidentDetail.accidentDate).toLocaleDateString("en-KE") : null);
      drawField(doc, "Location", assessment.accidentDetail.accidentLocation);
      drawField(doc, "Damage Consistent", assessment.accidentDetail.damageConsistentWithAccident ? "Yes" : "No");
      if (assessment.accidentDetail.accidentDescription) doc.text(assessment.accidentDetail.accidentDescription, 55, doc.y, { indent: 5 });
      if (assessment.accidentDetail.insuredExplanation) doc.text(assessment.accidentDetail.insuredExplanation, 55, doc.y, { indent: 5 });
      if (assessment.accidentDetail.assessorObservation) doc.text(assessment.accidentDetail.assessorObservation, 55, doc.y, { indent: 5 });
      doc.moveDown(0.5);
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // 6. DAMAGE ASSESSMENT TABLE
    // ═══════════════════════════════════════════════════════════════════════════
    if (assessment.damageItems.length > 0) {
      drawSectionBox(doc, "6. DAMAGE ASSESSMENT");
      const tableLeft = 50;
      const colWidths = [70, 70, 50, 140, 70, 55, 40];
      const headers = ["Area", "Part", "Side", "Description", "Action", "Accident", "Pre-Accident"];

      drawTableHeader(doc, tableLeft, doc.y, headers, colWidths);

      let y = doc.y + 20;
      doc.fontSize(8).font("Helvetica").fillColor(COLORS.primary);
      assessment.damageItems.forEach((d, i) => {
        if (y > 740) { doc.addPage(); y = 50; }
        if (i % 2 === 0) doc.rect(tableLeft, y, 495, 14).fill(COLORS.bgLight);
        drawTableRow(doc, y, [
          { text: d.damageArea || "-", x: tableLeft + 4, w: colWidths[0] },
          { text: d.partName || "-", x: tableLeft + 4 + colWidths[0], w: colWidths[1] },
          { text: d.side || "-", x: tableLeft + 4 + colWidths.slice(0, 2).reduce((a, b) => a + b, 0), w: colWidths[2] },
          { text: d.damageDescription || "-", x: tableLeft + 4 + colWidths.slice(0, 3).reduce((a, b) => a + b, 0), w: colWidths[3] },
          { text: d.actionRequired || "-", x: tableLeft + 4 + colWidths.slice(0, 4).reduce((a, b) => a + b, 0), w: colWidths[4] },
          { text: d.accidentRelated ? "Yes" : "No", x: tableLeft + 4 + colWidths.slice(0, 5).reduce((a, b) => a + b, 0), w: colWidths[5], align: "center", color: d.accidentRelated ? COLORS.accent : COLORS.red },
          { text: d.preAccidentDamage ? "Yes" : "No", x: tableLeft + 4 + colWidths.slice(0, 6).reduce((a, b) => a + b, 0), w: colWidths[6], align: "center", color: d.preAccidentDamage ? COLORS.accent : COLORS.muted },
        ]);
        y += 14;
      });
      doc.fillColor(COLORS.black);
      doc.y = y + 6;
      doc.moveDown(0.5);
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // 7. PARTS TABLE
    // ═══════════════════════════════════════════════════════════════════════════
    if (assessment.parts.length > 0) {
      drawSectionBox(doc, "7. PARTS REQUIRED");
      const tableLeft = 50;
      const cw = [90, 60, 35, 60, 45, 55, 55, 40, 55];
      const headers = ["Part Name", "Part No.", "Qty", "Unit Price", "Disc. %", "Discount", "Net Price", "VAT %", "Total"];

      drawTableHeader(doc, tableLeft, doc.y, headers, cw);

      let totalPartsGross = 0;
      let totalPartsDiscount = 0;
      let totalPartsNet = 0;

      let y = doc.y + 20;
      doc.fontSize(7.5).font("Helvetica");
      assessment.parts.forEach((p, i) => {
        if (y > 740) { doc.addPage(); y = 50; }
        const lineTotal = p.quantity * p.unitPrice;
        totalPartsGross += lineTotal;
        totalPartsDiscount += p.discountAmount;
        totalPartsNet += p.netPrice;

        if (i % 2 === 0) doc.rect(tableLeft, y, cw.reduce((a, b) => a + b, 0), 14).fill(COLORS.bgLight);
        drawTableRow(doc, y, [
          { text: p.partName.substring(0, 18), x: tableLeft + 3, w: cw[0] },
          { text: p.partNumber?.substring(0, 10) || "-", x: tableLeft + 3 + cw[0], w: cw[1] },
          { text: String(p.quantity), x: tableLeft + 3 + cw.slice(0, 2).reduce((a, b) => a + b, 0), w: cw[2], align: "center" },
          { text: formatKES(p.unitPrice), x: tableLeft + 3 + cw.slice(0, 3).reduce((a, b) => a + b, 0), w: cw[3], align: "right" },
          { text: `${p.discountPercent}%`, x: tableLeft + 3 + cw.slice(0, 4).reduce((a, b) => a + b, 0), w: cw[4], align: "right" },
          { text: formatKES(p.discountAmount), x: tableLeft + 3 + cw.slice(0, 5).reduce((a, b) => a + b, 0), w: cw[5], align: "right", color: COLORS.red },
          { text: formatKES(p.netPrice), x: tableLeft + 3 + cw.slice(0, 6).reduce((a, b) => a + b, 0), w: cw[6], align: "right" },
          { text: `${p.vatPercent}%`, x: tableLeft + 3 + cw.slice(0, 7).reduce((a, b) => a + b, 0), w: cw[7], align: "center" },
          { text: formatKES(p.totalPrice), x: tableLeft + 3 + cw.slice(0, 8).reduce((a, b) => a + b, 0), w: cw[8], align: "right", bold: true },
        ]);
        y += 14;
      });
      doc.fillColor(COLORS.black);
      y += 4;
      doc.moveTo(tableLeft + 200, y).lineTo(tableLeft + 495, y).stroke(COLORS.border);
      y += 8;
      doc.fontSize(8).font("Helvetica-Bold");
      doc.fillColor(COLORS.muted).text("Gross Total:", tableLeft + 300, y, { width: 80, align: "right", lineBreak: false });
      doc.fillColor(COLORS.primary).text(formatKES(totalPartsGross), tableLeft + 385, y, { width: 100, align: "right" });
      y += 12;
      doc.fillColor(COLORS.muted).text("Less Discount:", tableLeft + 300, y, { width: 80, align: "right", lineBreak: false });
      doc.fillColor(COLORS.red).text(formatKES(totalPartsDiscount), tableLeft + 385, y, { width: 100, align: "right" });
      y += 12;
      doc.fillColor(COLORS.muted).text("Net Parts Total:", tableLeft + 300, y, { width: 80, align: "right", lineBreak: false });
      doc.fillColor(COLORS.accent).text(formatKES(totalPartsNet), tableLeft + 385, y, { width: 100, align: "right" });
      doc.fillColor(COLORS.black);
      doc.y = y + 16;
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // 8. SERVICES TABLE
    // ═══════════════════════════════════════════════════════════════════════════
    if (assessment.services.length > 0) {
      drawSectionBox(doc, "8. LABOUR & SERVICES");
      const tableLeft = 50;
      const cw = [140, 40, 60, 55, 60, 70, 70];
      const headers = ["Description", "Qty", "Unit Cost", "Discount", "VAT", "Total", "Type"];

      drawTableHeader(doc, tableLeft, doc.y, headers, cw);

      let y = doc.y + 20;
      doc.fontSize(8).font("Helvetica");
      assessment.services.forEach((s, i) => {
        if (y > 740) { doc.addPage(); y = 50; }
        if (i % 2 === 0) doc.rect(tableLeft, y, cw.reduce((a, b) => a + b, 0), 14).fill(COLORS.bgLight);
        drawTableRow(doc, y, [
          { text: s.description.substring(0, 25), x: tableLeft + 3, w: cw[0] },
          { text: String(s.quantity), x: tableLeft + 3 + cw[0], w: cw[1], align: "center" },
          { text: formatKES(s.unitCost), x: tableLeft + 3 + cw.slice(0, 2).reduce((a, b) => a + b, 0), w: cw[2], align: "right" },
          { text: formatKES(s.discount), x: tableLeft + 3 + cw.slice(0, 3).reduce((a, b) => a + b, 0), w: cw[3], align: "right", color: COLORS.red },
          { text: formatKES(s.vat), x: tableLeft + 3 + cw.slice(0, 4).reduce((a, b) => a + b, 0), w: cw[4], align: "right" },
          { text: formatKES(s.totalCost), x: tableLeft + 3 + cw.slice(0, 5).reduce((a, b) => a + b, 0), w: cw[5], align: "right", bold: true },
          { text: s.serviceType || "-", x: tableLeft + 3 + cw.slice(0, 6).reduce((a, b) => a + b, 0), w: cw[6], align: "left" },
        ]);
        y += 14;
      });
      doc.fillColor(COLORS.black);
      doc.y = y + 6;
      doc.moveDown(0.5);
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // 9. COST SUMMARY
    // ═══════════════════════════════════════════════════════════════════════════
    {
      drawSectionBox(doc, "9. REPAIR COST ESTIMATE");

      const partsGross = assessment.parts.reduce((s, p) => s + p.quantity * p.unitPrice, 0);
      const partsDiscount = assessment.parts.reduce((s, p) => s + p.discountAmount, 0);
      const partsNet = assessment.parts.reduce((s, p) => s + p.netPrice, 0);
      const labourTotal = assessment.services.filter((s) => s.serviceType === "Labour").reduce((s2, s) => s2 + s.totalCost, 0);
      const paintTotal = assessment.services.filter((s) => s.serviceType === "Paint").reduce((s2, s) => s2 + s.totalCost, 0);
      const miscTotal = assessment.services.filter((s) => s.serviceType === "Miscellaneous").reduce((s2, s) => s2 + s.totalCost, 0);
      const servicesSubtotal = assessment.services.reduce((s, s2) => s + s2.totalCost, 0);
      const subtotalBeforeVat = partsNet + servicesSubtotal;
      const vatAmount = subtotalBeforeVat * 0.16;
      const grand = subtotalBeforeVat + vatAmount;

      const costY = doc.y;
      doc.roundedRect(50, costY, 240, 120, 6).lineWidth(1).fillAndStroke(COLORS.bgLight, COLORS.border);
      doc.fillColor(COLORS.primary).fontSize(9).font("Helvetica-Bold").text("Parts", 60, costY + 8);
      doc.font("Helvetica").fontSize(8).fillColor(COLORS.muted).text(`Gross Total:          ${formatKES(partsGross)}`, 60, costY + 24);
      doc.text(`Less Discount:      ${formatKES(partsDiscount)}`, 60, costY + 38);
      doc.fillColor(COLORS.primary).font("Helvetica-Bold").text(`Net Parts Total:    ${formatKES(partsNet)}`, 60, costY + 54);
      doc.fontSize(9).fillColor(COLORS.primary).font("Helvetica-Bold").text("Services", 60, costY + 76);
      doc.font("Helvetica").fontSize(8).fillColor(COLORS.muted).text(`Labour:            ${formatKES(labourTotal)}`, 60, costY + 92);
      doc.text(`Paint:             ${formatKES(paintTotal)}`, 60, costY + 106);

      doc.roundedRect(305, costY, 240, 120, 6).lineWidth(1).fillAndStroke(COLORS.accentLight, COLORS.accent);
      doc.fillColor(COLORS.primary).fontSize(9).font("Helvetica-Bold").text("Final Estimate", 315, costY + 8);
      doc.font("Helvetica").fontSize(8).fillColor(COLORS.muted).text(`Parts Subtotal:         ${formatKES(partsNet)}`, 315, costY + 24);
      doc.text(`Miscellaneous:     ${formatKES(miscTotal)}`, 315, costY + 38);
      doc.text(`Services Subtotal:   ${formatKES(servicesSubtotal)}`, 315, costY + 52);
      doc.text(`Subtotal Before VAT: ${formatKES(subtotalBeforeVat)}`, 315, costY + 66);
      doc.text(`VAT (16%):           ${formatKES(vatAmount)}`, 315, costY + 80);
      doc.fontSize(11).fillColor(COLORS.accent).font("Helvetica-Bold").text(`GRAND TOTAL: ${formatKES(grand)}`, 315, costY + 98);

      doc.fillColor(COLORS.black);
      doc.y = costY + 128;
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // 10. REMARKS
    // ═══════════════════════════════════════════════════════════════════════════
    if (assessment.remark?.generalRemarks) {
      drawSectionBox(doc, "10. GENERAL REMARKS");
      doc.fontSize(9).font("Helvetica").fillColor(COLORS.primary).text(assessment.remark.generalRemarks, 55, doc.y, { indent: 5, lineGap: 2 });
      doc.fillColor(COLORS.black);
      doc.moveDown(0.5);
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // 11. ADDITIONAL OBSERVATIONS
    // ═══════════════════════════════════════════════════════════════════════════
    if (assessment.additionalObservations.length > 0) {
      drawSectionBox(doc, "11. ADDITIONAL DAMAGE OBSERVATIONS");
      assessment.additionalObservations.forEach((obs) => {
        const y = doc.y;
        doc.roundedRect(55, y, 485, 50, 4).lineWidth(0.5).fillAndStroke(COLORS.bgLight, COLORS.border);
        doc.y = y + 5;
        drawField(doc, "Description", obs.damageDescription);
        drawField(doc, "Accident Related", obs.accidentRelated ? "Yes" : "No");
        drawField(doc, "Est. Repair", obs.estimatedRepairCost ? formatKES(obs.estimatedRepairCost) : null);
        drawField(doc, "Est. Total", obs.estimatedTotalCost ? formatKES(obs.estimatedTotalCost) : null, COLORS.accent);
        doc.y = y + 56;
        doc.moveDown(0.2);
      });
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // 12. AUTHORIZATION
    // ═══════════════════════════════════════════════════════════════════════════
    if (assessment.authorization) {
      drawSectionBox(doc, "12. ASSESSMENT AUTHORIZATION");
      drawField(doc, "Authorized", assessment.authorization.authorized ? "Yes" : "No");
      drawField(doc, "Status", assessment.authorization.authorizationStatus);
      drawField(doc, "Salvage Value", assessment.authorization.salvageValue ? formatKES(assessment.authorization.salvageValue) : null);
      drawField(doc, "Pre-Accident Value", assessment.authorization.preAccidentValue ? formatKES(assessment.authorization.preAccidentValue) : null);
      doc.moveDown(0.5);
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // 13. SPECIAL INSTRUCTIONS
    // ═══════════════════════════════════════════════════════════════════════════
    if (assessment.specialInstructions.length > 0) {
      drawSectionBox(doc, "13. SPECIAL REPAIR INSTRUCTIONS");
      doc.fontSize(9).font("Helvetica").fillColor(COLORS.primary);
      assessment.specialInstructions.forEach((si) => {
        doc.text(`  \u2022  ${si.instruction}`, 55, doc.y, { indent: 5, lineGap: 3 });
      });
      doc.fillColor(COLORS.black);
      doc.moveDown(0.5);
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // 14. SIGNATURES
    // ═══════════════════════════════════════════════════════════════════════════
    if (assessment.signatures.length > 0) {
      drawSectionBox(doc, "14. SIGNATURES");
      assessment.signatures.forEach((sig) => {
        const y = doc.y;
        doc.roundedRect(55, y, 240, 60, 4).lineWidth(0.5).fillAndStroke(COLORS.bgLight, COLORS.border);
        doc.y = y + 6;
        doc.fontSize(9).font("Helvetica-Bold").fillColor(COLORS.primary).text(sig.role as string, 65, doc.y);
        doc.y += 2;
        drawField(doc, "  Name", sig.name);
        drawField(doc, "  License", sig.licenseNumber);
        drawField(doc, "  Date", sig.signatureDate ? new Date(sig.signatureDate).toLocaleDateString("en-KE") : null);
        doc.y = y + 66;
        doc.moveDown(0.3);
      });
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // PHOTOS — always at the very last page
    // ═══════════════════════════════════════════════════════════════════════════
    if (assessment.photos.length > 0) {
      doc.addPage();
      drawHeader(doc, "PHOTOS");

      const imgMargin = 50;
      const gap = 8;
      const cols = 3;
      const imgWidth = (495 - gap * (cols - 1)) / cols;
      const imgHeight = 130;
      let x = imgMargin;
      let y = doc.y;
      let col = 0;

      for (let i = 0; i < assessment.photos.length; i++) {
        const photo = assessment.photos[i];
        let imgBuffer: Buffer | null = null;

        if (photo.path.startsWith("http")) {
          try {
            const resp = await fetch(photo.path);
            if (resp.ok) {
              const arr = await resp.arrayBuffer();
              imgBuffer = Buffer.from(arr);
            }
          } catch { /* fetch failed */ }
        } else if (photo.path.startsWith("data:image")) {
          const b64Index = photo.path.indexOf("base64,");
          if (b64Index !== -1) {
            const b64 = photo.path.substring(b64Index + 7).trim();
            imgBuffer = Buffer.from(b64, "base64");
          }
        }

        if (!imgBuffer || imgBuffer.length < 100) continue;

        if (y + imgHeight + 30 > 792) {
          doc.addPage();
          y = 50;
          col = 0;
          x = imgMargin;
        }

        doc.roundedRect(x, y, imgWidth, imgHeight, 4).lineWidth(1).stroke(COLORS.border);

        try {
          doc.image(imgBuffer, x + 2, y + 2, {
            width: imgWidth - 4,
            height: imgHeight - 4,
            fit: [imgWidth - 4, imgHeight - 4],
            align: "center",
            valign: "center",
          });
        } catch {
          doc.fontSize(9).fillColor(COLORS.muted).text(`[Image ${i + 1}]`, x + imgWidth / 2 - 15, y + imgHeight / 2 - 5);
        }

        doc.fillColor(COLORS.muted).fontSize(7.5).font("Helvetica")
          .text(photo.caption || `Image ${i + 1}`, x, y + imgHeight + 4, { width: imgWidth, align: "center" });
        doc.fillColor(COLORS.black);

        col++;
        if (col >= cols) {
          col = 0;
          x = imgMargin;
          y += imgHeight + 26;
        } else {
          x += imgWidth + gap;
        }
      }
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // DISCLAIMER
    // ═══════════════════════════════════════════════════════════════════════════
    if (doc.y > 700) doc.addPage();
    doc.moveDown(1);
    doc.roundedRect(50, doc.y, 495, 40, 4).lineWidth(0.5).fillAndStroke(COLORS.bgLight, COLORS.border);
    doc.y += 6;
    doc.fontSize(7).font("Helvetica-Oblique").fillColor(COLORS.muted).text(
      "Disclaimer: This assessment report is prepared for insurance purposes. All findings are based on visual inspection and available information. The repair estimate is advisory and subject to confirmation upon dismantling. Parts prices are indicative and may vary. This report does not constitute a guarantee of repair costs.",
      60, doc.y, { width: 475, lineGap: 2, align: "center" }
    );
    doc.fillColor(COLORS.black);

    doc.end();
    const pdfBuffer = await streamToBuffer(stream);

    return new Response(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="assessment-${assessment.assessmentNumber}.pdf"`,
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
