import { UserInterface } from '@/hooks/Interfaces'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store'
import ava from '@/assets/Avatar.webp'

const Avatar: React.FC = () => {
	const dispatch: AppDispatch = useDispatch()
	const navigate = useNavigate()
	const [avatar, setAvatar] = useState<string | null>(ava)

	const user: UserInterface | undefined = useSelector(
		(store: RootState) => store.user.user
	)

	useEffect(() => {
		const storedAvatar = localStorage.getItem('avatar')
		if (storedAvatar) {
			setAvatar(storedAvatar)
		}
	}, [dispatch])

	return (
		<div
			onClick={() => navigate('/userInfo')}
			className='bg-[#171717] ml-[5%] min-w-[220px] max-h-[450px] w-[18%] rounded-xl p-3 hover:cursor-pointer'
		>
			<div className='w-full h-[350px] rounded-lg overflow-hidden flex justify-center items-center'>
				<img className='rounded-xl' src={avatar!} alt='img' />
			</div>
			<h3 className='mt-2'>{user?.name}</h3>
			<h4 className='mt-3 opacity-50'>{user?.email}</h4>
		</div>
	)
}

export default Avatar
