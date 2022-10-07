import { Typography, Grid } from '@mui/material';


function PageHeader() {
  const user = {
    name: 'Andi Braeu',
    avatar: '/static/images/avatars/1.jpg'
  };
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Videos
        </Typography>
        <Typography variant="subtitle2">
          {user.name}, these are your recent videos
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
