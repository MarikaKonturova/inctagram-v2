import { getLayoutWithSidebar } from 'layouts'
import React from 'react'
import { FavoritesPage } from 'templates/favorites'

export default function Favorites() {
  return <FavoritesPage />
}

Favorites.getLayout = getLayoutWithSidebar
