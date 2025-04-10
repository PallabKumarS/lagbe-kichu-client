import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode } from "react";
type TModalProps = {
  title: string;
  trigger: ReactNode;
  content: ReactNode;
};
export function Modal({ title, trigger, content }: TModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[calc(100vh-4rem)] overflow-y-auto bg-card min-w-[280px] w-2/3">
        <DialogHeader>
          <DialogTitle className="text-primary">{title}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {content}
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
