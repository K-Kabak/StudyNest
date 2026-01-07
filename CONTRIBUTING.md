# Contributing to StudyNest

Thank you for your interest in contributing to StudyNest! We welcome contributions from everyone.

## How to Contribute

1.  **Fork the repository** on GitHub.
2.  **Clone your fork** locally:
    ```bash
    git clone https://github.com/your-username/StudyNest.git
    ```
3.  **Create a new branch** for your feature or bugfix:
    ```bash
    git checkout -b feature/your-feature-name
    ```
4.  **Install dependencies**:
    ```bash
    npm install
    ```
5.  **Make your changes** and ensure the code follows the project's style.
6.  **Test your changes** by running the development server:
    ```bash
    npm run dev
    ```
7.  **Commit your changes** with a descriptive message:
    ```bash
    git commit -m "Add feature: your feature description"
    ```
8.  **Push to your fork**:
    ```bash
    git push origin feature/your-feature-name
    ```
9.  **Create a Pull Request** on the original repository.

## Development Guidelines

-   **Code Style**: We use ESLint and Prettier to maintain code quality.
-   **Components**: Keep components small and focused. Use the `src/components/ui` folder for reusable atomic components.
-   **Hooks**: Use custom hooks for complex logic and state management.
-   **Styling**: Use Tailwind CSS for styling. Avoid custom CSS unless absolutely necessary.
-   **Testing**: Ensure your changes don't break existing functionality.

## Project Structure

-   `src/components`: React components organized by feature.
-   `src/hooks`: Custom React hooks.
-   `src/pages`: Main application pages.
-   `src/utils`: Utility functions and constants.
-   `src/context`: React Context providers.
-   `public`: Static assets like icons and manifest.

## Reporting Issues

If you find a bug or have a feature request, please open an issue on GitHub. Provide as much detail as possible, including steps to reproduce the bug.

## License

This project is licensed under the MIT License.
