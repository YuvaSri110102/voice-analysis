import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

type Props = {
    data: { time: string; duration: number }[];
    onEdit: () => void;
};

export default function CallDurationChart({ data, onEdit }: Props) {
    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium">
                    Call Duration Analysis
                </h3>
                <button
                    onClick={onEdit}
                    className="text-sm text-blue-600 hover:underline"
                >
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
