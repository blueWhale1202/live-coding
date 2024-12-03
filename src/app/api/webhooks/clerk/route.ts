import { db } from "@/lib/db";
import {
    DeletedObjectJSON,
    UserJSON,
    WebhookEvent,
} from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { Webhook } from "svix";

export async function POST(req: Request) {
    const SIGNING_SECRET = process.env.CLERK_WEBHOOK_SECRET;

    if (!SIGNING_SECRET) {
        throw new Error(
            "Error: Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local",
        );
    }

    // Create new Svix instance with secret
    const wh = new Webhook(SIGNING_SECRET);

    // Get headers
    const headerPayload = await headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response("Error: Missing Svix headers", {
            status: 400,
        });
    }

    // Get body
    const payload = await req.json();
    const body = JSON.stringify(payload);

    let evt: WebhookEvent;

    // Verify payload with headers
    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent;
    } catch (err) {
        console.error("Error: Could not verify webhook:", err);
        return new Response("Error: Verification error", {
            status: 400,
        });
    }

    const eventType = evt.type;

    switch (eventType) {
        case "user.created": {
            console.log("User created");
            const data = evt.data as UserJSON;
            await db.user.create({
                data: {
                    externalUserId: data.id,
                    imageUrl: data.image_url,
                    username: data.username!,
                },
            });
            break;
        }
        case "user.updated": {
            console.log("User updated");
            const data = evt.data as UserJSON;
            const currentUser = await db.user.findUnique({
                where: {
                    externalUserId: data.id,
                },
            });

            if (!currentUser) {
                return new Response("User not found", {
                    status: 404,
                });
            }

            await db.user.update({
                where: {
                    externalUserId: data.id,
                },
                data: {
                    imageUrl: data.image_url,
                    username: data.username!,
                },
            });
            break;
        }
        case "user.deleted": {
            console.log("User deleted");
            const data = evt.data as DeletedObjectJSON;
            await db.user.delete({
                where: {
                    externalUserId: data.id,
                },
            });
            break;
        }
    }

    return new Response("Webhook received", { status: 200 });
}
