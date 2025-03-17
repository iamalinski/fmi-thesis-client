import { Skeleton, TableRow, TableCell } from "@mui/material";

export default function ClientsTableSkeleton({ rowsPerPage }) {
  return Array(rowsPerPage)
    .fill(0)
    .map((_, index) => (
      <TableRow key={`skeleton-${index}`} sx={{ opacity: 1 - index * 0.1 }}>
        <TableCell>
          <Skeleton width={40} />
        </TableCell>
        <TableCell>
          <Skeleton width={Math.random() * 100 + 150} />
        </TableCell>
        <TableCell>
          <Skeleton width={100} />
        </TableCell>
        <TableCell>
          <Skeleton width={80} />
        </TableCell>
        <TableCell>
          <Skeleton width={Math.random() * 50 + 100} />
        </TableCell>
        <TableCell>
          <Skeleton width={Math.random() * 100 + 150} />
        </TableCell>
        <TableCell>
          <Skeleton width={80} />
        </TableCell>
        <TableCell align="center">
          <Skeleton width={30} sx={{ margin: "0 auto" }} />
        </TableCell>
      </TableRow>
    ));
}
