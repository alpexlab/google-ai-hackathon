# Backend

- Python 3.11
- Tech Stack: `Django`, `Django REST Framework`, `Postgres`, `Supabase`

## Setup

Requirements:
- Docker
- Make

### Steps

1. Clone the repository using `git clone https://github.com/alpexlab/google-ai-hackathon.git`
2. Navigate to the backend directory using `cd backend`
3. `cp .env.sample .env`
4. Run `make migrate` to apply migrations
5. Run `make createsuperuser` to create a superuser
4. Run `make` to install all dependencies and start the development server at `http://localhost:8000`
