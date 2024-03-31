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
    });
  }
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user)
    return res.status(401).json({
      status: "error",
      response: "Unauthenticated",
    });

  const data = JSON.parse(req.body)
  const { title, type, description, spectators, sharing, recurrence, start, end, locationId } = data

  if (!title || !type || !description || !spectators || !sharing || !recurrence || !start || !end || !locationId) {
    return res.status(400).json({
      status: "error",
      response: "Missing required fields",
    });
  }

  const startDate = new Date(start)
  const endDate = new Date(end)
  const valid = (endDate.getTime() - startDate.getTime()) > (1 * 24 * 60 * 60 * 1000)

  // end must be after start, end must be maximum 1 week after start
  if (endDate < startDate || valid) {
    return res.status(400).json({
      status: "error",
      response: "End date must be at most 1 day after start date",
    });
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
    },
  });
  

  res.status(200).json({ eventId: result.uid })
}