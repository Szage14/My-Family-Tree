export type Gender = 'male' | 'female' | 'other'

export interface FamilyMember {
  id: string
  name: string
  gender?: Gender
  birthDate?: string
  deathDate?: string
  photoUrl?: string
  parents?: string[]
  children?: string[]
  spouse?: string
}
