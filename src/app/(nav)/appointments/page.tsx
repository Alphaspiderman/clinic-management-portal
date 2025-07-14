"use client";
import {
  countAppointmentsInFuture,
  getAppointmentsInFuture,
} from "@/lib/actions/appointments";
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
import { useRouter } from "next/navigation";

const PAGE_SIZE = 10;

export default function Page({}: {}) {
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const appointmentsData = await getAppointmentsInFuture(
        PAGE_SIZE,
        (page - 1) * PAGE_SIZE
      );
      setAppointments(appointmentsData);
      const count = await countAppointmentsInFuture();
      setTotalCount(count);
      setLoading(false);
    }
    fetchData();
  }, [page]);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <div className="p-10">
      <h1 className="text-white text-center text-xl">Appointment Management</h1>

      <div className="flex justify-end mb-4">
        <Button onClick={() => setDialogOpen(true)} variant="default">
          Schedule Appointment
        </Button>
      </div>

      <div className="text-white">
        {appointments.length > 0 ? (
          <>
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
                  <TableRow
                    key={appointment.id}
                    className="cursor-pointer hover:bg-gray-600"
                    onClick={() =>
                      router.push(`/appointments/${appointment.id}`)
                    }
                  >
                    <TableCell>{appointment.patientId}</TableCell>
                    <TableCell>
                      {new Date(appointment.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{appointment.status}</TableCell>
                    <TableCell>{appointment.notes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex justify-between items-center mt-4">
              <Button
                variant="default"
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Previous
              </Button>
              <span>
                Page {page} of {totalPages}
              </span>
              <Button
                variant="default"
                disabled={page === totalPages || totalPages === 0}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                Next
              </Button>
            </div>
          </>
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
          setPage(1);
          setLoading(true);
          const appointmentsData = await getAppointmentsInFuture(PAGE_SIZE, 0);
          setAppointments(appointmentsData);
          const count = await countAppointmentsInFuture();
          setTotalCount(count);
          setLoading(false);
        }}
        loading={loading}
      />
    </div>
  );
}
