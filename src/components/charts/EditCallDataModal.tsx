import { useState } from "react";

type CallData = { time: string; duration: number };

type Props = {
    open: boolean;
    initialData: CallData[];
    onClose: () => void;
    onSave: (email: string, data: CallData[]) => void;
};

export default function EditCallDataModal({
    open,
    initialData,
    onClose,
    onSave,
}: Props) {
    const [email, setEmail] = useState("");
    const [data, setData] = useState<CallData[]>(initialData);
    const [error, setError] = useState("");

    if (!open) return null;

    const updateValue = (index: number, value: number) => {
        const updated = data.map((row, i) =>
            i === index ? { ...row, duration: value } : row
        );
        setData(updated);
    };

    const handleSave = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email.trim()) {
            setError("Please enter your email address.");
            return;
        }

        if (!emailRegex.test(email.trim())) {
            setError("Please enter a valid email address (e.g., abc@example.com).");
            return;
        }

        setError("");
        onSave(email, data);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            <div className="glass-card w-full max-w-md p-8 relative z-10 animate-in fade-in zoom-in-95 duration-200 rounded-2xl">
                <div className="mb-6">
                    <h3 className="text-xl font-bold text-white">
                        Edit Call Duration Data
                    </h3>
                    <p className="text-slate-400 text-sm">
                        Update the values for the chart. Changes affect real-time projections.
                    </p>
                </div>

                {error && (
                    <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
                        {error}
                    </div>
                )}

                <div className="mb-6">
                    <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wide">Email Address</label>
                    <input
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setError("");
                        }}
                        className="input-field"
                        placeholder="you@example.com"
                    />
                </div>

                <div className="space-y-3 mb-8">
                    <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wide">Data Points</label>
                    {data.map((row, i) => (
                        <div key={row.time} className="flex items-center gap-4">
                            <span className="w-16 text-sm text-slate-300 font-medium">{row.time}</span>
                            <div className="flex-1 relative">
                                <input
                                    type="number"
                                    value={row.duration}
                                    onChange={(e) =>
                                        updateValue(i, Number(e.target.value))
                                    }
                                    className="input-field"
                                />
                                <span className="absolute right-3 top-2 text-xs text-slate-500">min</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="btn-primary"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}
