import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { createOperation } from "@/lib/actions/operations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const operationSchema = z.object({
  name: z.string().min(1, "Operation name is required"),
  costClinic: z.coerce
    .number()
    .min(0, "Cost to clinic must be a positive number"),
  costBill: z.coerce.number().min(0, "Bill cost must be a positive number"),
  duration: z.coerce.number().min(1, "Duration must be at least 1 minute"),
});

interface OperationFormDialogProps {
  open: boolean;
  onClose: () => void;
  loading: boolean;
}

type OperationFormValues = z.infer<typeof operationSchema>;

export default function OperationFormDialog({
  open,
  onClose,
  loading,
}: OperationFormDialogProps) {
  const form = useForm<OperationFormValues>({
    resolver: zodResolver(operationSchema),
    defaultValues: {
      name: "",
      costClinic: 0,
      costBill: 0,
      duration: 0,
    },
  });

  async function onSubmit(values: OperationFormValues) {
    try {
      await createOperation(values);
      onClose();
    } catch {
      alert("Error creating operation");
    }
  }

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Operation</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Operation Name</FormLabel>
                  <Input placeholder="Operation Name" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="costClinic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cost to Clinic</FormLabel>
                  <Input
                    type="number"
                    placeholder="Cost to Clinic"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="costBill"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bill Cost</FormLabel>
                  <Input type="number" placeholder="Bill Cost" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Approx. Duration (minutes)</FormLabel>
                  <Input type="number" placeholder="Duration" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="destructive" onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                variant="default"
                className="bg-green-500 hover:bg-green-600"
              >
                {loading ? "Saving..." : "Create Operation"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
