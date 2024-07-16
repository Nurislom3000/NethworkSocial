import NavBar from '@/components/UI/NavBar'
import React, { useEffect, useState } from 'react'
import { UserRoundMinus, UserRoundPlus } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { UserInterface } from '@/hooks/Interfaces'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store'
import { getUser } from '@/store/slices/UserSlice'

const BlogerInfo: React.FC = () => {
	const params = useParams()
	const dispatch: AppDispatch = useDispatch()
	const user = useSelector((store: RootState) => store.user.user)
	const authorId = parseInt(params.authorId!)
	const [author, setAuthor] = useState<UserInterface | null>(null)

	async function subscribe() {
		try {
			await axios.patch(
				`https://033a62a164f4f491.mokky.dev/users/${user?.id}`,
				{ subscribes: [...user!.subscribes, authorId] }
			)
			await axios.patch(
				`https://033a62a164f4f491.mokky.dev/users/${authorId}`,
				{ subscribers: [...author!.subscribers!, user?.id] }
			)
			setButtonSub(!buttonSub)
			dispatch(getUser())
		} catch (error) {
			console.error(error)
			alert('Can not subscribe')
		}
	}

	async function unsubscribe() {
		try {
			await axios.patch(
				`https://033a62a164f4f491.mokky.dev/users/${user?.id}`,
				{ subscribes: [...user!.subscribes].filter(id => id !== authorId) }
			)
			await axios.patch(
				`https://033a62a164f4f491.mokky.dev/users/${authorId}`,
				{ subscribers: [...author!.subscribers!].filter(id => id !== user?.id) }
			)
			setButtonSub(!buttonSub)
			dispatch(getUser())
		} catch (error) {
			console.error(error)
			alert('Can not subscribe')
		}
	}

	const subLength = user?.subscribes.filter(i => i === authorId).length
	const [buttonSub, setButtonSub] = useState(subLength! > 0)

	useEffect(() => {
		dispatch(getUser())
		async function getAuthor() {
			try {
				await axios
					.get(`https://033a62a164f4f491.mokky.dev/users/${authorId}`)
					.then(response => setAuthor(response.data))
			} catch (error) {
				console.error(error)
			}
		}
		getAuthor()
		setButtonSub(subLength! > 0)
	}, [authorId, dispatch, subLength])

	return (
		<>
			<div className='text-white flex justify-center mt-[8vh]'>
				<div className='flex justify-center gap-[2%] w-[1800px]  h-full'>
					<NavBar />

					<div className='w-[70%] rounded-xl flex gap-3'>
						<div className='bg-[#171717] max-h-[450px] w-[23%] min-w-[200px] rounded-xl p-3 flex flex-col gap-3 items-center'>
							<div className='w-full h-[250px] rounded-lg overflow-hidden flex justify-center items-center p-2 '>
								<img className='rounded-xl' src={author?.avatar} alt='img' />
							</div>
							<h2 className='font-bold text-[20px]'>{author?.name}</h2>
							{!buttonSub ? (
								<button
									onClick={() => subscribe()}
									className='flex gap-2 bg-[#0f2b48] py-2 px-3 rounded-xl'
								>
									Подписатся <UserRoundPlus width='15px' hanging='15px' />
								</button>
							) : (
								<button
									onClick={() => unsubscribe()}
									className='flex gap-2 bg-[#28282d] py-2 px-3 rounded-xl'
								>
									Отписатся <UserRoundMinus width='15px' hanging='15px' />
								</button>
							)}
						</div>
						<div className='flex flex-col gap-2 flex-1 bg-[#171717] rounded-xl p-3'>
							<div className='flex gap-2'>
								<span className='opacity-50'>Почта</span> {author?.email}
							</div>
							<div className='flex gap-2'>
								<span className='opacity-50'>Фамилия</span> {author?.surname}
							</div>
							<div className='flex gap-2'>
								<span className='opacity-50'>Возраст</span> {author?.age}
							</div>
							<div className='flex gap-2'>
								<span className='opacity-50'>Обо мне</span> {author?.about}
							</div>
							<div className='flex gap-5 mt-5 ml-6'>
								<div className='flex flex-col items-center'>
									<h2 className='text-[30px]'>
										{author ? author.subscribers.length : 0}
									</h2>
									Подписчики
								</div>
								<div className='flex flex-col items-center'>
									<h2 className='text-[30px]'>
										{author ? author.subscribes.length : 0}
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

export default BlogerInfo
