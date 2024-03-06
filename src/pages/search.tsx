import { getLayoutWithSidebar } from 'layouts'
import React from 'react'
import { SearchPage } from 'templates/search'
export default function Search() {
  return <SearchPage />
}

Search.getLayout = getLayoutWithSidebar
