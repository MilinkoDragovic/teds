<?php

namespace Ted\Controllers;

use Slim\Views\Twig;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class HomeController
{
    public function index(Request $request, Response $response, Twig $view)

    {
        return $view->render($response, 'home.twig');
    }

    public function about(Request $request, Response $response, Twig $view)
    {

        return $view->render($response, 'about.twig');
    }

    public function menu(Request $request, Response $response, Twig $view)
    {

        return $view->render($response, 'menu.twig');
    }

    public function gallery(Request $request, Response $response, Twig $view)
    {

        return $view->render($response, 'gallery.twig');
    }

    public function specials(Request $request, Response $response, Twig $view)
    {

        return $view->render($response, 'specials.twig');
    }

    public function contact(Request $request, Response $response, Twig $view)
    {

        return $view->render($response, 'contact.twig');
    }
}