import os
import subprocess
import sys

# Get port from environment variable
port = os.getenv("PORT", "8000")

try:
    # Convert port to integer
    port = int(port)
    if port < 1 or port > 65535:
        raise ValueError("Port must be between 1 and 65535")

    # Start the application
    subprocess.run([
        sys.executable, 
        "-m", 
        "uvicorn", 
        "main:app", 
        "--host", "0.0.0.0", 
        "--port", str(port)
    ])

except ValueError as e:
    print(f"Error: Invalid port configuration: {e}")
    sys.exit(1)
except Exception as e:
    print(f"Error starting application: {e}")
    sys.exit(1)
