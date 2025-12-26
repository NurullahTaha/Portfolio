const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const categories = ['Nature', 'City', 'Automobile']
  
  console.log('Seeding categories...')
  
  for (const cat of categories) {
    await prisma.category.upsert({
      where: { name: cat },
      update: {},
      create: {
        name: cat,
        slug: cat.toLowerCase(),
      },
    })
    console.log(`Created: ${cat}`)
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
