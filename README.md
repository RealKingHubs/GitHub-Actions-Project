# 🚀 Portfolio Website Deployment (AWS S3 + GitHub Actions OIDC)

This project is a static portfolio website automatically deployed to **Amazon S3** using **GitHub Actions**. It features a modern, "passwordless" authentication flow using **OpenID Connect (OIDC)**.

## 🛠️ Architecture
- **Storage:** Amazon S3 (Static Website Hosting)
- **CI/CD:** GitHub Actions
- **Authentication:** AWS IAM OIDC (No static Access Keys)
- **Security:** GitHub Secret Scanning & Push Protection

## 🔐 The "New Way": Why OIDC?
In this project, I moved away from the "Old Way" of using permanent **IAM User Access Keys** (which require manual 90-day rotation and pose a security risk if leaked). 

Instead, I implemented **OIDC**:
1. **No Static Secrets:** GitHub proves its identity to AWS via a short-lived token.
2. **Auto-Expiration:** AWS issues temporary credentials that last only 1 hour.
3. **Zero Maintenance:** No keys to rotate manually; it’s more secure and automated.

## 🚀 Step-by-Step Implementation

### 1. AWS Infrastructure
- **Identity Provider:** Configured `://githubusercontent.com` in IAM.
- **IAM Role:** Created a role with a **Custom Trust Policy** restricted to my specific GitHub repository and branch.
- **S3 Bucket:** Configured `my-first-altschool-bucket` for static website hosting and applied a public-read bucket policy.

### 2. GitHub Actions Workflow
The deployment pipeline (`.github/workflows/main.yml`) performs the following:
- **OIDC Handshake:** Uses `aws-actions/configure-aws-credentials` to assume the IAM Role.
- **Sync:** Uses `aws s3 sync` to upload files, excluding internal Git metadata and sensitive `.env` files.
- **Automation:** Every `push` to the `main` branch triggers an immediate update to the live site.

### 3. Security Best Practices
- **Least Privilege:** The IAM Role is restricted to only perform necessary S3 actions.

## 📂 Project Structure
```text
├── .github/workflows/
│   └── deploy.yml      # CI/CD Pipeline
├── index.html          # Main Portfolio Page
├── style.css
├── script.js                  
├── architecture.html         
└── README.md                  # Project documentation
