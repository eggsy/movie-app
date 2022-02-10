import Link from "next/link";

export const LinkText: React.FC<{ href?: string }> = ({ children, href }) => (
  <Link href={href || "/"}>
    <a className="text-sm font-medium text-purple-600 cursor-pointer hover:underline">
      {children}
    </a>
  </Link>
);

export default LinkText;
