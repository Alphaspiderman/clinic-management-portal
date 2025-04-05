"use client";

import { getPatients, createPatient } from "@/lib/actions/patients";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

export default function Page({}: {}) {
  const [loading, setLoading] = useState(false);
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    async function fetchData() {
      const patientsData = await getPatients();
      setPatients(patientsData);
    }
    fetchData();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);

    try {
      await createPatient({
        name: formData.get("name") as string,
        contact: formData.get("contact") as string,
        birthYear: Number(formData.get("birthYear")),
        emergencyContact: formData.get("emergencyContact") as string,
      });
    } catch (error) {
      alert("Error creating patient: " + error);
      setLoading(false);
      return;
    }

    setLoading(false);
    alert("Patient Created!");
    setPatients(await getPatients());
  }

  return (
    <>
      <div className="p-10">
        <div className="container">
          <h1>Patient Management</h1>

          <form onSubmit={handleSubmit} className=" p-5">
            <div className="flex flex-col gap-4">
              <Input
                name="name"
                placeholder="Name"
                required
                className="border p-2 m-2 w-full bg-black bg-opacity-50"
              />
              <Input
                name="contact"
                placeholder="Contact"
                required
                className="border p-2 m-2 w-full bg-black bg-opacity-50"
              />
              <Input
                name="birthYear"
                placeholder="Birth Year"
                type="number"
                required
                className="border p-2 m-2 w-full bg-black bg-opacity-50"
              />
              <Input
                name="emergencyContact"
                placeholder="Emergency Contact"
                required
                className="border p-2 m-2 w-full bg-black bg-opacity-50"
              />
            </div>
            <div className="flex items-center justify-around py-5">
              <Button type="submit" disabled={loading} variant="default">
                {loading ? "Saving..." : "Create Patient"}
              </Button>
              <Button
                type="button"
                onClick={() => {
                  const form = document.querySelector("form");
                  if (form) form.reset();
                }}
                variant="destructive"
              >
                Clear Form
              </Button>
            </div>
          </form>

          <div className="text-white bg-black bg-opacity-50">
            {patients.length > 0 ? (
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
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {patients.map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell>{patient.name}</TableCell>
                      <TableCell>{patient.contact}</TableCell>
                      <TableCell>{patient.birthYear}</TableCell>
                      <TableCell>{patient.emergencyContact}</TableCell>
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
        </div>
      </div>
    </>
  );
}
