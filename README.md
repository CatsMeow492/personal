# Personal Portfolio Website

A modern personal portfolio website built with Next.js and Go, deployed on Amazon EKS.

## Tech Stack

- **Frontend**: Next.js (React)
- **Backend**: Go
- **Infrastructure**: Amazon EKS (Kubernetes)
- **CI/CD**: GitHub Actions
- **Domain**: youngmohney.com

## Project Structure

```
.
├── frontend/          # Next.js application
├── backend/          # Go backend
├── .github/          # GitHub Actions workflows
├── k8s/             # Kubernetes manifests
└── README.md
```

## Local Development

### Prerequisites

- Node.js (v18 or later)
- Go (v1.21 or later)
- Docker
- kubectl
- AWS CLI

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Backend Setup

```bash
cd backend
go mod tidy
go run main.go
```

## Deployment

The application is automatically deployed to Amazon EKS using GitHub Actions when changes are pushed to the main branch.

### Infrastructure Requirements

- Amazon EKS cluster
- Route53 for DNS management
- ACM for SSL certificates
- ECR repositories for Docker images

## License

MIT 