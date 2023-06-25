import { faker } from "@faker-js/faker";
import axios from "axios";
import { config } from "dotenv";
config();

async function main() {
  console.log(
    `process.env.NEXT_PUBLIC_API_URL: ${process.env.NEXT_PUBLIC_API_URL}`
  );
  if (!process.env.NEXT_PUBLIC_API_URL) {
    console.error("Error: Please add NEXT_PUBLIC_API_URL in .env file");
    process.exit(1);
  }

  let users = [];
  for (let i = 0; i < 50; i++) {
    const user = {
      username: faker.internet.userName(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    users.push(user);
  }

  let blogs = [];
  for (let i = 0; i < 30; i++) {
    const randomNumber = Math.floor(Math.random() * users.length);
    const blog = {
      blogId: faker.science.chemicalElement().name,
      title: faker.company.catchPhrase(),
      image: faker.image.url(),
      description: faker.lorem.paragraphs(5),
      tags: faker.commerce.productName(),
      communities: [faker.color.human()],
      viewCount: faker.number.int(2, 50),
      likedBy: users.slice(0, randomNumber).map((user) => user.username),
    };

    blogs.push(blog);
  }

  let comments = [];
  for (let i = 0; i < 45; i++) {
    const randomBlogIndex = Math.floor(Math.random() * blogs.length);
    const comment = {
      blogId: blogs[randomBlogIndex].blogId,
      title: faker.company.buzzAdjective(),
      message: faker.company.buzzPhrase(),
    };
    comments.push(comment);
  }

  let plans = [
    {
      name: "free",
      pricePerMonth: 0,
      pricePerYear: 0,
    },
    {
      name: "starter",
      pricePerMonth: 100,
      pricePerYear: 1000,
    },
    {
      name: "pro",
      pricePerMonth: 1000,
      pricePerYear: 8500,
    },
  ];

  // Create new users
  const getAuthToken = async (user) => {
    const {
      data: { token },
    } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/register`,
      user
    );
    return token;
  };

  const userTokens = await Promise.all(users.map(getAuthToken));
  // Publish new blogs and like
  const publishBlogs = async (blog) => {
    // Random userToken
    const token = userTokens[Math.floor(Math.random() * userTokens.length)];
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs`, blog, {
      headers: { Authorization: `bearer ${token}` },
    });
  };
  await Promise.all(blogs.map(publishBlogs));

  // Comment on blogs
  const publishComments = async (comment) => {
    // Random userToken
    const token = userTokens[Math.floor(Math.random() * userTokens.length)];
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/comments`,
      comment,
      {
        headers: { Authorization: `bearer ${token}` },
      }
    );
  };
  await Promise.all(comments.map(publishComments));

  // Publish plans
  const publishPlans = async (plan) =>
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/plans`, plan);

  await Promise.all(plans.map(publishPlans));
}

main();
