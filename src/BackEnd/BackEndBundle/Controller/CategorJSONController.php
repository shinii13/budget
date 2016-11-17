<?php

namespace BackEnd\BackEndBundle\Controller;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use JMS\Serializer\SerializerBuilder;

class CategorJSONController extends Controller
{

    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $query = $em->createQuery(
            'SELECT p.id, p.categorName
                FROM BackEndBackEndBundle:Categor p'
        );
        $categor = $query->getResult();
        $json= array();
        for($i=0; $i<count($categor); $i++)
        {
            $query = $em->createQuery(
                'SELECT p.subcategorId, p.subcategorName
                FROM BackEndBackEndBundle:Subcategor p
                where p.categorId = :id'
            );
            $query->setParameters(array(
                'id' =>  $categor[$i]['id'] ,
            ));
            $subcategor = $query->getResult();
            $json[$i]=array('id'=>$categor[$i]['id'], 'name'=>$categor[$i]['categorName'], 'children'=>$subcategor);
        }


        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
        $response->setContent(json_encode(array('category'=>$json)));
        return ($response);
    }
}
