import { Dialog, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface PatientFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
  loading: boolean;
}

export default function PatientFormDialog({
  open,
  onClose,
  onSubmit,
  loading,
}: PatientFormDialogProps) {
  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    try {
      onSubmit(formData);
    } catch (error) {
      alert("Error creating patient: " + error);
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
              Create Patient
            </DialogTitle>
            <div className="flex flex-col gap-4 items-center">
              <Input
                name="name"
                placeholder="Name"
                required
                className="border p-2 m-2 w-5/6 bg-black bg-opacity-50"
              />
              <Input
                name="contact"
                placeholder="Contact"
                required
                className="border p-2 m-2 w-5/6 bg-black bg-opacity-50"
              />
              <Input
                name="birthYear"
                placeholder="Birth Year"
                type="number"
                required
                className="border p-2 m-2 w-5/6 bg-black bg-opacity-50"
              />
              <Input
                name="emergencyContact"
                placeholder="Emergency Contact"
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
                {loading ? "Saving..." : "Create Patient"}
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
