
<div align="center">

# 🔎 Outlier Hunt

**Spot the Odd. Master the Data.**

An interactive, game-based simulator for learning outlier detection, from simple odd-one-out puzzles to IQR and Z-score analysis.

![React](https://img.shields.io/badge/React-UI-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-Typed-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-Styling-06B6D4?logo=tailwindcss&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

</div>

> Every dataset has a story. Can you spot the observation that doesn't belong?

<!-- Add a screenshot or GIF of the game here, e.g.: -->
<!-- ![Outlier Hunt screenshot](docs/screenshot.png) -->

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Game Modes](#game-modes)
- [How Outlier Detection Works](#how-outlier-detection-works)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Learning Objectives](#learning-objectives)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

Outlier Hunt turns outlier detection into an educational game. Players start with simple odd-one-out puzzles and progress to numerical datasets and statistical challenges.

The game deliberately separates **categorical odd-one-out puzzles** (pattern recognition) from **statistical outlier detection** (data analysis), so players learn the difference between the two.

## Features

- **Multiple game modes:** Quick Hunt, Category Clash, Number Detective, and Data Scientist Challenge.
- **Numerical outlier detection:** explore numerical patterns and unusual observations.
- **Statistical visualizations:** understand datasets through charts, data points, and numerical indicators.
- **Statistical methods:** mean, median, quartiles, interquartile range (IQR), Z-scores, and outlier fences.
- **Hints and explanations:** beginner-friendly clues, plus an explanation after each answer.
- **Scoring system:** earn points, maintain streaks, and track performance.
- **Interactive gameplay:** question progression, timers, difficulty levels, and instant feedback.
- **Performance summary:** review score, accuracy, correct answers, and learning progress.
- **Local persistence:** personal bests, statistics, and preferences are saved with browser `localStorage`.
- **Responsive interface:** works on desktop, tablet, and mobile.
- **Retro-light design:** a warm, paper-inspired interface with editorial typography, subtle grid textures, and bold offset shadows.

## Game Modes

| Mode | Description |
|---|---|
| **Quick Hunt** | Short, mixed-difficulty challenges. |
| **Category Clash** | Identify the item that does not belong to the shared category. |
| **Number Detective** | Find unusual values in numerical sequences and datasets. |
| **Data Scientist Challenge** | Explore realistic datasets and apply statistical detection methods. |

Each mode includes multiple difficulty levels, from beginner-friendly puzzles to more demanding statistical problems.

## How Outlier Detection Works

### 1. Categorical odd-one-out

Identify the item that differs from the common category or pattern.

- **Example:** Apple, Banana, Mango, Carrot
- **Answer:** Carrot. The other items are fruits, while a carrot is a vegetable.

### 2. Numerical outlier detection

Identify observations that are unusually far from the rest of a dataset.

- **Example:** `8, 9, 10, 11, 75`
- **Answer:** `75` is much larger than the other values.

### 3. Interquartile range (IQR)

The IQR method flags potential outliers using the middle 50% of the data.

```text
IQR         = Q3 − Q1
Lower fence = Q1 − 1.5 × IQR
Upper fence = Q3 + 1.5 × IQR
```

Values below the lower fence or above the upper fence are flagged as potential outliers.

### 4. Z-score

A Z-score measures how many standard deviations an observation lies from the mean.

```text
Z = (x − μ) / σ
```

where `x` is the observation, `μ` is the mean, and `σ` is the standard deviation. A common rule flags observations whose absolute Z-score exceeds a chosen threshold, typically 2 or 3.

> **Note:** Outlier classification depends on the dataset, the detection method, the threshold, and the context. Not every unusual observation is a statistical outlier.

## Technology Stack

| Area | Technology |
|---|---|
| UI | React |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| Animation | Framer Motion |
| State management | React Hooks |
| Persistence | Browser `localStorage` |

## Architecture

Outlier Hunt is a **frontend-only application**:

- Questions are stored locally in the project.
- Answer validation, scoring, and statistical calculations run in the browser.
- Charts and visualizations update from the active dataset.
- Statistics and preferences are stored in `localStorage`.

No backend server, database, authentication service, or external API is required for core gameplay.

> **Note:** Locally stored statistics are browser-specific and are not synchronized across devices or users.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (a current LTS version)
- npm (included with Node.js)
- Git

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/prerna12github/Outlier-Detection-Game.git

# 2. Navigate to the project directory
cd Outlier-Detection-Game

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Open the local URL printed in your terminal (commonly `http://localhost:5173` for Vite projects).

### Production build

```bash
npm run build
```

Available commands depend on the scripts defined in `package.json`.

## Project Structure

> Illustrative layout; actual filenames may differ.

```text
Outlier-Detection-Game/
├── public/
├── src/
│   ├── components/
│   ├── data/
│   │   └── questions.ts
│   ├── hooks/
│   ├── pages/
│   ├── utils/
│   │   └── statistics.ts
│   ├── types/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── LICENSE
└── README.md
```

## Learning Objectives

By playing Outlier Hunt, users can:

- Develop pattern-recognition and analytical-thinking skills.
- Distinguish categorical differences from statistical anomalies.
- Understand how numerical distributions behave.
- Learn basic descriptive statistics.
- Apply IQR and Z-score detection rules.
- Interpret data visualizations.
- Understand why outlier detection depends on context and the chosen method.

## Roadmap

- User-created datasets and custom detection rules
- Additional statistical methods
- More advanced data-science challenges
- Downloadable game reports
- New question packs and difficulty levels
- Optional online leaderboards and cross-device progress sync (requires a backend or external service)

## Contributing

Contributions, suggestions, and bug reports are welcome.

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature`.
3. Commit your changes.
4. Test the application.
5. Open a pull request describing your changes.

## License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">

**Outlier Hunt: Spot the Odd. Master the Data.**

</div>
