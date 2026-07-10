import { ShoppingCart as Cart } from 'lucide-react';

type Props = {
  amount: number;
};

export function ShoppingCart({ amount = 0 }: Props) {
  return (
    <div className="relative">
      <div className="absolute top-[-6px] right-[-8px] bg-primary px-1 py-0.5 rounded-full text-xs">
        {amount < 100 ? amount : '99+'}
      </div>
      <Cart size={30} />
    </div>
  );
}
