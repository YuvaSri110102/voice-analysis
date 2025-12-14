import { Activity, BarChart3, AlertCircle, Download } from "lucide-react";
import CallDurationChart from "./components/charts/CallDurationChart";
import EditCallDataModal from "./components/charts/EditCallDataModal";
import SadPathChart from "./components/charts/SadPathChart";
import ConfirmationModal from "./components/ConfirmationModal";
import { useState } from "react";
import supabase from "./lib/supabaseClient";

const initialCallData = [
  { time: "9 AM", duration: 120 },
  { time: "10 AM", duration: 180 },
  { time: "11 AM", duration: 150 },
  { time: "12 PM", duration: 200 },
];

function App() {
  const [callData, setCallData] = useState(initialCallData);
  const [showEditModal, setShowEditModal] = useState(false);
  const [pendingSave, setPendingSave] = useState<{
    email: string;
    data: typeof callData;
  } | null>(null);

  const performSave = async (email: string, newData: typeof callData) => {
    const { data: existing } = await supabase
      .from("chart_data")
      .select("*")
      .eq("email", email)
      .eq("chart_name", "call_duration")
      .single();

    if (existing) {
      await supabase
        .from("chart_data")
        .update({
          values: newData,
          updated_at: new Date().toISOString(),
        })
        .eq("email", email);
    } else {
      await supabase.from("chart_data").insert({
        email,
        chart_name: "call_duration",
        values: newData,
      });
    }

    setCallData(newData);
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
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-bryn-purple/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-bryn-accent/10 rounded-full blur-[120px]" />
      </div>
      <header className="fixed top-0 w-full z-50 glass-header">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-6 h-6 text-bryn-purple" />
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              VoiceAnalytics
            </h1>
          </div>
          <nav className="flex items-center gap-6 text-sm font-medium text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Dashboard</a>
            <a href="#" className="hover:text-white transition-colors">Reports</a>
            <a href="#" className="hover:text-white transition-colors">Settings</a>
            <button className="btn-primary flex items-center gap-2 text-xs">
              <Download className="w-4 h-4" /> Export
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-24 pb-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h2>
          <p className="text-slate-400">Real-time insights into your voice agent performance.</p>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card p-6 rounded-2xl border border-white/5 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-bryn-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-bryn-accent" />
                  Call Duration
                </h3>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowEditModal(true)}
                    className="text-xs text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full transition-colors flex items-center gap-1.5 border border-white/5"
                  >
                    Edit Data
                  </button>
                  <span className="text-xs text-slate-500 bg-white/5 px-2 py-1 rounded-full border border-white/5">Last 24 Hours</span>
                </div>
              </div>
              <CallDurationChart data={callData} />
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-white/5 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  Failure Analysis
                </h3>
                <span className="text-xs text-slate-500 bg-white/5 px-2 py-1 rounded-full">Real-time</span>
              </div>
              <SadPathChart />
            </div>
          </div>
        </section>

        <EditCallDataModal
          open={showEditModal}
          initialData={callData}
          onClose={() => setShowEditModal(false)}
          onSave={handleSaveRequest}
        />

        <ConfirmationModal
          open={!!pendingSave}
          title="Overwrite Existing Data?"
          description="You already have saved data for this email. Do you want to overwrite it with the new values?"
          onClose={() => setPendingSave(null)}
          onConfirm={() => pendingSave && performSave(pendingSave.email, pendingSave.data)}
        />
      </main>
    </div>
  );
}

export default App;
