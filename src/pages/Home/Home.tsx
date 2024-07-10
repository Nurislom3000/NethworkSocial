import { addPost, getPosts } from '@/store/slices/PostsSlice'
import { AppDispatch, RootState } from '@/store/store'
import { Pencil } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Post from './components/Post'
import axios from 'axios'
import { PostInterface, UserInterface } from '@/hooks/Interfaces'

import NavBar from '@/components/UI/NavBar'

import { getUser } from '@/store/slices/UserSlice'
import Avatar from '@/components/UI/Avatar'

const Home: React.FC = () => {
	const dispatch: AppDispatch = useDispatch()

	const posts = useSelector((store: RootState) => store.posts.posts)
	const [postText, setPostText] = useState('')
	const user: UserInterface | undefined = useSelector(
		(store: RootState) => store.user.user
	)

	useEffect(() => {
		dispatch(getUser())
		dispatch(getPosts())
	}, [dispatch])

	const sendPost = async () => {
		try {
			if (postText.trim() !== '') {
				if (!user) {
					throw new Error('User not found')
				}

				const newPost = {
					id:
						Math.floor(Math.random() * (0 - 999999999999999)) + 999999999999999,
					parentID: user.id,
					text: postText,
					extraId:
						Math.floor(Math.random() * (0 - 999999999999999)) + 999999999999999,
					likes: 0,
				}

				await axios
					.post('https://033a62a164f4f491.mokky.dev/posts', {
						parentId: user.id,
						text: postText,
						extraId: newPost.extraId,
						likes: newPost.likes,
					})
					.then(() => {
						setPostText('')
						dispatch(addPost(newPost))
						dispatch(getPosts())
					})

				console.log([...user.posts, newPost])

				await axios.patch(
					`https://033a62a164f4f491.mokky.dev/users/${user.id}`,
					{ posts: [...user.posts, newPost] }
				)
				console.log([...user.posts])
			} else {
				alert('Напиши текст')
			}
		} catch (error) {
			console.error('Error:', error)
			alert("Can't create post")
		}
	}

	return (
		<div className='text-white flex justify-center mt-[8vh]'>
			<div className='flex justify-center gap-[2%] w-[1800px] px-3  h-full max-[1200px]:justify-around'>
				<NavBar />
				<div className='flex w-2/3'>
					<div className='w-3/4'>
						<textarea
							value={postText}
							onChange={e => setPostText(e.target.value)}
							placeholder='О чём думаете'
							className='w-full h-[100px] bg-[#282828] rounded-xl p-2 text-[15px] resize-none focus-visible:outline-none'
						></textarea>

						<button
							onClick={sendPost}
							className='flex items-center mt-3 gap-2 py-2 px-3 bg-[#23c565] rounded-xl text-black '
						>
							Добавить пост <Pencil width='17px' height='17px' />
						</button>

						<div className='mt-10'>
							{posts ? (
								posts.map((post: PostInterface) => (
									<Post key={post.id} post={post} />
								))
							) : (
								<h1>No posts</h1>
							)}
						</div>
					</div>
					<Avatar />
				</div>
			</div>
		</div>
	)
}

export default Home
