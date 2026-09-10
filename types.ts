export interface Transaction {
  id: string;
  title: string;
  type: 'IN' | 'OUT';
  amount: number;
  status: 'PENDING' | 'VERIFIED';
  date: string;
  note?: string;
}

export interface BankInfo {
  holderName: string;
  accountNo: string;
  bankName: string;
  ifsc: string;
  branch: string;
}

export interface SystemStatus {
  integration: string;
  compliance: string;
}
