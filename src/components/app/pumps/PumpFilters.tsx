import FilterSelect from "@/components/ui/custom/FilterSelect";
import { Input } from "@/components/ui/input";
import usePumpStore from "@/store/pumps/pumpStore";

const PumpTypeOptions = [
  { value: 0, label: "All Types" },
  { value: 1, label: "Centrifugal" },
  { value: 2, label: "Diaphragm" },
  { value: 3, label: "Peristaltic" },
  { value: 4, label: "Rotary" },
  { value: 5, label: "Submersible" },
];

const PumpAreaOptions = [
  { value: 0, label: "All Areas" },
  ...Array.from({ length: 10 }, (_, i) => ({
    value: i + 1,
    label: `Area ${String.fromCharCode(65 + i)}`,
  })),
];

export default function PumpFilter() {
  const { pumpFilter, setPumpFilter } = usePumpStore();

  return (
    <div className="flex flex-wrap gap-3 items-center">
      <Input
        placeholder="Search Pump Name"
        value={pumpFilter.search ?? ""}
        onChange={(e) => setPumpFilter({ search: e.target.value })}
        className="w-[200px]"
      />

      <FilterSelect
        ariaLabel="Pump Type"
        value={pumpFilter.pumpType}
        placeholder="Pump Type"
        options={PumpTypeOptions}
        onChange={(val) => setPumpFilter({ pumpType: val })}
      />

      <FilterSelect
        ariaLabel="Pump Area"
        value={pumpFilter.pumpArea}
        placeholder="Pump Area"
        options={PumpAreaOptions}
        onChange={(val) => setPumpFilter({ pumpArea: val })}
      />
    </div>
  );
}
