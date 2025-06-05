import axios from "axios";
import { faker } from "@faker-js/faker";

const apiKey = process.env.NEXT_PUBLIC_APP_REST_API_KEY;
const url = `${process.env.NEXT_PUBLIC_APP_API_URL}/data_import/users`;

function generateFakeUser() {
    const name = faker.person.fullName();
    const uid = faker.string.uuid();
    return {
        uid,
        name,
        avatar: faker.image.avatar(),
        metadata: {
            private: {
                email: faker.internet.email({
                    firstName: name.split(" ")[0],
                    lastName: name.split(" ")[1] || "",
                }),
            },
        },
        status: "active",
        role: "user",
        lastActiveAt: faker.date.recent().getTime(),
        createdAt: faker.date.past().getTime(),
    };
}

const usersArray = Array.from({ length: 1 }, generateFakeUser);

const users: Record<string, any> = {};
usersArray.forEach((user) => {
    users[user.uid] = user;
});
const payload = { users };

async function importUsers() {
    try {
        const response = await axios.post(url, payload, {
            headers: {
                accept: "application/json",
                "content-type": "application/json",
                apikey: apiKey,
            },
        });
        console.log("Users imported successfully:", response);
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.log("Error importing users:", error.response.data);
        } else {
            console.log("An unknown error occurred:", error);
        }
    }
}

importUsers();
