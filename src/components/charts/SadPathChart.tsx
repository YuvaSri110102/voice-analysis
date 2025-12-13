import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const data = [
    { name: "Unsupported Language", value: 35 },
    { name: "Assistant Didn't Speak Language", value: 25 },
    { name: "Customer Hostility", value: 20 },
    { name: "Incorrect Caller Identity", value: 20 },
];

const COLORS = ["#2563eb", "#7c3aed", "#db2777", "#f59e0b"];

export default function SadPathChart() {
    return (
        <div>
            <h3 className="text-sm font-medium mb-4">
                Sad Path Analysis
            </h3>

            <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={90}
                        label
                    >
                        {data.map((_, index) => (
                            <Cell
                                key={index}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
