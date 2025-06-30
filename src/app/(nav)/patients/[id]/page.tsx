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

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const history = await getAppointmentsForPatient(id);
  const patient = await getPatientById(id);

  return (
    <>
      <h1>Patient Info</h1>
      <div className="text-white p-4 rounded-lg">
        <h2 className="text-xl font-bold">{patient?.name}</h2>
        <p>Contact: {patient?.contact}</p>
        <p>Birth Year: {patient?.birthYear}</p>
        <p>Emergency Contact: {patient?.emergencyContact}</p>
        <p>Created At: {patient?.createdAt.toDateString()}</p>
      </div>
      <h2>History</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Notes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {history.map(
            (
              entry: {
                id: string;
                patientId: string;
                date: Date;
                status: string;
                notes: string | null;
              },
              index: number
            ) => (
              <TableRow key={index}>
                <TableCell>{entry.date.toDateString()}</TableCell>
                <TableCell>{entry.status}</TableCell>
                <TableCell>
                  {entry.notes || "No description available"}
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </>
  );
}
