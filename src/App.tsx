import {
  Activity,
  BarChart3,
  AlertCircle,
  Download,
} from "lucide-react";
import { useState, useEffect } from "react";

import CallDurationChart from "./components/charts/CallDurationChart";
import EditCallDataModal from "./components/charts/EditCallDataModal";
import SadPathChart from "./components/charts/SadPathChart";
import ConfirmationModal from "./components/ConfirmationModal";
import supabase from "./lib/supabaseClient";

const initialCallData = [
  { time: "9 AM", duration: 120 },
  { time: "10 AM", duration: 180 },
  { time: "11 AM", duration: 150 },
  { time: "12 PM", duration: 200 },
];

function App() {
  const [email, setEmail] = useState("");
  const [callData, setCallData] = useState(initialCallData);
  const [showEditModal, setShowEditModal] = useState(false);
  const [pendingSave, setPendingSave] = useState<{
    email: string;
    data: typeof callData;
  } | null>(null);

  const fetchCallData = async (email: string) => {
    if (!email) {
      setCallData(initialCallData);
      return;
    }

    const { data, error } = await supabase
      .from("chart_data")
      .select("values")
      .eq("email", email)
      .eq("chart_name", "call_duration")
      .maybeSingle();

    if (error) {
      console.error(error);
      setCallData(initialCallData);
      return;
    }

    if (data?.values) {
      setCallData(data.values);
    } else {
      setCallData(initialCallData);
    }
  };


  useEffect(() => {
    fetchCallData(email);
  }, [email]);


  const performSave = async (
    email: string,
    newData: typeof callData
  ) => {
    const { data: existing } = await supabase
      .from("chart_data")
      .select("id")
      .eq("email", email)
      .eq("chart_name", "call_duration")
      .maybeSingle();

    if (existing) {
      await supabase
        .from("chart_data")
        .update({
          values: newData,
          updated_at: new Date().toISOString(),
        })
        .eq("email", email)
        .eq("chart_name", "call_duration");
    } else {
      await supabase.from("chart_data").insert({
        email,
        chart_name: "call_duration",
        values: newData,
      });
    }

    await fetchCallData(email);
    setShowEditModal(false);
    setPendingSave(null);
  };

  const handleSaveRequest = async (
    email: string,
    newData: typeof callData
  ) => {
    if (!email) {
      alert("Email is required");
      return;
    }

    const { data: existing } = await supabase
      .from("chart_data")
      .select("id")
      .eq("email", email)
      .eq("chart_name", "call_duration")
      .single();

    if (existing) {
      setPendingSave({ email, data: newData });
    } else {
      await performSave(email, newData);
    }
  };

  return (
    <div className="min-h-screen text-slate-200 selection:bg-bryn-purple/30">
      {/* Background */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-bryn-purple/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-bryn-accent/10 rounded-full blur-[120px]" />
      </div>

      {/* Header */}
      <header className="fixed top-0 w-full z-50 glass-header">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-6 h-6 text-bryn-purple" />
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              VoiceAnalytics
            </h1>
          </div>
          <nav className="flex items-center gap-6 text-sm font-medium text-slate-400">
            <a className="hover:text-white">Dashboard</a>
            <a className="hover:text-white">Reports</a>
            <a className="hover:text-white">Settings</a>
            <button className="btn-primary flex items-center gap-2 text-xs">
              <Download className="w-4 h-4" /> Export
            </button>
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-6 pt-24 pb-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Dashboard Overview
          </h2>
          <p className="text-slate-400">
            Real-time insights into your voice agent performance.
          </p>
        </div>

        {/* Email Input */}
        <div className="mb-6">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white/5 border border-white/10 px-4 py-2 rounded-lg w-full md:w-1/3 text-sm"
          />
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Call Duration */}
          <div className="glass-card p-6 rounded-2xl border border-white/5">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-bryn-accent" />
                Call Duration
              </h3>
              <button
                onClick={() => setShowEditModal(true)}
                className="text-xs text-slate-300 hover:text-white bg-white/5 px-3 py-1.5 rounded-full"
              >
                Edit Data
              </button>
            </div>
            <CallDurationChart data={callData} />
          </div>

          {/* Failure Chart */}
          <div className="glass-card p-6 rounded-2xl border border-white/5">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-400" />
                Failure Analysis
              </h3>
            </div>
            <SadPathChart />
          </div>
        </section>

        {/* Modals */}
        <EditCallDataModal
          open={showEditModal}
          initialData={callData}
          onClose={() => setShowEditModal(false)}
          onSave={handleSaveRequest}
        />

        <ConfirmationModal
          open={!!pendingSave}
          title="Overwrite Existing Data?"
          description="Data already exists for this email. Do you want to overwrite it?"
          onClose={() => setPendingSave(null)}
          onConfirm={() =>
            pendingSave &&
            performSave(pendingSave.email, pendingSave.data)
          }
        />
      </main>
    </div>
  );
}

export default App;
