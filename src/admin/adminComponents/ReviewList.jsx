/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import DeleteReviewModal from "../../components/common/DeleteReviewModal";
import { useCallback } from "react";

const ReviewList = ({ reviewList, updateReviews }) => {
  const columns = [
    { name: "Id", uid: "id" },
    { name: "Owner", uid: "username" },
    { name: "Movie Name", uid: "movieName" },
    { name: "Review", uid: "review" },
    { name: "Like Count", uid: "likeCount" },
    { name: "Actions", uid: "actions" },
  ];

  const renderCell = useCallback((review, columnKey) => {
    const cellValue = review[columnKey];

    switch (columnKey) {
      case "id":
        return <p className=" text-textColor">{cellValue}</p>;

      case "username":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm  text-textColor">{cellValue}</p>
          </div>
        );
      case "movieName":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm  text-textColor">{cellValue}</p>
          </div>
        );
      case "review":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm  text-textColor">{cellValue}</p>
          </div>
        );
      case "likeCount":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm  text-textColor">{cellValue}</p>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex justify-center   items-center gap-2">
            <DeleteReviewModal
              updateReviews={updateReviews}
              reviewId={review.id}
              movieId={review.movieId}
            />
          </div>
        );
      default:
        return cellValue;
    }
  }, []);
  return (
    <Table aria-label="review-list">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={reviewList}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default ReviewList;
