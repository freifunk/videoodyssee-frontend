import { useState } from 'react';
import { format } from 'date-fns';

import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  CardHeader,
  Button
} from '@mui/material';

import Label from 'src/components/Label';
import BulkActions from './BulkActions';
import { Container } from '@mui/system';

const getStatusLabel = (cryptoOrderStatus) => {
  const map = {
    failed: {
      text: 'Failed',
      color: 'error'
    },
    completed: {
      text: 'Completed',
      color: 'success'
    },
    pending: {
      text: 'Pending',
      color: 'warning'
    }
  };

  console.log(map[cryptoOrderStatus],"cook");
  const { text, color } = map[cryptoOrderStatus];
 

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (cryptoOrders, filters) => {
  return cryptoOrders.filter((cryptoOrder) => {
    let matches = true;

    if (filters.status && cryptoOrder.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (cryptoOrders, page, limit) => {
  return cryptoOrders.slice(page * limit, page * limit + limit);
};

const RecentOrdersTable = ({ cryptoOrders }) => {
  const [selectedCryptoOrders] = useState([]);
  const selectedBulkActions = selectedCryptoOrders.length > 0;
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [filters, setFilters] = useState({
    status: null
  });

  const statusOptions = [
    {
      id: 'all',
      name: 'All'
    },
    {
      id: 'completed',
      name: 'Completed'
    },
    {
      id: 'pending',
      name: 'Pending'
    },
    {
      id: 'failed',
      name: 'Failed'
    }
  ];

  const handleStatusChange = (e) => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value
    }));
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };

  const filteredCryptoOrders = applyFilters(cryptoOrders, filters);
  const paginatedCryptoOrders = applyPagination(
    filteredCryptoOrders,
    page,
    limit
  );

  return (
    <Card>
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions />
        </Box>
      )}
      {!selectedBulkActions && (
        <CardHeader
          action={
            <Box width={150}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Status</InputLabel>
                <Select
                  value={filters.status || 'all'}
                  onChange={handleStatusChange}
                  label="Status"
                  autoWidth
                >
                  {statusOptions.map((statusOption) => (
                    <MenuItem key={statusOption.id} value={statusOption.id}>
                      {statusOption.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          }
          title="Recent Videos"
        />
      )}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>

              <TableCell>Video Name</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align='center'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCryptoOrders.map((cryptoOrder) => {
              const isCryptoOrderSelected = selectedCryptoOrders.includes(
                cryptoOrder.id
              );
              return (
                <TableRow
                  hover
                  key={cryptoOrder.id}
                  selected={isCryptoOrderSelected}
                >

                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {cryptoOrder.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {format(new Date(cryptoOrder.date), 'MMMM dd yyyy')}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {cryptoOrder.language}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {cryptoOrder.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {cryptoOrder.email}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    {getStatusLabel(cryptoOrder.status)}
                    {/* {cryptoOrder.status} */}
                  </TableCell>
                  <TableCell>
                    <Container>
                    <Tooltip title="Approve Video" arrow>
                      <Button
                        sx={{ margin: 1 }}
                        size='small'
                        color='success'
                        variant="contained"
                      >Approve
                      </Button>
                    </Tooltip>
                    <Tooltip title="Reject Video" arrow>
                      <Button
                        sx={{ margin: 1 }}
                        size='small'
                        color='error'
                        variant="contained"
                      >Reject</Button>
                    </Tooltip>
                    </Container>
                    
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={filteredCryptoOrders.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
};

RecentOrdersTable.propTypes = {
  cryptoOrders: PropTypes.array.isRequired
};

RecentOrdersTable.defaultProps = {
  cryptoOrders: []
};

export default RecentOrdersTable;
