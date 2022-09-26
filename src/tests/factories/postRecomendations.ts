import { faker } from '@faker-js/faker';

export default async function postRecomendations() {
    const link = `https://www.youtube.com/${faker.lorem.words(4)}`
    return {
        "name": faker.name.firstName(),
        "youtubeLink": link
    }
}
