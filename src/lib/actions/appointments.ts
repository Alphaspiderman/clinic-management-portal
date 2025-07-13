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

export async function countAppointmentsInFuture(): Promise<number> {
  var yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return await prisma.appointment.count({
    where: {
      date: {
        gte: yesterday,
      },
    },
  });
}

export async function getAppointmentsInFuture(
  take: number = 0,
  skip: number = 0
): Promise<Appointment[]> {
  var yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return await prisma.appointment.findMany({
    where: {
      date: {
        gte: yesterday,
      },
    },
    orderBy: {
      date: "asc",
    },
    take: take > 0 ? take : undefined,
    skip: skip > 0 ? skip : undefined,
  });
}

export async function getPastAppointments(): Promise<Appointment[]> {
  var today = new Date();
  return await prisma.appointment.findMany({
    where: {
      date: {
        lt: today,
      },
    },
    orderBy: {
      date: "desc",
    },
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
  patientId: string;
  date: Date;
  status?: Status;
  notes?: string;
}): Promise<Appointment> {
  return await prisma.appointment.create({
    data: {
      patientId: data.patientId,
      date: data.date,
      status: data.status || "SCHEDULED",
      notes: data.notes || "",
    },
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
