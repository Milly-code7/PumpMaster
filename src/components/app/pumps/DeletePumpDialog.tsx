import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { deletePump, getPumpDetail } from "@/mockApi/pumps/pumps";
import { GET_PUMP_LIST } from "@/lib/consts/pumps/pumpConsts";

interface DeletePumpDialogProps {
  open: boolean;
  onClose: () => void;
  pumpIds: string[];
  onDeleted?: () => void;
}

export default function DeletePumpDialog({
  open,
  onClose,
  pumpIds,
  onDeleted,
}: DeletePumpDialogProps) {
  const [loading, setLoading] = useState(false);
  const [pumpNames, setPumpNames] = useState<string[]>([]);
  const queryClient = useQueryClient();

  useEffect(() => {
    const fetchNames = async () => {
      if (!open || pumpIds.length === 0) return;

      try {
        const names = await Promise.all(
          pumpIds.map(async (id) => {
            try {
              const res = await getPumpDetail({ pumpId: id });
              return res.pumpName ?? "Unnamed Pump";
            } catch (err) {
              console.error("Failed to fetch pump detail for:", id);
              return "Unknown Pump";
            }
          })
        );
        setPumpNames(names);
      } catch (err) {
        console.error("Failed to fetch pump names:", err);
      }
    };

    fetchNames();
  }, [open, pumpIds]);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await Promise.all(pumpIds.map((id) => deletePump(id)));
      queryClient.invalidateQueries({ queryKey: [GET_PUMP_LIST] });
      onDeleted?.();
    } catch (err) {
      console.error("❌ Delete failed:", err);
      alert("Failed to delete. Please try again.");
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Delete</DialogTitle>
        </DialogHeader>

        <div className="mt-4 text-lg">
          Are you sure you want to delete the following pumps?
          <ul className="mt-2 list-disc list-inside text-orange-600 text-base">
            {pumpNames.map((name, idx) => (
              <li key={idx}>{name}</li>
            ))}
          </ul>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            Close
          </Button>
          <Button
            onClick={handleDelete}
            disabled={loading}
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            {loading ? "Deleting..." : "Yes, delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
