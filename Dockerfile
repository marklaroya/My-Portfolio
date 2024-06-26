# Use the official Nginx image
FROM nginx:alpine

# Set the working directory
WORKDIR /usr/share/nginx/html

# Copy the static files to the Nginx HTML directory
COPY . .

# Expose port 80
EXPOSE 80
