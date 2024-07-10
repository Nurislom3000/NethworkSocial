export interface PostInterface {
	id?: number
	extraId?: number
	parentId: number
	title: string
	text: string
	likes: number
	mainId: number
}

export interface UserInterface {
	id?: number
	name: string
	surname?: string
	age?: string
	about?: string
	email: string
	pass: string
	subscribes: Array<number>
	subscribers: Array<number>
	posts: Array<PostInterface>
	likedPosts: Array<number>
}
