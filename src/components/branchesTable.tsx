import { useState } from "react";
import { Card, Typography } from "@material-tailwind/react";
import {
  DocumentCheckIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import BranchAPI, { Branch } from "../apis/branch";

const TABLE_HEAD = [
  "ID",
  "Branch Name",
  "Address",
  "Phone",
  "Email",
  "Facebook",
  "IG",
  "X",
  "Reserve link",
  "Opening hours",
  "Action",
];

interface BranchesTableComponentProps {
  branchesData: Branch[];
  tableUpdate: () => void; // Define tableUpdate as a function prop that takes no arguments and returns void
}

export default function BranchesTable(props: BranchesTableComponentProps) {
  const [editableBranchId, setEditableBranchId] = useState<number | null>(null);

  const [editableBranchData, setEditableBranchData] = useState<Branch | null>(
    null
  );

  const branch = new BranchAPI();

  const handleEditClick = (branchData: Branch) => {
    setEditableBranchId(branchData.branch_id);
    setEditableBranchData(branchData);
  };

  const handleSaveClick = () => {
    branch.updateBranch(editableBranchData!);
    setEditableBranchId(null);
    handleChildChange();
  };

  const handleDeleteClick = (branch_id: number) => {
    branch.deleteBranch(branch_id);
    handleChildChange();
  };

  // Perform actions that require re-render in the parent
  const handleChildChange = () => {
    props.tableUpdate();
  };

  return (
    <Card className="overflow-x-auto w-full mt-4 mb-4">
      <table className="text-center table-auto w-full">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.branchesData.map((branch, index) => {
            const isLast = index === props.branchesData.length - 1;
            const classes = isLast
              ? "h-20"
              : "h-20 border-b border-blue-gray-50";

            return (
              <tr key={branch.branch_id}>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {branch.branch_id}
                  </Typography>
                </td>
                <td className={classes}>
                  {editableBranchId === branch.branch_id ? (
                    <input
                      className="w-20 border border-orange-300 rounded-md px-1  focus:outline-none focus:border-blue-500"
                      type="text"
                      value={editableBranchData!.branch_name}
                      onChange={(e) => {
                        setEditableBranchData((prevBranchData) => ({
                          ...prevBranchData!,
                          branch_name: e.target.value,
                        }));
                      }}
                    />
                  ) : (
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {branch.branch_name}
                    </Typography>
                  )}
                </td>

                <td className={classes}>
                  {editableBranchId === branch.branch_id ? (
                    <input
                      className="w-20 border border-orange-300 rounded-md px-1  focus:outline-none focus:border-blue-500"
                      type="text"
                      value={editableBranchData!.branch_address}
                      onChange={(e) => {
                        setEditableBranchData((prevBranchData) => ({
                          ...prevBranchData!,
                          branch_address: e.target.value,
                        }));
                      }}
                    />
                  ) : (
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {branch.branch_address}
                    </Typography>
                  )}
                </td>

                <td className={classes}>
                  {editableBranchId === branch.branch_id ? (
                    <input
                      className="w-20 border border-orange-300 rounded-md px-1  focus:outline-none focus:border-blue-500"
                      type="text"
                      value={editableBranchData!.branch_phone}
                      onChange={(e) => {
                        setEditableBranchData((prevBranchData) => ({
                          ...prevBranchData!,
                          branch_phone: e.target.value,
                        }));
                      }}
                    />
                  ) : (
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {branch.branch_phone}
                    </Typography>
                  )}
                </td>

                <td className={classes}>
                  {editableBranchId === branch.branch_id ? (
                    <input
                      className="w-20 border border-orange-300 rounded-md px-1  focus:outline-none focus:border-blue-500"
                      type="text"
                      value={editableBranchData!.branch_email}
                      onChange={(e) => {
                        setEditableBranchData((prevBranchData) => ({
                          ...prevBranchData!,
                          branch_email: e.target.value,
                        }));
                      }}
                    />
                  ) : (
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {branch.branch_email}
                    </Typography>
                  )}
                </td>

                <td className={classes}>
                  {editableBranchId === branch.branch_id ? (
                    <input
                      className="w-20 border border-orange-300 rounded-md px-1  focus:outline-none focus:border-blue-500"
                      type="text"
                      value={editableBranchData!.branch_facebook_link}
                      onChange={(e) => {
                        setEditableBranchData((prevBranchData) => ({
                          ...prevBranchData!,
                          branch_facebook_link: e.target.value,
                        }));
                      }}
                    />
                  ) : (
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {branch.branch_facebook_link}
                    </Typography>
                  )}
                </td>

                <td className={classes}>
                  {editableBranchId === branch.branch_id ? (
                    <input
                      className="w-20 border border-orange-300 rounded-md px-1  focus:outline-none focus:border-blue-500"
                      type="text"
                      value={editableBranchData!.branch_ig_link}
                      onChange={(e) => {
                        setEditableBranchData((prevBranchData) => ({
                          ...prevBranchData!,
                          branch_ig_link: e.target.value,
                        }));
                      }}
                    />
                  ) : (
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {branch.branch_ig_link}
                    </Typography>
                  )}
                </td>

                <td className={classes}>
                  {editableBranchId === branch.branch_id ? (
                    <input
                      className="w-20 border border-orange-300 rounded-md px-1  focus:outline-none focus:border-blue-500"
                      type="text"
                      value={editableBranchData!.branch_x_link}
                      onChange={(e) => {
                        setEditableBranchData((prevBranchData) => ({
                          ...prevBranchData!,
                          branch_x_link: e.target.value,
                        }));
                      }}
                    />
                  ) : (
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {branch.branch_x_link}
                    </Typography>
                  )}
                </td>

                <td className={classes}>
                  {editableBranchId === branch.branch_id ? (
                    <input
                      className="w-20 border border-orange-300 rounded-md px-1  focus:outline-none focus:border-blue-500"
                      type="text"
                      value={editableBranchData!.branch_reserve_link}
                      onChange={(e) => {
                        setEditableBranchData((prevBranchData) => ({
                          ...prevBranchData!,
                          branch_reserve_link: e.target.value,
                        }));
                      }}
                    />
                  ) : (
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {branch.branch_reserve_link}
                    </Typography>
                  )}
                </td>

                <td className={classes}>
                  {editableBranchId === branch.branch_id ? (
                    <input
                      className="w-20 border border-orange-300 rounded-md px-1  focus:outline-none focus:border-blue-500"
                      type="text"
                      value={editableBranchData!.branch_opening_hours}
                      onChange={(e) => {
                        setEditableBranchData((prevBranchData) => ({
                          ...prevBranchData!,
                          branch_opening_hours: e.target.value,
                        }));
                      }}
                    />
                  ) : (
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {branch.branch_opening_hours}
                    </Typography>
                  )}
                </td>

                <td className={`${classes} bg-blue-gray-50/50 `}>
                  <div className="flex justify-center items-center space-x-2">
                    {editableBranchId === branch.branch_id ? (
                      <Typography
                        as="a"
                        href="#"
                        variant="small"
                        color="blue-gray"
                        className="font-medium"
                        onClick={handleSaveClick}
                      >
                        <DocumentCheckIcon className="h-5 w-5 text-green-300" />
                      </Typography>
                    ) : (
                      <Typography
                        as="a"
                        href="#"
                        variant="small"
                        color="blue-gray"
                        className="font-medium"
                        onClick={() => handleEditClick(branch)}
                      >
                        <PencilIcon className="h-5 w-5 text-blue-500" />
                      </Typography>
                    )}
                    <Typography
                      as="a"
                      href="#"
                      variant="small"
                      color="blue-gray"
                      className="font-medium"
                      onClick={() => handleDeleteClick(branch.branch_id)}
                    >
                      <TrashIcon className="h-5 w-5 text-red-500" />
                    </Typography>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}
