# PumpMaster

PumpMaster is a React + TypeScript web application for managing industrial pumps, offering core features like filtering, editing, and pagination. 
It is designed as a modular and testable frontend module, easily integratable into larger industrial systems.

<!-- 🔗 Live Demo: _(Coming soon)_ -->

## 1. Tech Stack

- **Framework**: React (TypeScript)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS, [shadcn/ui](https://ui.shadcn.com/) (based on Radix UI)
- **State Management**: Zustand
- **Testing**: Vitest + Testing Library

## 2. Features

### ✅ Pump Management
- View pump list with name, type, area, and status
- Edit or delete pump records via modal dialog
- Create new pump entries with validation
- The Pump Detail view is currently a placeholder and may not be fully functional yet.

### 🔍 Filtering & Pagination
- Search pumps by name
- Filter by pump type and area using custom dropdowns
- Client-side pagination for better performance on large datasets

## 3. Testing Coverage
Includes both **unit** and **integration** tests with custom patching to support Radix UI behaviors in JSDOM.


### Unit Tests
- `FilterSelect` (custom dropdown)
- `DeletePumpDialog`
- Zustand stores (`pumpStore`, `pumpSelectionStore`)

### Integration Tests
- `PumpFilter`: combined filtering behavior
- `PumpActions`: add/edit/delete flows
- `PumpOverview`: layout & data propagation
- `CreateEditPumpDialog`
- `CustomPagination`


## 4. Installation and Setup
```bash
# Prerequisite: Node.js v22.x (LTS) – confirm with `node -v`
# You may use npm or pnpm. If using pnpm, install it first:
# npm install -g pnpm

# Clone the repository
git clone https://github.com/Milly-code7/PumpMaster.git
cd PumpMaster

# Install dependencies (choose one)
npm install
# or
pnpm install

# Start the development server
npm run dev

# Run unit and integration tests
npx vitest run
```

## 5. Contributing

Contributions via issues and pull requests are welcome.

**Note for contributors:**

- This project uses `pnpm` (or `npm`) for dependency management.
- Please make sure all tests pass before submitting a PR:

## 6. License

This project is licensed under the MIT License.  
You are free to use, modify, and distribute this software under the terms of the license.


## 7. Learn More

- [React Documentation](https://react.dev/)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [Vitest](https://vitest.dev/)
- [Testing Library](https://testing-library.com/docs/)
- [Zustand](https://github.com/pmndrs/zustand)
