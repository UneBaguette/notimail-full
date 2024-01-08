import React, { useEffect } from 'react';

const Layout = ({ children }) => {
  useEffect(() => {
    document.title = "Notimail";
  }, []);

  return (
    <div>
      <header>
        <h1>Notimail</h1>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
