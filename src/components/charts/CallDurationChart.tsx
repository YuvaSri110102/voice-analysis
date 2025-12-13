import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const data = [
    { time: "9 AM", duration: 120 },
    { time: "10 AM", duration: 180 },
    { time: "11 AM", duration: 150 },
    { time: "12 PM", duration: 200 },
];

export default function CallDurationChart() {
    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium">
                    Call Duration Analysis
                </h3>
                <button className="text-sm text-blue-600 hover:underline">
                    Edit Values
                </button>
            </div>

            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={data}>
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="duration"
                        stroke="#2563eb"
                        strokeWidth={2}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
