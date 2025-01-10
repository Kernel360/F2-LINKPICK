FROM minkyeu/baguni-public:chrome-selenium

LABEL authors="Baguni"

# JAR 파일 복사
ARG JAR_FILE=build/libs/*.jar
WORKDIR /app
COPY ${JAR_FILE} /app/baguni-batch.jar

# 애플리케이션 포트 열기
EXPOSE 8080

# 애플리케이션 실행
ENTRYPOINT ["java", "-jar", "-Duser.timezone=Asia/Seoul", "/app/baguni-batch.jar"]