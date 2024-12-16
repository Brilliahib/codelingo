interface DashboardTitleProps {
  title: string;
}

export default function DashboardTitle({ title }: DashboardTitleProps) {
  return (
    <>
      <div className="space-y-3 mb-4">
        <h1 className="font-bold md:text-4xl text-3xl">{title}</h1>
      </div>
    </>
  );
}
