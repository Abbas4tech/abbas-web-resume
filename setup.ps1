# Quick Setup Script for Abbas Web Resume Turborepo

Write-Host "🚀 Setting up Abbas Web Resume Turborepo..." -ForegroundColor Cyan
Write-Host ""

# Check if pnpm is installed
if (!(Get-Command pnpm -ErrorAction SilentlyContinue)) {
    Write-Host "❌ pnpm is not installed. Installing pnpm..." -ForegroundColor Yellow
    npm install -g pnpm
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ pnpm installed successfully!" -ForegroundColor Green
        Write-Host ""
    } else {
        Write-Host "❌ Failed to install pnpm." -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "✅ pnpm is already installed." -ForegroundColor Green
    Write-Host ""
}

# Check if .env exists
if (-not (Test-Path ".env")) {
    Write-Host "📝 Creating .env file from .env.example..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host "✅ .env file created. Please update it with your actual credentials." -ForegroundColor Green
    Write-Host ""
} else {
    Write-Host "✅ .env file already exists." -ForegroundColor Green
    Write-Host ""
}

# Install dependencies
Write-Host "📦 Installing dependencies with pnpm..." -ForegroundColor Cyan
pnpm install

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Dependencies installed successfully!" -ForegroundColor Green
    Write-Host ""
} else {
    Write-Host "❌ Failed to install dependencies." -ForegroundColor Red
    exit 1
}

# Install Playwright browsers
Write-Host "🎭 Installing Playwright browsers..." -ForegroundColor Cyan
Set-Location "apps\abbas-resume-e2e"
npx playwright install
Set-Location "..\..\"

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Playwright browsers installed!" -ForegroundColor Green
    Write-Host ""
} else {
    Write-Host "⚠️  Playwright browser installation failed. You can install them later." -ForegroundColor Yellow
    Write-Host ""
}

Write-Host "✨ Setup complete! ✨" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Update .env with your Contentful credentials" -ForegroundColor White
Write-Host "2. Run 'pnpm dev' to start the development server" -ForegroundColor White
Write-Host "3. Run 'pnpm test:e2e' to run the e2e tests" -ForegroundColor White
Write-Host ""
Write-Host "For more information, see README.md" -ForegroundColor Gray
