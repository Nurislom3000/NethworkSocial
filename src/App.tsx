import React from 'react'
import Header from '@/components/Header'
import Main from '@/components/Main'

const App: React.FC = () => {
	return (
		<div className='flex flex-col min-h-screen bg-black text-white'>
			<Header />
			<Main />
		</div>
	)
}

export default App
