import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, Toaster } from "sonner";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { OverviewTab } from "./components/OverviewTab";
import { ChecklistTab } from "./components/ChecklistTab";
import { TroubleshootingTab } from "./components/TroubleshootingTab";
import { SecurityTab } from "./components/SecurityTab";
import { FileDown, FileText, Download } from "lucide-react";
import jsPDF from "jspdf";
import { fadeInUp, defaultTransition } from "./lib/animations";
import { getDarkMode, setDarkMode } from "./utils/storage";

type TabId = "overview" | "checklist" | "troubleshooting" | "security";

interface Tab {
  id: TabId;
  label: string;
  icon: string;
}

const tabs: Tab[] = [
  { id: "overview", label: "Overview", icon: "📋" },
  { id: "checklist", label: "Creation Checklist", icon: "✅" },
  { id: "troubleshooting", label: "Troubleshooting", icon: "🔧" },
  { id: "security", label: "Security Tips", icon: "🔒" }
];

function App() {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [darkMode, setDarkModeState] = useState(getDarkMode());
  const [isGenerating, setIsGenerating] = useState(false);

  // Dark mode toggle - apply to html element for Tailwind and CSS variables
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleToggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkModeState(newMode);
    setDarkMode(newMode);
  };

  const generatePDF = async (type: "full" | "checklist" | "template") => {
    setIsGenerating(true);
    toast.loading("Generating PDF...", { id: "pdf-generation" });

    try {
      // Simulate async operation for better UX
      await new Promise(resolve => setTimeout(resolve, 500));

      const doc = new jsPDF();

      // MCF Branding
      doc.setFontSize(20);
      doc.setTextColor(1, 38, 153);
      doc.text("MY COLLEGE FINANCE", 105, 20, { align: "center" });

      doc.setFontSize(10);
      doc.setTextColor(100, 116, 139);
      doc.text("EDUCATE • MOTIVATE • ELEVATE", 105, 28, { align: "center" });

      doc.setFontSize(16);
      doc.setTextColor(0, 0, 0);

    if (type === "full") {
      // Cover Page
      doc.setFontSize(24);
      doc.setTextColor(1, 38, 153);
      doc.text("FSA ID", 105, 70, { align: "center" });
      doc.text("Creation Guide", 105, 85, { align: "center" });

      doc.setFontSize(12);
      doc.setTextColor(100, 100, 100);
      doc.text("Complete Step-by-Step Instructions", 105, 105, { align: "center" });
      doc.text(`Generated: ${new Date().toLocaleDateString()}`, 105, 115, { align: "center" });

      // Page 2 - Table of Contents
      doc.addPage();
      doc.setFontSize(18);
      doc.setTextColor(1, 38, 153);
      doc.text("Table of Contents", 20, 30);

      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      let yPos = 50;
      const toc = [
        "1. What is an FSA ID?",
        "2. Who Needs an FSA ID?",
        "3. Before You Begin",
        "4. Step-by-Step Creation Process",
        "5. Security Best Practices",
        "6. Troubleshooting Common Issues",
        "7. Important Reminders"
      ];
      toc.forEach(item => {
        doc.text(item, 25, yPos);
        yPos += 12;
      });

      // Page 3 - What is an FSA ID?
      doc.addPage();
      doc.setFontSize(16);
      doc.setTextColor(1, 38, 153);
      doc.text("1. What is an FSA ID?", 20, 30);

      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      yPos = 45;

      doc.text("An FSA ID is a username and password that gives you access to Federal", 20, yPos);
      yPos += 7;
      doc.text("Student Aid's online systems. It serves as your legal signature for:", 20, yPos);
      yPos += 12;

      const fsaUses = [
        "• Completing the FAFSA form",
        "• Signing your Master Promissory Note (MPN)",
        "• Accessing your federal student aid information",
        "• Completing entrance counseling",
        "• Managing your federal student loans"
      ];
      fsaUses.forEach(item => {
        doc.text(item, 25, yPos);
        yPos += 8;
      });

      // Page 4 - Who Needs an FSA ID?
      doc.addPage();
      doc.setFontSize(16);
      doc.setTextColor(1, 38, 153);
      doc.text("2. Who Needs an FSA ID?", 20, 30);

      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      yPos = 50;

      doc.setFont("helvetica", 'bold');
      doc.text("Students:", 20, yPos);
      doc.setFont("helvetica", 'normal');
      yPos += 8;
      doc.setFontSize(10);
      doc.text("All students applying for federal financial aid must have their own FSA ID.", 25, yPos);
      yPos += 15;

      doc.setFontSize(11);
      doc.setFont("helvetica", 'bold');
      doc.text("Parents:", 20, yPos);
      doc.setFont("helvetica", 'normal');
      yPos += 8;
      doc.setFontSize(10);
      doc.text("Parents of dependent students need their own FSA ID to sign the FAFSA.", 25, yPos);
      yPos += 15;

      doc.setFontSize(11);
      doc.setFont("helvetica", 'bold');
      doc.text("Spouses:", 20, yPos);
      doc.setFont("helvetica", 'normal');
      yPos += 8;
      doc.setFontSize(10);
      doc.text("Married students may need their spouse's FSA ID for certain applications.", 25, yPos);

      // Page 5 - Before You Begin
      doc.addPage();
      doc.setFontSize(16);
      doc.setTextColor(1, 38, 153);
      doc.text("3. Before You Begin - Gather Required Information", 20, 30);

      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      yPos = 50;

      const requirements = [
        { title: "Social Security Number (SSN)", desc: "Enter without dashes or spaces (e.g., 123456789)" },
        { title: "Full Legal Name", desc: "Must match your Social Security card exactly - no nicknames" },
        { title: "Date of Birth", desc: "Enter in the correct format as requested" },
        { title: "Valid Email Address", desc: "Use an email you check regularly for verification" },
        { title: "Mailing Address", desc: "Current address where you can receive mail" },
        { title: "Phone Number", desc: "A number where you can be reached" }
      ];

      requirements.forEach(req => {
        doc.setFont("helvetica", 'bold');
        doc.text(`• ${req.title}`, 20, yPos);
        doc.setFont("helvetica", 'normal');
        yPos += 7;
        doc.text(req.desc, 25, yPos);
        yPos += 12;
      });

      // Page 6 - Step-by-Step Process
      doc.addPage();
      doc.setFontSize(16);
      doc.setTextColor(1, 38, 153);
      doc.text("4. Step-by-Step Creation Process", 20, 30);

      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      yPos = 50;

      const steps = [
        { num: "1", title: "Visit StudentAid.gov", desc: "Go to https://studentaid.gov/fsa-id/create-account" },
        { num: "2", title: "Enter Personal Information", desc: "Provide your SSN, name, date of birth, and contact information" },
        { num: "3", title: "Create Username", desc: "Choose a unique username (not your email address)" },
        { num: "4", title: "Create Password", desc: "Use 8+ characters with letters, numbers, and symbols" },
        { num: "5", title: "Set Challenge Questions", desc: "Choose and answer questions only you would know" },
        { num: "6", title: "Verify Email", desc: "Check your email and click the verification link" },
        { num: "7", title: "Review and Submit", desc: "Double-check all information before submitting" }
      ];

      steps.forEach(step => {
        doc.setFont("helvetica", 'bold');
        doc.setFontSize(11);
        doc.text(`Step ${step.num}: ${step.title}`, 20, yPos);
        doc.setFont("helvetica", 'normal');
        doc.setFontSize(10);
        yPos += 7;
        doc.text(step.desc, 25, yPos);
        yPos += 12;
      });

      // Page 7 - Security Best Practices
      doc.addPage();
      doc.setFontSize(16);
      doc.setTextColor(1, 38, 153);
      doc.text("5. Security Best Practices", 20, 30);

      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      yPos = 50;

      const security = [
        "✓ Never share your FSA ID username or password with anyone",
        "✓ Use a strong, unique password for your FSA ID",
        "✓ Don't use the same password for multiple accounts",
        "✓ Keep your challenge question answers private",
        "✓ Update your contact information if it changes",
        "✓ Log out after using your FSA ID on shared computers",
        "✓ Be cautious of phishing emails asking for your FSA ID"
      ];

      security.forEach(item => {
        doc.text(item, 20, yPos);
        yPos += 10;
      });

      yPos += 10;
      doc.setFillColor(255, 220, 100);
      doc.rect(15, yPos - 5, 180, 25, 'F');
      doc.setFontSize(11);
      doc.setFont("helvetica", 'bold');
      doc.text("⚠ Warning:", 20, yPos + 5);
      doc.setFont("helvetica", 'normal');
      doc.setFontSize(10);
      doc.text("Federal Student Aid will NEVER ask for your password. If someone", 20, yPos + 12);
      doc.text("requests this information, it's likely a scam.", 20, yPos + 19);

      // Page 8 - Troubleshooting
      doc.addPage();
      doc.setFontSize(16);
      doc.setTextColor(1, 38, 153);
      doc.text("6. Troubleshooting Common Issues", 20, 30);

      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      yPos = 50;

      const troubleshooting = [
        { issue: "Account Creation Failed", solution: "Ensure name matches Social Security card exactly" },
        { issue: "Email Already in Use", solution: "Each FSA ID needs a unique email address" },
        { issue: "SSN Not Recognized", solution: "Enter without dashes (123456789) and verify it's correct" },
        { issue: "Forgot Username/Password", solution: "Use account recovery at studentaid.gov" },
        { issue: "Account Locked", solution: "Wait 15 minutes or contact Federal Student Aid" }
      ];

      troubleshooting.forEach(item => {
        doc.setFont("helvetica", 'bold');
        doc.text(`Problem: ${item.issue}`, 20, yPos);
        doc.setFont("helvetica", 'normal');
        yPos += 7;
        doc.text(`Solution: ${item.solution}`, 25, yPos);
        yPos += 12;
      });

      yPos += 10;
      doc.setFontSize(11);
      doc.setFont("helvetica", 'bold');
      doc.text("Need Help?", 20, yPos);
      doc.setFont("helvetica", 'normal');
      doc.setFontSize(10);
      yPos += 8;
      doc.text("Call Federal Student Aid: 1-800-4-FED-AID (1-800-433-3243)", 20, yPos);
      yPos += 7;
      doc.text("Visit: https://studentaid.gov/help", 20, yPos);

      // Page 9 - Important Reminders
      doc.addPage();
      doc.setFontSize(16);
      doc.setTextColor(1, 38, 153);
      doc.text("7. Important Reminders", 20, 30);

      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      yPos = 50;

      const reminders = [
        "Your FSA ID is your legal signature - protect it like you would a handwritten signature",
        "Each person needs their own FSA ID - never share or use someone else's",
        "Keep your FSA ID information in a safe place",
        "Test your FSA ID by logging in at studentaid.gov before using it for applications",
        "Your FSA ID remains active unless you deactivate it",
        "You can update your password and security questions at any time"
      ];

      reminders.forEach((reminder, index) => {
        doc.text(`${index + 1}. ${reminder}`, 20, yPos, { maxWidth: 170 });
        yPos += 15;
      });

    } else if (type === "checklist") {
      // Checklist Cover
      doc.setFontSize(20);
      doc.setTextColor(1, 38, 153);
      doc.text("FSA ID Creation Checklist", 105, 50, { align: "center" });

      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text("Complete this checklist as you create your FSA ID", 105, 60, { align: "center" });
      doc.text(`Generated: ${new Date().toLocaleDateString()}`, 105, 67, { align: "center" });

      // Personal Info Box
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      doc.setDrawColor(1, 38, 153);
      doc.setLineWidth(0.5);
      doc.rect(15, 80, 180, 25);

      let yPos = 88;
      doc.text("Name: ___________________________________________", 20, yPos);
      yPos += 8;
      doc.text("Date Started: ______________  Date Completed: ______________", 20, yPos);

      // Instructions
      yPos = 115;
      doc.setFillColor(240, 248, 255);
      doc.rect(15, yPos, 180, 15, 'F');
      doc.setFontSize(10);
      doc.setFont("helvetica", 'bold');
      doc.text("Instructions: Check off each box as you complete the step", 20, yPos + 10);
      doc.setFont("helvetica", 'normal');

      // Pre-Application Checklist
      yPos = 140;
      doc.setFontSize(14);
      doc.setTextColor(1, 38, 153);
      doc.setFont("helvetica", 'bold');
      doc.text("BEFORE YOU START", 20, yPos);
      doc.setFont("helvetica", 'normal');
      yPos += 10;

      const preChecklist = [
        { item: "Social Security Number (no dashes)", icon: "[ ]" },
        { item: "Legal name (matches Social Security card)", icon: "[ ]" },
        { item: "Date of birth", icon: "[ ]" },
        { item: "Valid email address you check regularly", icon: "[ ]" },
        { item: "Mailing address", icon: "[ ]" },
        { item: "Phone number", icon: "[ ]" }
      ];

      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      preChecklist.forEach((item) => {
        doc.setFontSize(12);
        doc.text(item.icon, 20, yPos);
        doc.setFontSize(10);
        doc.text(item.item, 30, yPos);
        yPos += 9;
      });

      // Main Creation Checklist
      yPos += 5;
      doc.setFontSize(14);
      doc.setTextColor(1, 38, 153);
      doc.setFont("helvetica", 'bold');
      doc.text("ACCOUNT CREATION STEPS", 20, yPos);
      doc.setFont("helvetica", 'normal');
      yPos += 10;

      const mainChecklist = [
        { num: "1", item: "Visit studentaid.gov/fsa-id/create-account" },
        { num: "2", item: "Enter personal information accurately" },
        { num: "3", item: "Create username (NOT your email)" },
        { num: "4", item: "Create strong password (8+ characters, mixed)" },
        { num: "5", item: "Set up challenge questions & answers" },
        { num: "6", item: "Verify email address (check inbox)" },
        { num: "7", item: "Review all information for accuracy" },
        { num: "8", item: "Submit application" },
        { num: "9", item: "Save FSA ID credentials in safe place" },
        { num: "10", item: "Test login at studentaid.gov" }
      ];

      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      mainChecklist.forEach((item) => {
        doc.text("[ ]", 20, yPos);
        doc.setFont("helvetica", 'bold');
        doc.text(`${item.num}.`, 30, yPos);
        doc.setFont("helvetica", 'normal');
        doc.text(item.item, 37, yPos);
        yPos += 9;
      });

      // Page 2 - Security & Notes
      doc.addPage();

      // Security Checklist
      yPos = 30;
      doc.setFontSize(14);
      doc.setTextColor(1, 38, 153);
      doc.setFont("helvetica", 'bold');
      doc.text("SECURITY REMINDERS", 20, yPos);
      doc.setFont("helvetica", 'normal');
      yPos += 10;

      const securityChecklist = [
        "Password is unique (not used elsewhere)",
        "Challenge answers are memorable to me only",
        "FSA ID credentials stored securely",
        "Did NOT share password with anyone",
        "Logged out after creating account"
      ];

      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      securityChecklist.forEach((item) => {
        doc.text("[ ]", 20, yPos);
        doc.text(item, 30, yPos);
        yPos += 9;
      });

      // Notes Section
      yPos += 10;
      doc.setFontSize(14);
      doc.setTextColor(1, 38, 153);
      doc.setFont("helvetica", 'bold');
      doc.text("NOTES & IMPORTANT DATES", 20, yPos);
      doc.setFont("helvetica", 'normal');
      yPos += 10;

      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.text("FSA ID Username (for reference only - keep secure!):", 20, yPos);
      yPos += 7;
      doc.text("_______________________________________________", 20, yPos);
      yPos += 15;

      doc.text("Password Hint (DO NOT write actual password):", 20, yPos);
      yPos += 7;
      doc.text("_______________________________________________", 20, yPos);
      yPos += 15;

      doc.text("Email Used for Verification:", 20, yPos);
      yPos += 7;
      doc.text("_______________________________________________", 20, yPos);
      yPos += 15;

      doc.text("Date FSA ID Was Created:", 20, yPos);
      yPos += 7;
      doc.text("_______________________________________________", 20, yPos);
      yPos += 15;

      doc.text("Additional Notes:", 20, yPos);
      yPos += 7;
      for (let i = 0; i < 5; i++) {
        doc.text("_______________________________________________", 20, yPos);
        yPos += 7;
      }

      // Help Box
      yPos += 5;
      doc.setFillColor(255, 250, 200);
      doc.rect(15, yPos, 180, 25, 'F');
      doc.setFontSize(11);
      doc.setFont("helvetica", 'bold');
      doc.text("Need Help?", 20, yPos + 8);
      doc.setFont("helvetica", 'normal');
      doc.setFontSize(9);
      doc.text("Federal Student Aid: 1-800-4-FED-AID (1-800-433-3243)", 20, yPos + 15);
      doc.text("Website: https://studentaid.gov/help", 20, yPos + 21);

    } else if (type === "template") {
      // Template Cover
      doc.setFontSize(20);
      doc.setTextColor(1, 38, 153);
      doc.text("FSA ID Creation Template", 105, 50, { align: "center" });

      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text("Use this template to organize your information before creating your FSA ID", 105, 60, { align: "center" });
      doc.text(`Generated: ${new Date().toLocaleDateString()}`, 105, 67, { align: "center" });

      // Warning Box
      let yPos = 80;
      doc.setFillColor(255, 240, 240);
      doc.setDrawColor(220, 53, 69);
      doc.setLineWidth(1);
      doc.rect(15, yPos, 180, 20, 'FD');
      doc.setFontSize(10);
      doc.setTextColor(220, 53, 69);
      doc.setFont("helvetica", 'bold');
      doc.text("SECURITY WARNING:", 20, yPos + 8);
      doc.setFont("helvetica", 'normal');
      doc.setFontSize(9);
      doc.setTextColor(0, 0, 0);
      doc.text("Keep this document secure. Do not share your password or SSN with anyone.", 20, yPos + 15);

      // Section 1: Personal Information
      yPos = 110;
      doc.setFontSize(14);
      doc.setTextColor(1, 38, 153);
      doc.setFont("helvetica", 'bold');
      doc.text("1. PERSONAL INFORMATION", 20, yPos);
      doc.setFont("helvetica", 'normal');
      doc.setFontSize(9);
      doc.setTextColor(100, 100, 100);
      doc.text("(This information must match your official documents)", 20, yPos + 7);

      yPos += 15;
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);

      doc.setFont("helvetica", 'bold');
      doc.text("Full Legal Name:", 20, yPos);
      doc.setFont("helvetica", 'normal');
      doc.setFontSize(9);
      doc.text("(As it appears on your Social Security card)", 55, yPos);
      yPos += 5;
      doc.setFontSize(10);
      doc.text("First: _____________________  Middle: __________  Last: _____________________", 20, yPos);
      yPos += 12;

      doc.setFont("helvetica", 'bold');
      doc.text("Social Security Number:", 20, yPos);
      doc.setFont("helvetica", 'normal');
      doc.setFontSize(9);
      doc.text("(Enter without dashes)", 70, yPos);
      yPos += 5;
      doc.setFontSize(10);
      doc.text("___  ___  ___  -  ___  ___ - ___  ___  ___  ___", 20, yPos);
      yPos += 12;

      doc.setFont("helvetica", 'bold');
      doc.text("Date of Birth:", 20, yPos);
      doc.setFont("helvetica", 'normal');
      doc.setFontSize(9);
      doc.text("(MM/DD/YYYY)", 50, yPos);
      yPos += 5;
      doc.setFontSize(10);
      doc.text("___  ___ / ___  ___ / ___  ___  ___  ___", 20, yPos);
      yPos += 12;

      doc.setFont("helvetica", 'bold');
      doc.text("Email Address:", 20, yPos);
      doc.setFont("helvetica", 'normal');
      doc.setFontSize(9);
      doc.text("(Use an email you check regularly)", 52, yPos);
      yPos += 5;
      doc.setFontSize(10);
      doc.text("_________________________________________________________", 20, yPos);
      yPos += 12;

      doc.setFont("helvetica", 'bold');
      doc.text("Phone Number:", 20, yPos);
      doc.setFont("helvetica", 'normal');
      yPos += 5;
      doc.text("(___) ___ - ____", 20, yPos);
      yPos += 12;

      doc.setFont("helvetica", 'bold');
      doc.text("Mailing Address:", 20, yPos);
      doc.setFont("helvetica", 'normal');
      yPos += 5;
      doc.text("Street: _____________________________________________________", 20, yPos);
      yPos += 7;
      doc.text("City: _______________________  State: _____  ZIP: __________", 20, yPos);

      // Page 2 - FSA ID Credentials
      doc.addPage();

      yPos = 30;
      doc.setFontSize(14);
      doc.setTextColor(1, 38, 153);
      doc.setFont("helvetica", 'bold');
      doc.text("2. FSA ID CREDENTIALS", 20, yPos);
      doc.setFont("helvetica", 'normal');
      doc.setFontSize(9);
      doc.setTextColor(100, 100, 100);
      doc.text("(Create strong, unique credentials for your FSA ID)", 20, yPos + 7);

      yPos += 20;
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);

      doc.setFont("helvetica", 'bold');
      doc.text("Username:", 20, yPos);
      doc.setFont("helvetica", 'normal');
      doc.setFontSize(9);
      doc.text("(Must be unique, NOT your email address)", 45, yPos);
      yPos += 5;
      doc.setFontSize(10);
      doc.text("_________________________________________________________", 20, yPos);
      yPos += 15;

      doc.setFont("helvetica", 'bold');
      doc.text("Password:", 20, yPos);
      doc.setFont("helvetica", 'normal');
      doc.setFontSize(9);
      doc.text("(8+ characters: uppercase, lowercase, numbers, symbols)", 45, yPos);
      yPos += 5;
      doc.setFontSize(10);
      doc.text("_________________________________________________________", 20, yPos);
      yPos += 12;

      doc.setFontSize(9);
      doc.setFillColor(240, 248, 255);
      doc.rect(20, yPos, 170, 18, 'F');
      doc.text("Password Requirements: At least 8 characters with:", 25, yPos + 5);
      doc.text("✓ Uppercase letter   ✓ Lowercase letter   ✓ Number   ✓ Symbol", 25, yPos + 12);
      yPos += 25;

      // Challenge Questions
      doc.setFontSize(14);
      doc.setTextColor(1, 38, 153);
      doc.setFont("helvetica", 'bold');
      doc.text("3. CHALLENGE QUESTIONS", 20, yPos);
      doc.setFont("helvetica", 'normal');
      doc.setFontSize(9);
      doc.setTextColor(100, 100, 100);
      doc.text("(Choose answers only YOU would know - for account recovery)", 20, yPos + 7);

      yPos += 18;
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);

      for (let i = 1; i <= 3; i++) {
        doc.setFont("helvetica", 'bold');
        doc.text(`Challenge Question ${i}:`, 20, yPos);
        doc.setFont("helvetica", 'normal');
        yPos += 5;
        doc.text("_________________________________________________________", 20, yPos);
        yPos += 10;
        doc.text("Answer: _________________________________________________", 20, yPos);
        yPos += 15;
      }

      // Page 3 - Verification & Notes
      doc.addPage();

      yPos = 30;
      doc.setFontSize(14);
      doc.setTextColor(1, 38, 153);
      doc.setFont("helvetica", 'bold');
      doc.text("4. ACCOUNT VERIFICATION", 20, yPos);
      doc.setFont("helvetica", 'normal');

      yPos += 15;
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);

      doc.setFont("helvetica", 'bold');
      doc.text("Date Account Created:", 20, yPos);
      doc.setFont("helvetica", 'normal');
      yPos += 5;
      doc.text("___  ___ / ___  ___ / ___  ___  ___  ___", 20, yPos);
      yPos += 15;

      doc.setFont("helvetica", 'bold');
      doc.text("Email Verification Completed:", 20, yPos);
      doc.setFont("helvetica", 'normal');
      yPos += 5;
      doc.text("[ ] Yes    [ ] No    Date: ___________________", 20, yPos);
      yPos += 15;

      doc.setFont("helvetica", 'bold');
      doc.text("Test Login Successful:", 20, yPos);
      doc.setFont("helvetica", 'normal');
      yPos += 5;
      doc.text("[ ] Yes    [ ] No    Date: ___________________", 20, yPos);
      yPos += 25;

      // Important Reminders
      doc.setFontSize(14);
      doc.setTextColor(1, 38, 153);
      doc.setFont("helvetica", 'bold');
      doc.text("5. IMPORTANT REMINDERS", 20, yPos);
      doc.setFont("helvetica", 'normal');

      yPos += 15;
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);

      const reminders = [
        "[ ] Stored this document in a secure location",
        "[ ] Did NOT share password with anyone",
        "[ ] Logged in successfully at studentaid.gov",
        "[ ] Saved username in secure password manager",
        "[ ] Ready to use FSA ID for FAFSA application"
      ];

      reminders.forEach(reminder => {
        doc.text(reminder, 20, yPos);
        yPos += 10;
      });

      // Notes Section
      yPos += 10;
      doc.setFontSize(14);
      doc.setTextColor(1, 38, 153);
      doc.setFont("helvetica", 'bold');
      doc.text("ADDITIONAL NOTES", 20, yPos);
      doc.setFont("helvetica", 'normal');

      yPos += 15;
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);

      for (let i = 0; i < 8; i++) {
        doc.text("_________________________________________________________", 20, yPos);
        yPos += 7;
      }

      // Help Footer
      yPos += 5;
      doc.setFillColor(255, 250, 200);
      doc.rect(15, yPos, 180, 30, 'F');
      doc.setFontSize(11);
      doc.setFont("helvetica", 'bold');
      doc.text("Need Help Creating Your FSA ID?", 20, yPos + 10);
      doc.setFont("helvetica", 'normal');
      doc.setFontSize(9);
      doc.text("Phone: 1-800-4-FED-AID (1-800-433-3243)", 20, yPos + 17);
      doc.text("Website: https://studentaid.gov/fsa-id/create-account", 20, yPos + 23);
    }

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text("© 2025 My College Finance. All rights reserved.", 105, 285, { align: "center" });

      // Save
      const filename = type === "full"
        ? "MCF-FSA-ID-Guide.pdf"
        : type === "checklist"
        ? "MCF-FSA-ID-Checklist.pdf"
        : "MCF-FSA-ID-Template.pdf";

      doc.save(filename);

      toast.success(`Downloaded ${filename}`, { id: "pdf-generation" });
    } catch (error) {
      console.error("PDF generation failed:", error);
      toast.error("Failed to generate PDF. Please try again.", {
        id: "pdf-generation",
        duration: 5000
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Skip to main content link for keyboard navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2
                   focus:z-50 focus:px-4 focus:py-2 focus:bg-brand-blue focus:text-white
                   focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2
                   focus:ring-brand-blue focus:ring-offset-2"
      >
        Skip to main content
      </a>

      <Toaster position="top-right" richColors />
      <Header darkMode={darkMode} onToggleDarkMode={handleToggleDarkMode} />

      <main id="main-content" className="flex-1">
        <div className="container mx-auto px-4 sm:px-6 py-8">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-brand-blue dark:text-blue-400">
              FSA ID Creation Guide
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-200 max-w-3xl mx-auto">
              Step-by-step guide to creating your FSA ID with troubleshooting support
            </p>
          </div>

          {/* Tabs Navigation with ARIA */}
          <div className="border-b border-gray-200 dark:border-gray-700 mb-6 overflow-x-auto bg-white dark:bg-gray-800 rounded-t-lg">
            <nav className="flex gap-2 min-w-max px-2" role="tablist" aria-label="FSA ID Guide Sections">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  aria-controls={`${tab.id}-panel`}
                  id={`${tab.id}-tab`}
                  tabIndex={activeTab === tab.id ? 0 : -1}
                  className={`px-4 py-3 font-semibold whitespace-nowrap border-b-2 transition-all
                    ${activeTab === tab.id
                      ? "border-brand-blue bg-brand-blue/10 dark:bg-blue-900/30 text-brand-blue dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-200 border-transparent hover:border-brand-blue/50 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                >
                  <span className="mr-2" aria-hidden="true">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content with Animations and ARIA */}
          <div className="mb-8">
            <AnimatePresence mode="wait">
              {activeTab === "overview" && (
                <motion.div
                  key="overview"
                  id="overview-panel"
                  role="tabpanel"
                  aria-labelledby="overview-tab"
                  variants={fadeInUp}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={defaultTransition}
                >
                  <OverviewTab />
                </motion.div>
              )}
              {activeTab === "checklist" && (
                <motion.div
                  key="checklist"
                  id="checklist-panel"
                  role="tabpanel"
                  aria-labelledby="checklist-tab"
                  variants={fadeInUp}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={defaultTransition}
                >
                  <ChecklistTab />
                </motion.div>
              )}
              {activeTab === "troubleshooting" && (
                <motion.div
                  key="troubleshooting"
                  id="troubleshooting-panel"
                  role="tabpanel"
                  aria-labelledby="troubleshooting-tab"
                  variants={fadeInUp}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={defaultTransition}
                >
                  <TroubleshootingTab />
                </motion.div>
              )}
              {activeTab === "security" && (
                <motion.div
                  key="security"
                  id="security-panel"
                  role="tabpanel"
                  aria-labelledby="security-tab"
                  variants={fadeInUp}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={defaultTransition}
                >
                  <SecurityTab />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Action Buttons with Animations */}
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.2 }}
          >
            <motion.button
              onClick={() => generatePDF("full")}
              disabled={isGenerating}
              className="flex items-center gap-2 px-6 py-3 bg-[#012699] text-white dark:bg-blue-600 dark:text-white
                       rounded-lg font-semibold hover:bg-[#012699]/90 dark:hover:bg-blue-500 transition-all
                       focus:outline-none focus:ring-2 focus:ring-[#012699] focus:ring-offset-2
                       disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={isGenerating ? { rotate: 360 } : {}}
                transition={{ duration: 1, repeat: isGenerating ? Infinity : 0, ease: "linear" }}
              >
                <FileDown className="w-5 h-5" />
              </motion.div>
              Download Full Guide
            </motion.button>
            <motion.button
              onClick={() => generatePDF("checklist")}
              disabled={isGenerating}
              className="flex items-center gap-2 px-6 py-3 bg-[#26e011] text-[#000516]
                       rounded-lg font-semibold hover:bg-[#26e011]/90 transition-all
                       focus:outline-none focus:ring-2 focus:ring-[#26e011] focus:ring-offset-2
                       disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={isGenerating ? { rotate: 360 } : {}}
                transition={{ duration: 1, repeat: isGenerating ? Infinity : 0, ease: "linear" }}
              >
                <FileText className="w-5 h-5" />
              </motion.div>
              Download Checklist
            </motion.button>
            <motion.button
              onClick={() => generatePDF("template")}
              disabled={isGenerating}
              className="flex items-center gap-2 px-6 py-3 bg-[#fdc003] text-[#000516] dark:bg-amber-500 dark:text-gray-900
                       rounded-lg font-semibold hover:bg-[#fdc003]/90 dark:hover:bg-amber-400 transition-all
                       focus:outline-none focus:ring-2 focus:ring-[#fdc003] focus:ring-offset-2
                       disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={isGenerating ? { rotate: 360 } : {}}
                transition={{ duration: 1, repeat: isGenerating ? Infinity : 0, ease: "linear" }}
              >
                <Download className="w-5 h-5" />
              </motion.div>
              Download Template
            </motion.button>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
