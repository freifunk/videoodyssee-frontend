import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import Footer from 'src/components/Footer';



function ManagementUserProfile() {
  return (
    <>
      <Helmet>
        <title>Profile Management - Applications</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Footer />
    </>
  );
}

export default ManagementUserProfile;
