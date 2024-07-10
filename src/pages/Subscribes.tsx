import AudienceInfo from '@/components/UI/AudienceInfo'
import Avatar from '@/components/UI/Avatar'
import NavBar from '@/components/UI/NavBar'
import { UserInterface } from '@/hooks/Interfaces'
import { RootState } from '@/store/store'
import React from 'react'
import { useSelector } from 'react-redux'

const Subscribes: React.FC = () => {
	const user: UserInterface | undefined = useSelector(
		(store: RootState) => store.user.user
	)

	return (
		<div className='text-white flex justify-center mt-[8vh]'>
			<div className='flex justify-center gap-[2%] w-[1800px]  h-full'>
				<NavBar />
				<div className='w-1/2'>
					<div className='flex flex-col gap-3'>
						{user!.subscribes.length > 0 ? (
							user?.subscribes.map(subscribeId => (
								<AudienceInfo key={subscribeId} AudienceId={subscribeId} />
							))
						) : (
							<>
								<h1>No subscribes</h1>
							</>
						)}
					</div>
				</div>
				<Avatar />
			</div>
		</div>
	)
}

export default Subscribes
