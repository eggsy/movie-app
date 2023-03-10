import { PropsWithChildren } from "react";

export const Heading = ({ children }: PropsWithChildren) => (
  <h1 className="text-xl font-bold text-gray-700">{children}</h1>
);

export default Heading;
