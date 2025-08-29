const { PrismaClient } = require('./generated/prisma');
const prisma = new PrismaClient();

const bcrypt = require("bcrypt");

async function main() {
  console.log("🌱 Seeding database...");

  // Wipe old data
  await prisma.request.deleteMany();
  await prisma.like.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  const password = await bcrypt.hash("123456", 10);

  // Users with icons + covers
  const users = await prisma.user.createMany({
    data: [
      {
        username: "Alex",
        email: "Alex@example.com",
        gender: "male",
        birthday: new Date("2000-01-01"),
        password,
        name: "Alex",
        icon: "https://res.cloudinary.com/dhm82i8je/image/upload/v1755093384/jpg_1_kk4tkq.jpg",
        cover: "https://res.cloudinary.com/dhm82i8je/image/upload/v1756425854/closed_banner_s5qxko.jpg",
      },
      {
        username: "sara",
        email: "sara@example.com",
        gender: "female",
        birthday: new Date("2001-02-10"),
        password,
        name: "Sara",
        icon: "https://res.cloudinary.com/dhm82i8je/image/upload/v1755093371/anime_green_eye_%D0%B7%D0%B5%D0%BB%D0%B5%D0%BD%D1%8B%D0%B9_%D0%B3%D0%BB%D0%B0%D0%B7_%D0%B0%D0%BD%D0%B8%D0%BC%D0%B5_uqqvfq.jpg",
        cover: "https://res.cloudinary.com/dhm82i8je/image/upload/v1756425849/smile_banner_rngsky.jpg",
      },
      {
        username: "Lili",
        email: "Lili@example.com",
        gender: "male",
        birthday: new Date("1998-07-12"),
        password,
        name: "Lili",
        icon: "https://res.cloudinary.com/dhm82i8je/image/upload/v1755093378/jpg_2_cvnksg.jpg",
        cover: "https://res.cloudinary.com/dhm82i8je/image/upload/v1756425841/impress_banner_fkm9gz.jpg",
      },
      {
        username: "Biatrix",
        email: "Biatrix@example.com",
        gender: "female",
        birthday: new Date("1999-03-20"),
        password,
        name: "Biatrix",
        icon: "https://res.cloudinary.com/dhm82i8je/image/upload/v1755088288/profile_images/mkmzhqwnxh1gl7mvsfpa.jpg",
        cover: "https://res.cloudinary.com/dhm82i8je/image/upload/v1755288373/TimelineCovers.pro_only-black-facebook-cover_kcw2yz.jpg",
      },
    ],
  });

  const allUsers = await prisma.user.findMany();

  // Create posts (2 per user)
  for (const user of allUsers) {
    for (let i = 1; i <= 1; i++) {
      const post = await prisma.post.create({
        data: {
          text:
            i === 1
              ? "Enjoying a sunny day with friends! ☀️"
              : "Just finished a new coding project 🚀",
          PosterID: user.id,
        },
      });

      // Add 2 comments
      await prisma.comment.createMany({
        data: [
          {
            text: "That looks awesome 🔥",
            CommenterID: allUsers[(user.id + 1) % allUsers.length].id,
            PostID: post.id,
          },
          {
            text: "Keep it up 👏",
            CommenterID: allUsers[(user.id + 2) % allUsers.length].id,
            PostID: post.id,
          },
        ],
      });

      // Add 2 likes
      await prisma.like.createMany({
        data: [
          {
            LikerID: allUsers[(user.id + 1) % allUsers.length].id,
            PostID: post.id,
          },
          {
            LikerID: allUsers[(user.id + 2) % allUsers.length].id,
            PostID: post.id,
          },
        ],
      });
    }
  }

 // Friendships (each user gets 1 friend)
await prisma.$transaction([
  prisma.user.update({
    where: { id: allUsers[0].id },
    data: { friendsA: { connect: [{ id: allUsers[1].id }] } },
  }),
  prisma.user.update({
    where: { id: allUsers[1].id },
    data: { friendsA: { connect: [{ id: allUsers[0].id }] } },
  }),
  prisma.user.update({
    where: { id: allUsers[2].id },
    data: { friendsA: { connect: [{ id: allUsers[3].id }] } },
  }),
  prisma.user.update({
    where: { id: allUsers[3].id },
    data: { friendsA: { connect: [{ id: allUsers[2].id }] } },
  }),
]);


  // Friend requests (each user sends 1)
  await prisma.request.createMany({
    data: [
      { SenderID: allUsers[0].id, ReceiverID: allUsers[3].id },
      { SenderID: allUsers[1].id, ReceiverID: allUsers[2].id },
      { SenderID: allUsers[2].id, ReceiverID: allUsers[0].id },
      { SenderID: allUsers[3].id, ReceiverID: allUsers[1].id },
    ],
  });

  console.log("✅ Seed finished!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
