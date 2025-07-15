import { getAppointment } from "@/lib/actions/appointments";
import { getPatientById } from "@/lib/actions/patients";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const appointment = await getAppointment(id);
  if (!appointment) {
    return <div className="p-10 text-red-500">Appointment not found.</div>;
  }
  const patient = await getPatientById(appointment.patientId);

  return (
    <div className="p-10 max-w-xl mx-auto text-white">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Appointment Details</CardTitle>
        </CardHeader>
        <CardContent className="text-black">
          <div>
            <span className="font-semibold">Date:</span>{" "}
            {new Date(appointment.date).toLocaleString()}
          </div>
          <div>
            <span className="font-semibold">Status:</span> {appointment.status}
          </div>
          <div>
            <span className="font-semibold">Notes:</span>{" "}
            {appointment.notes || (
              <span className="italic text-gray-400">None</span>
            )}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Patient Info</CardTitle>
        </CardHeader>
        <CardContent className="text-black">
          {patient ? (
            <>
              <div>
                <span className="font-semibold">Name:</span> {patient.name}
              </div>
              <div>
                <span className="font-semibold">Birth Year:</span>{" "}
                {patient.birthYear}
              </div>
              <div>
                <span className="font-semibold">Contact:</span>{" "}
                {patient.contact}
              </div>
              <div>
                <span className="font-semibold">Emergency Contact:</span>{" "}
                {patient.emergencyContact}
              </div>
              {patient.history && (
                <div>
                  <span className="font-semibold">History:</span>{" "}
                  {patient.history}
                </div>
              )}
            </>
          ) : (
            <div className="text-red-400">Patient not found.</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
