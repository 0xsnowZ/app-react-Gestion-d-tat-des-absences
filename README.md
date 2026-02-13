# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  # Absence React App

  A small React + TypeScript + Vite application to manage absences and trainees (stagiaires).

  ## Features

  - Add and list absences
  - Manage stagiaires (add/list)
  - Simple UI components using a local `ui/` component set

  ## Tech stack

  - React
  - TypeScript
  - Vite
  - Tailwind CSS

  ## Project structure

  - `src/` — application source
    - `components/` — app components (`AbsenceForm`, `AbsenceList`, `StagiaireForm`, `StagiaireList`, `Consultations`, `Navigation`)
    - `components/ui/` — reusable UI primitives
    - `hooks/` — custom hooks
    - `lib/` — utility functions
    - `services/` — data service layer
    - `types/` — TypeScript types

  ## Setup

  1. Install dependencies

  ```bash
  cd "app"
  npm install
  ```

  2. Run development server

  ```bash
  npm run dev
  ```

  3. Build for production

  ```bash
  npm run build
  ```

  4. Preview production build

  ```bash
  npm run preview
  ```

  ## Environment

  - Environment variables (if used) should be placed in a `.env` file at the project root. Sensitive values must not be committed — `.gitignore` already excludes `.env` files.

  ## Contributing

  - Create an issue for a new feature or bug.
  - Open a pull request with a clear description of changes.

  ## Committing and pushing

  After updating files locally, commit and push to your remote. Example commands:

  ```bash
  cd "app"
  git add README.md
  git commit -m "docs: improve README"
  git push
  ```

  If you need me to commit and push this change here, tell me and provide the remote URL (if not already set).

  ## License

  Specify your license here (e.g. MIT) or remove this section if not applicable.
