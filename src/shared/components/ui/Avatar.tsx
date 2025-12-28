import React from "react";

type AvatarProps = React.HTMLAttributes<HTMLDivElement> & {
  name: string;
  src?: string;
};

const Avatar = ({ name, src, className, ...props }: AvatarProps) => {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  return (
    <div
      className={`flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-200 ${
        className ?? ""
      }`}
      {...props}
    >
      {src ? <img src={src} alt={name} className="h-full w-full object-cover" /> : initials}
    </div>
  );
};

export default Avatar;
