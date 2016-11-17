<?php
namespace BackEnd\BackEndBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;

class DateController extends Controller
{
    public function indexAction()
    {
        $request = Request::createFromGlobals();
        $dataStart = $request->request->get('dateStart');
        $dataEnd = $request->request->get('dateEnd');
        $username = $this->get('security.context')->getToken()->getUsername();

        $em = $this->getDoctrine()->getManager();
        $query = $em->createQuery(
            'SELECT p.userName, p.sum, p3.categorName, p4.subcategorName, p.date, p.comments
                FROM BackEndBackEndBundle:Amount p,
                    BackEndBackEndBundle:UserGroup p1,
                    BackEndBackEndBundle:UserGroup p2,
                    BackEndBackEndBundle:Categor p3,
                    BackEndBackEndBundle:Subcategor p4
                WHERE p.userName=p1.userName and p1.userGroup=p2.userGroup and p.categorId=p3.id and p.categorId=p4.categorId and p.subcategorId=p4.subcategorId and p2.userName = :user and p.date>= :dateStart and p.date<=:dateEnd
                ORDER BY p.date
            '
        );
        $query->setParameters(array(
            'user' =>  $username ,
            'dateStart' =>  $dataStart ,
            'dateEnd' =>  $dataEnd ,
        ));

        $useramount = $query->getResult();
        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
        $response->setContent(json_encode($useramount));
        return ($response);
    }
}