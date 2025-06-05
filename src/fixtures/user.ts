import axios from "axios";
import { faker } from "@faker-js/faker";

const roles = ["admin", "member"];
const statuses = ["online", "offline"];
const usersCount = 100;

function generateFakeUser() {
    const name = faker.person.fullName();
    return {
        uid: faker.string.uuid(),
        name,
        avatar: faker.image.avatar(),
        status: faker.helpers.arrayElement(statuses),
        role: faker.helpers.arrayElement(roles),
        lastActiveAt: faker.date.recent({ days: 10 }).getTime(),
        createdAt: faker.date.past({ years: 1 }).getTime(),
        meta: {
            email: faker.internet.email({
                firstName: name.split(" ")[0],
                lastName: name.split(" ")[1] || "",
            }),
        },
    };
}

const users = Array.from({ length: usersCount }, generateFakeUser);

const url = process.env.NEXT_PUBLIC_APP_API_URL;
const apiKey = process.env.NEXT_PUBLIC_APP_REST_API_KEY;

async function uploadUsers() {
    for (const user of users) {
        const payload = {
            uid: user.uid,
            name: user.name,
            avatar: user.avatar,
            metadata: {
                "@private": {
                    email: user.meta?.email || "",
                    contactNumber: faker.phone.number(),
                },
            },
        };

        try {
            const response = await axios.post(url, payload, {
                headers: {
                    accept: "application/json",
                    "content-type": "application/json",
                    apikey: apiKey,
                },
            });

            console.log(`User ${user.uid} created:`, response.data);
        } catch (error) {}
    }
}

uploadUsers();
