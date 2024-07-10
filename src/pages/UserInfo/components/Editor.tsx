import { getUser } from '@/store/slices/UserSlice'
import { AppDispatch, RootState } from '@/store/store'
import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

interface EditorInterface {
	closeEditor: () => void
}

const Editor: React.FC<EditorInterface> = ({ closeEditor }) => {
	const dispatch: AppDispatch = useDispatch()

	const user = useSelector((store: RootState) => store.user.user)

	const [surname, setSurname] = useState('')
	const [age, setAge] = useState('')
	const [about, setAbout] = useState('')

	const addNewInfo = () => {
		if (surname.trim() !== '' && age.trim() !== '' && about.trim() !== '') {
			try {
				axios
					.patch(`https://033a62a164f4f491.mokky.dev/users/${user?.id}`, {
						surname: surname,
						age: age,
						about: about,
					})
					.then(() => {
						dispatch(getUser())
						closeEditor()
					})
			} catch (error) {
				console.error(error)
				alert('Cant update info')
			}
		} else {
			alert('Cant update info')
		}
	}

	return (
		<div
			onClick={() => closeEditor()}
			className='fixed left-0 top-0 flex justify-center items-center w-screen h-screen bg-black bg-opacity-60'
		>
			<div
				onClick={e => e.stopPropagation()}
				className='w-[30%] h-[80vh] bg-white rounded-xl p-3 flex flex-col gap-3'
			>
				<input
					value={surname}
					onChange={e => setSurname(e.target.value)}
					className='form-control'
					placeholder='Surname'
				/>
				<input
					value={age}
					onChange={e => setAge(e.target.value)}
					type='number'
					className='form-control'
					placeholder='Age'
				/>
				<textarea
					value={about}
					onChange={e => setAbout(e.target.value)}
					className='form-control flex-1'
					placeholder='About me'
				/>
				<button
					onClick={() => addNewInfo()}
					type='button'
					className='btn btn-success'
				>
					Change
				</button>
			</div>
		</div>
	)
}

export default Editor
