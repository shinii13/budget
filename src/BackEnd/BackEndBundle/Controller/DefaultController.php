<?php

namespace BackEnd\BackEndBundle\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use  Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;


class DefaultController extends Controller
{
    /**
     * @Route("/api")
     */
    public function indexAction()
    {
        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
        if (isset($_SERVER['PHP_AUTH_USER'])){
            $userName = $_SERVER['PHP_AUTH_USER'];
            $response->setContent(json_encode(array(
                'tok' => $userName,
            )));
        }

        else{
            $usr = $this->get('security.context')->getToken()->getUsername();


            $response->setContent(json_encode(array(
                'tok1' => $usr,
            )));
            $response->setStatusCode(Response::HTTP_UNAUTHORIZED);
        }
        return ($response);
    }
}
