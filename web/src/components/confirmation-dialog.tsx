import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

interface ConfirmationDialogProps {
  open: boolean;
  title: string;
  description: string;
  confirmation: {
    label: string;
    onClick: () => void;
  }
  cancellation: {
    label: string;
    onClick: () => void;
  }
}
export function ConfirmationDialog({ open, confirmation, cancellation, title, description }: ConfirmationDialogProps) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="w-full sm:w-fit" onClick={cancellation.onClick}>{cancellation.label}</AlertDialogCancel>
          <AlertDialogAction onClick={confirmation.onClick}>{confirmation.label}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}