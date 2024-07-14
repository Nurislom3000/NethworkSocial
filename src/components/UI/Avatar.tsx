import { UserInterface } from '@/hooks/Interfaces'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

const Avatar: React.FC = () => {
	const navigate = useNavigate()

	const user: UserInterface | undefined = useSelector(
		(store: RootState) => store.user.user
	)

	return (
		<div
			onClick={() => navigate('/userInfo')}
			className='bg-[#171717] ml-[5%] min-w-[220px] max-h-[450px] w-[18%] rounded-xl p-3 hover:cursor-pointer'
		>
			<div className='w-full h-[350px] rounded-lg overflow-hidden flex justify-center items-center'>
				<img className='rounded-xl' src={user?.avatar} alt='img' />
			</div>
			<h3 className='mt-2'>{user?.name}</h3>
			<h4 className='mt-3 opacity-50'>{user?.email}</h4>
		</div>
	)
}

export default Avatar
