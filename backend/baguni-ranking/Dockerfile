FROM amazoncorretto:17

LABEL authors="Baguni"

ARG JAR_FILE=build/libs/*.jar

WORKDIR /app

COPY ${JAR_FILE} /app/baguni-ranking.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "-Duser.timezone=Asia/Seoul", "/app/baguni-ranking.jar"]
