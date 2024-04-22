import { redirect } from 'next/navigation'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { PrismaClient } from '@prisma/client'
import Edit from "./edit"

const prisma = new PrismaClient()

export default async function page() {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    redirect("/login")
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { name: true }
  })

  const username = user?.name

  return (
    <>
      <Edit username={username}/>
    </>
  )
}
