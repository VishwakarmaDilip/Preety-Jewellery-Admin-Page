import { useContext } from "react"
import * as Icon from "react-feather"
import { sharedContext } from "./Layout"

const Navbar = () => {
  const {sidebar, setSidebar} = useContext(sharedContext)
  const handleSidebar = () => {
    setSidebar(!sidebar)
  }
  return (
    <nav className='flex w-full justify-between p-5 bg-white shadow fixed top-0'>
        <Icon.Menu size={30} onClick={()=> handleSidebar()}/>
        <Icon.User size={30}/>
    </nav>
  )
}

export default Navbar