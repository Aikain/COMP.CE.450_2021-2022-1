FROM python:3.10.4-alpine

RUN apk add --update-cache \
    gcc \
    mariadb-connector-c-dev \
    musl-dev \
    && rm -rf /var/cache/apk/*

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY app.py .

CMD ["python3", "app.py"]
