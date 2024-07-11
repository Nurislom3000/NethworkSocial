import AudienceInfo from '@/components/UI/AudienceInfo'
import { UserInterface } from '@/hooks/Interfaces'
import { RootState } from '@/store/store'
import Container from '@/components/UI/Container'
import React from 'react'
import { useSelector } from 'react-redux'

interface SubInterface {
	userSubs: Array<number>
}

const Subs: React.FC<SubInterface> = ({ userSubs }) => {
	return (
		<div className='flex flex-col gap-3'>
			<>
				{userSubs.length > 0 ? (
					userSubs.map(subscribeId => (
						<AudienceInfo key={subscribeId} AudienceId={subscribeId} />
					))
				) : (
					<>
						<h1>No subscribes</h1>
					</>
				)}
			</>
		</div>
	)
}

const Subscribers: React.FC = () => {
	const user: UserInterface | undefined = useSelector(
		(store: RootState) => store.user.user
	)
	return (
		<Container>{user ? <Subs userSubs={user!.subscribers} /> : null}</Container>
	)
}
export { Subscribers }

const Subscribes: React.FC = () => {
	const user: UserInterface | undefined = useSelector(
		(store: RootState) => store.user.user
	)
	return (
		<Container>{user ? <Subs userSubs={user!.subscribes} /> : null}</Container>
	)
}
export { Subscribes }
