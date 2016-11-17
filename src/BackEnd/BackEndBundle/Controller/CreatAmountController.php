<?php
namespace BackEnd\BackEndBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use BackEnd\BackEndBundle\Entity\Amount;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;



class CreatAmountController extends Controller
{
    /**
     * @Route("/creatamount")
     */
    public function indexAction()
    {

        $request = Request::createFromGlobals();
        $date = $request->request->get('date');
        $sum = $request->request->get('sum');
        $idcategor = $request->request->get('id_categor');
        $comments = $request->request->get('comments');
        $userName = $this->get('security.context')->getToken()->getUsername();

        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');

        if ($date!=='' && $sum!=='' && $idcategor!=='') {
            $manager = $this->getDoctrine()->getManager();
            $amount = new Amount();
            $amount->setUserName($userName);
            $amount->setSum($sum);
            $amount->setIdCategor($idcategor);
            $amount->setDate($date);
            $amount->setComments($comments);
            $manager->persist($amount);
            $manager->flush();

            $response->setContent(json_encode('Данные сохранены'));
        }

        else{
            $response->setContent(json_encode('ошибка: данные не сохранены'));
        }


        return $response;
    }
}