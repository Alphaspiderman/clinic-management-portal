"use client";

import { useEffect, useState, use } from "react";
import { getAppointmentsForPatient } from "@/lib/actions/appointments";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getPatientById } from "@/lib/actions/patients";
import { useRouter } from "next/navigation";
import { Appointment } from "@prisma/client";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [history, setHistory] = useState<Appointment[]>([]);
  const [patient, setPatient] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const historyData = await getAppointmentsForPatient(id);
      setHistory(historyData || []);
      const patientData = await getPatientById(id);
      setPatient(patientData);
    }
    fetchData();
  }, [id]);

  return (
    <>
      <h1>Patient Info</h1>
      <div className="text-white p-4 rounded-lg">
        <h2 className="text-xl font-bold">{patient?.name}</h2>
        <p>Contact: {patient?.contact}</p>
        <p>Birth Year: {patient?.birthYear}</p>
        <p>Emergency Contact: {patient?.emergencyContact}</p>
        <p>Created At: {patient?.createdAt ? new Date(patient.createdAt).toDateString() : ""}</p>
      </div>
      <h2>History</h2>
      <div className="text-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {history.map((history: any) => (
              <TableRow
                key={history.id}
                className="cursor-pointer hover:bg-gray-600"
                onClick={() => router.push(`/appointments/${history.id}`)}
              >
                <TableCell>{new Date(history.date).toDateString()}</TableCell>
                <TableCell>{history.status}</TableCell>
                <TableCell>
                  {history.notes || "No description available"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
