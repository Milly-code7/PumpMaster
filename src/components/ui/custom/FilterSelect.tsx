import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface FilterSelectProps {
  value?: number;
  placeholder: string;
  options: { value: number; label: string }[];
  onChange: (val: number | undefined) => void;
  ariaLabel: string;
}

export default function FilterSelect({
  value,
  placeholder,
  options,
  onChange,
  ariaLabel,
}: FilterSelectProps) {
  const stringVal = value?.toString() ?? "";

  return (
    <Select
      value={stringVal}
      onValueChange={(val) => onChange(val ? Number(val) : undefined)}
    >
      <SelectTrigger aria-label={placeholder} className="w-[160px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value.toString()}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
