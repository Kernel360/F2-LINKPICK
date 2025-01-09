FROM openjdk:17-jdk-slim-buster

LABEL authors="Baguni"

# 시스템 패키지 업데이트 및 설치
RUN apt-get update -y && \
    apt-get install -y wget unzip curl xvfb

# 영어로 언어 설정 - 셀레니움을 위해서
ENV LANG=en_US.UTF-8
ENV LANGUAGE=en_US:en
ENV LC_ALL=en_US.UTF-8

# Google Chrome 설치
RUN wget https://chrome-versions.com/google-chrome-stable-114.0.5735.106-1.deb && \
    apt-get install -y ./google-chrome-stable-114.0.5735.106-1.deb && \
    rm -f ./google-chrome-stable-114.0.5735.106-1.deb && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Chromedriver 설치
RUN wget -O /tmp/chromedriver.zip https://chromedriver.storage.googleapis.com/114.0.5735.106/chromedriver_linux64.zip && \
    unzip /tmp/chromedriver.zip -d /usr/local/bin/ && \
    rm -f /tmp/chromedriver.zip && \

# Xvfb 설정
RUN Xvfb :99 -ac &
ENV DISPLAY=:99

# JAR 파일 복사
ARG JAR_FILE=build/libs/*.jar
WORKDIR /app
COPY ${JAR_FILE} /app/baguni-batch.jar

# 애플리케이션 포트 열기
EXPOSE 8080

# 애플리케이션 실행
ENTRYPOINT ["java", "-jar", "-Duser.timezone=Asia/Seoul", "/app/baguni-batch.jar"]
