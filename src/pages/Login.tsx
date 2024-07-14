import React, { useEffect, useState } from 'react'
import { UserInterface } from '@/hooks/Interfaces'
import axios from 'axios'

const Login: React.FC = () => {
	const [serverUsers, setServerUsers] = useState<UserInterface[]>([])
	const [login, setLogin] = useState(false)

	useEffect(() => {
		async function getUsers() {
			try {
				axios.get('https://033a62a164f4f491.mokky.dev/users').then(response => {
					setServerUsers(response.data)
				})
			} catch (error) {
				console.error(error)
			}
		}

		getUsers()
	}, [])

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const user: UserInterface = {
		name: name,
		email: email,
		pass: password,
		subscribes: [],
		subscribers: [],
		posts: [],
		likedPosts: [],
	}

	console.log(serverUsers.find(i => i.email === email))

	const createUser = async () => {
		try {
			if (
				name.trim().length < 3 ||
				email.trim() === '' ||
				password.trim().length < 3
			) {
				alert('Введите все и минимум 3 символа на каждае поле')
			} else if (serverUsers.find(i => i.email === email)) {
				alert('Такой пользователь уже есть')
			} else {
				await axios
					.post('https://033a62a164f4f491.mokky.dev/users', user)
					.then(() => {
						localStorage.setItem('user', JSON.stringify(user))
						location.reload()
					})
			}
		} catch (error) {
			alert('Error')
			console.error(error)
		}
	}

	function Login() {
		const I: UserInterface[] | undefined = serverUsers.filter(
			i => i.email === email
		)
		if (I![0].pass === password) {
			localStorage.setItem('user', JSON.stringify(user))
			location.reload()
		} else {
			alert('Не верный email или пароль')
		}
	}

	return (
		<div className='w-screen h-screen fixed left-0 top-0 flex justify-center items-center bg-black'>
			{!login ? (
				<button
					onClick={() => setLogin(!login)}
					className='fixed right-10 top-5 py-2 px-3 bg-[#7a7a7a] rounded-md'
				>
					Login
				</button>
			) : (
				<button
					onClick={() => setLogin(!login)}
					className='fixed right-10 top-5 py-2 px-3 bg-[#7a7a7a] rounded-md'
				>
					Registrate
				</button>
			)}

			<div className='flex flex-col w-[300px]'>
				{!login && (
					<div className='mb-3'>
						<label className='form-label'>Name</label>
						<input
							value={name}
							onChange={e => setName(e.target.value)}
							type='string'
							className='form-control'
						/>
					</div>
				)}

				<div className='mb-3'>
					<label className='form-label'>Login</label>
					<input
						value={email}
						onChange={e => setEmail(e.target.value)}
						type='email'
						className='form-control'
					/>
				</div>

				<div className='mb-3'>
					<label className='form-label'>Password</label>
					<input
						value={password}
						onChange={e => setPassword(e.target.value)}
						type='password'
						className='form-control'
					/>
				</div>
				<br />
				<button
					onClick={() => (!login ? createUser() : Login())}
					className='btn btn-primary'
				>
					Submit
				</button>
			</div>
		</div>
	)
}

export default Login
