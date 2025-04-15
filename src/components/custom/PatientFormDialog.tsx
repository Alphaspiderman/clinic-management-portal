import { Dialog, DialogTitle } from "@/components/ui/dialog";
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

export default function PatientFormDialog({
  open,
  onClose,
  loading,
}: PatientFormDialogProps) {
  const form = useForm({
    resolver: zodResolver(patientSchema),
  });

  const onSubmit = async (data: z.infer<typeof patientSchema>) => {
    try {
      await createPatient(data);
      onClose();
    } catch {
      alert("Error creating patient");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <Dialog open={open}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="m-5 p-5 bg-black bg-opacity-70 rounded-md min-w-[300px] w-full max-w-md"
          >
            <DialogTitle className="text-2xl text-center text-white">
              Create Patient
            </DialogTitle>
            <div className="flex flex-col gap-4 items-center">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-[300px]">
                    <FormLabel className="text-white">Name</FormLabel>
                    <Input
                      {...field}
                      placeholder="Name"
                      className="border p-2 m-2 bg-black bg-opacity-50 w-full"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contact"
                render={({ field }) => (
                  <FormItem className="w-[300px]">
                    <FormLabel className="text-white">Contact</FormLabel>
                    <Input
                      {...field}
                      placeholder="Contact"
                      className="border p-2 m-2 bg-black bg-opacity-50 w-full"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="birthYear"
                render={({ field }) => (
                  <FormItem className="w-[300px]">
                    <FormLabel className="text-white">Birth Year</FormLabel>
                    <Input
                      {...field}
                      placeholder="Birth Year"
                      type="number"
                      min="1900"
                      max={new Date().getFullYear()}
                      step="1"
                      className="border p-2 m-2 bg-black bg-opacity-50 w-full"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="emergencyContact"
                render={({ field }) => (
                  <FormItem className="w-[300px]">
                    <FormLabel className="text-white">Emergency Contact</FormLabel>
                    <Input
                      {...field}
                      placeholder="Emergency Contact"
                      className="border p-2 m-2 bg-black bg-opacity-50 w-full"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center justify-around py-5">
              <Button
                type="submit"
                disabled={loading}
                variant="default"
                className="bg-green-500 hover:bg-green-600"
              >
                {loading ? "Saving..." : "Create Patient"}
              </Button>
              <Button type="button" onClick={onClose} variant="destructive">
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </Dialog>
    </div>
  );
}
