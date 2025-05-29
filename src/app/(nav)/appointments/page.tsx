"use client";
import { getAppointments } from "@/lib/actions/appointments";
import { Appointment } from "@prisma/client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState, useEffect } from "react";
import AppointmentFormDialog from "@/components/custom/AppointmentFormDialog";

export default function Page({}: {}) {
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const appointmentsData = await getAppointments();
      setAppointments(appointmentsData);
    }
    fetchData();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-white text-center text-xl">Appointment Management</h1>

      <div className="flex justify-end mb-4">
        <Button onClick={() => setDialogOpen(true)} variant="default">
          Schedule Appointment
        </Button>
      </div>

      <div className="text-white bg-black bg-opacity-50">
        {appointments.length > 0 ? (
          <Table>
            <TableCaption>List of Appointments</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-white">Patient ID</TableHead>
                <TableHead className="text-white">Date</TableHead>
                <TableHead className="text-white">Status</TableHead>
                <TableHead className="text-white">Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>{appointment.patientId}</TableCell>
                  <TableCell>{new Date(appointment.date).toLocaleDateString()}</TableCell>
                  <TableCell>{appointment.status}</TableCell>
                  <TableCell>{appointment.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="relative">
            <Table>
              <TableCaption>List of Appointments</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-white">Patient ID</TableHead>
                  <TableHead className="text-white">Date</TableHead>
                  <TableHead className="text-white">Status</TableHead>
                  <TableHead className="text-white">Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 text-black">
              No data
            </div>
          </div>
        )}
      </div>

      <AppointmentFormDialog
        open={dialogOpen}
        onClose={async () => {
          setDialogOpen(false);
          setAppointments(await getAppointments());
        }}
        loading={loading}
      />
    </div>
  );
}
