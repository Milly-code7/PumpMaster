import { Loader2 } from "lucide-react";

export default function Spinner() {
  return (
    <div className="flex items-center justify-center">
      <Loader2
        data-testid="spinner" 
        className="h-5 w-5 animate-spin text-primary" 
      />
    </div>
  );
}
