import CallDurationChart from "./components/charts/CallDurationChart";
import SadPathChart from "./components/charts/SadPathChart";

function App() {
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
            <CallDurationChart />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <SadPathChart />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
