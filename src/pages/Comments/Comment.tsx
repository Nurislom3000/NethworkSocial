import { CommentInterface, UserInterface } from '@/hooks/Interfaces'
import axios from 'axios'
import { Trash2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

interface Comment {
	comment: CommentInterface
	deleteComment: (ID: number) => void
	userId: number | undefined
}

const Comment: React.FC<Comment> = ({ comment, deleteComment, userId }) => {
	const [author, setAuthor] = useState<null | UserInterface | undefined>(null)

	useEffect(() => {
		async function getUsers() {
			const response = await axios('https://033a62a164f4f491.mokky.dev/users')
			const users = response.data
			const commentAuthor = users.filter(
				(user: UserInterface) => user.id == comment.parentId
			)[0]

			setAuthor(commentAuthor)
		}

		getUsers()
	}, [])

	return (
		<div
			key={comment.id}
			className='w-full bg-[#18181b] rounded-xl p-[12px] mb-4'
		>
			<div className='flex justify-between'>
				<Link
					to={
						userId !== comment.parentId
							? `/userInfo/${comment.parentId}`
							: '/userInfo'
					}
					className='flex items-center gap-2 hover:text-white'
				>
					<div className='overflow-hidden w-[50px] h-[50px] rounded-full'>
						<img src={author?.avatar} alt='#' />
					</div>
					<div>
						<h5 className='text-[14px] font-bold'>{author?.name}</h5>
						<h6 className='opacity-50 text-[12px] mt-[4px]'>12.31.2024</h6>
					</div>
				</Link>

				{comment.parentId == userId && (
					<button
						onClick={() => deleteComment(comment.id!)}
						className='h-[16px]'
					>
						<Trash2 width='16px' />
					</button>
				)}
			</div>
			<div className='p-2 mt-2 break-all'>{comment.text}</div>
		</div>
	)
}

export default Comment
