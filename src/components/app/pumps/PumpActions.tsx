import { useState } from "react";
import { Button } from "@/components/ui/button";
import { usePumpSelectionStore } from "@/store/pumps/pumpSelectionStore";
import DeletePumpDialog from "./DeletePumpDialog";
import CreateEditPumpDialog from "./CreateEditPumpDialog";
import { Pencil, Plus, Trash2 } from "lucide-react";

export default function PumpActions() {
  const { selectedIds, clearSelected } = usePumpSelectionStore();
  const selectedCount = selectedIds.length;

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | undefined>(undefined);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleNew = () => {
    setEditingId(undefined);
    setIsEditing(false);
    setDialogOpen(true);
  };

  const handleEdit = () => {
    setEditingId(selectedIds[0]);
    setIsEditing(true);
    setDialogOpen(true);
  };

  const handleDelete = () => {
    setDeleteDialogOpen(true);
  };

  return (
    <div className="flex flex-wrap justify-end gap-3">
      <Button onClick={handleNew} disabled={selectedCount !== 0} variant="secondary">
        <Plus className="w-4 h-4 mr-2" />
        New
      </Button>

      <Button
        onClick={handleEdit}
        disabled={selectedCount !== 1}
        className="bg-blue-500 text-white hover:bg-blue-600"
      >
        <Pencil className="w-4 h-4 mr-2" />
        Edit
      </Button>

      <Button
        onClick={handleDelete}
        variant="destructive"
        disabled={selectedCount === 0}
      >
        <Trash2 className="w-4 h-4 mr-2" />
        Delete
      </Button>

      <CreateEditPumpDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        pumpId={editingId}
        isEditing={isEditing}
      />

      <DeletePumpDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        pumpIds={selectedIds}
        onDeleted={() => {
          clearSelected();
          setDeleteDialogOpen(false);
        }}
      />
    </div>
  );
}
