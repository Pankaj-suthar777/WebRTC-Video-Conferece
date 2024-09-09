import { Room } from "@/@types/room";
import { ColumnDef } from "@tanstack/react-table";

import moment from "moment";
import RoomActionsCell from "./room-actions-cell";

export const columns: ColumnDef<Room>[] = [
  {
    accessorKey: "roomId",
    header: "Room Id",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const createdAt = row.original.createdAt;

      return <div>{moment(createdAt).format("LL")}</div>;
    },
  },
  {
    accessorKey: "actions",
    header: "Join",
    cell: ({ row }) => (
      <RoomActionsCell _id={row.original._id} roomId={row.original.roomId} />
    ),
  },
];
