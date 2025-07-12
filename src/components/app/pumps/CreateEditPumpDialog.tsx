import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { getPumpDetail, updatePump, createPump } from "@/mockApi/pumps/pumps";
import { PumpType } from "@/enums/Pumps/PumpType";
import { PumpArea } from "@/enums/Pumps/PumpArea";
import { GET_PUMP_LIST } from "@/lib/consts/pumps/pumpConsts";
import type { UpdatePumpDTO } from "@/interfaces/Pumps/UpdatePumpDTO";
import type { CreatePumpDTO } from "@/interfaces/Pumps/CreatePumpDTO";

const pumpTypeLabels: Record<number, string> = {
  [PumpType.Centrifugal]: "Centrifugal",
  [PumpType.Diaphragm]: "Diaphragm",
  [PumpType.Peristaltic]: "Peristaltic",
  [PumpType.Rotary]: "Rotary",
  [PumpType.Submersible]: "Submersible",
};

const PumpAreaOptions = Object.entries(PumpArea).map(([key, value]) => ({
  value: value as number,
  label: `Area ${key.slice(-1)}`,
}));

interface PumpDialogProps {
  open: boolean;
  onClose: () => void;
  pumpId?: string;
  isEditing: boolean;
}

export default function CreateEditPumpDialog({
  open,
  onClose,
  pumpId,
  isEditing,
}: PumpDialogProps) {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<
    Partial<{
      pumpId: string;
      pumpName: string;
      pumpType: PumpType;
      pumpArea: PumpArea;
      latitude: string;
      longitude: string;
      flowRate: string;
      offset: string;
      currentPressure: string;
      minPressure: number;
      maxPressure: number;
    }>
  >({
    latitude: "",
    longitude: "",
    flowRate: "",
    offset: "",
    currentPressure: "",
  });

  useEffect(() => {
    if (!open) return;

    if (isEditing && pumpId) {
      getPumpDetail({ pumpId }).then((data) => {
        setFormData({
          pumpId: data.pumpId,
          pumpName: data.pumpName,
          pumpType: data.pumpType,
          pumpArea: data.pumpArea,
          latitude: data.latitude.toString(),
          longitude: data.longitude.toString(),
          flowRate: data.flowRate.toString(),
          offset: data.offset.toString(),
          minPressure: data.minPressure,
          maxPressure: data.maxPressure,
          currentPressure: "",
        });
      });
    } else {
      setFormData({
        pumpName: "",
        pumpType: PumpType.Centrifugal,
        pumpArea: PumpArea.AreaA,
        latitude: "",
        longitude: "",
        flowRate: "",
        offset: "",
        currentPressure: "",
        minPressure: 0,
        maxPressure: 0,
      });
    }
  }, [isEditing, pumpId, open]);

  const handleChange = <K extends keyof typeof formData>(
    key: K,
    value: typeof formData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    try {
      if (isEditing) {
        const payload: UpdatePumpDTO = {
          pumpId: formData.pumpId!,
          pumpName: formData.pumpName!,
          pumpType: formData.pumpType!,
          pumpArea: formData.pumpArea!,
          latitude: Number(formData.latitude),
          longitude: Number(formData.longitude),
          flowRate: Number(formData.flowRate),
          offset: Number(formData.offset),
          minPressure: formData.minPressure ?? 0,
          maxPressure: formData.maxPressure ?? 0,
        };
        await updatePump(payload);
      } else {
        const payload: CreatePumpDTO = {
          pumpName: formData.pumpName!,
          pumpType: formData.pumpType!,
          pumpArea: formData.pumpArea!,
          latitude: Number(formData.latitude),
          longitude: Number(formData.longitude),
          flowRate: Number(formData.flowRate),
          offset: Number(formData.offset),
          currentPressure: Number(formData.currentPressure) || 0,
        };
        await createPump(payload);
      }

      queryClient.invalidateQueries({ queryKey: [GET_PUMP_LIST] });
      onClose();
    } catch (error) {
      console.error("Failed to save pump:", error);
      alert("Failed to save pump. Please try again.");
    }
  };

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader className="border-b pb-2">
          <DialogTitle>{isEditing ? "Edit Pump" : "New Pump"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div>
            <h2 className="text-2xl font-bold">
              {formData.pumpName || (!isEditing ? "New Pump" : "")}
            </h2>
            {isEditing && (
              <p className="text-sm text-gray-500 flex justify-between">
                <span>Pump ID:</span>
                <span>{formData.pumpId}</span>
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Pump Name</label>
            <Input
              value={formData.pumpName ?? ""}
              placeholder="Pump Master"
              onChange={(e) => handleChange("pumpName", e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Pump Type</label>
            {isEditing ? (
              <Input
                value={pumpTypeLabels[formData.pumpType ?? 0] ?? ""}
                readOnly
              />
            ) : (
              <Select
                value={formData.pumpType?.toString() ?? ""}
                onValueChange={(val) =>
                  handleChange("pumpType", Number(val) as PumpType)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Pump Type" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(pumpTypeLabels).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Pump Area</label>
            <Select
              value={formData.pumpArea?.toString() ?? ""}
              onValueChange={(val) =>
                handleChange("pumpArea", Number(val) as PumpArea)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Pump Area" />
              </SelectTrigger>
              <SelectContent>
                {PumpAreaOptions.map((area) => (
                  <SelectItem
                    key={area.value}
                    value={area.value.toString()}
                  >
                    {area.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium">Latitude</label>
              <Input
                value={formData.latitude ?? ""}
                placeholder="e.g. -31.5031"
                onChange={(e) => handleChange("latitude", e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Longitude</label>
              <Input
                value={formData.longitude ?? ""}
                placeholder="e.g. 131.5035"
                onChange={(e) => handleChange("longitude", e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Offset</label>
            <div className="relative">
              <Input
                value={formData.offset ?? ""}
                placeholder="e.g. 5"
                onChange={(e) => handleChange("offset", e.target.value)}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                sec
              </span>
            </div>
          </div>

          {!isEditing && (
            <div>
              <label className="block mb-1 text-sm font-medium">Current Pressure</label>
              <div className="relative">
                <Input
                  value={formData.currentPressure ?? ""}
                  placeholder="e.g. 150"
                  onChange={(e) => handleChange("currentPressure", e.target.value)}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                  psi
                </span>
              </div>
            </div>
          )}

          {isEditing && (
            <div>
              <label className="block mb-1 text-sm font-medium">Min / Max Pressure</label>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <Input value={formData.minPressure ?? 0} readOnly />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                    psi
                  </span>
                </div>
                <div className="relative">
                  <Input value={formData.maxPressure ?? 0} readOnly />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                    psi
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 mt-8">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {isEditing ? "Save Changes" : "Create Pump"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
