FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
COPY target/chatserver-0.0.1-SNAPSHOT.jar chatserver-0.0.1-SNAPSHOT.jar
EXPOSE 8080
CMD ["java", "-jar", "chatserver-0.0.1-SNAPSHOT.jar"]