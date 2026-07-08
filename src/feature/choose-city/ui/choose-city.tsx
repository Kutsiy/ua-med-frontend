import {
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
            <Input />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
