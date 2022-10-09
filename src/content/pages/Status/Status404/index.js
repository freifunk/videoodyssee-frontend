import {
  Box,
  Typography,
  Container,
  Button,
  styled
} from '@mui/material';
import { Helmet } from 'react-helmet-async';

const MainContent = styled(Box)(
  () => `
    height: 100%;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
);


function Status404() {
  return (
    <>
      <Helmet>
        <title>Status - 404</title>
      </Helmet>
      <MainContent>
        <Container maxWidth="md">
          <Box textAlign="center">
            <img alt="404" height={370} src="/static/images/status/404.svg" />
            <Typography variant="h1" sx={{ my: 2 }}>
            Page not found
            </Typography>
            <Typography variant="body2" sx={{ my: 2,fontSize:'20px' }}>
            Oops! Looks like you followed a bad link. If you think this is a problem with us, please tell us.
            </Typography>
            <br/>
            <Button href="/" variant="outlined">
                Go to homepage
              </Button>
          </Box>
        </Container>
      </MainContent>
    </>
  );
}

export default Status404;
