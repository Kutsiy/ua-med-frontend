import {
  Badge,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/src/shared/ui';
import { ChooseCityInput } from './choose-city-input';
import { Building, X } from 'lucide-react';
export function ChooseCity() {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex gap-2 items-center">
          <Building /> Одесса
        </div>
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center justify-between">
              Оберіть місто
              <DialogClose>
                <X />
              </DialogClose>
            </div>
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-2">
          <div className="flex flex-col gap- border-b border-primary">
            <ChooseCityInput />
            <Badge variant="clickable" className="my-2">
              Одесса
            </Badge>
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
      </DialogContent>
    </Dialog>
  );
}
