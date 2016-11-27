<?php

$app->get('/', ['Ted\Controllers\HomeController', 'index'])->setName('home-page');


$app->get('/about', ['Ted\Controllers\HomeController', 'about'])->setName('about-page');


$app->get('/menu', ['Ted\Controllers\HomeController', 'menu'])->setName('menu-page');


$app->get('/gallery', ['Ted\Controllers\HomeController', 'gallery'])->setName('gallery-page');


$app->get('/events', ['Ted\Controllers\HomeController', 'events'])->setName('events-page');


$app->get('/contact', ['Ted\Controllers\HomeController', 'contact'])->setName('contact-page');