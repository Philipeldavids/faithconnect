interface StatCardProps {
  title: string;
  value: number | string;
  icon?: React.ReactNode;
}

export default function StatCard({
  title,
  value,
  icon,
}: StatCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 border">
      <div className="flex justify-between">
        <div>
          <p className="text-slate-500 text-sm">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {value}
          </h2>
        </div>

        {icon}
      </div>
    </div>
  );
}