FROM amazoncorretto:17

LABEL authors="Baguni"

ARG JAR_FILE=build/libs/*.jar

WORKDIR /app

COPY ${JAR_FILE} /app/baguni-api.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "-Duser.timezone=Asia/Seoul", "/app/baguni-api.jar"]
