FROM openjdk:17

WORKDIR /app

COPY build/libs/Health-Declaration-Backend-0.0.1-SNAPSHOT.jar /app/health-declaration.jar

ENTRYPOINT ["java","-jar","health-declaration.jar"]

EXPOSE 8080