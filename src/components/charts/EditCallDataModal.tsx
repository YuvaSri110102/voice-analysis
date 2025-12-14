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

    if (!open) return null;

    const updateValue = (index: number, value: number) => {
        const updated = data.map((row, i) =>
            i === index ? { ...row, duration: value } : row
        );
        setData(updated);
    };

    return (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h3 className="text-lg font-medium mb-4">
                    Edit Call Duration Data
                </h3>

                {/* Email */}
                <label className="block text-sm mb-2">Email</label>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border rounded px-3 py-2 mb-4"
                    placeholder="you@example.com"
                />

                {/* Editable Values */}
                {data.map((row, i) => (
                    <div key={row.time} className="flex items-center gap-2 mb-2">
                        <span className="w-16 text-sm">{row.time}</span>
                        <input
                            type="number"
                            value={row.duration}
                            onChange={(e) =>
                                updateValue(i, Number(e.target.value))
                            }
                            className="flex-1 border rounded px-2 py-1"
                        />
                    </div>
                ))}

                <div className="mt-6 flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm border rounded"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onSave(email, data)}
                        className="px-4 py-2 text-sm bg-blue-600 text-white rounded"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}
