FROM python:3-alpine

WORKDIR /app

COPY requirements.txt requirements.txt

RUN pip3 install -r requirements.txt

ENV NLTK_DATA ./nltk_data

RUN python -m nltk.downloader -d ./nltk_data cmudict punkt

COPY . .

CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0", "--port=8080"]