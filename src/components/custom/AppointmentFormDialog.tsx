import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { createAppointment } from "@/lib/actions/appointments";
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

const appointmentSchema = z.object({
  patientId: z.string().min(1, "Patient ID is required"),
  date: z.date().refine((value) => !isNaN(value.getTime()), {
    message: "Invalid date",
  }),
  status: z.enum(["SCHEDULED", "CANCELLED", "DONE"]),
  notes: z.string().optional(),
});

interface AppointmentFormDialogProps {
  open: boolean;
  onClose: () => void;
  loading: boolean;
}

type AppointmentFormValues = z.infer<typeof appointmentSchema>;

export default function AppointmentFormDialog({
  open,
  onClose,
  loading,
}: AppointmentFormDialogProps) {
  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      patientId: "",
      date: new Date(),
      status: "SCHEDULED",
      notes: "",
    },
  });

  async function onSubmit(values: AppointmentFormValues) {
    try {
      await createAppointment({ ...values });
      onClose();
    } catch {
      alert("Error creating appointment");
    }
  }

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Appointment</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="patientId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Patient ID</FormLabel>
                  <Input placeholder="Patient ID" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <Input
                    type="date"
                    placeholder="Date"
                    value={
                      field.value ? field.value.toISOString().split("T")[0] : ""
                    }
                    onChange={(e) => field.onChange(new Date(e.target.value))}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <select {...field} className="form-select">
                    <option value="SCHEDULED">Scheduled</option>
                    <option value="CANCELLED">Cancelled</option>
                    <option value="DONE">Done</option>
                  </select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <Input placeholder="Notes" {...field} />
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
                {loading ? "Saving..." : "Create Appointment"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
