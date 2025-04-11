import { ReactNode } from "react";

function Subtitle({
  styleClass,
  children,
}: {
  styleClass: string;
  children: ReactNode;
}) {
  return (
    <div className={`text-xl py-10 font-semibold ${styleClass}`}>
      {children}
    </div>
  );
}

export default Subtitle;
