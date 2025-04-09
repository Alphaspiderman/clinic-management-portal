import { Dialog, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createOperation } from "@/lib/actions/operations";

interface OperationFormDialogProps {
  open: boolean;
  onClose: () => void;
  loading: boolean;
}

export default function OperationFormDialog({
  open,
  onClose,
  loading,
}: OperationFormDialogProps) {
  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    try {
      await createOperation({
        name: formData.get("name") as string,
        costClinic: parseInt(formData.get("costClinic") as string),
        costBill: parseInt(formData.get("costBill") as string),
        duration: parseInt(formData.get("duration") as string),
      });
    } catch (error) {
      alert("Error creating operation");
      return;
    }
    onClose();
  }

  return (
    open && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <Dialog open={open}>
          <form
            onSubmit={handleFormSubmit}
            className="m-5 p-5 bg-black bg-opacity-70 rounded-md min-w-[300px] w-full max-w-md"
          >
            <DialogTitle className="text-2xl text-center text-white">
              Create Operation
            </DialogTitle>
            <div className="flex flex-col gap-4 items-center">
              <Input
                name="name"
                placeholder="Operation Name"
                required
                className="border p-2 m-2 w-5/6 bg-black bg-opacity-50"
              />
              <Input
                name="costClinic"
                placeholder="Cost to Clinic"
                type="number"
                required
                className="border p-2 m-2 w-5/6 bg-black bg-opacity-50"
              />
              <Input
                name="costBill"
                placeholder="Bill Cost"
                type="number"
                required
                className="border p-2 m-2 w-5/6 bg-black bg-opacity-50"
              />
              <Input
                name="duration"
                placeholder="Approx. Duration (minutes)"
                type="number"
                required
                className="border p-2 m-2 w-5/6 bg-black bg-opacity-50"
              />
            </div>
            <div className="flex items-center justify-around py-5">
              <Button
                type="submit"
                disabled={loading}
                variant="default"
                className="bg-green-500 hover:bg-green-600"
              >
                {loading ? "Saving..." : "Create Operation"}
              </Button>
              <Button type="button" onClick={onClose} variant="destructive">
                Cancel
              </Button>
            </div>
          </form>
        </Dialog>
      </div>
    )
  );
}