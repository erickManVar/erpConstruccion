# ERPConstruccion/erp_app/Dockerfile

# Use the official Flutter image
FROM cirrusci/flutter:latest as build

# Set the working directory
WORKDIR /app

# Copy the pubspec files
COPY pubspec.yaml pubspec.lock ./

# Install dependencies
RUN flutter pub get

# Copy the rest of the application files
COPY . .

# Build the Flutter web application
RUN flutter build web

# Use a simple web server to serve the app
FROM nginx:alpine
COPY --from=build /app/build/web /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Command to run the web server
CMD ["nginx", "-g", "daemon off;"]
