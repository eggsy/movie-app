import { PropsWithChildren } from "react";

export const PageItem = ({
  title,
  children,
}: PropsWithChildren<{ title: string }>) => (
  <div className="flex flex-col items-center gap-4 mx-auto text-center md:w-1/2">
    <h1 className="text-4xl font-bold text-gray-800">{title}</h1>

    {children}
  </div>
);

export default PageItem;
