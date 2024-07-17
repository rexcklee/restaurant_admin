import { useState, useEffect } from "react";
import { Sidebar } from "../components/sidebar";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
} from "@material-tailwind/react";

import BranchesTable from "../components/branchesTable";
import BranchAPI, { Branch } from "../apis/branch";
import { useAuth } from "../provider/authProvider";
import { useNavigate } from "react-router-dom";

export default function Branches() {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const [branchesData, setBranchesData] = useState<Branch[] | null>(null);

  const [newBranchData, setNewBranchData] = useState<Branch | null>({
    branch_id: 0,
    branch_name: "",
    branch_address: "",
    branch_phone: "",
    branch_email: "",
    branch_facebook_link: "",
    branch_ig_link: "",
    branch_x_link: "",
    branch_reserve_link: "",
    branch_opening_hours: "",
  });
  const [tableUpdate, setTableUpdate] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  const branch = new BranchAPI();

  const handleSubmit = () => {
    branch.addBranch(newBranchData!).then(() => {
      handleOpen();
    });
  };

  const handleForceUpdate = () => {
    setTableUpdate((prev) => !prev); // Toggle the state to force re-render
  };

  useEffect(() => {
    branch
      .branchList()
      .then((response) => {
        if (response.code === 403) {
          setToken(null);
          navigate("/", { replace: true });
        }
        setBranchesData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [open, tableUpdate]);

  return (
    <>
      <div className="flex h-screen bg-blue-gray-50">
        <Sidebar />
        {/* Table in a card on right */}
        <div className="p-4 w-full relative overflow-x-auto overflow-y-auto">
          <div className="bg-white p-4 shadow-md rounded-xl ">
            <div className="flex justify-between">
              <p className="text-3xl font-bold ">Branches</p>
            </div>
            <div className="flex justify-center items-center">
              {branchesData && (
                <div className="w-full overflow-x-auto">
                  <div className="flex items-end justify-between">
                    <p className="text-xl">
                      Number of branches: {branchesData.length}
                    </p>
                    <button
                      className="w-20 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 rounded focus:outline-none focus:shadow-outline"
                      type="submit"
                      onClick={handleOpen}
                    >
                      Add
                    </button>
                  </div>
                  <BranchesTable
                    branchesData={branchesData}
                    tableUpdate={handleForceUpdate}
                  />
                </div>
              )}
            </div>

            {/* Dialog for Add Category */}
            <Dialog
              size="xs"
              open={open}
              handler={handleOpen}
              className="bg-transparent shadow-none"
            >
              <Card className="mx-auto w-full ">
                <CardBody className="flex flex-col gap-1">
                  <Typography variant="h4" color="blue-gray">
                    Add Product
                  </Typography>

                  <Input
                    label="Branch Name"
                    size="md"
                    value={newBranchData?.branch_name || ""}
                    onChange={(e) =>
                      setNewBranchData((prevBranchData) => ({
                        ...prevBranchData!,
                        branch_name: e.target.value,
                      }))
                    }
                    crossOrigin={undefined}
                  />

                  <Input
                    label="Address"
                    size="md"
                    value={newBranchData?.branch_address || ""}
                    onChange={(e) =>
                      setNewBranchData((prevBranchData) => ({
                        ...prevBranchData!,
                        branch_address: e.target.value,
                      }))
                    }
                    crossOrigin={undefined}
                  />

                  <Input
                    label="Phone"
                    size="md"
                    value={newBranchData?.branch_phone || ""}
                    onChange={(e) =>
                      setNewBranchData((prevBranchData) => ({
                        ...prevBranchData!,
                        branch_phone: e.target.value,
                      }))
                    }
                    crossOrigin={undefined}
                  />

                  <Input
                    label="Email"
                    size="md"
                    value={newBranchData?.branch_email || ""}
                    onChange={(e) =>
                      setNewBranchData((prevBranchData) => ({
                        ...prevBranchData!,
                        branch_email: e.target.value,
                      }))
                    }
                    crossOrigin={undefined}
                  />

                  <Input
                    label="Facebook"
                    size="md"
                    value={newBranchData?.branch_facebook_link || ""}
                    onChange={(e) =>
                      setNewBranchData((prevBranchData) => ({
                        ...prevBranchData!,
                        branch_facebook_link: e.target.value,
                      }))
                    }
                    crossOrigin={undefined}
                  />

                  <Input
                    label="IG"
                    size="md"
                    value={newBranchData?.branch_ig_link || ""}
                    onChange={(e) =>
                      setNewBranchData((prevBranchData) => ({
                        ...prevBranchData!,
                        branch_ig_link: e.target.value,
                      }))
                    }
                    crossOrigin={undefined}
                  />

                  <Input
                    label="X"
                    size="md"
                    value={newBranchData?.branch_x_link || ""}
                    onChange={(e) =>
                      setNewBranchData((prevBranchData) => ({
                        ...prevBranchData!,
                        branch_x_link: e.target.value,
                      }))
                    }
                    crossOrigin={undefined}
                  />

                  <Input
                    label="Reserve Link"
                    size="md"
                    value={newBranchData?.branch_reserve_link || ""}
                    onChange={(e) =>
                      setNewBranchData((prevBranchData) => ({
                        ...prevBranchData!,
                        branch_reserve_link: e.target.value,
                      }))
                    }
                    crossOrigin={undefined}
                  />

                  <Input
                    label="Opening Hours"
                    size="md"
                    value={newBranchData?.branch_opening_hours || ""}
                    onChange={(e) =>
                      setNewBranchData((prevBranchData) => ({
                        ...prevBranchData!,
                        branch_opening_hours: e.target.value,
                      }))
                    }
                    crossOrigin={undefined}
                  />
                </CardBody>
                <CardFooter className="pt-0">
                  <Button variant="gradient" onClick={handleSubmit} fullWidth>
                    Add
                  </Button>
                </CardFooter>
              </Card>
            </Dialog>
          </div>
        </div>
      </div>
    </>
  );
}
