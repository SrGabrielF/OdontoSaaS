import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { formatCurrency } from './helpers';

// Extend jsPDF with autotable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

interface BudgetData {
  patientName: string;
  procedures: { name: string; price: number }[];
  total: number;
  date: string;
  clinicName: string;
}

interface PrescriptionData {
  patientName: string;
  medications: string;
  date: string;
  clinicName: string;
  dentistName: string;
}

interface CertificateData {
  patientName: string;
  days: number;
  reason: string;
  date: string;
  clinicName: string;
  dentistName: string;
}

interface ReferralData {
  patientName: string;
  specialty: string;
  observations: string;
  date: string;
  clinicName: string;
  dentistName: string;
}

const addHeader = (doc: jsPDF, clinicName: string, title: string) => {
  doc.setFontSize(20);
  doc.setTextColor(30, 58, 138);
  doc.text(clinicName, 105, 20, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setTextColor(100);
  doc.text(title, 105, 30, { align: 'center' });
  
  doc.setDrawColor(200);
  doc.line(20, 35, 190, 35);
};

const addFooter = (doc: jsPDF, dentistName?: string) => {
  const pageHeight = doc.internal.pageSize.height;
  
  if (dentistName) {
    doc.setDrawColor(150);
    doc.line(60, pageHeight - 40, 150, pageHeight - 40);
    doc.setFontSize(10);
    doc.setTextColor(0);
    doc.text(dentistName, 105, pageHeight - 35, { align: 'center' });
    doc.text('Cirurgião Dentista', 105, pageHeight - 30, { align: 'center' });
  }

  doc.setFontSize(8);
  doc.setTextColor(150);
  doc.text('Documento gerado pelo sistema OdontoSaaS', 105, pageHeight - 10, { align: 'center' });
};

export const generateBudgetPDF = (data: BudgetData) => {
  const doc = new jsPDF();
  addHeader(doc, data.clinicName, 'Orçamento Odontológico');

  doc.setFontSize(11);
  doc.setTextColor(0);
  doc.text(`Paciente: ${data.patientName}`, 20, 45);
  doc.text(`Data: ${data.date}`, 190, 45, { align: 'right' });

  const tableRows = data.procedures.map(p => [p.name, formatCurrency(p.price)]);
  
  doc.autoTable({
    startY: 55,
    head: [['Procedimento', 'Valor']],
    body: tableRows,
    theme: 'striped',
    headStyles: { fillColor: [30, 58, 138], textColor: 255 },
    columnStyles: { 1: { halign: 'right' } },
    margin: { left: 20, right: 20 }
  });

  const finalY = (doc as any).lastAutoTable.finalY + 10;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(`Total: ${formatCurrency(data.total)}`, 190, finalY, { align: 'right' });

  addFooter(doc);
  doc.save(`orcamento_${data.patientName.toLowerCase().replace(/\s+/g, '_')}.pdf`);
};

export const generatePrescriptionPDF = (data: PrescriptionData) => {
  const doc = new jsPDF();
  addHeader(doc, data.clinicName, 'Receituário');

  doc.setFontSize(11);
  doc.text(`Paciente: ${data.patientName}`, 20, 45);
  doc.text(`Data: ${data.date}`, 190, 45, { align: 'right' });

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Prescrição:', 20, 60);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  const splitText = doc.splitTextToSize(data.medications, 170);
  doc.text(splitText, 20, 70);

  addFooter(doc, data.dentistName);
  doc.save(`receita_${data.patientName.toLowerCase().replace(/\s+/g, '_')}.pdf`);
};

export const generateCertificatePDF = (data: CertificateData) => {
  const doc = new jsPDF();
  addHeader(doc, data.clinicName, 'Atestado de Comparecimento/Repouso');

  doc.setFontSize(11);
  doc.text(`Data: ${data.date}`, 190, 45, { align: 'right' });

  const text = `Atesto para os devidos fins que o(a) Sr(a). ${data.patientName} esteve sob meus cuidados profissionais nesta data, necessitando de ${data.days} dia(s) de repouso por motivo de ${data.reason}.`;
  
  const splitText = doc.splitTextToSize(text, 170);
  doc.text(splitText, 20, 70);

  addFooter(doc, data.dentistName);
  doc.save(`atestado_${data.patientName.toLowerCase().replace(/\s+/g, '_')}.pdf`);
};

export const generateReferralPDF = (data: ReferralData) => {
  const doc = new jsPDF();
  addHeader(doc, data.clinicName, 'Encaminhamento');

  doc.setFontSize(11);
  doc.text(`Paciente: ${data.patientName}`, 20, 45);
  doc.text(`Data: ${data.date}`, 190, 45, { align: 'right' });

  doc.setFont('helvetica', 'bold');
  doc.text(`Encaminhado para: ${data.specialty}`, 20, 60);
  
  doc.setFont('helvetica', 'normal');
  doc.text('Observações Clínicas:', 20, 75);
  const splitText = doc.splitTextToSize(data.observations, 170);
  doc.text(splitText, 20, 85);

  addFooter(doc, data.dentistName);
  doc.save(`encaminhamento_${data.patientName.toLowerCase().replace(/\s+/g, '_')}.pdf`);
};
