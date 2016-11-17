<?php

namespace AppBundle\Controller;


use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;



class DefaultController extends Controller
{
    /**
     * @Route("/", name="homepage")
     */
    public function indexAction()
    {
        $userName = $_SERVER['PHP_AUTH_USER'];
        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
        if (isset($userName)){
            $response->setContent(json_encode('Auth'));
        }
        else{
            $response->setContent(json_encode('No auth'));
        }
        return $response;
    }
}
