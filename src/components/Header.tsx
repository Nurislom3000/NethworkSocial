import axios from 'axios'
import { LogIn } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { PostInterface, UserInterface } from '@/hooks/Interfaces'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

const Header: React.FC = () => {
	const localUser = JSON.parse(localStorage.getItem('user')!)
	const [users, setUsers] = useState<UserInterface[]>([])
	const user: UserInterface | undefined = localUser
		? users.find(user => user.email == localUser.email)
		: undefined

	const posts = useSelector((store: RootState) => store.posts.posts)?.filter(
		post => post.parentId === user?.id
	)

	useEffect(() => {
		async function getUsers() {
			try {
				await axios
					.get('https://033a62a164f4f491.mokky.dev/users')
					.then(response => {
						setUsers(response.data)
					})
			} catch (error) {
				console.error(`Get user error: ${error}`)
			}
		}

		getUsers()
	}, [])

	async function deletePost(postId: number) {
		await axios.delete(`https://033a62a164f4f491.mokky.dev/posts/${postId}`)
	}

	async function logOut() {
		if (user) {
			try {
				posts?.map((post: PostInterface) => {
					deletePost(post.id!)
				})

				await axios
					.delete(`https://033a62a164f4f491.mokky.dev/users/${user.id}`)
					.then(() => {
						localStorage.removeItem('user')
						location.reload()
					})
			} catch (error) {
				console.error(`logout error: ${error}`)
			}
		} else {
			alert("Don't have user")
		}
	}

	return (
		<header className='py-2 w-full max-w-[1000px] self-center flex justify-between items-center px-3'>
			<h4 className='font-bold'>Network Social</h4>

			<button
				onClick={() => logOut()}
				className='flex items-center justify-between gap-1 pr-3 pl-1 py-2 rounded-lg bg-[#1a1a1a]'
			>
				<LogIn height={'17px'} />
				Выйти
			</button>
		</header>
	)
}

export default Header
