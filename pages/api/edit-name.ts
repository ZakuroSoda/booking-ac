import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth"
import { authOptions } from "./auth/[...nextauth]"

const prisma = new PrismaClient()

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({
      status: "error",
      response: `Method ${req.method} Not Allowed`,
    })
  }
  const session = await getServerSession(req, res, authOptions)
  if (!session?.user)
    return res.status(401).json({
      status: "error",
      response: "Unauthenticated",
    })

  const data = JSON.parse(req.body)
  const { name } = data

  if (!name) {
    return res.status(400).json({
      status: "error",
      response: "Missing required fields",
    })
  }

  if (name.length < 3 || name.length > 16) {
    return res.status(400).json({
      status: "error",
      response: "Name must be between 3 and 16 characters!",
    })
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: { name: name }
  })

  res.status(200).json({
    status: "success",
    response: "Name successfully updated!",
  })
}