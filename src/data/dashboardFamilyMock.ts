export type DashboardMember = {
  id: string
  name: string
  relationship: string
  birthYear: number
  deathYear?: number
  location: string
  occupation: string
  partnerName?: string
  children?: DashboardMember[]
}

export const dashboardFamilyRoot: DashboardMember = {
  id: 'mateo-rivera',
  name: 'Mateo Rivera',
  relationship: 'Family Patriarch',
  birthYear: 1944,
  location: 'San Aurelio',
  occupation: 'Retired Architect',
  partnerName: 'Elena Rivera',
  children: [
    {
      id: 'isabella-rivera',
      name: 'Isabella Rivera-Cruz',
      relationship: 'Daughter',
      birthYear: 1968,
      location: 'Port Azure',
      occupation: 'School Principal',
      partnerName: 'Daniel Cruz',
      children: [
        {
          id: 'sofia-cruz',
          name: 'Sofia Cruz',
          relationship: 'Granddaughter',
          birthYear: 1993,
          location: 'Port Azure',
          occupation: 'Product Designer',
          partnerName: 'Leo Watson',
          children: [
            {
              id: 'milo-watson',
              name: 'Milo Watson',
              relationship: 'Great-Grandson',
              birthYear: 2020,
              location: 'Port Azure',
              occupation: 'Student',
            },
          ],
        },
        {
          id: 'tomas-cruz',
          name: 'Tomas Cruz',
          relationship: 'Grandson',
          birthYear: 1996,
          location: 'North Haven',
          occupation: 'Civil Engineer',
        },
      ],
    },
    {
      id: 'adrian-rivera',
      name: 'Adrian Rivera',
      relationship: 'Son',
      birthYear: 1971,
      location: 'Lakeside City',
      occupation: 'Orthopedic Surgeon',
      partnerName: 'Nora Rivera',
      children: [
        {
          id: 'lucia-rivera',
          name: 'Lucia Rivera',
          relationship: 'Granddaughter',
          birthYear: 1998,
          location: 'Lakeside City',
          occupation: 'Research Scientist',
        },
        {
          id: 'enzo-rivera',
          name: 'Enzo Rivera',
          relationship: 'Grandson',
          birthYear: 2002,
          location: 'Lakeside City',
          occupation: 'Software Engineer',
          partnerName: 'Hana Kim',
          children: [
            {
              id: 'iris-rivera',
              name: 'Iris Rivera',
              relationship: 'Great-Granddaughter',
              birthYear: 2024,
              location: 'Lakeside City',
              occupation: 'Infant',
            },
          ],
        },
      ],
    },
    {
      id: 'camila-rivera',
      name: 'Camila Rivera-Ibarra',
      relationship: 'Daughter',
      birthYear: 1976,
      location: 'Golden Bay',
      occupation: 'Museum Curator',
      partnerName: 'Marco Ibarra',
      children: [
        {
          id: 'renata-ibarra',
          name: 'Renata Ibarra',
          relationship: 'Granddaughter',
          birthYear: 2001,
          location: 'Golden Bay',
          occupation: 'Photographer',
        },
      ],
    },
  ],
}
