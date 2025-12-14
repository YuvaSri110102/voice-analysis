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
};

export default function CallDurationChart({ data }: Props) {
    return (
        <div className="w-full h-[300px] [&_*:focus]:outline-none">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <XAxis
                        dataKey="time"
                        stroke="#94a3b8"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        stroke="#94a3b8"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `${value}m`}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'rgba(2, 6, 23, 0.8)',
                            borderColor: 'rgba(255, 255, 255, 0.1)',
                            borderRadius: '8px',
                            backdropFilter: 'blur(8px)',
                            color: '#f8fafc'
                        }}
                        itemStyle={{ color: '#38bdf8' }}
                        cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 2 }}
                    />
                    <defs>
                        <linearGradient id="colorDuration" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#7c3aed" />
                            <stop offset="100%" stopColor="#38bdf8" />
                        </linearGradient>
                    </defs>
                    <Line
                        type="monotone"
                        dataKey="duration"
                        stroke="url(#colorDuration)"
                        strokeWidth={3}
                        dot={{ fill: '#38bdf8', strokeWidth: 0, r: 4 }}
                        activeDot={{ r: 6, fill: '#fff' }}
                        animationDuration={1500}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
