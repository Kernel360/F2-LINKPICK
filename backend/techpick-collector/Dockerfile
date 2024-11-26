FROM amazoncorretto:17

LABEL authors="TechPick"

ARG JAR_FILE=build/libs/*.jar

WORKDIR /app

COPY ${JAR_FILE} /app/techpick-collector.jar

EXPOSE 8081

ENTRYPOINT ["java", "-jar", "-Duser.timezone=Asia/Seoul", "/app/techpick-collector.jar"]
