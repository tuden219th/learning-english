import Image from "next/image";
import Link from "next/link";

export default function TudenMark() {
  return (
    <div className="mx-auto max-w-6xl px-6 pt-6">
      <Link
        href="https://tudencafe.com"
        aria-label="Về Từ Đến Coffee"
        className="inline-flex items-center gap-2 transition-opacity hover:opacity-75"
      >
        <Image
          src="/favicon.ico"
          alt="Từ Đến"
          width={24}
          height={24}
          className="h-6 w-6"
        />

        <span className="text-sm font-medium text-white/70">
          Từ Đến
        </span>
      </Link>
    </div>
  );
}