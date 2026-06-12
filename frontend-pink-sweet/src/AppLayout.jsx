import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  return (
    <>
      <Header page="inicio" setPage={() => {}} cartCount={0} />
      <Outlet />
      <Footer setPage={() => {}} />
    </>
  );
};

export default Layout;
