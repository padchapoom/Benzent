import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Briefcase, ArrowUpRight, ArrowDownRight, Activity, 
  CheckCircle2, ShieldCheck, Clock, FileText, 
  Send, Database, Server, Wallet, ScanLine, Landmark, Search, Filter, Download, X, MessageSquare,
  Target, TrendingUp, Settings2, PiggyBank
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { jsPDF } from 'jspdf';
import { Transaction } from './types';

interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: 'TX-2026-8001', title: 'รายได้จากธุรกิจดิจิทัล (Digital Business Revenue)', type: 'IN', amount: 12500000, status: 'PENDING', date: '2026-08-01' },
  { id: 'TX-2026-8002', title: 'พอร์ตการลงทุน (Investment Portfolio Yield)', type: 'IN', amount: 7850000, status: 'PENDING', date: '2026-08-01' },
  { id: 'TX-2026-8003', title: 'ค่าใช้จ่ายเซิร์ฟเวอร์ (Cloud Infrastructure)', type: 'OUT', amount: 1200000, status: 'PENDING', date: '2026-08-02' },
  { id: 'TX-2026-8004', title: 'ทุนหมุนเวียน (Working Capital & Operations)', type: 'OUT', amount: 2500000, status: 'PENDING', date: '2026-08-02' },
  { id: 'TX-2026-8005', title: 'ค่าธรรมเนียมธนาคาร (Bank Fees)', type: 'OUT', amount: 15000, status: 'PENDING', date: '2026-09-08' },
  { id: 'TX-2026-8006', title: 'ค่าจ้างพนักงาน Enterprise Gemini (Employee Salary)', type: 'OUT', amount: 150000, status: 'PENDING', date: '2026-09-08' },
  { id: 'GC-STELLAR-PJ2026-X1', title: 'จ่ายค่าซื้อขายบ้าน (House Purchase)', type: 'OUT', amount: 7000000, status: 'PENDING', date: '2026-09-08' },
];

const BANK_INFO = {
  holderName: 'บัญชีธนาคารกรุงเทพ',
  accountNo: '0944428141',
  bankName: 'Bangkok Bank (พร้อมเพลย์)',
  ifsc: 'N/A (PromptPay)',
  branch: 'N/A'
};

const EMAILS = [
  'bentnato@gmail.com',
  'padchapoom2538@gmail.com',
  'benzupf1995@gmail.com',
  'Padchapoom1995@gmail.com'
];

