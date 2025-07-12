import { useNavigate } from "react-router-dom";
import type { IPump } from "@/interfaces/Pumps/IPump";
import { usePumpSelectionStore } from "@/store/pumps/pumpSelectionStore";
import { PumpType } from "@/enums/Pumps/PumpType";
import { PumpArea } from "@/enums/Pumps/PumpArea";

const pumpTypeLabels: Record<PumpType, string> = {
  [PumpType.Centrifugal]: "Centrifugal",
  [PumpType.Diaphragm]: "Diaphragm",
  [PumpType.Peristaltic]: "Peristaltic",
  [PumpType.Rotary]: "Rotary",
  [PumpType.Submersible]: "Submersible",
};

const pumpAreaLabels: Record<PumpArea, string> = {
  [PumpArea.AreaA]: "Area A",
  [PumpArea.AreaB]: "Area B",
  [PumpArea.AreaC]: "Area C",
  [PumpArea.AreaD]: "Area D",
  [PumpArea.AreaE]: "Area E",
  [PumpArea.AreaF]: "Area F",
  [PumpArea.AreaG]: "Area G",
  [PumpArea.AreaH]: "Area H",
  [PumpArea.AreaI]: "Area I",
  [PumpArea.AreaJ]: "Area J",
};

interface PumpTableProps {
  pumps: IPump[];
}

export default function PumpTable({ pumps }: PumpTableProps) {
  const navigate = useNavigate();
  const {
    selectedIds,
    toggleSelectOne,
    toggleSelectAll,
    isAllSelected
  } = usePumpSelectionStore();
  
  return (
    <div className="overflow-auto rounded border">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">
              <input
                type="checkbox"
                onChange={() => toggleSelectAll(pumps.map((p) => p.pumpId))}
                checked={isAllSelected(pumps.map((p) => p.pumpId))}
              />
            </th>
            <th className="p-2">Pump Name</th>
            <th className="p-2">Type</th>
            <th className="p-2">Area</th>
            <th className="p-2">Latitude</th>
            <th className="p-2">Longitude</th>
            <th className="p-2">Flow Rate</th>
            <th className="p-2">Offset</th>
            <th className="p-2">Current</th>
            <th className="p-2">Min</th>
            <th className="p-2">Max</th>
          </tr>
        </thead>
        <tbody>
          {pumps.map((pump) => (
            <tr key={pump.pumpId} className="border-t hover:bg-gray-50">
              <td className="p-2">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(pump.pumpId)}
                  onChange={() => toggleSelectOne(pump.pumpId)}
                />
              </td>
              <td
                className="p-2 text-blue-600 cursor-pointer"
                onClick={() => navigate(`/pumps/${pump.pumpId}`)}
              >
                {pump.pumpName}
              </td>
              <td className="p-2">{pumpTypeLabels[pump.pumpType]}</td>
              <td className="p-2">{pumpAreaLabels[pump.pumpArea]}</td>
              <td className="p-2">{pump.latitude.toFixed(4)}</td>
              <td className="p-2">{pump.longitude.toFixed(4)}</td>
              <td className="p-2">{pump.flowRate} GPM</td>
              <td className="p-2">{pump.offset} sec</td>
              <td className="p-2">{pump.currentPressure} psi</td>
              <td className="p-2">{pump.minPressure} psi</td>
              <td className="p-2">{pump.maxPressure} psi</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
