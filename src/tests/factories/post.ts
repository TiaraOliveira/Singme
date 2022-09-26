import { faker } from '@faker-js/faker';

export default async function recomendationspost() {
    const link = `https://www.youtube.com/${faker.lorem.words(4)}`
    return [{
        id: 1, 
        name: faker.name.firstName(),
        youtubeLink: link,
        score: 9
    },
    {
        id: 1, 
        name: faker.name.firstName(),
        youtubeLink: link,
        score: 9
    },
    {
        id: 1, 
        name: faker.name.firstName(),
        youtubeLink: link,
        score: 9
    },
    {
        id: 1, 
        name: faker.name.firstName(),
        youtubeLink: link,
        score: 9
    },
    {
        id: 1, 
        name: faker.name.firstName(),
        youtubeLink: link,
        score: 9
    },
    {
        id: 1, 
        name: faker.name.firstName(),
        youtubeLink: link,
        score: 9
    }
]
}