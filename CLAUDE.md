# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server (Next.js, Turbopack)
npm run build    # production build
npm run start    # run production build
npm run lint     # eslint
npm run format   # prettier --write, whole repo
```

No test suite is configured (no test runner in `package.json`, no test files in the repo).

### Database (Prisma / Postgres)

```bash
scripts/prisma/setup.sh          # first-time setup: installs prisma deps, runs `prisma init`, copies .env.example -> .env
scripts/prisma/migrate.sh <name> # `prisma migrate dev --name <name>` then `prisma generate` (name defaults to migration_<timestamp>)
npx prisma studio                # inspect data
npx prisma generate              # regenerate client after editing schema.prisma without a migration
```

`DATABASE_URL` is read from `.env` (see `.env.example`); a local Postgres is provided by the devcontainer.

Formatting runs automatically after every file write/edit via a `PostToolUse` hook (`.claude/settings.json`) that calls `npm run format -y` — don't run it manually just to clean up after yourself.

## Architecture

- Next.js App Router app (`src/app`), TypeScript, React 19, Tailwind CSS v4. `@/*` resolves to `src/*`.
- UI is Japanese-first: root layout (`src/app/layout.tsx`) sets `lang="ja"` and loads the Noto Sans JP font.
- Prisma client is generated to a **non-default** location: `src/lib/generated/prisma` (set via `generator client { output = ... }` in `prisma/schema.prisma`), not `node_modules/@prisma/client`. Import it from that path. The datasource connects through `@prisma/adapter-pg` (`pg` driver adapter) rather than Prisma's built-in engine.
- Schema (`prisma/schema.prisma`) models a group-memo app:
    - `User` — `UserGroup` (join table with a `joinStatus` field, not a plain many-to-many) — `Group`.
    - `UserMemo` belongs to one `User` and can belong to many `Group`s (implicit many-to-many).
    - `Schedule` exists as a bare timestamped model with no relations yet.
- `.mcp.json` wires up MCP servers for this repo: `ESLint` (lint-via-MCP), `next-devtools`, and `docs-langchain`.

## Conventions

- Formatting is enforced by Prettier, not manual style: tabs (width 4), semicolons, import sorting via `@trivago/prettier-plugin-sort-imports`, Tailwind class sorting via `prettier-plugin-tailwindcss`. Don't hand-format — let `npm run format` / the write hook do it.
- Do not add new npm dependencies without explicit approval from the user; if one seems necessary, state why the existing toolset can't do it first.
