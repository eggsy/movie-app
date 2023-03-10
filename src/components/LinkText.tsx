import Link from "next/link";
import { PropsWithChildren } from "react";

export const LinkText = ({
  children,
  href,
}: PropsWithChildren<{ href?: string }>) => (
  <Link
    href={href || "/"}
    className="text-sm font-medium text-purple-600 cursor-pointer hover:underline"
  >
    {children}
  </Link>
);

export default LinkText;
