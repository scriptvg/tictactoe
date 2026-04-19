import { BrowserRouter, Routes, Route } from "react-router-dom"

import { MainLayout } from "@/components/layout/main-layout"
import { LocalPlayPage } from "@/pages/local-play-page"
import { MultiplayerPage } from "@/pages/multiplayer-page"
import { SettingsPage } from "@/pages/settings-page"
import { StartMenuPage } from "@/pages/start-menu-page"

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<StartMenuPage />} />
          <Route path="play/local" element={<LocalPlayPage />} />
          <Route path="multiplayer" element={<MultiplayerPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="*" element={<div>404</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
