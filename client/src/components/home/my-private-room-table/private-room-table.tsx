import { DataTable } from "@/components/layout/data-table";
import { columns } from "./column";
import { useGetRooms } from "@/hooks/query/room-query";
import Loader from "@/components/layout/loader";

const PrivateRoomTable = () => {
  const { data, isLoading } = useGetRooms();

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Loader />
      </div>
    );
  }
  return (
    <div>
      <DataTable data={data?.rooms || []} columns={columns} />
    </div>
  );
};

export default PrivateRoomTable;
