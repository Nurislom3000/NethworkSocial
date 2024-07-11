import { Route, Routes } from 'react-router-dom'
import Login from '@/pages/Login'
import Home from '@/pages/Home/Home'
import UserInfo from '@/pages//UserInfo/UserInfo'
import BlogerInfo from '@/pages/BlogerInfo'
import { Subscribers, Subscribes } from '@/pages/Subs'

import PostComments from '@/pages/PostComments'

const Router = () => {
	const hasUser = localStorage.getItem('user')

	return (
		<Routes>
			<Route index element={!hasUser ? <Login /> : <Home />} />
			<Route path='/userInfo' element={<UserInfo />} />
			<Route path='/userInfo/:authorId' element={<BlogerInfo />} />
			<Route path='/subscribers' element={<Subscribers />} />
			<Route path='/subscribes' element={<Subscribes />} />
			<Route path='/:postId' element={<PostComments />} />
		</Routes>
	)
}

export default Router
