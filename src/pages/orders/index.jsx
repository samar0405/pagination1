import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { OrderModal } from "@modal";
import { OrderTable } from "@ui";
import { order } from "@service";

const Index = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getData = async () => {
    try {
      const response = await order.get();
      if (
        (response.status === 200 || response.status === 201) &&
        response?.data?.orders_list
      ) {
        setData(response.data.orders_list);
        console.log(response.data.orders_list);
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <OrderModal open={open} handleClose={handleClose} />
      <div className="flex flex-col mt-16">
        <div className="flex justify-end">
          <Button
            onClick={handleOpen}
            variant="contained"
            color="primary"
            style={{ display: "block", marginBottom: "20px" }}
          >
            Add
          </Button>
        </div>
        <OrderTable data={data} />
      </div>
    </>
  );
};

export default Index;
