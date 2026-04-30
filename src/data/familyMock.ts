import { FamilyMember } from '@/types/family'

export const familyMock: FamilyMember[] = [
  {
    id: 'grandfather-1',
    name: 'John Smith',
    gender: 'male',
    birthDate: '1940-05-15',
    deathDate: '2015-03-20',
    children: ['father-1'],
  },
  {
    id: 'father-1',
    name: 'Robert Smith',
    gender: 'male',
    birthDate: '1965-08-22',
    parents: ['grandfather-1'],
    children: ['you-1'],
    spouse: 'mother-1',
  },
  {
    id: 'you-1',
    name: 'You',
    gender: 'male',
    birthDate: '1990-12-10',
    parents: ['father-1', 'mother-1'],
  },
  {
    id: 'mother-1',
    name: 'Jane Smith',
    gender: 'female',
    birthDate: '1967-03-18',
    children: ['you-1'],
    spouse: 'father-1',
  },
]
