"use client";

import { getPatients, createPatient } from "@/lib/actions/patients";

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

import { Patient } from "@prisma/client";

import { useState } from "react";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import PatientFormDialog from "@/components/custom/PatientFormDialog";

export default function Page({}: {}) {
  const [loading, setLoading] = useState(false);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const patientsData = await getPatients();
      setPatients(patientsData);
    }
    fetchData();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-white text-center text-xl">Patient Management</h1>

      <div className="flex justify-end mb-4">
        <Button onClick={() => setDialogOpen(true)} variant="default">
          Create Patient
        </Button>
      </div>

      <div className="text-white">
        {patients.length > 0 ? (
          <Table>
            <TableCaption>List of Patients</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-white">Name</TableHead>
                <TableHead className="text-white">Contact</TableHead>
                <TableHead className="text-white">Birth Year</TableHead>
                <TableHead className="text-white">Emergency Contact</TableHead>
                <TableHead className="text-white">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>{patient.contact}</TableCell>
                  <TableCell>{patient.birthYear}</TableCell>
                  <TableCell>{patient.emergencyContact}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      onClick={() => router.push(`/patients/${patient.id}`)}
                      className="text-black"
                      disabled={loading}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="relative">
            <Table>
              <TableCaption>List of Patients</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-white">Name</TableHead>
                  <TableHead className="text-white">Contact</TableHead>
                  <TableHead className="text-white">Birth Year</TableHead>
                  <TableHead className="text-white">
                    Emergency Contact
                  </TableHead>
                  <TableHead className="text-white">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell></TableCell>
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
      <PatientFormDialog
        open={dialogOpen}
        onClose={async () => {
          setDialogOpen(false);
          setPatients(await getPatients());
        }}
        loading={loading}
      />
    </div>
  );
}
