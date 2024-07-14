import NavBar from '@/components/UI/NavBar'
import React, { useEffect, useState } from 'react'
import { Pencil } from 'lucide-react'
import { UserInterface } from '@/hooks/Interfaces'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store'
import { getUser } from '@/store/slices/UserSlice'
import Editor from './components/Editor'
import ava from '@/assets/Avatar.webp'

const UserInfo: React.FC = () => {
	const dispatch: AppDispatch = useDispatch()
	const user: UserInterface | undefined = useSelector(
		(store: RootState) => store.user.user
	)

	const [avatar, setAvatar] = useState<string | null>(
		localStorage.getItem('avatar') ? localStorage.getItem('avatar') : ava
	)

	const [showEditor, setShowEditor] = useState(false)

	const changeAvatar = (URL: string | null) => {
		setAvatar(URL)
		if (URL) {
			localStorage.setItem('avatar', URL)
		}
	}

	useEffect(() => {
		dispatch(getUser())
	}, [dispatch])

	return (
		<>
			{showEditor && (
				<Editor
					changePreview={changeAvatar}
					closeEditor={() => setShowEditor(false)}
				/>
			)}

			<div className='text-white flex justify-center mt-[8vh]'>
				<div className='flex justify-center gap-[2%] w-[1800px] h-full'>
					<NavBar />

					<div className='w-[70%] rounded-xl flex gap-3'>
						<div className='bg-[#171717] max-h-[450px] w-[23%] min-w-[200px] rounded-xl p-3 flex flex-col gap-3 items-center'>
							<div className='w-full h-[250px] rounded-lg overflow-hidden flex justify-center items-center p-2'>
								<img
									className='rounded-xl'
									src={avatar || '/default-avatar.png'}
									alt='Avatar'
								/>
							</div>
							<h2 className='font-bold text-[20px]'>{user?.name}</h2>
							<button
								onClick={() => setShowEditor(!showEditor)}
								className='flex gap-2 bg-[#28272c] p-2 rounded-xl'
							>
								Редактировать <Pencil width='15px' height='15px' />
							</button>
						</div>
						<div className='flex flex-col gap-2 flex-1 bg-[#171717] rounded-xl p-3'>
							<div className='flex gap-2'>
								<span className='opacity-50'>Почта</span> {user?.email}
							</div>
							<div className='flex gap-2'>
								<span className='opacity-50'>Фамилия</span> {user?.surname}
							</div>
							<div className='flex gap-2'>
								<span className='opacity-50'>Возраст</span> {user?.age}
							</div>
							<div className='flex gap-2'>
								<span className='opacity-50'>Обо мне</span> {user?.about}
							</div>
							<div className='flex gap-5 mt-5 ml-6'>
								<div className='flex flex-col items-center'>
									<h2 className='text-[30px]'>
										{user ? user.subscribers.length : 0}
									</h2>
									Подписчики
								</div>
								<div className='flex flex-col items-center'>
									<h2 className='text-[30px]'>
										{user ? user.subscribes.length : 0}
									</h2>
									Подписки
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default UserInfo
