import { UserInterface } from '@/hooks/Interfaces'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AvatarIMG from '@/assets/Avatar.webp'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store'
import { getUser } from '@/store/slices/UserSlice'

const Avatar: React.FC = () => {
	const dispatch: AppDispatch = useDispatch()
	const navigate = useNavigate()
	const avatar = JSON.parse(localStorage.getItem('avatar')!)

	const user: UserInterface | undefined = useSelector(
		(store: RootState) => store.user.user
	)

	useEffect(() => {
		localStorage.setItem('avatar', JSON.stringify(AvatarIMG))
		dispatch(getUser())
	}, [dispatch])

	return (
		<div
			onClick={() => navigate('/userInfo')}
			className='bg-[#171717] ml-[5%] min-w-[220px] max-h-[450px] w-[18%] rounded-xl p-3 hover:cursor-pointer'
		>
			<div className='w-full h-[350px] rounded-lg overflow-hidden flex justify-center items-center'>
				<img className='rounded-xl' src={avatar} alt='img' />
			</div>
			<h3 className='mt-2'>{user?.name}</h3>
			<h4 className='mt-3 opacity-50'>{user?.email}</h4>
		</div>
	)
}

export default Avatar
