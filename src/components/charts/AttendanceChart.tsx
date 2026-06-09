import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: {
    period: string;
    attendanceCount: number;
  }[];
}

export default function AttendanceChart({
  data,
}: Props) {
  return (
    <ResponsiveContainer
      width="100%"
      height={350}
    >
      <BarChart data={data}>
        <XAxis dataKey="day" />

        <YAxis />

        <Tooltip />

        <Bar
          dataKey="attendance"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}