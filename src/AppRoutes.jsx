// AppRoutes.jsx
import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const ComingSoon = lazy(() => import('./ComingSoon'));

function AppRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/coming-soon" element={<ComingSoon />} />
        {/* Other routes */}
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
// AppRoutes.jsx
import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const ComingSoon = lazy(() => import('./ComingSoon'));

function AppRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/coming-soon" element={<ComingSoon />} />
        {/* Other routes */}
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
