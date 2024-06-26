/**
  @param {string} name - The name of the event
  @param {string} type - The type of the event
  @param {string} description - The description of the event
  @param {string} spectators - Whether spectators allowed
  @param {string} sharing - Whether sharing allowed
  @param {string} recurrence - The recurrence of the event
  @param {string} start - The start date of the event
  @param {string} end - The end date of the event  
 */

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
  const { title, type, description, spectators, sharing, recurrence, start, end, locationId } = data

  if (!title || !type || !description || !spectators || !sharing || !recurrence || !start || !end || !locationId) {
    return res.status(400).json({
      status: "error",
      response: "Missing required fields",
    })
  }

  const startDate = new Date(start)
  const endDate = new Date(end)
  const lengthInvalid = (endDate.getTime() - startDate.getTime()) > (10 * 60 * 60 * 1000) ||
    (endDate.getTime() - startDate.getTime()) < (10 * 60 * 1000)
  const dayInvalid = (endDate.getDay() !== startDate.getDay())

  if (endDate < startDate) {
    return res.status(400).json({
      status: "error",
      response: "Event must end after it starts",
    })
  }

  if (lengthInvalid) {
    return res.status(400).json({
      status: "error",
      response: "Event cannot be shorter than 10 minutes or longer than 10 hours",
    })
  }

  if (dayInvalid) {
    return res.status(400).json({
      status: "error",
      response: "Event cannot span multiple days",
    })
  }

  const conflictCheck = await prisma.event.findFirst({
    where: {
      locationId: locationId,
      OR: [ // capture overlaps of existing event
        { // existing event smaller than new event
          start: { gte: startDate },
          end: { lte: endDate },
        },
        { // existing event larger than new event
          start: { lte: startDate },
          end: { gte: endDate },
        },
        { // existing event to the right of new event
          start: {
            gte: startDate,
            lte: endDate,
          },
        },
        { // existing event to the left of new event
          end: {
            gte: startDate,
            lte: endDate,
          },
        },
      ],
    },
  })

  if (conflictCheck) {
    return res.status(400).json({
      status: "error",
      response: "Event conflicts with existing event",
    })
  }

  const result = await prisma.event.create({
    data: {
      title,
      type,
      description,
      spectators,
      sharing,
      recurrence,
      start: startDate,
      end: endDate,
      locationId,
      bookedBy: session.user.id,
    },
  })


  res.status(200).json({ eventId: result.uid })
}