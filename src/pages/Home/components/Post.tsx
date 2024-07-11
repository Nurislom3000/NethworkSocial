import React, { useEffect, useState } from 'react'
import { PostInterface, UserInterface } from '@/hooks/Interfaces'
import { Heart, MessageCircle, Trash2 } from 'lucide-react'
import heart from '@/assets/heart.svg'
import axios from 'axios'
import { getPosts, removePost } from '@/store/slices/PostsSlice'
import { AppDispatch } from '@/store/store'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { Link, useNavigate } from 'react-router-dom'
import { getUser } from '@/store/slices/UserSlice'

interface PostProps {
	post: PostInterface
}

const Post: React.FC<PostProps> = ({ post }) => {
	const dispatch: AppDispatch = useDispatch()
	const navigate = useNavigate()

	const globalUser = useSelector((store: RootState) => store.user.user)
	const [user, setUser] = useState<UserInterface | undefined>(globalUser)
	const [love, setLove] = useState(false)
	const avatar = JSON.parse(localStorage.getItem('avatar')!)
	const likes = post.likes

	useEffect(() => {
		dispatch(getUser())
	}, [dispatch])

	useEffect(() => {
		setUser(globalUser)
	}, [globalUser])

	const deletePost = async () => {
		setLove(false)
		try {
			await axios.patch(
				`https://033a62a164f4f491.mokky.dev/users/${user?.id}`,
				{ posts: [...user!.posts].filter(p => p.extraId !== post.extraId) }
			)

			await axios.delete(`https://033a62a164f4f491.mokky.dev/posts/${post.id}`)
			dispatch(removePost(post.id))
			await dispatch(getPosts())
		} catch (error) {
			console.error(error)
			alert('Не можем удалить пост')
		}
	}

	const [lPosts, setLPosts] = useState<number[]>([])

	async function toggleLike() {
		try {
			if (love) {
				await axios.patch(
					`https://033a62a164f4f491.mokky.dev/posts/${post.id}`,
					{ likes: likes - 1 }
				)
				const updatedLikedPosts = lPosts.filter(postId => postId !== post.id)
				await axios.patch(
					`https://033a62a164f4f491.mokky.dev/users/${user?.id}`,
					{ likedPosts: updatedLikedPosts }
				)
				setLPosts(updatedLikedPosts)
				await dispatch(getPosts())
			} else {
				await axios.patch(
					`https://033a62a164f4f491.mokky.dev/posts/${post.id}`,
					{ likes: likes + 1 }
				)
				const updatedLikedPosts = [...lPosts, post.id!]
				await axios.patch(
					`https://033a62a164f4f491.mokky.dev/users/${user?.id}`,
					{ likedPosts: updatedLikedPosts }
				)
				setLPosts(updatedLikedPosts)
				await dispatch(getPosts())
			}
			setLove(!love)
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		if (Array.isArray(user?.likedPosts)) {
			const filteredLikedPosts = user.likedPosts.filter(
				(postId): postId is number => postId !== undefined
			)
			setLPosts(filteredLikedPosts)
		}
	}, [user])

	useEffect(() => {
		if (Array.isArray(user?.likedPosts) && user.likedPosts.includes(post.id!)) {
			setLove(true)
		}
	}, [user, post.id])

	return (
		<div className='w-full bg-[#18181b] rounded-xl p-[12px] mb-4'>
			<div className='flex justify-between'>
				<Link
					to={
						user?.id !== post.parentId
							? `/userInfo/${post.parentId}`
							: '/userInfo'
					}
					className='flex items-center gap-2 hover:text-white'
				>
					<div className='overflow-hidden w-[50px] h-[50px] rounded-full'>
						<img src={avatar} alt='#' />
					</div>
					<div>
						<h5 className='text-[14px] font-bold'>{user?.name}</h5>
						<h6 className='opacity-50 text-[12px] mt-[4px]'>12.31.2024</h6>
					</div>
				</Link>

				{post.parentId == user?.id && (
					<button onClick={deletePost} className='h-[16px]'>
						<Trash2 width='16px' />
					</button>
				)}
			</div>

			<p className='mt-3 break-all'>{post.text}</p>
			<br />
			<div className='flex gap-3 opacity-50'>
				<button className='flex items-center gap-1' onClick={toggleLike}>
					{love ? (
						<>
							{post.likes > 1 ? (
								<span className='text-[13px]'>{post.likes}</span>
							) : null}
							<img src={heart} alt='#' className='w-[15px]' />
						</>
					) : (
						<div className='flex items-start gap-1'>
							{post.likes > 1 ? (
								<span className='text-[15px]'>{post.likes}</span>
							) : null}
							<Heart width='15px' className='duration-100 hover:w-[17px]' />
						</div>
					)}
				</button>
				<button
					className='flex gap-1 text-[15px]'
					onClick={() => navigate(`/${post.id}`)}
				>
					<span>{post.comments.length}</span>
					<MessageCircle width='15px' className='duration-100 hover:w-[17px]' />
				</button>
			</div>
		</div>
	)
}

export default Post
