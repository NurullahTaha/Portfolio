const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
const prisma = new PrismaClient()

async function main() {
  const email = 'admin@example.com'
  const newPassword = 'password123'
  
  console.log(`Resetting password for ${email}...`)
  
  // 1. Hash the password exactly how the app does it
  const hashedPassword = await bcrypt.hash(newPassword, 10)
  
  // 2. Update the user
  await prisma.user.update({
    where: { email },
    data: { password: hashedPassword },
  })
  
  console.log('✅ Password has been reset to: password123')
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
