import Image from "next/image";
import { useGetUserCountQuery } from "@/app/state/api";

const AVATARS = [
  {
    src: "/avatars/alberta-user-avatar-1.png",
    alt: "User avatar 1",
  },
  {
    src: "/avatars/alberta-user-avatar-2.png",
    alt: "User avatar 2",
  },
  {
    src: "/avatars/alberta-user-avatar-3.png",
    alt: "User avatar 3",
  },
];

export const UsersCount = () => {
  const { data, isLoading, error } = useGetUserCountQuery();

  return (
    <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mt-4">
      <div className="flex -space-x-2" aria-hidden="true">
        {AVATARS.map((avatar) => (
          <div
            key={avatar.alt}
            className="relative size-8 rounded-full border-2 border-white dark:border-[#111a22] overflow-hidden"
          >
            <Image
              src={avatar.src}
              alt={avatar.alt}
              fill
              className="object-cover"
              sizes="32px"
            />
          </div>
        ))}
      </div>
      {isLoading ? (
        <div className="h-4 w-36 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
      ) : error || !data?.success ? null : (
        <p>Used by {data.count}+ Albertans</p>
      )}
    </div>
  );
};
