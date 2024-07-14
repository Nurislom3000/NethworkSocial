import { getUser } from '@/store/slices/UserSlice'
import { AppDispatch, RootState } from '@/store/store'
import axios from 'axios'
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

interface EditorInterface {
	closeEditor: () => void
	changePreview: (avatarPreview: string | null) => void
}

const Editor: React.FC<EditorInterface> = ({ closeEditor, changePreview }) => {
	const dispatch: AppDispatch = useDispatch()
	const user = useSelector((store: RootState) => store.user.user)

	const avatarFile = useRef<HTMLInputElement | null>(null)
	const [surname, setSurname] = useState(user?.surname ? user.surname : '')
	const [age, setAge] = useState(user?.age ? user.age : '')
	const [about, setAbout] = useState(user?.about ? user.about : '')
	const [avatarPreview, setAvatarPreview] = useState<string | null>(null)

	const addNewInfo = async () => {
		if (surname.trim() !== '' && age.trim() !== '' && about.trim() !== '') {
			try {
				await axios.patch(
					`https://033a62a164f4f491.mokky.dev/users/${user?.id}`,
					{
						surname: surname,
						age: age,
						about: about,
					}
				)
				dispatch(getUser())
				changePreview(avatarPreview)
				closeEditor()
			} catch (error) {
				console.error(error)
				alert('Не удалось обновить информацию')
			}
		} else {
			alert('Не удалось обновить информацию')
		}
	}

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (file) {
			const reader = new FileReader()
			reader.onloadend = () => {
				const result = reader.result as string
				setAvatarPreview(result)
				localStorage.setItem('avatar', result) // Сохраняем как строку
			}
			reader.readAsDataURL(file)
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
					placeholder='Фамилия'
				/>
				<input
					value={age}
					onChange={e => setAge(e.target.value)}
					type='number'
					className='form-control'
					placeholder='Возраст'
				/>
				<textarea
					value={about}
					onChange={e => setAbout(e.target.value)}
					className='form-control flex-1'
					placeholder='Обо мне'
				/>
				<div className='flex items-center'>
					<label className='cursor-pointer bg-blue-500 text-white py-2 px-4 rounded'>
						<input
							type='file'
							ref={avatarFile}
							className='hidden'
							onChange={handleFileChange}
						/>
						Выберите файл
					</label>
				</div>
				{avatarPreview && (
					<img
						src={avatarPreview}
						alt='Avatar Preview'
						className='mt-4 w-24 h-24 object-cover rounded-full'
					/>
				)}
				<button
					onClick={() => addNewInfo()}
					type='button'
					className='btn btn-success'
				>
					Изменить
				</button>
			</div>
		</div>
	)
}

export default Editor
