"use client";
import { getOperations } from "@/lib/actions/operations";

import { Operation } from "@prisma/client";

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
import { useState } from "react";

import { useEffect } from "react";
import OperationFormDialog from "@/components/custom/OperationFormDialog";

export default function Page({}: {}) {
  const [loading, setLoading] = useState(false);
  const [operations, setOperations] = useState<Operation[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const operationsData = await getOperations();
      setOperations(operationsData);
    }
    fetchData();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-white text-center text-xl">Operation Management</h1>

      <div className="flex justify-end mb-4">
        <Button onClick={() => setDialogOpen(true)} variant="default">
          Create Operation
        </Button>
      </div>

      <div className="text-white">
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

      <OperationFormDialog
        open={dialogOpen}
        onClose={async () => {
          setDialogOpen(false);
          setOperations(await getOperations());
        }}
        loading={loading}
      />
    </div>
  );
}
