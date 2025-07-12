import {
  getPumpList,
  createPump,
  updatePump,
  deletePump,
} from "@/mockApi/pumps/pumps";
import { toast } from "react-hot-toast";
import type { CreatePumpDTO } from "@/interfaces/Pumps/CreatePumpDTO";
import type { UpdatePumpDTO } from "@/interfaces/Pumps/UpdatePumpDTO";
import usePumpStore from "@/store/pumps/pumpStore";
import { 
  useQuery, 
  useMutation, 
  useQueryClient 
} from "@tanstack/react-query";
import type { 
  UseQueryResult, 
  UseMutationResult 
} from "@tanstack/react-query";
import { 
  createContext, 
  useContext
 } from "react";
import type { ReactNode } from "react";
import { 
  CREATE_PUMP, 
  DELETE_PUMP, 
  GET_PUMP_LIST, 
  UPDATE_PUMP 
} from "@/lib/consts/pumps/pumpConsts";
import type { PumpRes } from "@/interfaces/Pumps/PumpRes";

interface PumpContextProps {
  pumpList: UseQueryResult<PumpRes, unknown>;
  createPump: UseMutationResult<any, unknown, CreatePumpDTO>;
  updatePump: UseMutationResult<any, unknown, UpdatePumpDTO>;
  deletePump: UseMutationResult<void, unknown, string[]>;
}

const PumpContext = createContext<PumpContextProps | undefined>(undefined);

export const usePumpContext  = () => {
  const ctx = useContext(PumpContext);
  if (!ctx) throw new Error("usePumps must be used inside PumpProvider");
  return ctx;
};

export const PumpProvider = ({ children }: { children: ReactNode }) => {
  const { pumpFilter } = usePumpStore();
  const queryClient = useQueryClient();

  const handleError = (error: unknown, fallback = "Something went wrong") => {
    const err = error as any;
    return (
      err?.response?.data?.message ||
      err?.response?.data?.errors?.[0] ||
      fallback
    );
  };

  const pumpList = useQuery<PumpRes>({
    queryKey: [GET_PUMP_LIST, pumpFilter],
    queryFn: () => getPumpList(pumpFilter),
    staleTime: 5000,
  });

  const createPumpMutation = useMutation({
    mutationFn: createPump,
    mutationKey: [CREATE_PUMP],
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: [GET_PUMP_LIST, pumpFilter],
        exact: false,
      });
      toast.success("Pump created successfully.");
    },
    onError: (error) => {
      toast.error(handleError(error, "Failed to create pump."));
    },
  });

  const updatePumpMutation = useMutation({
    mutationFn: updatePump,
    mutationKey: [UPDATE_PUMP],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GET_PUMP_LIST],
        exact: false,
      });
      toast.success("Pump updated successfully.");
    },
    onError: (error) => {
      toast.error(handleError(error, "Failed to update pump."));
    },
  });

  const deletePumpMutation = useMutation({
    mutationFn: async (ids: string[]) => {
      await Promise.all(ids.map((id) => deletePump(id)));
    },
    mutationKey: [DELETE_PUMP],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GET_PUMP_LIST],
        exact: false,
      });
      toast.success("Pump(s) deleted successfully.");
    },
    onError: (error) => {
      toast.error(handleError(error, "Failed to delete pump(s)."));
    },
  });

  return (
    <PumpContext.Provider
      value={{
        pumpList,
        createPump: createPumpMutation,
        updatePump: updatePumpMutation,
        deletePump: deletePumpMutation,
      }}
    >
      {children}
    </PumpContext.Provider>
  );
};
