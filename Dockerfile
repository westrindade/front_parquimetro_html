FROM nginx:latest
COPY nginx.conf /etc/nginx/nginx.conf
COPY . /usr/share/nginx/html/
#EXPOSE 4300
#compilar
#docker build -t wesmax/web-parking .
#subir
#docker run -it --rm -d -p 8080:80 --name web web-parking