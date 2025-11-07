# Visual Testing Guide - MCF Color Fix Verification

## 🎯 Purpose
This guide helps you verify that the MCF brand colors are correctly implemented in the FSA-ID-Interactive-Creation-Guide app.

---

## 🚀 Quick Start

1. **Ensure dev server is running:**
   ```bash
   npm run dev
   ```
   - App should be at: http://localhost:5173/FSA-ID-Interactive-Creation-Guide/

2. **Force browser refresh:**
   - Windows/Linux: `Ctrl + Shift + R`
   - Mac: `Cmd + Shift + R`

3. **Open browser DevTools:**
   - Press `F12` or right-click → Inspect

---

## 📋 Visual Checklist

### Light Mode Testing

#### Header Section
- [ ] **Logo** - Official MCF owl logo with graduation cap displays correctly
- [ ] **Brand Name** - "MY COLLEGE FINANCE" text is in **MCF Brand Blue** (#012699)
  - Should be a deep, rich blue (not light or sky blue)
- [ ] **Tagline** - "EDUCATE • MOTIVATE • ELEVATE" is in muted foreground color
- [ ] **Theme Toggle** - Moon icon visible in light mode

#### Hero Section
- [ ] **Main Heading** - "FSA ID Creation Guide" has gradient from brand blue to primary
- [ ] **Subheading** - Gray text, readable and well-contrasted

#### Tabs Navigation
- [ ] **Active Tab** - Has:
  - **Blue bottom border** (MCF Brand Blue)
  - **Blue text** (MCF Brand Blue)
  - **Light blue background** (brand-blue/5 opacity)
- [ ] **Inactive Tabs** - Gray text, no border
- [ ] **Hover State** - Tabs lighten and show faint blue border

#### Tab Content
- [ ] **Section Headings (h2)** - Blue color (text-brand-blue class)
  - "What is an FSA ID?"
  - "Who Needs an FSA ID?"
  - All card titles
- [ ] **Body Text** - Black/dark gray, highly readable
- [ ] **Card Backgrounds** - White with subtle borders

#### Action Buttons
- [ ] **Primary Button** ("Download Full Guide")
  - Background: **MCF Brand Blue** (#012699)
  - Text: White
  - Hover: Slightly darker blue
- [ ] **Success Button** ("Download Checklist")
  - Background: **MCF Brand Green** (#26e011)
  - Text: Dark/black
  - Hover: Slightly darker green
- [ ] **Secondary Button** ("Download Template")
  - Background: Light gray
  - Text: Dark
  - Hover: Slightly darker gray

#### Footer
- [ ] **Background** - Gradient from gray to dark
- [ ] **Links** - Light gray text
- [ ] **Link Hover** - MCF Brand Amber (#fdc003) - golden yellow

---

### Dark Mode Testing

#### Header Section
- [ ] **Logo** - Still displays correctly (white owl on blue circle)
- [ ] **Brand Name** - "MY COLLEGE FINANCE" text remains **MCF Brand Blue** (#012699)
  - Should still be visible and readable
- [ ] **Tagline** - Light gray text
- [ ] **Theme Toggle** - Sun icon visible with amber color

#### Hero Section
- [ ] **Background** - Dark (almost black)
- [ ] **Main Heading** - Gradient still visible, lighter blue tones
- [ ] **Subheading** - Light gray text

#### Tabs Navigation
- [ ] **Active Tab**
  - Blue bottom border (lighter blue in dark mode)
  - Blue text
  - Subtle blue background
- [ ] **Inactive Tabs** - Light gray text
- [ ] **Hover State** - Lightens appropriately

#### Tab Content
- [ ] **Section Headings** - Blue color, slightly lighter than light mode
- [ ] **Body Text** - Light gray/white, readable
- [ ] **Card Backgrounds** - Dark gray (#141414)
- [ ] **Card Borders** - Visible but subtle

#### Action Buttons
- [ ] **Primary Button**
  - Background: Lighter blue (#1e40af) - more visible in dark mode
  - Text: White
  - Hover works correctly
- [ ] **Success Button**
  - Background: Still **MCF Brand Green** (#26e011)
  - Text: Dark
  - High contrast maintained
- [ ] **Secondary Button**
  - Background: Dark gray
  - Text: Light
  - Visible and readable

#### Footer
- [ ] **Background** - Dark gradient
- [ ] **Text** - Light gray
- [ ] **Links** - Light colored
- [ ] **Link Hover** - Amber color still appears

---

## 🔍 DevTools Inspection

### Check Computed Styles

1. **Right-click on "MY COLLEGE FINANCE" text** → Inspect
2. In **Styles panel**, look for:
   ```css
   color: rgb(1, 38, 153); /* This is #012699 */
   ```

3. **Right-click on primary button** → Inspect
4. Look for:
   ```css
   background-color: rgb(1, 38, 153); /* Light mode */
   /* OR */
   background-color: rgb(30, 64, 175); /* Dark mode - #1e40af */
   ```

### Check CSS Variables

1. Open **Console** (F12)
2. Run this command:
   ```javascript
   getComputedStyle(document.documentElement).getPropertyValue('--color-brand-blue')
   ```
3. Should return: `#012699`

4. Check primary color:
   ```javascript
   getComputedStyle(document.documentElement).getPropertyValue('--color-primary')
   ```
5. Should return: `#012699` (light mode) or `#1e40af` (dark mode)

---

## 🎨 Color Reference Card

### MCF Brand Colors (for visual comparison)

**Brand Blue (#012699)**
- RGB: rgb(1, 38, 153)
- HSL: hsl(218, 99%, 30%)
- Appearance: Deep royal blue, like a rich navy

**Brand Green (#26e011)**
- RGB: rgb(38, 224, 17)
- HSL: hsl(115, 93%, 47%)
- Appearance: Bright lime green, highly visible

**Brand Amber (#fdc003)**
- RGB: rgb(253, 192, 3)
- HSL: hsl(45, 98%, 50%)
- Appearance: Golden yellow/amber, warm tone

**Brand Black (#000516)**
- RGB: rgb(0, 5, 22)
- HSL: hsl(235, 95%, 4%)
- Appearance: Deep blue-black, almost pure black

---

## 🐛 Common Issues & Fixes

### Issue: Colors Don't Change After Edit

**Solution:**
1. Stop dev server (`Ctrl+C`)
2. Delete `node_modules/.vite` cache:
   ```bash
   rm -rf node_modules/.vite
   ```
3. Restart dev server:
   ```bash
   npm run dev
   ```
4. Hard refresh browser (`Ctrl+Shift+R`)

### Issue: Brand Name Not Blue

**Check:**
1. Inspect element in DevTools
2. Verify class: `text-brand-blue`
3. Check computed color: should be `rgb(1, 38, 153)`
4. If wrong, check `src/index.css` for `--color-brand-blue`

### Issue: Buttons Wrong Color

**Check:**
1. Primary button should use: `bg-primary`
2. Success button should use: `bg-[#26e011]` (hardcoded)
3. Inspect and verify computed background colors

### Issue: Dark Mode Colors Look Wrong

**Check:**
1. Toggle to dark mode
2. Open DevTools Console
3. Verify dark mode is active:
   ```javascript
   document.documentElement.classList.contains('dark')
   ```
4. Should return `true` in dark mode

---

## 📸 Screenshots to Capture

Take screenshots of these areas for documentation:

### Light Mode
1. **Header** - Full header with logo and brand name
2. **Hero Section** - Main heading with gradient
3. **Tabs** - Navigation with active tab highlighted
4. **Action Buttons** - All three buttons visible
5. **Section Heading** - Any blue heading in content
6. **Footer** - Bottom with links

### Dark Mode
1. **Full Page** - Overview of dark theme
2. **Header** - Theme toggle showing sun icon
3. **Buttons** - All three in dark mode
4. **Content Cards** - Dark backgrounds
5. **Footer** - Dark gradient

---

## ✅ Sign-Off Checklist

- [ ] All light mode colors verified
- [ ] All dark mode colors verified
- [ ] Brand blue (#012699) appears in header
- [ ] Primary buttons use brand blue
- [ ] Success button uses brand green
- [ ] Tabs use brand blue when active
- [ ] Section headings use brand blue
- [ ] Footer links hover to amber
- [ ] Theme toggle works correctly
- [ ] No console errors
- [ ] DevTools CSS variable checks pass
- [ ] Screenshots captured

---

## 🎓 Understanding the Fix

### What Changed
The `src/index.css` file was updated to:
1. **Define semantic colors** using MCF brand palette
2. **Fix dark mode primary color** from Tailwind blue to MCF blue variant
3. **Add success and warning colors** for consistency
4. **Ensure ring colors** use brand blue

### How It Works
Tailwind CSS v4's `@theme` directive converts CSS variables into utility classes:
- `--color-brand-blue: #012699` → Creates `text-brand-blue`, `bg-brand-blue`, etc.
- `--color-primary: #012699` → Creates `bg-primary`, `text-primary`, etc.

### Why Different Blues in Dark Mode?
- **Light Mode:** Uses original MCF blue (#012699) - high contrast on white
- **Dark Mode:** Uses lighter blue (#1e40af) - maintains visibility on dark backgrounds
- **Brand Blue Class:** Always uses original #012699 for brand consistency

---

**Last Updated:** 2025-11-06
**Verified By:** UX/UI Designer Agent
**Status:** Ready for Testing
