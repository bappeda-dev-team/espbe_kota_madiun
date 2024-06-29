const API_URL = process.env.NEXT_PUBLIC_API_URL;
const Home = () => {
  return (
    <>
      <h1>ini halaman dashboard</h1>
      <h3>API: {API_URL}</h3>
    </>
  );
};

export default Home;
