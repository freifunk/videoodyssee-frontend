# SCP Deployment Setup

## Configure GitHub Secrets and Variables

To enable automatic deployment to your server, you need to configure secrets and variables in your GitHub repository settings:

### Required Secrets (Sensitive Data):

**Server Connection:**

1. **`DEPLOY_HOST`** - The IP address or domain of your server
   ```
   Example: 123.456.789.10 or example.com
   ```

2. **`DEPLOY_USER`** - The SSH username for the server
   ```
   Example: deploy or root or your-username
   ```

3. **`DEPLOY_KEY`** - The private SSH key for authentication
   ```
   The complete content of your private SSH key
   (starts with -----BEGIN OPENSSH PRIVATE KEY-----)
   ```

4. **`DEPLOY_PATH`** - The target path on the server
   ```
   Example: /var/www/html/videoodyssee
   or: /home/user/public_html
   ```

5. **`DEPLOY_PORT`** (optional) - SSH port (default: 22)
   ```
   Example: 22 or 2222
   ```

### Required Variables (Non-Sensitive Configuration):

**Application Configuration:**

6. **`REACT_APP_API_URL`** - Backend API URL
   ```
   Example: https://api.example.com
   ```

7. **`REACT_APP_VOCTOWEB_API_URL`** - Voctoweb API URL
   ```
   Example: https://voctoweb.example.com
   ```

### Adding Secrets:

1. Go to your GitHub repository
2. Click on "Settings" → "Secrets and variables" → "Actions"
3. Under the "Secrets" tab, click "New repository secret"
4. Add each secret with the corresponding name and value

### Adding Variables:

1. Go to your GitHub repository
2. Click on "Settings" → "Secrets and variables" → "Actions"
3. Under the "Variables" tab, click "New repository variable"
4. Add each variable with the corresponding name and value

> **Note**: Variables are visible to anyone with read access to the repository, while secrets are encrypted and only visible to maintainers.

### Generate SSH Keys (if not already available):

```bash
# Generate SSH key pair
ssh-keygen -t ed25519 -C "github-actions-deploy"

# Add public key to server
ssh-copy-id -i ~/.ssh/id_ed25519.pub user@server-ip

# Copy private key for GitHub Secret
cat ~/.ssh/id_ed25519
```

## Deployment Process

The deployment runs automatically on every push to the `main` branch:

1. **Tests** are executed
2. **Build** is created (`npm run build`)
3. **`.env` file is dynamically created** from GitHub Variables
4. **SCP upload** of build files and .env to the server

The `build/` directory is completely copied to the server and overwrites existing files.

### Dynamically Created Files:

- **`.env`** - Created from GitHub Variables `REACT_APP_API_URL` and `REACT_APP_VOCTOWEB_API_URL`
- **`.htaccess`** - Apache URL rewriting rules (from `public/.htaccess`)

### Local Development:

For local development, copy `env.example` to `.env`:
```bash
cp env.example .env
```
Then adjust the values in `.env` to your local environment.

> **Note**: The `.env` file is never checked into git and only created at runtime in GitHub Actions.

## Manual Deployment

If you want to trigger deployment manually:

1. Go to "Actions" in your GitHub repository
2. Select the workflow "Build and Deploy to Server"
3. Click on "Run workflow"

## Troubleshooting

### Common Issues:

- **SSH connection failed**: Check host, port and SSH key
- **Permissions**: Make sure the deploy user has write permissions in the target directory
- **Path doesn't exist**: Create the target directory on the server

### Check Logs:

You can find deployment logs under "Actions" → "Build and Deploy to Server" → respective workflow run. 