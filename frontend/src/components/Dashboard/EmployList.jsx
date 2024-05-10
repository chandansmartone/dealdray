import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline, Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./style.css";
import Navbar from "./Navbar";

export default function EmployList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  // const [page, setPage] = useState(0);
// 
  useEffect( () => {
    setLoading(true);
     axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/employees`)
      .then(response => {
        setEmployees(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching employees:", error);
        toast.error("Failed to fetch employees. Please try again.");
        setLoading(false);
      });
  }, []);
  console.log(employees);
  const handleDelete = (id, employeeId) => {
    // Implement delete functionality here
    setLoading(true);
    axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/employee/${id}`)
    .then(response => {
      
      // Filter out the deleted employee from the employees list
      const updatedEmployees = employees.filter(employee => employee.employeeId !== employeeId);
      setEmployees(updatedEmployees);
      toast.success("Employee deleted successfully.");
      setLoading(false);
    })
    .catch(error => {
      console.error("Error deleting employee:", error);
      toast.error("Failed to delete employee. Please try again.");

      setLoading(false);
    });
  };

  const columns = [
    { field: "employeeId", headerName: "ID", minWidth: 150 },
    { field: "name", headerName: "Name", minWidth: 320 },
    {
      field: "image",
      headerName: "image",
      minWidth: 150,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img
              className="productListImg"
              src={params.row.image}
              alt=""
              width={100}
              height={100}
            />
        
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", minWidth: 250 },
    { field: "designation", headerName: "Designation", minWidth: 150 },
    { field: "course", headerName: "course", minWidth: 150 },
    { field: "gender", headerName: "gender", minWidth: 150 },

    {
      field: "action",
      headerName: "Action",
      minWidth: 140,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/employee/${params.row.employeeId}`}>
              <Edit fontSize="small" color="primary" sx={{ marginRight: 5 }} />
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id,params.row.employeeId)}
            />
          </>
        );
      },
    },
  ];

  return (
    <>
    <Navbar/>
    <div className="employeeList page">
        
      <DataGrid
        rows={employees}
        rowCount={employees.length}
        columns={columns}
        disableSelectionOnClick
        loading={loading}
        getRowId={(row) => row.employeeId}
        paginationMode="server"
        autoHeight
        page={1}
      />
    </div>
    </>
  );
}
