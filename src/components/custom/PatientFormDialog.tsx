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
      <DialogContent className="bg-gray-900 text-white border border-gray-700 shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-white">Create Patient</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Name</FormLabel>
                  <Input className="bg-gray-800 text-white border-gray-700 placeholder-gray-500" {...field} placeholder="Name" />
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Contact</FormLabel>
                  <Input className="bg-gray-800 text-white border-gray-700 placeholder-gray-500" {...field} placeholder="Contact" />
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birthYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Birth Year</FormLabel>
                  <Input
                    className="bg-gray-800 text-white border-gray-700 placeholder-gray-500"
                    {...field}
                    placeholder="Birth Year"
                    type="number"
                    min="1900"
                    max={new Date().getFullYear()}
                    step="1"
                  />
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="emergencyContact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Emergency Contact</FormLabel>
                  <Input className="bg-gray-800 text-white border-gray-700 placeholder-gray-500" {...field} placeholder="Emergency Contact" />
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-2">
              <Button type="button" onClick={onClose} variant="destructive" className="bg-red-700 hover:bg-red-800 text-white">
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                variant="default"
                className="bg-green-700 hover:bg-green-800 text-white"
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
