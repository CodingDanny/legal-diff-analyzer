import { DiffElement } from "@/components/DiffViewer";

export const mockDiffData: DiffElement[] = [
  {
    type: "unchanged",
    content: ["SERVICES AGREEMENT", "", "This Services Agreement (\"Agreement\") is entered into on [DATE], by and between:"],
    old_range: [1, 3],
    new_range: [1, 3]
  },
  {
    type: "unchanged",
    content: ["Company ABC Legal Services LLC, a limited liability company organized under the laws of Delaware (\"Company\"), and"],
    old_range: [4, 4],
    new_range: [4, 4]
  },
  {
    type: "removed",
    content: "Client XYZ Corporation, a corporation organized under the laws of New York (\"Client\").",
    old_index: 5
  },
  {
    type: "added", 
    content: "Client XYZ International Corporation, a corporation organized under the laws of Delaware with offices in New York and California (\"Client\").",
    new_index: 5
  },
  {
    type: "unchanged",
    content: ["RECITALS", "", "WHEREAS, Company provides professional legal consulting services; and", "", "WHEREAS, Client desires to engage Company to provide certain legal services as described herein;"],
    old_range: [6, 10],
    new_range: [6, 10]
  },
  {
    type: "added",
    content: "WHEREAS, the parties have conducted due diligence and are satisfied with each other's qualifications and standing;",
    new_index: 11
  },
  {
    type: "unchanged",
    content: ["NOW, THEREFORE, in consideration of the mutual covenants and agreements contained herein, the parties agree as follows:"],
    old_range: [11, 11],
    new_range: [12, 12]
  },
  {
    type: "unchanged", 
    content: ["1. SCOPE OF SERVICES", "", "1.1 Services. Company agrees to provide Client with the following legal services (\"Services\"):"],
    old_range: [12, 14],
    new_range: [13, 15]
  },
  {
    type: "removed",
    content: "(a) General corporate law consultation\n(b) Contract review and drafting\n(c) Regulatory compliance advice",
    old_index: 15
  },
  {
    type: "added",
    content: "(a) Comprehensive corporate law consultation and strategic planning\n(b) Contract review, drafting, and negotiation support\n(c) Regulatory compliance advice and ongoing monitoring\n(d) Intellectual property consultation and filing assistance\n(e) Employment law guidance and policy development",
    new_index: 16
  },
  {
    type: "unchanged",
    content: ["1.2 Performance Standards. Company shall perform all Services in a professional and workmanlike manner in accordance with industry standards."],
    old_range: [16, 16],
    new_range: [17, 17]
  },
  {
    type: "added",
    content: "1.3 Response Time. Company commits to responding to Client inquiries within 24 hours during business days and within 72 hours on weekends and holidays for urgent matters.",
    new_index: 18
  },
  {
    type: "unchanged",
    content: ["2. TERM AND TERMINATION", "", "2.1 Term. This Agreement shall commence on the Effective Date and shall continue for a period of twelve (12) months."],
    old_range: [17, 19],
    new_range: [19, 21]
  },
  {
    type: "modified",
    old_range: [20, 20],
    new_range: [22, 22],
    old_content: [
      "2.2 Termination. Either party may terminate this Agreement with thirty (30) days written notice."
    ],
    new_content: [
      "2.2 Termination. Either party may terminate this Agreement with sixty (60) days written notice, or immediately in case of material breach that remains uncured after thirty (30) days written notice."
    ],
    similarity: 0.68,
    inline_diff: [
      [0, "2.2 Termination. Either party may terminate this Agreement with"],
      [-1, " thirty (30)"],
      [1, " sixty (60)"],
      [0, " days written notice"],
      [1, ", or immediately in case of material breach that remains uncured after thirty (30) days written notice"],
      [0, "."]
    ]
  },
  {
    type: "unchanged",
    content: ["3. COMPENSATION", "", "3.1 Fees. Client agrees to pay Company for Services rendered according to the fee schedule attached as Exhibit A."],
    old_range: [21, 23],
    new_range: [23, 25]
  },
  {
    type: "modified",
    old_range: [24, 24],
    new_range: [26, 26],
    old_content: [
      "3.2 Payment Terms. All invoices are due within thirty (30) days of receipt."
    ],
    new_content: [
      "3.2 Payment Terms. All invoices are due within fifteen (15) days of receipt. Late payments will incur a service charge of 1.5% per month."
    ],
    similarity: 0.74,
    inline_diff: [
      [0, "3.2 Payment Terms. All invoices are due within"],
      [-1, " thirty (30)"],
      [1, " fifteen (15)"],
      [0, " days of receipt."],
      [1, " Late payments will incur a service charge of 1.5% per month."]
    ]
  },
  {
    type: "added",
    content: "3.3 Expense Reimbursement. Client shall reimburse Company for reasonable out-of-pocket expenses incurred in connection with the Services, provided such expenses are pre-approved in writing by Client.",
    new_index: 27
  },
  {
    type: "unchanged",
    content: ["4. CONFIDENTIALITY", "", "4.1 Confidential Information. Each party acknowledges that it may receive confidential information from the other party."],
    old_range: [25, 27],
    new_range: [28, 30]
  },
  {
    type: "modified",
    old_range: [28, 28], 
    new_range: [31, 31],
    old_content: [
      "4.2 Non-Disclosure. Each party agrees to maintain the confidentiality of such information and not to disclose it to third parties without written consent."
    ],
    new_content: [
      "4.2 Non-Disclosure. Each party agrees to maintain strict confidentiality of such information and not to disclose it to third parties without prior written consent from the disclosing party."
    ],
    similarity: 0.85,
    inline_diff: [
      [0, "4.2 Non-Disclosure. Each party agrees to maintain"],
      [1, " strict"],
      [0, " confidentiality of such information and not to disclose it to third parties without"],
      [-1, " written"],
      [1, " prior written"],
      [0, " consent"],
      [1, " from the disclosing party"],
      [0, "."]
    ]
  },
  {
    type: "added",
    content: "4.3 Data Security. Company agrees to implement and maintain reasonable security measures to protect Client's confidential information, including but not limited to encryption of electronic communications and secure storage of physical documents.",
    new_index: 32
  },
  {
    type: "unchanged",
    content: ["5. LIMITATION OF LIABILITY", "", "5.1 Limitation. Company's liability under this Agreement shall not exceed the total fees paid by Client in the twelve (12) months preceding the claim."],
    old_range: [29, 31],
    new_range: [33, 35]
  },
  {
    type: "modified",
    old_range: [32, 32],
    new_range: [36, 36], 
    old_content: [
      "5.2 Disclaimer. COMPANY DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED."
    ],
    new_content: [
      "5.2 Disclaimer. EXCEPT AS EXPRESSLY SET FORTH HEREIN, COMPANY DISCLAIMS ALL OTHER WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE."
    ],
    similarity: 0.72,
    inline_diff: [
      [0, "5.2 Disclaimer."],
      [1, " EXCEPT AS EXPRESSLY SET FORTH HEREIN,"],
      [0, " COMPANY DISCLAIMS ALL"],
      [1, " OTHER"],
      [0, " WARRANTIES, EXPRESS OR IMPLIED"],
      [1, ", INCLUDING WITHOUT LIMITATION THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE"],
      [0, "."]
    ]
  },
  {
    type: "unchanged",
    content: ["6. GOVERNING LAW", "", "This Agreement shall be governed by and construed in accordance with the laws of the State of Delaware."],
    old_range: [33, 35],
    new_range: [37, 39]
  },
  {
    type: "added",
    content: "7. DISPUTE RESOLUTION\n\n7.1 Mediation. The parties agree to attempt to resolve any disputes through mediation before pursuing litigation.\n\n7.2 Jurisdiction. Any legal proceedings shall be conducted in the state or federal courts located in Delaware.",
    new_index: 40
  },
  {
    type: "moved",
    old_index: 34,
    new_index: 42,
    content: "8. FORCE MAJEURE\n\n8.1 Definition. Neither party shall be liable for any failure or delay in performance under this Agreement if such failure or delay is due to circumstances beyond the reasonable control of that party, including but not limited to acts of God, natural disasters, war, terrorism, labor disputes, or governmental actions.\n\n8.2 Notice and Mitigation. The party affected by a force majeure event shall promptly notify the other party in writing and shall use reasonable efforts to mitigate the effects of such event and to resume performance as soon as reasonably practicable."
  },
  {
    type: "moved_and_modified",
    old_index: 35,
    new_index: 43,
    old_content: "9. INTELLECTUAL PROPERTY\n\n9.1 Work Product. All work product, deliverables, and intellectual property created by Company in the performance of Services shall be the exclusive property of Client.\n\n9.2 Pre-existing Rights. Each party retains ownership of its pre-existing intellectual property rights.",
    new_content: "9. INTELLECTUAL PROPERTY AND WORK PRODUCT\n\n9.1 Work Product Ownership. All work product, deliverables, reports, analyses, and intellectual property created, developed, or produced by Company specifically in the performance of Services under this Agreement shall become the exclusive property of Client upon payment of all fees due hereunder.\n\n9.2 Pre-existing and General Rights. Each party retains full ownership of its pre-existing intellectual property rights, proprietary methodologies, and general knowledge gained through the performance of this Agreement.\n\n9.3 License Grant. Company hereby grants Client a perpetual, irrevocable, worldwide license to use, modify, and distribute any Company methodologies or templates incorporated into the work product.",
    similarity: 0.65,
    inline_diff: [
      [0, "9. INTELLECTUAL PROPERTY"],
      [1, " AND WORK PRODUCT"],
      [0, "\n\n9.1"],
      [-1, " Work Product. All work product, deliverables,"],
      [1, " Work Product Ownership. All work product, deliverables, reports, analyses,"],
      [0, " and intellectual property created"],
      [1, ", developed, or produced"],
      [0, " by Company"],
      [1, " specifically"],
      [0, " in the performance of Services"],
      [1, " under this Agreement"],
      [0, " shall"],
      [1, " become the"],
      [0, " exclusive property of Client"],
      [1, " upon payment of all fees due hereunder"],
      [0, ".\n\n9.2 Pre-existing"],
      [1, " and General"],
      [0, " Rights. Each party retains"],
      [1, " full"],
      [0, " ownership of its pre-existing intellectual property rights"],
      [1, ", proprietary methodologies, and general knowledge gained through the performance of this Agreement"],
      [0, "."],
      [1, "\n\n9.3 License Grant. Company hereby grants Client a perpetual, irrevocable, worldwide license to use, modify, and distribute any Company methodologies or templates incorporated into the work product."]
    ]
  },
  {
    type: "unchanged",
    content: ["IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above."],
    old_range: [36, 36],
    new_range: [44, 44]
  }
];