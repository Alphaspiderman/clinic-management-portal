"use server";

import prisma from "@/lib/prisma";
import { Patient } from "@prisma/client";

export async function getPatients(): Promise<Patient[]> {
  return prisma.patient.findMany();
}

export async function getPatientByContact(
  contact: string
): Promise<Patient | null> {
  return prisma.patient.findFirst({
    where: {
      contact: contact,
    },
  });
}

export async function createPatient(data: Partial<Patient>): Promise<Patient> {
  if (
    !data.name ||
    !data.birthYear ||
    !data.contact ||
    !data.emergencyContact ||
    !data.history
  ) {
    throw new Error("Missing required fields to create a patient");
  }

  return prisma.patient.create({
    data: {
      name: data.name!,
      birthYear: data.birthYear!,
      contact: data.contact!,
      emergencyContact: data.emergencyContact!,
      history: data.history || null,
      createdAt: new Date(),
    },
  });
}

export async function updatePatient(
  id: string,
  data: Partial<Patient>
): Promise<Patient> {
  return prisma.patient.update({
    where: {
      id: id,
    },
    data,
  });
}
