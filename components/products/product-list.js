"use client"
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';

const DataTable = () => {
  const [rows, setRows] = React.useState([
    {
      id: 1,
      name: 'Snow',
      price: 23,
      sku: 'red',
      image: 'https://rukminim2.flixcart.com/image/850/1000/jdt4n0w0/bag/j/t/t/school-bag-for-kids-soft-plush-backpack-for-small-kids-nursery-original-imaf2mx9yjf8kc4e.jpeg?q=90&crop=false',
      action: '',
    },
  ]);

  const [openDialog, setOpenDialog] = React.useState(false);
  const [newProduct, setNewProduct] = React.useState({
    name: '',
    price: 0,
    sku: '',
    image: '',
  });

  const handleAddProduct = () => {
    const productToAdd = {
      id: rows.length + 1,
      ...newProduct,
      action: '',
    };
    setRows((prevRows) => [...prevRows, productToAdd]);
    setOpenDialog(false);
  };

  const handleEditProduct = (id) => {
    const productToEdit = rows.find((row) => row.id === id);
    setNewProduct({ ...productToEdit });
    setOpenDialog(true);
  };
  const handleUpdateProduct = () => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === newProduct.id ? { ...row, ...newProduct } : row
      )
    );
    setOpenDialog(false);
  };
  const handleDeleteProduct = (id) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
  };

  const handleOpenDialog = (isAdding) => {
    if (isAdding) {
      setNewProduct({
        name: '',
        price: 0,
        sku: '',
        image: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Product Name', width: 130 },
    {
      field: 'price',
      headerName: 'Price',
      type: 'number',
      width: 90,
    },
    { field: 'sku', headerName: 'SKU', width: 130 },
    {
      field: 'image',
      headerName: 'Image',
      width: 130,
      headerAlign: 'center',
      renderCell: (params) => (
        <img
          src={params.row.image}
          alt={params.row.name}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      ),
    },
    {
      field: 'action',
      headerName: 'Action',
      sortable: false,
      width: 270,
      headerAlign: 'center',
      renderCell: (params) => (
        <>
          <Button
            className="m-10"
            variant="outlined"
            onClick={() => handleEditProduct(params.row.id)}
          >
            Edit
          </Button>
          <Button
            className="m-10"
            variant="outlined"
            color="error"
            onClick={() => handleDeleteProduct(params.row.id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Button className="mx-10 mt-20" variant="outlined" onClick={() => handleOpenDialog(true)}>
        Add Product
      </Button>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{newProduct.id ? 'Edit' : 'Add'} Product</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              label="Product Name"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="SKU"
              name="sku"
              value={newProduct.sku}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Image URL"
              name="image"
              value={newProduct.image}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <Button variant="outlined" onClick={newProduct.id ? handleUpdateProduct : handleAddProduct}>
              {newProduct.id ? 'Save' : 'Add'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <div className="bg-white p-10" style={{ height: '400px', width: '60%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              pageSize: 5,
            },
          }}
          pageSizeOptions={[5, 10]}
          disableSelectionOnClick
        />
      </div>
    </div>
  );
};

export default DataTable;
