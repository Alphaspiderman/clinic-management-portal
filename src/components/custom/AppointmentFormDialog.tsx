"use client";

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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
} from "@/components/ui/command";
import { useState, useEffect } from "react";
import { getPatientsByPartialContact } from "@/lib/actions/patients";
import type { Patient } from "@prisma/client";

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

  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState("");

  useEffect(() => {
    async function fetchPatients() {
      const data = await getPatientsByPartialContact(searchTerm);
      setPatients(data);
    }
    fetchPatients();
  }, [searchTerm]);

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
      <DialogContent className="bg-gray-900 text-white border border-gray-700 shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-white">Create Appointment</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="patientId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">
                    Patient (Search by Contact)
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Input
                        className="bg-gray-800 text-white border-gray-700 placeholder-gray-500"
                        placeholder="Search for a patient by contact"
                        value={selectedPatient}
                        onInput={(e) =>
                          setSearchTerm((e.target as HTMLInputElement).value)
                        }
                      />
                    </PopoverTrigger>
                    <PopoverContent className="bg-gray-900 text-white border border-gray-700">
                      <Command>
                        <CommandInput
                          className="bg-gray-800 text-white border-gray-700 placeholder-gray-500"
                          placeholder="Type to search by contact..."
                          onInput={(e) =>
                            setSearchTerm((e.target as HTMLInputElement).value)
                          }
                        />
                        <CommandList>
                          {patients.map((patient) => (
                            <CommandItem
                              key={patient.id}
                              className="hover:bg-gray-800"
                              onSelect={() => {
                                setSelectedPatient(patient.name);
                                field.onChange(patient.id);
                              }}
                            >
                              {patient.name} ({patient.contact})
                            </CommandItem>
                          ))}
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Date</FormLabel>
                  <Input
                    type="date"
                    className="bg-gray-800 text-white border-gray-700 placeholder-gray-500"
                    placeholder="Date"
                    value={
                      field.value ? field.value.toISOString().split("T")[0] : ""
                    }
                    onChange={(e) => field.onChange(new Date(e.target.value))}
                  />
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="bg-gray-800 text-white border-gray-700">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 text-white border-gray-700">
                      <SelectItem
                        value="SCHEDULED"
                        className="hover:bg-gray-800"
                      >
                        Scheduled
                      </SelectItem>
                      <SelectItem
                        value="CANCELLED"
                        className="hover:bg-gray-800"
                      >
                        Cancelled
                      </SelectItem>
                      <SelectItem value="DONE" className="hover:bg-gray-800">
                        Done
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Notes</FormLabel>
                  <Input
                    className="bg-gray-800 text-white border-gray-700 placeholder-gray-500"
                    placeholder="Notes"
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
                {loading ? "Saving..." : "Create Appointment"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
