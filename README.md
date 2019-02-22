# WooMobile
WooMobile is a ionic mobile app that connect with a woocommerce (and wordpress) website.

Pasos para configuración de woomobile:
* Instalar wordpress
* Instalar woocommerce
* Habilitar rest api
* Instalar JWT Authentication for WP REST API
* Agregar las siguientes lineas en wp-config.php:
define('JWT_AUTH_CORS_ENABLE', true);
define('JWT_AUTH_SECRET_KEY', 'woomobile-key');
* Agregar en el .htaccess
SetEnvIf Authorization "(.*)" HTTP_AUTHORIZATION=$1
RewriteCond %{HTTP:Authorization} ^(.*)
RewriteRule ^(.*) - [E=HTTP_AUTHORIZATION:%1]
* 