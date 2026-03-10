import userStore from '../store/userStore';

const Navbar = () => {

    const {user, logout} = userStore();

  return (
    <div className='navbar'>
        <h3>Welcome {user?.username}</h3>
        <div className='main'>
            {
                user ? <button onClick={logout} className='btn'>logout</button> : null
            }
        </div>
    </div>
  )
}

export default Navbar