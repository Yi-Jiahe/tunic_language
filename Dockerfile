FROM python:3.10-slim

# Allow statements and log messages to immediately appear in the Knative logs
ENV PYTHONUNBUFFERED True

WORKDIR /app

COPY requirements.txt requirements.txt

RUN pip install --no-cache-dir -r requirements.txt

ENV NLTK_DATA ./nltk_data

RUN python -m nltk.downloader -d ./nltk_data cmudict punkt

COPY . .

CMD exec gunicorn --bind :$PORT --workers 1 --threads 1 --timeout 0 app:app
