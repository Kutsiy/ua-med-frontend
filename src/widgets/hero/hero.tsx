import { Badge, Search } from '@/src/shared/ui';

export function Hero() {
  const badges = ['Ліки', 'Аптеки'];

  return (
    <div className="w-full min-h-[450px] flex flex-col gap-2 items-center justify-center main-container bg-secondary/30">
      <div className="px-2 p-1.5 rounded-lg bg-background">
        Понад 6 000 аптек та 12 000 лікарів по Україні
      </div>
      <div className="text-5xl">Знайдіть ліки або аптеку поруч</div>
      <div className="text-lg text-text-muted">
        Порівнюйте ціни, перевіряйте наявність і бронюйте онлайн
      </div>
      <div className="flex gap-2">
        {badges.map((val) => {
          return (
            <Badge key={val} variant="darker">
              {val}
            </Badge>
          );
        })}
      </div>
      <Search />
    </div>
  );
}
