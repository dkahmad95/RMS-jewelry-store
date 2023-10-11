import { Outlet } from 'react-router-dom'
import './layout.css'
import Topbar from '../../components/Topbar/Topbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import { useSelector } from 'react-redux'

const Layout = () => {

  return (
   < div className='layout'>
        <Topbar />
        <div className="container">
          {/* {!isMobile && */}
          <Sidebar />
            {/* }  */}
          
          <Outlet />
        </div>
      </div>
  )
}

export default Layout