import { eq } from "drizzle-orm";
import {
  contactMessages,
  type ContactMessageResponse,
  type CreateContactMessageRequest,
} from "@shared/schema";
import { db } from "./db";

export interface IStorage {
  createContactMessage(
    input: CreateContactMessageRequest,
  ): Promise<ContactMessageResponse>;
  getContactMessage(id: number): Promise<ContactMessageResponse | undefined>;
}

export class DatabaseStorage implements IStorage {
  async createContactMessage(
    input: CreateContactMessageRequest,
  ): Promise<ContactMessageResponse> {
    const [created] = await db
      .insert(contactMessages)
      .values({
        name: input.name,
        email: input.email,
        subject: input.subject ?? null,
        message: input.message,
      })
      .returning();

    return created;
  }

  async getContactMessage(
    id: number,
  ): Promise<ContactMessageResponse | undefined> {
    const [row] = await db
      .select()
      .from(contactMessages)
      .where(eq(contactMessages.id, id));

    return row;
  }
}

export const storage = new DatabaseStorage();
