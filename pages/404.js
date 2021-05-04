import Layout from "../src/components/layout";
// import Seo from '../src/components/seo'

const NotFoundPage = (props) => {
  return (
    <Layout>
      {/* <Seo title='404: Not found' /> */}
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  );
};

export default NotFoundPage;
