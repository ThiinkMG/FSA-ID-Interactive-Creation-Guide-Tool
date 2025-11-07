# Testing Guide for FSA-ID Interactive Creation Guide

**Current Dev Server:** http://localhost:5175/FSA-ID-Interactive-Creation-Guide/

## ✅ What Was Fixed

### 1. Download Buttons (Full Guide & Template)
**Problem:** Buttons were invisible or text/icons couldn't be seen

**Fix:**
- Changed from CSS variables to explicit hex colors
- Added shadow and better contrast
- **Download Full Guide**: Now MCF brand blue (#012699) with white text
- **Download Checklist**: Green (#26e011) with dark text (unchanged)
- **Download Template**: MCF brand amber (#fdc003) with dark text

### 2. Dark Mode Toggle Button
**Problem:** Toggle button wasn't working or wasn't visible

**Fixes:**
- Enhanced button visibility with border, shadow, and better background colors
- Added text label ("Light"/"Dark") next to the icon (visible on desktop)
- Added console logging for debugging
- Button now shows 🌙 in light mode, ☀️ in dark mode

---

## 🧪 Testing Instructions

### Step 1: Open the Application
1. Open your browser (Chrome, Firefox, or Edge)
2. Navigate to: **http://localhost:5175/FSA-ID-Interactive-Creation-Guide/**
3. Open Developer Tools (Press F12)
4. Go to the **Console** tab

### Step 2: Test Dark Mode Toggle
1. Look at the top-right corner of the page
2. You should see a button with either:
   - 🌙 (moon icon) if in light mode
   - ☀️ (sun icon) if in dark mode
3. **Click the button**
4. Check the console - you should see logs like:
   ```
   Toggling theme from light to dark
   Added dark class to document
   Current classes: dark
   ```
5. The entire page should change:
   - **Light Mode**: White background, dark text
   - **Dark Mode**: Dark gray/black background, light text
6. Click again to toggle back
7. **Verify it persists**: Refresh the page (F5) - it should remember your choice

### Step 3: Test Download Buttons
Scroll to the bottom of the page. You should see 3 buttons:

**Expected Appearance:**
1. **Download Full Guide**:
   - Light mode: Blue background (#012699) with white text
   - Dark mode: Lighter blue background with white text
   - Icon: Download arrow icon

2. **Download Checklist**:
   - Bright green background with black text (both modes)
   - Icon: File/text icon

3. **Download Template**:
   - Light mode: Amber/yellow background (#fdc003) with dark text
   - Dark mode: Lighter amber with dark text
   - Icon: Download icon

**Test Each Button:**
- Click each button
- A PDF should download
- Check console for any errors

### Step 4: Test Other Features

**Video Player:**
- Should be expanded by default
- Click the play button on the video thumbnail
- Video should load and play

**Tab Navigation:**
- Click each tab: Overview, Creation Checklist, Troubleshooting, Security
- All should switch content smoothly

**Checklist (Creation Checklist tab):**
- Click checkboxes
- Progress bar should update
- Toast notifications should appear

---

## 🐛 Troubleshooting

### If Dark Mode Toggle Doesn't Work:

1. **Check Console Logs:**
   - Open DevTools (F12) → Console tab
   - Click the dark mode button
   - Look for the debug logs:
     - "Toggling theme from X to Y"
     - "Added/Removed dark class"
     - "Current classes: ..."

2. **If you see the logs but nothing changes visually:**
   - Clear your browser cache: Ctrl+Shift+Delete (or Cmd+Shift+Delete on Mac)
   - Hard refresh: Ctrl+Shift+R (or Cmd+Shift+R on Mac)
   - Check if the `dark` class is on the `<html>` element:
     - In DevTools, go to Elements tab
     - Look at `<html lang="en">`
     - When in dark mode, it should show `<html lang="en" class="dark">`

3. **If the button itself is not visible:**
   - The button is in the top-right corner of the header
   - It has a gray background with a border
   - Try zooming in (Ctrl/Cmd + "+")

### If Download Buttons Are Not Visible:

1. **Check if you scrolled to the bottom:**
   - Buttons are below all the tab content
   - Scroll all the way down

2. **Check the background color:**
   - Light mode: Page background should be light gray/white
   - Dark mode: Page background should be dark gray
   - Buttons should stand out with their colored backgrounds

3. **Clear browser cache and hard refresh:**
   - Ctrl+Shift+Delete to clear cache
   - Ctrl+Shift+R to hard refresh

---

## 📝 Current Status

✅ **Fixed:**
- Download button colors (Full Guide & Template now visible)
- Dark mode toggle button visibility
- Dark mode toggle functionality with debugging
- Text contrast in both light and dark modes
- Video player (starts expanded with clear instructions)

⚠️ **Known Issue:**
- TypeScript build errors with ReactPlayer (doesn't affect dev mode functionality)

---

## 🔍 Debug Information

If you're still having issues, provide this information:

1. **Browser and version:** (e.g., Chrome 120, Firefox 121)
2. **Console logs:** Copy any error messages from the Console tab
3. **Dark mode state:**
   - Open Console
   - Type: `localStorage.getItem('mcf-theme')`
   - Press Enter
   - What does it say?
4. **HTML class:**
   - Open Console
   - Type: `document.documentElement.className`
   - Press Enter
   - What does it say?
5. **Screenshot:** Take a screenshot showing:
   - The entire page
   - The header with the dark mode button
   - The bottom section with download buttons

---

## ✅ Expected Results

**Light Mode:**
- White/light gray backgrounds
- Dark text (#0a0a0a, gray-900)
- Brand blue headings (#012699)
- Blue "Download Full Guide" button
- Bright green "Download Checklist" button
- Amber "Download Template" button
- 🌙 (moon) icon in top-right button

**Dark Mode:**
- Dark gray/black backgrounds (#09090b, gray-950)
- Light text (#f8fafc, gray-100)
- Lighter blue headings (#3b82f6)
- Lighter blue "Download Full Guide" button
- Same green "Download Checklist" button
- Lighter amber "Download Template" button
- ☀️ (sun) icon in top-right button

Both modes should have excellent text contrast and all elements should be clearly visible.
