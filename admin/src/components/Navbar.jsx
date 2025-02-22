import {assets} from "../assets/assets.js";

const Navbar = ({settoken}) => {
    return (
        <div className='flex items-center py-2 px-[4%] justify-between'>
            <img className='w-36' src={assets.logo} alt="logo" />
            <button onClick={()=>settoken('')} className='bg-black text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>Logout</button>
        </div>
    )
}

export default Navbar;