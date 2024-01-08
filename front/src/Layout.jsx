import React from 'react';

const Layout = ({ children }) => {
  return (
    <>
      <header>
        <h1>NotiMail</h1>
      </header>
      <main>{children}</main>
    </>
  );
};

export default Layout;
