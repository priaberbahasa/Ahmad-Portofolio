#!/usr/bin/env node
// Usage: node scripts/hash-password.mjs <password>
// Output: the bcrypt hash to paste as ADMIN_PASSWORD_HASH in your env
import bcrypt from "bcryptjs";

const pwd = process.argv[2];
if (!pwd) {
  console.error("Usage: node scripts/hash-password.mjs <password>");
  process.exit(1);
}
const hash = bcrypt.hashSync(pwd, 12);
console.log(hash);
