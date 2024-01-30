import React from 'react'

import { getLayoutWithSidebar } from '../layouts/LayoutWithSidebar/LayoutWithSidebar'
import { PublicationCards } from '../templates/home/ui/PublicationCards/PublicationCards'

const Home = () => {
  return <PublicationCards />
}

Home.getLayout = getLayoutWithSidebar

export default Home
