import { Badge, Search } from '@/src/shared/ui';

export function Hero() {
  const badges = ['Ліки', 'Аптеки'];

  return (
    <section className="relation w-full min-h-[450px] bg-secondary/30 flex flex-col items-center justify-center">
      <div className="absolute h-[500px] top-[-350px] w-full bg-radial from-primary/85 to-primary/20 rounded-full z-1 blur-2xl"></div>
      <div className="main-container flex flex-col gap-4 items-center justify-center z-10">
        <div className="px-2 p-1.5 rounded-lg bg-background">
          Понад 6 000 аптек та 12 000 лікарів по Україні
        </div>
        <div className="text-5xl font-bold">Знайдіть ліки або аптеку поруч</div>
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
    </section>
  );
}
