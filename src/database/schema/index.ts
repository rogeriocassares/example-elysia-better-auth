import { accounts } from "./accounts";
import { sessions } from "./sessions";
import { users } from "./users";
import { verifications } from "./verifications";

export const schema = {
  users,
  accounts,
  sessions,
  verifications
}

// import { relations } from "drizzle-orm";


// export const userRelations = relations(users, ({ many }) => ({
//   sessions: many(sessions),
//   accounts: many(accounts),
// }));

// export const sessionRelations = relations(sessions, ({ one }) => ({
//   users: one(users, {
//     fields: [sessions.userId],
//     references: [users.id],
//   }),
// }));

// export const accountRelations = relations(accounts, ({ one }) => ({
//   users: one(users, {
//     fields: [accounts.userId],
//     references: [users.id],
//   }),
// }));
