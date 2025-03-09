"use client";
import { getOperations, createOperation } from "@/lib/actions/operations";

import { Operation } from "@prisma/client";

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
import { useState } from "react";

import { useEffect } from "react";

export default function Page({}: {}) {
  const [loading, setLoading] = useState(false);
  const [operations, setOperations] = useState<Operation[]>([]);

  useEffect(() => {
    async function fetchData() {
      const operationsData = await getOperations();
      setOperations(operationsData);
    }
    fetchData();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    await createOperation({
      name: formData.get("name") as string,
      costClinic: parseInt(formData.get("costClinic") as string),
      costBill: parseInt(formData.get("costBill") as string),
      duration: parseInt(formData.get("duration") as string),
    });

    setLoading(false);
    alert("Operation Created!");
    setOperations(await getOperations());
  }

  return (
    <div className="p-10">
      <div className="text-white bg-black bg-opacity-50">
        {operations.length > 0 ? (
          <Table>
            <TableCaption>List of Operations</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-white">Name</TableHead>
                <TableHead className="text-white">Cost to Clinic</TableHead>
                <TableHead className="text-white">Bill Cost</TableHead>
                <TableHead className="text-white">Approx. Duration</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {operations.map((operation) => (
                <TableRow key={operation.id}>
                  <TableCell>{operation.name}</TableCell>
                  <TableCell>{operation.costClinic}</TableCell>
                  <TableCell>{operation.costBill}</TableCell>
                  <TableCell>{operation.duration}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="relative">
            <Table>
              <TableCaption>List of Operations</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-white">Name</TableHead>
                  <TableHead className="text-white">Cost to Clinic</TableHead>
                  <TableHead className="text-white">Bill Cost</TableHead>
                  <TableHead className="text-white">Approx. Duration</TableHead>
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

      <form onSubmit={handleSubmit} className=" p-5">
        <div className="flex items-center justify-around py-5">
          <Button type="submit" disabled={loading} variant="default">
            {loading ? "Saving..." : "Create Operation"}
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
        <Input
          name="name"
          type="text"
          placeholder="Operation Name"
          required
          className="border p-2 m-2 w-full bg-black bg-opacity-50 "
        />
        <Input
          name="costClinic"
          type="number"
          placeholder="Cost to Clinic"
          required
          className="border p-2 m-2 w-full bg-black bg-opacity-50 "
        />
        <Input
          name="costBill"
          type="number"
          placeholder="Bill Cost"
          required
          className="border p-2 m-2 w-full bg-black bg-opacity-50 "
        />
        <Input
          name="duration"
          type="number"
          placeholder="Approx. Duration (minutes)"
          required
          className="border p-2 m-2 w-full bg-black bg-opacity-50 "
        />
      </form>
    </div>
  );
}
