import { CommentInterface } from '@/hooks/Interfaces'
import { getPosts } from '@/store/slices/PostsSlice'
import { AppDispatch, RootState } from '@/store/store'
import axios from 'axios'
import { Pencil, Trash2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import avatar from '@/assets/Avatar.webp'
import { Link } from 'react-router-dom'
import Container from '@/components/UI/Container'

const PostComments: React.FC = () => {
	const dispatch: AppDispatch = useDispatch()
	const params = useParams()
	const postId = parseInt(params.postId!)
	const posts = useSelector((store: RootState) => store.posts.posts)
	const user = useSelector((store: RootState) => store.user.user)

	const [commentText, setCommentText] = useState('')

	const [comments, setComments] = useState<CommentInterface[] | undefined>()

	useEffect(() => {
		setComments(posts?.filter(post => post.id == postId)[0]?.comments)
	}, [posts, postId])

	useEffect(() => {
		dispatch(getPosts())
	}, [dispatch])

	async function sendComment() {
		const newComment = {
			id: Math.floor(Math.random() * (0 - 999999999999999)) + 999999999999999,
			text: commentText,
			parentId: user?.id,
		}

		await axios.patch(`https://033a62a164f4f491.mokky.dev/posts/${postId}`, {
			comments: [...comments!, newComment],
		})

		dispatch(getPosts())
		setCommentText('')
	}

	async function deleteComment(ID: number) {
		await axios
			.patch(`https://033a62a164f4f491.mokky.dev/posts/${postId}`, {
				comments: [...comments!].filter(comment => comment.id !== ID),
			})
			.then(() => {
				dispatch(getPosts())
			})
	}

	return (
		<Container>
			<div className='flex-1'>
				<textarea
					value={commentText}
					onChange={e => setCommentText(e.target.value)}
					placeholder='Оставьте коментарий'
					className='w-full h-[100px] bg-[#282828] rounded-xl p-2 text-[15px] resize-none focus-visible:outline-none'
				></textarea>

				<button
					onClick={() => sendComment()}
					className='flex items-center mt-3 gap-2 py-2 px-3 bg-[#23c565] rounded-xl text-black '
				>
					Добавить коментарий <Pencil width='17px' height='17px' />
				</button>

				<div className='mt-10'>
					{comments ? (
						comments.map((comment: CommentInterface) => (
							<div
								key={comment.id}
								className='w-full bg-[#18181b] rounded-xl p-[12px] mb-4'
							>
								<div className='flex justify-between'>
									<Link
										to={
											user?.id !== comment.parentId
												? `/userInfo/${comment.parentId}`
												: '/userInfo'
										}
										className='flex items-center gap-2 hover:text-white'
									>
										<div className='overflow-hidden w-[50px] h-[50px] rounded-full'>
											<img src={avatar} alt='#' />
										</div>
										<div>
											<h5 className='text-[14px] font-bold'>{user?.name}</h5>
											<h6 className='opacity-50 text-[12px] mt-[4px]'>
												12.31.2024
											</h6>
										</div>
									</Link>

									{comment.parentId == user?.id && (
										<button
											onClick={() => deleteComment(comment.id!)}
											className='h-[16px]'
										>
											<Trash2 width='16px' />
										</button>
									)}
								</div>
								<div className='p-2 mt-2'>{comment.text}</div>
							</div>
						))
					) : (
						<h1>No posts</h1>
					)}
				</div>
			</div>
		</Container>
	)
}

export default PostComments
