"use server";

import prisma from "@/lib/prisma";
import { Appointment, Status } from "@prisma/client";

export async function getAppointment(id: string): Promise<Appointment | null> {
  return await prisma.appointment.findUnique({
    where: {
      id: id,
    },
  });
}

export async function getAppointments(
  take: number = 0,
  skip: number = 0
): Promise<Appointment[]> {
  return await prisma.appointment.findMany({
    take: take > 0 ? take : undefined,
    skip: skip > 0 ? skip : undefined,
  });
}

export async function getAppointmentsForDate(
  date: Date
): Promise<Appointment[]> {
  return await prisma.appointment.findMany({
    where: {
      date: date,
    },
  });
}

export async function getAppointmentsForPatient(
  patientId: string
): Promise<Appointment[]> {
  return await prisma.appointment.findMany({
    where: {
      patientId: patientId,
    },
  });
}

export async function createAppointment(data: {
  date: Date;
  patientId: string;
  operationId: string;
}): Promise<void> {
  await prisma.appointment.create({
    data,
  });
}

export async function updateAppointmentStatus(
  id: string,
  status: Status
): Promise<void> {
  await prisma.appointment.update({
    where: {
      id: id,
    },
    data: {
      status: status,
    },
  });
}

export async function deleteAllAppointments(): Promise<void> {
  await prisma.appointment.deleteMany();
}
