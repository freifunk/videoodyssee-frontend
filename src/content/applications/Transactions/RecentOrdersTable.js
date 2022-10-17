import { useState, useEffect } from 'react';
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
  Button,
  Snackbar,
  Alert
} from '@mui/material';

import Label from 'src/components/Label';
import BulkActions from './BulkActions';

const languages = {
  'eng': 'English',
  'deu': 'German',
  'rus': 'Russian',
  'fra': 'French',
  'spa': 'Spanish',
  'jpn': 'Japaneese',
  'hin': 'Hindi',

}

const getStatusLabel = (cryptoOrderStatus) => {
  const map = {
    rejected: {
      text: 'Rejected',
      color: 'error'
    },
    approved: {
      text: 'Approved',
      color: 'success'
    },
    pending: {
      text: 'Pending',
      color: 'warning'
    }
  };

  const { text, color } = map[cryptoOrderStatus];


  return <Label color={color}>{text}</Label>;
};

const applyFilters = (videos, filters) => {
  return videos.filter((video) => {
    let matches = true;

    if (filters.status && video.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (videos, page, limit) => {
  return videos.slice(page * limit, page * limit + limit);
};

const RecentOrdersTable = () => {
  const [selectedCryptoOrders] = useState([]);
  const selectedBulkActions = selectedCryptoOrders.length > 0;
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [filters, setFilters] = useState({
    status: null
  });

  const [err, setErr] = useState({ err: false, message: '' });
  const [success, setSuccess] = useState({ success: false, message: '' });
  const [videos, setVideos] = useState([]);

  const statusOptions = [
    {
      id: 'all',
      name: 'All'
    },
    {
      id: 'approved',
      name: 'Approved'
    },
    {
      id: 'pending',
      name: 'Pending'
    },
    {
      id: 'rejected',
      name: 'Rejected'
    }
  ];

  const handleApprove = async (event) => {
    console.log(event.currentTarget.id);
    event.preventDefault();
    try {
      let res = await fetch(`${process.env.REACT_APP_API_URL}/video/approve`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
          id: event.currentTarget.id
        }),
      });
      let resJson = await res.json();
      console.log(resJson);
      if (res.status === 202) {

        setSuccess({ success: true, message: resJson.data })
      } else {
        setErr({ err: "true", message: resJson.message });
        console.log(err, "got error");
      }
    } catch (err) {
      console.log(err);
    }
  }


  const handleReject = async (event) => {
    console.log(event.currentTarget.id);
    event.preventDefault();
    try {
      let res = await fetch(`${process.env.REACT_APP_API_URL}/video/reject`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
          id: event.currentTarget.id
        }),
      });
      let resJson = await res.json();
      console.log(resJson);
      if (res.status === 200) {

        setSuccess({ success: true, message: resJson.data })
        console.log(err, success);
      } else {
        setErr({ err: "true", message: resJson.message });
        console.log(err, "got error");
      }
    } catch (err) {
      console.log(err);
    }
  }


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



  const filteredCryptoOrders = applyFilters(videos, filters);
  const paginatedCryptoOrders = applyPagination(
    filteredCryptoOrders,
    page,
    limit
  );

  useEffect(() => {
    const getVideos = async () => {
      try {
        let res = await fetch(`${process.env.REACT_APP_API_URL}/video/list`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          method: "POST",
          body: JSON.stringify({}),
        })
        let resJson = await res.json();
        setVideos(resJson.data)
      }
      catch (err) {
        console.log(err);
      }
    }
    getVideos();

  }, [success])

  return (


    <Card>

      <Snackbar
        open={success.success}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={6000}
        onClose={() => setSuccess({ success: false })}
      >
        <Alert onClose={() => setSuccess({ success: false })} severity="success" sx={{ width: '100%' }}>
          {success.message}
        </Alert>
      </Snackbar>

      <Snackbar
        open={err.err}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={6000}
        onClose={() => setErr({ err: false })}
      >
        <Alert onClose={() => setErr({ err: false })} severity="error" sx={{ width: '100%' }}>
          {err.message}
        </Alert>
      </Snackbar>
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
              <TableCell >Actions</TableCell>
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
                      {languages[cryptoOrder.language]}
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
                  </TableCell>

                  <TableCell>
                    {cryptoOrder.status === "pending" ?
                      <>
                        <Typography>
                          <Tooltip title="Approve Video" arrow>
                            <Button
                              onClick={handleApprove}
                              id={cryptoOrder.id}
                              sx={{ margin: 1 }}
                              size='small'
                              color='success'
                              variant="contained"

                            >Approve
                            </Button>
                          </Tooltip>
                        </Typography>
                        <Typography>
                          <Tooltip title="Reject Video" arrow>
                            <Button
                              onClick={handleReject}
                              id={cryptoOrder.id}
                              sx={{ margin: 1  }}
                              size='small'
                              color='error'
                              variant="contained"
                            >Reject </Button>
                          </Tooltip>
                        </Typography>
                      </>

                      : '---'
                    }

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
  videos: PropTypes.array.isRequired
};

RecentOrdersTable.defaultProps = {
  videos: []
};

export default RecentOrdersTable;