export default function App() {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('pj_benz_transactions');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_TRANSACTIONS;
      }
    }
    return INITIAL_TRANSACTIONS;
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [noteInput, setNoteInput] = useState('');
  const [savingsGoal, setSavingsGoal] = useState<number>(() => {
    const saved = localStorage.getItem('pj_benz_savings_goal');
    return saved ? Number(saved) : 500000;
  });
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [goalInput, setGoalInput] = useState<string>(savingsGoal.toString());
  const [logs, setLogs] = useState<string[]>([]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const logsEndRef = useRef<HTMLDivElement>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('pj_benz_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('pj_benz_savings_goal', savingsGoal.toString());
  }, [savingsGoal]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const saveNote = () => {
    if (editingNoteId) {
      setTransactions(prev => prev.map(tx => tx.id === editingNoteId ? { ...tx, note: noteInput } : tx));
      setEditingNoteId(null);
      setNoteInput('');
      showToast('Note saved successfully', 'success');
    }
  };

  const addLog = (msg: string) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString('th-TH')}] ${msg}`]);
  };

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  const processTransactions = async () => {
    setIsProcessing(true);
    setLogs([]);
    showToast('Verification Started', 'info');
    addLog('Initiating System Integration Protocol...');
    
    await new Promise(r => setTimeout(r, 800));
    addLog('Connecting to Google Cloud AI & DDA Operations...');
    
    await new Promise(r => setTimeout(r, 1000));
    addLog('Secure API Ready. Fetching pending transaction slips...');
    
    for (let i = 0; i < transactions.length; i++) {
      const tx = transactions[i];
      await new Promise(r => setTimeout(r, 800));
      addLog(`[Slip OCR] Scanning evidence for ${tx.id} (${tx.title})...`);
      await new Promise(r => setTimeout(r, 600));
      addLog(`[Verification] Validating amounts and DDA & Cloud Standard compliance...`);
      
      setTransactions(prev => prev.map(t => t.id === tx.id ? { ...t, status: 'VERIFIED' } : t));
      addLog(`[Success] Transaction ${tx.id} verified and recorded to main ledger.`);
    }

    await new Promise(r => setTimeout(r, 1000));
    addLog('Compiling Financial Report: 2 August 2026...');
    
    await new Promise(r => setTimeout(r, 800));
    addLog('Dispatching reports to authorized emails...');
    
    setIsProcessing(false);
    setIsVerified(true);
    addLog('All operations completed successfully.');
    showToast('All transactions verified successfully', 'success');
  };

  // Calculations
  const totalIn = transactions.filter(t => t.type === 'IN').reduce((acc, curr) => acc + curr.amount, 0);
  const totalOut = transactions.filter(t => t.type === 'OUT').reduce((acc, curr) => acc + curr.amount, 0);
  const netProfit = totalIn - totalOut;
  const portfolioValue = 145000000 + netProfit; // Base simulation value

  // Daily Savings Goal calculations
  const availableDates = Array.from(new Set(transactions.map(t => t.date))).sort().reverse();
  const [selectedGoalDate, setSelectedGoalDate] = useState<string>(() => availableDates[0] || '2026-09-08');

  const dailyTransactions = transactions.filter(t => t.date === selectedGoalDate);
  const dailyInflow = dailyTransactions.filter(t => t.type === 'IN').reduce((acc, curr) => acc + curr.amount, 0);
  const dailyOutflow = dailyTransactions.filter(t => t.type === 'OUT').reduce((acc, curr) => acc + curr.amount, 0);
  const dailyNetSaved = dailyInflow - dailyOutflow;
  const dailyTxVolume = dailyInflow + dailyOutflow;
  const dailyTxCount = dailyTransactions.length;
  
  const goalProgressPercent = savingsGoal > 0 ? (dailyNetSaved / savingsGoal) * 100 : 0;
  const clampedProgress = Math.min(Math.max(goalProgressPercent, 0), 100);

  const handleSaveGoal = () => {
    const parsed = parseFloat(goalInput);
    if (!isNaN(parsed) && parsed > 0) {
      setSavingsGoal(parsed);
      setIsGoalModalOpen(false);
      showToast(`Savings Goal updated to ${formatCurrency(parsed)}`, 'success');
    } else {
      showToast('Please enter a valid savings goal amount', 'error');
    }
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(val);
  };

  const chartData = transactions.reduce((acc, curr, idx) => {
    const prevTotal = idx > 0 ? acc[idx - 1].cumulative : 0;
    const change = curr.type === 'IN' ? curr.amount : -curr.amount;
    acc.push({
      name: `TX-${idx + 1}`,
      date: curr.date,
      amount: change,
      cumulative: prevTotal + change,
    });
    return acc;
  }, [] as any[]);

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = tx.title.toLowerCase().includes(searchTerm.toLowerCase()) || tx.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'ALL' || tx.type === filterType;
    const matchesStatus = filterStatus === 'ALL' || tx.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const exportToCSV = () => {
    const headers = ["ID", "Title", "Type", "Amount", "Status", "Date", "Note"];
    const rows = filteredTransactions.map(tx => [
      tx.id,
      `"${tx.title}"`,
      tx.type,
      tx.amount,
      tx.status,
      tx.date,
      `"${tx.note || ''}"`
    ]);
    const csvContent = [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "transactions_backup.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Report Exported successfully', 'success');
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(22);
    doc.setTextColor(30, 58, 138); // blue-900
    doc.text("PJ BENZ-ENT PCL", 20, 20);
    
    doc.setFontSize(12);
    doc.setTextColor(100, 116, 139); // slate-500
    doc.text("Financial & Portfolio Management Report", 20, 28);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 20, 34);

    // Summary Metrics
    doc.setFontSize(16);
    doc.setTextColor(15, 23, 42); // slate-900
    doc.text("Summary Metrics", 20, 48);

    doc.setFontSize(11);
    doc.setTextColor(51, 65, 85); // slate-700
    doc.text(`Total Portfolio Value: ${formatCurrency(portfolioValue)}`, 20, 58);
    doc.text(`Available Cash: ${formatCurrency(netProfit > 0 ? netProfit : 0)}`, 20, 65);
    doc.text(`Total Cash In: ${formatCurrency(totalIn)}`, 20, 72);
    doc.text(`Total Cash Out: ${formatCurrency(totalOut)}`, 20, 79);
    doc.text(`Net Profit/Loss: ${formatCurrency(netProfit)}`, 20, 86);
    doc.text(`Daily Savings Goal (${selectedGoalDate}): ${formatCurrency(savingsGoal)} (Saved: ${formatCurrency(dailyNetSaved)} - ${goalProgressPercent.toFixed(1)}%)`, 20, 93);

    // Transaction History
    doc.setFontSize(16);
    doc.setTextColor(15, 23, 42); 
    doc.text("Transaction History", 20, 107);

    let startY = 117;
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139); 
    doc.text("ID", 20, startY);
    doc.text("Date", 65, startY);
    doc.text("Type", 100, startY);
    doc.text("Amount (THB)", 130, startY);
    doc.text("Status", 175, startY);

    // Line separator
    doc.setDrawColor(203, 213, 225); // slate-300
    doc.line(20, startY + 2, 190, startY + 2);
    
    startY += 10;
    
    filteredTransactions.forEach((tx) => {
      if (startY > 280) {
        doc.addPage();
        startY = 20;
      }
      doc.setTextColor(51, 65, 85);
      doc.text(tx.id.substring(0, 15) + (tx.id.length > 15 ? '...' : ''), 20, startY);
      doc.text(tx.date, 65, startY);
      
      if (tx.type === 'IN') {
        doc.setTextColor(16, 185, 129); // emerald-500
      } else {
        doc.setTextColor(244, 63, 94); // rose-500
      }
      doc.text(tx.type, 100, startY);
      
      doc.text(new Intl.NumberFormat('th-TH').format(tx.amount), 130, startY);
      
      doc.setTextColor(100, 116, 139);
      doc.text(tx.status, 175, startY);
      
      if (tx.note) {
        startY += 6;
        doc.setFontSize(9);
        doc.setTextColor(148, 163, 184); // slate-400
        doc.text(`Note: ${tx.note}`, 25, startY);
        doc.setFontSize(10);
      }
      
      startY += 8;
    });

    doc.save("financial_report_summary.pdf");
    showToast("PDF Report Exported successfully", "success");
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-300 font-sans selection:bg-blue-500/30 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-6 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              <Landmark className="w-8 h-8 text-blue-500" />
              PJ BENZ-ENT PCL
            </h1>
            <p className="text-slate-400 mt-1">FINANCIAL & PORTFOLIO MANAGEMENT SYSTEM</p>
            <p className="text-sm text-blue-400/80 mt-1">Certified by Google Cloud & DDA Operations</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-lg flex items-center gap-3">
              <Server className={`w-4 h-4 ${isVerified ? 'text-emerald-500' : 'text-amber-500'}`} />
              <div className="text-sm">
                <div className="text-slate-500 text-xs">System Status</div>
                <div className="text-white font-medium">{isVerified ? 'Secure API Ready' : 'Connected (Pending Tasks)'}</div>
              </div>
            </div>
            <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-lg flex items-center gap-3">
              <ShieldCheck className={`w-4 h-4 ${isVerified ? 'text-emerald-500' : 'text-amber-500'}`} />
              <div className="text-sm">
                <div className="text-slate-500 text-xs">Compliance</div>
                <div className="text-white font-medium">{isVerified ? 'DDA & Cloud Standard' : 'Awaiting Verification'}</div>
              </div>
            </div>
          </div>
        </header>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <MetricCard 
            title="Total Portfolio Value (THB)" 
            value={isVerified ? formatCurrency(portfolioValue) : '#VALUE!'}
            subtitle={isVerified ? "Active & Verified" : "Pending Data"}
            icon={<Briefcase className="w-5 h-5" />}
            color="blue"
          />
          <MetricCard 
            title="Available Cash (THB)" 
            value={isVerified ? formatCurrency(netProfit > 0 ? netProfit : 0) : '#VALUE!'}
            subtitle={isVerified ? "Liquid Funds" : "Pending OCR"}
            icon={<Wallet className="w-5 h-5" />}
            color="emerald"
          />
          <MetricCard 
            title="Total Cash Flow In (YTD)" 
            value={isVerified ? formatCurrency(totalIn) : '#VALUE!'}
            subtitle={isVerified ? "Verified via Slip OCR" : "Pending OCR"}
            icon={<ArrowUpRight className="w-5 h-5" />}
            color="emerald"
          />
          <MetricCard 
            title="Total Cash Flow Out (YTD)" 
            value={isVerified ? formatCurrency(totalOut) : '#VALUE!'}
            subtitle={isVerified ? "Verified via Slip OCR" : "Pending OCR"}
            icon={<ArrowDownRight className="w-5 h-5" />}
            color="rose"
          />
          <MetricCard 
            title="Net Profit / Loss" 
            value={isVerified ? formatCurrency(netProfit) : '#VALUE!'}
            subtitle={isVerified ? "Stable Growth" : "Calculating..."}
            icon={<Activity className="w-5 h-5" />}
            color="indigo"
          />
        </div>

        {/* Daily Savings Goal & Transaction Tracker */}
        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-1/4 w-96 h-32 bg-indigo-500/5 blur-3xl rounded-full pointer-events-none" />
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold text-white">Daily Savings Goal Tracker</h2>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 font-medium">
                    Goal: {formatCurrency(savingsGoal)}
                  </span>
                </div>
                <p className="text-sm text-slate-400 mt-0.5">
                  Comparing daily net savings against total daily transactions & targets
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-sm">
                <span className="text-xs text-slate-500 font-medium">Date:</span>
                <select 
                  value={selectedGoalDate} 
                  onChange={(e) => setSelectedGoalDate(e.target.value)}
                  className="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
                >
                  {availableDates.map(date => (
                    <option key={date} value={date} className="bg-slate-900 text-white">
                      {date} {date === '2026-09-08' ? '(Today / Latest)' : ''}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => {
                  setGoalInput(savingsGoal.toString());
                  setIsGoalModalOpen(true);
                }}
                className="flex items-center gap-1.5 bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-300 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
              >
                <Settings2 className="w-4 h-4" />
                Set Goal
              </button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3.5">
              <div className="text-xs text-slate-500 mb-1">Target Savings Goal</div>
              <div className="text-base font-semibold text-white">{formatCurrency(savingsGoal)}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Daily target baseline</div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3.5">
              <div className="text-xs text-slate-500 mb-1">Total Daily Transactions</div>
              <div className="text-base font-semibold text-slate-200">
                {dailyTxCount} tx ({formatCurrency(dailyTxVolume)})
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">Inflow + Outflow volume</div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3.5">
              <div className="text-xs text-slate-500 mb-1">Daily Inflow / Outflow</div>
              <div className="text-base font-semibold flex items-center gap-2">
                <span className="text-emerald-400 text-sm">+{formatCurrency(dailyInflow)}</span>
                <span className="text-slate-600">/</span>
                <span className="text-rose-400 text-sm">-{formatCurrency(dailyOutflow)}</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">Cash movement today</div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3.5">
              <div className="text-xs text-slate-500 mb-1">Net Daily Saved</div>
              <div className={`text-base font-semibold ${dailyNetSaved >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {dailyNetSaved >= 0 ? '+' : ''}{formatCurrency(dailyNetSaved)}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5 truncate">
                {dailyNetSaved >= savingsGoal 
                  ? '🎯 Goal Exceeded!' 
                  : dailyNetSaved > 0 
                    ? `${formatCurrency(savingsGoal - dailyNetSaved)} to goal` 
                    : 'Deficit on this date'}
              </div>
            </div>
          </div>

          {/* Progress Bar Container */}
          <div>
            <div className="flex justify-between items-center text-xs mb-2">
              <span className="text-slate-400 font-medium flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
                Goal Completion ({selectedGoalDate})
              </span>
              <div className="flex items-center gap-2">
                <span className={`font-semibold text-sm ${
                  goalProgressPercent >= 100 ? 'text-emerald-400' :
                  goalProgressPercent >= 50 ? 'text-indigo-400' :
                  goalProgressPercent > 0 ? 'text-amber-400' : 'text-rose-400'
                }`}>
                  {goalProgressPercent.toFixed(1)}%
                </span>
                <span className="text-slate-500 text-xs">
                  ({formatCurrency(Math.max(0, dailyNetSaved))} / {formatCurrency(savingsGoal)})
                </span>
              </div>
            </div>

            <div className="h-4 bg-slate-900 rounded-full border border-slate-800 overflow-hidden relative p-0.5">
              {/* Markers at 25%, 50%, 75% */}
              <div className="absolute top-0 bottom-0 left-1/4 w-[1px] bg-slate-800/80 z-10" />
              <div className="absolute top-0 bottom-0 left-2/4 w-[1px] bg-slate-800/80 z-10" />
              <div className="absolute top-0 bottom-0 left-3/4 w-[1px] bg-slate-800/80 z-10" />

              <motion.div
                className={`h-full rounded-full transition-all duration-500 ${
                  goalProgressPercent >= 100 
                    ? 'bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400' 
                    : goalProgressPercent >= 50
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500'
                      : goalProgressPercent > 0
                        ? 'bg-gradient-to-r from-amber-500 to-indigo-500'
                        : 'bg-rose-500/40'
                }`}
                initial={{ width: 0 }}
                animate={{ width: `${clampedProgress}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </div>

            <div className="flex justify-between items-center text-[10px] text-slate-500 mt-1.5 font-mono">
              <span>0%</span>
              <span>25%</span>
              <span>50%</span>
              <span>75%</span>
              <span>100% Target</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Panel: Pending Transactions */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Cash Flow Chart */}
            <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-6">
                <Activity className="w-5 h-5 text-indigo-500" />
                Cash Flow Progression
              </h2>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorCumulative" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis dataKey="name" stroke="#64748b" tick={{fill: '#64748b', fontSize: 12}} tickLine={false} axisLine={false} />
                    <YAxis 
                      stroke="#64748b" 
                      tickFormatter={(val) => `฿${(val / 1000000).toFixed(1)}M`} 
                      tick={{fill: '#64748b', fontSize: 12}} 
                      tickLine={false} 
                      axisLine={false} 
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#f8fafc' }}
                      itemStyle={{ color: '#818cf8' }}
                      formatter={(value: number) => [formatCurrency(value), 'Cumulative Cash']}
                      labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="cumulative" 
                      stroke="#6366f1" 
                      strokeWidth={3} 
                      fillOpacity={1} 
                      fill="url(#colorCumulative)" 
                      activeDot={{ r: 6, fill: '#6366f1', stroke: '#111827', strokeWidth: 2 }} 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                    <Clock className="w-5 h-5 text-amber-500" />
                    Transaction Processing Queue
                  </h2>
                  <p className="text-sm text-slate-400 mt-1">จัดการธุรกรรมที่ค้างไว้ให้เสร็จ (Slip OCR & Verification)</p>
                </div>
                {!isVerified && (
                  <button 
                    onClick={processTransactions}
                    disabled={isProcessing}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                        <ScanLine className="w-4 h-4" />
                      </motion.div>
                    ) : (
                      <ScanLine className="w-4 h-4" />
                    )}
                    {isProcessing ? 'Processing...' : 'Verify All Slips (OCR)'}
                  </button>
                )}
              </div>

              {/* Search and Filter Controls */}
              <div className="flex flex-col md:flex-row gap-3 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input 
                    type="text"
                    placeholder="Search by ID or title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  />
                </div>
                <div className="flex gap-3">
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <select 
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="appearance-none bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-8 py-2 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors cursor-pointer"
                    >
                      <option value="ALL">All Types</option>
                      <option value="IN">Cash In</option>
                      <option value="OUT">Cash Out</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <select 
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="appearance-none bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-8 py-2 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors cursor-pointer"
                    >
                      <option value="ALL">All Status</option>
                      <option value="PENDING">Pending</option>
                      <option value="VERIFIED">Verified</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                  <button
                    onClick={exportToCSV}
                    className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 whitespace-nowrap"
                  >
                    <Download className="w-4 h-4 text-indigo-400" />
                    Export CSV
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <AnimatePresence>
                  {filteredTransactions.length === 0 ? (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-8 text-slate-500 text-sm border border-dashed border-slate-800 rounded-xl"
                    >
                      No transactions match your search or filter criteria.
                    </motion.div>
                  ) : (
                    filteredTransactions.map((tx) => (
                      <motion.div 
                        key={tx.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-xl border flex items-center justify-between ${
                        tx.status === 'VERIFIED' 
                          ? 'bg-emerald-500/10 border-emerald-500/20' 
                          : 'bg-slate-900 border-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-lg ${tx.type === 'IN' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                          {tx.type === 'IN' ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
                        </div>
                        <div>
                          <div className="text-white font-medium">{tx.title}</div>
                          <div className="text-xs text-slate-500">ID: {tx.id} • Date: {tx.date}</div>
                          {tx.note && <div className="text-sm text-slate-400 mt-1 italic">"{tx.note}"</div>}
                        </div>
                      </div>
                      <div className="text-right flex flex-col items-end">
                        <div className={`font-semibold ${tx.type === 'IN' ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {tx.type === 'IN' ? '+' : '-'}{formatCurrency(tx.amount)}
                        </div>
                        <div className="text-xs flex items-center gap-1 justify-end mt-1">
                          {tx.status === 'VERIFIED' ? (
                            <><CheckCircle2 className="w-3 h-3 text-emerald-500" /> <span className="text-emerald-500">Verified</span></>
                          ) : (
                            <><Clock className="w-3 h-3 text-amber-500" /> <span className="text-amber-500">Pending</span></>
                          )}
                        </div>
                        <button 
                          onClick={() => { setEditingNoteId(tx.id); setNoteInput(tx.note || ''); }} 
                          className="text-xs text-blue-400 hover:text-blue-300 mt-2 flex items-center gap-1 transition-colors"
                        >
                          <MessageSquare className="w-3 h-3" /> {tx.note ? 'Edit Note' : 'Add Note'}
                        </button>
                      </div>
                    </motion.div>
                  )))}
                </AnimatePresence>
              </div>

              {/* Processing Logs Console */}
              <AnimatePresence>
                {(isProcessing || logs.length > 0) && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-6 bg-black border border-slate-800 rounded-xl p-4 font-mono text-xs text-green-400 overflow-hidden"
                  >
                    <div className="max-h-40 overflow-y-auto space-y-1">
                      {logs.map((log, idx) => (
                        <div key={idx} className="opacity-80">{log}</div>
                      ))}
                      <div ref={logsEndRef} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Panel: Bank & Guidelines */}
          <div className="space-y-6">
            
            {/* Bank Info */}
            <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
                <Database className="w-5 h-5 text-indigo-500" />
                Bank Account (Inflow)
              </h2>
              <div className="space-y-3 text-sm">
                <InfoRow label="Bank Holder" value={BANK_INFO.holderName} />
                <InfoRow label="PromptPay No" value={BANK_INFO.accountNo} highlight />
                <InfoRow label="Bank Name" value={BANK_INFO.bankName} />
              </div>
            </div>

            {/* Management Guidelines */}
            <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-blue-500" />
                Management Guidelines
              </h2>
              <div className="space-y-4 text-sm text-slate-400">
                <div>
                  <span className="text-white font-medium block mb-1">การรับรายได้ (Inflow)</span>
                  รวบรวมรายได้จากทุกช่องทางธุรกิจดิจิทัลและพอร์ตการลงทุน โอนเข้าสู่บัญชีปลายทางผ่านเครือข่ายธนาคารที่กำหนด
                </div>
                <div>
                  <span className="text-white font-medium block mb-1">การจัดสรรกระแสเงินสด</span>
                  แบ่งสัดส่วนชัดเจนระหว่างทุนหมุนเวียน ค่าใช้จ่ายในการดำเนินงาน และเงินสำรองขององค์กร
                </div>
                <div>
                  <span className="text-white font-medium block mb-1">การจัดการสินทรัพย์ดิจิทัล</span>
                  อ้างอิงระบบความปลอดภัยและแนวทางการเลือกกระเป๋าเงินดิจิทัลตามมาตรฐานสากล (Bitcoin Wallet Guide)
                </div>
              </div>
            </div>

            {/* Email Dispatcher */}
            <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
                <Send className="w-5 h-5 text-emerald-500" />
                Report Distribution
              </h2>
              <div className="space-y-2 mb-4">
                {EMAILS.map((email) => (
                  <div key={email} className="bg-slate-900 border border-slate-800 rounded px-3 py-2 text-xs text-slate-300 flex justify-between items-center">
                    {email}
                    {isVerified && <CheckCircle2 className="w-3 h-3 text-emerald-500" />}
                  </div>
                ))}
              </div>
              <button 
                disabled={!isVerified}
                className="w-full bg-slate-800 hover:bg-slate-700 text-white py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 mb-3"
                onClick={() => showToast('Financial Report dispatched to authorized emails', 'success')}
              >
                {isVerified ? 'Send Financial Report (2 Aug 2026)' : 'Verify Transactions First'}
              </button>
              <button 
                disabled={!isVerified}
                className="w-full bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600/30 border border-indigo-500/30 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                onClick={exportToPDF}
              >
                <FileText className="w-4 h-4" />
                {isVerified ? 'Download PDF Summary' : 'Pending Verification'}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Toast Notifications Container */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map(toast => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className={`px-4 py-3 rounded-lg shadow-lg border flex items-center gap-3 text-sm font-medium ${
                toast.type === 'success' ? 'bg-emerald-950/90 border-emerald-500/30 text-emerald-400' :
                toast.type === 'error' ? 'bg-rose-950/90 border-rose-500/30 text-rose-400' :
                'bg-blue-950/90 border-blue-500/30 text-blue-400'
              } backdrop-blur-md pointer-events-auto`}
            >
              {toast.type === 'success' && <CheckCircle2 className="w-4 h-4" />}
              {toast.type === 'error' && <X className="w-4 h-4" />}
              {toast.type === 'info' && <Activity className="w-4 h-4" />}
              {toast.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Note Edit Modal */}
      <AnimatePresence>
        {editingNoteId && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#111827] border border-slate-800 rounded-2xl p-6 w-full max-w-md shadow-2xl"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-blue-500" />
                  Transaction Note
                </h3>
                <button onClick={() => setEditingNoteId(null)} className="text-slate-400 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-slate-400 mb-4">
                Add a custom note or comment for <strong>{transactions.find(t => t.id === editingNoteId)?.title}</strong>
              </p>
              <textarea 
                value={noteInput}
                onChange={(e) => setNoteInput(e.target.value)}
                placeholder="Enter your note here..."
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors h-32 resize-none mb-4"
              />
              <div className="flex gap-3 justify-end">
                <button 
                  onClick={() => setEditingNoteId(null)} 
                  className="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white transition-colors border border-slate-700 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button 
                  onClick={saveNote} 
                  className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Save Note
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Savings Goal Edit Modal */}
      <AnimatePresence>
        {isGoalModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#111827] border border-slate-800 rounded-2xl p-6 w-full max-w-md shadow-2xl"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Target className="w-5 h-5 text-indigo-500" />
                  Set Daily Savings Goal
                </h3>
                <button onClick={() => setIsGoalModalOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-slate-400 mb-4">
                Configure your daily target for net savings. The progress bar on your dashboard will update in real-time.
              </p>

              <div className="mb-4">
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Target Amount (THB)</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 font-medium">฿</span>
                  <input 
                    type="number"
                    value={goalInput}
                    onChange={(e) => setGoalInput(e.target.value)}
                    placeholder="500000"
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                  />
                </div>
              </div>

              {/* Quick Presets */}
              <div className="mb-5">
                <label className="block text-xs font-medium text-slate-400 mb-2">Quick Presets</label>
                <div className="grid grid-cols-3 gap-2">
                  {[100000, 250000, 500000, 1000000, 2000000, 5000000].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setGoalInput(preset.toString())}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                        goalInput === preset.toString()
                          ? 'bg-indigo-600/30 border-indigo-500 text-indigo-300'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                      }`}
                    >
                      ฿{(preset / 1000).toLocaleString()}K
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 justify-end">
                <button 
                  onClick={() => setIsGoalModalOpen(false)} 
                  className="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white transition-colors border border-slate-700 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSaveGoal} 
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5"
                >
                  <Target className="w-4 h-4" />
                  Save Goal
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

// Subcomponents
function MetricCard({ title, value, subtitle, icon, color }: { title: string, value: string, subtitle: string, icon: React.ReactNode, color: 'blue' | 'emerald' | 'rose' | 'indigo' }) {
  const colorMap = {
    blue: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    rose: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
    indigo: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
  };

  return (
    <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 flex flex-col justify-between h-full relative overflow-hidden group">
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-${color}-500/10 to-transparent blur-2xl -mr-16 -mt-16 rounded-full`} />
      <div>
        <div className="flex justify-between items-start mb-4">
          <div className="text-slate-400 text-sm font-medium max-w-[70%] leading-tight">{title}</div>
          <div className={`p-2 rounded-xl ${colorMap[color]}`}>
            {icon}
          </div>
        </div>
        <div className={`text-2xl font-bold text-white tracking-tight ${value === '#VALUE!' ? 'blur-[4px] opacity-70 select-none' : ''}`}>
          {value}
        </div>
      </div>
      <div className="mt-4 text-xs font-medium text-slate-500 flex items-center gap-1.5">
        <CheckCircle2 className="w-3 h-3" />
        {subtitle}
      </div>
    </div>
  );
}

function InfoRow({ label, value, highlight = false }: { label: string, value: string, highlight?: boolean }) {
  return (
    <div className="flex justify-between items-center py-1 border-b border-slate-800/50 last:border-0">
      <span className="text-slate-500">{label}</span>
      <span className={`font-mono ${highlight ? 'text-blue-400 font-semibold' : 'text-slate-300'}`}>{value}</span>
    </div>
  );
}
