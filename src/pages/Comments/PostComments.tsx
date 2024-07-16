import { CommentInterface } from '@/hooks/Interfaces'
import { getPosts } from '@/store/slices/PostsSlice'
import { AppDispatch, RootState } from '@/store/store'
import axios from 'axios'
import { Pencil } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Container from '@/components/UI/Container'
import Comment from './Comment'

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
							<Comment
								key={comment.id}
								comment={comment}
								deleteComment={deleteComment}
								userId={user?.id}
							/>
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
