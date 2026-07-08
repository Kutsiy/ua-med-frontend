import {
  Badge,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
} from '@/src/shared/ui';

export function ChooseCity() {
  return (
    <Dialog>
      <DialogTrigger>Одесса</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Оберіть місто</DialogTitle>
          <DialogDescription>
            <div className="flex flex-col gap-4 py-2">
              <div className="flex flex-col gap-2 border-b border-primary pb-2">
                <Input placeholder="Вкажіть назву" />
                <Badge variant="clickable">Одесса</Badge>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="clickable">Київ</Badge>
                <Badge variant="clickable">Дніпро</Badge>
                <Badge variant="clickable">Кропивницький</Badge>
                <Badge variant="clickable">Одесса</Badge>
                <Badge variant="clickable">Біла Церква</Badge>
                <Badge variant="clickable">Біла Церква</Badge>
                <Badge variant="clickable">Біла Церква</Badge>
                <Badge variant="clickable">Біла Церква</Badge>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
