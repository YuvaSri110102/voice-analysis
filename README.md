# 🎙️ Voice Analytics Dashboard

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19.2-blue)
![Vite](https://img.shields.io/badge/Vite-6.0-purple)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-cyan)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)

A premium, high-performance **Voice Analytics Dashboard** designed with a modern **Dark Mode** aesthetic and **Glassmorphism** UI. Built to visualize call data and failure analysis with interactive, real-time charts.

---

## 🚀 Live Demo

Check out the deployed application:

### [✨ View Live Dashboard](https://voice-analysis-theta.vercel.app/)

---

## ✨ Key Features

- **🎨 Modern Aesthetic**: Deep dark theme inspired by futuristic interfaces, featuring ambient gradients and glassmorphism cards.
- **📊 Interactive Charts**:
  - **Call Duration Line Chart**: Gradient-filled lines with custom tooltips.
  - **Sad Path Analysis**: Interactive donut chart with "Callout" style labels and smooth hover effects.
- **⚡ Real-time Updates**: Edit call data instantly via a sleek modal interface.
- **🛡️ Robust Validation**: Strict email validation and secure data handling.
- **📱 Responsive Design**: Fully optimized for all device sizes.
- **♿ Accessible**: Focus management and semantic HTML structure.

---

## 🛠️ Tech Stack

- **Frontend Framework**: [React](https://react.dev/) (via [Vite](https://vitejs.dev/))
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + Custom CSS Variables
- **Visualization**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Backend/Database**: [Supabase](https://supabase.com/)

---

## 🏁 Getting Started

Follow these steps to set up the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/YuvaSri110102/voice-analysis.git
cd voice-analytics-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

Create a `.env` file in the root directory and add your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

---

## 📦 Build for Production

To create a production-ready build:

```bash
npm run build
```

This will generate optimized static files in the `dist` directory.

---

## 🎨 Project Structure

```bash
src/
├── components/
│   ├── charts/          # Visualization components (CallDuration, SadPath)
│   ├── ConfirmationModal.tsx
│   └── ...
├── lib/
│   └── supabaseClient.ts # Supabase configuration
├── App.tsx              # Main Layout & Logic
├── index.css            # Global Styles & Tailwind Directives
└── main.tsx             # Entry Point
```

---

Made with 💜 by Yuvasri
