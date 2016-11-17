<?php
namespace BackEnd\BackEndBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use BackEnd\BackEndBundle\Entity\Amount;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;



class LoginController extends Controller
{
    /**
     * @Route("/creatamount")
     */
    public function indexAction()
    {
        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
            $userName = $this->get('security.context')->getToken()->getUsername();
            $response->setContent(json_encode(array(
                'user' => $userName,
            )));

        return ($response);
    }
}