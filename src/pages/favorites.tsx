import React from 'react'

import Favorites from '../features/favorites/ui'
import { getLayoutWithSidebar } from '../layouts/Layout/LayoutWithSidebar/LayoutWithSidebar'

export default function FavoritesPage() {
  return <Favorites />
}

FavoritesPage.getLayout = getLayoutWithSidebar
