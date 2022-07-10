export interface CreateUserDto {
  id: number | null
  username: string
  email: string
  password: string
}

export const initialCreateUserDto: CreateUserDto = {
  id: null,
  username: "",
  email: "",
  password: ""
}
