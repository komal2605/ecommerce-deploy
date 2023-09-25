"use client";
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  productState,
  setRemoveItem,
  setUpdateCollection,
} from "../GlobalRedux/Slices/productSlice";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";

import CloseIcon from "@mui/icons-material/Close";

// const DummyData = [
//   {
//     id: 1,
//     name: "BASKET WITH HANDLES",
//     price: "160",
//     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut ullamcorper leo, eget euismod orci. Cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus. Vestibulum ultricies aliquam convallis.",
//     images: [
//       "https://depot.qodeinteractive.com/wp-content/uploads/2017/01/h1-product-8-600x728.jpg",
//     ],
//     quantity_available: 1,
//     category: "home-decor",
//   },
//   {
//     id: 2,
//     name: "FLOWER VASE",
//     price: "160",
//     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut ullamcorper leo, eget euismod orci. Cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus. Vestibulum ultricies aliquam convallis.",
//     images: [
//       "https://depot.qodeinteractive.com/wp-content/uploads/2017/01/h1-product-7-1024x1024.jpg",
//     ],
//     quantity_available: 1,
//     category: "home-decor",
//   },
//   {
//     id: 3,
//     name: "FLOWER VASE",
//     price: "160",
//     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut ullamcorper leo, eget euismod orci. Cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus. Vestibulum ultricies aliquam convallis.",
//     images: [
//       "https://depot.qodeinteractive.com/wp-content/uploads/2017/01/h1-product-6-1024x1024.jpg",
//     ],
//     quantity_available: 1,
//     category: "home-decor",
//   },
//   {
//     id: 4,
//     name: "FLOWER VASE",
//     price: "160",
//     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut ullamcorper leo, eget euismod orci. Cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus. Vestibulum ultricies aliquam convallis.",
//     images: [
//       "https://depot.qodeinteractive.com/wp-content/uploads/2017/01/h1-product-6-1024x1024.jpg",
//     ],
//     quantity_available: 1,
//     category: "home-decor",
//   },
// ];

function page() {
  const { productList } = useSelector(productState);
  const [totalAmount, setTotalAmount] = React.useState(0);
  const dispatch = useDispatch();

  const handleTotalAmount = () => {
    let totalAmount = 0;
    for (const item of productList) {
      totalAmount += parseInt(item.price) * item.quantity_available;
      console.log(totalAmount);
    }
    setTotalAmount(totalAmount.toFixed(2));
  };
  React.useEffect(() => {
    handleTotalAmount();
  }, [productList]);
  return (
    <Box
      sx={{
        mt: 14,
        p: 10,
        bgcolor: "#fafafa",
      }}
    >
      {productList.length > 0 ? (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 540 }}>
            <Table stickyHeader aria-label="cart">
              {/* <TableHead>
                    <TableRow
                      sx={{
                        "& .MuiTableCell-root > .MuiTypography-root": {
                          color: "#0c0c0c !important",
                        },
                      }}
                    >
                      <TableCell
                        align="left"
                        className="ps-5"
                        sx={{ width: 70 }}
                      >
                        <Typography
                          variant="h6"
                          className="fw-semibold "
                          component="h6"
                        >
                          Image
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography
                          variant="h6"
                          className="fw-semibold "
                          component="h6"
                        >
                          Name
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography
                          variant="h6"
                          className="fw-semibold "
                          component="h6"
                        >
                          Size
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography
                          variant="h6"
                          className="fw-semibold "
                          component="h6"
                        >
                          Quantity
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography
                          variant="h6"
                          className="fw-semibold "
                          component="h6"
                        >
                          Price
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography
                          variant="h6"
                          className="fw-semibold "
                          component="h6"
                        >
                          Remove
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead> */}
              <TableBody>
                {productList.map((item, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      "&:last-child td, &:last-child th": {
                        border: 0,
                      },
                      "& .MuiTableCell-root > .MuiTypography-root": {
                        color: "#0c0c0c !important",
                      },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      <IconButton
                        size="small"
                        className="fw-bold me-4"
                        color="warning"
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure you want to delete this user?"
                            )
                          ) {
                            dispatch(setRemoveItem(item));
                            alert("Item removed from cart");
                          }
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        style={{
                          width: 120,
                          height: 120,
                          aspectRatio: 4 / 4,
                          objectFit: "contain",
                        }}
                      />
                    </TableCell>
                    <TableCell align="center" sx={{ minWidth: 150 }}>
                      <Typography
                        variant="h6"
                        className="fw-semibold text-dark text-wrap"
                        component="h6"
                      >
                        {item.name}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography
                        variant="h6"
                        className="fw-semibold "
                        component="h6"
                      >
                        ${item.price}
                      </Typography>
                    </TableCell>
                    <TableCell align="center" sx={{ minWidth: 200 }}>
                      <Typography
                        variant="h6"
                        className="fw-semibold "
                        component="h6"
                      >
                        <IconButton
                          disabled={
                            item.quantity_available === 1 ? true : false
                          }
                          size="small"
                          className="fw-bold me-4"
                          color="warning"
                          onClick={() => dispatch(setUpdateCollection(item))}
                        >
                          <RemoveIcon />
                        </IconButton>
                        {item.quantity_available}
                        <IconButton
                          size="small"
                          className="fw-bold ms-4"
                          color="success"
                          onClick={() => dispatch(addToCart(item))}
                        >
                          <AddIcon />
                        </IconButton>
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography
                        variant="h6"
                        className="fw-bold "
                        component="h6"
                      >
                        ${parseInt(item.price) * item.quantity_available}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow bgcolor="#ddd">
                  <TableCell colSpan={5}>
                    <Typography
                      variant="h5"
                      component="h5"
                      color="#000 "
                      onClick={handleTotalAmount}
                    >
                      Total Amount
                    </Typography>
                  </TableCell>
                  <TableCell colSpan={5}>
                    <Typography
                      variant="h5"
                      component="h5"
                      color="#000"
                      className="fw-bold"
                    >
                      $ {totalAmount}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      ) : (
        "No item founded"
      )}
    </Box>
  );
}

export default page;
