# Contributing to Footvolley Frontend

Thank you for your interest in contributing to the Footvolley Event Planner frontend!  
Whether you're fixing a bug, adding a feature, or improving documentation, your help is appreciated.

---

## How to Contribute

1. **Fork the repository**
2. **Create a new branch**:  
   ```bash  
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Commit with a clear message** (see naming convention below)
5. **Push to your fork**
6. **Submit a Pull Request**

---

## Issues & Suggestions

We currently manage issues and feature planning internally.

If you'd like to suggest a change or improvement, we recommend forking the repo, implementing your idea, and opening a pull request. Be sure to include a clear explanation of what you're solving or improving.

---

## Development Setup

### Frontend (HTML, CSS, JavaScript)

This project uses no build tools or frontend frameworks. You can run it directly in the browser or with a local dev server.

#### Option 1: Open in Browser
- Open `index.html` directly in your browser

#### Option 2: Use a Local Server (Recommended for backend API interaction)
```bash  
npx live-server
```

> Make sure your backend server is running to enable data interaction.

---

## Pull Request Naming Convention

Use the following format to name your pull requests:

- `feat: <description>` – For new features
- `fix: <description>` – For bug fixes
- `docs: <description>` – For documentation changes
- `style: <description>` – For UI or CSS updates
- `refactor: <description>` – For code restructuring

### Examples

- `feat: add tournament results page`
- `fix: resolve navbar collapse bug on mobile`
- `docs: update contribution guidelines`
- `style: improve button spacing`
- `refactor: extract API calls to separate file`

---

## Code Style

We have not enforced automated formatting tools yet, but we encourage the following:

- Use consistent indentation (2 or 4 spaces)
- Write clear, descriptive variable and function names
- Use comments where logic is complex or non-obvious
- Keep JavaScript modular and avoid large monolithic functions
- Group DOM operations, event listeners, and API calls logically

> In future versions, we may adopt Prettier or other formatting tools to enforce consistent style.
