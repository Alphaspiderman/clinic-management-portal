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
      <DialogContent className="bg-gray-900 text-white border border-gray-700 shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-white">Create Operation</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Operation Name</FormLabel>
                  <Input
                    className="bg-gray-800 text-white border-gray-700 placeholder-gray-500"
                    placeholder="Operation Name"
                    {...field}
                  />
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="costClinic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Cost to Clinic</FormLabel>
                  <Input
                    type="number"
                    className="bg-gray-800 text-white border-gray-700 placeholder-gray-500"
                    placeholder="Cost to Clinic"
                    {...field}
                  />
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="costBill"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Bill Cost</FormLabel>
                  <Input
                    type="number"
                    className="bg-gray-800 text-white border-gray-700 placeholder-gray-500"
                    placeholder="Bill Cost"
                    {...field}
                  />
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">
                    Approx. Duration (minutes)
                  </FormLabel>
                  <Input
                    type="number"
                    className="bg-gray-800 text-white border-gray-700 placeholder-gray-500"
                    placeholder="Duration"
                    {...field}
                  />
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="destructive"
                onClick={onClose}
                className="bg-red-700 hover:bg-red-800 text-white"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                variant="default"
                className="bg-green-700 hover:bg-green-800 text-white"
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
