import PumpActions from "@/components/app/pumps/PumpActions";
import PumpFilter from "@/components/app/pumps/PumpFilters";
import PumpTable from "@/components/app/pumps/PumpTable";
import { usePumpContext } from "@/context/PumpContext";
import Spinner from "@/components/ui/custom/Spinner";
import usePumpStore from "@/store/pumps/pumpStore";

import PageHeader from "@/components/ui/custom/PageHeader";
import CustomPagination from "@/components/ui/custom/CustomPagination";

export default function PumpOverview() {
  const { pumpList } = usePumpContext();
  const { pumpFilter, setPumpFilter} = usePumpStore();

  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="p-6">
        <PageHeader 
          title="Pumps" 
          description="Manage and monitor all pump units"
        />
        
        <div className="flex items-center justify-between mb-6">
          <PumpFilter />
          <PumpActions />
        </div>

        {pumpList.isLoading && (
          <div className="flex justify-center mt-8">
            <Spinner />
          </div>
        )}

        {!pumpList.isLoading && pumpList.data?.items && (
          <PumpTable pumps={pumpList.data.items} />
        )}

        {!pumpList.isLoading && !pumpList.data && (
          <div className="text-center text-muted-foreground mt-6">
            No data found.
          </div>
        )}

        <CustomPagination
          currentPage={pumpFilter.pageNumber}
          totalPages={pumpList.data?.totalPages ?? 1}
          onPageChange={(newPage) => setPumpFilter({ pageNumber: newPage })}
        />
      </div>
    </div>
  );
}
