"use server";

import prisma from "@/lib/prisma";
import { Operation } from "@prisma/client";

import { revalidatePath } from "next/cache";

export async function getOperations(
  take: number = 0,
  skip: number = 0,
): Promise<Operation[]> {
  return await prisma.operation.findMany({
    take: take > 0 ? take : undefined,
    skip: skip > 0 ? skip : undefined,
  });
}

export async function getOperation(id: string): Promise<Operation | null> {
  return await prisma.operation.findUnique({
    where: {
      id: id,
    },
  });
}

export async function createOperation(data: {
  name: string;
  costClinic: number;
  costBill: number;
  duration: number;
}): Promise<void> {
  await prisma.operation.create({
    data,
  });
  revalidatePath("/appointments");
}

export async function deleteAllOperations(): Promise<void> {
  await prisma.operation.deleteMany();
  revalidatePath("/appointments");
}