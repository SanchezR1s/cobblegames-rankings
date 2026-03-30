import Image from "next/image";
import { avatarUrl } from "@/lib/utils";

interface PlayerAvatarProps {
  uuid: string;
  username: string;
  size?: number;
  className?: string;
}

export default function PlayerAvatar({
  uuid,
  username,
  size = 32,
  className = "",
}: PlayerAvatarProps) {
  return (
    <div
      className={`relative rounded-md overflow-hidden shrink-0 bg-bg-elevated ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={avatarUrl(uuid, size * 2)}
        alt={username}
        width={size}
        height={size}
        className="pixel-art"
        unoptimized
        onError={(e) => {
          // fallback: show first letter
          const target = e.target as HTMLImageElement;
          target.style.display = "none";
        }}
      />
    </div>
  );
}
