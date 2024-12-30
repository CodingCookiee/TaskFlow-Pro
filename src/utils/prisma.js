import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'

const prisma = new PrismaClient({
  log: ['query', 'error', 'warn']
}).$extends(withAccelerate())

// Export config for API route
export const config = {
  api: {
    bodyParser: true,
    externalResolver: true
  }
}

export default prisma
