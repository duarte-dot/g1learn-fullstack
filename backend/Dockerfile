FROM php:8.1-apache

RUN apt-get update && apt-get install -y \
    curl \
    unzip

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN docker-php-ext-install pdo pdo_mysql

WORKDIR /app

COPY . .

RUN chown -R www-data:www-data /app/storage

RUN a2enmod rewrite

RUN composer install --ignore-platform-reqs --no-scripts

CMD bash -c "php artisan serve --host 0.0.0.0 --port 8000"