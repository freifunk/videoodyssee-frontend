import { Card } from '@mui/material';
import RecentOrdersTable from './RecentOrdersTable';
import { subDays } from 'date-fns';
import { useEffect, useState } from 'react';




function RecentOrders() {
  const [data, setData] = useState([]);
    
  useEffect(() => {
    const getData = async () => {
      try {
        let res = await fetch('http://localhost:8000/video/list', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          method: "POST",
          body: JSON.stringify({}),
        })
        let resJson = await res.json();
        setData(resJson.data)
      }
      catch (err) {
        console.log(err);
      }
    }
    getData();

  },[])

  return (
    <Card>
      <RecentOrdersTable cryptoOrders={data} />
    </Card>
  );
}

export default RecentOrders;
