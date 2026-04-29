# Project Structure

```
📁 src/
│── 📁 components/         # Reusable UI components
│── 📁 constants/          # Constants for messages and common values
│── 📁 styles/             # Pure CSS stylesheets
│── App.js                 # Main component
│── index.js               # Entry point
│── App.css, index.css     # Global styles
│── reportWebVitals.js     # Performance reporting
│── setupTests.js, App.test.js  # Testing files
│── logo.svg               # Logo asset
```

# App.js - Overview

## 📌 Purpose

`App.js` is the main entry point of the application. It:

- Fetches project data from an API.
- Manages loading and error states.
- Renders the header, main content (`ContentWrapper`), and footer.

## 📂 File Structure

```plaintext
App.js
├── Imports required dependencies and components
├── useState: Manages state for `projectsData`, `loading`, and `error`
├── useEffect: Fetches data from `API_URL` when the component mounts
├── Handles loading and error states
└── Renders `Header`, `ContentWrapper`, and `Footer`
```

## ✅ What’s Good?

- **Component-based structure:** Keeps UI elements modular (`Header`, `Footer`, `ContentWrapper`).
- **State management using hooks:** Proper use of `useState` and `useEffect`.
- **Graceful handling of loading state:** Displays `<Loader />` while fetching data.

---

## ⚠️ Areas for Improvement

### 1️⃣ Improve Error Handling

**Issue:**  
Errors are logged to the console but not displayed in the UI properly.  
**Fix:**  
Set `setError(error.message);` inside `.catch()`.

### 2️⃣ Remove Unnecessary `setTimeout`

**Issue:**  
Loading state is artificially delayed by 1 second.  
**Fix:**  
Remove `setTimeout`, directly set `setLoading(false)`.

### 3️⃣ Use `async/await` for Fetching Data

**Issue:**  
Using `.then()` chaining makes the code slightly harder to read.  
**Fix:**  
Refactor to `async/await` for better readability and error handling.

# ContentWrapper.js - Overview

## 📌 Purpose

The `ContentWrapper` component acts as a **layout wrapper** for the main content area of the application.

- It helps maintain **consistent styling** and **spacing** for the UI.
- Ensures that all wrapped components are displayed within a structured and visually aligned container.

## ✅ What’s Good?

- **Efficient state management:** Uses `useState` to track filtering criteria and pagination.
- **Automatic pagination reset:** If the current page exceeds total pages after filtering, it resets to page 1.
- **Modular design:** Breaks UI elements into separate components (`FilterMenu`, `Table`, `PaginationComponent`).
- **Proper use of `.filter()`:** Filters projects based on user inputs dynamically.

---

## ⚠️ Areas for Improvement

### 1️⃣ Avoid Unnecessary State Updates

**Issue:**  
`useEffect` updates `currentPage` to `1` if it exceeds `totalPages`, but this can cause unnecessary re-renders.  
**Fix:**  
Only update the state if `currentPage !== 1`.

### 2️⃣ Inefficient Filtering Logic

**Issue:**  
Filtering happens on every render, even if no filters change.  
**Fix:**  
Use `useMemo` to avoid recalculating `filteredProjectsData` unless filter values change.

### 3️⃣ Improve Readability of Conditions

**Issue:**  
The filtering logic for `matchesPledged` and `matchesFunded` is hard to read.  
**Fix:**  
Refactor into a separate function to enhance clarity and reusability.

---

# FilterMenu.js - Overview

## 📌 Purpose

The `FilterMenu` component allows users to filter projects based on:

- **Amount Pledged** (min and max values).
- **Percentage Funded** (min and max values).  
  It takes user input, updates the state, and ensures the filtered results reflect in the main content.

---

## ✅ What’s Good?

- **Well-structured component:** Uses clear sections for "Amount Pledged" and "Percentage Funded".
- **Controlled components:** Uses state props to keep input fields controlled.
- **Good UX practices:** Includes placeholder text to guide users.
- **CSS modularity:** Uses an external stylesheet (`filterMenu.css`) to keep styles separate.

---

## ⚠️ Areas for Improvement

### 1️⃣ Prevent Invalid Input

**Issue:**  
Users can enter negative numbers or non-numeric values.  
**Fix:**  
Add `min="0"` in `<input>` fields to restrict negative values.

### 2️⃣ Optimize State Updates

**Issue:**  
Each keystroke triggers `setMinPledged`, `setMaxPledged`, etc., causing unnecessary re-renders.  
**Fix:**  
Use a debounced state update with `useEffect` and `useRef` to optimize performance.

### 3️⃣ Improve Accessibility

**Issue:**  
Labels are visually styled as headings (`<h4>`), but not linked to inputs.  
**Fix:**  
Use `<label for="id">` to associate labels with inputs for better accessibility.

---
