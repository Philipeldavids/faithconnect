interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export default function PageHeader({
  title,
  subtitle,
  action,
}: PageHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold">
          {title}
        </h1>

        {subtitle && (
          <p className="text-slate-500">
            {subtitle}
          </p>
        )}
      </div>

      {action}
    </div>
  );
}