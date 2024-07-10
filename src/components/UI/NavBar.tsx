import { Album, Users, UsersRound } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
	return (
		<div className='flex flex-col justify-start gap-[35px] pt-4 mr-4'>
			<NavLink
				to='/'
				className='flex items-start gap-2 text-[15px] hover:text-white'
			>
				<Album width='20px' height='20px' /> Посты
			</NavLink>
			<NavLink
				to='/subscribes'
				className='flex items-start gap-2 text-[15px] hover:text-white'
			>
				<Users width='20px' /> Подписки
			</NavLink>
			<NavLink
				to='/subscribers'
				className='flex items-center gap-2 text-[15px] hover:text-white'
			>
				<UsersRound width='20px' /> Подписчики
			</NavLink>
		</div>
	)
}

export default NavBar
