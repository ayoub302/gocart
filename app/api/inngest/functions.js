import { inngest } from "./client";
import prisma from "@/lib/prisma";

//Inngest Function to save user in the db
export const syncUserCreation = inngest.createFunction(
  { id: "sync-user-creation" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { data } = event;
    await prisma.user.create({
      data: {
        id: data.id,
        email: data.email_addresses[0].email_address,
        name: `${data.first_name} ${data.last_name}`,
        image: data.image_url,
      },
    });
  }
);

// Inngest Function to update usar in the db
export const syncUserUpdation = inngest.createFunction(
  { id: "sync-user-updation" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    const { data } = event;
    await prisma.user.update({
      where: {
        id: data.id,
      },
      data: {
        id: data.id,
        email: data.email_addresses[0].email_address,
        name: `${data.first_name} ${data.last_name}`,
        image: data.image_url,
      },
    });
  }
);

// Inngest Function to delete user frm db
export const syncUserDeletion = inngest.createFunction(
  { id: "sync-user-deletion" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { data } = event;
    await prisma.user.delete({
      where: { id: data.id },
    });
  }
);
