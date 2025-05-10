import * as Icon from "react-feather"

const Navbar = () => {
  return (
    <nav className='flex w-full justify-between p-5 bg-white shadow fixed'>
        <Icon.Menu size={30}/>
        <Icon.User size={30}/>
    </nav>
  )
}

export default Navbar