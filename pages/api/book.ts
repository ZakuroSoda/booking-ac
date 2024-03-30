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
  console.log(session.user.id, data)
  const { title, type, description, spectators, sharing, recurrence, start, end, locationId } = data

  if (!title || !type || !description || !spectators || !sharing || !recurrence || !start || !end || !locationId) {
    return res.status(400).json({
      status: "error",
      response: "Missing required fields",
    });
  }

  await prisma.event.create({
    data: {
      title,
      type,
      description,
      spectators,
      sharing,
      recurrence,
      start: new Date(start),
      end: new Date(end),
      locationId,
    },
  });
  

  res.status(200).json({ success: true })
}