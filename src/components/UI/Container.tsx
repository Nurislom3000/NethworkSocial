import React, { ReactNode } from 'react'
import NavBar from './NavBar'
import Avatar from './Avatar'

interface ContainerInterface {
	children: ReactNode
}

const Container: React.FC<ContainerInterface> = ({ children }) => {
	return (
		<div className='text-white flex justify-center mt-[8vh]'>
			<div className='flex justify-center gap-[2%] w-[1800px]  h-full'>
				<NavBar />
				<div className='w-1/2'>{children}</div>
				<Avatar />
			</div>
		</div>
	)
}

export default Container
