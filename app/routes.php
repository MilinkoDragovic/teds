<?php

$app->get('/', ['Ted\Controllers\HomeController', 'index'])->setName('home-page');


$app->get('/about', ['Ted\Controllers\HomeController', 'about'])->setName('about-page');


$app->get('/menu', ['Ted\Controllers\HomeController', 'menu'])->setName('menu-page');


$app->get('/gallery', ['Ted\Controllers\HomeController', 'gallery'])->setName('gallery-page');


$app->get('/specials', ['Ted\Controllers\HomeController', 'specials'])->setName('specials-page');


$app->get('/contact', ['Ted\Controllers\HomeController', 'contact'])->setName('contact-page');