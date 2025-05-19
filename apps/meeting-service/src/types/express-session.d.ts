import "express-session";

declare module "express-session" {
    interface SessionData {
        passport?: {
            user: any; // You can replace `any` with your user type if known
        };
    }
}