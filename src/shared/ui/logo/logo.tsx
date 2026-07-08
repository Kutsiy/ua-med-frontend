import { HeartPlus } from 'lucide-react';

type Props = {
  children: string;
};

export function Logo({ children }: Props) {
  return (
    <button className="h-10 text-3xl flex gap-2 items-center font-bold">
      <HeartPlus size={32} strokeWidth={2} /> {children}
    </button>
  );
}
