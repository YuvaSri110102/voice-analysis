import CallDurationChart from "./components/charts/CallDurationChart";
import EditCallDataModal from "./components/charts/EditCallDataModal";
import SadPathChart from "./components/charts/SadPathChart";
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

  const handleSave = async (
    email: string,
    newData: typeof callData
  ) => {
    if (!email) {
      alert("Email is required");
      return;
    }

    const { data: existing } = await supabase
      .from("chart_data")
      .select("*")
      .eq("email", email)
      .eq("chart_name", "call_duration")
      .single();

    if (existing) {
      const ok = confirm(
        "You already have saved data. Do you want to overwrite it?"
      );
      if (!ok) return;

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
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-xl font-semibold">
            Voice Analytics Dashboard
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <CallDurationChart data={callData} onEdit={() => setShowEditModal(true)} />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <SadPathChart />
          </div>
        </section>
        <EditCallDataModal
          open={showEditModal}
          initialData={callData}
          onClose={() => setShowEditModal(false)}
          onSave={handleSave}
        />
      </main>
    </div>
  );
}

export default App;
