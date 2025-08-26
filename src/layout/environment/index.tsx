import type { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';

const AppLayout = (): ReactElement => {
  return (
    <div className="app">
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;