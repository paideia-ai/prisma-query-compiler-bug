# Prisma Bug Reproduction

## Steps to Reproduce

1. Install dependencies:
   ```
   pnpm install
   ```

2. Generate Prisma client:
   ```
   npx prisma generate
   ```

3. Set environment variable:
   ```
   export DATABASE_URL="postgresql://username:password@localhost:5432/prisma_bug_db?schema=public"
   ```

4. Run the test:
   ```
   node test.js
   ```

5. Observe how the two JSON outputs are different (with and without Query Compiler)
