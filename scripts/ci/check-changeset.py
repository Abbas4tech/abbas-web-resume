import os
import subprocess
import sys

def main():
    base_ref = os.environ.get("GITHUB_BASE_REF") or "main"
    
    print(f"Checking for changesets against origin/{base_ref}...")
    
    cmd = f"git diff origin/{base_ref}...HEAD --name-only"
    try:
        output = subprocess.check_output(cmd, shell=True, text=True)
    except subprocess.CalledProcessError as e:
        print(f"Error running git diff: {e}")
        print("Make sure you have fetched origin main (fetch-depth: 0 in checkout action).")
        sys.exit(1)
        
    files = output.strip().split('\n')
    
    has_changeset = any(f.startswith(".changeset/") and f.endswith(".md") and f != ".changeset/README.md" for f in files)
    
    if not has_changeset:
        print("::error::No changeset file found in this PR.")
        print("Please add a changeset file by running `pnpm changeset` locally so we can track versions and changelogs.")
        sys.exit(1)
        
    print("Changeset file found. Proceeding with CI pipeline.")
    sys.exit(0)

if __name__ == "__main__":
    main()
