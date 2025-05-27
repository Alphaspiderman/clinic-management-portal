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
      
    },
  });