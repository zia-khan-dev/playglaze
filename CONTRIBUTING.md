# Contributing to PlayGlaze

Thanks for helping! Bug fixes, new components, templates and better docs are all welcome.

**`main` is protected.** Nobody pushes to it directly: every change comes through a pull request that passes CI and gets a maintainer's approval.

## How to send a pull request

1. **Fork** the repo and create a branch from `main`:
   - `feat/<name>` — a new component or prop (e.g. `feat/timer-pill`)
   - `fix/<name>` — a bug fix (e.g. `fix/slider-drag`)
   - `docs/<name>` — docs only
2. **Install** and run the docs site:
   ```sh
   npm install --legacy-peer-deps
   cd docs && npm install && npm run dev
   ```
3. **Make your change.** If you add or change a component, update its docs page in `docs/src/` (a live example, the code, and the API table) and export it from `src/index.ts`.
4. **Check** everything passes:
   ```sh
   npm run check   # type check + library build + docs build
   ```
5. **Commit** with a [Conventional Commit](https://www.conventionalcommits.org) message and open a pull request. Fill in the template, with screenshots for any visual change.

## What gets accepted

- It fits the PlayGlaze look: glossy, chunky, a 3D lip, shades built from one base color with `tone()`.
- It is **drawn in code** (Views, gradients, shadows, `react-native-svg`). No image files and no art copied from paid kits.
- **No new runtime dependencies** (only `react`, `react-native`, `react-native-svg`).
- It works on iOS, Android and the web (react-native-web).
- Colors come from a `color` prop or the theme — never fixed colors that ignore the theme.
- Props are typed, named like the other components (`color`, `size`, `onPress`, `style`) and have sensible defaults.
- The docs page has a live example, the code and a complete API table.
- One topic per pull request; small and easy to review.
- CI is green and a maintainer approved it.

## What gets declined

- Game logic, networking, analytics or ads — PlayGlaze is **UI only**.
- Breaking prop changes without a strong reason and a migration note.
- Images, fonts or art you don't own or can't share under MIT.
- Big pull requests that mix unrelated changes.

## Commit messages

| Prefix | Use for |
|---|---|
| `feat:` | a new component or prop |
| `fix:` | a bug fix |
| `docs:` | docs only |
| `refactor:` / `chore:` | code changes with no new behavior |
| `feat!:` / `fix!:` | a breaking change |

Example: `feat(badge): add a pulse animation`.

## Releases

Maintainers bump `version` in `package.json`, update `CHANGELOG.md`, and push a tag like `v0.2.0`. GitHub Actions publishes it to npm.

## Code of conduct

Be kind. See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).
