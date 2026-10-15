- Charts and visualizations update from the active dataset.
- Statistics and preferences are stored in `localStorage`.

No backend server, database, authentication service, or external API is required for core gameplay.

> **Note:** Locally stored statistics are browser-specific and are not synchronized across devices or users.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (a current LTS version) or [Bun](https://bun.sh/)
- npm or bun
- Git
- Optional: [Docker](https://www.docker.com/) or [Podman](https://podman.io/)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/prerna12github/Outlier-Detection-Game.git

# 2. Navigate to the project directory
cd Outlier-Detection-Game

# 3. Install dependencies
bun install
# or: npm install

# 4. Start the development server
bun run dev
# or: npm run dev
```

Open the local URL printed in your terminal (commonly `http://localhost:5173` or `http://localhost:3000`).

### Production build

```bash
bun run build
# or: npm run build
```

### Running with Docker

You can build and run Outlier Hunt inside a container using Docker or Podman:

#### 1. Using Docker Compose (Recommended)

```bash
docker compose up -d --build
```

Access the game at **http://localhost:3000**.

To stop the container:
```bash
docker compose down
```

#### 2. Using Docker CLI

```bash
# Build the image
docker build -t outlier-hunt .

# Run the container
docker run -d -p 3000:3000 --name outlier-hunt outlier-hunt
```

#### 3. Using Podman

```bash
podman build -t outlier-hunt .
podman run -d -p 3000:3000 --name outlier-hunt outlier-hunt
```

## Project Structure

> Illustrative layout; actual filenames may differ.

```text
Outlier-Detection-Game/
├── Dockerfile
├── .dockerignore
├── docker-compose.yml
├── public/
├── src/
│   ├── components/
│   ├── data/
