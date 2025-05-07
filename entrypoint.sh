#!/bin/sh

# Path to the runtime config.js file
CONFIG_FILE=/usr/share/nginx/html/config.js

# Replace placeholders in config.js with environment variables
echo "Generating runtime configuration in $CONFIG_FILE"
cat <<EOF > $CONFIG_FILE
window.config = {
    VITE_BACKEND_URL: "${VITE_BACKEND_URL:-undefined}:8000"
};
EOF

# Start Nginx
nginx -g "daemon off;"

# At the end this didn't work (I wanted to send an environment variable to Vue, but already solved it in nginx.conf).
#But going to leave it in here in the meantime