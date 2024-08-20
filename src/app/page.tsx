'use client'

import Dashboard from "@/components/pages/Dashboard/Dashboard";

const Home = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  
  return (
    <>
      <Dashboard />
      <h3>API: {API_URL}</h3>
    </>
  );
};

export default Home;
