import { UserInterface } from '@/hooks/Interfaces'
import { AppDispatch } from '@/store/store'
import axios from 'axios'
import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

interface AudienceInfoInterface {
	AudienceId: number
}

const AudienceInfo: React.FC<AudienceInfoInterface> = ({ AudienceId }) => {
	const dispatch: AppDispatch = useDispatch()
	const [audience, setAudience] = useState<UserInterface | null>(null)
	const avatar = localStorage.getItem('avatar')!

	useEffect(() => {
		async function getAudience() {
			await axios
				.get(`https://033a62a164f4f491.mokky.dev/users/${AudienceId}`)
				.then(response => {
					setAudience(response.data)
				})
		}

		getAudience()
	}, [dispatch, AudienceId])

	return (
		<>
			<Link
				to={`/userInfo/${AudienceId}`}
				className='w-full p-[12px] bg-[#18181b] rounded-xl hover:text-white'
			>
				<div className='flex justify-between'>
					<div className='flex items-center gap-2 '>
						<div className='overflow-hidden w-[50px] h-[50px] rounded-full'>
							<img src={avatar} alt='#' />
						</div>
						<div>
							<h5 className='text-[14px] font-bold'>{audience?.name}</h5>
							<h6 className='opacity-50 text-[12px] mt-[4px]'>12.31.2024</h6>
						</div>
					</div>
				</div>
			</Link>
		</>
	)
}

export default AudienceInfo
