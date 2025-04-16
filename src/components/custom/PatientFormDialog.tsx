import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { createPatient } from "@/lib/actions/patients";
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

const patientSchema = z.object({
  name: z.string().min(1, "Name is required"),
  contact: z.string().min(10, "Contact is required"),
  birthYear: z.coerce
    .number()
    .min(1900, "Birth year must be valid")
    .max(new Date().getFullYear(), "Birth year must be valid"),
  emergencyContact: z.string().min(10, "Emergency contact is required"),
});

interface PatientFormDialogProps {
  open: boolean;
  onClose: () => void;
  loading: boolean;
}

type PatientFormValues = z.infer<typeof patientSchema>;

export default function PatientFormDialog({
  open,
  onClose,
  loading,
}: PatientFormDialogProps) {
  const form = useForm({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      name: "",
      contact: "",
      birthYear: new Date().getFullYear(),
      emergencyContact: "",
    },
  });

  async function onSubmit(values: PatientFormValues) {
    try {
      await createPatient(values);
      onClose();
    } catch {
      alert("Error creating patient");
    }
  }

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Patient</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <Input {...field} placeholder="Name" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact</FormLabel>
                  <Input {...field} placeholder="Contact" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birthYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Birth Year</FormLabel>
                  <Input
                    {...field}
                    placeholder="Birth Year"
                    type="number"
                    min="1900"
                    max={new Date().getFullYear()}
                    step="1"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="emergencyContact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Emergency Contact</FormLabel>
                  <Input {...field} placeholder="Emergency Contact" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-2">
              <Button type="button" onClick={onClose} variant="destructive">
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                variant="default"
                className="bg-green-500 hover:bg-green-600"
              >
                {loading ? "Saving..." : "Create Patient"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
