import { BrowserRouter, Routes, Route } from "react-router-dom"

import { MainLayout } from "@/components/layout/main-layout"
import { HomePage } from "@/pages/home-page"

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="*" element={<div>404</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
