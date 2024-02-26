import { getLayoutWithSidebar } from 'layouts'
import React from 'react'
import { PublicationCards } from 'templates/home'

const Home = () => {
  return <PublicationCards />
}

Home.getLayout = getLayoutWithSidebar

export default Home
