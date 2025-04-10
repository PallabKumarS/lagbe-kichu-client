"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TMongoose } from "@/types";

type TDataDialogProps<T> = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "edit" | "view";
  data: (T & TMongoose) | null;
  title: string;
  renderEditContent?: (data: T & TMongoose) => React.ReactNode;
  renderViewContent?: (data: T & TMongoose) => React.ReactNode;
};

export function DialogComponent<T>({
  isOpen,
  onOpenChange,
  mode,
  data,
  title,
  renderEditContent,
  renderViewContent,
}: TDataDialogProps<T>) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-chart-1 backdrop-blur-sm">
        <DialogHeader>
          <DialogDescription></DialogDescription>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        {data && (
          <div className="space-y-4">
            {mode === "edit" && renderEditContent
              ? renderEditContent(data)
              : renderViewContent
              ? renderViewContent(data)
              : null}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
