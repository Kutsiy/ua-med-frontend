import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/shared/ui";

export function ChooseCity() {
  return (
    <Dialog>
      <DialogTrigger>Одесса</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Оберіть місто</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
