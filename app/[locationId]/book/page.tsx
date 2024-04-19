import { redirect } from 'next/navigation'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { PrismaClient } from "@prisma/client"
import BookingForm from "./BookingForm"

const prisma = new PrismaClient()

export default async function page({
  params
}: {
  params: {
    locationId: string
  }
}) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    redirect("/login")
  }

  const locationId = parseInt(params.locationId)
  if (isNaN(locationId)) {
    redirect("/")
  }

  const location = await prisma.location.findUnique({
    where: {
      id: locationId
    }
  })

  if (!location) {
    redirect("/")
  }

  return (
    <>
      <BookingForm location={location} />
    </>
  )
}
