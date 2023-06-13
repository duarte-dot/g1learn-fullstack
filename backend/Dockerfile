FROM php:8.1-apache

RUN docker-php-ext-install pdo pdo_mysql

WORKDIR /var/www/html

COPY . .

RUN chown -R www-data:www-data /var/www/html/storage

RUN a2enmod rewrite

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
