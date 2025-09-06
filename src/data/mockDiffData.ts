import { DiffElement } from "@/components/DiffViewer";

export const mockDiffData: DiffElement[] = [
  {
    id: "1",
    type: "EQUAL",
    text: "SERVICES AGREEMENT\n\nThis Services Agreement (\"Agreement\") is entered into on [DATE], by and between:"
  },
  {
    id: "2", 
    type: "EQUAL",
    text: "Company ABC Legal Services LLC, a limited liability company organized under the laws of Delaware (\"Company\"), and"
  },
  {
    id: "3",
    type: "REMOVED",
    text: "Client XYZ Corporation, a corporation organized under the laws of New York (\"Client\")."
  },
  {
    id: "4",
    type: "ADDED", 
    text: "Client XYZ International Corporation, a corporation organized under the laws of Delaware with offices in New York and California (\"Client\")."
  },
  {
    id: "5",
    type: "EQUAL",
    text: "RECITALS\n\nWHEREAS, Company provides professional legal consulting services; and\n\nWHEREAS, Client desires to engage Company to provide certain legal services as described herein;"
  },
  {
    id: "6",
    type: "ADDED",
    text: "WHEREAS, the parties have conducted due diligence and are satisfied with each other's qualifications and standing;"
  },
  {
    id: "7",
    type: "EQUAL",
    text: "NOW, THEREFORE, in consideration of the mutual covenants and agreements contained herein, the parties agree as follows:"
  },
  {
    id: "8",
    type: "EQUAL", 
    text: "1. SCOPE OF SERVICES\n\n1.1 Services. Company agrees to provide Client with the following legal services (\"Services\"):"
  },
  {
    id: "9",
    type: "REMOVED",
    text: "(a) General corporate law consultation\n(b) Contract review and drafting\n(c) Regulatory compliance advice"
  },
  {
    id: "10",
    type: "ADDED",
    text: "(a) Comprehensive corporate law consultation and strategic planning\n(b) Contract review, drafting, and negotiation support\n(c) Regulatory compliance advice and ongoing monitoring\n(d) Intellectual property consultation and filing assistance\n(e) Employment law guidance and policy development"
  },
  {
    id: "11",
    type: "EQUAL",
    text: "1.2 Performance Standards. Company shall perform all Services in a professional and workmanlike manner in accordance with industry standards."
  },
  {
    id: "12",
    type: "ADDED",
    text: "1.3 Response Time. Company commits to responding to Client inquiries within 24 hours during business days and within 72 hours on weekends and holidays for urgent matters."
  },
  {
    id: "13",
    type: "EQUAL",
    text: "2. TERM AND TERMINATION\n\n2.1 Term. This Agreement shall commence on the Effective Date and shall continue for a period of twelve (12) months."
  },
  {
    id: "14",
    type: "REMOVED",
    text: "2.2 Termination. Either party may terminate this Agreement with thirty (30) days written notice."
  },
  {
    id: "15",
    type: "ADDED",
    text: "2.2 Termination. Either party may terminate this Agreement with sixty (60) days written notice, or immediately in case of material breach that remains uncured after thirty (30) days written notice."
  },
  {
    id: "16",
    type: "EQUAL",
    text: "3. COMPENSATION\n\n3.1 Fees. Client agrees to pay Company for Services rendered according to the fee schedule attached as Exhibit A."
  },
  {
    id: "17",
    type: "REMOVED",
    text: "3.2 Payment Terms. All invoices are due within thirty (30) days of receipt."
  },
  {
    id: "18",
    type: "ADDED",
    text: "3.2 Payment Terms. All invoices are due within fifteen (15) days of receipt. Late payments will incur a service charge of 1.5% per month."
  },
  {
    id: "19",
    type: "ADDED",
    text: "3.3 Expense Reimbursement. Client shall reimburse Company for reasonable out-of-pocket expenses incurred in connection with the Services, provided such expenses are pre-approved in writing by Client."
  },
  {
    id: "20",
    type: "EQUAL",
    text: "4. CONFIDENTIALITY\n\n4.1 Confidential Information. Each party acknowledges that it may receive confidential information from the other party."
  },
  {
    id: "21",
    type: "EQUAL",
    text: "4.2 Non-Disclosure. Each party agrees to maintain the confidentiality of such information and not to disclose it to third parties without written consent."
  },
  {
    id: "22",
    type: "ADDED",
    text: "4.3 Data Security. Company agrees to implement and maintain reasonable security measures to protect Client's confidential information, including but not limited to encryption of electronic communications and secure storage of physical documents."
  },
  {
    id: "23",
    type: "EQUAL",
    text: "5. LIMITATION OF LIABILITY\n\n5.1 Limitation. Company's liability under this Agreement shall not exceed the total fees paid by Client in the twelve (12) months preceding the claim."
  },
  {
    id: "24",
    type: "REMOVED",
    text: "5.2 Disclaimer. COMPANY DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED."
  },
  {
    id: "25",
    type: "ADDED",
    text: "5.2 Disclaimer. EXCEPT AS EXPRESSLY SET FORTH HEREIN, COMPANY DISCLAIMS ALL OTHER WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE."
  },
  {
    id: "26",
    type: "EQUAL",
    text: "6. GOVERNING LAW\n\nThis Agreement shall be governed by and construed in accordance with the laws of the State of Delaware."
  },
  {
    id: "27",
    type: "ADDED",
    text: "7. DISPUTE RESOLUTION\n\n7.1 Mediation. The parties agree to attempt to resolve any disputes through mediation before pursuing litigation.\n\n7.2 Jurisdiction. Any legal proceedings shall be conducted in the state or federal courts located in Delaware."
  },
  {
    id: "28",
    type: "EQUAL",
    text: "IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above."
  }
];