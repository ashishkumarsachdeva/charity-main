import React from 'react'
import Footer from '../Footer/Footer'
import Navigation from '../Navigation/Navigation'

const Layout = ({
  title = "Donation",
  description = "Donating home",
  src = "",
  children,
  className,
}) => {
 
  return (
    <>
    <Navigation/>
    <div className={className}>{children}</div>
    <Footer/>
    </>
  )
}

export default Layout