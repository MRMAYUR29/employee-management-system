import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../../services/employeeService";
import {
  setEmployees,
  setLoading,
  setError,
  setTotal,
} from "../../redux/slices/employeeSlice";
import EmployeeForm from "./EmployeeForm";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  MenuItem,
} from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import AppInput from "../../components/Input/AppInput";
import useDebounce from "../../hooks/useDebounce";

export default function Employees() {
  const dispatch = useDispatch();
  const { employees, total, loading, error } = useSelector(
    (state) => state.employee
  );

  const [open, setOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const [department, setDepartment] = useState("");

  const [sortBy, setSortBy] = useState("name");
  const [order, setOrder] = useState("asc");

  const fetchEmployees = useCallback(async () => {
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const response = await getEmployees({
        page: page + 1,
        limit: rowsPerPage,
        search: debouncedSearch,
        department,
        sortBy,
        order,
      });

      dispatch(setEmployees(response.employees));
      dispatch(setTotal(response.total));
    } catch (error) {
      dispatch(
        setError(error.response?.data?.message || "Failed to fetch employees")
      );
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, page, rowsPerPage, debouncedSearch, department, sortBy, order]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  

  const handleEmployeeSubmit = async (data) => {
    try {
      if (selectedEmployee) {
        await updateEmployee(selectedEmployee.id, data);
      } else {
        await createEmployee(data);
      }

      setOpen(false);

      await fetchEmployees();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      await fetchEmployees();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(column);
      setOrder("asc");
    }

    setPage(0);
  };

  if (loading) {
    return <p>Loading employees...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <h1>Employees Page</h1>
      <Button
        onClick={() => {
          setSelectedEmployee(null);
          setOpen(true);
        }}
      >
        Add Employee
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {selectedEmployee ? "Edit Employee" : "Add Employee"}
        </DialogTitle>

        <DialogContent>
          <EmployeeForm
            defaultValues={
              selectedEmployee || {
                name: "",
                email: "",
                department: "",
              }
            }
            onSubmit={handleEmployeeSubmit}
            buttonText={selectedEmployee ? "Update Employee" : "Add Employee"}
          />
        </DialogContent>
      </Dialog>
      <AppInput
        label="Search Employees"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(0);
        }}
      />
      <TextField
        select
        label="Department"
        value={department}
        onChange={(e) => {
          setDepartment(e.target.value);
          setPage(0);
        }}
      >
        <MenuItem value="">All Departments</MenuItem>
        <MenuItem value="IT">IT</MenuItem>
        <MenuItem value="HR">HR</MenuItem>
        <MenuItem value="Finance">Finance</MenuItem>
      </TextField>
      {employees.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>
                  <Button onClick={() => handleSort("name")}>Name</Button>
                </TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>{employee.id}</TableCell>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        setSelectedEmployee(employee);
                        setOpen(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button onClick={() => handleDelete(employee.id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <TablePagination
        component="div"
        count={total}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={(event, newPage) => {
          setPage(newPage);
        }}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        }}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </>
  );
}
